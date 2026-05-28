// nova-tourism/src/components/TripPartners.tsx
import { useMemo } from 'react'

// Auto-load all partner logos
const partnerModules = import.meta.glob<{ default: string }>(
  '../assets/trip-partners/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,svg,SVG}',
  { eager: true }
)

export default function TripPartners() {
  const partners = useMemo(() => {
    return Object.entries(partnerModules).map(([path, mod]) => ({
      name: (path.split('/').pop() || '').replace(/\.[^/.]+$/, ''),
      url: mod.default,
    }))
  }, [])

  if (partners.length === 0) return null

  // Duplicate for seamless loop
  const doubled = [...partners, ...partners, ...partners]

  return (
    <section className="py-10 border-b border-gray-100 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Our Trip Partners
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex gap-8 animate-marquee w-max py-2">
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm hover:shadow-md hover:border-orange-200 transition-all shrink-0"
              style={{ minWidth: '200px', height: '200px', padding: '0' }}
            >
              <img
                src={partner.url}
                alt={partner.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  // Show name text if image fails
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  const parent = t.parentElement
                  if (parent && !parent.querySelector('.partner-name')) {
                    const span = document.createElement('span')
                    span.className = 'partner-name text-xs font-semibold text-gray-500 text-center'
                    span.textContent = partner.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    parent.appendChild(span)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}