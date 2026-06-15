// nova-tourism/src/pages/BlogPost.tsx
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react'
import { BLOGS } from './Blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOGS.find(b => b.slug === slug)

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
        <Link to="/blog" className="text-[#0A4C8A] font-semibold hover:underline">← Back to Blog</Link>
      </div>
    </div>
  )

  const related = BLOGS.filter(b => b.slug !== slug && b.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-white pt-20">

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <Link to="/blog"
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white shadow-md transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto">
          <span className="text-xs font-bold text-white px-3 py-1 rounded-full mb-3 inline-block"
            style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
            {post.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
          <span className="ml-auto text-xs text-[#0A4C8A] font-semibold">By NOVA Tourism Team</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-gray-600 text-lg leading-relaxed mb-12 border-l-4 pl-5 italic"
          style={{ borderColor: '#00B4D8' }}>
          {post.content.intro}
        </motion.p>

        {/* Sections */}
        <div className="space-y-14">
          {post.content.sections.map((section, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}>

              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-start gap-3"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="w-1 h-7 rounded-full shrink-0 mt-1"
                  style={{ background: 'linear-gradient(#0A4C8A, #00B4D8)' }} />
                {section.title}
              </h2>

              <div className={`grid gap-6 ${i % 2 === 0 ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'}`}>
                {i % 2 === 0 ? (
                  <>
                    <p className="text-gray-600 leading-relaxed self-center">{section.text}</p>
                    <div className="rounded-2xl overflow-hidden shadow-md">
                      <img src={section.image} alt={section.title}
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl overflow-hidden shadow-md">
                      <img src={section.image} alt={section.title}
                        className="w-full h-52 object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <p className="text-gray-600 leading-relaxed self-center">{section.text}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl p-7 border border-blue-100"
          style={{ background: 'linear-gradient(135deg, rgba(10,76,138,0.04), rgba(0,180,216,0.06))' }}>
          <h3 className="font-black text-gray-900 text-xl mb-5 flex items-center gap-2"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="text-2xl">💡</span> Pro Tips
          </h3>
          <ul className="space-y-3">
            {post.content.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-[#0A4C8A] shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-8 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
          <p className="text-blue-100 text-sm font-semibold tracking-widest uppercase mb-2">NOVA Tourism</p>
          <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            {post.content.cta.split('.')[0]}.
          </h3>
          <p className="text-blue-100 text-sm mb-6">{post.content.cta.split('.').slice(1).join('.')}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/quote"
              className="bg-white text-[#0A4C8A] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg">
              Get a Free Quote
            </Link>
            <a href="https://wa.me/919730240400?text=Hi%20NOVA!%20I%20read%20your%20blog%20and%20want%20to%20plan%20a%20trip."
              target="_blank" rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </motion.div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Related <span style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Articles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <motion.div key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all group">
                  <div className="h-36 overflow-hidden">
                    <img src={r.image} alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-400 text-xs mb-1 flex items-center gap-1"><Clock size={10} /> {r.readTime}</p>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug mb-3 group-hover:text-[#0A4C8A] transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {r.title}
                    </h4>
                    <Link to={`/blog/${r.slug}`}
                      className="text-[#0A4C8A] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}