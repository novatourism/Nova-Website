import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const logoImg = '/images/logo.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:flex text-white text-xs py-2 px-6 justify-between items-center"
        style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}>
        <span>📍 Pune, Maharashtra, India</span>
        <div className="flex gap-6 items-center">
          <a href="tel:+919730240400" className="flex items-center gap-1 hover:text-orange-100 transition-colors">
            <Phone size={11} /> +91 9730240400  
          </a>
          <a href="mailto:novatourism.info@gmail.com" className="hover:text-orange-100 transition-colors">
            novatourism.info@gmail.com
          </a>
          <span>⏰ Open 24/7</span>
        </div>
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b border-gray-100' : 'shadow-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-9xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="NOVA Tourism & Events"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold transition-colors duration-300 group ${
                  location.pathname === link.path ? 'text-nova-orange' : 'text-gray-700 hover:text-nova-red'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'w-full text-nova-orange'
                    : 'w-0 group-hover:w-full text-nova-red'
                }`} />
              </Link>
            ))}
            <a
              href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}
            >
              📞 Book Now
            </a>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1 text-xs text-gray-500 mb-2 pb-3 border-b border-gray-100">
                <a href="tel:+919730240400" className="hover:text-orange-500">📞 +91 9730240400</a>
                <a href="mailto:novatourism.info@gmail.com" className="hover:text-orange-500">✉️ novatourism.info@gmail.com</a>
              </div>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`py-2 font-semibold transition-colors ${
                    location.pathname === link.path ? 'text-nova-orange' : 'text-gray-700'
                  }`}>
                  {link.name}
                </Link>
              ))}
              <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F" target="_blank" rel="noreferrer"
                className="text-white px-6 py-3 rounded-full text-sm font-bold text-center"
                style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}>
                Book Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}