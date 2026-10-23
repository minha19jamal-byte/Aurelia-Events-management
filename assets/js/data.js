/* =====================================================================
   SITE CONTENT — services, portfolio, gallery, testimonials, team,
   blog posts and FAQs. Edit text here; pages update automatically.
   Images use Unsplash placeholders — swap the IDs/URLs for your own
   event photos (put files in /assets/img and use "assets/img/x.jpg").
   ===================================================================== */
(function () {
  const U = (id, w = 1200) =>
    id.startsWith("assets/") || id.startsWith("http")
      ? id
      : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const IMG = {
    bride: "1519741497674-611481863552",
    tableDecor: "1511795409834-ef04bbd61622",
    confettiConcert: "1492684223066-81342ee5ff30",
    conferenceCrowd: "1540575467063-178a50c2df87",
    confettiParty: "1505236858219-8359eb29e329",
    whiteBanquet: "1464366400600-7168b8af9bc3",
    conferenceHall: "1511578314322-379afb476865",
    teamMeeting: "1515187029135-18ee286d815b",
    balloons: "1530103862676-de8c9debad1d",
    weddingAisle: "1469371670807-013ccf25f16a",
    stageLights: "1470229722913-7c0e2dbbafd3",
    concertPhones: "1501281668745-f7f57925c3b4",
    expoHall: "1523580494863-6f3031224c94",
    microphone: "1475721027785-f74eccf877e2",
    auditorium: "1587825140708-dfaf72ae4b04",
    seminarHall: "1531058020387-3be344556be6",
    goldBalloons: "1556125574-d7f27ec36a06",
    ballroom: "1519167758481-83f550bb49b3",
    rings: "1465495976277-4387d4b0b4c6",
    lawnChairs: "1522673607200-164d1b6ce486",
    weddingConfetti: "1583939003579-730e3918a45a",
    coupleWalk: "1606216794074-735e91aa2c92",
    coupleHills: "1604017011826-d3b4c23f8914",
    concertConfetti: "1533174072545-7a4b6ad7a6c3",
    concertColor: "1514525253161-7a46d19cd819",
    concertStage: "1459749411175-04bf5292ceea",
    groupDinner: "1528605248644-14dd04022da1",
    fairyLights: "1510076857177-7470076d4098",
    toast: "1527529482837-4698179dc6ce",
    panel: "1561489396-888724a1543d",
    workshop: "1591115765373-5207764f72e7",
    seminarAudience: "1559223607-a43c990c692c",
    dj: "1496337589254-7e19d01cec44",
    buffet: "1555244162-803834f70033",
    p1: "1507003211169-0a1dd7228f2d",
    p2: "1494790108377-be9c29b29330",
    p3: "1500648767791-00dcc994a43e",
    p4: "1438761681033-6461ffad8d80",
    p5: "1472099645785-5658abf4ff4e",
    p6: "1544005313-94ddf0286df2",
    crowdParty: "1517457373958-b7bdd4587205",
    concertWarm: "1549451371-64aa98a6f660",
    stageRig: "1563841930606-67e2bce48b78",
    ringHands: "1545232979-8bf68ee9b1af",
    concertHearts: "1429962714451-bb934ecdc4ec",
    beachBride: "1520854221256-17451cc331bf",
    floralCandles: "1537633552985-df8429e8048b",
    clubLights: "1525772764200-be829a350797",
    highFive: "1566737236500-c8ac43014a67",
    launchScreen: "1505373877841-8d25f7d46678",
    receptionTables: "1524824267900-2fa9cbf7a506",
    indianHands: "1597157639073-69284dc0fdaf",
    coupleFlowers: "1621621667797-e06afc217fb0",
    longTable: "1519225421980-715cb0215aed",
    friendsParty: "1532635241-17e820acc59f",
    confetti: "1513151233558-d860c5398176",
    concertCrowd: "1531538606174-0f90ff5dce83",
    barLights: "1524368535928-5b5e00ddc76b",
  };

  const img = (key, w) => U(IMG[key] || key, w);

  /* ---------------- SERVICE CATEGORIES ---------------- */
  const categories = [
    { id: "weddings", name: "Weddings", blurb: "From mehendi to reception — every ritual, beautifully handled." },
    { id: "corporate", name: "Corporate", blurb: "Conferences, launches and galas that move your brand forward." },
    { id: "social", name: "Social & Private", blurb: "Birthdays, anniversaries and intimate celebrations." },
    { id: "production", name: "Production & Entertainment", blurb: "Concerts, artists, AV, décor and hospitality." },
  ];

  /* ---------------- SERVICES ---------------- */
  const services = [
    {
      id: "wedding-planning", cat: "weddings", icon: "rings", title: "Wedding Planning",
      img: "weddingAisle", price: 1500000,
      short: "End-to-end planning for the big day — venue, décor, vendors, guests and flawless execution.",
      desc: "Your wedding should feel like you, not like a template. Our wedding team handles everything from budgeting and venue scouting to décor design, vendor management, guest hospitality and on-day coordination, so your family can actually enjoy the celebration.",
      features: ["Venue scouting & negotiation", "Theme, décor & floral design", "Vendor sourcing & management", "Guest hospitality & RSVP desk", "Bridal entry & choreography", "Day-of coordination team"],
    },
    { 
      id: "destination-weddings", cat: "weddings", icon: "plane", title: "Destination Weddings",
      img: "beachBride", price: 3500000,
      short: "Chattogram palaces, cox bazer beaches, sundarban forests or abroad — we take the whole family there.",
      desc: "We plan destination weddings across Rajshahi, cox bazer, the hills and international locations like Bali, Thailand and Dubai. Travel, room blocks, welcome hampers, local permits and multi-day itineraries are all handled by one dedicated team.",
      features: ["Destination & resort selection", "Flights, transfers & room blocking", "Welcome kits & hospitality desk", "Local permits & vendor sourcing", "Multi-day itinerary planning", "Guest concierge on WhatsApp"],
    },
    {
      id: "pre-wedding-ceremonies", cat: "weddings", icon: "flower", title: "Mehndi, Haldi & Sangeet",
      img: "indianHands", price: 400000,
      short: "Colourful, high-energy pre-wedding functions with themed décor, music and performances.",
      desc: "Each pre-wedding function gets its own personality — a marigold-and-mirror haldi, a boho mehndi lounge, a Bollywood-style sangeet with professional choreography, LED stage and live band. We design them as one story across days.",
      features: ["Themed décor per function", "Sangeet choreography", "Mehndi artists & live counters", "Dhol, live band & DJ", "Photo booths & props", "Games & family activities"],
    },
    {
      id: "engagement", cat: "weddings", icon: "heart", title: "Engagement & Ring Ceremony",
      img: "ringHands", price: 300000,
      short: "Elegant roka, sagai and ring ceremonies — intimate or grand.",
      desc: "From a 50-guest roka at home to a 500-guest ring ceremony at a five-star hotel, we design engagement celebrations with signature entries, ring-exchange moments and personalised décor.",
      features: ["Ring-exchange stage design", "Couple entry concepts", "Floral & lighting design", "Catering & bar management", "Photography & reels", "Return gifts & hampers"],
    },
    {
      id: "conferences", cat: "corporate", icon: "mic", title: "Conferences & Seminars",
      img: "auditorium", price: 800000,
      short: "Professionally run conferences, summits and seminars — registration to Q&A.",
      desc: "We act as your Professional Conference Organiser (PCO): speaker management, delegate registration, stage and AV, breakout rooms, live streaming and post-event reporting — run to the minute.",
      features: ["Delegate registration & badging", "Speaker & agenda management", "Stage, LED & AV production", "Hybrid & live-stream setups", "Breakout & networking zones", "Post-event analytics report"],
    },
    {
      id: "product-launches", cat: "corporate", icon: "rocket", title: "Product Launches",
      img: "launchScreen", price: 1000000,
      short: "Launch moments built for media, dealers and social feeds.",
      desc: "Reveal mechanisms, kinetic stages, press zones and influencer experiences — we design launches that create headlines and content, with tight brand control from invite to after-party.",
      features: ["Reveal concept & show design", "Press & influencer management", "Experiential brand zones", "Celebrity & anchor booking", "Content capture for socials", "Dealer & media logistics"],
    },
    {
      id: "exhibitions", cat: "corporate", icon: "grid", title: "Exhibitions & Trade Shows",
      img: "expoHall", price: 600000,
      short: "Stall design, fabrication and full exhibition management.",
      desc: "Whether you need a single custom stall at Pragati Maidan / Bharat Mandapam or want to organise an entire expo, our in-house design and fabrication team delivers on time and on brand.",
      features: ["3D stall design & fabrication", "Floor plans & exhibitor management", "Visitor registration systems", "Branding & signage", "Lead capture tech", "Installation & dismantling"],
    },
    {
      id: "award-nights", cat: "corporate", icon: "award", title: "Award Nights & Galas",
      img: "microphone", price: 900000,
      short: "Red carpets, trophies and show-flow worthy of the achievements.",
      desc: "Script, show-flow, trophies, nomination management, celebrity anchors and gala dinners — we build award nights that make winners feel celebrated and audiences stay till the last category.",
      features: ["Show script & run-of-show", "Trophy & citation design", "Red carpet & photo walls", "Celebrity anchors & acts", "Gala dinner & bar", "Live stream & highlights reel"],
    },
    {
      id: "corporate-offsites", cat: "corporate", icon: "users", title: "Annual Meets & Offsites",
      img: "groupDinner", price: 700000,
      short: "Annual days, dealer meets, incentive trips and team-building offsites.",
      desc: "We plan MICE travel and offsites for 20 to 2,000 people — with themed nights, team-building activities, and logistics that keep every attendee in the right place at the right time.",
      features: ["Venue & travel planning", "Team-building activities", "Themed gala nights", "Dealer & channel meets", "Incentive trips (Chittagong & abroad)", "Attendee app & helpdesk"],
    },
    {
      id: "brand-activations", cat: "corporate", icon: "megaphone", title: "Brand Activations & Roadshows",
      img: "friendsParty", price: 500000,
      short: "Mall activations, LED van campaigns, college fests and multi-city roadshows.",
      desc: "Ground-level campaigns that put your product in people's hands — mall and RWA activations, LED promotional vans, sampling drives and multi-city roadshows with live reporting dashboards.",
      features: ["Mall & RWA activations", "LED van campaigns", "College & campus fests", "Sampling & promoter staff", "Multi-city roadshows", "Live reporting dashboards"],
    },
    {
      id: "birthday-parties", cat: "social", icon: "cake", title: "Birthday Parties",
      img: "balloons", price: 150000,
      short: "Themed kids' parties, milestone 50ths and surprise celebrations.",
      desc: "Superhero carnivals for 5-year-olds, glam 30th rooftop nights, emotional 60th family dinners — we design birthdays around the person, with décor, entertainment, food and a few surprises.",
      features: ["Themed décor & balloon art", "Entertainers, magicians & games", "Custom cakes & dessert tables", "Venue & catering", "Surprise planning", "Photo & video coverage"],
    },
    {
      id: "anniversaries", cat: "social", icon: "glass", title: "Anniversaries & Milestones",
      img: "goldBalloons", price: 200000,
      short: "Silver and golden jubilees, vow renewals and family reunions.",
      desc: "Anniversaries deserve storytelling — memory walls, video tributes from family abroad, vow renewals and a dinner that feels like the original wedding, only calmer.",
      features: ["Vow renewal ceremonies", "Memory walls & video tributes", "Elegant dinner set-ups", "Live music & ghazal nights", "Family travel coordination", "Personalised favours"],
    },
    {
      id: "baby-showers", cat: "social", icon: "star", title: "Baby Showers & Naming",
      img: "confetti", price: 120000,
      short: "Godh bharai, baby showers, naamkaran and first-birthday celebrations.",
      desc: "Soft pastel set-ups, traditional rituals done right and comfortable seating for the mum-to-be — we make baby celebrations joyful and stress-free for the whole family.",
      features: ["Traditional ritual set-ups", "Pastel & floral décor", "Games & activities", "Gender reveal moments", "Catering & desserts", "Return gifts"],
    },
    {
      id: "private-parties", cat: "social", icon: "sparkle", title: "Private Parties & Couple Dates",
      img: "barLights", price: 80000,
      short: "Proposals, candle-light dinners, cocktail nights and house parties.",
      desc: "A rooftop proposal with fairy lights, a cocktail night at your farmhouse, or a surprise dinner for two — small events with big attention to detail.",
      features: ["Proposal planning", "Candle-light dinners", "Cocktail & bar set-ups", "Farmhouse parties", "Live musicians", "Photographer on request"],
    },
    {
      id: "concerts", cat: "production", icon: "music", title: "Concerts & Live Shows",
      img: "concertStage", price: 2500000,
      short: "Ticketed concerts, festivals and private shows with top artists.",
      desc: "From 500-seat acoustic evenings to 20,000-capacity outdoor festivals: artist booking, permissions, ticketing, crowd management, staging and sound — fully produced in-house.",
      features: ["Artist booking & riders", "Licences & police permissions", "Ticketing & gate management", "Stage, truss & line-array sound", "Crowd & security planning", "Sponsorship sales support"],
    },
    {
      id: "artist-management", cat: "production", icon: "star", title: "Artist & Celebrity Management",
      img: "concertColor", price: 300000,
      short: "Singers, bands, DJs, comedians, anchors and Bollywood celebrities.",
      desc: "Direct relationships with 500+ performers across genres and budgets. We handle contracts, travel, riders and green rooms so the artist arrives happy and performs at their best.",
      features: ["Bollywood singers & bands", "DJs & live acts", "Stand-up comedians", "Celebrity appearances", "Anchors & emcees", "Contracts, travel & riders"],
    },
    {
      id: "production-av", cat: "production", icon: "speaker", title: "Sound, Light & AV Production",
      img: "stageRig", price: 250000,
      short: "LED walls, line-array sound, intelligent lighting and stage fabrication.",
      desc: "Our own inventory of LED walls, sound systems, moving-head lights, truss and stage decks means better prices and no surprises — operated by experienced technicians.",
      features: ["P2.6 – P3.9 LED walls", "Line-array sound systems", "Moving-head & ambient lighting", "Truss & stage fabrication", "Projection mapping", "Live streaming kits"],
    },
    {
      id: "decor-design", cat: "production", icon: "palette", title: "Décor & Theme Design",
      img: "floralCandles", price: 200000,
      short: "Floral, lighting and set design that turns any venue into a story.",
      desc: "Our design studio creates mood boards and 3D renders before anything is built, so you see the décor before the day. Fresh florals, custom props, fabric draping and lighting design.",
      features: ["Mood boards & 3D renders", "Fresh & artificial florals", "Custom props & installations", "Fabric draping & ceilings", "Table styling", "Lighting design"],
    },
    {
      id: "catering", cat: "production", icon: "utensils", title: "Catering & Hospitality",
      img: "buffet", price: 1500,
      priceNote: "per plate",
      short: "Multi-cuisine menus, live counters, bar service and hospitality staff.",
      desc: "Curated caterers for Chittagong, Mughlai, indian, Continental, Pan-Asian and Jain menus, plus live counters, mixologists and trained hospitality staff in uniform.",
      features: ["Menu curation & tastings", "Live food counters", "Bar & mixology", "Jain / vegan / custom menus", "Uniformed service staff", "Hygiene-audited partners"],
    },
    {
      id: "photo-video", cat: "production", icon: "camera", title: "Photography & Videography",
      img: "coupleFlowers", price: 150000,
      short: "Candid photography, cinematic films, drones and same-day reels.",
      desc: "Candid and traditional photographers, cinematic film crews, drone operators and on-site editors delivering same-day reels for Instagram.",
      features: ["Candid & traditional photography", "Cinematic wedding films", "Drone coverage", "Same-day edit reels", "Pre-wedding shoots", "Albums & photo books"],
    },
    {
      id: "logistics", cat: "production", icon: "truck", title: "Event Logistics & Venue",
      img: "conferenceHall", price: 100000,
      short: "Venue booking, guest transport, accommodation and on-ground operations.",
      desc: "Venue sourcing across 300+ partner properties, luxury and bus fleets, hotel room blocks, airport desks and a control-room team that tracks every movement.",
      features: ["Venue sourcing & booking", "Guest transport fleets", "Hotel room blocks", "Airport & station desks", "Security & bouncers", "Event control room"],
    },
  ];

  /* ---------------- PORTFOLIO / CASE STUDIES ---------------- */
  const portfolio = [
    {
      id: "royal-Chattogram-wedding", cat: "weddings", title: "A Royal Wedding at agrabad,Chattogram",
      client: "Riaz zaman", location: "agrabad,Chattogram", year: 2025, guests: 500, days: 3,
      img: "weddingAisle", gallery: ["weddingAisle", "whiteBanquet", "weddingConfetti", "floralCandles", "indianHands", "receptionTables"],
      summary: "A three-day palace wedding with a swimming pool sideview, a bangladeshi folk mehendi and 500 guests flowns in from four countries.",
      challenge: "Guests arriving from Bangladesh, the UK, Canada and Singapore over two days, with a monsoon-season weather risk for the outdoor pheras.",
      solution: "We ran a dedicated airport desk and WhatsApp concierge, block-booked two adjacent hotels, and built a weather-proof German hangar as a fallback venue alongside the lakeside mandap.",
      results: ["500 guests, 0 missed transfers", "Weather fallback built in 36 hours", "Same-day film viewed 120k times"],
    },
    {
      id: "tech-summit-2025", cat: "corporate", title: "Chattogram Corporate Summit 2025",
      client: "Leading IT Services Company", location: "Agrabad Hotel, Chattogram", year: 2025, guests: 3200, days: 2,
      img: "auditorium", gallery: ["auditorium", "conferenceCrowd", "panel", "expoHall", "seminarAudience", "workshop"],
      summary: "A two-day summit with 3,200 delegates, 64 speakers, 6 parallel tracks and a 40-booth partner expo.",
      challenge: "Registering 3,200 delegates in under 45 minutes, and running six tracks without any of them overlapping.",
      solution: "QR-based self check-in kiosks, an RFID session tracker and a central show-control room linking all six halls.",
      results: ["Average check-in time: 18 seconds", "4.8/5 delegate rating", "2.1M live-stream views"],
    },
    {
      id: "ev-launch", cat: "corporate", title: "Electric SUV Launch Night",
      client: "Automotive Brand", location: "Agrabad Hotel, Chattogram", year: 2025, guests: 600, days: 1,
      img: "launchScreen", gallery: ["launchScreen", "stageRig", "microphone", "clubLights", "concertColor", "toast"],
      summary: "A kinetic-stage reveal with projection mapping for 600 dealers, media and influencers.",
      challenge: "Revealing a car on stage without giving it away, then turning the same hall into an after-party within 20 minutes.",
      solution: "A rotating kinetic platform hidden behind a 60-ft LED wall that split open, plus a pre-rigged lighting state for the party changeover.",
      results: ["300+ media stories", "Trended #2 on X in Chittagong", "1,100 test-drive bookings in 48 hours"],
    },
    {
      id: "sufi-night", cat: "production", title: "Sufi Night Under the Stars",
      client: "Ticketed Public Concert", location: "The king of Chittagong", year: 2026, guests: 12000, days: 1,
      img: "concertStage", gallery: ["concertStage", "concertCrowd", "concertWarm", "concertHearts", "stageLights", "confettiConcert"],
      summary: "An open-air concert for 12,000 people, from artist booking and licensing through to gate management.",
      challenge: "Moving 12,000 people in and out safely through four gates within a strict police permission window.",
      solution: "Zoned ticketing, timed entry slots, 140 security staff and live crowd-density monitoring from the control tower.",
      results: ["Sold out in 9 days", "Zero safety incidents", "Exit cleared in 22 minutes"],
    },
    {
      id: "golden-jubilee", cat: "social", title: "Golden Jubilee Celebration",
      client: "sakib khan", location: "Hall 24, Chattogram", year: 2026, guests: 180, days: 1,
      img: "goldBalloons", gallery: ["goldBalloons", "longTable", "toast", "tableDecor", "fairyLights", "coupleFlowers"],
      summary: "A 50th wedding anniversary with a vow renewal, a ghazal evening and video messages from 30 relatives abroad.",
      challenge: "Keeping the tributes a surprise from the couple while working with relatives across six time zones.",
      solution: "A private portal collected the video messages, which we edited into a 12-minute film, and a decoy 'family dinner' plan kept the secret.",
      results: ["Complete surprise", "30 international tributes", "Three generations on one stage"],
    },
    {
      id: "Mhendi Night", cat: "weddings", title: "Mhendi Night",
      client: "Maruf & Fahmina", location: "cox bazar", year: 2024, guests: 260, days: 2,
      img: "beachBride", gallery: ["beachBride", "clubLights", "confettiParty", "coupleHills", "fairyLights", "lawnChairs"],
      summary: "A beach-side sangeet with 14 family performances, a live band and fireworks over the Arabian Sea.",
      challenge: "A tide-dependent beach set-up and coastal noise limits after 10 PM.",
      solution: "Tide-mapped stage placement, silent-disco headphones after 10 PM, and a raised boardwalk dance floor.",
      results: ["14 choreographed acts", "Party ran past midnight within the noise rules", "Featured in a wedding magazine"],
    },
    {
      id: "pharma-awards", cat: "corporate", title: "Annual Excellence Awards",
      client: "Pharmaceutical Major", location: "Ocean Convention Centre, Chattogram", year: 2025, guests: 900, days: 1,
      img: "microphone", gallery: ["microphone", "ballroom", "receptionTables", "stageRig", "toast", "highFive"],
      summary: "900 sales leaders honoured across 42 categories, with a celebrity host and a gala dinner.",
      challenge: "Getting through 42 award categories while keeping the energy of 900 people high.",
      solution: "A tight 3-minute-per-award show-flow, video nominations and entertainment interludes every 8 awards.",
      results: ["Ended 6 minutes ahead of schedule", "95% attendee satisfaction", "Re-booked for 3 years"],
    },
    {
      id: "superhero-birthday", cat: "social", title: "Superhero Carnival Birthday",
      client: "Private Client", location: "Banquet Hall,Chittagong Club", year: 2025, guests: 120, days: 1,
      img: "balloons", gallery: ["balloons", "confetti", "friendsParty", "goldBalloons", "tableDecor", "confettiParty"],
      summary: "A 7th birthday carnival with game stalls, a magic show, a bouncy castle and a 4-tier themed cake.",
      challenge: "Keeping 70 children and 50 adults entertained at the same time, all afternoon.",
      solution: "A separate kids' carnival zone with trained attendants, plus a lounge and live counters for the parents.",
      results: ["12 game stalls", "Every child went home with a personalised hamper", "Repeat booking for a sibling"],
    },
    {
      id: "auto-expo-pavilion", cat: "corporate", title: "Auto Expo Pavilion",
      client: "Two-Wheeler Manufacturer", location: "port stadium, Chattogram", year: 2024, guests: 85000, days: 6,
      img: "expoHall", gallery: ["expoHall", "launchScreen", "stageRig", "teamMeeting", "conferenceHall", "workshop"],
      summary: "A 1,200 sq m pavilion with a live stunt arena, AR test rides and 85,000 footfalls over six days.",
      challenge: "Fabricating a two-storey pavilion in 7 days and handling the peak weekend crowds.",
      solution: "Pre-fabricated modular build, queue management with a token app, and AR stations to spread the crowd out.",
      results: ["85,000 visitors", "22,000 qualified leads", "'Best Pavilion' award"],
    },
  ];

  /* ---------------- GALLERY ---------------- */
  const gallery = [
    ["bride", "weddings", "Bridal portrait, Chittagong"], ["confettiConcert", "concerts", "New Year bash"],
    ["conferenceCrowd", "corporate", "Leadership summit"], ["whiteBanquet", "decor", "White-gold reception"],
    ["balloons", "social", "Kids' birthday carnival"], ["weddingAisle", "weddings", "Floral aisle, Chattogram"],
    ["stageLights", "concerts", "Live concert"], ["tableDecor", "decor", "Dinner table styling"],
    ["panel", "corporate", "Panel discussion"], ["weddingConfetti", "weddings", "Varmala celebration"],
    ["goldBalloons", "social", "Golden jubilee"], ["concertStage", "concerts", "Sufi night"],
    ["ballroom", "decor", "Ballroom set-up"], ["indianHands", "weddings", "Mehndi ceremony"],
    ["launchScreen", "corporate", "Product launch"], ["fairyLights", "decor", "Fairy-light canopy"],
    ["concertHearts", "concerts", "Festival crowd"], ["coupleFlowers", "weddings", "Couple shoot"],
    ["toast", "social", "Cocktail evening"], ["expoHall", "corporate", "Exhibition hall"],
    ["floralCandles", "decor", "Candle-lit florals"], ["clubLights", "concerts", "After-party"],
    ["rings", "weddings", "Ring ceremony"], ["longTable", "decor", "Long-table dinner"],
    ["friendsParty", "social", "Private party"], ["auditorium", "corporate", "Auditorium keynote"],
    ["beachBride", "weddings", "Beach wedding, Goa"], ["receptionTables", "decor", "Reception tables"],
    ["concertCrowd", "concerts", "Stadium show"], ["groupDinner", "corporate", "Offsite dinner"],
    ["coupleHills", "weddings", "Pre-wedding, Himachal"], ["confetti", "social", "Baby shower"],
  ].map(([k, cat, caption]) => ({ src: img(k, 1600), thumb: img(k, 700), cat, caption }));

  /* ---------------- TESTIMONIALS ---------------- */
  const testimonials = [
    { name: "Priya & Rohim", role: "Destination wedding, Chattogram", photo: "p2", rating: 5,
      text: "We gave them a Pinterest board and a budget; they gave us the best three days of our lives. Our parents didn't lift a finger, and our NRI guests still talk about the airport welcome." },
    { name: "Fardin Khan", role: "VP Marketing, Tech company", photo: "p3", rating: 5,
      text: "Running 3,200 delegates across six tracks is hard. Their control-room set-up meant I got live updates on my phone and never had to firefight once. We've signed them for next year." },
    { name: "Neha Hossain", role: "Golden jubilee for her parents", photo: "p4", rating: 5,
      text: "They pulled off a complete surprise with 30 relatives abroad sending video messages. My father cried, my mother cried, we all cried. Worth every Taka." },
    { name: "Abu bakkar", role: "Head of Sales, Pharma", photo: "p1", rating: 5,
      text: "42 award categories in one night and the show still ended early. The team is calm under pressure and really knows corporate audiences." },
    { name: "Zaryab khan", role: "Sangeet & wedding, Goa", photo: "p6", rating: 5,
      text: "The choreographer got even my 70-year-old nani dancing. Silent-disco headphones after 10 PM was genius — the party never stopped." },
    { name: "Zamil korim", role: "Brand Manager, Automotive", photo: "p5", rating: 5,
      text: "The kinetic reveal gave us the best launch coverage we've ever had. Creative, but also disciplined about budgets and timelines." },
  ].map((t) => ({ ...t, photo: img(t.photo, 200) }));

  /* ---------------- CLIENTS (placeholder names — replace) ---------------- */
  const clients = ["NORTHWIND", "Helix Pharma", "VERTEX AUTO", "Bluepeak", "Orion Bank", "Kinetic Labs", "SUNRISE", "Meridian", "Atlas Infra", "Nimbus Tech", "Crescent", "Lumen & Co"];

  /* ---------------- TEAM ---------------- */
  const team = [
    { name: "minhaz zamal", role: "Founder & Creative Director", photo: "p1", bio: "16 years in live events; has led 600+ weddings and launches." },
    { name: "Ritika Karim", role: "Head of Weddings", photo: "p2", bio: "Destination wedding specialist across Bangladesh, Goa and Bali." },
    { name: "Sameer Khan", role: "Head of Corporate & MICE", photo: "p3", bio: "Former hotel GM; runs summits, offsites and incentive travel." },
    { name: "Mariya khan", role: "Design Studio Lead", photo: "p4", bio: "Architect turned set designer; creates every mood board and 3D render." },
  ].map((t) => ({ ...t, photo: img(t.photo, 600) }));

  /* ---------------- FAQS ---------------- */
  const faqs = [
    { q: "How far in advance should we book?", a: "For weddings, 6–12 months is ideal, especially for the November–February season. Corporate events usually need 6–10 weeks. We've also delivered events in 72 hours, so call us even if your date is close." },
    { q: "Do you work within a fixed budget?", a: "Yes. We start every project by agreeing on a budget, then design to it. You get a line-item quote, and nothing is added without your written approval." },
    { q: "Which cities do you operate in?", a: "We're based in chattogram with offices in Agrabad, GEC and Hazi para, and we regularly run events across Bangladesh (Chattogram, Dhaka, Sylhet) and abroad (Dubai, Bali, Thailand)." },
    { q: "Can we hire you for just one service, like décor or sound?", a: "Absolutely. You can book a single service (décor, AV production, artist booking, photography) or our full planning package." },
    { q: "What are your payment terms?", a: "Usually 40% to confirm the booking, 40% two weeks before the event and 20% after the event. Corporate clients can work on PO and invoice terms." },
    { q: "Do you handle permissions and licences?", a: "Yes — police permissions, PPL/IPRS music licences, excise (bar) licences, fire NOCs and venue approvals are part of our scope wherever needed." },
    { q: "Will we have one point of contact?", a: "Yes. Every event gets a dedicated event manager from the first meeting to the final payment, backed by specialist teams for design, production and hospitality." },
    { q: "What happens if it rains on our outdoor event?", a: "Every outdoor plan we make includes a weather back-up — German hangars, waterproof canopies or an indoor alternative — costed and agreed in advance." },
  ];

  /* ---------------- PROCESS ---------------- */
  const process = [
    { title: "Discover", text: "A free consultation to understand your vision, guest profile, dates and budget." },
    { title: "Design", text: "Concept, mood boards, 3D renders and a transparent, line-item proposal." },
    { title: "Plan", text: "Vendor contracts, timelines, run-of-show and a shared planning dashboard." },
    { title: "Execute", text: "Our on-ground team runs the day so you can be a guest at your own event." },
    { title: "Deliver", text: "Photos, films, reports and a final settlement — with a thank-you note, always." },
  ];

  /* ---------------- BLOG ---------------- */
  const posts = [
    {
      id: "wedding-planning-checklist", title: "The 12-Month bangladeshi Wedding Planning Checklist",
      cat: "Weddings", date: "2026-09-02", read: 8, img: "weddingAisle", author: "Ritika Karim",
      excerpt: "A month-by-month guide to planning a Bangladeshi wedding without the last-minute panic — from booking a venue to packing the shagun envelopes.",
      body: [
        ["p", "Bangladeshi weddings are not a single event; they're a festival lasting several days, with dozens of vendors and hundreds of guests. The secret to a calm wedding is starting early and doing things in the right order. Here's the timeline we use with our own couples."],
        ["h2", "12 – 10 months before"],
        ["ul", ["Fix your budget and who is contributing", "Shortlist dates with the family pandit or astrologer", "Draft a guest list (it will grow by 20%, plan for it)", "Book your venue — peak season dates go first", "Hire your planner and photographer"]],
        ["h2", "9 – 6 months before"],
        ["ul", ["Finalise themes for each function", "Book décor, caterer, DJ/band and makeup artists", "Start bridal and groom outfit shopping", "Block hotel rooms for outstation guests", "Plan the pre-wedding shoot"]],
        ["h2", "5 – 3 months before"],
        ["ul", ["Send save-the-dates and e-invites", "Book the sangeet choreographer", "Menu tastings with the caterer", "Plan the guest hospitality: welcome kits, transport, helpdesk"]],
        ["h2", "2 months – 1 week before"],
        ["ul", ["Final outfit fittings", "Confirm RSVPs and room allocations", "Share the run-of-show with every vendor", "Prepare shagun envelopes, return gifts and the emergency kit"]],
        ["blockquote", "The best thing you can do in the final week is hand over control. Let your planner run the show and spend the time with your people."],
        ["p", "Want this checklist as a shared planning dashboard? Every Aurelia wedding gets one, free."],
      ],
    },
    {
      id: "corporate-event-roi", title: "How to Measure the ROI of a Corporate Event",
      cat: "Corporate", date: "2026-08-14", read: 6, img: "conferenceCrowd", author: "Sameer Khan",
      excerpt: "Leadership wants numbers. Here's a practical framework to measure the return on your conference, launch or offsite.",
      body: [
        ["p", "Events are among the biggest line items in a marketing budget, yet many teams still judge them by gut feel. Here is a simple framework we use with our corporate clients."],
        ["h2", "1. Define the one metric that matters"],
        ["p", "A product launch is about media reach and leads. A dealer meet is about orders. An offsite is about retention and engagement. Pick one primary metric before you pick a venue."],
        ["h2", "2. Capture data at every touchpoint"],
        ["ul", ["Registration: who came, from where, in which role", "Session tracking: which talks were most attended", "Lead capture: badge scans at booths", "Live polls and feedback forms"]],
        ["h2", "3. Compare against cost per outcome"],
        ["p", "Divide total spend by qualified leads, orders or engaged employees. Then compare that number with other channels. Well-run events usually win on cost per qualified lead in B2B."],
        ["blockquote", "If you can't measure it, you can't defend the budget next year."],
        ["p", "Every corporate event we run ends with a post-event analytics report, so you have the numbers ready for your leadership review."],
      ],
    },
    {
      id: "destination-wedding-Bangladesh", title: "3 Destination Wedding Locations in Bangladesh for 2027",
      cat: "Weddings", date: "2026-07-21", read: 7, img: "beachBride", author: "Ritika Karim",
      excerpt: "Palaces, beaches, backwaters and mountains — our favourite wedding destinations, with typical budgets and the best seasons.",
      body: [
        ["p", "You don't need to fly abroad for a stunning destination wedding. Bangladesh has palaces, beaches, backwaters and mountains, usually with easier logistics for your family."],
        ["h2", "Our top picks"],
        ["ul", ["Chattogram — Foyslake palaces, best from October to March", "Rajshahi— heritage forts and Rajbari, from November to February", "Cox's Bazar — beach weddings, from November to February"]],
        ["h2", "What drives the budget"],
        ["p", "Guest count and the number of nights matter more than the destination. A 150-guest, two-night wedding is far easier to plan well than a 400-guest, three-night one."],
        ["blockquote", "Plan for travel days. Guests arrive tired; a relaxed welcome evening beats a big function on day one."],
      ],
    },
    {
      id: "event-decor-trends", title: "Event Décor Trends We're Loving This Season",
      cat: "Décor", date: "2026-06-30", read: 5, img: "floralCandles", author: "mariya khan",
      excerpt: "Sustainable florals, sculptural installations, warm amber lighting and the return of the long-table dinner.",
      body: [
        ["p", "Décor trends move fast, but the best ones last because they make guests feel something. Here's what our design studio is excited about."],
        ["h2", "Sustainable florals"],
        ["p", "Potted plants guests can take home, locally grown seasonal flowers, and reusable frames instead of single-use foam."],
        ["h2", "Warm, low lighting"],
        ["p", "Amber uplighting, candle clusters and filament bulbs instead of harsh colour washes. Everyone looks better in warm light, and so do the photos."],
        ["h2", "Long-table dinners"],
        ["p", "Instead of round tables of ten, one long banquet table brings families together and makes for unforgettable overhead shots."],
        ["blockquote", "Good décor is not about more — it's about the right things in the right place."],
      ],
    },
  ];

  /* ---------------- CAREERS ---------------- */
  const jobs = [
    { title: "Senior Event Manager — Weddings", location: "Chattogram", type: "Full-time", exp: "5+ years" },
    { title: "Client Servicing Executive — Corporate", location: "Chattogram", type: "Full-time", exp: "2–4 years" },
    { title: "3D Visualiser / Set Designer", location: "Chattogram", type: "Full-time", exp: "2+ years" },
    { title: "Production Manager (AV & Fabrication)", location: "Chattogram", type: "Full-time", exp: "4+ years" },
    { title: "Social Media & Content Creator", location: "Chattogram", type: "Full-time", exp: "1–3 years" },
    { title: "Event Operations Intern", location: "Chattogram", type: "Internship", exp: "Freshers" },
  ];

  /* ---------------- PLANNER / ESTIMATOR DATA ---------------- */
  // perGuest = rough base cost per guest in BDT for a "Signature" tier event
  const eventTypes = [
    { id: "wedding", label: "Wedding", icon: "rings", perGuest: 6500, base: 400000 },
    { id: "destination", label: "Destination Wedding", icon: "plane", perGuest: 14000, base: 900000 },
    { id: "pre-wedding", label: "Mehndi / Haldi / Sangeet", icon: "flower", perGuest: 3000, base: 150000 },
    { id: "engagement", label: "Engagement / Roka", icon: "heart", perGuest: 3500, base: 120000 },
    { id: "conference", label: "Conference / Seminar", icon: "mic", perGuest: 3000, base: 250000 },
    { id: "launch", label: "Product Launch", icon: "rocket", perGuest: 5000, base: 500000 },
    { id: "awards", label: "Awards / Gala", icon: "award", perGuest: 4500, base: 400000 },
    { id: "offsite", label: "Offsite / Annual Meet", icon: "users", perGuest: 8000, base: 200000 },
    { id: "exhibition", label: "Exhibition / Stall", icon: "grid", perGuest: 150, base: 400000 },
    { id: "concert", label: "Concert / Live Show", icon: "music", perGuest: 900, base: 1500000 },
    { id: "birthday", label: "Birthday Party", icon: "cake", perGuest: 2200, base: 60000 },
    { id: "private", label: "Anniversary / Private Party", icon: "glass", perGuest: 2800, base: 50000 },
  ];

  const addons = [
    { id: "decor", label: "Décor & florals", cost: 0.18 },
    { id: "catering", label: "Catering & bar", cost: 0.3 },
    { id: "av", label: "Sound, light & LED", cost: 0.1 },
    { id: "artist", label: "Artist / celebrity", cost: 0.15 },
    { id: "photo", label: "Photo & video", cost: 0.06 },
    { id: "venue", label: "Venue sourcing", cost: 0.04 },
    { id: "travel", label: "Travel & stay", cost: 0.2 },
    { id: "invites", label: "Invites & gifting", cost: 0.04 },
  ];

  const tiers = [
    { id: "essential", label: "Essential", mult: 0.7, note: "Smart, elegant, budget-focused" },
    { id: "signature", label: "Signature", mult: 1, note: "Our most-booked experience" },
    { id: "luxe", label: "Luxe", mult: 1.8, note: "No-compromise, bespoke luxury" },
  ];

  const packages = [
    { name: "Essential", price: "2.5 Ltk", unit: "onwards", note: "Ideal for intimate celebrations and single-day corporate events.",
      features: ["Dedicated event coordinator", "Venue & vendor shortlist", "Standard décor package", "Sound & basic lighting", "Day-of coordination (1 day)"] },
    { name: "Signature", price: "8 Ltk", unit: "onwards", featured: true, note: "Our most-loved package for weddings, launches and galas.",
      features: ["Senior event manager + team", "Custom theme, mood board & 3D render", "Premium décor & florals", "LED wall, sound & intelligent lighting", "Artist / anchor booking", "Guest hospitality desk", "Photo & video coverage"] },
    { name: "Luxe", price: "25 Ltk", unit: "onwards", note: "Bespoke, multi-day and destination experiences without compromise.",
      features: ["Creative director-led design", "Multi-day, multi-venue planning", "Celebrity & international acts", "Travel, stay & concierge", "Bespoke installations & stage", "Cinematic films & same-day edits", "24×7 control room"] },
  ];

  window.DATA = {
    IMG, img, categories, services, portfolio, gallery, testimonials, clients,
    team, faqs, process, posts, jobs, eventTypes, addons, tiers, packages,
  };
})();
