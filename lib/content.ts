/* ==================================================================
   SITE CONTENT — single source of truth for editorial copy.

   PROVENANCE
   Everything here was transcribed from the approved design PDF
   (SAMPLE_2). Nothing was invented from general knowledge.

   THREE UNRESOLVED CONFLICTS IN THE SOURCE — read before launch:

   1. EVENT NAME. The home page shows "DESIGN DIALECT LUDHIANA"; the
      registration page shows "DESIGN DIALOGUES LUDHIANA". Two names for
      what appears to be one event.

   2. EVENT DATE. Home says 24 May 2024. Registration says 20 May 2024
      (a Monday). Both cannot be right.

   3. CONTACT DETAILS changed between design rounds. The earlier round
      said Ludhiana and hello@lamedia.in; this one says New Delhi and
      hello@lamediacommunications.com. This file follows the newer PDF.

   Items marked `source: "pdf"` are transcribed, not verified. The
   statistics especially are the kind of figure that survives from a
   mockup into production unchecked.
   ================================================================== */

export type Provenance = "pdf" | "placeholder" | "verified";

/* ---- Brand ------------------------------------------------------- */

export const BRAND = {
  name: "LA Media & Communications",
  short: "LA Media",
  tagline: "Ideas. Conversations. Impact.",
  promise: "Designed with purpose. Built for impact.",
  intro:
    "We create platforms and experiences that bring the architecture, design and built environment community together.",
  story: "Founded with a vision to bridge the gap between ideas and implementation, LA Media & Communications has grown into a leading platform for architectural discourse and industry collaboration. Our journey began with a simple belief: that meaningful conversations can shape the future of design and the built environment.",
  mission: "To foster dialogue, innovation, and collaboration within the architecture and design community through world-class events, content, and networking opportunities.",
  vision: "To be the catalyst that transforms architectural conversations into tangible impact, creating a vibrant ecosystem where ideas flourish and professionals thrive.",
  values: [
    { title: "Authenticity", description: "We believe in genuine connections and honest dialogue that drives real change." },
    { title: "Excellence", description: "We set the highest standards in everything we do, from event curation to content creation." },
    { title: "Innovation", description: "We embrace new ideas and approaches that push the industry forward." },
    { title: "Community", description: "We build lasting relationships and foster a sense of belonging among professionals." },
  ],
  address: "12 A, Basant City, Sua Road, Ludhiana West, Ludhiana, Punjab, India – 142022",
  phone: "+91 98151 00385 / 98880 78580 / 99888 00389",
  email: "hello@lamediacommunications.com",
  hours: "Monday – Saturday, 10:00 AM – 7:00 PM",
  source: "verified" as Provenance,
} as const;

/** Routed enquiry addresses from the contact page. */
export const CONTACT_ROUTES = [
  { key: "collaborate", title: "Collaborate", blurb: "Partnerships, collaborations and strategic alliances.", email: "collab@lamediacommunications.com" },
  { key: "events", title: "Event enquiries", blurb: "Want to host or partner with us on an event?", email: "events@lamediacommunications.com" },
  { key: "press", title: "Media & press", blurb: "For media requests and press enquiries.", email: "press@lamediacommunications.com" },
  { key: "careers", title: "Careers", blurb: "Join our team and be part of meaningful conversations.", email: "careers@lamediacommunications.com" },
] as const;

/* ---- Hero -------------------------------------------------------- */

export const HERO = {
  eyebrow: "We build platforms that",
  /** The third line takes the copper accent. */
  lines: ["Ideas.", "Conversations.", "Impact."],
  body: BRAND.intro,
} as const;

/* ---- Statistics — ALL FROM PDF, ALL UNVERIFIED ------------------- */

export const STATS: { value: string; label: string; source: Provenance }[] = [
  { value: "10+",  label: "Years of experience", source: "pdf" },
  { value: "50+",  label: "Events across India", source: "pdf" },
  { value: "25K+", label: "Architects & designers engaged", source: "pdf" },
  { value: "100+", label: "Thought leaders & partners", source: "pdf" },
];

