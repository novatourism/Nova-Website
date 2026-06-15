// nova-tourism/src/components/Navbar.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { NAV_SERVICES } from '../data/services'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setServicesOpen(false) }, [location])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/quote' },
]

  const isActive = (path: string) => location.pathname === path
  const isServicesActive = location.pathname.startsWith('/services')

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:flex text-white text-xs py-2 px-6 justify-between items-center"
        style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
        <span>📍 Pune, Maharashtra, India</span>
        <div className="flex gap-6 items-center">
          <a href="tel:+919730240400" className="flex items-center gap-1 hover:text-blue-100 transition-colors">
            <Phone size={11} /> +91 9730240400
          </a>
          <a href="mailto:novatourism.info@gmail.com" className="hover:text-blue-100 transition-colors">
            novatourism.info@gmail.com
          </a>
          <span>⏰ Open 24/7</span>
        </div>
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b border-gray-200' : 'shadow-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/images/logo.png" alt="NOVA Tourism & Events"
             className="h-10 sm:h-14 md:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 2).map(link => (
              <Link key={link.path} to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path) ? 'text-[#0A4C8A]' : 'text-gray-700 hover:text-[#0A4C8A]'
                }`}>
                {link.name}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onClick={() => setServicesOpen(v => !v)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${
                  isServicesActive ? 'text-[#0A4C8A]' : 'text-gray-700 hover:text-[#0A4C8A]'
                }`}
              >
                Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50"
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">All Services</p>
                    <div className="grid grid-cols-2 gap-1">
                      {NAV_SERVICES.map(svc => (
                        <Link key={svc.slug} to={`/services/${svc.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-[#0A4C8A] transition-all group"
                        >
                          <span className="text-xl shrink-0">{svc.emoji}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0A4C8A] leading-tight">{svc.title}</p>
                            <p className="text-xs text-gray-400 leading-tight">{svc.shortDesc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <Link to="/services"
                        className="flex items-center justify-center gap-2 text-sm font-bold text-[#0A4C8A] hover:text-[#F4A623] transition-colors">
                        View All 16 Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map(link => (
              <Link key={link.path} to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path) ? 'text-[#0A4C8A]' : 'text-gray-700 hover:text-[#0A4C8A]'
                }`}>
                {link.name}
              </Link>
            ))}

            <Link to="/quote"
              className="flex items-center gap-2 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:scale-105 transition-transform hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-700 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                <div className="flex flex-col gap-1 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                  <a href="tel:+919730240400" className="hover:text-[#0A4C8A]">📞 +91 9730240400</a>
                  <a href="mailto:novatourism.info@gmail.com" className="hover:text-[#0A4C8A]">✉️ novatourism.info@gmail.com</a>
                </div>

                <Link to="/" className={`py-2 text-sm font-semibold ${isActive('/') ? 'text-[#0A4C8A]' : 'text-gray-700'}`}>Home</Link>
                <Link to="/about" className={`py-2 text-sm font-semibold ${isActive('/about') ? 'text-[#0A4C8A]' : 'text-gray-700'}`}>About</Link>

                {/* Mobile Services */}
                <button onClick={() => setMobileServicesOpen(v => !v)}
                  className="flex items-center justify-between py-2 text-sm font-semibold text-gray-700 text-left">
                  Services <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="overflow-hidden pl-4 border-l-2 border-blue-100 ml-2">
                      {NAV_SERVICES.map(svc => (
                        <Link key={svc.slug} to={`/services/${svc.slug}`}
                          className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#0A4C8A]">
                          <span>{svc.emoji}</span> {svc.title}
                        </Link>
                      ))}
                      <Link to="/services" className="py-2 text-sm font-bold text-[#0A4C8A] block">
                        All Services →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.slice(2).map(link => (
                  <Link key={link.path} to={link.path}
                    className={`py-2 text-sm font-semibold ${isActive(link.path) ? 'text-[#0A4C8A]' : 'text-gray-700'}`}>
                    {link.name}
                  </Link>
                ))}

                <Link to="/quote"
                  className="mt-2 text-white px-6 py-3 rounded-full text-sm font-bold text-center"
                  style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}