// nova-tourism/src/admin/ManageGallery.tsx
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, Trash2, X, Image as ImageIcon, Plus } from 'lucide-react'
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../services/api'
import toast from 'react-hot-toast'

interface GalleryItem {
  id: number
  title: string
  image_url: string
  category: string
}

const CATS = ['general', 'school', 'corporate', 'outdoor', 'indoor', 'normal']

export default function ManageGallery() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [uploadForm, setUploadForm] = useState({
    title: '', category: 'general', files: [] as File[]
  })
  const [previews, setPreviews] = useState<string[]>([])

  const load = async () => {
    try {
      const res = await getGallery()
      setImages(res.data)
    } catch {
      toast.error('Backend not connected')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'))
    setUploadForm(prev => ({ ...prev, files: [...prev.files, ...fileArr] }))
    const newPreviews = fileArr.map(f => URL.createObjectURL(f))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const removeFile = (i: number) => {
    setUploadForm(prev => ({ ...prev, files: prev.files.filter((_, idx) => idx !== i) }))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadForm.files.length === 0) {
      toast.error('Please select at least one image')
      return
    }
    setUploading(true)
    let success = 0
    for (const file of uploadForm.files) {
      const fd = new FormData()
      fd.append('title', uploadForm.title || file.name.split('.')[0])
      fd.append('category', uploadForm.category)
      fd.append('image', file)
      try {
        await uploadGalleryImage(fd)
        success++
      } catch { /* continue */ }
    }
    if (success > 0) {
      toast.success(`${success} image${success > 1 ? 's' : ''} uploaded!`)
      setShowUpload(false)
      setUploadForm({ title: '', category: 'general', files: [] })
      setPreviews([])
      load()
    } else {
      toast.error('Upload failed — check backend connection')
    }
    setUploading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return
    try {
      await deleteGalleryImage(id)
      setImages(prev => prev.filter(img => img.id !== id))
      toast.success('Image deleted')
    } catch { toast.error('Failed to delete') }
  }

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter)

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
              <h1 className="text-2xl font-black text-white">Gallery Manager</h1>
              <p className="text-gray-500 text-sm">{images.length} photos</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30"
          >
            <Plus size={16} /> Upload Photos
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', ...CATS].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-all ${
                filter === cat
                  ? 'bg-amber-500 text-white'
                  : 'bg-primary text-gray-400 border border-white/10 hover:border-amber-500/30'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-primary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <ImageIcon size={60} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No images yet</p>
            <button onClick={() => setShowUpload(true)} className="mt-3 text-amber-400 hover:underline text-sm">
              Upload your first photo →
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all"
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/300/300?random=${img.id}` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors" />

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium truncate mb-2">{img.title}</p>
                    <span className="text-xs bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full capitalize">{img.category}</span>
                  </div>

                  {/* Delete btn */}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400"
                  >
                    <Trash2 size={13} className="text-white" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ─── Upload Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg bg-primary
               border border-amber-500/20 rounded-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-xl font-black text-white">Upload Photos</h2>
                <button onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-6 space-y-5">
                {/* Drop Zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                    dragging ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 hover:border-amber-500/40'
                  }`}
                >
                  <label htmlFor="gallery-upload" className="block p-8 text-center cursor-pointer">
                    <Upload size={32} className={`mx-auto mb-3 ${dragging ? 'text-amber-400' : 'text-gray-600'}`} />
                    <p className="text-gray-400 text-sm">Drag & drop images here or <span className="text-amber-400">browse</span></p>
                    <p className="text-gray-600 text-xs mt-1">Supports JPG, PNG, WEBP · Multiple files OK</p>
                  </label>
                  <input id="gallery-upload" type="file" accept="image/*" multiple className="hidden"
                    onChange={e => handleFiles(e.target.files)} />
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {previews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={src} className="w-full h-full object-cover" alt="" />
                        <button type="button" onClick={() => removeFile(i)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Title & Category */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Title (optional)</label>
                    <input
                      value={uploadForm.title}
                      onChange={e => setUploadForm(p => ({ ...p, title: e.target.value }))}
                      placeholder="Photo title..."
                      className="w-full bg-primary border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Category</label>
                    <select
                      value={uploadForm.category}
                      onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))}
                      className="w-full bg-primary border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors capitalize"
                    >
                      {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowUpload(false)}
                    className="flex-1 border border-white/10 text-gray-400 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={uploading || uploadForm.files.length === 0}
                    className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:shadow-lg hover:shadow-amber-500/30 transition-all">
                    {uploading ? `Uploading ${uploadForm.files.length} file${uploadForm.files.length > 1 ? 's' : ''}...` : `Upload ${uploadForm.files.length || ''} Photo${uploadForm.files.length !== 1 ? 's' : ''}`}
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