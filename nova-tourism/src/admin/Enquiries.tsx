// nova-tourism/src/admin/Enquiries.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Check, Phone, Mail } from 'lucide-react'
import { getEnquiries, markEnquiryRead, deleteEnquiry } from '../services/api'
import toast from 'react-hot-toast'

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await getEnquiries()
      setEnquiries(res.data)
    } catch {
      toast.error('Could not load enquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleRead = async (id: number) => {
    try {
      await markEnquiryRead(id)
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, is_read: true } : e))
    } catch { toast.error('Failed') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this enquiry?')) return
    try {
      await deleteEnquiry(id)
      setEnquiries(prev => prev.filter(e => e.id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed') }
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-black text-white">Customer Enquiries</h1>
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-sm">
            {enquiries.filter(e => !e.is_read).length} unread
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-primary rounded-xl animate-pulse" />)}</div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p>No enquiries yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq, i) => (
              <motion.div key={enq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`bg-primary border rounded-2xl p-5 ${enq.is_read ? 'border-white/5' : 'border-amber-500/40'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-bold">{enq.name}</h3>
                      {!enq.is_read && <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>}
                      {enq.package_interest && (
                        <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full capitalize">{enq.package_interest}</span>
                      )}
                    </div>
                    <div className="flex gap-4 mb-3">
                      <a href={`mailto:${enq.email}`} className="flex items-center gap-1 text-gray-400 text-sm hover:text-amber-400">
                        <Mail size={12} /> {enq.email}
                      </a>
                      {enq.phone && (
                        <a href={`tel:${enq.phone}`} className="flex items-center gap-1 text-gray-400 text-sm hover:text-amber-400">
                          <Phone size={12} /> {enq.phone}
                        </a>
                      )}
                    </div>
                    {enq.message && <p className="text-gray-400 text-sm">{enq.message}</p>}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!enq.is_read && (
                      <button onClick={() => handleRead(enq.id)}
                        className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center hover:bg-green-500/30 transition-colors">
                        <Check size={14} className="text-green-400" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(enq.id)}
                      className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}