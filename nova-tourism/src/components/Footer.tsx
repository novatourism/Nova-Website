// nova-tourism/src/components/Footer.tsx
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle, Globe } from 'lucide-react'

const WHATSAPP = '919730240400'
const EMAIL    = 'novatourism.info@gmail.com'
const PHONE    = '+91 9730240400'
const INSTA    = 'https://www.instagram.com/novatourism.in?igsh=MTRsNnc0a3Q2cGpoeQ=='

const QUICK_LINKS = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Packages', '/packages'],
  ['Gallery', '/gallery'],
  ['Testimonials', '/testimonials'],
  ['Blog', '/blog'],
  ['Contact Us', '/quote'],
]

const SERVICES_LINKS = [
  ['School Trips', '/services/school-trips'],
  ['Corporate Tours', '/services/corporate-tours'],
  ['Honeymoon Packages', '/services/honeymoon'],
  ['Family Tours', '/services/family-tours'],
  ['Adventure Tours', '/services/adventure-tours'],
  ['Pilgrimage Tours', '/services/pilgrimage'],
  ['Event Management', '/services/event-management'],
  ['Destination Weddings', '/services/destination-weddings'],
  ['Transport & Rentals', '/services/transport'],
  ['Customized Tours', '/services/customized-tours'],
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D1829' }} className="border-t border-blue-900/30 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <img src="/images/logo.png" alt="NOVA Tourism & Events"
            className="h-16 w-auto object-contain mb-4"
            style={{ filter: 'brightness(0) invert(1)' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            Where Every Journey Becomes a Memory.
          </p>
          <p className="text-gray-500 text-xs mb-6">
            Creating unforgettable experiences since 2019.
          </p>
          <div className="flex gap-3">
            <a href={`https://wa.me/${WHATSAPP}?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20services.`}
              target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center hover:scale-110 transition-transform"
              title="WhatsApp">
              <MessageCircle size={16} className="text-white" />
            </a>
            <a href={INSTA} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}
              title="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a href="https://www.linkedin.com/company/novatourismandevents/"
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: '#0077B5' }}
            title="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/share/1EWEEEDesY/"
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: '#1877F2' }}
            title="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>


            <a href={`mailto:${EMAIL}`}
              className="w-9 h-9 rounded-full bg-[#F4A623] flex items-center justify-center hover:scale-110 transition-transform"
              title="Email">
              <Mail size={16} className="text-white" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map(([name, path]) => (
              <li key={path}>
                <Link to={path} className="text-gray-400 hover:text-[#F4A623] transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F4A623] transition-colors" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Our Services</h4>
          <ul className="space-y-2.5">
            {SERVICES_LINKS.map(([name, path]) => (
              <li key={path}>
                <Link to={path} className="text-gray-400 hover:text-[#F4A623] transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F4A623] transition-colors" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm tracking-wide uppercase">Contact Us</h4>
          <ul className="space-y-4">
            <li>
              <a href={`tel:${PHONE}`} className="flex items-start gap-3 text-sm text-gray-400 hover:text-[#F4A623] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center shrink-0 group-hover:bg-[#F4A623]/20 transition-colors">
                  <Phone size={14} className="text-[#F4A623]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone / WhatsApp</p>
                  {PHONE}
                </div>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-sm text-gray-400 hover:text-[#F4A623] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center shrink-0 group-hover:bg-[#F4A623]/20 transition-colors">
                  <Mail size={14} className="text-[#F4A623]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  {EMAIL}
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[#F4A623]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Location</p>
                Pune, Maharashtra, India
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center shrink-0">
                <Globe size={14} className="text-[#F4A623]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Website</p>
                novatourism.in
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-900/30 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NOVA Tourism & Events. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link to="/quote" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/quote" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}