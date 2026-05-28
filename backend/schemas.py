# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class PackageCreate(BaseModel):
    title: str
    description: str
    category: str
    duration: str
    highlights: str = "[]"
    
    overview:       Optional[str] = ''
    itinerary:      Optional[str] = '[]'
    inclusions:     Optional[str] = '[]'
    exclusions:     Optional[str] = '[]'
    how_to_reach:   Optional[str] = ''
    group_size:     Optional[str] = ''
    difficulty:     Optional[str] = 'Easy'
    start_location: Optional[str] = 'Pune'
    reviews:        Optional[str] = '[]'

class PackageOut(BaseModel):
    id: int
    title: str
    description: str
    category: str
    duration: str
    highlights: str
    image_url: Optional[str] = None
    is_active: bool
    created_at: datetime
    overview: Optional[str] = ''
    itinerary: Optional[str] = '[]'
    inclusions: Optional[str] = '[]'
    exclusions: Optional[str] = '[]'
    how_to_reach: Optional[str] = ''
    group_size: Optional[str] = ''
    difficulty: Optional[str] = 'Easy'
    start_location: Optional[str] = 'Pune'
    reviews: Optional[str] = '[]'
    class Config: from_attributes = True
   

class GalleryOut(BaseModel):
    id: int
    title: str
    image_url: str
    category: str
    created_at: datetime
    class Config: from_attributes = True

class EnquiryCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    package_interest: Optional[str] = None
    message: Optional[str] = None

class EnquiryOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    package_interest: Optional[str]
    message: Optional[str]
    is_read: bool
    created_at: datetime
    class Config: from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str