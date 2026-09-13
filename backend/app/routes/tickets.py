from datetime import datetime, timezone  # Added timezone import here

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Note, Ticket
from app.schemas import (
    TicketCreate,
    TicketCreateResponse,
    TicketDetailResponse,
    TicketListResponse,
    TicketUpdate,
    TicketUpdateResponse,
)


router = APIRouter(
    prefix="/api/tickets",
    tags=["Tickets"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def generate_ticket_id(db: Session) -> str:
    last_ticket = (
        db.query(Ticket)
        .order_by(Ticket.id.desc())
        .first()
    )

    if last_ticket is None:
        next_number = 1
    else:
        next_number = last_ticket.id + 1

    return f"TKT-{next_number:03d}"


@router.post(
    "",
    response_model=TicketCreateResponse,
    status_code=status.HTTP_201_CREATED
)
def create_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db)
):
    ticket_id = generate_ticket_id(db)

    ticket = Ticket(
        ticket_id=ticket_id,
        customer_name=ticket_data.customer_name,
        customer_email=ticket_data.customer_email,
        subject=ticket_data.subject,
        description=ticket_data.description,
        status="Open"
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return {
        "ticket_id": ticket.ticket_id,
        "created_at": ticket.created_at
    }


@router.get(
    "",
    response_model=list[TicketListResponse]
)
def get_tickets(
    search: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
    db: Session = Depends(get_db)
):
    query = db.query(Ticket)

    if status_filter:
        allowed_statuses = ["Open", "In Progress", "Closed"]

        if status_filter not in allowed_statuses:
            raise HTTPException(
                status_code=400,
                detail="Invalid status. Use Open, In Progress, or Closed."
            )

        query = query.filter(Ticket.status == status_filter)

    if search:
        search_term = f"%{search}%"

        query = query.filter(
            or_(
                Ticket.ticket_id.ilike(search_term),
                Ticket.customer_name.ilike(search_term),
                Ticket.customer_email.ilike(search_term),
                Ticket.subject.ilike(search_term),
                Ticket.description.ilike(search_term)
            )
        )

    return (
        query
        .order_by(Ticket.created_at.desc())
        .all()
    )


@router.get(
    "/{ticket_id}",
    response_model=TicketDetailResponse
)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    notes = (
        db.query(Note)
        .filter(Note.ticket_id == ticket.id)
        .order_by(Note.created_at.asc())
        .all()
    )

    return {
        "ticket_id": ticket.ticket_id,
        "customer_name": ticket.customer_name,
        "customer_email": ticket.customer_email,
        "subject": ticket.subject,
        "description": ticket.description,
        "status": ticket.status,
        "notes": notes,
        "created_at": ticket.created_at,
        "updated_at": ticket.updated_at
    }


@router.put(
    "/{ticket_id}",
    response_model=TicketUpdateResponse
)
def update_ticket(
    ticket_id: str,
    ticket_data: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.ticket_id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    allowed_statuses = ["Open", "In Progress", "Closed"]

    if ticket_data.status is not None:
        if ticket_data.status not in allowed_statuses:
            raise HTTPException(
                status_code=400,
                detail="Invalid status. Use Open, In Progress, or Closed."
            )

        ticket.status = ticket_data.status

    if ticket_data.notes is not None:
        note_text = ticket_data.notes.strip()

        # BUG FIX: Added 'if note_text:' wrapper to ensure we don't save an empty string row
        if note_text:
            note = Note(
                ticket_id=ticket.id,
                note_text=note_text
            )

            db.add(note)

    # BUG FIX: Replaced deprecated datetime.utcnow() with modern datetime.now(timezone.utc)
    ticket.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(ticket)

    return {
        "success": True,
        "updated_at": ticket.updated_at
    }
