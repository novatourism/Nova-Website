# backend/init_db.py  ← DELETE old file, create fresh
from database import SessionLocal, engine, Base
from models import Package

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Check if already seeded
if db.query(Package).count() == 0:
    packages = [
        Package(title="School Adventure Camp", description="An unforgettable outdoor experience for students — build teamwork, confidence, and lasting memories in nature.",
                category="school", duration="2 Days / 1 Night",
                highlights='["Team Building Activities","Nature Trails","Campfire Night","Certified Safety Staff","Meals Included"]',
                image_url=None, is_active=True),
        Package(title="Corporate Retreat", description="Rejuvenate your team with curated activities, workshops, and luxury stays in serene locations.",
                category="corporate", duration="3 Days / 2 Nights",
                highlights='["Workshop Spaces","Team Building","Gala Dinner","Luxury Stay","AV Setup"]',
                image_url=None, is_active=True),
        Package(title="Weekend Hill Escape", description="Escape the city for a weekend in the hills — perfect for families, friends, or couples.",
                category="normal", duration="2 Days / 1 Night",
                highlights='["Scenic Views","Local Cuisine","Guided Trek","Photography Spots"]',
                image_url=None, is_active=True),
        Package(title="Indoor Event Experience", description="World-class themed parties and corporate galas — we handle every single detail.",
                category="indoor", duration="Custom Duration",
                highlights='["Themed Decor","Catering Included","AV Setup","Event Coordinator"]',
                image_url=None, is_active=True),
        Package(title="Outdoor Adventure Trek", description="Guided outdoor treks from beginner trails to thrilling summit conquests.",
                category="outdoor", duration="1 Day",
                highlights='["Expert Guides","Safety Gear Provided","Breakfast Included","Completion Certificate"]',
                image_url=None, is_active=True),
        Package(title="Goa Beach Holiday", description="Sun, sand, sea — the perfect mix of relaxation and adventure on Goa's famous shores.",
                category="normal", duration="4 Days / 3 Nights",
                highlights='["Beach Resort Stay","Water Sports","Night Market Tour","Sunset Cruise"]',
                image_url=None, is_active=True),
    ]
    for p in packages:
        db.add(p)
    db.commit()
    print(f"✅ Seeded {len(packages)} packages!")
else:
    print("✅ Database already has data — skipping seed.")

db.close()