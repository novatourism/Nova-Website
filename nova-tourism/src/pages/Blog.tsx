// nova-tourism/src/pages/Blog.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const BLOGS = [
  {
    id: 1, slug: 'best-hill-stations-near-pune',
    title: '7 Best Hill Stations Near Pune for a Weekend Escape',
    excerpt: 'From the misty valleys of Mahabaleshwar to the serene trails of Matheran, discover the perfect weekend getaways within 150 km of Pune.',
    category: 'Travel Tips', date: 'June 5, 2026', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    content: {
      intro: 'Pune is perfectly positioned as a gateway to some of Maharashtra\'s most stunning hill stations. Whether you\'re looking for a quick weekend escape or a longer retreat into nature, these destinations offer the perfect blend of scenic beauty, cool weather, and memorable experiences.',
      sections: [
        {
          title: '1. Mahabaleshwar — The Queen of Hill Stations',
          image: 'https://images.unsplash.com/photo-1571587289339-cb7da4689b14?w=800&q=80',
          text: 'Just 120 km from Pune, Mahabaleshwar sits at 1,372 metres and offers stunning valley views, strawberry farms, and the famous Arthur\'s Seat viewpoint. Best visited between October and June, this is the quintessential Maharashtra hill station getaway. Don\'t miss the Venna Lake boat rides and local strawberry cream.'
        },
        {
          title: '2. Lonavala & Khandala — The Twin Gems',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
          text: 'Only 65 km from Pune, Lonavala and Khandala are the most accessible hill stations and perfect for a day trip. The iconic Bhushi Dam, Tiger\'s Leap, and Rajmachi Fort make this a favourite for school trips and corporate outings. Monsoon transforms these hills into a lush green paradise.'
        },
        {
          title: '3. Matheran — India\'s Only Car-Free Hill Station',
          image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
          text: 'Matheran is unique — no vehicles are allowed inside. You either walk, hire a horse, or take the scenic toy train from Neral. The red laterite paths, colonial-era hotels, and 38 viewpoints make it one of the most peaceful escapes near Pune. Perfect for couples and families seeking a digital detox.'
        },
        {
          title: '4. Panchgani — Five Hills, Infinite Views',
          image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
          text: 'Adjacent to Mahabaleshwar, Panchgani sits on five hills and is famous for Table Land — Asia\'s second-largest volcanic plateau. The stunning panoramic views, colonial boarding schools, and strawberry orchards make it a must-visit. Sydney Point and Devil\'s Kitchen are the top spots.'
        },
        {
          title: '5. Bhandardara — The Hidden Gem',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
          text: 'Around 165 km from Pune, Bhandardara is perfect for those who want to escape the crowds. The Arthur Lake, Randha Falls, and Ratangad Fort offer spectacular scenery. Camping here under a starlit sky is an experience you\'ll never forget — NOVA organizes overnight camping trips here regularly.'
        },
        {
          title: '6. Igatpuri — The Trekker\'s Paradise',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          text: 'Known for its stunning waterfalls and trekking routes, Igatpuri is 130 km from Pune. The Kalsubai Peak — the highest in Maharashtra — is a favourite challenge for adventure lovers. The region also hosts the famous Vipassana meditation centre for those seeking inner peace.'
        },
        {
          title: '7. Lavasa — India\'s First Planned Hill City',
          image: 'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=800&q=80',
          text: 'Just 60 km from Pune, Lavasa is a beautifully planned Italian-inspired hill city on the banks of Warasgaon Lake. Perfect for a leisurely weekend with lakeside promenades, watersports, and luxury resorts. The Dasve lakefront is especially stunning in the evening.'
        }
      ],
      tips: ['Book accommodation in advance for weekends, especially during monsoon', 'Carry warm layers — evenings can get chilly even in summer', 'NOVA offers customized weekend packages to all these destinations', 'Best time to visit: October–February for clear skies; July–September for lush green monsoon beauty'],
      cta: 'Planning a weekend escape? NOVA Tourism offers customized hill station packages from Pune with transport, stays, and guided experiences.'
    }
  },
  {
    id: 2, slug: 'how-to-plan-school-trip',
    title: 'How to Plan the Perfect School Trip: A Complete Guide for Teachers',
    excerpt: 'Planning a school trip can be overwhelming. Here\'s a step-by-step guide to ensure a safe, fun, and educational experience for your students.',
    category: 'School Trips', date: 'May 20, 2026', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    content: {
      intro: 'School trips are among the most impactful learning experiences a student can have. But they require careful planning to be safe, educational, and enjoyable. After organizing 120+ school trips across Maharashtra, NOVA has put together this comprehensive guide for teachers and school administrators.',
      sections: [
        {
          title: 'Step 1: Define Your Educational Objectives',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
          text: 'Before anything else, identify what you want students to learn or experience. Is it a nature education trip, a historical site visit, a science expedition, or an adventure camp? Clear objectives help you choose the right destination, activities, and duration — and help justify the trip to parents and management.'
        },
        {
          title: 'Step 2: Choose the Right Destination & Timing',
          image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
          text: 'Match the destination to the age group and objectives. For primary students, nearby nature spots or historical sites work best. For secondary students, longer adventure or educational tours are more engaging. Timing matters too — avoid exam periods and choose seasons with good weather for outdoor activities.'
        },
        {
          title: 'Step 3: Budget Planning & Parent Communication',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
          text: 'Create a detailed budget breakdown including transport, accommodation, food, entry fees, activities, and a contingency fund of at least 10%. Share this transparently with parents along with a detailed itinerary. Early communication builds trust and gives parents time to prepare their children financially and emotionally.'
        },
        {
          title: 'Step 4: Safety Planning is Non-Negotiable',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
          text: 'Collect medical information and allergy details for every student. Ensure all staff carry first aid kits. Brief students on emergency protocols. NOVA assigns a dedicated safety coordinator on every school trip, carries first aid supplies, and maintains emergency contact lists. Never compromise on the student-to-adult ratio — 1:10 is recommended.'
        },
        {
          title: 'Step 5: Work with a Reliable Travel Partner',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
          text: 'A professional travel partner like NOVA handles logistics, accommodation, activities, and on-ground coordination so teachers can focus on students. Look for operators with verified safety records, school trip experience, and proper insurance. NOVA has organized trips for 5,000+ students across 120+ schools with a 100% safety record since 2019.'
        }
      ],
      tips: ['Start planning at least 3 months in advance for larger groups', 'Always have a backup plan for weather-dependent activities', 'Assign student buddy pairs for easier headcounting', 'Brief students on behaviour expectations before departure', 'Collect signed permission slips and emergency contacts well in advance'],
      cta: 'Let NOVA handle your next school trip end-to-end. We\'ve organized 120+ school trips with zero safety incidents. Get a free quote today.'
    }
  },
  {
    id: 3, slug: 'corporate-team-outing-ideas',
    title: '10 Creative Corporate Team Outing Ideas for Pune Companies',
    excerpt: 'Looking to boost team morale? We\'ve rounded up the most effective and fun corporate outing ideas that Pune teams will love.',
    category: 'Corporate', date: 'May 10, 2026', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&q=80',
    content: {
      intro: 'A great corporate outing does more than give employees a day off — it builds real bonds, sparks creativity, and sends employees back to work energized. After organizing 200+ corporate retreats for Pune companies, here are NOVA\'s top picks for team outings that actually work.',
      sections: [
        {
          title: '1. Adventure Trek + Campfire Night',
          image: 'https://images.unsplash.com/photo-1472746729193-26d21372a793?w=800&q=80',
          text: 'Nothing breaks down corporate hierarchies like conquering a trail together. Popular options from Pune include Rajmachi, Sinhagad, and Harishchandragad. Follow it up with a campfire dinner, team games, and stargazing. Teams consistently report this as the most memorable outing format.'
        },
        {
          title: '2. River Rafting + Resort Stay',
          image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
          text: 'Kolad\'s Kundalika River is India\'s most consistent rafting destination and just 130 km from Pune. Combine rafting in the morning with a riverside resort stay, BBQ dinner, and team activities in the evening. This format works brilliantly for groups of 20–100 people.'
        },
        {
          title: '3. Customized Team Building Workshop + Offsite',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
          text: 'Combine structured team building — think escape rooms, problem-solving challenges, or communication workshops — with a scenic offsite location. NOVA partners with professional facilitators who design activities specific to your team\'s challenges and goals.'
        },
        {
          title: '4. Cooking Competition + Gourmet Dinner',
          image: 'https://images.unsplash.com/photo-1556910103-1c02745adc4b?w=800&q=80',
          text: 'Teams compete to create the best dish from a given set of ingredients, judged by a professional chef. It\'s fun, surprisingly competitive, and reveals sides of colleagues you never knew. End the evening with all the dishes served as dinner. Works great for smaller teams of 15–40.'
        },
        {
          title: '5. Wellness & Spa Retreat',
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
          text: 'For high-stress teams, a wellness retreat can be transformative. Yoga sessions at sunrise, guided meditation, Ayurvedic spa treatments, and mindful team activities in a scenic resort setting. This format works especially well for teams that have been through intense project cycles.'
        },
        {
          title: '6. Photography Walk + Art Exhibition',
          image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
          text: 'Give teams cameras and a creative brief, let them explore a heritage area or natural location, then curate the best shots into a mini exhibition at dinner. It\'s a creative exercise that brings out different strengths and generates conversation. Works brilliantly in Pune\'s heritage precincts.'
        }
      ],
      tips: ['Plan activities that accommodate different fitness levels', 'Avoid Monday and Friday for outings — mid-week maximizes participation', 'Mix departments deliberately to break silos', 'Include vegetarian and dietary preference options for all meals', 'Send a recap email with photos within 24 hours to sustain the positive energy'],
      cta: 'NOVA specializes in corporate retreats for 10 to 500+ employees. We handle everything from transport to activities to gourmet meals. Get your custom quote.'
    }
  },
  {
    id: 4, slug: 'goa-travel-guide',
    title: 'The Ultimate Goa Travel Guide: Everything You Need to Know',
    excerpt: 'North Goa vs South Goa, best beaches, local food, travel tips, and how to make the most of your Goa trip — all in one guide.',
    category: 'Destinations', date: 'April 28, 2026', readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    content: {
      intro: 'Goa remains India\'s most beloved holiday destination — and for good reason. With 100+ km of coastline, vibrant nightlife, Portuguese heritage, incredible seafood, and a laid-back vibe unlike anywhere else in India, Goa offers something for every kind of traveller. Here\'s everything you need to know.',
      sections: [
        {
          title: 'North Goa vs South Goa: Which Should You Choose?',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
          text: 'North Goa (Calangute, Baga, Anjuna) is vibrant, commercial, and perfect for nightlife, water sports, and budget travellers. South Goa (Palolem, Agonda, Colva) is quieter, cleaner, and more upscale — ideal for couples, families, and those seeking peace. Most visitors split their time between both.'
        },
        {
          title: 'Top Beaches You Cannot Miss',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
          text: 'Baga Beach for water sports and nightlife. Vagator for its dramatic red cliffs. Palolem for its crescent-shaped beauty and hammock cafes. Arambol for its bohemian charm. Butterfly Beach (South Goa) for its pristine isolation — accessible only by boat. Each beach has its own personality.'
        },
        {
          title: 'Goa Beyond the Beaches: Heritage & Culture',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
          text: 'Old Goa\'s Se Cathedral and Basilica of Bom Jesus are UNESCO World Heritage Sites. The Saturday Night Market in Arpora is one of India\'s best flea markets. Fontainhas in Panaji is a stunning heritage quarter of Portuguese-era houses. Goa has 400+ years of colonial history waiting to be explored.'
        },
        {
          title: 'Food: The Real Reason to Visit Goa',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
          text: 'Goan food is unlike anything else in India. Must-try dishes: Fish Curry Rice, Prawn Balchão, Pork Vindaloo, Chicken Cafreal, and Bebinca for dessert. For the best seafood, skip the tourist restaurants and head to local shacks like Ritz Classic in Panaji or Fisherman\'s Wharf. Don\'t leave without trying Feni — Goa\'s famous local spirit.'
        },
        {
          title: 'Best Time to Visit & Practical Tips',
          image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80',
          text: 'Peak season is November to February — perfect weather, all shacks open, Christmas-New Year is electric. October and March are shoulder season — fewer crowds, great deals. Avoid June–September (monsoon) unless you love dramatic storms and empty beaches. Book hotels 2–3 months in advance for December visits.'
        }
      ],
      tips: ['Rent a scooter to explore independently — most hotels can arrange this', 'Bargain at markets but be respectful — vendors depend on tourism', 'Water sports prices are negotiable, especially off-peak', 'Carry light, breathable cotton clothing', 'The best sunsets are at Vagator and Chapora Fort'],
      cta: 'NOVA offers curated Goa packages from Pune with AC transport, stays, and guided tours. Group discounts available for 10+ travellers.'
    }
  },
  {
    id: 5, slug: 'honeymoon-destinations-india',
    title: 'Top 8 Honeymoon Destinations in India for 2026',
    excerpt: 'From Kerala\'s backwaters to Rajasthan\'s palaces, here are the most romantic destinations for couples planning their honeymoon in India.',
    category: 'Honeymoon', date: 'April 15, 2026', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80',
    content: {
      intro: 'India is an extraordinary honeymoon destination — from backwater cruises in Kerala to desert camps in Rajasthan, snowy valleys in Kashmir to tropical islands in Andaman. Here are the 8 most romantic destinations for couples in 2026, curated by NOVA\'s honeymoon planning experts.',
      sections: [
        {
          title: '1. Kerala — God\'s Own Honeymoon',
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
          text: 'A houseboat stay on Alleppey\'s backwaters is one of India\'s most romantic experiences. Add Munnar\'s misty tea gardens, Kovalam\'s beaches, and Ayurvedic spa treatments. Kerala is effortlessly romantic — the slow pace, lush greenery, and incredible food make it perfect for couples. Best time: September–March.'
        },
        {
          title: '2. Kashmir — Heaven on Earth',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          text: 'A Shikara ride on Dal Lake at sunrise, tulip gardens in Pahalgam, skiing in Gulmarg, and staying in a traditional wooden houseboat — Kashmir is a once-in-a-lifetime experience. The region has been welcoming tourists warmly and 2026 is the perfect time to experience its incredible beauty.'
        },
        {
          title: '3. Rajasthan — Royal Romance',
          image: 'https://images.unsplash.com/photo-1477587458883-47145ed6736c?w=800&q=80',
          text: 'Stay in a palace hotel in Udaipur, watch the sun rise over the Thar Desert from a luxury camp in Jaisalmer, and explore Jaipur\'s magnificent forts. Rajasthan offers a uniquely regal honeymoon experience. The Lake Palace in Udaipur and heritage havelis in Jodhpur are particularly spectacular.'
        },
        {
          title: '4. Andaman Islands — Tropical Paradise',
          image: 'https://images.unsplash.com/photo-1529492598371-a1be0a302a4d?w=800&q=80',
          text: 'With some of Asia\'s clearest waters, coral reefs, and white sand beaches, Andaman is India\'s tropical honeymoon gem. Radhanagar Beach on Havelock Island is consistently ranked among Asia\'s best beaches. Snorkelling, scuba diving, and private beach dinners make it incredibly romantic.'
        },
        {
          title: '5. Coorg — The Scotland of India',
          image: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800&q=80',
          text: 'Coorg\'s coffee and spice estates, misty hills, and luxury plantation stays offer an intimate, peaceful honeymoon experience. The Abbey Falls, Raja\'s Seat viewpoint, and Namdroling Monastery add variety. For couples who love nature, hiking, and privacy, Coorg is hard to beat.'
        }
      ],
      tips: ['Book honeymoon packages at least 3 months in advance', 'Mention it\'s your honeymoon — hotels often add complimentary upgrades', 'Travel insurance is highly recommended for international honeymoon destinations', 'Shoulder season offers better deals and fewer crowds', 'NOVA creates fully customized honeymoon itineraries — no two are the same'],
      cta: 'Your honeymoon deserves to be perfect. NOVA creates fully personalized honeymoon packages with handpicked hotels, private transfers, and romantic experiences.'
    }
  },
  {
    id: 6, slug: 'trekking-maharashtra-forts',
    title: "Maharashtra's Top 10 Forts for Trekking: Beginner to Advanced",
    excerpt: 'Maharashtra is home to 350+ forts. Here are the best ones to trek, from easy sunrise hikes to challenging overnight expeditions.',
    category: 'Adventure', date: 'April 2, 2026', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    content: {
      intro: 'Maharashtra has over 350 forts — more than any other Indian state. Built by Chhatrapati Shivaji Maharaj and the Maratha Empire, these forts sit atop dramatic hills and offer some of the most spectacular trekking in India. Here are the best ones, sorted by difficulty.',
      sections: [
        {
          title: 'Beginner: Sinhagad Fort (Pune)',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
          text: 'The most accessible fort trek from Pune, Sinhagad is a 2-hour moderate hike with a well-marked path. The views of Khadakwasla Dam are stunning, and the local food stalls at the top serve excellent pithla-bhakri and buttermilk. Perfect for first-time trekkers and families. Best visited early morning to avoid crowds.'
        },
        {
          title: 'Beginner: Lohagad Fort (Lonavala)',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
          text: 'A 45-minute easy trek near Lonavala, Lohagad offers spectacular views of Pawna Lake and the surrounding Sahyadri ranges. The fort is well-preserved with ancient water tanks and bastions. Ideal for monsoon trekking when the surrounding valleys turn lush green — one of the most photographed views in Maharashtra.'
        },
        {
          title: 'Intermediate: Rajmachi Fort',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          text: 'Rajmachi offers two options — a 3-hour day trek or an overnight expedition with camping. The twin peaks of Shrivardhan and Manaranjan fort provide 360-degree views. The base village of Udhewadi offers simple homestay accommodation, and the sunrise from the top is spectacular. A NOVA favourite for overnight group treks.'
        },
        {
          title: 'Advanced: Harishchandragad',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
          text: 'One of Maharashtra\'s most challenging and rewarding treks. The Konkan Kada — a massive overhanging cliff with a sheer 1,000-foot drop — is breathtaking. The ancient Harishchandreshwar temple and Kedareshwar cave with a Shivling make this trek spiritually significant. Requires 2 days, camping, and good fitness. NOVA organizes guided overnight expeditions.'
        },
        {
          title: 'Expert: Kalsubai — Maharashtra\'s Highest Peak',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          text: 'At 1,646 metres, Kalsubai is the highest peak in Maharashtra. The trail involves iron ladders bolted into rock faces and requires 4–5 hours of climbing. The summit views extend over 100 km on clear days. Sunrise treks are especially popular — NOVA runs night treks starting at 2 AM to reach the summit at dawn.'
        }
      ],
      tips: ['Always carry 2+ litres of water and high-energy snacks', 'Wear trekking shoes — never sandals or regular sneakers', 'Start monsoon treks only with experienced guides — paths get slippery', 'Inform someone of your route and expected return time', 'NOVA treks include a trained guide, first aid kit, and safety briefing'],
      cta: 'NOVA organizes guided fort treks for groups of all sizes and fitness levels. Our certified guides ensure a safe and memorable experience. Book your next trek today.'
    }
  },
  {
    id: 7, slug: 'budget-travel-india-tips',
    title: '15 Proven Tips for Budget Travel in India Without Missing Out',
    excerpt: 'Travelling India on a budget doesn\'t mean compromising on experiences. Here\'s how to see incredible India without breaking the bank.',
    category: 'Travel Tips', date: 'March 25, 2026', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
    content: {
      intro: 'India is one of the most rewarding budget travel destinations in the world. With smart planning, you can experience incredible food, stunning landscapes, and rich culture for a fraction of what you\'d spend elsewhere. Here are 15 tips from seasoned Indian travellers.',
      sections: [
        {
          title: 'Book Trains in Advance',
          image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
          text: 'Indian Railways offers incredible value — a sleeper class ticket from Mumbai to Goa costs under ₹500. Book on IRCTC at least 60 days in advance to get confirmed tickets. Tatkal quota is available for last-minute travel at a premium. AC 3-tier is the sweet spot between comfort and cost for long journeys.'
        },
        {
          title: 'Eat Where the Locals Eat',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
          text: 'A full meal at a local dhaba or thali restaurant costs ₹80–150. Street food — vada pav, pani puri, dosa — is fresh, delicious, and costs ₹20–50 per item. Avoid restaurants with tourist-facing menus on main streets; walk one lane in and prices halve. The food quality is often better too.'
        },
        {
          title: 'Travel in Groups for Best Value',
          image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
          text: 'Group travel unlocks significant discounts on transport, accommodation, and activities. A private taxi split 4 ways is often cheaper than public transport with luggage. NOVA\'s group packages offer 20–30% better value than individual booking — economies of scale work powerfully in travel.'
        }
      ],
      tips: ['Use UPI payments everywhere — most vendors now accept it', 'Carry small denomination notes for local markets', 'Book accommodation with free cancellation to stay flexible', 'Visit monuments on weekdays to avoid crowds and get better photos', 'NOVA offers group packages with significant discounts for 10+ travellers'],
      cta: 'NOVA creates value-for-money travel packages without compromising on experience. Get a transparent quote for your next group trip.'
    }
  },
  {
    id: 8, slug: 'monsoon-travel-maharashtra',
    title: 'Why Monsoon is the Best Time to Travel Maharashtra',
    excerpt: 'Most people avoid travelling in monsoon. Here\'s why that\'s a mistake — and which destinations truly come alive in the rains.',
    category: 'Travel Tips', date: 'March 10, 2026', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80',
    content: {
      intro: 'Most travellers avoid Maharashtra during monsoon season (June–September). But for those who dare to travel in the rain, the rewards are extraordinary — waterfalls in full flow, impossibly green Sahyadri hills, empty destinations, and hotel prices at their lowest. Here\'s the insider guide to monsoon travel in Maharashtra.',
      sections: [
        {
          title: 'Waterfalls at Their Spectacular Best',
          image: 'https://images.unsplash.com/photo-1567489987954-3890734e41ff?w=800&q=80',
          text: 'Dudhsagar Falls in Goa, Thoseghar near Satara, Lingmala in Mahabaleshwar, and Vajrai near Satara — Maharashtra and Goa have hundreds of spectacular waterfalls that only exist during monsoon. Dudhsagar, the fourth tallest waterfall in India at 310 metres, is simply unmissable in July–August.'
        },
        {
          title: 'The Sahyadri Goes Completely Green',
          image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
          text: 'The Western Ghats transform completely in monsoon. Every hillside turns brilliant green, misty clouds hang low over valleys, and streams appear where there were none. Kaas Plateau — the Valley of Flowers of Maharashtra — blooms exclusively in September with thousands of endemic wildflowers.'
        },
        {
          title: 'Best Monsoon Destinations Near Pune',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          text: 'Lonavala and Khandala become magic in monsoon. Bhushi Dam fills to the brim and becomes a popular (though care-needed) spot. Tamhini Ghat offers one of the most beautiful monsoon drives in Maharashtra — every curve reveals another waterfall. Malshej Ghat is particularly spectacular with clouds literally passing through the road.'
        }
      ],
      tips: ['Carry rain gear but embrace getting wet — it\'s part of the experience', 'Roads can get slippery — drive carefully on ghats', 'Book accommodation with covered outdoor areas', 'Avoid trekking in heavy rain without an experienced guide', 'NOVA runs special monsoon packages with all safety precautions in place'],
      cta: 'Experience Maharashtra\'s most magical season with NOVA. Our monsoon packages include all safety precautions, guided experiences, and the best locations.'
    }
  },
  {
    id: 9, slug: 'corporate-wellness-retreats',
    title: 'Why Corporate Wellness Retreats Are the New Team Building',
    excerpt: 'Companies are replacing traditional team outings with wellness retreats — and seeing dramatic results in productivity and retention.',
    category: 'Corporate', date: 'February 20, 2026', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    content: {
      intro: 'The post-pandemic workplace has fundamentally changed what employees need from their employers. Burnout is at record levels, and companies that invest in genuine employee wellbeing — not just token gestures — are seeing measurable improvements in retention, productivity, and culture. Corporate wellness retreats are leading this shift.',
      sections: [
        {
          title: 'What is a Corporate Wellness Retreat?',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
          text: 'A corporate wellness retreat combines team building with genuine wellbeing programming — yoga, meditation, nature therapy, nutrition workshops, and mental health sessions — in a beautiful offsite location. Unlike traditional team outings, these are designed to send employees back genuinely refreshed rather than just entertained.'
        },
        {
          title: 'The Business Case for Wellness Retreats',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
          text: 'Companies that invest in employee wellness report 25% lower absenteeism and 21% higher productivity. For a team of 50, a two-day wellness retreat costs roughly ₹2–4 lakhs — but reduces attrition by even 1–2 people saves far more in recruitment and onboarding costs. The ROI is compelling.'
        },
        {
          title: 'What NOVA Includes in Wellness Retreats',
          image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
          text: 'Our corporate wellness retreats include sunrise yoga, guided meditation, team nature walks, nutrition-focused meals, facilitated team sharing sessions, and optional adventure activities for those who prefer movement over stillness. We customize the balance of wellness and activity based on your team\'s needs.'
        }
      ],
      tips: ['Ensure participation is voluntary — forced wellness isn\'t wellness', 'Disconnect from work tools during the retreat for full benefit', 'Follow up with a monthly wellness initiative to sustain momentum', 'Survey employees before designing the retreat to understand needs', 'Mix departments deliberately to break information silos'],
      cta: 'NOVA designs corporate wellness retreats that employees actually want to attend. Customized for your team size, budget, and goals. Get in touch today.'
    }
  },
]

const CATS = ['All', 'Travel Tips', 'School Trips', 'Corporate', 'Destinations', 'Honeymoon', 'Adventure']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? BLOGS
    : BLOGS.filter(b => b.category === activeCategory)

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="relative py-20 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">Travel Inspiration</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Blog
          </h1>
          <p className="text-blue-100 text-lg">Tips, guides & stories from the world of travel</p>
        </motion.div>
      </section>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap justify-center px-6 py-6 border-b border-gray-100 sticky top-16 bg-white/95 backdrop-blur-sm z-10">
        {CATS.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#0A4C8A]'
            }`}
            style={activeCategory === cat ? { background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((post, i) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-bold text-white px-3 py-1 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-2 group-hover:text-[#0A4C8A] transition-colors leading-snug"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px' }}>
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`}
                    className="text-[#0A4C8A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-400">No posts in this category yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  )
}