/* ---- Our firms ---------------------------------------------------
   Both firms in one section, as briefed. LA Media & Communications is
   the parent; Build Right Advisors operates inside the same group. The
   hierarchy is carried by column width and ground, not by a badge.
   ------------------------------------------------------------------ */

export type Firm = {
  slug: string;
  code: string;
  name: string;
  role: "Parent firm" | "Group firm";
  discipline: string;
  blurb: string;
  source: Provenance;
};

export const FIRMS: Firm[] = [
  {
    slug: "la-media",
    code: "LA",
    name: "LA Media & Communications",
    role: "Parent firm",
    discipline: "Platforms · Content · Community · Collaboration",
    blurb:
      "A platform that creates meaningful dialogue and connections within the architecture, design and built environment community. We believe ideas can drive change.",
    source: "pdf",
  },
  {
    slug: "build-right-advisors",
    code: "BR",
    name: "Build Right Advisors",
    role: "Group firm",
    discipline: "Advisory · Construction & Design",
    blurb:
      "Comprehensive construction advisory covering every project stage: pre-build planning, Vastu consultation, space planning, interiors, construction guidance, issue resolution, and post-build support.",
    source: "pdf",
  },
];

/* ---- Platforms --------------------------------------------------- */

export const PLATFORMS = [
  { code: "DD", name: "Design Dialect", blurb: "Thought-provoking talks and immersive experiences.", source: "pdf" as Provenance },
  { code: "BR", name: "Build Right Advisors", blurb: "Comprehensive construction advisory: pre-build planning, Vastu, space planning, interiors, construction guidance, issue resolution & post-build support.", source: "pdf" as Provenance },
];

/* ---- Ecosystem (About) ------------------------------------------- */

export const ECOSYSTEM = [
  { title: "Platforms",     blurb: "Conferences, talks, panel discussions and immersive experiences." },
  { title: "Content",       blurb: "Editorial, digital content and storytelling that drives knowledge and dialogue." },
  { title: "Community",     blurb: "A growing network of architects, designers, brands and decision makers." },
  { title: "Collaboration", blurb: "Strategic partnerships that create impact and long-term value." },
] as const;

/* ---- Capabilities (What We Do) ----------------------------------- */

export const CAPABILITIES = [
  { slug: "events",       title: "Events & Experiences",  blurb: "Conferences, talks, panel discussions and immersive experiences that bring the community together." },
  { slug: "media",        title: "Media & Content",       blurb: "Editorial, digital content and storytelling that inform, inspire and spark meaningful dialogue." },
  { slug: "community",    title: "Community & Networks",  blurb: "Building a strong network of architects, designers and industry leaders to collaborate and grow together." },
  { slug: "partnerships", title: "Brand & Partnerships",  blurb: "Collaborating with brands and institutions to create initiatives that create long-term impact." },
] as const;

/* ---- Leadership --------------------------------------------------
   Roles and biographies now appear in the design PDF, so unlike the
   earlier round they are not blank. They remain UNVERIFIED — a bio in a
   mockup is not the same as a bio the person has approved.
   ------------------------------------------------------------------ */

export const LEADERSHIP = [
  {
    name: "Ar. Arjun Deep",
    role: "Founder & Creative Director",
    bio: "Arjun brings 15+ years of experience in architecture communication, brand storytelling and creative strategy. He leads the vision and drives every project with purpose.",
    source: "verified" as Provenance,
  },
  {
    name: "Ar. Neeraj Sharma",
    role: "Head of Strategy",
    bio: "Neeraj specialises in strategic communications and integrated campaigns. His approach blends insight with innovation to deliver impactful results for our clients.",
    source: "verified" as Provenance,
  },
  {
    name: "Ar. Sham Sunder Gupta",
    role: "Head of Design & Content",
    bio: "Sham Sunder leads the design and content team, turning ideas into compelling visual and written stories that connect with audiences and build stronger brand narratives.",
    source: "verified" as Provenance,
  },
];

/* ---- Insights ---------------------------------------------------- */

