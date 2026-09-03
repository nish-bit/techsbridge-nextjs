export const company = {
  name: "TechsBridge",
  founder: "Nishant Ali",
  founderRole: "Web Developer | App Developer",
  email: "nishantali777@gmail.com",
  phone: "+91 70607 34295",
  phoneRaw: "917060734295",
  location: "New Delhi, India",
  linkedin: "https://www.linkedin.com/in/nishant-ali/",
  domain: "https://techsbridge.in",
  tagline:
    "Websites, web apps, AI solutions and startup products — built to grow businesses.",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const heroStats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "20+", label: "Happy Clients" },
  { value: "100%", label: "Client Satisfaction" },
];

export const trustedNote =
  "Illustrative examples for now — swapped in as real client work comes in.";
export const trustedLogos = [
  "Nimbus Retail",
  "Verve Realty",
  "Bright Path College",
  "Kalvi School Group",
  "Orbit Fintech",
  "Lumen Studio",
];

export const aboutStats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Learning & Building" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export const specialties = [
  "College Websites",
  "School ERP Systems",
  "Startup Websites",
  "Business Websites",
  "AI Applications",
  "Web Applications",
  "Dashboard Development",
  "Automation Solutions",
  "Landing Pages",
];

export type Service = {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: "browser" | "graduation" | "rocket" | "brain" | "chart" | "settings";
};

export const services: Service[] = [
  {
    number: "01",
    title: "Website Development",
    description:
      "High-performance, SEO-ready websites built to convert visitors into customers.",
    features: [
      "Corporate websites",
      "Business websites",
      "Landing pages",
      "Responsive development",
    ],
    icon: "browser",
  },
  {
    number: "02",
    title: "College Website Development",
    description:
      "Full institutional platforms that handle admissions and daily operations, not just marketing.",
    features: [
      "Admission portals",
      "Student dashboards",
      "Faculty management",
      "Notice boards & galleries",
    ],
    icon: "graduation",
  },
  {
    number: "03",
    title: "Startup MVP Development",
    description:
      "Get from idea to a working product fast, with room to scale once you find traction.",
    features: [
      "Rapid MVP builds",
      "Authentication",
      "Database & admin panel",
      "Payment integration",
    ],
    icon: "rocket",
  },
  {
    number: "04",
    title: "AI Development",
    description:
      "AI chatbots, agents and automation that plug into the way your business already works.",
    features: [
      "AI chatbots & agents",
      "Workflow automation",
      "Document AI",
      "API integrations",
    ],
    icon: "brain",
  },
  {
    number: "05",
    title: "Dashboard Development",
    description:
      "Dashboards that turn raw data into decisions your team can actually act on.",
    features: [
      "Analytics dashboards",
      "Power BI & DAX",
      "Admin panels",
      "Role-based access",
    ],
    icon: "chart",
  },
  {
    number: "06",
    title: "Website Maintenance",
    description:
      "Ongoing care so your site stays fast, secure and up to date after launch.",
    features: ["Hosting", "Updates & SEO", "Security", "Performance monitoring"],
    icon: "settings",
  },
];

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
  accent: string;
  caseStudy?: {
    role: string;
    problem: string;
    approach: string;
    result: string;
    stats: { n: string; l: string }[];
  };
};

export const projects: Project[] = [
  {
    id: "case1",
    category: "College Website",
    title: "College Admissions Platform",
    description:
      "A full college website with an admissions flow, live notices, and a faculty directory built for daily use.",
    tags: ["Next.js", "FastAPI", "MySQL"],
    features: ["Admissions", "Courses", "Faculty", "Gallery", "Notice Board"],
    accent: "#2b6cff",
    caseStudy: {
      role: "Illustrative project — College website client",
      problem:
        "Admissions ran entirely on paper forms and a shared inbox — applications got lost, staff had no visibility into where each student stood, and prospective students had no way to track their own status.",
      approach:
        "We built a Next.js front end with a FastAPI backend and a structured MySQL schema: an online application flow, a staff dashboard to track every applicant by stage, a public notice board, and a searchable faculty directory — all on one platform.",
      result:
        "Applications now flow into one system end to end, staff can see every applicant's status at a glance, and the admissions office no longer depends on a shared inbox to track who's applied.",
      stats: [
        { n: "100%", l: "Applications tracked in one place" },
        { n: "Zero", l: "Lost applications via shared inbox" },
        { n: "1 platform", l: "Replacing paper + spreadsheets" },
      ],
    },
  },
  {
    id: "case2",
    category: "SaaS Landing",
    title: "Startup SaaS Website",
    description:
      "A modern SaaS landing page with authentication, a live dashboard preview, and payments baked in.",
    tags: ["React", "Stripe", "Node.js"],
    features: ["Authentication", "Dashboard", "Payments", "Responsive"],
    accent: "#38bdf8",
    caseStudy: {
      role: "Illustrative project — Early-stage startup client",
      problem:
        "An early-stage startup needed a landing page that could actually convert visitors into signups, plus a working dashboard preview and payments — not just a marketing page.",
      approach:
        "We built a React front end with Stripe payments wired in, an authentication flow, and a live dashboard preview so visitors could see the product before signing up — all deployed on a Node.js backend.",
      result:
        "The startup launched with one cohesive experience — marketing site, signup, and payment collection — instead of stitching together separate tools.",
      stats: [
        { n: "1 stack", l: "Marketing + auth + payments" },
        { n: "Live", l: "Dashboard preview before signup" },
        { n: "Stripe", l: "Payments ready on day one" },
      ],
    },
  },
  {
    id: "case3",
    category: "School ERP",
    title: "School Management ERP",
    description:
      "A day-to-day operations system covering students, attendance, fees, and results in one place.",
    tags: ["FastAPI", "PostgreSQL", "Bootstrap"],
    features: ["Student Management", "Attendance", "Fees", "Results"],
    accent: "#2b6cff",
  },
  {
    id: "case4",
    category: "Business Site",
    title: "Business Company Profile",
    description:
      "A clean, conversion-focused company profile site with lead forms and local SEO built in.",
    tags: ["React", "Tailwind", "SEO"],
    features: ["Company Profile", "Contact Forms", "SEO"],
    accent: "#38bdf8",
  },
];

