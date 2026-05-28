// nova-tourism/src/components/VideoReviews.tsx
import { useState, useRef, useMemo,useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Auto-load video reviews
const reviewVideoModules = import.meta.glob<{ default: string }>(
  '../assets/video_reviews/*.{mp4,webm,mov,MP4,MOV,WEBM}',
  { eager: true }
)

export default function VideoReviews() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
   
  

  const videos = useMemo(() => {
  return Object.entries(reviewVideoModules).map(([path, mod], i) => {
    
    const filename = path.split('/').pop() || ''
    const name = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    return {
      id: i,
      url: mod.default,           // ← mod.default IS the video URL
      title: name || `Customer Review ${i + 1}`,


      
    }
    


  })
  
  
},
   

[])


// ─── Auto-scroll video reviews ─────────────────
useEffect(() => {

  if (videos.length <= 3) return

  const timer = setInterval(() => {
    setCurrentIndex(i => (i + 1) % videos.length)
  }, 1000) // every 1 second

  return () => clearInterval(timer)

}, [videos.length])


  if (videos.length === 0) return null

  const prev = () => setCurrentIndex(i => (i - 1 + videos.length) % videos.length)
  const next = () => setCurrentIndex(i => (i + 1) % videos.length)

  const visible = videos.slice(currentIndex, currentIndex + 3)
  if (visible.length < 3 && videos.length >= 3) {
    visible.push(...videos.slice(0, 3 - visible.length))
  }

  return (
    <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#f7941d] text-sm font-semibold tracking-widest uppercase mb-3">Hear From Them</p>
          <h2 className="text-4xl font-black text-gray-900 mb-3">Video <span 
              className="nova-text-gradient">Reviews</span>
          </h2>
          <p className="text-gray-500">Real experiences from real travelers</p>
        </motion.div>

        <div className="relative">
          {/* Nav Buttons */}
          {videos.length > 3 && (
            <>
              <button onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-orange-400 transition-colors">
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <button onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:border-orange-400 transition-colors">
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </>
          )}

          <div className={`grid gap-6 ${videos.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : videos.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
            {(videos.length <= 3 ? videos : visible).map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow "
                style={{ height: '320px' }}
                onClick={() => setPlaying(video.url)}
              >
                <video
                  src={video.url}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  preload="metadata"
                  muted
                  style={{ height: '320px', objectFit: 'cover' }}
                  />
                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mb-3"
                    style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }}>
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                  <p className="text-white text-sm font-semibold text-center px-4 drop-shadow-lg">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          {videos.length > 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {videos.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[#f7941d] w-5' : 'bg-gray-300'
                  }`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setPlaying(null)}
          >
            <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500/50 transition-colors">
              <X size={20} />
            </button>
            <motion.video
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              src={playing}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              style={{ maxWidth: '500px' }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}