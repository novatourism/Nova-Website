// nova-tourism/src/pages/Testimonials.tsx
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  // ─── SCHOOL TRIPS ───────────────────────────────────────────────────
  {
    name: 'Mrs. Sunita Desai',
    role: 'Class Teacher, DPS Pune',
    stars: 5,
    text: 'Honestly exceeded all my expectations. I\'ve been on school trips where things fall apart by Day 1 — bus late, kids complaining about food, teachers stressed. This was nothing like that. Everything was smooth, the guide was fantastic with the kids, and I actually got to enjoy it too for once. Will definitely be booking with NOVA again next year.',
  },
  {
    name: 'Priya Sharma',
    role: 'School Principal, Symbiosis School Pune',
    stars: 5,
    text: 'We sent 200 students with NOVA this year. I\'ll be honest — I was nervous. That\'s a lot of kids. But their coordinator Rahul was phenomenal. He called me twice a day with updates, handled a minor medical situation calmly, and got everyone back safely. That\'s all I ask for. We\'ll be back.',
  },
  {
    name: 'Prakash Tiwari',
    role: 'Teacher, Podar International School',
    stars: 5,
    text: 'Jo guide tha hamara — Santosh — woh bahut zabardast tha. Bacchon ko history sunana ka andaaz aisa tha ki sab log sun rahe the, phone nahi dekh rahe the 😄 Sinhagad fort ka visit life mein yaad rahega unko. NOVA ne sach mein ek accha experience diya.',
  },
  {
    name: 'Deepa Kulkarni',
    role: 'Parent, Pune',
    stars: 5,
    text: 'My son went on his first overnight trip with NOVA and I was a wreck the whole time ngl 😅 But they had a parents WhatsApp group with updates and photos every few hours. I could see him having the time of his life at the campfire. When he came back he wouldn\'t stop talking about it for a week. That says everything.',
  },
  {
    name: 'Mr. Rajesh Nair',
    role: 'Principal, Narayana School',
    stars: 4,
    text: 'Third year running with NOVA for our Class 8 trip. What I appreciate most is that they take feedback seriously — things we mentioned after year one were already fixed by year two. The food quality has improved a lot. Small thing but it matters when you have 150 kids.',
  },
  {
    name: 'Ananya Joshi',
    role: 'Student, Class 11, Pune',
    stars: 5,
    text: 'okay so i was not excited at all about this trip at first (Coorg again?? we went two years ago). but omg it was SO different. the trekking they organized was actually challenging and the night sky session was something else. genuinely one of my favorite memories from school. also the food at the camp was actually good lol',
  },
  {
    name: 'Mrs. Lata Bendre',
    role: 'Primary Teacher, Maharashtra Vidyalaya',
    stars: 5,
    text: 'Chhote bacchon ke saath travel karna bahut mushkil hota hai. Par NOVA ka team itna patient tha — ek bacche ko raat ko bukhar aaya toh unka coordinator khud hospital le gaya aur school ko bhi turant inform kiya. Aisi professional service expect nahi thi honestly. Bohot shukriya.',
  },
  {
    name: 'Arjun Kulkarni',
    role: 'Student, Class 9',
    stars: 5,
    text: 'best trip ever no cap. the rock climbing was insane and our guide let us try the harder route when we asked. initially thought it would be boring but it was 10/10. my parents asked why i came back so tired and i told them i climbed an actual cliff 😂',
  },
  {
    name: 'Ms. Shraddha Patil',
    role: 'Trip Coordinator, Abhinav Vidyalay',
    stars: 5,
    text: 'Planning a school trip alone is a nightmare — the permission slips, the buses, the allergies, the parent calls. NOVA took all of that off my plate. They sent a detailed checklist, followed up when we hadn\'t returned something, and even reminded parents 48 hrs before departure. It felt like having an extra team member.',
  },
  {
    name: 'Rohan Pawar',
    role: 'Student, Class 12',
    stars: 5,
    text: 'Ye mera last school trip tha so i wanted it to be good. Rajasthan trip was INCREDIBLE. Jaisalmer mein raat ko desert mein tha — no lights, just stars and folk music. Honestly cried a little not gonna lie. NOVA walo ka bahut dhanyawaad 🙏',
  },
  {
    name: 'Mrs. Varsha Gokhale',
    role: 'Science Teacher, BVB School',
    stars: 5,
    text: 'We specifically asked NOVA to connect the Bhandardara trip to our Class 7 science syllabus. They actually did it — the guide discussed ecosystems, water cycle, the whole thing in a way that didn\'t feel like a lecture. Half my class asked follow-up questions in class the week after. That never happens.',
  },
  {
    name: 'Zara Sheikh',
    role: 'Student, Class 10',
    stars: 5,
    text: 'Honestly I was scared before the trek bc I\'m not the most fit person 😅 but the guide slowed down for everyone and never made anyone feel bad. I made it to the top and it genuinely felt like an achievement. My mom didn\'t believe me till she saw the photo lol. Great trip overall ❤️',
  },
  {
    name: 'Mr. Dinesh Chavan',
    role: 'Headmaster, Zila Parishad School, Nashik',
    stars: 5,
    text: 'Hamare school ki budget limited hai. NOVA ne humari zaroorat samjhi aur ek package banaya jo bilkul affordable tha — bina quality ghataye. 60 bacche gaye, sab khush aayi. Koi problem nahi aayi. Yahi chahiye tha humko.',
  },
  {
    name: 'Ishaan Mehta',
    role: 'Student, Class 8',
    stars: 5,
    text: 'the camp food was actually fire??? like i expected bad food but they had biryani and it slapped. also the night trek was scary in the good way. would go again 100%',
  },
  {
    name: 'Mrs. Pooja Iyer',
    role: 'Teacher, Orchid International School',
    stars: 5,
    text: 'One of my students has severe nut allergy. I was stressed about the food situation. NOVA\'s team marked his meals separately, briefed the kitchen specifically, and the coordinator personally checked every single meal. That level of care for one child among 80 is what sets them apart.',
  },
  {
    name: 'Nikhil Desai',
    role: 'Parent, Pune',
    stars: 4,
    text: 'The trip was good overall, kids had a great time. My only small feedback was the pick up was 20 mins late. But to be fair they communicated on the group beforehand so we knew. Everything else was very professional. Would book again.',
  },
  {
    name: 'Mrs. Sudha Rao',
    role: 'Class Teacher, Vibgyor High',
    stars: 5,
    text: 'NOVA ne Ajanta Ellora trip organize ki — ek historian guide ke saath. Woh guide itna knowledgeable tha ki khud mujhe nayi cheezein pata chali 😄 Bacchon ne 2nd century BC ki cave paintings dekhi aur sach mein impressed hue. Books mein padh ke alag hota hai, wahan jaake alag hi feel hota hai.',
  },
  {
    name: 'Tanvi More',
    role: 'Student, Class 11',
    stars: 5,
    text: 'i cried when we left the camp on the last day. that\'s my review. 5 stars.',
  },
  {
    name: 'Mr. Sameer Kulkarni',
    role: 'VP Academics, EuroSchool Pune',
    stars: 5,
    text: 'We\'ve worked with multiple operators. The difference with NOVA is post-trip communication. They sent a photo album, a trip report, and even a student feedback summary within 3 days of return. It helps us justify the trip to management and plan better next year. Very professional approach.',
  },
  {
    name: 'Kavita Nandedkar',
    role: 'Parent & PTA Member, DPS',
    stars: 5,
    text: 'Pehle to mujhe bilkul yaqeen nahi tha ki 11 saal ka mera bachcha 2 din bahar rahega. Par jab trip se wapas aaya toh ek alag hi confidence tha usmein. Khud backpack set kiya, time pe ready tha — yeh sab chhote changes ek trip ne kiye. NOVA ko dil se shukriya.',
  },

  // ─── CORPORATE ──────────────────────────────────────────────────────
  {
    name: 'Ankit Mehta',
    role: 'HR Head, Infosys Pune',
    stars: 5,
    text: 'Our team had just come out of a brutal product launch. Morale was at rock bottom. The NOVA retreat at Pawna Lake was exactly the reset we needed — no screens, good food, campfire, some genuinely fun team activities. Three months later people are STILL referencing inside jokes from that trip. That\'s real ROI.',
  },
  {
    name: 'Sneha Joshi',
    role: 'Operations Manager, TCS Pune',
    stars: 5,
    text: 'We\'ve done corporate events before where you can tell the organizer just copy-pasted a generic itinerary. This felt nothing like that. NOVA asked us about our team dynamics, what we wanted to achieve, and actually designed around that. The facilitated session after the trek was surprisingly powerful.',
  },
  {
    name: 'Vikram Patil',
    role: 'CEO, StartupHub Pune',
    stars: 4,
    text: 'Good retreat, team loved it. Food was excellent. My only note — the river rafting briefing was a bit rushed but everyone was safe and fine. Overall great value for what we paid. Will probably do the wellness format next time instead of adventure.',
  },
  {
    name: 'Ravi Deshmukh',
    role: 'General Manager, HDFC Bank',
    stars: 5,
    text: 'Yaar sach batao toh mujhe corporate events se bada bore hota tha. But this one was different. The cooking competition they organized — I didn\'t know our CFO could make such good dal makhani 😂 Genuinely the best bonding activity I\'ve seen in 15 years of corporate life.',
  },
  {
    name: 'Pooja Verma',
    role: 'HR Manager, Wipro Pune',
    stars: 5,
    text: 'We had 80 people — junior to senior, from interns to VPs. Finding an activity everyone enjoys equally is nearly impossible. NOVA pulled it off with a mix of photography walk in the morning and bonfire team games at night. Not a single complaint. My phone didn\'t ring once that day. That never happens.',
  },
  {
    name: 'Tech Company Pune',
    role: '200-Person Annual Outing',
    stars: 5,
    text: 'Managing 200 engineers on a day out sounds like a nightmare and usually is. This time — genuinely smooth. The venue, the busses, the activities, the dinner. Everything ran like clockwork. Even the AV for the awards worked perfectly (rare!!). Our admin team hasn\'t stopped getting compliments.',
  },
  {
    name: 'Nisha Iyer',
    role: 'Travel Enthusiast, Infosys Bangalore',
    stars: 5,
    text: 'Joined the group Rajasthan tour and honestly was not sure what to expect with group travel. But the group size was small enough (16 people) that it felt personal. Guide was brilliant — not just historical facts but actual stories. Jaisalmer mein desert sunset dekhte time sab log chup ho gaye. Woh moment was priceless.',
  },
  {
    name: 'Rohan Industries',
    role: 'Annual Day Organizer',
    stars: 5,
    text: '3rd year in a row with NOVA for our annual day. My MD asked me how we keep pulling off such good events. Honestly the answer is just — NOVA 😄 They remember what worked last year, what didn\'t, and come with suggestions. The employee band performance segment they suggested this year was a huge hit.',
  },
  {
    name: 'Aishwarya Bhatt',
    role: 'Birthday Event, Pune',
    stars: 5,
    text: 'Okay not a corporate thing but my 30th birthday party — NOVA organized it and I was in tears (happy ones!). The decor was everything I showed them on Pinterest, the food was perfect, and the surprise element they planned with my husband was... I can\'t even describe it. My friends still talk about it.',
  },
  {
    name: 'Siddharth Rane',
    role: 'Senior Developer, Persistent Systems',
    stars: 5,
    text: 'Company sent us to Kolad for team bonding. I was the guy who would\'ve preferred to stay home tbh. But rafting on the Kundalika with your teammates?? Genuinely different energy. When your CTO is screaming with you on rapids there are no hierarchies lol. 10/10 recommend.',
  },
  {
    name: 'Mrs. Preethi Subramaniam',
    role: 'HR Business Partner, Cognizant',
    stars: 5,
    text: 'Itna kuch manage karna tha — 120 log, different food preferences, one colleague in wheelchair, two pregnant employees. NOVA ne sab handle kiya bina ek baar bhi complain kiye. Inclusive events organize karna genuinely mushkil hai. Inhe pata hai kaise karna hai.',
  },
  {
    name: 'Amit Sawant',
    role: 'Sales Director, Kirloskar',
    stars: 5,
    text: 'Post-appraisal team building mein yeh important hota hai ki log actually relax karein. NOVA ka Lonavala package exactly that tha. Waterfall trek in morning, good lunch, lazy afternoon, bonfire at night. Simple but perfectly executed. Team came back recharged and that reflected in Q2 numbers.',
  },
  {
    name: 'Kavita Reddy',
    role: 'L&D Manager, Bajaj Finance',
    stars: 5,
    text: 'The workshop facilitator they arranged was exceptional. Usually these sessions feel like mandatory corporate torture. This one had people genuinely engaged, laughing, having difficult conversations openly. I got feedback from 40+ employees saying it was the best L&D session they\'d attended. That\'s unheard of.',
  },
  {
    name: 'Friend Group Corporate Event',
    role: 'IT Company, Pune',
    stars: 5,
    text: 'We tried to plan this ourselves initially. Two weeks of WhatsApp fights about where to go, who pays what, who books what. Then we just handed everything to NOVA and it was sorted in 2 days. Why did we waste two weeks 😭 Goa trip was immaculate btw.',
  },
  {
    name: 'Neha Deshpande',
    role: 'Founder, D2C Startup Pune',
    stars: 5,
    text: 'Small team of 14, tight budget, but wanted something meaningful. NOVA designed a half-day CSR activity at a farm school near Pune followed by a team dinner. Cost way less than a resort day but created more connection than any expensive event I\'ve organized. Will repeat every quarter honestly.',
  },
  {
    name: 'Kiran Bhosale',
    role: 'Branch Manager, SBI',
    stars: 4,
    text: 'Government bank mein corporate trips ka culture nahi hota usually. Iss baar humne try kiya NOVA ke saath — 55 log, Mahabaleshwar ek din ke liye. Surprisingly everyone had a great time. Return timing was a bit stretched but overall experience bahut accha tha.',
  },
  {
    name: 'Swapnil Gore',
    role: 'Engineering Lead, Persistent',
    stars: 5,
    text: 'the photography walk around Kasba Peth was genuinely the most fun team activity I\'ve done. 14 devs, all introverts mostly, and within 30 minutes everyone was collaborating and laughing. Something about the creative brief made people open up. The photo exhibition at dinner was hilarious and touching at the same time.',
  },
  {
    name: 'Ms. Tanushri Kelkar',
    role: 'People Partner, Accenture',
    stars: 5,
    text: 'We specifically needed a women\'s leadership retreat — not spa and shopping, but something with actual substance. NOVA delivered. Expert facilitator, nature trek, honest reflection circles. Three of our women managers told me it was a turning point for how they see themselves professionally. That\'s not nothing.',
  },
  {
    name: 'Mahesh Suryavanshi',
    role: 'Plant Head, Thermax',
    stars: 5,
    text: 'Factory workers + office staff ek saath trip pe — yeh combination mushkil hota hai. Har cheez plan karni padti hai carefully. NOVA ne ek aisa itinerary banaya jisme dono groups ko kuch acha mila. Dhanyawaad for understanding what we actually needed rather than giving us a standard package.',
  },
  {
    name: 'Reshma Nambiar',
    role: 'COO, PropTech Startup',
    stars: 5,
    text: 'Literally called NOVA on a Thursday needing something for 30 people the following Saturday. I know that\'s terrible. They pulled it off — Pawna Lake camping, full catering, activities, everything. I still don\'t know how. Absolute legends. Now they\'re our go-to for everything.',
  },

  // ─── HONEYMOON ──────────────────────────────────────────────────────
  {
    name: 'Neha & Rohit',
    role: 'Newlyweds, Pune',
    stars: 5,
    text: 'Hamari honeymoon planning NOVA ne ki thi — Kerala. Ek mahine baad bhi hum us houseboat ki baat karte hain. Pani ke upar sona, subah uthke backwaters dekhna, chai peena silence mein. Rohit romantic nahi hai at all (his words 😂) but even he said it was magical. Thank you NOVA from both of us.',
  },
  {
    name: 'Arjun & Meera',
    role: 'Newlyweds, Mumbai',
    stars: 5,
    text: 'We were torn between Bali and Kerala. NOVA\'s coordinator spent almost an hour on call with us just understanding what we wanted from the trip — not trying to upsell. That itself made us trust them. Kerala was perfect. The spice plantation dinner they arranged on Day 3... we still talk about it.',
  },
  {
    name: 'Sameer & Divya',
    role: 'Couple, Pune',
    stars: 5,
    text: 'Mahabaleshwar trip — our first trip together after wedding. Divya was very specific about the hotel (no compromises on view 😄). NOVA found exactly what she wanted. Sunset from the balcony, strawberry picking in the morning, the whole thing was just... perfect. Simple but perfect.',
  },
  {
    name: 'Rishabh & Prachi',
    role: 'Honeymoon Couple, Nashik',
    stars: 5,
    text: 'Goa honeymoon with NOVA — they booked us in South Goa (our request) and the difference from North Goa is unreal. Private beach in the morning, candlelight dinner arranged at the resort, sunset boat ride. Prachi still says it was the best 5 days of her life. I\'m choosing to take that as a compliment 😄',
  },
  {
    name: 'Kavya & Nikhil',
    role: 'Newlyweds, Hyderabad',
    stars: 5,
    text: 'We wanted something offbeat — not the usual Goa/Kerala. NOVA suggested Coorg and we were skeptical. Best decision ever. Woke up every morning to fog and coffee smell. The estate owner made us feel like family. Zero other tourists around. It felt like our own private world for 4 days.',
  },
  {
    name: 'Tanvir & Sana',
    role: 'Couple, Pune',
    stars: 5,
    text: 'Kashmir honeymoon in October — best month to go. NOVA arranged a traditional houseboat on Dal Lake (actual wooden houseboat, not a hotel boat). Shikara ride at 6am when the lake was misty and still. Tulips were gone but the chinar trees were red and orange. Honestly more beautiful than tulip season in the photos.',
  },
  {
    name: 'Gautam & Shruti',
    role: 'Couple, Bengaluru',
    stars: 5,
    text: 'Budget thi limited humari. NOVA ne clearly bata diya kya possible hai aur kya nahi — no false promises. Pondicherry suggest kiya unhone. Kabhi consider nahi kiya tha but WOW. The French Quarter, the beaches, the food — it was incredibly romantic without being expensive. Bahut shukriya for the honest advice.',
  },
  {
    name: 'Aditya & Rhea',
    role: 'Newlyweds, Pune',
    stars: 5,
    text: 'Just back from our Andaman honeymoon. Radhanagar Beach. I have no words. The water is this impossible shade of blue that you think only exists in screensavers. NOVA sorted everything — flights, ferry between islands, resorts. We literally just showed up and enjoyed. Zero stress. That\'s what you want on your honeymoon.',
  },
  {
    name: 'Mukund & Ishita',
    role: 'Couple, Pune',
    stars: 5,
    text: 'My husband is a planner and I\'m more spontaneous — organizing our honeymoon together would have been a disaster 😂 We basically told NOVA our personality types and said surprise us within a budget. What they planned for Udaipur was honestly more thoughtful than what either of us would have come up with.',
  },
  {
    name: 'Rohan & Pallavi',
    role: 'Honeymoon, Kolhapur',
    stars: 5,
    text: 'Pallavi had a specific dream — sunset on the lake in Udaipur with the palace in the background. NOVA made it happen exactly like she\'d imagined. Private boat, right time, right spot. Jo unke aankhon mein khushi thi tab... woh mujhe hamesha yaad rahega. Thank you NOVA for that moment.',
  },
  {
    name: 'Karthik & Meenakshi',
    role: 'Newlyweds, Chennai',
    stars: 5,
    text: 'We wanted international but were nervous about planning our first trip abroad. NOVA held our hand through the whole thing — Schengen visa documents, what to pack, which neighborhoods, even suggested we skip a museum that was "not worth it." That kind of honest advice is rare.',
  },
  {
    name: 'Varun & Deepika',
    role: 'Couple, Pune',
    stars: 4,
    text: 'Sri Lanka honeymoon — 9 days and genuinely the best holiday of our lives. Small issue with one hotel booking being wrong room type but NOVA sorted it within 2 hours. The way they handled it actually made us more confident in them. Kandy to Ella train journey alone was worth the whole trip.',
  },
  {
    name: 'Abhishek & Swati',
    role: 'Newlyweds, Nagpur',
    stars: 5,
    text: 'Maldives mein overwater bungalow — ek sapna tha. NOVA ne afford karne laayak package banaya. Unhone mid-range resort suggest kiya jo actually better tha kuch expensive ones se. Pehli subah jab maine bungalow se seedha ocean mein kadam rakha — Swati abhi bhi woh moment ka photo wallpaper pe lagaye hue hai ❤️',
  },
  {
    name: 'Jay & Priya',
    role: 'Honeymoon Couple, Mumbai',
    stars: 5,
    text: 'Bali was our dream but we didn\'t know where to start with planning — visa, which area, which villa, what to skip. NOVA basically made a custom guide for us. Ubud for 3 days then Seminyak. They booked a private pool villa that was incredible. The Kecak sunset dance at Uluwatu was arranged perfectly — front row seats somehow!',
  },
  {
    name: 'Aniket & Radhika',
    role: 'Couple, Pune',
    stars: 5,
    text: 'We specifically asked for no touristy things on our honeymoon. NOVA designed a 7-day Coorg + Chikmagalur circuit with just plantation stays, forest walks, and local meals. Met zero other tourists for 5 days. Radhika said it felt like a private country 😄 Exactly what we wanted and more.',
  },
  {
    name: 'Yash & Snehal',
    role: 'Newlyweds, Aurangabad',
    stars: 5,
    text: 'First time flying for both of us. We were nervous about everything. NOVA\'s coordinator called us 3 days before to walk through check-in, what to carry in hand baggage, all of it. At the airport Snehal was calm because we knew exactly what to do. That extra care for first-timers — bohot appreciated.',
  },
  {
    name: 'Saurabh & Trupti',
    role: 'Couple, Pune',
    stars: 5,
    text: 'Northeast India honeymoon — Meghalaya and Assam. Unconventional choice but NOVA confidently backed it. Living root bridges, rhino safari in Kaziranga, tea estate stay. Not a single Instagram cliché moment but so many real, quiet, magical ones. Trupti says it\'s the best decision we made. I agree completely.',
  },
  {
    name: 'Neeraj & Anjali',
    role: 'Couple, Solapur',
    stars: 5,
    text: 'budget mein tha humara honeymoon aur NOVA ne kabhi aisa feel nahi karaya. Pondicherry suggest kiya unhone — 4 nights, boutique hotel, seafront dinner, Auroville visit. Return mein sirf do suitcase bhar ke memories laaye. Perfect honeymoon nahi hota — yeh tha.',
  },
  {
    name: 'Dhruv & Anisha',
    role: 'Newlyweds, Pune',
    stars: 5,
    text: 'We had a late wedding (November 30th) and wanted to book for December. Most operators said everything was full. NOVA somehow got us a beautiful property in Goa for the dates we wanted. Don\'t know how. Didn\'t ask. Just grateful. The trip was perfect from start to finish.',
  },
  {
    name: 'Chirag & Pooja',
    role: 'Honeymoon, Pune',
    stars: 5,
    text: 'Kashmir mein itni thand thi ki hum teen blanket mein the 😂 but the houseboat wala heater was perfect and we honestly didn\'t want to go outside. Dal lake at 7am from the boat window — chai in hand, mountains behind — that image is etched permanently. NOVA coordinator was available on WhatsApp through the whole trip too which felt reassuring.',
  },

  // ─── ADVENTURE ──────────────────────────────────────────────────────
  {
    name: 'Siddharth Rane',
    role: 'IT Professional, Pune',
    stars: 5,
    text: 'Harishchandragad se wapas aaya toh mujhe seriously lag raha tha main superhero hoon 😂 NOVA ke guide Vijay ne us Konkan Kada pe khade hokar jo kuch bataya — 1000 feet neeche khadi dekh ke — woh moment describe nahi ho sakta. Already next trek ka plan bana liya hai unke saath.',
  },
  {
    name: 'Kavya Menon',
    role: 'First-time Trekker, Bangalore',
    stars: 5,
    text: 'I had literally never trekked in my life. My friends dragged me. I complained the ENTIRE way up. But when we reached the summit and I saw the view — completely silent. Forgot every complaint. The guide was so patient with me and never once made me feel like the slowest person (I was). Planning my second trek already.',
  },
  {
    name: 'Ganesh Marathe',
    role: 'Adventure Enthusiast, Pune',
    stars: 5,
    text: '4th trek with NOVA. Kalsubai this time — night trek starting 2am. Reached summit just as sun was coming up. The whole valley slowly turning orange below us. 23 people there and everyone just went quiet. That silence shared with strangers who are now friends — that\'s what trekking with NOVA feels like.',
  },
  {
    name: 'Preethi Krishnan',
    role: 'Software Engineer, Pune',
    stars: 5,
    text: 'Solo trekker joining group trip — can be awkward. NOVA\'s groups have this natural mix of people and the guide creates an atmosphere where conversations just happen. Rajmachi overnight — ended up talking to a 55-year-old retired school teacher about life at 2am around a campfire. Unexpected and wonderful.',
  },
  {
    name: 'Omkar Desai',
    role: 'College Student, Pune',
    stars: 5,
    text: 'Friends group of 6 — Sinhagad night trek. We thought we\'d be bored (it\'s "easy" right?). NOVA guide took us off the main path to a viewpoint nobody knows. Khadakwasla dam at 4am in moonlight looked unreal. Pithla bhakri at top at sunrise. Rs. 800 best spent this year easily.',
  },
  {
    name: 'Radhika Joshi',
    role: 'Marketing Manager, Pune',
    stars: 5,
    text: 'Rajmachi monsoon trek — soaking wet, mud everywhere, exhausted. Best day of the year. NOVA\'s guide kept the energy up the whole time, knew exactly when to push and when to slow down. The village homestay at night with simple dal chawal after a 6-hour trek... I\'ve eaten at fancy restaurants that don\'t come close.',
  },
  {
    name: 'Tejas Kulkarni',
    role: 'Trekking Enthusiast',
    stars: 5,
    text: 'Yaar main toh expert samajhta tha khud ko. NOVA ke guide ne mujhe ek move bataya for descending rocks that I\'d been doing wrong for 3 years. Humility moment 😅 But that\'s what good guides do — they know more than you and teach without making you feel dumb. Highly recommend even for experienced trekkers.',
  },
  {
    name: 'Ashwini Patil',
    role: 'Doctor, Pune',
    stars: 5,
    text: 'Post call se seedha trek pe gayi thi (24 hour shift). Thought I\'d die halfway. But something about being in nature after being in a hospital — the reset is real. NOVA\'s team noticed I was lagging and quietly adjusted pace without announcing it to the group. Small gesture, big impact.',
  },
  {
    name: 'Vishal Kale',
    role: 'Adventure Seeker, Satara',
    stars: 4,
    text: 'Bhandardara camping trip — weather turned on night 2 and it rained heavily. Wasn\'t ideal. But NOVA\'s team had contingency arrangements and shifted everyone to a covered area quickly. They\'d clearly dealt with this before. No panic, smooth handling. Small situations like this show you who you\'re dealing with.',
  },
  {
    name: 'Group of 12, Friends',
    role: 'Annual Trek Group, Pune',
    stars: 5,
    text: 'We have a friend group that does one trek a year together. Been doing it for 7 years. Started using NOVA 3 years ago and we will never go back to self-organized. The difference in experience quality is massive — knowledgeable guide, good safety protocols, and honestly they\'ve introduced us to routes we\'d never have found ourselves.',
  },
  {
    name: 'Megha Shaikh',
    role: 'Teacher, Pune',
    stars: 5,
    text: 'Main pehle bahut hesitant thi. Heights se darr lagta hai mujhe. NOVA ka guide pehle group mein bata diya — "jo log nervous hain unhe mujhe batao, main saath rahaunga." Usne wada nibhaya. Har step pe guide kiya. Mujhe pata nahi tha main itna kar sakti hoon. Yeh trip meri zindagi mein milestone ban gaya sach mein.',
  },
  {
    name: 'Corporate Trek Group',
    role: 'Deloitte Pune, 25 People',
    stars: 5,
    text: 'CFO ne company trek ke liye mujhe budget tha diya tha aur deadline. Called NOVA on Monday, trekked on Saturday with 25 colleagues. That turnaround speed alone earned them the next booking. The trek itself was excellent — mix of fitness levels handled well, nobody left behind or bored.',
  },
  {
    name: 'Aarav Joshi',
    role: 'Architecture Student, Pune',
    stars: 5,
    text: 'Lohagad fort in monsoon season with NOVA — looked like something from a fantasy movie. Green everywhere, mist, ancient stone walls, the valley below completely white with clouds. As an architecture student I\'d read about Hemadpanthi style — seeing it in person at that scale hit differently. Thank you for making that accessible.',
  },
  {
    name: 'Mr. & Mrs. Phadke',
    role: 'Couple, Pune, Age 54 & 52',
    stars: 5,
    text: 'At our age, our children thought we were being silly for wanting to trek. NOVA assessed our fitness properly and suggested the right level — Lohagad. We made it to the top and our children could not believe the photo we sent from the summit 😄 Proved them wrong. NOVA gave us that.',
  },
  {
    name: 'Rohit Shinde',
    role: 'Freelancer, Pune',
    stars: 5,
    text: 'Went solo on a NOVA group trek not knowing anyone. By lunchtime on Day 1 had three new friends. By campfire on night 1 the whole group felt like we\'d known each other for years. There\'s something specific about physical challenge and shared discomfort that builds friendship faster than anything else. Good memories.',
  },
  {
    name: 'Natasha D\'Souza',
    role: 'UX Designer, Pune',
    stars: 5,
    text: 'NOVA ke saath Igatpuri trek kiya — Kalsubai. Guide ne ek point pe humein rok ke kahia "abhi aankh band karo, sirf hawa ko feel karo aur birds ko suno." Sab log mazaak samajh ke hanse first. Phir sabne kiya. 2 minute silence mein tha woh moment — aaj bhi yaad aata hai. Simple things done right.',
  },
  {
    name: 'Harsh Agarwal',
    role: 'MBA Student, SIBM',
    stars: 5,
    text: 'Did the Rajgad night trek for my birthday. 12am start, summit at 5:30am, birthday cake that the guide somehow secretly carried all the way up. I literally had no idea. My friends had coordinated with NOVA. I cried in front of 15 strangers and I\'m not even embarrassed about it 😭❤️ Best birthday.',
  },
  {
    name: 'Swati & Family',
    role: 'Family of 5, Nashik',
    stars: 5,
    text: 'Goa family trip — sabse best part tha ki NOVA ne kids ke liye alag activities organize ki thi aur parents ke liye alag. So my husband and I actually got couple time while kids were supervised and having their own adventure. That balance is so hard to find and they nailed it.',
  },
  {
    name: 'Friend Group of 8',
    role: 'College Reunion Trip, Goa',
    stars: 5,
    text: 'We\'ve been promising this Goa trip since 2019. Finally happened. NOVA sorted everything so we just showed up. Water sports, the beach shack we wanted, the flea market — all organized. 8 schedules, 8 opinions, zero arguments because there was nothing to argue about. Magic.',
  },
  {
    name: 'Rahul & Priya',
    role: 'Couple, Pune',
    stars: 5,
    text: 'First trip together and Priya is a planner and I\'m... not. NOVA was the perfect compromise — Priya got a detailed itinerary, I got to just show up. Sunset at Chapora Fort was the moment. Priya ka birthday surprise bhi unhone arrange kiya — strawberry cake at the viewpoint. Cheezy but perfect 🎂',
  },

  // ─── FAMILY ─────────────────────────────────────────────────────────
  {
    name: 'Swati & Family',
    role: 'Family of 6, Nashik',
    stars: 5,
    text: 'Planned our family Goa trip through NOVA — parents, us, two kids (8 and 12). What I appreciated was how they designed the itinerary so everyone got something. Kids got water sports, parents got the quiet beach morning, we got the evening out. Not once did someone feel left out. That\'s really hard to do.',
  },
  {
    name: 'Ramesh Agarwal',
    role: 'Father of 3, Pune',
    stars: 5,
    text: 'Teen bachche, do budhe parents, wife, main — 8 log, 8 opinions. I thought planning this trip would destroy me. NOVA coordinator was incredibly patient on calls and just... figured it out. Kerala trip was maybe the first trip in 20 years where I wasn\'t stressed the whole time.',
  },
  {
    name: 'Sunanda Kulkarni',
    role: 'Homemaker, Pune',
    stars: 5,
    text: 'Meri saas ko Hindi nahi aati, mere pati ko planning nahi aati, bachche ko alag food chahiye always 😂 NOVA ne sab handle kiya bina ek baar bhi attitude ke. Rajasthan mein humari saas ki aankh mein aansu the jab unhone Taj Mahal dekha — pehli baar. 73 saal ki age mein. Woh moment ki value koi paise se nahi naap sakta.',
  },
  {
    name: 'Vijay & Shalini Bhatt',
    role: 'Parents, Pune',
    stars: 5,
    text: 'We travel with elderly parents (both 70+). Most tour operators pay lip service to accessibility. NOVA actually checked every hotel, every activity, every restaurant for wheelchair accessibility before booking. My father-in-law, who hasn\'t traveled in 6 years due to mobility issues, had the time of his life in Mahabaleshwar.',
  },
  {
    name: 'The Khatri Family',
    role: 'Joint Family, Pune, 14 People',
    stars: 5,
    text: '14 log ek saath travel karna — mujhe toh bolte waqt bhi darr lagta hai 😂 But NOVA ne sab manage kiya. Bus timing, rooms allocation, meals, sightseeing. Every single person came back happy. My most skeptical chacha — jo kehta tha "yeh sab waste hai" — woh bhi bol raha tha next year ka plan karte hain.',
  },
  {
    name: 'Meenakshi Iyer',
    role: 'Mother, Chennai',
    stars: 5,
    text: 'My 9 year old had one wish — to see snow. NOVA designed a Manali trip around that. The moment he saw snow on Rohtang and his face just... completely lit up. He grabbed a snowball and threw it at me immediately 😄 Worth every rupee. Worth everything.',
  },
  {
    name: 'Suhas Patil',
    role: 'Father, Sangli',
    stars: 5,
    text: 'We\'re a middle class family — every rupee counts. NOVA quoted us fairly, explained every item in the bill, and when we said we couldn\'t stretch the budget they found ways to adjust without cutting the important parts. That kind of honesty is rare. Trip to Goa was everything my kids had wanted.',
  },
  {
    name: 'Anupama Joshi',
    role: 'Mother of Two, Pune',
    stars: 4,
    text: 'Kerala housboat with kids (5 and 9). The younger one was a handful on the boat — obviously. The houseboat crew was incredibly patient with him. My husband and I got to actually watch sunsets together for the first time in years while the crew engaged the kids. Small thing, big deal for us.',
  },
  {
    name: 'Dilip & Rekha Sharma',
    role: 'Retired Couple, Pune',
    stars: 5,
    text: 'Retirement travel — humne socha tha ki age ke saath yeh sab mushkil ho jaayega. NOVA ne prove kiya ki yeh soch galat thi. Uttarakhand trip humari best holiday thi — Rishikesh, Mussoorie, Haridwar. Rekha ka pehla Ganga Aarti experience tha. Dono ke aankh bhar aayi. Yeh memories hamesha rahenge.',
  },
  {
    name: 'Prerna & Sanjay',
    role: 'Parents, Nagpur',
    stars: 5,
    text: 'Took our 16 year old to Rajasthan — she was on her phone the first day. By day 2 at Jaisalmer fort the phone was in the bag. By day 3 she was asking the guide questions. By day 4 she was leading us to spots she\'d read about. The trip changed something in her. Still don\'t fully understand how.',
  },

  // ─── EVENTS ─────────────────────────────────────────────────────────
  {
    name: 'Aishwarya Bhatt',
    role: 'Birthday Event, Pune',
    stars: 5,
    text: 'I turned 30 and wanted it to be memorable, not just another restaurant booking. NOVA designed this whole evening at a villa property in Mulshi — fairy lights, the food I specifically asked for, live acoustic music, surprise element at midnight. My friends have been to a LOT of events. They said this was the best one.',
  },
  {
    name: 'Rohan Industries',
    role: 'Annual Day, 300 Employees',
    stars: 5,
    text: '300 employees, 3 consecutive years with NOVA. What\'s interesting is that each year they\'ve suggested something different. Year 1 was awards heavy. Year 2 they introduced employee band performance. Year 3 family invites. Each year built on the last. They remember things and evolve. That\'s a real partner not just a vendor.',
  },
  {
    name: 'Mrs. Alka Mehta',
    role: 'Wedding Anniversary Event, Pune',
    stars: 5,
    text: '25th anniversary — silver jubilee. My husband said "let\'s just go out for dinner." I called NOVA. They organized a private evening at a heritage property, the same flowers we had at our wedding, a musician playing our song when we arrived. My husband was speechless. He has not been speechless in 25 years 😂 Thank you endlessly.',
  },
  {
    name: 'Nikhil Kadam',
    role: 'Birthday Organizer, Pune',
    stars: 5,
    text: 'Surprise 40th birthday for my wife. She had NO idea. NOVA coordinated everything while I pretended we were going for a "team dinner." The look on her face when she walked in and saw 40 of her friends in a decorated venue... I owe NOVA for giving me that moment.',
  },
  {
    name: 'Priyanka Joshi',
    role: 'Baby Shower Organizer, Pune',
    stars: 5,
    text: 'Ye typical events mein nahi aata shayad but NOVA helped me organize didi ki baby shower and it was stunning. Theme execution was perfect, food was exactly what we specified, photos look like a magazine. Family se itni compliments aayi ki ab main hi family event planner ban gayi default 😄',
  },
  {
    name: 'Mr. Prashant Wagh',
    role: 'Conference Organizer, CII Pune',
    stars: 5,
    text: 'We needed a 2-day industry conference for 150 delegates — venue, AV, meals, accommodation, ground transport. I\'ve organized events for 20 years. NOVA\'s event team was the most well-prepared I\'ve worked with. They anticipated problems I didn\'t think of. Zero surprises on the day. Zero. In event management that\'s near impossible.',
  },
  {
    name: 'Revati Kulkarni',
    role: 'Farewell Event Organizer, Pune',
    stars: 5,
    text: 'Organized farewell for a colleague who was moving to Australia — 40 years in Pune, huge amount of love to celebrate. NOVA helped me do a proper Pune-themed evening. Misal pav as starter, Marathi songs, photo wall of her years here. She cried the good kind of tears. That\'s the only review that matters.',
  },
  {
    name: 'Tech Company Pune',
    role: 'Product Launch Event, 100 People',
    stars: 5,
    text: 'Product launch event — high stakes, investors and clients in the room. NOVA organized the venue, catering, photo booth, and the evening program. Genuinely could not have been smoother. Our CEO said the event "felt premium." In startup world that sentence does a lot of work. Highly recommend for corporate events.',
  },
  {
    name: 'Asha Bhonsale',
    role: 'Family Reunion Organizer, 55 People',
    stars: 5,
    text: '55 log, 4 generations, full family reunion after COVID years gap. Main toh nervous thi itni. But NOVA ne sab sambhala — Lonavala resort block booking, customized menu with everyone\'s preferences, group activities that even the 70 year old daadajis could enjoy. Reunion chill ho gayi because I wasn\'t managing anything. Best feeling.',
  },
  {
    name: 'Gaurav Soni',
    role: 'Proposal Event, Pune',
    stars: 5,
    text: 'I asked NOVA to help me plan my proposal. They found a rooftop in Pune with a specific view, arranged for a photographer to be hidden nearby, coordinated with the restaurant to have the ring delivered at the right moment. She said yes before I even finished the sentence. The photos are incredible. I owe them more than I can say.',
  },
]

