// nova-tourism/src/components/TripCard.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, ChevronRight, Star } from 'lucide-react'
import { imgsByPrefix } from '../assets/imageMap'
import { useState, useEffect } from 'react'

interface TripCardProps {
  id: number
  title: string
  description: string
  category: string
  duration: string
  image_url: string
  index?: number
}

// ─── Category → image prefix mapping ────────────
const CATEGORY_PREFIXES: Record<string, string> = {
  school:    'school-trip',
  corporate: 'corporate-trip',
  normal:    'normal-trip',
  indoor:    'indoor-event',
  outdoor:   'outdoor-trek',
  goa:       'goa-trip',          // ← ADD THIS
}

// ─── Unsplash fallbacks (last resort) ───────────
const FALLBACKS: Record<string, string> = {
  school:    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  corporate: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80',
  normal:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  indoor:    'https://images.unsplash.com/photo-1478147427282-58a87a0350b8?w=600&q=80',
  outdoor:   'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  goa:       'https://images.unsplash.com/photo-1540528147463-d2c3d0e8f9b8?w=600&q=80',
  general:   'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
}

const categoryColors: Record<string, string> = {
  school:    'bg-blue-50 text-blue-600 border-blue-200',
  corporate: 'bg-purple-50 text-purple-600 border-purple-200',
  normal:    'bg-green-50 text-green-600 border-green-200',
  indoor:    'bg-pink-50 text-pink-600 border-pink-200',
  outdoor:   'bg-orange-50 text-orange-600 border-orange-200',
  goa:       'bg-teal-50 text-teal-600 border-teal-200',
}

const categoryLabels: Record<string, string> = {
  school:    '🎒 School Trip',
  corporate: '💼 Corporate',
  normal:    '🌿 Getaway',
  indoor:    '🎭 Indoor Event',
  outdoor:   '🏔️ Outdoor',
  goa:       '🏖️ Goa Holiday',
}

export default function TripCard({ id, title, description, category, duration, image_url, index = 0 }: TripCardProps) {
  const prefix = CATEGORY_PREFIXES[category] || 'any-other'
  const localImages = imgsByPrefix(prefix)

  const [imgIndex, setImgIndex] = useState(0)

  // Auto-cycle images every 3 seconds, staggered by card index
  useEffect(() => {
    if (localImages.length <= 1) return
    const delay = index * 800 // stagger start so cards don't all change at once
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setImgIndex(i => (i + 1) % localImages.length)
      }, 3500)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [localImages.length, index])

  const finalSrc = localImages[imgIndex] || image_url || FALLBACKS[category] || FALLBACKS.general

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={finalSrc}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            const fallback = FALLBACKS[category] || FALLBACKS.general
            if (target.src !== fallback) target.src = fallback
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

        {/* Image dots */}
        {localImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {localImages.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${
                i === imgIndex ? 'bg-white w-4 h-1.5' : 'bg-white/50 w-1.5 h-1.5'
              }`} />
            ))}
          </div>
        )}

        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {categoryLabels[category] || category}
        </span>
        <div className="absolute top-3 right-3 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-[#e63228] transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Clock size={13} className="text-[#f7941d]" />
            <span>{duration}</span>
          </div>
          <Link
            to={`/packages/${id}`}
            className="flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all duration-300"
            style={{ color: '#e63228' }}
          >
            Explore <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}