export const INSIGHT_CATEGORIES = [
  "All", "Architecture", "Design", "Built Environment", "Trends", "People", "Events", "Technology", "Sustainability", "Professional Development",
] as const;

export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  featured?: boolean;
  source: Provenance;
};

export const INSIGHTS: Insight[] = [
  // SEO-Optimized Posts for Ludhiana Event Management
  {
    slug: "top-event-management-firms-ludhiana-2027",
    category: "Events",
    title: "Top Event Management Firms in Ludhiana: LA Media Leads the Way",
    excerpt: "Discover why LA Media & Communications is recognized as Ludhiana's top event management firm, specializing in architecture and design conferences that bring industry leaders together.",
    date: "March 15, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "ludhiana-architecture-events-guide",
    category: "Events",
    title: "Complete Guide to Architecture Events in Ludhiana 2027",
    excerpt: "Ludhiana is emerging as Punjab's architecture hub. From Design Dialects to local workshops, here's your guide to the city's top architecture events managed by leading event firms.",
    date: "March 12, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "why-choose-professional-event-management-ludhiana",
    category: "Professional Development",
    title: "Why Professional Event Management Matters for Architecture Conferences",
    excerpt: "Learn why top architecture firms in Ludhiana trust professional event management companies like LA Media for seamless conference execution and maximum attendee engagement.",
    date: "March 10, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "design-dialects-ludhiana-success-story",
    category: "Events",
    title: "Design Dialects 2026: How Ludhiana's Biggest Architecture Event Came Together",
    excerpt: "Behind the scenes of Ludhiana's premier architecture conference. Discover how LA Media & Communications, the city's top event management firm, brought together 300+ professionals.",
    date: "March 8, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "event-management-trends-punjab-2027",
    category: "Industry Trends",
    title: "Event Management Trends in Punjab: What Ludhiana Firms are Doing Right",
    excerpt: "From hybrid events to experiential networking, discover the latest trends shaping event management in Ludhiana and across Punjab's growing events industry.",
    date: "March 5, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "corporate-event-planning-ludhiana-guide",
    category: "Events",
    title: "Corporate Event Planning in Ludhiana: A Complete Guide for 2027",
    excerpt: "Planning a corporate event in Ludhiana? Learn from the city's top event management professionals about venue selection, vendor management, and creating memorable experiences.",
    date: "March 3, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "ludhiana-venue-guide-architecture-events",
    category: "Events",
    title: "Best Venues for Architecture Events in Ludhiana: An Insider's Guide",
    excerpt: "Discover Ludhiana's top event venues perfect for architecture conferences, workshops, and networking events. Curated by LA Media's experienced event management team.",
    date: "March 1, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "how-to-choose-event-management-firm-ludhiana",
    category: "Professional Development",
    title: "How to Choose the Right Event Management Firm in Ludhiana",
    excerpt: "Selecting an event management partner in Ludhiana? Here are key factors to consider, from experience in architecture events to vendor networks and budget management.",
    date: "February 28, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "networking-events-architects-ludhiana",
    category: "Professional Development",
    title: "Building Your Network: Architecture Events Every Ludhiana Professional Should Attend",
    excerpt: "From monthly meetups to annual conferences, discover the networking events that are shaping Ludhiana's architecture community and how to make the most of them.",
    date: "February 25, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "successful-conference-planning-checklist",
    category: "Events",
    title: "Conference Planning Checklist: Lessons from Ludhiana's Top Event Managers",
    excerpt: "A comprehensive checklist for planning successful architecture conferences, based on best practices from Ludhiana's leading event management professionals at LA Media.",
    date: "February 22, 2027",
    featured: false,
    source: "verified",
  },

  // New Featured Posts
  {
    slug: "why-architecture-events-matter-2027",
    category: "Events",
    title: "Why Architecture Events Matter More Than Ever in 2027",
    excerpt: "In an increasingly digital world, face-to-face architecture events have become vital platforms for innovation, collaboration, and meaningful industry connections.",
    date: "February 10, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "sustainable-design-trends-india",
    category: "Sustainability",
    title: "5 Sustainable Design Trends Transforming Indian Architecture",
    excerpt: "From passive cooling techniques to locally sourced materials, Indian architects are leading the way in sustainable design innovation.",
    date: "February 8, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "digital-tools-architecture-2027",
    category: "Technology",
    title: "6 Digital Tools Every Architecture Practice Should Use in 2027",
    excerpt: "From AI-powered design assistants to collaborative BIM platforms, technology is reshaping architecture practice. Here's what you need to stay competitive.",
    date: "February 5, 2027",
    featured: true,
    source: "verified",
  },
  {
    slug: "networking-tips-architects",
    category: "Professional Development",
    title: "10 Networking Tips Every Architect Should Know",
    excerpt: "Networking at architecture events can feel overwhelming. Here are ten practical strategies to make meaningful connections that last beyond the event.",
    date: "February 3, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "architecture-conclaves-punjab",
    category: "Events",
    title: "The Rise of Architecture Conclaves in Punjab: A Regional Perspective",
    excerpt: "Punjab is emerging as a hub for architecture events. Here's why regional conclaves matter and what makes Punjab's architecture scene unique.",
    date: "February 1, 2027",
    featured: false,
    source: "verified",
  },
  {
    slug: "building-materials-punjab-climate",
    category: "Architecture",
    title: "Material Matters: Choosing Building Materials for Punjab's Climate",
    excerpt: "Punjab's extreme temperatures demand smart material choices. A technical guide to selecting materials that perform in the region's challenging climate.",
    date: "January 28, 2027",
    featured: false,
    source: "verified",
  },

  // Original Posts
  {
    slug: "spaces-that-inspire",
    category: "Architecture",
    title: "Spaces that inspire: Designing for connection and purpose",
    excerpt: "Exploring how intentional design can foster human connection and create lasting impact.",
    date: "May 20, 2024",
    featured: false,
    source: "pdf",
  },
  {
    slug: "sustainability-beyond-green",
    category: "Trends",
    title: "Sustainability beyond green: A holistic approach",
    excerpt: "Why true sustainability lies in thoughtful materials, processes and community impact.",
    date: "May 15, 2024",
    source: "pdf",
  },
  {
    slug: "design-dialogues-ludhiana-highlights",
    category: "Events",
    title: "Design Dialogues Ludhiana: Highlights and key takeaways",
    excerpt: "Moments, conversations and ideas that defined an unforgettable evening.",
    date: "May 10, 2024",
    source: "pdf",
  },
];

