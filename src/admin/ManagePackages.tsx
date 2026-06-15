// nova-tourism/src/admin/ManagePackages.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Plus, Pencil, Trash2, X, Upload,
  Check, Package, ToggleLeft, ToggleRight
} from 'lucide-react'
import { getPackages, createPackage, updatePackage, deletePackage } from '../services/api'
import toast from 'react-hot-toast'

interface PackageItem {
  id: number
  title: string
  description: string
  category: string
  duration: string
  highlights: string
  image_url: string | null
  is_active: boolean
}

const EMPTY_FORM = {
  title: '', description: '', category: 'normal',
  duration: '', highlights: '', image: null as File | null,
}

const CATEGORIES = [
  { value: 'school', label: '🎒 School Trip' },
  { value: 'corporate', label: '💼 Corporate' },
  { value: 'normal', label: '🌿 Getaway' },
  { value: 'indoor', label: '🎭 Indoor Event' },
  { value: 'outdoor', label: '🏔️ Outdoor' },
]

export default function ManagePackages() {
  const [packages, setPackages] = useState<PackageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<PackageItem | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [highlightInput, setHighlightInput] = useState('')
  const [highlights, setHighlights] = useState<string[]>([])

  const load = async () => {
    try {
      const res = await getPackages()
      setPackages(res.data)
    } catch {
      // Use mock if backend not running
      toast.error('Backend not connected — showing demo data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setHighlights([])
    setImagePreview(null)
    setShowModal(true)
  }

  const openEdit = (pkg: PackageItem) => {
    setEditing(pkg)
    setForm({
      title: pkg.title,
      description: pkg.description,
      category: pkg.category,
      duration: pkg.duration,
      highlights: pkg.highlights,
      image: null,
    })
    try { setHighlights(JSON.parse(pkg.highlights)) } catch { setHighlights([]) }
    setImagePreview(pkg.image_url)
    setShowModal(true)
  }

  const addHighlight = () => {
    if (!highlightInput.trim()) return
    setHighlights(prev => [...prev, highlightInput.trim()])
    setHighlightInput('')
  }

  const removeHighlight = (i: number) => setHighlights(prev => prev.filter((_, idx) => idx !== i))

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setForm(prev => ({ ...prev, image: file }))
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('description', form.description)
    fd.append('category', form.category)
    fd.append('duration', form.duration)
    fd.append('highlights', JSON.stringify(highlights))
    if (form.image) fd.append('image', form.image)

    try {
      if (editing) {
        await updatePackage(editing.id, fd)
        toast.success('Package updated!')
      } else {
        await createPackage(fd)
        toast.success('Package created!')
      }
      setShowModal(false)
      load()
    } catch {
      toast.error('Failed — check backend connection')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this package?')) return
    try {
      await deletePackage(id)
      setPackages(prev => prev.filter(p => p.id !== id))
      toast.success('Package deleted')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-white">Manage Packages</h1>
              <p className="text-gray-500 text-sm">{packages.length} packages total</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={openAdd}
            className="flex items-center gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-shadow"
          >
            <Plus size={16} /> Add Package
          </motion.button>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-[#0f1a2e] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-24">
            <Package size={60} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No packages yet</p>
            <button onClick={openAdd} className="mt-4 text-amber-400 hover:underline">
              Add your first package →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0f1a2e] border border-white/5 rounded-2xl overflow-hidden group hover:border-amber-500/20 transition-all"
              >
                {/* Image */}
                <div className="relative h-40">
                  <img
                    src={pkg.image_url || ''}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop'
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f1a2e] to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      pkg.is_active
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {pkg.is_active ? '● Active' : '● Hidden'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full capitalize">
                      {pkg.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-bold mb-1 truncate">{pkg.title}</h3>
                  <p className="text-gray-500 text-xs mb-1">{pkg.duration}</p>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{pkg.description}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(pkg)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 py-2 rounded-xl text-sm hover:bg-amber-500/20 transition-colors"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="flex items-center justify-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Add / Edit Modal ─────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0f1a2e] border border-amber-500/20 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-xl font-black text-white">
                  {editing ? 'Edit Package' : 'Add New Package'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Package Image</label>
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <label htmlFor="img-upload" className="cursor-pointer flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                            <Upload size={14} /> Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="img-upload"
                        className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-amber-500/40 transition-colors">
                        <Upload size={28} className="text-gray-600 mb-2" />
                        <span className="text-gray-500 text-sm">Click to upload image</span>
                        <span className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP</span>
                      </label>
                    )}
                    <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Package Title *</label>
                  <input
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    required placeholder="e.g. School Adventure Camp"
                    className="w-full bg-[#0a0f1e] border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
                  />
                </div>

                {/* Category + Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full bg-[#0a0f1e] border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Duration *</label>
                    <input
                      value={form.duration}
                      onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                      required placeholder="e.g. 2 Days / 1 Night"
                      className="w-full bg-[#0a0f1e] border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Description *</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    required placeholder="Describe what's special about this trip..."
                    rows={3}
                    className="w-full bg-[#0a0f1e] border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600 resize-none"
                  />
                </div>

                {/* Highlights */}
                <div>
                  <label className="text-gray-400 text-xs mb-2 block">Highlights / Inclusions</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      value={highlightInput}
                      onChange={e => setHighlightInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                      placeholder="Add a highlight and press Enter..."
                      className="flex-1 bg-[#0a0f1e] border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder-gray-600"
                    />
                    <button type="button" onClick={addHighlight}
                      className="bg-amber-500/20 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl hover:bg-amber-500/30 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((h, i) => (
                        <span key={i} className="flex items-center gap-1.5 bg-[#0a0f1e] border border-white/10 text-gray-300 px-3 py-1.5 rounded-full text-xs">
                          <Check size={10} className="text-amber-400" />
                          {h}
                          <button type="button" onClick={() => removeHighlight(i)} className="text-gray-600 hover:text-red-400 transition-colors ml-1">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 border border-white/10 text-gray-400 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50">
                    {submitting ? 'Saving...' : editing ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}