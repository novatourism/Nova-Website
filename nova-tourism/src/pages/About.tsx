// nova-tourism/src/pages/About.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, Shield, Users, Star } from 'lucide-react'
import { FadeUp, SlideIn, StaggerGrid, StaggerItem, staggerItemVariants, AnimatedCounter } from '../components/ScrollEffects'
import { imgByPrefix } from '../assets/imageMap'


export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative py-16 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto">
        <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
          About <span className="text-white mb-6">NOVA</span>
        </h1>
        <p className="text-blue-100 text-xl leading-relaxed">
          Pune's most trusted tourism & events company — turning every trip into a story worth telling
        </p>
      </motion.div>
    </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="relative rounded-3xl overflow-hidden aspect-square border border-[#0A4C8A]/20">
            <SlideIn from="left">
            <div className="relative rounded-3xl overflow-hidden aspect-square border-[#0A4C8A]/30">
              <img
                src={imgByPrefix('collage', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop')}
                alt="Our Team"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop'
                }}
              />
             </div>
            </SlideIn> 
      
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <SlideIn from="right" delay={0.2}>
          <h2 className="text-4xl font-black text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            NOVA Tourism & Events started with a simple mission — to make travel accessible, safe, and genuinely memorable for everyone.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From school picnics to large-scale corporate retreats for 500+ employees, we've grown into one of Maharashtra's most reliable travel partners. Our tagline says it all:{' '}
            <span className="text-[#0A4C8A] font-semibold">Where Every Journey Becomes a Memory.</span>
          </p>
          </SlideIn>

              <StaggerGrid className="grid grid-cols-3 gap-3 mb-5">
                {[['5000+', 'Travelers'], ['50+', 'Destinations'], ['7+', 'Years']].map(([val, lab]) => (
                  <StaggerItem key={lab} variants={staggerItemVariants}>
                    <div className="text-center bg-white border border-[#0A4C8A]/30 rounded-xl py-4 px-2">
                      <div className="text-2xl font-black leading-none mb-1"
                        style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {val}
                      </div>
                      <div className="text-gray-400 text-xs">{lab}</div>
                      <div className="w-5 h-1 rounded-full mx-auto mt-2" style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }} />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGrid>

        <div className="flex flex-wrap gap-2">
          {[
            { icon: Shield, text: 'Safety Certified' },
            { icon: Award,  text: 'Award Winning' },
            { icon: Users,  text: '120+ Schools Served' },
            { icon: Star,   text: '4.9 Star Rating' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
              <Icon size={12} className="text-[#0A4C8A]" />
              {text}
            </div>
          ))}
        </div>
        </motion.div>
      </section>

      {/* ─── Founder Section ─────────────────────────────── */}
      <section className="py-16 px-6 bg-white border-y border-white"
        >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#0A4C8A] text-sm font-semibold tracking-widest uppercase mb-3">Leadership</p>
            <h2 className="text-4xl font-black text-gray-900">
              Meet the <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Founder</span>
            </h2>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 bg-white border border-[#0A4C8A]/30 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm"
          >
            {/* Photo placeholder */}
            <div className="shrink-0">
              <div
                className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#0A4C8A]/40"
                style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}
              >
                <img
                  src="/src/assets/images/Amey-Borate.jpg"
                  alt="Amey Borate"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Show stylish initials placeholder if photo not available
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent && !parent.querySelector('.initials-placeholder')) {
                      const div = document.createElement('div')
                      div.className = 'initials-placeholder w-full h-full flex items-center justify-center'
                      div.innerHTML = '<span style="font-size:3rem; font-weight:900; color:white; font-family:Syne,sans-serif;">AB</span>'
                      parent.appendChild(div)
                    }
                  }}
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900 mb-1">Amey Borate</h3>
              <p className="text-[#0A4C8A] font-semibold mb-4">Founder & CEO</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                With a passion for travel and a vision to create unforgettable experiences, Amey founded NOVA Tourism & Events to bring world-class travel services to Pune. Under his leadership, NOVA has served 5000+ happy travelers and 120+ schools across Maharashtra.
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
                <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                  💬 Connect
                </a>
                <a href="mailto:novatourism.info@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-[#0A4C8A]/30 text-[#0A4C8A] hover:bg-[#0A4C8A]/10 transition-colors">
                  ✉️ Email
                </a>
              </div>
            </div>
          </motion.div>

          
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-6 max-w-7xl mx-auto bg-white">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-4xl font-black text-gray-900 text-center mb-12">
          Why Travelers <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Choose Us</span>        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: '🛡️', title: 'Safety First', desc: 'Certified guides, first aid kits, and insurance on every trip.' },
            { emoji: '📞', title: '24/7 Support', desc: 'Our team is available round the clock throughout your journey.' },
            { emoji: '🎯', title: 'Custom Itineraries', desc: 'Every trip tailored exactly to your group\'s needs and budget.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-blue-100 hover:border-[#0A4C8A] rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-gray-900 font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <Link to="/quote"
          className="inline-block text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
          Start Planning Your Trip
        </Link>
      </section>
    </div>
  )
}