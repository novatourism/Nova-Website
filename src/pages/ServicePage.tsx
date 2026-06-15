// nova-tourism/src/pages/ServicePage.tsx
import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ArrowLeft, MessageCircle, Phone, X,
  Users, MapPin, ChevronDown, Star, Info,
  Calendar, ThumbsUp, BookOpen, List, Map, FileText
} from 'lucide-react'
import { useApi } from '../context/ApiContext'
import toast from 'react-hot-toast'
import { sendEnquiryEmail } from '../services/emailService'
import { getServiceImages } from '../assets/imageMap'
import { ALL_SERVICES } from '../data/services'

// ─── Sticky nav sections ─────────────────────────────────────
const SECTIONS = [
  { id: 'overview',   label: 'Overview',      icon: BookOpen },
  { id: 'process',    label: 'How It Works',  icon: FileText },
  { id: 'inclusions', label: 'Inclusions',    icon: List },
  { id: 'booking',    label: 'How to Book',   icon: Map },
  { id: 'reviews',    label: 'Reviews',       icon: Star },
]

// ─── Generic process steps for all services ──────────────────
const PROCESS_STEPS = [
  {
    step: 1, title: 'Contact & Consultation',
    items: [
      'Reach out via WhatsApp, call, or our website',
      'Share your requirements, group size, and preferred dates',
      'Our travel expert contacts you within 2 hours',
      'Free no-obligation consultation to understand your needs',
    ]
  },
  {
    step: 2, title: 'Custom Planning & Quote',
    items: [
      'Personalized itinerary prepared based on your requirements',
      'Transparent quote — zero hidden charges, what we quote you pay',
      'Multiple options to fit different budgets',
      'Revisions until you are completely satisfied',
    ]
  },
  {
    step: 3, title: 'Booking & Confirmation',
    items: [
      'Advance booking amount to confirm your slot',
      'All bookings confirmed in writing via WhatsApp/email',
      'Detailed schedule, packing list & important info shared',
      'Dedicated NOVA coordinator assigned to you',
    ]
  },
  {
    step: 4, title: 'Experience & Support',
    items: [
      'Your NOVA coordinator available 24/7 throughout',
      'All logistics handled seamlessly by our team',
      'Real-time updates and immediate assistance',
      'Post-experience feedback and follow-up',
    ]
  },
]

// ─── Generic exclusions ──────────────────────────────────────
const getExclusions = (slug: string): string[] => {
  const base = [
    'Personal expenses and shopping',
    'Any item not mentioned in inclusions',
    'Tips for guides/coordinators (optional)',
  ]
  if (['destination-weddings', 'event-management', 'school-college-events'].includes(slug))
    return [...base, 'Venue rental charges', 'Alcoholic beverages', 'Printed materials (banners, standees)', 'Celebrity/special appearances']
  if (['domestic-international', 'honeymoon', 'family-tours', 'group-tours', 'solo-travel'].includes(slug))
    return [...base, 'Visa and passport fees', 'Travel insurance', 'Personal medication', 'Any airfare unless specified']
  if (['adventure-tours', 'pilgrimage'].includes(slug))
    return [...base, 'Personal trekking gear (shoes, backpack)', 'Personal medical expenses', 'Lunch (self-arranged on trails)']
  return [...base, 'Services not listed in the package']
}

