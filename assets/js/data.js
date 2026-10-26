// All site content lives here. Editing this file is the only change needed
// for problems, services, projects and jobs. When adding/removing a job, also update sitemap.xml.

export const CONTACT = {
  email: "support@senxdev.com",
  phone: "+94 76 358 1264",
  phoneHref: "tel:+94763581264",
  whatsapp: "https://wa.me/94763581264",
  whatsappGreeting: "https://wa.me/94763581264?text=Hello!%20I'm%20interested%20in%20your%20services.",
  linkedin: "https://linkedin.com/company/senxdev",
  instagram: "https://instagram.com/senxdev",
  // 15-min call. Links add ?name=, ?email= and ?notes= so the booking form is pre-filled.
  booking: "https://cal.com/senxdev/15min",
};

export const WEB3FORMS_KEY = "a142a491-ca1d-4210-8ba3-c84e30393f3a";

/* ---------- Hero: problem → brief → blueprint ---------- */

// Words the visitor can pick for each part of the sentence (or type their own).
export const OPTIONS = {
  who: ["a startup", "a restaurant", "a clinic", "a retail brand", "a real-estate agency", "a school", "a growing team", "an enterprise"],
  product: ["a mobile app", "a web app", "a website", "an AI assistant", "custom software", "a redesign"],
  goal: ["takes bookings", "sells online", "manages our orders", "answers questions", "automates our admin", "tracks our numbers", "brings in enquiries"],
  when: ["in 4 weeks", "in 8 weeks", "in 12 weeks", "when it's right"],
};

export const SLOT_LABELS = { who: "Who you are", product: "What you need", goal: "What it should do", when: "When you want it live" };

// Product word → blueprint frame and service name.
export const PRODUCTS = {
  "a mobile app": { id: "mobile", frame: "phone", service: "Mobile Apps" },
  "a web app": { id: "webapp", frame: "browser", service: "Web Apps" },
  "a website": { id: "website", frame: "browser", service: "Web Development" },
  "an AI assistant": { id: "ai", frame: "chat", service: "AI Solutions" },
  "custom software": { id: "software", frame: "browser", service: "Software Development" },
  "a redesign": { id: "redesign", frame: "browser", service: "UI/UX Design" },
};

// Goal word → which module the blueprint draws.
export const GOAL_DRAW = {
  "takes bookings": "bookings",
  "sells online": "sells",
  "manages our orders": "customers",
  "answers questions": "answers",
  "automates our admin": "automates",
  "tracks our numbers": "tracks",
  "brings in enquiries": "sells",
};

export const TIMELINE_WEEKS = { "in 4 weeks": 4, "in 8 weeks": 8, "in 12 weeks": 12, "when it's right": 16 };

export const PROBLEMS = [
  {
    t: "Bookings come in by phone, text and DM",
    who: "a restaurant", product: "a mobile app", goal: "takes bookings", when: "in 8 weeks",
    before: "Customers call, text and DM to book. Some get missed, some never show.",
    after: "One app takes bookings day and night and sends reminders automatically.",
    modules: ["Booking calendar", "Email & SMS reminders", "Staff schedule view"],
  },
  {
    t: "Orders are tracked in WhatsApp chats",
    who: "a retail brand", product: "a web app", goal: "manages our orders", when: "in 8 weeks",
    before: "Orders arrive in chats, details get lost and customers keep asking for updates.",
    after: "Every order in one place, with status updates sent to customers automatically.",
    modules: ["Order inbox", "Customer status updates", "Stock sync"],
  },
  {
    t: "We retype the same data into spreadsheets",
    who: "a growing team", product: "custom software", goal: "automates our admin", when: "in 12 weeks",
    before: "The same numbers get copied between tools by hand, every single week.",
    after: "Data flows between your tools on its own. Your team does the real work.",
    modules: ["Workflow engine", "Integrations (Sheets, email, CRM)", "Audit trail"],
  },
  {
    t: "Customers ask the same questions all day",
    who: "a clinic", product: "an AI assistant", goal: "answers questions", when: "in 4 weeks",
    before: "Staff answer the same questions about hours, prices and bookings all day.",
    after: "An assistant answers instantly, 24/7, and hands tricky ones to a person.",
    modules: ["Knowledge base", "Conversational assistant", "Hand-off to a human"],
  },
  {
    t: "Our website looks old and brings no leads",
    who: "a startup", product: "a website", goal: "brings in enquiries", when: "in 4 weeks",
    before: "The site is slow, hard to update and nobody fills in the contact form.",
    after: "A fast, modern site that shows up in search and turns visitors into enquiries.",
    modules: ["New responsive site", "Enquiry forms", "Search (SEO) setup"],
  },
  {
    t: "We have no idea which numbers matter",
    who: "a growing team", product: "a web app", goal: "tracks our numbers", when: "in 8 weeks",
    before: "Reports are pieced together by hand, and always a week out of date.",
    after: "A live dashboard with the numbers that matter, and alerts when they move.",
    modules: ["Live dashboard", "Reports & exports", "Threshold alerts"],
  },
];

