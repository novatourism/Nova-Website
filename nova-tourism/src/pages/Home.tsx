// nova-tourism/src/pages/Home.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, Users, MapPin, Award, ArrowRight } from 'lucide-react'
import { useApi } from '../context/ApiContext'
import TripCard from '../components/TripCard'
import { FadeUp, StaggerGrid, StaggerItem, staggerItemVariants, AnimatedCounter } from '../components/ScrollEffects'
import VideoReviews from '../components/VideoReviews'
import TripPartners from '../components/TripPartners'
import GalleryPreview from '../components/GalleryPreview'
import { useState as useHeroState, useEffect as useHeroEffect, useMemo as useHeroMemo } from 'react'
import { imgsByPrefix } from '../assets/imageMap'


// ─── IMAGE PATHS ────────────────────────────────────────────
// Add your images to: C:\Users\Guruprasad\OneDrive\Desktop\NOVA\nova-tourism\src\assets\images\
const heroImg = '/images/hero.png'
// If you don't have hero.png yet, it falls back to Unsplash below

const STATS = [
  { icon: Users, value: '5000+', label: 'Happy Travelers' },
  { icon: MapPin, value: '50+', label: 'Destinations' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
  { icon: Award, value: '7+', label: 'Years Experience' },
]

const CATEGORIES = [
  { emoji: '🎒', label: 'School Trips', desc: 'Educational & fun adventures', cat: 'school', color: 'from-blue-500 to-cyan-500' },
  { emoji: '💼', label: 'Corporate', desc: 'Team building retreats', cat: 'corporate', color: 'from-purple-500 to-indigo-500' },
  { emoji: '🌿', label: 'Getaways', desc: 'Weekend escapes', cat: 'normal', color: 'from-green-500 to-emerald-500' },
  { emoji: '🎭', label: 'Indoor Events', desc: 'Themed & custom events', cat: 'indoor', color: 'from-pink-500 to-rose-500' },
  { emoji: '🏔️', label: 'Outdoor', desc: 'Treks & adventures', cat: 'outdoor', color: 'from-orange-500 to-amber-500' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'School Principal', text: 'NOVA organized an amazing school trip for 200 students. Everything was perfectly planned and safe!', stars: 5 },
  { name: 'Rahul Mehta', role: 'HR Manager, TCS', text: 'Our corporate retreat was flawless. Team morale shot up after the experience!', stars: 5 },
  { name: 'Anjali Singh', role: 'Travel Enthusiast', text: 'Booked the Goa package and it was beyond expectations. Will definitely book again!', stars: 5 },
]

export default function Home() {
  const { packages, loading } = useApi()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const featuredPackages = packages.slice(0, 6)

// ─── Hero Images Auto Slider ─────────────────
  const heroImages = useHeroMemo(() => {
    const imgs = imgsByPrefix('hero')

    // fallback image
    return imgs.length > 0 ? imgs : ['/images/hero.png']
  }, [])

  const [heroIndex, setHeroIndex] = useHeroState(0)

  useHeroEffect(() => {
    if (heroImages.length <= 1) return

    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">

        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="NOVA Tourism Hero"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-amber-400 text-sm font-medium">✨ Premium Travel Experiences</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Where Every{' '}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Journey
            </span>{' '}
            Becomes a Memory
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            School trips, corporate retreats, adventure treks, and dream getaways — crafted with passion for Pune and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/packages"
              className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300">
              Explore Packages
            </Link>
            <Link to="/contact"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Plan My Trip
            </Link>
          </motion.div>
        </motion.div>

          {heroImages.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ─── STATS ───────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1425 100%, #1a2340 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(247,148,29,0.12) 0%, transparent 60%)'
        }} />
        <StaggerGrid className="relative max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users,  value: '5,000+', label: 'Happy Travelers', accent: '#f7941d', bg: '#fff5e6' },
            { icon: MapPin, value: '50+',    label: 'Destinations',    accent: '#e63228', bg: '#fdecea' },
            { icon: Star,   value: '4.9',    label: 'Average Rating',  accent: '#f7941d', bg: '#fff5e6' },
            { icon: Award,  value: '7+',     label: 'Years Experience',accent: '#e63228', bg: '#fdecea' },
          ].map(({ icon: Icon, value, label, accent, bg }) => (
            <StaggerItem key={label} variants={staggerItemVariants}>
              <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-2xl" style={{ background: accent }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                  <Icon size={20} style={{ color: accent }} />
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

      <TripPartners /> 


      {/* ─── CATEGORIES ─────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
             <span className="text-4xl font-black text-gray-900 mb-3">What<span
              className="nova-text-gradient"> We Offer</span>
              </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">From thrilling outdoor adventures to elegant indoor events — we do it all.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map(({ emoji, label, desc, cat, color }, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <Link
                to={`/packages?category=${cat}`}
                className="block bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-orange-50 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform text-2xl`}>
                  {emoji}
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">{label}</h3>
                <p className="text-gray-500 text-xs">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PACKAGES ──────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              Featured <span className="nova-text-gradient">Packages</span>
            </h2>
            <p className="text-gray-400">Handpicked experiences for every type of traveler</p>
          </div>
          <Link to="/packages" className="hidden md:flex items-center gap-2 font-semibold hover:gap-3 transition-all" style={{ color: '#e63228' }}>
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, i) => (
              <TripCard key={pkg.id} {...pkg} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 md:hidden">
          <Link to="/packages" className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-6 py-3 rounded-full font-semibold">
            View All Packages <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <GalleryPreview /> 

      {/* ─── WHY CHOOSE US ──────────────────────────────── */}
      <section className="py-20 bg-[#0d1425] border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-amber-400">NOVA?</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🛡️', title: 'Safety First', desc: 'All trips are conducted with certified guides, first aid kits, and insurance coverage.' },
              { emoji: '⭐', title: 'Curated Experiences', desc: 'Every itinerary is hand-crafted by travel experts for maximum memories.' },
              { emoji: '📞', title: '24/7 Support', desc: 'Our team is available round the clock throughout your journey.' },
              { emoji: '💰', title: 'Best Value', desc: 'Premium experiences at transparent pricing — no hidden costs.' },
              { emoji: '🌍', title: '50+ Destinations', desc: 'From local gems to exotic escapes, we cover all of India.' },
              { emoji: '🎯', title: 'Custom Itineraries', desc: 'Tell us your dream trip and we\'ll make it happen.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
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

      {/* ─── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-black text-white mb-4">
            <span className="text-4xl font-black text-gray-900 mb-3">
              What <span className="nova-text-gradient">Travelers Say</span>
            </span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-orange-100 transition-all">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
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
      <VideoReviews />
      {/* ─── CTA ─────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-orange-50 to-red-50 border border-orange-100 rounded-3xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Ready to <span className="nova-text-gradient">Explore?</span></h2>
            <p className="text-gray-600 text-lg mb-8">Let's plan your perfect trip. Talk to our travel experts today.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/30">
                Get in Touch
              </Link>
              <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F" target="_blank" rel="noreferrer"
                className="border border-green-500 text-green-400 px-8 py-4 rounded-full font-bold hover:bg-green-500/10 transition-colors">
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}