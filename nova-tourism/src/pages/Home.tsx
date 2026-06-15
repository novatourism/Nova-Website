// nova-tourism/src/pages/Home.tsx
import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, Users, MapPin, Award, ArrowRight } from 'lucide-react'
import { useApi } from '../context/ApiContext'
import TripCard from '../components/TripCard'
import { StaggerGrid, StaggerItem, staggerItemVariants } from '../components/ScrollEffects'
import VideoReviews from '../components/VideoReviews'
import TripPartners from '../components/TripPartners'
import GalleryPreview from '../components/GalleryPreview'
import { imgsByPrefix } from '../assets/imageMap'
import ServiceCard from '../components/ServiceCard'
import { ALL_SERVICES } from '../data/services'



const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'School Principal',       text: 'NOVA organized an amazing school trip for 200 students. Everything was perfectly planned and safe!',         stars: 5 },
  { name: 'Rahul Mehta',  role: 'HR Manager, TCS',        text: 'Our corporate retreat was flawless. Team morale shot up after the experience!',                               stars: 5 },
  { name: 'Anjali Singh', role: 'Travel Enthusiast',      text: 'Booked the Goa package and it was beyond expectations. Will definitely book again!',                         stars: 5 },
]

const WHY_NOVA = [
  { emoji: '🛡️', title: 'Safety First',        desc: 'All trips are conducted with certified guides, first aid kits, and insurance coverage.' },
  { emoji: '⭐', title: 'Curated Experiences',  desc: 'Every itinerary is hand-crafted by travel experts for maximum memories.' },
  { emoji: '📞', title: '24/7 Support',         desc: 'Our team is available round the clock throughout your journey.' },
  { emoji: '💰', title: 'Best Value',           desc: 'Premium experiences at transparent pricing — no hidden costs.' },
  { emoji: '🌍', title: '50+ Destinations',     desc: 'From local gems to exotic escapes, we cover all of India.' },
  { emoji: '🎯', title: 'Custom Itineraries',   desc: "Tell us your dream trip and we'll make it happen." },
]

const STATS = [
  { icon: Users,  value: '5,000+', label: 'Happy Travelers',  accentClass: 'bg-[#00B4D8]', iconClass: 'text-[#00B4D8]', bgClass: 'bg-[#e6f7fb]' },
  { icon: MapPin, value: '50+',    label: 'Destinations',     accentClass: 'bg-[#0A4C8A]', iconClass: 'text-[#0A4C8A]', bgClass: 'bg-[#e6eef5]' },
  { icon: Star,   value: '4.9',    label: 'Average Rating',   accentClass: 'bg-[#00B4D8]', iconClass: 'text-[#00B4D8]', bgClass: 'bg-[#e6f7fb]' },
  { icon: Award,  value: '7+',     label: 'Years Experience', accentClass: 'bg-[#0A4C8A]', iconClass: 'text-[#0A4C8A]', bgClass: 'bg-[#e6eef5]' },
]

export default function Home() {
  const { packages, loading } = useApi()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const featuredPackages = packages.slice(0, 6)

  // ─── Hero Images Auto Slider ──────────────────────────
  const heroImages = useMemo(() => {
    const imgs = imgsByPrefix('hero')
    return imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop']
  }, [])

  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef}className="relative min-h-[85vh] md:h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {heroImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="NOVA Tourism Hero"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f1e]/60 via-[#0a0f1e]/30 to-[#0a0f1e]" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-amber-400 text-sm font-medium">✨ Premium Travel Experiences</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Where Every Journey{' '}
            
            
            Becomes a Memory
          </motion.h1>

          <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/services"
            className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
            Explore Services
          </Link>
          <Link to="/quote"
            className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
            Plan My Trip
          </Link>
        </motion.div>
        </motion.div>

        {/* Hero dots */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHeroIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === heroIndex ? 'bg-white w-6 h-2' : 'bg-white/50 w-2 h-2'
                }`}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 cursor-pointer z-10"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden bg-[#0d1425]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(247,148,29,0.12)_0%,transparent_60%)]" />
        <StaggerGrid className="relative max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label, accentClass, iconClass, bgClass }) => (
            <StaggerItem key={label} variants={staggerItemVariants}>
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${accentClass}`} />
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgClass}`}>
                  <Icon size={20} className={iconClass} />
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900 leading-none mb-0.5">{value}</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ─── TRIP PARTNERS ─────────────────────────────────── */}
      <TripPartners />

      {/* ─── OUR SERVICES ─────────────────────────────────────── */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-12"          >
            <div className="text-center w-full">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              What We <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Offer</span>
            </h2>
            <p className="text-gray-500">End-to-end travel & event solutions for every need</p>
          </div>
          </motion.div>

          {/* 8 service cards — same grid as Featured Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALL_SERVICES.slice(0, 8).map((svc, i) => (
              <ServiceCard key={svc.slug} service={svc} index={i} />
            ))}
          </div>

          {/* Mobile + desktop "View All" button */}
          <div className="text-center mt-10">
            <Link to="/services"
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
              View All {ALL_SERVICES.length} Services <ArrowRight size={16} />
            </Link>
          </div>
        </section>


      

      {/* ─── GALLERY PREVIEW ───────────────────────────────── */}
      <GalleryPreview />

      {/* ─── VIDEO REVIEWS (moved above Why Choose Us) ─────── */}
      <VideoReviews />

      {/* ─── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            What <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Travelers Say</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-orange-100 transition-all"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-5 italic">"{t.text}"</p>
              <div>
                <p className="text-gray-900 font-semibold">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE NOVA ───────────────────────────────── */}
      <section className="py-20 bg-[#0d1425] border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
           <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose <span className="text-4xl md:text-5xl font-black text-white mb-4">NOVA?</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_NOVA.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <div className="text-3xl shrink-0">{item.emoji}</div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-3xl p-12 border border-blue-100"
              style={{ background: 'linear-gradient(135deg, rgba(10,76,138,0.04), rgba(0,180,216,0.06))' }}          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Ready to <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explore?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">Let's plan your perfect trip. Talk to our travel experts today.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/quote"
              className="flex items-center gap-2 text-white px-3 sm:px-8 py-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:scale-105 transition-transform hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                Get in Touch
              </Link>

              <a
                href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500 text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-500/10 transition-colors"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}