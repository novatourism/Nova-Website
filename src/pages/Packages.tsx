// nova-tourism/src/pages/Packages.tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApi } from '../context/ApiContext'
import TripCard from '../components/TripCard'
import { FadeUp, StaggerGrid, StaggerItem, staggerItemVariants } from '../components/ScrollEffects'


const CATEGORIES = [
  { value: '', label: 'All Packages' },
  { value: 'school', label: '🎒 School Trips' },
  { value: 'corporate', label: '💼 Corporate' },
  { value: 'normal', label: '🌿 Getaways' },
  { value: 'indoor', label: '🎭 Indoor Events' },
  { value: 'outdoor', label: '🏔️ Outdoor' },
  { value: 'goa',       label: '🏖️ Goa' },
]

export default function Packages() {
  const { packages, loading } = useApi()
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || '')
  }, [searchParams])

  const filtered = packages.filter(pkg => {
    const matchesCat = !activeCategory || pkg.category === activeCategory
    const matchesSearch = !search || pkg.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch && pkg.is_active
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="relative py-16 px-6 text-center bg-gray-50 border-b border-gray-100">
        <div className="absolute inset-0 bg-linear-to-b from-orange-50/50 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
             Our <span className="nova-text-gradient">Packages</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Find your perfect adventure — from school trips to luxury corporate retreats
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-8 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="w-full bg-white border border-gray-200 text-gray-800 pl-10 pr-4 py-3 rounded-xl focus:border-orange-400 outline-none text-sm placeholder-gray-400 shadow-sm"
            />
          </div>
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
           <p className="text-gray-500 text-xl">No packages found.</p>
          </div>
        ) : (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
              <StaggerItem key={pkg.id} variants={staggerItemVariants}>
                <TripCard {...pkg} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </div>
  )
}