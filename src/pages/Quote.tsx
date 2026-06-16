// nova-tourism/src/pages/Quote.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { sendEnquiryEmail } from '../services/emailService'
import { submitEnquiry } from '../services/api'
import toast from 'react-hot-toast'
import { ALL_SERVICES } from '../data/services'

const BUDGETS = ['Below ₹5,000/person', '₹5,000–₹10,000/person', '₹10,000–₹25,000/person', '₹25,000–₹50,000/person', '₹50,000+/person', 'Custom Budget']
const GROUP_SIZES = ['1–5 persons', '6–15 persons', '16–30 persons', '31–100 persons', '100+ persons']

export default function Quote() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '',
    groupSize: '', budget: '', travelDate: '', destination: '', message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const msg = `Service: ${form.service}\nGroup: ${form.groupSize}\nBudget: ${form.budget}\nDate: ${form.travelDate}\nDestination: ${form.destination}\n\n${form.message}`
      await sendEnquiryEmail({ name: form.name, email: form.email, phone: form.phone, message: msg, package_interest: form.service })
      submitEnquiry({ name: form.name, email: form.email, phone: form.phone, message: msg, package_interest: form.service }).catch(() => {})
      setSubmitted(true)
      toast.success("Quote request sent! We'll contact you within 2 hours. ✅")
    } catch {
      toast.error('Could not send. Please WhatsApp us.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 pt-20">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
          <Check size={36} className="text-white" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Quote Request Sent!
        </h2>
        <p className="text-gray-500 mb-6">Our team will contact you within 2 hours with a customized quote tailored to your requirements.</p>
        <a href="https://wa.me/919730240400?text=Hi%20NOVA!%20I%20just%20submitted%20a%20quote%20request."
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors">
          <MessageCircle size={16} /> Follow up on WhatsApp
        </a>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white pt-20">

      {/* Header */}
      <section className="relative py-16 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">Free & No Obligation</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Get in Touch
          </h1>
          <p className="text-blue-100">Tell us your requirements and we'll craft the perfect package for you</p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Send an Enquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'name',  label: 'Full Name *', type: 'text',  placeholder: 'Your Name', required: true },
                  { key: 'email', label: 'Email *',     type: 'email', placeholder: 'you@email.com', required: true },
                  { key: 'phone', label: 'Phone',       type: 'tel',   placeholder: '+91 9730240400', required: false },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-gray-600 text-xs font-semibold mb-1 block">{f.label}</label>
                    <input type={f.type} required={f.required} placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => set(f.key, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-gray-600 text-xs font-semibold mb-1 block">Interested In</label>
                <select value={form.service} onChange={e => set('service', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all">
                  <option value="">Select a package type...</option>
                  <option value="school">School Trip</option>
                  <option value="corporate">Corporate Retreat</option>
                  <option value="normal">Weekend Getaway</option>
                  <option value="indoor">Indoor Event</option>
                  <option value="outdoor">Outdoor Adventure</option>
                  <option value="custom">Custom Trip</option>
                  {ALL_SERVICES.map(s => <option key={s.slug} value={s.title}>{s.emoji} {s.title}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-xs font-semibold mb-1 block">Group Size</label>
                  <select value={form.groupSize} onChange={e => set('groupSize', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all">
                    <option value="">Select group size...</option>
                    {GROUP_SIZES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold mb-1 block">Budget Range</label>
                  <select value={form.budget} onChange={e => set('budget', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all">
                    <option value="">Select budget...</option>
                    {BUDGETS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 text-xs font-semibold mb-1 block">Preferred Travel Date</label>
                  <input type="date" value={form.travelDate} onChange={e => set('travelDate', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
                </div>
                <div>
                  <label className="text-gray-600 text-xs font-semibold mb-1 block">Destination (if known)</label>
                  <input type="text" placeholder="e.g. Goa, Manali, Thailand..." value={form.destination}
                    onChange={e => set('destination', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-xs font-semibold mb-1 block">Message</label>
                <textarea rows={4}
                  placeholder="Tell us about your trip requirements, group size, preferred dates, dietary requirements, special requests..."
                  value={form.message} onChange={e => set('message', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-400 text-gray-800 rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all" />
              </div>

              <button type="submit" disabled={submitting}
                className="w-full text-white py-4 rounded-xl font-bold text-base hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                {submitting ? 'Sending...' : 'Send Enquiry 🚀'}
              </button>

              <p className="text-center text-xs text-gray-400">
                ✅ Free Quote · No Commitment · Response within 2 hours
              </p>
            </form>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Contact Info — from Contact.tsx */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contact Information
            </h3>
            <div className="space-y-4">
              {[
                { icon: Phone,  label: 'Phone / WhatsApp', value: '+91 97302 40400',             href: 'tel:+919730240400' },
                { icon: Mail,   label: 'Email',            value: 'novatourism.info@gmail.com',  href: 'mailto:novatourism.info@gmail.com' },
                { icon: MapPin, label: 'Location',         value: 'Pune, Maharashtra, India',    href: '#' },
                { icon: Clock,  label: 'Business Hours',   value: '24 Hours',                    href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                    <Icon size={15} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="text-gray-800 text-sm font-medium group-hover:text-red-500 transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-gray-900 text-xs font-bold mb-3">Follow Us</p>
              <div className="flex flex-wrap gap-2">

                {/* WhatsApp */}
                <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#25D366' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/novatourism.in?igsh=MTRsNnc0a3Q2cGpoeQ=="
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/novatourismandevents/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#0077B5' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/share/1EWEEEDesY/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#1877F2' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>

              </div>
            </div>
          </div>

          {/* Why NOVA */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose NOVA?
            </h3>
            {[
              { icon: '✅', text: '100% Customized Itineraries' },
              { icon: '💰', text: 'Transparent, Zero Hidden Charges' },
              { icon: '📞', text: 'Dedicated Support 24/7' },
              { icon: '🤝', text: 'Pan-India Network & Partners' },
              { icon: '🛡️', text: '100% Safety Record Since 2019' },
              { icon: '⭐', text: '4.9/5 Average Customer Rating' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Prefer to Talk */}
          <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
            <h3 className="font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Prefer to Talk?</h3>
            <p className="text-blue-100 text-sm mb-4">Our travel experts are available 24/7.</p>
            <div className="space-y-3">
              <a href="https://wa.me/919730240400?text=Hi%20NOVA!%20I%20need%20a%20quote%20for%20a%20trip."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors w-full justify-center">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <a href="tel:+919730240400"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors w-full justify-center">
                <Phone size={15} /> +91 9730240400
              </a>
              <a href="mailto:novatourism.info@gmail.com"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors w-full justify-center">
                <Mail size={15} /> Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}