// Used when the visitor types their own problem.
export const CUSTOM_PROBLEM = {
  who: "a business like ours", product: "custom software", goal: "fixes this", when: "when it's right",
  before: "Tell us in your own words what is slowing you down.",
  after: "We'll map it out with you and propose the simplest thing that fixes it.",
  modules: ["Discovery session", "Tailored build", "Ongoing support"],
};

// Examples that type themselves into the empty "something else" field.
export const CUSTOM_EXAMPLES = [
  "Invoices take us hours every month",
  "Our stock counts never match",
  "Staff can't find the latest documents",
  "Leads go cold before we call back",
];

export const INDUSTRIES = ["Restaurants", "Clinics", "Retail", "Real estate", "Schools", "Gyms", "Salons", "Logistics", "Startups", "Agencies"];

/* ---------- Static content ---------- */

export const SERVICES = [
  { product: "an AI assistant", title: "AI Development", slug: "ai-development", description: "AI solutions for business: AI chatbots, WhatsApp assistants and automation that take repetitive work off your team." },
  { product: "a web app", title: "Web App Development", slug: "web-app-development", description: "Web applications, SaaS platforms, dashboards and booking systems that run in any browser and scale with you." },
  { product: "a mobile app", title: "Mobile App Development", slug: "mobile-app-development", description: "Fast, reliable iOS and Android apps built cross-platform, from MVP to App Store launch and beyond." },
  { product: "a website", title: "Website Development", slug: "web-development", description: "Mobile-first business and ecommerce websites, SEO-ready from day one and built to turn visitors into enquiries." },
  { product: "a redesign", title: "UI/UX Design", slug: "ui-ux-design", description: "Product design, website redesigns and design systems that make apps and websites clear and easy to use." },
  { product: "custom software", title: "Custom Software Development", slug: "custom-software-development", description: "Internal tools, portals, integrations and business automation software built around how your team works." },
];

export const REASONS = [
  { title: "Solutions, not just software", description: "We develop innovative, impact-driven software that solves real problems and fuels business growth." },
  { title: "Cutting-edge technology", description: "We leverage the latest technologies and frameworks to build modern, scalable, and high-performance applications." },
  { title: "Rapid development", description: "Our agile methodology and experienced team ensure quick turnaround times without compromising on quality." },
  { title: "A dedicated team", description: "Work with a team of passionate developers, designers, and project managers committed to your success." },
  { title: "On-time delivery", description: "We pride ourselves on meeting deadlines and delivering projects on schedule, every time." },
  { title: "Client-centric approach", description: "We build lasting relationships through transparent communication and exceptional support." },
];

export const PROCESS = [
  { title: "Discovery & Planning", share: 0.15, description: "We dive deep into your goals to create a clear, actionable roadmap. Our team aligns with your vision to ensure every step is purpose-driven." },
  { title: "Design & Development", share: 0.6, description: "Using modern frameworks, our developers build your solution with agile sprints, ensuring a transparent and flexible workflow from start to finish." },
  { title: "Testing & Deployment", share: 0.25, description: "Before launch, we rigorously test your product to ensure it's bug-free, secure, and ready for the world. We handle the deployment for a seamless transition." },
  { title: "Support & Iteration", share: 0, description: "Our partnership doesn't end at launch. We provide ongoing support, gather user feedback, and continuously improve the product based on real-world data." },
];

