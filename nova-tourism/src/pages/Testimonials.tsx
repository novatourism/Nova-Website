// nova-tourism/src/pages/Testimonials.tsx
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  { name: 'Mrs. Sunita Desai',   role: 'Class Teacher, DPS Pune',       stars: 5, text: 'Absolutely brilliantly organized! The kids had an amazing time and we felt completely at ease with the safety arrangements. Will book again next year.' },
  { name: 'Ankit Mehta',         role: 'HR Head, Infosys Pune',         stars: 5, text: 'NOVA delivered an exceptional corporate retreat. The team-building activities were creative and our employees are still talking about it 3 months later!' },
  { name: 'Neha & Rohit',        role: 'Honeymoon Couple',              stars: 5, text: 'Our honeymoon with NOVA was perfect. The resort was beautiful, the sunset cruise was romantic, and the coordinator handled everything perfectly.' },
  { name: 'Priya Sharma',        role: 'School Principal',              stars: 5, text: 'NOVA organized an amazing school trip for 200 students. Everything was perfectly planned and safe. We highly recommend them.' },
  { name: 'Rahul & Priya',       role: 'Couple, Pune',                  stars: 5, text: 'Our first trip with NOVA and definitely not the last. The sunset viewpoint was breathtaking. The coordinator handled everything.' },
  { name: 'Siddharth Rane',      role: 'IT Professional, Pune',        stars: 5, text: 'Done 4 treks with NOVA so far. Their guides are knowledgeable and make every trek fun. The Rajgad night trek was unforgettable!' },
  { name: 'Aishwarya Bhatt',     role: 'Birthday Event, Pune',         stars: 5, text: 'NOVA organized my 30th birthday and it was magical! Every detail was perfect — the decor, the food, the music. All my guests were blown away.' },
  { name: 'Sneha Joshi',         role: 'Operations Manager, TCS',      stars: 5, text: 'Flawlessly organized corporate event. The venue was stunning, food was excellent, and the coordinator handled every detail. Would highly recommend.' },
  { name: 'Kavya Menon',         role: 'First-time Trekker',           stars: 5, text: "I had never trekked before but felt completely safe with the NOVA team. The guide was patient and encouraging. Already planning my next one!" },
  { name: 'Rohan Industries',    role: 'Annual Day Event',             stars: 5, text: "We've organized our annual day with NOVA for 3 consecutive years. Their professionalism and creativity gets better every year." },
  { name: 'Friend Group of 8',   role: 'College Reunion Trip',        stars: 5, text: "Best Goa trip we've ever had! NOVA sorted all the logistics — we just had to show up and enjoy. The water sports were highlights." },
  { name: 'Vikram Patil',        role: 'CEO, StartupHub Pune',        stars: 4, text: 'Great retreat for our 40-person team. The workshop sessions were insightful and the evening activities built real camaraderie.' },
  // ── New testimonials ──
  { name: 'Deepa Kulkarni',      role: 'Parent, Pune',                 stars: 5, text: 'My daughter went on NOVA\'s school trip and came back with so many happy memories. The safety measures and communication with parents were excellent throughout.' },
  { name: 'Mr. Rajesh Nair',     role: 'Principal, Symbiosis School',  stars: 5, text: 'We\'ve trusted NOVA with our annual school excursion for 3 years running. They handle 300+ students with remarkable efficiency and care. Truly professional.' },
  { name: 'Arjun & Meera',       role: 'Newlyweds, Mumbai',            stars: 5, text: 'NOVA planned our Kerala honeymoon and it was beyond perfect. The houseboat experience on Alleppey backwaters was something we\'ll cherish forever.' },
  { name: 'Pooja Verma',         role: 'HR Manager, Wipro Pune',       stars: 5, text: 'Our team of 80 had an incredible day outing organized by NOVA. The activities were well-paced and every team member — from interns to directors — had a great time.' },
  { name: 'Ganesh Marathe',      role: 'Adventure Enthusiast',         stars: 5, text: 'The Harishchandragad trek with NOVA was epic. The guide\'s knowledge of the fort\'s history made it so much more meaningful. Safety was never compromised.' },
  { name: 'Swati & Family',      role: 'Family of 6, Nashik',          stars: 5, text: 'Planned our family trip to Goa through NOVA and it was hassle-free from start to finish. The kids loved the water sports and we loved the hotel choice. Perfect vacation.' },
  { name: 'Ravi Deshmukh',       role: 'General Manager, HDFC Bank',   stars: 5, text: 'NOVA organized our annual banking conference retreat for 150 people. The venue selection, catering, and logistics were all superb. We\'ll definitely engage them again.' },
  { name: 'Nisha Iyer',          role: 'Travel Enthusiast, Bangalore',  stars: 5, text: 'Joined NOVA\'s group tour to Rajasthan and it was exceptional value. The itinerary was perfectly paced — we never felt rushed and never had a dull moment.' },
  { name: 'Prakash Tiwari',      role: 'Teacher, Pune',                stars: 5, text: 'I accompanied students on a NOVA trip to Mahabaleshwar. Their coordinator was brilliant with the kids — patient, energetic, and clearly experienced with student groups.' },
  { name: 'Sameer & Divya',      role: 'Couple, Pune',                  stars: 5, text: 'NOVA\'s Mahabaleshwar package was our first trip together and it set the bar really high! Beautiful resort, lovely drives, excellent service throughout the weekend.' },
  { name: 'Tech Company, Pune',  role: '200-Person Annual Outing',      stars: 5, text: 'Managing an outing for 200 tech employees is no small feat. NOVA pulled it off without a single hitch. The team activities and gala dinner were both highlights.' },
  { name: 'Ananya Joshi',        role: 'College Student, Pune',         stars: 5, text: 'Our college trip to Coorg with NOVA was the best college memory I have. Well-organized, great locations, and the guide made everything so much fun!' },
]

