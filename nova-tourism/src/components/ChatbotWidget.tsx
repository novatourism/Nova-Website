import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_REPLIES = ['What packages do you offer?', 'How to book?', 'Corporate retreats?', 'School trips?', 'Contact details?']

const BOT_RESPONSES: Record<string, string> = {
  default: "Hi! I'm Nova, your travel assistant 🌟 How can I help you plan your perfect journey?",
  packages: "We offer School Trips 🎒, Corporate Retreats 💼, Weekend Getaways 🌿, Indoor Events 🎭, and Outdoor Adventures 🏔️! Visit our Packages page to explore all.",
  book: "Booking is easy! Browse packages, click 'Explore', and fill the enquiry form. Our team contacts you within 24 hours. You can also WhatsApp us directly!",
  corporate: "Our Corporate Retreat packages include team-building activities, workshop spaces, gala dinners, and luxury stays. Perfect for 10–500+ people!",
  school: "School trips are our specialty! 🎒 Nature trails, educational tours, adventure camps — all with certified safety staff.",
  contact: "📞 +91 9730240400\n📧 novatourism.info@gmail.com\n📍 Pune, Maharashtra\n⏰ Open 24/7",
}

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase()
  if (lower.includes('package') || lower.includes('trip') || lower.includes('tour')) return BOT_RESPONSES.packages
  if (lower.includes('book') || lower.includes('enqui') || lower.includes('reserve')) return BOT_RESPONSES.book
  if (lower.includes('corporate') || lower.includes('company') || lower.includes('team')) return BOT_RESPONSES.corporate
  if (lower.includes('school') || lower.includes('student') || lower.includes('kids')) return BOT_RESPONSES.school
  if (lower.includes('contact') || lower.includes('call') || lower.includes('phone') || lower.includes('email')) return BOT_RESPONSES.contact
  return "Great question! For specific details, please reach out to our team. Call +91 9730240400 or email novatourism.info@gmail.com 😊"
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: BOT_RESPONSES.default }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setInput('')
    setTyping(true)
    await new Promise(r => setTimeout(r, 900 + Math.random() * 400))
    setTyping(false)
    setMessages(prev => [...prev, { role: 'assistant', content: getBotResponse(text) }])
  }

  return (
    <>
      {/* Floating Social Buttons */}
      <div className="fixed right-5 bottom-24 flex flex-col gap-3 z-40">
        <a href="https://wa.me/919730240400?text=Hi%20NOVA%20Tourism!%20I%20am%20interested%20in%20your%20packages.%20Please%20share%20details%20and%20pricing.%20%F0%9F%8C%9F" target="_blank" rel="noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200 hover:scale-110 transition-transform" title="WhatsApp">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="https://www.instagram.com/novatourism.in?igsh=MTRsNnc0a3Q2cGpoeQ==" target="_blank" rel="noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }} title="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a href="mailto:novatourism.info@gmail.com"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-orange-100 hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg,#e63228,#f7941d)' }} title="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a>
        <a href="tel:+919730240400"
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-100 hover:scale-110 transition-transform" title="Call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        </a>
      </div>

      {/* Chat Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed right-5 bottom-5 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.div>
            : <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><MessageCircle size={22} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed right-5 bottom-24 z-50 w-80 h-115 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3 text-white"
              style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Nova Assistant</h4>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-white/80 text-xs">Online • 24/7</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                  }`}
                  style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #e63228, #f7941d)' } : {}}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white border-t border-gray-100">
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="shrink-0 text-xs border border-orange-200 text-orange-600 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 text-gray-800 text-sm rounded-full px-4 py-2 outline-none border border-gray-200 focus:border-orange-300 placeholder-gray-400 transition-colors"
              />
              <button onClick={() => sendMessage(input)}
                className="w-9 h-9 rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #e63228, #f7941d)' }}>
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}