export const PROJECTS = [
  { id: 1, title: "The Cinematic Epicurean", category: "Culinary Experience", color: "#eab308", image: "/assets/img/work/1.webp", url: "/projects/epicurean/index.html",
    description: "A multisensory dining platform that treats every signature dish as a performance, blending the art of fine dining with cinematic storytelling." },
  { id: 2, title: "Kinetic Athletics", category: "Fitness & Performance", color: "#f97316", image: "/assets/img/work/2.webp", url: "/projects/kinetic/index.html",
    description: "Unleash the power of performance. A high-impact digital showcase for the next generation of athletic apparel and gear." },
  { id: 3, title: "Curator Architecture", category: "Global Landmarks", color: "#a8a29e", image: "/assets/img/work/3.webp", url: "/projects/architecture/index.html",
    description: "Crafting modern landmarks that redefine urban skylines. A dedicated showcase of architectural excellence and visionary design." },
  { id: 4, title: "The Obsidian Eterna", category: "Luxury Horology", color: "#d4af37", image: "/assets/img/work/4.webp", url: "/projects/horologe/index.html",
    description: "The peak of watchmaking where timeless craftsmanship meets avant-garde mechanical engineering and precision." },
  { id: 6, title: "Obsidian Velocity", category: "Performance Automotive", color: "#ef4444", image: "/assets/img/work/6.webp", url: "/projects/velocity/index.html",
    description: "Mastering the road with the apex of velocity. A premium digital showroom for high-performance vehicles designed for pure speed and elegance." },
  { id: 7, title: "Luminous Atelier", category: "Wellness & Skincare", color: "#ec4899", image: "/assets/img/work/7.webp", url: "/projects/luminous/index.html",
    description: "Radiance reimagined. A bespoke skincare and wellness platform focusing on pure, uncompromising luxury and scientific skin health for the modern soul." },
];

export const JOB_CATEGORIES = ["All", "Development", "Marketing", "Sales", "Designer"];

// `posted` feeds schema.org datePosted. Titles and slugs must be unique.
// A job without its own tallyFormId shows "applications open soon" instead of
// borrowing another role's form.
export const JOBS = [
  {
    title: "Lead Generator",
    slug: "lead-generator",
    location: "Remote",
    type: "Part-time",
    category: "Sales",
    posted: "2026-10-25",
    tallyFormId: "3jKg1R",
    description: "Identify and qualify leads through targeted outreach, research, and prospecting. Support the sales team by delivering high-quality, sales-ready opportunities.",
    fullDescription: `About the Role
We are looking for a motivated individual to help us grow SenXDev by researching and identifying potential clients. You'll be responsible for finding qualified leads in our target markets (USA, UK, Canada, Australia).

Responsibilities
- Research and collect contact details of potential clients.
- Identify businesses that may need software, web development, or AI automation services.
- Maintain lead lists in Google Sheets/CRM.
- Work closely with the sales team to pass on qualified leads.

Requirements
- Strong internet research skills.
- Basic understanding of LinkedIn, Google, and business directories.
- Self-motivated and detail-oriented.

Compensation
- Commission-based: earn per qualified lead or % commission if the lead converts into a client.
- Fully remote, flexible hours.`,
  },
  {
    title: "Sales Representative / Client Caller",
    slug: "sales-rep-client-caller",
    location: "Remote",
    type: "Full-time",
    category: "Sales",
    posted: "2026-10-25",
    tallyFormId: "3EpAjq",
    description: "Reach out to prospective clients, manage follow-ups, and close deals. Requires excellent communication skills, persistence, and a customer-first approach.",
    fullDescription: `About the Role
We are looking for someone with excellent communication skills to call and follow up with potential clients for SenXDev. You'll be the voice of our company, building trust and closing deals.

Responsibilities
- Call and follow up with leads provided.
- Present SenXDev's services (web development, software solutions, AI automation).
- Build relationships with potential clients and answer questions.
- Work with the team to close projects and contracts.

Requirements
- Strong English communication skills.
- Confident speaking over the phone or via Zoom.
- Sales or client communication experience is a plus.

Compensation
- Commission-based: earn % of each project you close.
- Fully remote, flexible working hours.`,
  },
];
