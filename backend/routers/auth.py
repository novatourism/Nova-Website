# backend/routers/auth.py
from fastapi import APIRouter, HTTPException
from schemas import LoginRequest

router = APIRouter()

# ← Change these credentials before going live!
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "nova2024"

@router.post("/login")
def login(data: LoginRequest):
    if data.username == ADMIN_USERNAME and data.password == ADMIN_PASSWORD:
        return {"access_token": "nova_admin_secure_token", "token_type": "bearer"}
    raise HTTPException(401, "Invalid credentials")