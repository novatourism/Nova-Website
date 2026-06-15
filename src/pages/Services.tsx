// nova-tourism/src/pages/Services.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { ALL_SERVICES } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function Services() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="relative py-20 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="relative max-w-3xl mx-auto">
          <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">What We Do</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Services
          </h1>
          <p className="text-blue-100 text-lg">End-to-end travel & event solutions for every need</p>
          <p className="text-blue-200 text-sm mt-2">{ALL_SERVICES.length} services · Pune & Pan-India</p>
        </motion.div>
      </section>

      {/* Services Grid — same structure as Featured Packages on home */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_SERVICES.map((svc, i) => (
            <ServiceCard key={svc.slug} service={svc} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Can't Find What You Need?
          </h2>
          <p className="text-gray-500 mb-8">
            We specialize in fully customized packages. Tell us your requirements and we'll build it.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/quote"
              className="flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
              Get a Custom Quote <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/919730240400?text=Hi%20NOVA!%20I%20need%20help%20with%20a%20customized%20package."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-colors">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}