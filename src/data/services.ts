// nova-tourism/src/data/services.ts

export interface Service {
  slug: string
  emoji: string
  title: string
  shortDesc: string
  color: string
  folderName: string   // ← exact folder name in src/assets/Services/
  features: string[]
  overview: string
}

export const ALL_SERVICES: Service[] = [
  {
    slug: 'domestic-international',
    emoji: '✈️',
    title: 'Domestic & International Tours',
    shortDesc: 'Explore India and the world with curated travel packages',
    color: 'from-blue-500 to-indigo-600',
    folderName: 'Domestic and international tours',
    features: ['Visa assistance', 'Flight booking', 'Hotel accommodation', 'Guided sightseeing', 'Travel insurance'],
    overview: 'NOVA Tourism offers expertly crafted domestic and international tour packages for every type of traveler. From the snow-capped peaks of Himachal Pradesh to the beaches of Thailand, we plan every detail so you can focus on creating memories.',
  },
  {
    slug: 'school-trips',
    emoji: '🏫',
    title: 'School Educational Trips',
    shortDesc: 'Safe, fun & educational adventures for students',
    color: 'from-green-500 to-emerald-600',
    folderName: 'School educational Trip',
    features: ['AC bus transport', 'All meals included', 'Certified safety staff', 'Activity programs', 'Parent updates'],
    overview: 'NOVA specializes in school trips that combine education with adventure. Trusted by 120+ schools in Pune since 2019, with a 100% safety record across 5,000+ students served.',
  },
  {
    slug: 'college-visits',
    emoji: '🎓',
    title: 'College & Industrial Visits',
    shortDesc: 'Educational tours for college students & institutions',
    color: 'from-purple-500 to-violet-600',
    folderName: 'College &industrial visits',
    features: ['Industry partnerships', 'Faculty coordination', 'Transport & stay', 'Documentation support', 'Group discounts'],
    overview: 'We organize professional industrial visits and educational tours for colleges across Pune and Maharashtra, coordinating everything from permissions to transport.',
  },
  {
    slug: 'corporate-tours',
    emoji: '🏢',
    title: 'Corporate Tours & Business Travel',
    shortDesc: 'Premium corporate travel & outstation packages',
    color: 'from-slate-600 to-gray-700',
    folderName: 'Corporate Tours & Business Travel',
    features: ['Premium AC transport', 'Luxury hotels', 'Conference facilities', 'Airport transfers', 'Corporate invoicing'],
    overview: 'NOVA handles all aspects of corporate business travel — from airport transfers to multi-city tours, ensuring your team travels comfortably and professionally.',
  },
  {
    slug: 'corporate-events',
    emoji: '🎉',
    title: 'Corporate Events & Team Outings',
    shortDesc: 'Team building, retreats & corporate celebrations',
    color: 'from-amber-500 to-orange-600',
    folderName: 'Corporate Events & Team Outings',
    features: ['Team building activities', 'Venue sourcing', 'Gala dinners', 'Award ceremonies', 'Entertainment'],
    overview: 'From intimate team outings to large-scale corporate retreats, NOVA creates experiences that strengthen bonds, boost morale, and create lasting memories.',
  },
  {
    slug: 'school-college-events',
    emoji: '🎭',
    title: 'School & College Events',
    shortDesc: 'Annual days, fests & cultural event management',
    color: 'from-pink-500 to-rose-600',
    folderName: 'School & College Events',
    features: ['Stage & decor setup', 'AV equipment', 'Cultural programs', 'Anchoring & emcee', 'Photography'],
    overview: 'NOVA manages school annual days, college festivals, farewell events, and cultural programs with professionalism and creativity that makes every event memorable.',
  },
  {
    slug: 'family-tours',
    emoji: '👨‍👩‍👧‍👦',
    title: 'Family Tour Packages',
    shortDesc: 'Memorable family vacations crafted with care',
    color: 'from-teal-500 to-cyan-600',
    folderName: 'Family Tour Packages',
    features: ['Kid-friendly activities', 'Family rooms', 'Flexible itineraries', 'Senior-friendly options', '24/7 support'],
    overview: 'Our family tour packages are designed to cater to all ages — from toddlers to grandparents. We pick the right destinations, accommodations, and activities for your family.',
  },
  {
    slug: 'group-tours',
    emoji: '👥',
    title: 'Group Tours',
    shortDesc: 'Budget-friendly tours for groups of all sizes',
    color: 'from-yellow-500 to-amber-600',
    folderName: 'Group Tours',
    features: ['Group discounts', 'Shared AC transport', 'Group check-in', 'Common dining', 'Group coordinator'],
    overview: 'Travelling with friends, colleagues, or a community group? NOVA offers the best group tour rates with seamless logistics for groups of 10 to 500.',
  },
  {
    slug: 'solo-travel',
    emoji: '🧍',
    title: 'Solo Travel Packages',
    shortDesc: 'Safe, curated solo travel experiences',
    color: 'from-red-500 to-rose-600',
    folderName: 'Solo Travel Packages',
    features: ['Solo-friendly destinations', 'Safe accommodations', 'Meet fellow travelers', 'Budget options', 'Travel buddy matching'],
    overview: "Explore the world on your own terms. NOVA's solo travel packages are designed for safety, comfort, and the joy of independent exploration.",
  },
  {
    slug: 'pilgrimage',
    emoji: '🕉️',
    title: 'Pilgrimage & Spiritual Tours',
    shortDesc: "Sacred journeys to India's holiest destinations",
    color: 'from-orange-500 to-amber-600',
    folderName: 'Pilgrimage & Spiritual Tours',
    features: ['Religious site access', 'Pandit coordination', 'Vegetarian meals', 'Senior-friendly', 'Comfortable stay'],
    overview: "From the Char Dham Yatra to Shirdi and Pandharpur, NOVA organizes spiritually enriching pilgrimages with all the comfort and care your journey deserves.",
  },
  {
    slug: 'adventure-tours',
    emoji: '🏕️',
    title: 'Adventure Tours & Weekend Getaways',
    shortDesc: 'Treks, camps & weekend adventures near Pune',
    color: 'from-lime-500 to-green-600',
    folderName: 'Adventure Tours & Weekend Getaways',
    features: ['Expert guides', 'Safety equipment', 'Weekend treks', 'Camping', 'Water sports'],
    overview: "Discover Maharashtra's forts, waterfalls, and wilderness on NOVA's adventure tours. From beginner sunrise treks to challenging expeditions, we have it all.",
  },
  {
    slug: 'honeymoon',
    emoji: '💑',
    title: 'Honeymoon Packages',
    shortDesc: 'Romantic getaways for the perfect start',
    color: 'from-rose-500 to-pink-600',
    folderName: 'Honeymoon Packages',
    features: ['Romantic resorts', 'Candle-light dinners', 'Couple spa', 'Sunset cruises', 'Surprise setups'],
    overview: "Begin your forever with NOVA's handcrafted honeymoon packages. From Goa's beaches to Kerala's backwaters — we create the perfect romantic escape.",
  },
  {
    slug: 'transport',
    emoji: '🚌',
    title: 'Transport & Vehicle Rental',
    shortDesc: 'AC coaches, buses & luxury vehicles on rent',
    color: 'from-sky-500 to-blue-600',
    folderName: 'Transport & Vehicle Rental',
    features: ['AC buses & coaches', 'Luxury cars', 'Airport transfers', 'Outstation travel', 'Driver included'],
    overview: "NOVA's transport division provides reliable, comfortable vehicles for all your travel needs — school trips, corporate travel, weddings, airport transfers, and more.",
  },
  {
    slug: 'customized-tours',
    emoji: '📍',
    title: 'Customized Tour Packages',
    shortDesc: 'Your dream trip, built exactly your way',
    color: 'from-indigo-500 to-blue-600',
    folderName: 'Customized Tour Packages',
    features: ['Any destination', 'Any budget', 'Any group size', 'Flexible dates', 'Full customization'],
    overview: "Don't see what you're looking for? Tell us your dream trip and NOVA will build it from scratch — destination, dates, budget, accommodation, activities — all tailored to you.",
  },
  {
    slug: 'event-management',
    emoji: '🎪',
    title: 'Event Planning & Management',
    shortDesc: 'End-to-end event solutions for every occasion',
    color: 'from-fuchsia-500 to-purple-600',
    folderName: 'Event Planning & Management',
    features: ['Theme design', 'Vendor management', 'Catering', 'Photography', 'On-site coordination'],
    overview: "NOVA's event management team brings creativity and precision to every occasion — from birthday parties to large-scale conferences and cultural festivals.",
  },
  {
    slug: 'destination-weddings',
    emoji: '💍',
    title: 'Destination Weddings',
    shortDesc: 'Dream weddings at stunning locations',
    color: 'from-rose-400 to-pink-500',
    folderName: 'Destination Weddings',
    features: ['Venue selection', 'Decor & florals', 'Guest management', 'Catering', 'Photography & videography'],
    overview: "Make your wedding unforgettable with NOVA's destination wedding planning. From Rajasthan palaces to Goa beaches, we handle every detail of your dream ceremony.",
  },
]

// 12 key services for nav dropdown
export const NAV_SERVICES = ALL_SERVICES.filter(s => [
  'school-trips', 'college-visits', 'corporate-tours', 'corporate-events',
  'honeymoon', 'family-tours', 'group-tours', 'pilgrimage',
  'adventure-tours', 'destination-weddings', 'event-management', 'transport'
].includes(s.slug))