// ─── Service-specific reviews ─────────────────────────────────
const SERVICE_REVIEWS: Record<string, Array<{name: string, role: string, rating: number, text: string}>> = {
  'school-trips': [
    { name: 'Mrs. Sunita Desai',    role: 'Class Teacher, DPS Pune',       rating: 5, text: 'Brilliantly organized! Kids had an amazing time and safety was top-notch. Booking again next year!' },
    { name: 'Mr. Rajesh Kulkarni', role: 'Principal, Pune International',  rating: 5, text: 'NOVA handled everything professionally — logistics, food, activities. 200 students, zero issues.' },
    { name: 'Parent — Priya M.',   role: 'Parent of Grade 6 Student',      rating: 4, text: 'My daughter came back glowing! The campfire and team games were her favourites. Very reassuring.' },
  ],
  'corporate-events': [
    { name: 'Ankit Mehta',  role: 'HR Head, Infosys Pune',      rating: 5, text: 'Exceptional corporate retreat. Our employees still talk about it 3 months later!' },
    { name: 'Sneha Joshi',  role: 'Operations Manager, TCS',    rating: 5, text: 'Flawlessly organized. Venue, food, coordinator — every detail was perfect. Highly recommend.' },
    { name: 'Vikram Patil', role: 'CEO, StartupHub Pune',       rating: 4, text: 'Great retreat for 40 people. Workshop sessions were insightful, activities built real camaraderie.' },
  ],
  'honeymoon': [
    { name: 'Neha & Rohit',    role: 'Honeymoon Couple',            rating: 5, text: 'Our honeymoon with NOVA was perfect. Resort, sunset cruise, coordinator — everything was magical.' },
    { name: 'Priya & Aakash', role: 'Newlyweds, Pune',             rating: 5, text: 'Kerala trip was dreamy. Every single detail was arranged. We just had to show up and enjoy!' },
  ],
  'destination-weddings': [
    { name: 'The Sharma Family',  role: 'Destination Wedding, Goa',   rating: 5, text: 'NOVA made our dream beach wedding a reality. Decor, catering, guests — all handled beautifully.' },
    { name: 'Rohan & Kavya',     role: 'Destination Wedding, Udaipur', rating: 5, text: 'Udaipur palace wedding was absolutely breathtaking. Every detail was perfect. 10/10!' },
  ],
  'event-management': [
    { name: 'Aishwarya Bhatt',  role: 'Birthday Event, Pune',       rating: 5, text: 'NOVA organized my 30th and it was magical! Decor, food, music — all guests were blown away.' },
    { name: 'Rohan Industries', role: 'Annual Day Event',            rating: 5, text: 'Third consecutive year with NOVA. Professionalism and creativity gets better every time.' },
  ],
  'adventure-tours': [
    { name: 'Siddharth Rane', role: 'IT Professional, Pune',     rating: 5, text: 'Done 4 treks with NOVA. Guides are knowledgeable and safety-conscious. Rajgad night trek — unforgettable!' },
    { name: 'Kavya Menon',    role: 'First-time Trekker',         rating: 5, text: 'Never trekked before but felt completely safe. Guide was patient and encouraging throughout.' },
  ],
}

const DEFAULT_REVIEWS = [
  { name: 'Rahul Sharma',  role: 'Customer, Pune',      rating: 5, text: 'Excellent service! NOVA handled everything professionally. Will definitely use their services again.' },
  { name: 'Priya Mehta',   role: 'Satisfied Customer',  rating: 5, text: 'Very smooth experience from start to finish. The coordinator was always available and helpful.' },
]