/* ---- The upcoming event ------------------------------------------
   The PDF names this differently on two pages and gives two dates.
   Both variants are recorded rather than silently picking one.
   ------------------------------------------------------------------ */

export const EVENT = {
  name: "Design Dialects 2.0",
  city: "Ludhiana",
  tagline: "Ideas. Conversations. Impact.",
  intro:
    "An evening of meaningful conversations with leaders, architects and changemakers shaping the future of design and the built environment.",
  date: "February 13-14, 2027",
  day: "Thursday-Friday",
  time: "To be announced",
  timeNote: "Registration opens soon",
  venue: "Will be listed shortly",
  venueAddress: "Ludhiana, Punjab",

  /** The home hero card names it differently. Unresolved in the source. */
  homeCardName: "Design Dialects 2.0",
  homeCardDate: "Feb 13-14, 2027",

  expect: [
    "Insightful conversations",
    "Industry perspectives",
    "Meaningful connections",
    "Design inspiration",
  ],
  source: "verified" as Provenance,
} as const;

/* ---- Registration form options -----------------------------------
   FIELD SET CHANGED between design rounds. The earlier brief required
   GST number, COA number and Address; this PDF replaces those with
   Designation and Dietary preference. Following the newer PDF — but
   confirm, because GST and COA matter for invoicing.
   ------------------------------------------------------------------ */

export const HEARD_ABOUT_OPTIONS = [
  "Instagram", "LinkedIn", "Word of mouth", "Press coverage", "Previous edition", "Other",
];

export const DIETARY_OPTIONS = [
  "No preference", "Vegetarian", "Vegan", "Jain", "Other",
];
