from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

# In backend/models.py, add these columns to the Package class:

class Package(Base):
    __tablename__ = "packages"
    id             = Column(Integer, primary_key=True)
    title          = Column(String, nullable=False)
    description    = Column(Text)
    category       = Column(String)
    duration       = Column(String)
    highlights     = Column(Text)
    image_url      = Column(String)
    is_active      = Column(Boolean, default=True)
    # ─── ADD THESE LINES ───────────────────
    overview       = Column(Text, default='')
    itinerary      = Column(Text, default='[]')
    inclusions     = Column(Text, default='[]')
    exclusions     = Column(Text, default='[]')
    how_to_reach   = Column(Text, default='')
    group_size     = Column(String, default='')
    difficulty     = Column(String, default='Easy')
    start_location = Column(String, default='Pune')
    reviews        = Column(Text, default='[]')

class GalleryImage(Base):
    __tablename__ = "gallery"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), default="")
    image_url = Column(String(500), nullable=False)
    category = Column(String(100), default="general")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Enquiry(Base):
    __tablename__ = "enquiries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(20), default="")
    package_interest = Column(String(200), default="")
    group_size = Column(String(100), default="")
    travel_date = Column(String(100), default="")
    message = Column(Text, default="")
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())