// ─── Service quick info ───────────────────────────────────────
const SERVICE_INFO: Record<string, { duration: string; groupSize: string; difficulty: string; location: string }> = {
  'school-trips':          { duration: '1–3 Days',       groupSize: '20–200 Students', difficulty: 'Easy',               location: 'Pune & Nearby' },
  'college-visits':        { duration: '1–2 Days',       groupSize: '30–300 Students', difficulty: 'Easy',               location: 'Pan-India' },
  'corporate-tours':       { duration: '2–5 Days',       groupSize: '10–500 Employees', difficulty: 'Easy',              location: 'Pan-India' },
  'corporate-events':      { duration: '1–3 Days',       groupSize: '10–500 Employees', difficulty: 'Easy',              location: 'Pune & Resort' },
  'school-college-events': { duration: '4–12 Hours',     groupSize: '50–2000 Guests',  difficulty: 'N/A',               location: 'Your Venue' },
  'family-tours':          { duration: '3–7 Days',       groupSize: '2–50 Persons',    difficulty: 'Easy',               location: 'Pan-India' },
  'group-tours':           { duration: '2–7 Days',       groupSize: '10–500 Persons',  difficulty: 'Easy to Moderate',   location: 'Pan-India' },
  'solo-travel':           { duration: 'Custom',         groupSize: 'Individual',      difficulty: 'Easy to Moderate',   location: 'Pan-India' },
  'pilgrimage':            { duration: '3–10 Days',      groupSize: '10–100 Persons',  difficulty: 'Easy',               location: 'Pan-India' },
  'adventure-tours':       { duration: '1–3 Days',       groupSize: '5–100 Persons',   difficulty: 'Moderate to Hard',   location: 'Pune & Hills' },
  'honeymoon':             { duration: '4–10 Days',      groupSize: '2 Persons',       difficulty: 'Easy',               location: 'Pan-India / Intl' },
  'transport':             { duration: 'As Required',    groupSize: 'Any Size',        difficulty: 'N/A',                location: 'Pune & Pan-India' },
  'customized-tours':      { duration: 'Flexible',       groupSize: 'Any Size',        difficulty: 'As per tour',        location: 'Anywhere' },
  'event-management':      { duration: '4–24 Hours',     groupSize: '20–2000 Guests',  difficulty: 'N/A',               location: 'Your Venue / Pune' },
  'destination-weddings':  { duration: '2–5 Days',       groupSize: '50–500 Guests',   difficulty: 'N/A',               location: 'Pan-India / Intl' },
  'domestic-international':{ duration: '4–15 Days',      groupSize: '1–100 Persons',   difficulty: 'Easy to Moderate',   location: 'Pan-India / Intl' },
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const svc = ALL_SERVICES.find(s => s.slug === slug)

  const [heroIndex, setHeroIndex]       = useState(0)
  const [openStep, setOpenStep]         = useState<number | null>(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting]     = useState(false)

  const sectionRefs = {
    overview:   useRef<HTMLDivElement>(null),
    process:    useRef<HTMLDivElement>(null),
    inclusions: useRef<HTMLDivElement>(null),
    booking:    useRef<HTMLDivElement>(null),
    reviews:    useRef<HTMLDivElement>(null),
  }

  // Service images from folder
  const images = useMemo(() => svc ? getServiceImages(svc.folderName) : [], [svc])

  // Auto-advance hero images
  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setHeroIndex(i => (i + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [images.length])

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    Object.values(sectionRefs).forEach(r => r.current && observer.observe(r.current))
    return () => observer.disconnect()
  }, [svc])

  const scrollTo = (id: string) => {
    sectionRefs[id as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await sendEnquiryEmail({ ...form, package_interest: svc?.title })
      toast.success("Enquiry sent! We'll contact you within 2 hours. ✅")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Could not send. Please WhatsApp us.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!svc) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service not found</h2>
        <Link to="/services" className="text-[#0A4C8A] font-semibold hover:underline">← Back to Services</Link>
      </div>
    </div>
  )

  const info     = SERVICE_INFO[svc.slug] || { duration: 'Custom', groupSize: 'Any Size', difficulty: 'N/A', location: 'Pune & Pan-India' }
  const reviews  = SERVICE_REVIEWS[svc.slug] || DEFAULT_REVIEWS
  const excl     = getExclusions(svc.slug)
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  const waMsg = encodeURIComponent(`Hi NOVA Tourism! I am interested in your ${svc.title} service. Please share details and pricing. 🌟`)

  const heroSrc = images[heroIndex] ||
    `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80`

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero Slideshow ─────────────────────────────── */}
      <div className="relative h-64 sm:h-80 md:h-[420px] overflow-hidden">
        {images.length > 0 ? (
          images.map((src, i) => (
            <img key={i} src={src} alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: i === heroIndex ? 1 : 0 }}
              onError={(e) => { (e.target as HTMLImageElement).src = heroSrc }}
            />
          ))
        ) : (
          <img src={heroSrc} alt={svc.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link to="/services"
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white shadow-md">
          <ArrowLeft size={13} /> Back
        </Link>

        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.slice(0, 8).map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === heroIndex % Math.min(images.length, 8) ? 'bg-white w-5 h-2' : 'bg-white/50 w-2 h-2'
                }`} />
            ))}
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-gray-800 text-sm">{avgRating}</span>
          <span className="text-gray-500 text-xs">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* ─── Quick Info Bar ──────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-4 sm:gap-6">
          {[
            { icon: Calendar, label: 'Duration',     value: info.duration },
            { icon: Users,    label: 'Group Size',   value: info.groupSize },
            { icon: MapPin,   label: 'Location',     value: info.location },
            { icon: Info,     label: 'Difficulty',   value: info.difficulty },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                <Icon size={13} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="text-gray-900 font-semibold text-xs sm:text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Main Layout ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* Title + Feature pills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{svc.emoji}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-[#0A4C8A]">
                {svc.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {svc.title}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg mb-5">{svc.shortDesc}</p>
            <div className="flex flex-wrap gap-2">
              {svc.features.map((f, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-[#0A4C8A] text-xs px-3 py-1.5 rounded-full font-medium">
                  <Check size={10} /> {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ─── Sticky Section Nav ──────────────────────── */}
          <div className="sticky top-16 sm:top-20 z-20 bg-white border-b border-gray-200 mb-10 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    activeSection === id
                      ? 'text-[#0A4C8A] border-[#0A4C8A]'
                      : 'text-gray-500 border-transparent hover:text-gray-900'
                  }`}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── OVERVIEW ──────────────────────────────── */}
          <div id="overview" ref={sectionRefs.overview} className="mb-14 scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 flex items-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
              Overview
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-3">About this service</p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-8 whitespace-pre-line">
              {svc.overview}
            </p>

            {/* Quick inclusions preview */}
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What's Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {svc.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                    <Check size={10} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── HOW IT WORKS ────────────────────────────── */}
          <div id="process" ref={sectionRefs.process} className="mb-14 scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 flex items-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
              How It Works
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">Our simple 4-step process</p>

            <div className="space-y-3">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenStep(openStep === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 text-white font-black text-sm"
                        style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                        {step.step}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Step {step.step}</p>
                        <p className="text-gray-900 font-bold text-sm sm:text-base">{step.title}</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: openStep === i ? 180 : 0 }}>
                      <ChevronDown size={16} className="text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openStep === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-5 pt-2 bg-gray-50 border-t border-gray-100">
                          <ul className="space-y-2">
                            {step.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0A4C8A] shrink-0 mt-2" />
                                <span className="text-gray-600 text-xs sm:text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* ─── INCLUSIONS & EXCLUSIONS ─────────────────── */}
          <div id="inclusions" ref={sectionRefs.inclusions} className="mb-14 scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 flex items-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
              Inclusions & Exclusions
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">What's covered in this service</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={12} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">What's Included</h3>
                </div>
                <ul className="space-y-2">
                  {svc.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                      <Check size={13} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X size={12} className="text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">Not Included</h3>
                </div>
                <ul className="space-y-2">
                  {excl.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <X size={13} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ─── HOW TO BOOK ─────────────────────────────── */}
          <div id="booking" ref={sectionRefs.booking} className="mb-14 scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 flex items-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
              How to Book
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">Get started in minutes</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: MessageCircle, step: '1', title: 'WhatsApp / Call', desc: 'Message us on WhatsApp or call +91 9730240400. We respond within 2 hours.' },
                { icon: FileText,      step: '2', title: 'Share Details',   desc: 'Tell us your requirements, group size, budget, and preferred dates.' },
                { icon: Check,         step: '3', title: 'Get Your Quote',  desc: 'We send a customized quote. Confirm to book and your coordinator is assigned!' },
              ].map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="p-5 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                  <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-black"
                    style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                    {step}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">{title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
              <h3 className="font-bold mb-1 text-sm sm:text-base" style={{ fontFamily: 'Playfair Display, serif' }}>Ready to Get Started?</h3>
              <p className="text-blue-100 text-xs sm:text-sm mb-3">Our team is available 24/7. Book now and get a customized quote within 2 hours.</p>
              <a href={`https://wa.me/919730240400?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors">
                <MessageCircle size={14} /> Book on WhatsApp
              </a>
            </div>
          </div>

          {/* ─── REVIEWS ─────────────────────────────────── */}
          <div id="reviews" ref={sectionRefs.reviews} className="mb-10 scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 flex items-center gap-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
              Reviews
              <span className="text-gray-400 font-normal text-base">({reviews.length})</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 mb-6 ml-3">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900 text-sm">{avgRating}</span>
              <span className="text-gray-400 text-xs">/ 5 average</span>
            </div>

            <div className="space-y-4">
              {reviews.map((r, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                        <p className="text-gray-400 text-xs">{r.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < r.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm italic">"{r.text}"</p>
                  <div className="flex items-center gap-1 mt-3">
                    <ThumbsUp size={10} className="text-green-500" />
                    <span className="text-green-600 text-xs font-medium">Verified Customer</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex gap-3 flex-wrap">
            <a href={`https://wa.me/919730240400?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-3 rounded-full font-semibold text-sm transition-colors">
              <MessageCircle size={15} /> WhatsApp Us
            </a>
            <a href="tel:+919730240400"
              className="flex items-center gap-2 border-2 border-[#0A4C8A] text-[#0A4C8A] px-5 sm:px-6 py-3 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors">
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>

        {/* RIGHT — Sticky Booking Form */}
        <div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="sticky top-24">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                <h3 className="font-black text-lg sm:text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Get a Free Quote
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">We respond within 2 hours</p>
              </div>
              <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                {[
                  { key: 'name',  label: 'Your Name',     type: 'text',  placeholder: 'Full Name' },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
                  { key: 'phone', label: 'Phone Number',  type: 'tel',   placeholder: '+91 9730240400' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-gray-500 text-xs font-medium mb-1 block">{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-3 py-2.5 text-sm outline-none transition-all" />
                  </div>
                ))}
                <div>
                  <label className="text-gray-500 text-xs font-medium mb-1 block">Message (optional)</label>
                  <textarea rows={3} placeholder="Group size, dates, special requirements..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-3 py-2.5 text-sm outline-none resize-none transition-all" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full text-white py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 shadow-lg text-sm"
                  style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                  {submitting ? 'Sending...' : 'Send Enquiry 🚀'}
                </button>
              </form>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex gap-2">
                <a href={`https://wa.me/919730240400?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-green-100 transition-colors">
                  <MessageCircle size={13} /> WhatsApp
                </a>
                <a href="tel:+919730240400"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors">
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Check size={11} className="text-green-500" />
              <span>Free Quote · No Commitment · 24/7 Support</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}