const STATS = [
  { value: '5,000+', label: 'Happy Travelers' },
  { value: '500+',   label: 'Events Managed' },
  { value: '4.9/5',  label: 'Average Rating' },
  { value: '120+',   label: 'Partner Schools' },
]

const CATEGORIES = ['All', 'School Trips', 'Corporate', 'Honeymoon', 'Adventure', 'Family', 'Events']

function getCategory(text: string, role: string): string {
  const r = role.toLowerCase()
  const t = text.toLowerCase()
  if (r.includes('school') || r.includes('principal') || r.includes('teacher') || r.includes('student') || r.includes('college') || r.includes('class ') || r.includes('headmaster') || r.includes('parent') || r.includes('pta') || r.includes('academics') || r.includes('vibgyor') || r.includes('dps') || r.includes('vidyalay') || r.includes('international school') || r.includes('high school'))
    return 'School Trips'
  if (r.includes('honeymoon') || r.includes('newlywed') || (r.includes('couple') && !r.includes('family')))
    return 'Honeymoon'
  if (r.includes('trek') || r.includes('adventure') || r.includes('trekker') || r.includes('architecture student') || r.includes('mba student') || r.includes('college student') || r.includes('first-time trek') || r.includes('deloitte') || (r.includes('group') && (t.includes('trek') || t.includes('rajmachi') || t.includes('kalsubai') || t.includes('trek'))))
    return 'Adventure'
  if (r.includes('family') || r.includes('mother') || r.includes('father') || r.includes('parents') || r.includes('homemaker') || r.includes('retired') || r.includes('joint family') || r.includes('the khatri'))
    return 'Family'
  if (r.includes('birthday') || r.includes('anniversary') || r.includes('baby shower') || r.includes('farewell') || r.includes('conference') || r.includes('product launch') || r.includes('reunion') || r.includes('proposal') || r.includes('annual day') || r.includes('cii'))
    return 'Events'
  if (r.includes('hr') || r.includes('manager') || r.includes('ceo') || r.includes('company') || r.includes('outing') || r.includes('bank') || r.includes('tech') || r.includes('infosys') || r.includes('tcs') || r.includes('wipro') || r.includes('director') || r.includes('head') || r.includes('partner') || r.includes('cognizant') || r.includes('startup') || r.includes('sales') || r.includes('plant') || r.includes('coo') || r.includes('founder') || r.includes('branch') || r.includes('engineering lead') || r.includes('people partner') || r.includes('l&d') || r.includes('bajaj') || r.includes('deloitte') || r.includes('accenture') || r.includes('persistent') || r.includes('kirloskar'))
    return 'Corporate'
  return 'All'
}

