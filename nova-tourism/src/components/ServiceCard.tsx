// nova-tourism/src/components/ServiceCard.tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { getServiceImages } from '../assets/imageMap'
import type { Service } from '../data/services'

const FALLBACKS: Record<string, string> = {
  'domestic-international': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  'school-trips':           'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  'college-visits':         'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
  'corporate-tours':        'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80',
  'corporate-events':       'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'school-college-events':  'https://images.unsplash.com/photo-1478147427282-58a87a0350b8?w=600&q=80',
  'family-tours':           'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
  'group-tours':            'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80',
  'solo-travel':            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'pilgrimage':             'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
  'adventure-tours':        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  'honeymoon':              'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80',
  'transport':              'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
  'customized-tours':       'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
  'event-management':       'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
  'destination-weddings':   'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
}

interface Props {
  service: Service
  index?: number
}

export default function ServiceCard({ service, index = 0 }: Props) {
  // Load images from service folder at render time
  const images = getServiceImages(service.folderName)
  const [imgIndex, setImgIndex] = useState(0)

  // Auto-cycle every 3.5s, staggered by card index (same as TripCard)
  useEffect(() => {
    if (images.length <= 1) return
    let interval: ReturnType<typeof setInterval>
    const delay = index * 700
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setImgIndex(i => (i + 1) % images.length)
      }, 3500)
    }, delay)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [images.length, index])

  const finalSrc =
    images[imgIndex] ||
    FALLBACKS[service.slug] ||
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group bg-linear-to-r from-blue-100 to-cyan-50 border border-blue-300 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={finalSrc}
          alt={service.title}  
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            const fb = FALLBACKS[service.slug] || FALLBACKS['domestic-international']
            if (t.src !== fb) t.src = fb
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.slice(0, 6).map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${
                i === imgIndex % Math.min(images.length, 6)
                  ? 'bg-white w-4 h-1.5'
                  : 'bg-white/50 w-1.5 h-1.5'
              }`} />
            ))}
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-sm text-gray-700">
            <span>{service.emoji}</span>
            <span>{service.title.split(' ').slice(0, 2).join(' ')}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#0A4C8A] transition-colors leading-snug line-clamp-1"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {service.shortDesc}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">
            {images.length > 0 ? `📸 ${images.length} photos` : '✨ View details'}
          </span>
          <Link
            to={`/services/${service.slug}`}
            className="flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all duration-300"
            style={{ color: '#0A4C8A' }}
          >
            Explore <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}