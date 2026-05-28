// nova-tourism/src/components/Footer.tsx
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

const WHATSAPP = '+919730240400'   // ← Change to your number
const INSTAGRAM = 'novatourism'   // ← Change to your handle
const EMAIL = 'novatourism.info@gmail.com'
const PHONE = '+91 9730240400'

export default function Footer() {
  return (
    <footer className="bg-[#060b18] border-t border-amber-500/20 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img
            src="/images/logo.png"
            alt="NOVA Tourism & Events"
            className="h-16 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
            }}
          />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Where Every Journey Becomes a Memory. Creating unforgettable experiences since 2019.
          </p>
          <div className="flex gap-3 mt-6">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center hover:scale-110 transition-transform">
              <MessageCircle size={16} className="text-white" />
            </a>
            <a href="https://www.instagram.com/nova_tourism_and_events?igsh=MWg0eDU4N3dpbXpzNQ==" target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
             </svg>
            </a>
            <a href={`mailto:${EMAIL}`}
              className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center hover:scale-110 transition-transform">
              <Mail size={16} className="text-white" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[['Home', '/'], ['About Us', '/about'], ['Packages', '/packages'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([name, path]) => (
              <li key={path}>
                <Link to={path} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trip Types */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Trips</h4>
          <ul className="space-y-2">
            {['School Trips', 'Corporate Retreats', 'Weekend Getaways', 'Indoor Events', 'Outdoor Adventures', 'Custom Trips'].map(t => (
              <li key={t}>
                <Link to="/packages" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">{t}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-400">
              <Phone size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <a href={`tel:${PHONE}`} className="hover:text-amber-400 transition-colors">{PHONE}</a>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-400">
              <Mail size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:text-amber-400 transition-colors">{EMAIL}</a>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <span>Pune, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-amber-500/10 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} NOVA Tourism & Events. All rights reserved.
        </p>
      </div>
    </footer>
  )
}