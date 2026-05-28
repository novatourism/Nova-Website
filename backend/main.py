# backend/main.py  — FULL FILE, replace completely
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import Base, engine
from routers.packages import router as packages_router
from routers.gallery import router as gallery_router
from routers.enquiries import router as enquiries_router
from routers.auth import router as auth_router
import os

Base.metadata.create_all(bind=engine)
os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="NOVA Tourism API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(packages_router, prefix="/packages", tags=["Packages"])
app.include_router(gallery_router, prefix="/gallery", tags=["Gallery"])
app.include_router(enquiries_router, prefix="/enquiries", tags=["Enquiries"])

@app.get("/")
def root():
    return {"message": "NOVA Tourism API Running ✅"}