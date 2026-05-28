// nova-tourism/src/components/GalleryPreview.tsx
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Auto-load all gallery images
const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

export default function GalleryPreview() {
  const images = useMemo(() => {
    return Object.entries(galleryModules)
      .filter(([path]) => {
        const n = path.toLowerCase()
        return !n.includes('logo') && !n.includes('hero')
      })
      .map(([, mod]) => mod.default)
  }, [])

  if (images.length === 0) return null

  // Split into two rows, shuffle slightly
  const row1 = images.filter((_, i) => i % 2 === 0)
  const row2 = images.filter((_, i) => i % 2 === 1)

  // Triple for seamless loop
  const doubledRow1 = [...row1, ...row1, ...row1]
  const doubledRow2 = [...row2, ...row2, ...row2]

  return (
    <section className="py-16 overflow-hidden bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-[#f7941d] text-sm font-semibold tracking-widest uppercase mb-2">Our Memories</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Moments We've <span className="nova-text-gradient">Captured</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden md:flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all"
            style={{ color: '#e63228' }}
          >
            View Full Gallery <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

        <div className="flex gap-3 animate-marquee-gallery w-max">
          {doubledRow1.map((url, i) => (
            <div
              key={i}
              className="shrink-0 rounded-xl overflow-hidden border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group"
              style={{ width: '200px', height: '250px' }}
            >
              <img
                src={url}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

        <div className="flex gap-3 animate-marquee-reverse w-max">
          {doubledRow2.map((url, i) => (
            <div
              key={i}
              className="shrink-0 rounded-xl overflow-hidden border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group"
              style={{ width: '200px', height: '250px' }}
            >
              <img
                src={url}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 md:hidden">
        <Link to="/gallery"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors">
          View Full Gallery <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}