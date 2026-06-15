// nova-tourism/src/pages/PackageDetails.tsx
import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Check, ArrowLeft, MessageCircle, Phone,
  X, Users, MapPin, ChevronDown, Star, Info,
  Calendar, Navigation, ThumbsUp, FileText,
  Map, List, BookOpen, Award
} from 'lucide-react'
import { submitEnquiry } from '../services/api'
import { useApi } from '../context/ApiContext'
import toast from 'react-hot-toast'
import { sendEnquiryEmail } from '../services/emailService'
import { imgsByPrefix } from '../assets/imageMap'

const SECTIONS = [
  { id: 'overview',    label: 'Overview',     icon: BookOpen },
  { id: 'itinerary',  label: 'Itinerary',     icon: Calendar },
  { id: 'inclusions', label: 'Inclusions',    icon: List },
  { id: 'reach',      label: 'How to Reach',  icon: Map },
  { id: 'reviews',    label: 'Reviews',       icon: Star },
]

export default function PackageDetails() {
  const { id } = useParams()
  const { packages,loading } = useApi()
  const [pkg, setPkg] = useState<any>(null)
  const [openDay, setOpenDay] = useState<number | null>(0)
  const [heroIndex, setHeroIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  // Section refs for scroll-spy
  const sectionRefs = {
    overview:    useRef<HTMLDivElement>(null),
    itinerary:   useRef<HTMLDivElement>(null),
    inclusions:  useRef<HTMLDivElement>(null),
    reach:       useRef<HTMLDivElement>(null),
    reviews:     useRef<HTMLDivElement>(null),
  }

  const pkgImages = useMemo(() => {
    if (!pkg) return []
    const prefix =
      pkg.category === 'school'    ? 'school-trip'    :
      pkg.category === 'corporate' ? 'corporate-trip' :
      pkg.category === 'outdoor'   ? 'outdoor-trek'   :
      pkg.category === 'indoor'    ? 'indoor-event'   :
      pkg.category === 'goa'       ? 'goa-trip'       :  // ← ADD THIS LINE
      pkg.category === 'normal'    ? 'normal-trip'    : 'any-other'
    const imgs = imgsByPrefix(prefix)
    return imgs.length > 0 ? imgs : [pkg.image_url].filter(Boolean)
  }, [pkg])

  // Auto-advance hero images
  useEffect(() => {
    if (pkgImages.length <= 1) return
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % pkgImages.length), 4000)
    return () => clearInterval(timer)
  }, [pkgImages.length])



  useEffect(() => {

  if (loading) return

  window.scrollTo(0, 0)

  const found = packages.find(p => p.id === Number(id))

  if (found) {
    console.log("PACKAGE FOUND:", found) // debug
    setPkg(found)
  }

}, [id, packages, loading])

  // Scroll-spy: track which section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current)
    })
    return () => observer.disconnect()
  }, [pkg])

  const scrollToSection = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs]
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const parse = (str: string, fallback: any = []) => {
    try { return JSON.parse(str) } catch { return fallback }
  }

  const highlights  = pkg ? parse(pkg.highlights) : []
  const itinerary   = pkg ? parse(pkg.itinerary ?? '[]') : []
  const inclusions  = pkg ? parse(pkg.inclusions ?? '[]') : []
  const exclusions  = pkg ? parse(pkg.exclusions ?? '[]') : []
  const reviews     = pkg ? parse(pkg.reviews ?? '[]') : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await sendEnquiryEmail({ ...form, package_interest: pkg?.title })
      submitEnquiry({ ...form, package_interest: pkg?.title }).catch(() => {})
      toast.success("Enquiry sent! We'll contact you within 24 hours. ✅")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Could not send. Please WhatsApp us at +91 9767188314')
    } finally {
      setSubmitting(false)
    }
  }

  if (!pkg) return (
    <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: '#f7941d', borderTopColor: 'transparent' }} />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  )

  const avgRating = reviews.length
    ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero Slideshow ──────────────────────── */}
      <div className="relative h-72 md:h-105 overflow-hidden">
        {pkgImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&auto=format&fit=crop'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <Link to="/packages"
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white shadow-md">
          <ArrowLeft size={14} /> Back
        </Link>

        {pkgImages.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {pkgImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === heroIndex ? 'bg-white w-6 h-2' : 'bg-white/50 w-2 h-2'
                }`} />
            ))}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="absolute bottom-5 right-5 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-800 text-sm">{avgRating}</span>
            <span className="text-gray-500 text-xs">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {/* ─── Quick Info Bar ──────────────────────── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6">
          {[
            { icon: Calendar, label: 'Duration', value: pkg.duration },
            { icon: Users, label: 'Group Size', value: pkg.group_size || '5–200 Persons' },
            { icon: MapPin, label: 'Starting From', value: pkg.start_location || 'Pune' },
            { icon: Info, label: 'Difficulty', value: pkg.difficulty || 'Easy' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                <Icon size={14} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">{label}</p>
                <p className="text-gray-900 font-semibold text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Main Layout ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT — All Sections */}
        <div className="lg:col-span-2">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize border border-orange-200 bg-orange-50 text-orange-600">
                {pkg.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock size={13} className="text-orange-400" /> {pkg.duration}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">{pkg.title}</h1>
            <p className="text-gray-500 text-lg mb-5">{pkg.description}</p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-2">
              {highlights.map((h: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  <Check size={11} /> {h}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ─── Sticky Section Nav ───────────────── */}
          <div className="sticky top-20 z-20 bg-white border-b border-gray-200 mb-10 -mx-6 px-6">
            <div className="flex gap-0 overflow-x-auto">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    activeSection === id
                      ? 'text-[#e63228] border-[#f7941d]'
                      : 'text-gray-500 border-transparent hover:text-gray-900'
                  }`}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── OVERVIEW ─────────────────────────── */}
          <div id="overview" ref={sectionRefs.overview} className="mb-14 scroll-mt-32">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              Overview
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-3">About this trip</p>
            {pkg.overview && (
              <p className="text-gray-600 leading-relaxed text-base mb-8">
                {pkg.overview}
              </p>
            )}
            {inclusions.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inclusions.slice(0, 6).map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                        <Check size={10} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ─── ITINERARY ────────────────────────── */}
          <div id="itinerary" ref={sectionRefs.itinerary} className="mb-14 scroll-mt-32">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              Itinerary (Day Wise)
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">Detailed plan for your trip</p>

            {itinerary.length === 0 ? (
              <p className="text-gray-400 italic">Contact us for detailed itinerary.</p>
            ) : (
              <div className="space-y-3">
                {itinerary.map((day: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenDay(openDay === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-black text-sm"
                          style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                          {day.day}
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-medium">Day {day.day}</p>
                          <p className="text-gray-900 font-bold">{day.title}</p>
                        </div>
                      </div>
                      <motion.div animate={{ rotate: openDay === i ? 180 : 0 }}>
                        <ChevronDown size={18} className="text-gray-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openDay === i && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-2 bg-gray-50 border-t border-gray-100">
                            <ul className="space-y-2">
                              {day.activities.map((act: string, j: number) => (
                                <li key={j} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-2" />
                                  <span className="text-gray-600 text-sm">{act}</span>
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
            )}
          </div>

          {/* ─── KEY HIGHLIGHTS ───────────────────── */}
          <div className="mb-14">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              Key Highlights
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">Why this trip is special</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((h: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <Award size={15} className="text-[#f7941d]" />
                  </div>
                  <span className="text-gray-800 text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── INCLUSIONS & EXCLUSIONS ──────────── */}
          <div id="inclusions" ref={sectionRefs.inclusions} className="mb-14 scroll-mt-32">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              Inclusions & Exclusions
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">What's covered in this package</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={13} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">What's Included</h3>
                </div>
                <ul className="space-y-2">
                  {inclusions.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                      <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X size={13} className="text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-900">Not Included</h3>
                </div>
                <ul className="space-y-2">
                  {exclusions.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ─── HOW TO REACH ─────────────────────── */}
          <div id="reach" ref={sectionRefs.reach} className="mb-14 scroll-mt-32">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              How to Reach
            </h2>
            <p className="text-gray-400 text-xs mb-6 ml-3">Transport & logistics</p>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                <Navigation size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Transport & Logistics</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pkg.how_to_reach || 'We arrange pickups from Pune for all our trips. Contact us for details.'}
                </p>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 mb-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin size={15} className="text-orange-500" /> Starting Location
              </h3>
              <p className="text-gray-600 text-sm">{pkg.start_location || 'Pune, Maharashtra'}</p>
              <a href="https://www.google.com/maps/search/Pune+Maharashtra"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm font-semibold"
                style={{ color: '#e63228' }}>
                View on Google Maps →
              </a>
            </div>

            <div className="p-5 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
              <h3 className="font-bold mb-1">Need Help With Pickup?</h3>
              <p className="text-white/80 text-sm mb-3">Call us — we arrange everything.</p>
              <a href="tel:+919730240400"
                className="inline-flex items-center gap-2 bg-white font-bold px-4 py-2 rounded-full text-sm"
                style={{ color: '#e63228' }}>
                <Phone size={13} /> +91 9730240400
              </a>
            </div>
          </div>

          {/* ─── REVIEWS ──────────────────────────── */}
          <div id="reviews" ref={sectionRefs.reviews} className="mb-10 scroll-mt-32">
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-1 h-7 rounded-full inline-block" style={{ background: 'linear-gradient(#e63228,#f7941d)' }} />
              Reviews
              <span className="text-gray-400 font-normal text-lg">({reviews.length})</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 mb-6 ml-3">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{avgRating}</span>
              <span className="text-gray-400 text-sm">/ 5 average</span>
            </div>

            {reviews.length === 0 ? (
              <p className="text-gray-400 italic">No reviews yet. Be the first!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review: any, i: number) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-orange-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                          style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                          <p className="text-gray-400 text-xs">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={13}
                            className={j < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                    <div className="flex items-center gap-1 mt-3">
                      <ThumbsUp size={11} className="text-green-500" />
                      <span className="text-green-600 text-xs font-medium">Verified Traveler</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contact buttons */}
          <div className="flex gap-4 flex-wrap">
            <a href={`https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package.`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a href="tel:+919730240400"
              className="flex items-center gap-2 border-2 border-orange-400 text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>

        {/* RIGHT — Sticky Booking Form */}
        <div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="sticky top-24">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 text-white"
                style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                <h3 className="font-black text-xl">Book This Trip</h3>
                <p className="text-white/80 text-sm mt-1">We respond within 24 hours</p>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {[
                  { key: 'name',  label: 'Your Name',       type: 'text',  placeholder: 'Amey Borate' },
                  { key: 'email', label: 'Email Address',   type: 'email', placeholder: 'you@email.com' },
                  { key: 'phone', label: 'Phone Number',    type: 'tel',   placeholder: '+91 9730240400' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-gray-500 text-xs font-medium mb-1 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-gray-50 border border-gray-200 focus:border-orange-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-500 text-xs font-medium mb-1 block">Message (optional)</label>
                  <textarea value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Group size, dates, special requirements..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-orange-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all placeholder-gray-400"
                  />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full text-white py-3.5 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                  {submitting ? 'Sending...' : 'Send Enquiry 🚀'}
                </button>
              </form>
              <div className="px-5 pb-5 flex gap-2">
                <a href={`https://wa.me/919730240400?text=Hi%20NOVA!%20Interested%20in%20${encodeURIComponent(pkg.title)}`}
                  target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 text-green-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="tel:+919730240400"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Check size={13} className="text-green-500" />
              <span>Safe & Secure • No Spam • Free Cancellation</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}