from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class TicketCreate(BaseModel):
    customer_name: str = Field(min_length=1, max_length=100)
    customer_email: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=5000)


class TicketCreateResponse(BaseModel):
    ticket_id: str
    created_at: datetime


class TicketListResponse(BaseModel):
    ticket_id: str
    customer_name: str
    subject: str
    status: str
    created_at: datetime


class NoteResponse(BaseModel):
    id: int
    note_text: str
    created_at: datetime


class TicketDetailResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    notes: list[NoteResponse]
    created_at: datetime
    updated_at: datetime


class TicketUpdate(BaseModel):
    status: str | None = None
    notes: str | None = Field(default=None, max_length=2000)


class TicketUpdateResponse(BaseModel):
    success: bool
    updated_at: datetime