export const process = [
  {
    number: "01",
    title: "Requirement Discussion",
    description:
      "We start by understanding your business, your users, and what success actually looks like.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Wireframes and high-fidelity design that's shaped around your brand and your users' habits.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Clean, scalable code — built in the open with regular check-ins, not a black box.",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Cross-device, cross-browser QA so what ships works the same way everywhere.",
  },
  {
    number: "05",
    title: "Deployment",
    description:
      'Production deployment with monitoring and a rollback plan, not just a "push to live."',
  },
  {
    number: "06",
    title: "Support",
    description:
      "Ongoing support and updates after launch, so the product keeps working for you.",
  },
];

export const whyUs = [
  "Fast Delivery",
  "Modern UI",
  "SEO Friendly",
  "Mobile Responsive",
  "Affordable Pricing",
  "24/7 Support",
  "Scalable Architecture",
  "Latest Technologies",
];

export const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "MySQL",
  "MongoDB",
  "Firebase",
  "Supabase",
  "Docker",
  "GitHub",
  "Vercel",
  "Cloudflare",
];

export type PricingPlan = {
  name: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    subtitle: "Business sites & landing pages",
    price: "₹10,000",
    priceSuffix: "+",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic on-page SEO",
      "Contact form integration",
      "1 round of revisions",
      "7–10 day delivery",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Growth",
    subtitle: "Web apps, dashboards & portals",
    price: "₹75,000",
    priceSuffix: "+",
    features: [
      "Everything in Starter",
      "Custom web application",
      "Authentication & database",
      "Admin panel & dashboards",
      "3 rounds of revisions",
      "3–6 week delivery",
    ],
    cta: "Start with Growth",
    popular: true,
  },
  {
    name: "Custom",
    subtitle: "AI products, SaaS & ERP systems",
    price: "Custom",
    priceSuffix: "quote",
    features: [
      "Custom architecture & scalable backend",
      "AI agents & automation",
      "Dedicated project lead",
      "Ongoing maintenance plan",
      "Revisions scoped to project",
      "Timeline scoped to project",
    ],
    cta: "Let's talk",
  },
];

export const calculatorProjectTypes = [
  { label: "Landing Page", base: 10000 },
  { label: "Business Website", base: 20000 },
  { label: "Web Application", base: 60000 },
  { label: "AI Chatbot / Agent", base: 40000 },
  { label: "Startup MVP", base: 90000 },
  { label: "ERP / Dashboard System", base: 120000 },
];

export const calculatorFeatures = [
  { label: "Custom UI/UX Design", cost: 8000 },
  { label: "Admin Panel", cost: 15000 },
  { label: "Authentication & Database", cost: 12000 },
  { label: "Payment Integration", cost: 10000 },
  { label: "AI / Automation Features", cost: 25000 },
  { label: "Multi-language Support", cost: 8000 },
  { label: "SEO Optimization", cost: 6000 },
  { label: "Ongoing Maintenance (per month)", cost: 5000 },
];

export const testimonials = [
  {
    quote:
      "The website exceeded our expectations — clean design, fast pages, and it was ready well ahead of schedule.",
    name: "Anjali Mehra",
    role: "Founder, Illustrative SaaS Client",
  },
  {
    quote:
      "Professional team and fast delivery. Every revision was handled quickly and communication never felt like a chore.",
    name: "Rohan Kapoor",
    role: "Director, Illustrative College Client",
  },
  {
    quote:
      "Highly recommended. They understood our business first and only then started designing — it showed in the result.",
    name: "Sana Iqbal",
    role: "Owner, Illustrative Retail Client",
  },
];

export const faqs = [
  {
    q: "How much does a website cost?",
    a: "It depends on scope — a landing page and a full product with a custom backend cost very differently. Share your requirements in the contact form and we'll send a clear, itemized quote.",
  },
  {
    q: "How long does it take?",
    a: "Most landing pages and business websites take 1–3 weeks. Full applications with custom backends and AI features typically run 4–10 weeks depending on scope.",
  },
  {
    q: "Do you provide hosting?",
    a: "Yes — we can deploy and manage hosting for you, or hand off a production-ready build to your own infrastructure team.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. We can rebuild an existing site with a modern stack while preserving your content, SEO rankings, and brand identity.",
  },
  {
    q: "Do you build AI solutions?",
    a: "Yes — AI chatbots, agents, document processing, and automation are a core part of what we build, alongside standard web development.",
  },
];

export const budgetOptions = [
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "Above ₹2,00,000",
];

export const serviceOptions = services.map((s) => s.title);
