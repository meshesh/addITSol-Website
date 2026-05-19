from pydantic import BaseModel, EmailStr
from typing import Optional

class Lead(BaseModel):
    full_name: str
    company_name: str
    business_email: EmailStr
    phone_number: str
    requirement_type: str
    resource_type: Optional[str] = None
    description: str