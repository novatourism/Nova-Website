// nova-tourism/src/pages/Contact.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { submitEnquiry } from '../services/api'
import toast from 'react-hot-toast'
import { sendEnquiryEmail } from '../services/emailService'
import { FadeUp, SlideIn } from '../components/ScrollEffects'


export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', package_interest: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitting(true)
  try {
    // ✅ ALWAYS send email notification first
    await sendEnquiryEmail(form)

    // Save to backend silently (doesn't block email)
    submitEnquiry(form).catch(() => {})

    toast.success("Enquiry sent! We'll contact you soon. ✅")
    setForm({ name: '', email: '', phone: '', package_interest: '', message: '' })
  } catch {
    toast.error('Email failed. Please WhatsApp us at +91 9767188314')
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-16 px-6 text-center bg-gray-50 border-b border-gray-100">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">Get in <span className="nova-text-gradient">Touch</span></h1>
          <p className="text-gray-500 text-lg">We'd love to help plan your perfect trip</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <SlideIn from="left">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
          <div className="space-y-6 mb-10">
            {[
              { icon: Phone, label: 'Phone / WhatsApp', value: '+91 97302 40400', href: 'tel:+919730240400' },
              { icon: Mail, label: 'Email', value: 'novatourism.info@gmail.com', href: 'mailto:novatourism.info@gmail.com' },
              { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India', href: '#' },
              { icon: Clock, label: 'Business Hours', value: '24 Hours', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                  <Icon size={18} className="text-nova-orange" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="text-gray-800 font-medium group-hover:text-nova-red transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div>
            <h3 className="text-gray-900 font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-green-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm hover:bg-green-600/30 transition-colors">
                <MessageCircle size={14} /> WhatsApp
              </a>
             <a href="https://www.instagram.com/nova_tourism_and_events?igsh=MWg0eDU4N3dpbXpzNQ==" target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(219,39,119,0.15)', border: '1px solid rgba(219,39,119,0.3)', color: '#f472b6' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                 Instagram
                </a>
            </div>
          </div>
          </SlideIn>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <SlideIn from="right" delay={0.15}>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send an Enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {['name', 'email', 'phone'].map((field, i) => (
                  <div key={field} className={i === 1 ? 'col-span-2 md:col-span-1' : ''}>
                    <label className="text-gray-500 text-xs mb-1 block capitalize">{field === 'phone' ? 'Phone Number' : field.replace('_', ' ')}</label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={form[field as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required={field !== 'phone'}
                      placeholder={field === 'name' ? 'Your Name' : field === 'email' ? 'you@email.com' : '+91 00000 00000'}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-orange-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Interested In</label>
                <select
                  value={form.package_interest}
                  onChange={e => setForm(prev => ({ ...prev, package_interest: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-colors  placeholder-gray-400"
                >
                  <option value="">Select a package type...</option>
                  <option value="school">School Trip</option>
                  <option value="corporate">Corporate Retreat</option>
                  <option value="normal">Weekend Getaway</option>
                  <option value="indoor">Indoor Event</option>
                  <option value="outdoor">Outdoor Adventure</option>
                  <option value="custom">Custom Trip</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your trip requirements, group size, preferred dates..."
                  rows={4}
                 className="w-full bg-gray-50 border border-gray-200 focus:border-amber-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-colors  placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:opacity-50 hover:scale-[1.02]"
              >
                {submitting ? 'Sending...' : 'Send Enquiry 🚀'}
              </button>
            </form>
          </div>
          </SlideIn>
        </motion.div>
      </div>
    </div>
  )
}