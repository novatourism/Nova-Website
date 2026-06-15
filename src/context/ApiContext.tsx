// nova-tourism/src/context/ApiContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getPackages, getGallery } from '../services/api'
import { imgByPrefix } from '../assets/imageMap'
interface Package {
  id: number
  title: string
  description: string
  category: string
  duration: string
  highlights: string
  image_url: string
  is_active: boolean
  // New rich fields
  overview?: string
  itinerary?: string
  inclusions?: string
  exclusions?: string
  how_to_reach?: string
  group_size?: string
  difficulty?: string
  start_location?: string
  reviews?: string
}

interface GalleryImage {
  id: number
  title: string
  image_url: string
  category: string
}

interface ApiContextType {
  packages: Package[]
  gallery: GalleryImage[]
  loading: boolean
  refreshPackages: () => void
  refreshGallery: () => void
  isAdmin: boolean
  setIsAdmin: (v: boolean) => void
}

const ApiContext = createContext<ApiContextType | null>(null)

export const useApi = () => {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApi must be used within ApiProvider')
  return ctx
}

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [packages, setPackages] = useState<Package[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('nova_admin_token'))

  const refreshPackages = async () => {
  try {
    const res = await getPackages()
    
    // ✅ Backend returned packages but they might be missing rich fields.
    // Merge: backend data (id, title, category etc.) + mock rich content (overview, itinerary, etc.)
    const merged = res.data.map((pkg: Package) => {
  const mock = MOCK_PACKAGES.find(m => m.id === pkg.id)

  if (!mock) return pkg

  return {
    ...pkg,

    overview:
      pkg.overview && pkg.overview.trim() !== ''
        ? pkg.overview
        : mock.overview,

    itinerary:
      pkg.itinerary && pkg.itinerary !== '[]'
        ? pkg.itinerary
        : mock.itinerary,

    inclusions:
      pkg.inclusions && pkg.inclusions !== '[]'
        ? pkg.inclusions
        : mock.inclusions,

    exclusions:
      pkg.exclusions && pkg.exclusions !== '[]'
        ? pkg.exclusions
        : mock.exclusions,

    how_to_reach:
      pkg.how_to_reach && pkg.how_to_reach.trim() !== ''
        ? pkg.how_to_reach
        : mock.how_to_reach,

    reviews:
      pkg.reviews && pkg.reviews !== '[]'
        ? pkg.reviews
        : mock.reviews,

    group_size:
      pkg.group_size && pkg.group_size.trim() !== ''
        ? pkg.group_size
        : mock.group_size,

    difficulty:
      pkg.difficulty && pkg.difficulty.trim() !== ''
        ? pkg.difficulty
        : mock.difficulty,

    start_location:
      pkg.start_location && pkg.start_location.trim() !== ''
        ? pkg.start_location
        : mock.start_location,

    highlights:
      pkg.highlights && pkg.highlights !== '[]'
        ? pkg.highlights
        : mock.highlights,
  }
})
    setPackages(merged)
  } catch {
    // Backend not running → use full mock data
    setPackages(MOCK_PACKAGES)
  }
}

  
  
  const refreshGallery = async () => {
    try {
      const res = await getGallery()
      setGallery(res.data)
    } catch {
      setGallery(MOCK_GALLERY)
    }
  }

  useEffect(() => {
    Promise.all([refreshPackages(), refreshGallery()]).finally(() => setLoading(false))
  }, [])

  return (
    <ApiContext.Provider value={{ packages, gallery, loading, refreshPackages, refreshGallery, isAdmin, setIsAdmin }}>
      {children}
    </ApiContext.Provider>
  )
}

