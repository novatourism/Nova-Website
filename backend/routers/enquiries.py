# backend/routers/enquiries.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Enquiry
from schemas import EnquiryCreate

router = APIRouter()

@router.post("/")
def create_enquiry(data: EnquiryCreate, db: Session = Depends(get_db)):
    enq = Enquiry(**data.model_dump())
    db.add(enq); db.commit(); db.refresh(enq)
    return enq

@router.get("/")
def list_enquiries(db: Session = Depends(get_db)):
    return db.query(Enquiry).order_by(Enquiry.created_at.desc()).all()

@router.patch("/{enq_id}/read")
def mark_read(enq_id: int, db: Session = Depends(get_db)):
    enq = db.query(Enquiry).filter(Enquiry.id == enq_id).first()
    if not enq: raise HTTPException(404, "Not found")
    enq.is_read = True; db.commit()
    return {"message": "Marked as read"}

@router.delete("/{enq_id}")
def delete_enquiry(enq_id: int, db: Session = Depends(get_db)):
    enq = db.query(Enquiry).filter(Enquiry.id == enq_id).first()
    if not enq: raise HTTPException(404, "Not found")
    db.delete(enq); db.commit()
    return {"message": "Deleted"}