const STATS = [
  { value: '5,000+', label: 'Happy Travelers' },
  { value: '500+',   label: 'Events Managed' },
  { value: '4.9/5',  label: 'Average Rating' },
  { value: '120+',   label: 'Partner Schools' },
]

const CATEGORIES = ['All', 'School Trips', 'Corporate', 'Honeymoon', 'Adventure', 'Family', 'Events']

function getCategory(role: string): string {
  const r = role.toLowerCase()
  if (r.includes('school') || r.includes('principal') || r.includes('teacher') || r.includes('student') || r.includes('college')) return 'School Trips'
  if (r.includes('hr') || r.includes('manager') || r.includes('ceo') || r.includes('corporate') || r.includes('company') || r.includes('outing') || r.includes('bank') || r.includes('tech')) return 'Corporate'
  if (r.includes('honeymoon') || r.includes('newlywed')) return 'Honeymoon'
  if (r.includes('trek') || r.includes('adventure')) return 'Adventure'
  if (r.includes('family')) return 'Family'
  if (r.includes('event') || r.includes('birthday') || r.includes('annual')) return 'Events'
  return 'All'
}

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => getCategory(t.role) === activeCategory)

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="relative py-20 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">What People Say</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Testimonials
          </h1>
          <p className="text-blue-100 text-lg">Real stories from real travelers</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="text-3xl font-black"
                style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Playfair Display, serif' }}>
                {s.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap justify-center px-6 py-5 sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#0A4C8A]'
            }`}
            style={activeCategory === cat ? { background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' } : {}}>
            {cat} {activeCategory === cat && `(${filtered.length})`}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((t, i) => (
              <motion.div key={t.name + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all relative"
              >
                <Quote size={32} className="absolute top-5 right-5 opacity-5" style={{ color: '#0A4C8A' }} />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#F4A623] text-[#F4A623]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-6">Ready to create your own story with NOVA?</p>
          <Link to="/quote"
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
            Plan My Trip →
          </Link>
        </div>
      </section>
    </div>
  )
}