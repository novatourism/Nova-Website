// nova-tourism/src/pages/Gallery.tsx
import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Play, Image as ImageIcon, Video } from 'lucide-react'
import { FadeUp } from '../components/ScrollEffects'
import { getAllServiceImages } from '../assets/imageMap'

// ─── Regular images ──────────────────────────────────────────
const imageModules = import.meta.glob<{ default: string }>(
  '../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
)

// ─── Videos ─────────────────────────────────────────────────
const videoModules = import.meta.glob<{ default: string }>(
  '../assets/videos/*.{mp4,webm,mov,MP4,MOV,WEBM}',
  { eager: true }
)

// ─── Category from filename ──────────────────────────────────
function guessCategory(filename: string): string {
  const n = filename.toLowerCase()
  if (n.includes('school')      || n.includes('student'))               return 'school'
  if (n.includes('corp')        || n.includes('office'))                return 'corporate'
  if (n.includes('outdoor')     || n.includes('adventure'))             return 'outdoor'
  if (n.includes('trek'))                                               return 'outdoor'
  if (n.includes('indoor')      || n.includes('party'))                 return 'events'
  if (n.includes('normal-trip') || n.includes('normal'))                return 'normal'
  if (n.includes('goa')         || n.includes('beach'))                 return 'goa'
  return 'general'
}

// ─── Category from service folder name ──────────────────────
function folderToCategory(folder: string): string {
  const f = folder.toLowerCase()
  if (f.includes('school educational') || f.includes('college &ind'))   return 'school'
  if (f.includes('school & college'))                                   return 'school'
  if (f.includes('corporate'))                                          return 'corporate'
  if (f.includes('adventure'))                                          return 'outdoor'
  if (f.includes('event planning') || f.includes('destination wed'))    return 'events'
  if (f.includes('honeymoon'))                                          return 'honeymoon'
  if (f.includes('pilgrimage'))                                         return 'pilgrimage'
  if (f.includes('family')  || f.includes('group') || f.includes('solo')) return 'normal'
  if (f.includes('domestic') || f.includes('customized'))               return 'travel'
  if (f.includes('transport'))                                          return 'general'
  return 'general'
}

const CAT_LABELS: Record<string, string> = {
  All:        'All',
  Photos:     '📷 Photos',
  Videos:     '🎥 Videos',
  school:     '🏫 School',
  corporate:  '💼 Corporate',
  outdoor:    '🏕️ Outdoor',
  events:     '🎉 Events',
  honeymoon:  '💑 Honeymoon',
  pilgrimage: '🕉️ Pilgrimage',
  normal:     '🌿 Getaways',
  goa:        '🏖️ Goa',
  travel:     '✈️ Travel',
  general:    'Other',
}

interface MediaItem {
  id: number
  title: string
  url: string
  category: string
  type: 'image' | 'video'
}

const CATS = [
  'All', 'Photos', 'Videos',
  'school', 'corporate', 'outdoor', 'events',
  'honeymoon', 'pilgrimage', 'normal', 'goa', 'travel', 'general'
]

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<MediaItem | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const allMedia = useMemo<MediaItem[]>(() => {
    let id = 1

    // Regular images
    const regularImages: MediaItem[] = Object.entries(imageModules)
      .filter(([p]) => {
        const n = p.toLowerCase()
        return !n.includes('logo') && !n.includes('hero') && !n.includes('amey-borate')
      })
      .map(([path, mod]) => {
        const filename = path.split('/').pop() || ''
        return {
          id: id++,
          title: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          url: mod.default,
          category: guessCategory(filename),
          type: 'image' as const,
        }
      })

    // Service folder images (all 16 folders)
    const serviceImages: MediaItem[] = getAllServiceImages().map(({ url, folder }) => ({
      id: id++,
      title: folder,
      url,
      category: folderToCategory(folder),
      type: 'image' as const,
    }))

    // Videos
    const videos: MediaItem[] = Object.entries(videoModules).map(([path, mod]) => ({
      id: id++,
      title: (path.split('/').pop() || '')
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase()),
      url: mod.default,
      category: guessCategory(path.split('/').pop() || ''),
      type: 'video' as const,
    }))

    return [...regularImages, ...serviceImages, ...videos]
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return allMedia
    if (filter === 'Photos') return allMedia.filter(m => m.type === 'image')
    if (filter === 'Videos') return allMedia.filter(m => m.type === 'video')
    return allMedia.filter(m => m.category === filter)
  }, [filter, allMedia])

  const activeCats = CATS.filter(cat => {
    if (cat === 'All') return true
    if (cat === 'Photos') return allMedia.some(m => m.type === 'image')
    if (cat === 'Videos') return allMedia.some(m => m.type === 'video')
    return allMedia.some(m => m.category === cat)
  })

  const photoCount = allMedia.filter(m => m.type === 'image').length
  const videoCount = allMedia.filter(m => m.type === 'video').length

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="relative py-16 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <FadeUp>
            <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">Our Memories</p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Trip <span className="text-white">Gallery</span>
            </h1>
          </FadeUp>
          <p className="text-blue-100 text-lg">Real moments from real journeys — captured forever</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-blue-200">
            <span className="flex items-center gap-1"><ImageIcon size={14} /> {photoCount} Photos</span>
            <span className="flex items-center gap-1"><Video size={14} /> {videoCount} Videos</span>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap justify-center px-6 py-5 sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        {activeCats.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              filter === cat
                ? 'text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-[#0A4C8A]'
            }`}
            style={filter === cat ? { background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' } : {}}>
            {cat === 'All' ? `All (${allMedia.length})` : (CAT_LABELS[cat] || cat)}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-20">
        {allMedia.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-400">Add images to <code className="text-[#0A4C8A]">src/assets/images/</code></p>
            <p className="text-gray-400">Add service images to <code className="text-[#0A4C8A]">src/assets/Services/</code></p>
          </div>
        ) : (
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id} layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.015 }}
                  className="break-inside-avoid group relative cursor-pointer rounded-2xl overflow-hidden mb-3 border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all"
                  onClick={() => setSelected(item)}
                >
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="relative bg-gray-900">
                      <video src={item.url} className="w-full object-cover" preload="metadata" muted
                        style={{ maxHeight: '280px' }} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={22} className="text-[#0A4C8A] ml-1" fill="#0A4C8A" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Video size={10} /> Video
                      </div>
                    </div>
                  )}

                  {item.type === 'image' && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn className="text-white" size={20} />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500/30 transition-colors z-10">
              <X size={20} />
            </button>
            <div className="text-center max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              {selected.type === 'image' ? (
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  src={selected.url} alt={selected.title}
                  className="max-w-full max-h-[80vh] rounded-2xl object-contain mx-auto shadow-2xl"
                />
              ) : (
                <motion.video
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  ref={videoRef} src={selected.url} controls autoPlay
                  className="max-w-full max-h-[80vh] rounded-2xl mx-auto shadow-2xl"
                  style={{ maxWidth: '900px' }}
                />
              )}
              <p className="text-white font-semibold mt-3">{selected.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}