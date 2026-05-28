# backend/routers/packages.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
from models import Package
import shutil, os, uuid

router = APIRouter()
UPLOAD_DIR = "uploads"

@router.get("/")
def list_packages(db: Session = Depends(get_db)):
    return db.query(Package).filter(Package.is_active == True).all()

@router.get("/{pkg_id}")
def get_package(pkg_id: int, db: Session = Depends(get_db)):
    pkg = db.query(Package).filter(Package.id == pkg_id).first()
    if not pkg: raise HTTPException(404, "Package not found")
    return pkg

@router.post("/")
async def create_package(
    title: str = Form(...), description: str = Form(...),
    category: str = Form(...), duration: str = Form(...),
    highlights: str = Form("[]"), image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    image_url = None
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        path = os.path.join(UPLOAD_DIR, filename)
        with open(path, "wb") as f: shutil.copyfileobj(image.file, f)
        image_url = f"/uploads/{filename}"

    pkg = Package(title=title, description=description, category=category,
                  duration=duration, highlights=highlights, image_url=image_url)
    db.add(pkg); db.commit(); db.refresh(pkg)
    return pkg

@router.put("/{pkg_id}")
async def update_package(
    pkg_id: int, title: str = Form(...), description: str = Form(...),
    category: str = Form(...), duration: str = Form(...),
    highlights: str = Form("[]"), image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    pkg = db.query(Package).filter(Package.id == pkg_id).first()
    if not pkg: raise HTTPException(404, "Not found")
    pkg.title = title; pkg.description = description
    pkg.category = category; pkg.duration = duration; pkg.highlights = highlights
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        path = os.path.join(UPLOAD_DIR, filename)
        with open(path, "wb") as f: shutil.copyfileobj(image.file, f)
        pkg.image_url = f"/uploads/{filename}"
    db.commit(); db.refresh(pkg)
    return pkg

@router.delete("/{pkg_id}")
def delete_package(pkg_id: int, db: Session = Depends(get_db)):
    pkg = db.query(Package).filter(Package.id == pkg_id).first()
    if not pkg: raise HTTPException(404, "Not found")
    pkg.is_active = False; db.commit()
    return {"message": "Deleted"}