// ─── Mock data (shows while backend isn't running) ──────────
const MOCK_PACKAGES = [
  {
    id: 1,
    title: 'School Adventure Camp',
    description: 'An unforgettable outdoor experience designed for students — build teamwork, confidence, and lasting memories in nature.',
    category: 'school',
    duration: '2 Days / 1 Night',
    highlights: JSON.stringify(['Team Building Activities', 'Nature Trails', 'Campfire Night', 'Safety Trained Staff']),
    image_url: imgByPrefix('school-trip', 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&auto=format&fit=crop'),
    is_active: true,
    // ─── NEW RICH FIELDS ───
    overview: `NOVA Tourism's School Adventure Camp is one of Pune's most trusted educational outdoor experiences, serving 120+ schools since 2019. Conducted at scenic nature reserves and adventure farms within 90 km of Pune, our camps are thoughtfully designed to complement classroom learning with real-world experiences.

      Students from Grade 4 to Grade 12 participate in guided nature walks, team-building rope activities, campfire sessions, and early morning yoga — all supervised by CBSE-certified instructors and first-aid trained safety staff. Every activity is age-appropriate and follows strict government safety protocols.

      Parents can rest assured: we provide vehicle tracking, instructor contact numbers, and a dedicated trip coordinator for every batch. We have maintained a 100% safety record across 5,000+ students served.

      Our camps are available for day trips, overnight camps, and 2-day/1-night packages, customizable for your school's curriculum theme — science treks, eco-awareness camps, leadership programs, and more.`,
    group_size: '20–200 Students',
    difficulty: 'Easy',
    start_location: 'Pune',
    how_to_reach: 'We arrange comfortable AC bus transport directly from your school gate. The campsite is located approximately 60–90 km from Pune city. Buses depart early morning and return by evening on Day 2. Parents are provided with the vehicle number and driver contact before departure.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Arrival & Orientation',
        activities: [
          'Morning departure from school by AC bus',
          'Arrival at campsite — check-in and room/tent allocation',
          'Welcome orientation and safety briefing by instructors',
          'Afternoon: Team building games and rope activities',
          'Evening: Nature trail walk with a guide',
          'Night: Campfire with songs, stories, and stargazing',
          'Dinner and overnight stay at campsite',
        ]
      },
      {
        day: 2,
        title: 'Adventure Activities & Departure',
        activities: [
          'Morning yoga and group exercise session',
          'Breakfast at campsite',
          'Activity stations: Zip line, rock wall, river crossing',
          'Lunch and rest period',
          'Closing ceremony — certificates distributed to all students',
          'Departure by bus, arrive school by evening',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'AC bus transport (school to campsite and back)',
      'All meals (dinner Day 1 + breakfast & lunch Day 2)',
      'Accommodation in tents or dormitories',
      'All adventure activity fees',
      'Certified safety instructors',
      'First aid and emergency support',
      'Participation certificate for each student',
      'Group travel insurance',
    ]),
    exclusions: JSON.stringify([
      'Personal expenses and snacks',
      'Any damage to property',
      'Activities not listed in the itinerary',
      'Medical expenses beyond basic first aid',
    ]),
    reviews: JSON.stringify([
      { name: 'Mrs. Sunita Desai', role: 'Class Teacher, DPS Pune', rating: 5, text: 'Absolutely brilliantly organized! The kids had an amazing time and we as teachers felt completely at ease with the safety arrangements. Will definitely book again next year.' },
      { name: 'Mr. Rajesh Kulkarni', role: 'School Principal', rating: 5, text: 'NOVA Tourism handled everything professionally — from transport logistics to food quality. The activity instructors were excellent with the children.' },
      { name: 'Parent - Priya Sharma', role: 'Parent of Grade 6 Student', rating: 4, text: 'My daughter came back glowing! She loved the campfire and the team games. The staff kept parents informed throughout the trip. Very reassuring.' },
    ])
  },
  {
    id: 2,
    title: 'Corporate Retreat',
    description: 'Rejuvenate your team with curated activities, strategy workshops, and luxury stays in serene locations.',
    category: 'corporate',
    duration: '3 Days / 2 Nights',
    highlights: JSON.stringify(['Workshop Spaces', 'Team Activities', 'Gala Dinner', 'Luxury Stay']),
    image_url: imgByPrefix('corporate-trip',),
    is_active: true,
    overview: `NOVA Tourism's Corporate Retreat packages are trusted by 50+ Pune-based companies — from startups to Fortune 500 firms — to deliver high-impact team experiences that go beyond the boardroom.

    We specialize in designing retreats that balance professional development with genuine relaxation. Our packages include structured team-building workshops facilitated by certified HR professionals, strategy sessions in premium conference setups, and energizing outdoor activities — all at handpicked resorts within 150 km of Pune.

    Whether your team has 10 or 500 employees, we handle every logistical detail: AC transport from office, luxury resort accommodation, customized meal plans, AV equipment, event coordination, and post-retreat documentation of key decisions and team achievements.

    Clients report measurable improvements in team cohesion, communication, and morale following our retreats. NOVA has organized corporate events for clients including technology firms, manufacturing companies, banking institutions, and NGOs across Maharashtra.`,    group_size: '10–500 Employees',
    difficulty: 'Easy',
    start_location: 'Pune',
    how_to_reach: 'We arrange corporate-grade AC coaches or luxury mini-buses from your office. For larger groups, we coordinate multiple pick-up points across Pune. Flight/train options are also coordinated for out-of-city participants upon request.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Arrival & Team Kick-off',
        activities: [
          'Morning departure from office/pick-up points',
          'Arrival at resort — welcome drinks and check-in',
          'Afternoon: Icebreaker team activities on resort grounds',
          'Evening: Structured workshop — "Communication & Leadership"',
          'Gala welcome dinner with cultural entertainment',
          'Overnight at resort',
        ]
      },
      {
        day: 2,
        title: 'Strategy & Adventure',
        activities: [
          'Morning: Wellness session (yoga or meditation)',
          'Breakfast at resort',
          'Forenoon: Strategy workshop / brainstorming session (conference room)',
          'Afternoon: Outdoor team challenges — obstacle course, treasure hunt',
          'Evening: Awards ceremony — recognition and appreciation',
          'Networking dinner with DJ / live music',
          'Overnight at resort',
        ]
      },
      {
        day: 3,
        title: 'Relaxation & Departure',
        activities: [
          'Morning: Optional leisure — swimming, nature walk, spa',
          'Farewell breakfast',
          'Feedback session and group photograph',
          'Departure by noon, arrive Pune by evening',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'Luxury AC transport (office to resort and back)',
      'All meals (3 dinners, 2 breakfasts, 2 lunches)',
      'Premium resort accommodation (twin sharing)',
      'Conference room with AV equipment',
      'All team activity charges',
      'Event coordinator on-site for full duration',
      'Gala dinner and entertainment',
      'Participation certificates and trophies',
    ]),
    exclusions: JSON.stringify([
      'Personal expenses (laundry, room service, minibar)',
      'Spa and salon charges',
      'Alcoholic beverages',
      'Travel for outstation participants',
    ]),
    reviews: JSON.stringify([
      { name: 'Ankit Mehta', role: 'HR Head, Infosys Pune', rating: 5, text: 'NOVA delivered an exceptional corporate retreat. The team-building activities were creative and our employees are still talking about it 3 months later!' },
      { name: 'Sneha Joshi', role: 'Operations Manager, TCS', rating: 5, text: 'Flawlessly organized. The venue was stunning, food was excellent, and the event coordinator handled every detail. Would highly recommend to any corporate team.' },
      { name: 'Vikram Patil', role: 'CEO, StartupHub Pune', rating: 4, text: 'Great retreat for our 40-person team. The workshop sessions were insightful and the evening activities built real camaraderie. Good value for money.' },
    ])
  },
  {
    id: 3,
    title: 'Weekend Hill Escape',
    description: 'Escape the city for a weekend in the hills — perfect for families, friends, or couples.',
    category: 'normal',
    duration: '2 Days / 1 Night',
    highlights: JSON.stringify(['Scenic Views', 'Local Cuisine', 'Guided Trek', 'Photography Spots']),
    image_url: imgByPrefix('weekend-hill-escape', 'https://images.unsplash.com/photo-1506905920579-6f7e5600390a?w=600&auto=format&fit=crop'),    is_active: true,
    overview: `Escape Pune's urban chaos and rediscover yourself on NOVA's Weekend Hill Escape — our most popular package for families, friend groups, and couples seeking a quick but meaningful break.

    We rotate across Maharashtra's finest hill destinations based on season and weather: Mahabaleshwar and Panchgani in summer, Bhimashankar and Lonavala during the monsoon, and Matheran for a peaceful, vehicle-free experience in cooler months. Every destination is hand-selected by our travel team for scenic value, accommodation quality, and local experiences.

    The package includes AC transport, handpicked boutique hotel or resort stay, guided nature trek with a certified local guide, and curated dining at authentic Maharashtrian restaurants — not tourist traps. You also get access to exclusive photography spots that only our guides know about.

    Over 2,000 individuals have experienced NOVA's Weekend Hill Escapes. Our 4.9-star average rating speaks for the quality of experience we consistently deliver.`,    group_size: '2–50 Persons',
    difficulty: 'Easy to Moderate',
    start_location: 'Pune',
    how_to_reach: 'We depart from Pune by comfortable AC vehicles early Saturday morning. Destinations are 2–3 hours from Pune depending on the location. All travel within the destination is also arranged.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Drive Up & Explore',
        activities: [
          'Early morning departure from Pune (7:00 AM)',
          'Scenic drive to hill station with rest stops',
          'Check-in at hotel / resort',
          'Post-lunch sightseeing at key viewpoints',
          'Guided nature trail / easy trek',
          'Sunset photography at scenic point',
          'Evening leisure and local market visit',
          'Dinner at local restaurant featuring Maharashtrian cuisine',
          'Overnight stay at hotel',
        ]
      },
      {
        day: 2,
        title: 'Morning Trek & Return',
        activities: [
          'Early morning sunrise trek (optional)',
          'Breakfast at hotel',
          'Visit to one major local attraction (waterfall, temple, or fort)',
          'Leisure time and shopping at local markets',
          'Lunch at popular local eatery',
          'Departure by 2:00 PM',
          'Arrive Pune by evening',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'AC vehicle transport (Pune to destination and back)',
      'Hotel accommodation (1 night, twin sharing)',
      'Dinner on Day 1 and breakfast on Day 2',
      'Guided trek with local guide',
      'Entry fees for all listed attractions',
      'Travel coordinator for the entire trip',
    ]),
    exclusions: JSON.stringify([
      'Lunch on Day 1 and lunch on Day 2',
      'Personal expenses and shopping',
      'Any activity not mentioned in itinerary',
      'Tips for guide/driver',
    ]),
    reviews: JSON.stringify([
      { name: 'Pooja Nair', role: 'Software Engineer, Pune', rating: 5, text: 'Booked the Mahabaleshwar package for my family of 4. Perfectly organized — the hotel was lovely, the trek guide was knowledgeable, and the food recommendations were spot on!' },
      { name: 'Rahul & Priya', role: 'Couple, Pune', rating: 5, text: 'Our first trip with NOVA and definitely not the last. The sunset viewpoint was breathtaking. The coordinator handled everything so we could just enjoy.' },
    ])
  },
  {
    id: 4,
    title: 'Indoor Event Experience',
    description: 'World-class themed parties and corporate galas — we handle every single detail.',
    category: 'indoor',
    duration: 'Custom (4–12 Hours)',
    highlights: JSON.stringify(['Themed Decor', 'Catering Included', 'AV Setup', 'Event Coordinator']),
    image_url: imgByPrefix('indoor-event', 'https://images.unsplash.com/photo-1517245770090-4d1e3a8c9c8d?w=600&auto=format&fit=crop'),
    is_active: true,
    overview: `NOVA Tourism & Events is Pune's go-to partner for transforming any indoor space into an extraordinary event experience. With 7+ years of event management expertise, we have successfully organized 500+ indoor events ranging from intimate birthday celebrations of 20 guests to grand corporate galas and school annual days for 1,000+ attendees.

    Our in-house creative team handles every element: theme conceptualization and venue transformation, floral and prop decoration, catering coordination with Pune's top caterers, AV setup and sound engineering, professional photography and videography, live entertainment booking (DJ, live bands, emcees), and complete post-event venue restoration.

    We offer both full-event management (where we handle everything) and partial services (decor-only, catering-only, etc.) to match your budget. Popular themes we've executed include Bollywood Night, Hawaiian Beach Party, Corporate Awards Gala, Rustic Garden Wedding Reception, School Cultural Festival, and International Food Festival.

    Every event gets a dedicated NOVA coordinator who is your single point of contact from first call to post-event cleanup.`,    group_size: '20–1000 Guests',
    difficulty: 'N/A',
    start_location: 'Your Venue / Pune',
    how_to_reach: 'We come to you! Our team sets up at your chosen venue in Pune and surrounding areas. Venue recommendations also provided on request.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Event Day Flow',
        activities: [
          'Venue setup begins 4–6 hours before event',
          'Themed decor installation by our decor team',
          'AV equipment setup and soundcheck',
          'Catering team arrival and food station setup',
          'Guest arrival — welcome drinks and photography',
          'Main event programme (as per custom schedule)',
          'Dinner / buffet / live food stations',
          'Entertainment: DJ / live band / anchoring (as chosen)',
          'Event wrap-up and venue clearance by our team',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'Full venue decoration (theme-based)',
      'AV equipment (mic, projector, sound system)',
      'Dedicated event coordinator',
      'Catering (customizable menu)',
      'Photography and videography (optional)',
      'Entertainment booking support',
      'Invitation design (digital)',
      'Post-event cleanup',
    ]),
    exclusions: JSON.stringify([
      'Venue rental charges',
      'Alcoholic beverages',
      'Printed materials (banners, standees)',
      'Special celebrity appearances',
    ]),
    reviews: JSON.stringify([
      { name: 'Aishwarya Bhatt', role: 'Birthday Event, Pune', rating: 5, text: 'NOVA organized my 30th birthday and it was magical! Every detail was perfect — the decor, the food, the music. All my guests were blown away.' },
      { name: 'Rohan Industries', role: 'Annual Day Event', rating: 5, text: 'We have organized our annual day with NOVA for 3 consecutive years. Their professionalism and creativity gets better every year. Highly recommended!' },
    ])
  },
  {
    id: 5,
    title: 'Outdoor Adventure Trek',
    description: 'Guided outdoor treks from beginner trails to thrilling summit conquests.',
    category: 'outdoor',
    duration: '1 Day (6–10 Hours)',
    highlights: JSON.stringify(['Expert Guides', 'Safety Gear Provided', 'Breakfast Included', 'Completion Certificate']),
    image_url: imgByPrefix('outdoor-trek', 'https://images.unsplash.com/photo-1506905920579-6f7e5600390a?w=600&auto=format&fit=crop'),
    is_active: true,
    overview: `Maharashtra is home to over 350 ancient hill forts, misty mountain ranges, and breathtaking trekking trails — and NOVA has explored them all. Our Outdoor Adventure Treks connect Pune's adventurers with the region's most spectacular landscapes, guided by instructors who are not just trained trekkers but passionate naturalists and historians.

    We offer treks across all difficulty levels: easy sunrise walks to Sinhagad and Tikona for beginners, moderate full-day treks to Rajgad, Torana, and Harishchandragad for regular hikers, and challenging night or overnight expeditions to Kalsubai (Maharashtra's highest peak), Alang-Madan-Kulang, and Bhimashankar for seasoned trekkers.

    Every trek includes pre-trek safety briefing, certified guide, all necessary safety equipment, snacks and water, and first-aid support. We also organize specialized treks: Monsoon Waterfall Treks (July-September), Wildlife Conservation Treks, Photography Treks, and School/Corporate Group Treks with customized difficulty levels.

    Over 3,000 trekkers have trusted NOVA since 2019, with a perfect safety record and a growing community of repeat adventurers.`,    group_size: '5–100 Trekkers',
    difficulty: 'Easy / Moderate / Difficult',
    start_location: 'Pune (base village)',
    how_to_reach: 'We depart from a central Pune pickup point (Shivajinagar / Deccan) in our vehicles. Trekking base villages are typically 1–2 hours from Pune. Carpooling option is also available for self-drivers.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Trek Day',
        activities: [
          'Early morning pickup from Pune (5:00–5:30 AM)',
          'Arrive at base village (7:00–7:30 AM)',
          'Briefing by trek leader — trail overview and safety rules',
          'Trek begins — ascent with regular rest stops',
          'Summit / Checkpoint reached — group photos',
          'Light breakfast/snacks at midpoint',
          'Descent back to base',
          'Post-trek refreshments',
          'Return drive to Pune, arrive by 3:00–5:00 PM',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'Transport from Pune (pickup and drop)',
      'Certified and experienced trek guide',
      'Safety equipment (harness, helmet where needed)',
      'Breakfast / snacks on trail',
      'First aid kit and emergency support',
      'Completion certificate',
      'Group travel insurance',
    ]),
    exclusions: JSON.stringify([
      'Personal trekking gear (shoes, backpack)',
      'Lunch (self-arranged)',
      'Any personal medical expenses',
      'Tips for guide',
    ]),
    reviews: JSON.stringify([
      { name: 'Siddharth Rane', role: 'IT Professional, Pune', rating: 5, text: 'Done 4 treks with NOVA so far. Their guides are knowledgeable, safety-conscious, and make every trek fun. The Rajgad night trek was unforgettable!' },
      { name: 'Kavya Menon', role: 'First-time Trekker', rating: 5, text: 'I had never trekked before but felt completely safe with the NOVA team. The guide was patient and encouraging throughout. Already planning my next one!' },
    ])
  },
  {
    id: 6,
    title: 'Goa Beach Holiday',
    description: 'Sun, sand, sea — the perfect mix of relaxation and adventure on Goa\'s famous shores.',
    category: 'goa',
    duration: '4 Days / 3 Nights',
    highlights: JSON.stringify(['Beach Resort Stay', 'Water Sports', 'Night Market Tour', 'Sunset Cruise']),
    image_url: imgByPrefix('goa-trip', 'https://images.unsplash.com/photo-1540528147463-d2c3d0e8f9b8?w=600&auto=format&fit=crop'),
    is_active: true,
    overview: `Goa is India's most iconic holiday destination, and NOVA's Goa Beach Holiday package is crafted to give you the best of the Golden State — without the stress of planning. We take care of everything from your doorstep in Pune to your beach chair in Goa.

    Our packages are customized for every group type: romantic couple getaways (sunset cruise + private beach dinner), family vacations (water parks + heritage sightseeing + comfortable family resorts), friend group adventures (water sports + night markets + beach parties), and senior citizen tours (comfortable AC travel + relaxed sightseeing + premium hotels).

    We stay at handpicked beach resorts in North Goa (Calangute, Baga, Candolim, Anjuna) or South Goa (Palolem, Agonda, Benaulim) based on your preference. All our partner properties have been personally inspected for quality, cleanliness, and hospitality standards.

    Travel options include Tejas/Mandovi Express (most popular, 8 hours), Konkan Railway sleeper (overnight, economical), Goa Express, AC Volvo sleeper bus, or coordinated flight bookings. Over 500 NOVA travelers have experienced our Goa packages — and the stories they bring back keep them booking again.`,    group_size: '2–100 Persons',
    difficulty: 'Easy',
    start_location: 'Pune (by train/flight/bus)',
    how_to_reach: 'We book your travel from Pune to Goa by your preferred mode — Tejas Express (8 hours), flight (1 hour), or AC Volvo sleeper bus (12 hours). Our Goa coordinator picks you up at the Goa railway station or airport and transfers you to the resort.',
    itinerary: JSON.stringify([
      {
        day: 1,
        title: 'Arrival & North Goa Beaches',
        activities: [
          'Arrival in Goa (train/flight/bus)',
          'Airport/Station pickup by our coordinator',
          'Check-in at beach resort',
          'Evening at Calangute or Baga Beach',
          'Dinner at beachside shack',
          'Overnight at resort',
        ]
      },
      {
        day: 2,
        title: 'Water Sports & Cruise',
        activities: [
          'Breakfast at resort',
          'Morning: Water sports — parasailing, jet ski, banana boat, scuba diving',
          'Lunch at Anjuna Beach',
          'Evening: Sunset Cruise on the Mandovi River',
          'Dinner at popular North Goa restaurant',
          'Optional: Nightlife at Tito\'s / Club Cubana',
          'Overnight at resort',
        ]
      },
      {
        day: 3,
        title: 'South Goa & Heritage',
        activities: [
          'Breakfast at resort',
          'Day trip to South Goa — Palolem Beach, Colva Beach',
          'Visit Old Goa churches (Basilica of Bom Jesus)',
          'Spice plantation tour and Goan lunch',
          'Evening: Anjuna Flea Market / Saturday Night Market',
          'Dinner and overnight at resort',
        ]
      },
      {
        day: 4,
        title: 'Leisure & Departure',
        activities: [
          'Morning at leisure — beach, pool, or spa',
          'Checkout and breakfast',
          'Last-minute souvenir shopping',
          'Transfer to airport/station',
          'Departure to Pune',
        ]
      }
    ]),
    inclusions: JSON.stringify([
      'Return travel Pune ↔ Goa (train/bus/flight as selected)',
      'Airport/Station transfers in Goa',
      'Beach resort accommodation (3 nights)',
      'Daily breakfast at resort',
      'Sunset cruise tickets',
      'Water sports session (as listed)',
      'Old Goa heritage tour',
      'Goa coordinator available throughout',
    ]),
    exclusions: JSON.stringify([
      'Lunch and dinner (except Day 3 plantation lunch)',
      'Personal expenses and shopping',
      'Additional water sports not in package',
      'Travel insurance (recommended)',
      'Visa / travel documents',
    ]),
    reviews: JSON.stringify([
      { name: 'Neha & Rohit', role: 'Honeymoon Couple', rating: 5, text: 'Our honeymoon with NOVA was perfect. The resort was beautiful, the sunset cruise was romantic, and the coordinator handled everything perfectly. 10/10!' },
      { name: 'Friend Group of 8', role: 'College Reunion Trip', rating: 5, text: 'Best Goa trip we\'ve ever had! NOVA sorted all the logistics — we just had to show up and enjoy. The water sports and the night market were absolute highlights.' },
      { name: 'Meera Family', role: 'Family Vacation', rating: 4, text: 'Comfortable resort, clean beaches, and helpful staff. Good value for a family of 5. Would recommend for family groups looking for a hassle-free Goa experience.' },
    ])
  },
]

const MOCK_GALLERY = [
  { id: 1, title: 'School Camp 2024', image_url: imgByPrefix('school-trip', 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&auto=format&fit=crop'), category: 'school' },
  { id: 2, title: 'Corporate Gala Night', image_url: imgByPrefix('corporate-trip', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&auto=format&fit=crop'), category: 'corporate' },
  { id: 3, title: 'Outdoor Trek', image_url: imgByPrefix('outdoor-trek', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&auto=format&fit=crop'), category: 'outdoor' },
  { id: 4, title: 'Goa Trip 2024', image_url: imgByPrefix('goa-trip', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&auto=format&fit=crop'), category: 'normal' },
  { id: 5, title: 'Indoor Festival', image_url: imgByPrefix('indoor-event', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop'), category: 'indoor' },
  { id: 6, title: 'Weekend Escape', image_url: imgByPrefix('normal-trip', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop'), category: 'normal' },
]