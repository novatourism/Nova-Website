# backend/routers/gallery.py
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import GalleryImage
import shutil, os, uuid

router = APIRouter()
UPLOAD_DIR = "uploads"

@router.get("/")
def list_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.created_at.desc()).all()

@router.post("/")
async def upload_image(
    title: str = Form(...), category: str = Form("general"),
    image: UploadFile = File(...), db: Session = Depends(get_db)
):
    ext = image.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as f: shutil.copyfileobj(image.file, f)
    img = GalleryImage(title=title, category=category, image_url=f"/uploads/{filename}")
    db.add(img); db.commit(); db.refresh(img)
    return img

@router.delete("/{img_id}")
def delete_image(img_id: int, db: Session = Depends(get_db)):
    img = db.query(GalleryImage).filter(GalleryImage.id == img_id).first()
    if not img: raise HTTPException(404, "Not found")
    db.delete(img); db.commit()
    return {"message": "Deleted"}