const starColors = ['text-[#F4A623]', 'text-[#F4A623]', 'text-[#F4A623]', 'text-[#F4A623]', 'text-[#F4A623]']

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => getCategory(t.text, t.role) === activeCategory)

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section
        className="relative py-20 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A4C8A 0%, #00B4D8 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">What People Say</p>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Testimonials
          </h1>
          <p className="text-blue-100 text-lg">Real words from real people — unfiltered</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                {s.value}
              </div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap justify-center px-6 py-5 sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        {CATEGORIES.map(cat => {
          const count = cat === 'All'
            ? TESTIMONIALS.length
            : TESTIMONIALS.filter(t => getCategory(t.text, t.role) === cat).length
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#0A4C8A]'
              }`}
              style={activeCategory === cat ? { background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' } : {}}
            >
              {cat} <span className="opacity-70 text-xs">({count})</span>
            </button>
          )
        })}
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
              <motion.div
                key={t.name + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.6) }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all relative flex flex-col"
              >
                <Quote
                  size={32}
                  className="absolute top-5 right-5 opacity-[0.04]"
                  style={{ color: '#0A4C8A' }}
                />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#F4A623] text-[#F4A623]" />
                  ))}
                  {[...Array(5 - t.stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-gray-200 fill-gray-200" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}
                  >
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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-400">No reviews in this category yet. More coming soon!</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-6">Ready to create your own story with NOVA?</p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0A4C8A, #00B4D8)' }}
          >
            Plan My Trip →
          </Link>
        </div>
      </section>
    </div>
  )
}