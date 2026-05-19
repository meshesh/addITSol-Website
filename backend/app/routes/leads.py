from fastapi import APIRouter
from app.schemas.lead import Lead

router = APIRouter()

@router.post("/leads")
async def create_lead(lead: Lead):
    return {
        "success": True,
        "data": lead
    }