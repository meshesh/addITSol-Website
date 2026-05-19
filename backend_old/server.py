"""Add IT Solutions — Enterprise Consulting Backend.

Exposes /api/leads to capture consultation requests and fan out to:
- MongoDB (always)
- Telegram bot (if TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID set)
- Resend email (if RESEND_API_KEY + NOTIFICATION_EMAIL_TO set)
- Google Sheets (if GOOGLE_SHEETS_ID + GOOGLE_SERVICE_ACCOUNT_JSON set)

All third-party integrations gracefully no-op when credentials are missing,
so the form always succeeds end-to-end.
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------------------------------------------------------------------------
# Mongo
# ---------------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Add IT Solutions API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("addit")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
REQUIREMENT_TYPES = {
    "agile_transformation": "Agile Transformation",
    "pmo_consulting": "PMO Consulting",
    "project_delivery": "Project Delivery Consulting",
    "dedicated_resources": "Dedicated Project Resources",
    "program_governance": "Program Governance",
    "delivery_assessment": "Delivery Assessment",
    "other": "Other",
}

RESOURCE_TYPES = {
    "project_manager": "Project Manager",
    "scrum_master": "Scrum Master",
    "agile_coach": "Agile Coach",
    "pmo": "PMO",
    "program_manager": "Program Manager",
    "technical_program_manager": "Technical Program Manager",
    "technical_project_manager": "Technical Project Manager",
}


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    full_name: str = Field(min_length=2, max_length=120)
    company_name: str = Field(min_length=1, max_length=160)
    business_email: EmailStr
    phone_number: str = Field(min_length=4, max_length=40)
    requirement_type: str
    resource_type: Optional[str] = None
    description: str = Field(min_length=10, max_length=4000)


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    requirement_label: str
    resource_label: Optional[str] = None
    delivery_status: dict = Field(default_factory=dict)


class LeadResponse(BaseModel):
    id: str
    created_at: datetime
    delivery_status: dict


# ---------------------------------------------------------------------------
# Integrations (graceful)
# ---------------------------------------------------------------------------
async def _send_telegram(lead: Lead) -> str:
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
    if not token or not chat_id:
        return "skipped"

    text = (
        "*New Consultation Request*\n"
        f"*Name:* {lead.full_name}\n"
        f"*Company:* {lead.company_name}\n"
        f"*Email:* {lead.business_email}\n"
        f"*Phone:* {lead.phone_number}\n"
        f"*Requirement:* {lead.requirement_label}\n"
        + (f"*Resource:* {lead.resource_label}\n" if lead.resource_label else "")
        + f"\n{lead.description}"
    )
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    try:
        async with httpx.AsyncClient(timeout=10) as hc:
            r = await hc.post(url, json={"chat_id": chat_id, "text": text, "parse_mode": "Markdown"})
            r.raise_for_status()
        return "sent"
    except Exception as exc:  # noqa: BLE001
        logger.warning("Telegram send failed: %s", exc)
        return f"error: {exc}"


async def _send_email(lead: Lead) -> str:
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    to = os.environ.get("NOTIFICATION_EMAIL_TO", "").strip()
    sender = os.environ.get("NOTIFICATION_EMAIL_FROM", "").strip()
    if not api_key or not to or not sender:
        return "skipped"

    html = f"""
    <div style="font-family:Inter,Arial,sans-serif;background:#071120;color:#fff;padding:32px;">
      <h2 style="color:#E7B85C;margin:0 0 16px;">New Consultation Request</h2>
      <table style="border-collapse:collapse;color:#B8C2D1;font-size:14px;line-height:1.6;">
        <tr><td><b style="color:#fff;">Name</b></td><td style="padding-left:24px;">{lead.full_name}</td></tr>
        <tr><td><b style="color:#fff;">Company</b></td><td style="padding-left:24px;">{lead.company_name}</td></tr>
        <tr><td><b style="color:#fff;">Email</b></td><td style="padding-left:24px;">{lead.business_email}</td></tr>
        <tr><td><b style="color:#fff;">Phone</b></td><td style="padding-left:24px;">{lead.phone_number}</td></tr>
        <tr><td><b style="color:#fff;">Requirement</b></td><td style="padding-left:24px;">{lead.requirement_label}</td></tr>
        {f'<tr><td><b style="color:#fff;">Resource</b></td><td style="padding-left:24px;">{lead.resource_label}</td></tr>' if lead.resource_label else ''}
      </table>
      <p style="color:#B8C2D1;margin-top:24px;white-space:pre-wrap;">{lead.description}</p>
    </div>
    """
    try:
        async with httpx.AsyncClient(timeout=15) as hc:
            r = await hc.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={
                    "from": sender,
                    "to": [to],
                    "subject": f"[Lead] {lead.requirement_label} — {lead.company_name}",
                    "html": html,
                },
            )
            r.raise_for_status()
        return "sent"
    except Exception as exc:  # noqa: BLE001
        logger.warning("Resend email send failed: %s", exc)
        return f"error: {exc}"


def _append_sheet_sync(lead: Lead) -> str:
    sheet_id = os.environ.get("GOOGLE_SHEETS_ID", "").strip()
    sa_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    if not sheet_id or not sa_json:
        return "skipped"
    try:
        import gspread
        from google.oauth2.service_account import Credentials

        info = json.loads(sa_json)
        creds = Credentials.from_service_account_info(
            info,
            scopes=[
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/drive",
            ],
        )
        gc = gspread.authorize(creds)
        sh = gc.open_by_key(sheet_id)
        ws = sh.sheet1
        ws.append_row(
            [
                lead.created_at.isoformat(),
                lead.full_name,
                lead.company_name,
                lead.business_email,
                lead.phone_number,
                lead.requirement_label,
                lead.resource_label or "",
                lead.description,
            ],
            value_input_option="RAW",
        )
        return "sent"
    except Exception as exc:  # noqa: BLE001
        logger.warning("Sheets append failed: %s", exc)
        return f"error: {exc}"


async def _append_sheet(lead: Lead) -> str:
    return await asyncio.to_thread(_append_sheet_sync, lead)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"service": "Add IT Solutions API", "status": "ok"}


@api_router.get("/options")
async def options():
    """Public dropdown options for the consultation form."""
    return {
        "requirement_types": [{"value": k, "label": v} for k, v in REQUIREMENT_TYPES.items()],
        "resource_types": [{"value": k, "label": v} for k, v in RESOURCE_TYPES.items()],
    }


@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(payload: LeadCreate):
    if payload.requirement_type not in REQUIREMENT_TYPES:
        raise HTTPException(status_code=422, detail="Invalid requirement_type")
    if payload.requirement_type == "dedicated_resources":
        if not payload.resource_type or payload.resource_type not in RESOURCE_TYPES:
            raise HTTPException(status_code=422, detail="resource_type is required for dedicated resources")

    lead = Lead(
        **payload.model_dump(),
        requirement_label=REQUIREMENT_TYPES[payload.requirement_type],
        resource_label=RESOURCE_TYPES.get(payload.resource_type) if payload.resource_type else None,
    )

    # Fan-out concurrently
    telegram_status, email_status, sheet_status = await asyncio.gather(
        _send_telegram(lead),
        _send_email(lead),
        _append_sheet(lead),
    )
    lead.delivery_status = {
        "telegram": telegram_status,
        "email": email_status,
        "google_sheets": sheet_status,
    }

    # Persist
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)

    return LeadResponse(id=lead.id, created_at=lead.created_at, delivery_status=lead.delivery_status)


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(min(limit, 500))
    for r in rows:
        if isinstance(r.get("created_at"), str):
            r["created_at"] = datetime.fromisoformat(r["created_at"])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
