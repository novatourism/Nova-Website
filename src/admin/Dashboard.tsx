// nova-tourism/src/admin/Dashboard.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Image, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react'
import { adminLogin } from '../services/api'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('nova_admin_token'))
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await adminLogin(creds)
      localStorage.setItem('nova_admin_token', res.data.access_token)
      setLoggedIn(true)
      toast.success('Welcome back, Admin!')
    } catch {
      // Demo login
      if (creds.username === 'admin' && creds.password === 'nova2024') {
        localStorage.setItem('nova_admin_token', 'demo_token')
        setLoggedIn(true)
        toast.success('Welcome back, Admin!')
      } else {
        toast.error('Invalid credentials. Try admin / nova2024')
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('nova_admin_token')
    setLoggedIn(false)
  }

  if (!loggedIn) return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-primary border border-amber-500/20 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">N</span>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">NOVA Tourism & Events</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text" value={creds.username} onChange={e => setCreds(p => ({ ...p, username: e.target.value }))}
            placeholder="Username" required
            className="w-full bg-primary border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
          />
          <input
            type="password" value={creds.password} onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
            placeholder="Password" required
            className="w-full bg-primary border border-white/10 focus:border-amber-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-600"
          />
          <button disabled={loading} type="submit"
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-gray-600 text-xs text-center mt-4">Default: admin / nova2024</p>
      </motion.div>
    </div>
  )

  const cards = [
    { icon: Package, label: 'Manage Packages', desc: 'Add, edit, delete trip packages', path: '/admin/packages', color: 'from-amber-500 to-orange-500' },
    { icon: Image, label: 'Manage Gallery', desc: 'Upload and organize photos', path: '/admin/gallery', color: 'from-blue-500 to-cyan-500' },
    { icon: MessageSquare, label: 'Enquiries', desc: 'View customer enquiries', path: '/admin/enquiries', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-amber-400" size={28} />
            <div>
              <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">NOVA Tourism Management</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="text-gray-400 hover:text-white text-sm border border-white/10 px-4 py-2 rounded-full transition-colors">
              View Site
            </Link>
            <button onClick={logout} className="flex items-center gap-2 text-red-400 border border-red-500/30 px-4 py-2 rounded-full text-sm hover:bg-red-500/10 transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, label, desc, path, color }, i) => (
            <motion.div key={path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={path} className="block bg-primary border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 group hover:shadow-xl transition-all">
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold mb-1">{label}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}