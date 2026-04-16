import type { Metadata } from "next";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

/* ─── SEO Metadata (Koray Formula) ─────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "LocalServices AE | 3,619+ Verified Home Services Across UAE",
  description:
    "LocalServices AE provides 3,619+ verified home services across all 7 UAE Emirates. Booking confirmation occurs in under 120 seconds, if the user completes the secure checkout. Book now.",
  alternates: { canonical: "https://localservices.ae" },
  openGraph: {
    title: "LocalServices AE | 3,619+ Verified Home Services Across UAE",
    description: "3,619+ verified home services. Instant booking in AED. All 7 UAE Emirates.",
    url: "https://localservices.ae",
    siteName: "LocalServices AE",
    type: "website",
  },
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const FEATURED_SERVICES = [
  {
    name: "Home Cleaning",
    slug: "home-cleaning",
    icon: "🧹",
    price: "AED 150",
    bookings: "12,400+",
    bullets: ["Verified background checks", "Same-day availability", "Fixed hourly rates"],
    altTag: "Professional cleaner sanitizing a residential apartment in Dubai, UAE",
  },
  {
    name: "AC Maintenance",
    slug: "ac-maintenance",
    icon: "❄️",
    price: "AED 120",
    bookings: "8,900+",
    bullets: ["Coil chemical cleaning", "Refrigerant top-ups", "Filter replacements"],
    altTag: "Certified AC technician performing duct cleaning in a Dubai villa, UAE",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    icon: "🔧",
    price: "AED 100",
    bookings: "6,200+",
    bullets: ["Leak detection", "Pipe replacement", "Emergency callouts"],
    altTag: "Certified plumber repairing a kitchen leak for a residential villa in Abu Dhabi, UAE",
  },
  {
    name: "Electrical",
    slug: "electrical",
    icon: "⚡",
    price: "AED 120",
    bookings: "5,400+",
    bullets: ["DEWA-approved engineers", "Fault diagnosis", "Installation"],
    altTag: "Licensed electrician installing wiring for an apartment in Sharjah, UAE",
  },
  {
    name: "Maid Services",
    slug: "maid-services",
    icon: "🏠",
    price: "AED 180",
    bookings: "9,800+",
    bullets: ["Part-time & full-time", "Background checked", "Insured professionals"],
    altTag: "Professional maid providing housekeeping services for a villa in Dubai, UAE",
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    icon: "🛡️",
    price: "AED 220",
    bookings: "4,200+",
    bullets: ["Municipality-approved", "Safe for children", "30-day guarantee"],
    altTag: "Pest control specialist treating a residential building in Abu Dhabi, UAE",
  },
  {
    name: "Handyman",
    slug: "handyman",
    icon: "🛠️",
    price: "AED 80",
    bookings: "7,600+",
    bullets: ["Furniture assembly", "Mounting & fixing", "General repairs"],
    altTag: "Handyman assembling furniture for a residential apartment in Dubai, UAE",
  },
  {
    name: "Landscaping",
    slug: "landscaping",
    icon: "🌿",
    price: "AED 200",
    bookings: "3,100+",
    bullets: ["Garden design", "Irrigation setup", "Regular maintenance"],
    altTag: "Landscaping specialist designing a garden for a villa in Sharjah, UAE",
  },
];

const EMIRATES = [
  { label: "Dubai", slug: "dubai", icon: "🏙️", services: "1,240" },
  { label: "Abu Dhabi", slug: "abu-dhabi", icon: "🕌", services: "890" },
  { label: "Sharjah", slug: "sharjah", icon: "🌆", services: "620" },
  { label: "Ajman", slug: "ajman", icon: "🏘️", services: "310" },
  { label: "Ras Al Khaimah", slug: "ras-al-khaimah", icon: "⛰️", services: "280" },
  { label: "Fujairah", slug: "fujairah", icon: "🌊", services: "160" },
  { label: "Umm Al Quwain", slug: "umm-al-quwain", icon: "🌴", services: "119" },
];

const TRUST_ENTITIES = [
  { name: "Dubai Economy", icon: "🏛️" },
  { name: "Stripe Payments", icon: "💳" },
  { name: "Emirates ID", icon: "🪪" },
  { name: "ADCB Bank", icon: "🏦" },
  { name: "Emirates NBD", icon: "🏦" },
  { name: "FAB Bank", icon: "🏦" },
  { name: "Dubai Government", icon: "🇦🇪" },
  { name: "MOHRE UAE", icon: "⚖️" },
];

const SAFETY_CARDS = [
  {
    icon: "🪪",
    title: "Identity & Criminal Vetting",
    points: [
      "Every provider passes an Emirates ID verification.",
      "Criminal record check conducted before onboarding.",
      "Trade licence validation for specialized services.",
    ],
  },
  {
    icon: "🛡️",
    title: "AED 10,000 Damage Insurance",
    points: [
      "Repairs are covered up to AED 10,000, if accidental damage occurs.",
      "Claims processed within 5 business days.",
      "Zero out-of-pocket costs for verified incidents.",
    ],
  },
  {
    icon: "✅",
    title: "7-Day Satisfaction Guarantee",
    points: [
      "Refund or re-service is guaranteed for 7 days.",
      "AED 20 booking fee stays in escrow until user confirms completion.",
      "4.8/5 average rating maintained across all providers.",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    icon: "🔍",
    title: "Search Services",
    desc: "Search across 3,619+ services by category or emirate. Filters include price, rating, and same-day availability.",
  },
  {
    step: "02",
    icon: "📅",
    title: "Book Instantly",
    desc: "Booking confirmation occurs in under 120 seconds. Select a verified provider, time slot, and pay securely in AED.",
  },
  {
    step: "03",
    icon: "✅",
    title: "Service Delivered",
    desc: "A verified professional arrives at the confirmed time. Track job status in real-time. AED 20 releases from escrow on completion.",
  },
];

const BLOG_POSTS = [
  {
    title: "AC Maintenance Reduces Monthly DEWA Bills by 20%",
    excerpt: "Regular AC maintenance increases system cooling efficiency by 25%. Certified technicians execute coil chemical cleaning and refrigerant top-ups to reduce utility costs.",
    category: "AC Maintenance",
    readTime: "4 min",
    icon: "❄️",
    iconBg: "from-cyan-500 to-blue-600",
  },
  {
    title: "Deep Cleaning Standards for Residential Properties in UAE",
    excerpt: "Professional cleaners utilize industrial-grade equipment, including HEPA-filter vacuums and steam cleaners, to eliminate 99.9% of indoor allergens.",
    category: "Cleaning",
    readTime: "5 min",
    icon: "🧹",
    iconBg: "from-green-500 to-teal-600",
  },
  {
    title: "Plumbing Emergency Response: What UAE Homeowners Must Know",
    excerpt: "Plumbing emergencies require response within 30 minutes to prevent structural damage. LocalServices AE delivers same-day certified plumbers across all 7 emirates.",
    category: "Plumbing",
    readTime: "3 min",
    icon: "🔧",
    iconBg: "from-indigo-500 to-purple-600",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard booking fee for LocalServices AE?",
    a: "AED 20 is the standard booking fee for all services. Funds remain in escrow until the user confirms job completion. No additional fees apply for standard bookings.",
  },
  {
    q: "How quickly does booking confirmation occur?",
    a: "Booking confirmation occurs in under 120 seconds, if the user completes the secure checkout. Same-day availability is confirmed for 94% of services across all 7 UAE emirates.",
  },
  {
    q: "Which vetting process do providers pass?",
    a: "Verified providers, including carpenters and HVAC engineers, pass Emirates ID verification, criminal record checks, and trade licence validation before onboarding.",
  },
  {
    q: "What insurance coverage applies to service delivery?",
    a: "Repairs are covered up to AED 10,000, if accidental damage occurs during a booked service. Claims are processed within 5 business days with zero out-of-pocket costs.",
  },
  {
    q: "How is the 7-day satisfaction guarantee enforced?",
    a: "Refund or re-service is guaranteed for 7 days. The customer support team initiates re-service scheduling within 4 business hours, if the user raises a complaint via the platform.",
  },
  {
    q: "Which payment methods does LocalServices AE accept?",
    a: "LocalServices AE accepts AED payments via Visa, Mastercard, and UAE bank transfers. All transactions use Stripe's UAE-compliant encrypted payment gateway.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Al Rashidi", emirate: "Dubai", service: "AC Maintenance", rating: 5,
    text: "AC Maintenance reduced my DEWA bill by 22% within one month. The certified technician performed coil cleaning and refrigerant top-up in 90 minutes.",
    initials: "AR", color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Fatima Al Zarooni", emirate: "Abu Dhabi", service: "Deep Cleaning", rating: 5,
    text: "Deep Cleaning sanitized my 4-bedroom villa using HEPA-filter vacuums. The team eliminated visible allergens in 3 hours with zero disruption.",
    initials: "FZ", color: "from-indigo-500 to-blue-400",
  },
  {
    name: "Ravi Sharma", emirate: "Sharjah", service: "Plumbing", rating: 5,
    text: "Plumbing services fixed a kitchen pipe leak the same afternoon. The certified plumber carried all replacement parts — no second visit needed.",
    initials: "RS", color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Layla Hassan", emirate: "Dubai", service: "Pest Control", rating: 5,
    text: "Pest Control eliminated a cockroach infestation using municipality-approved chemicals. Zero recurrence in 60 days — within the guaranteed period.",
    initials: "LH", color: "from-purple-500 to-blue-400",
  },
  {
    name: "Mohammed Al Qasimi", emirate: "Ras Al Khaimah", service: "Electrical", rating: 5,
    text: "Electrical installation was completed by a DEWA-approved engineer in 4 hours. All certification documents were provided on the same day.",
    initials: "MQ", color: "from-amber-500 to-orange-500",
  },
  {
    name: "Priya Nair", emirate: "Sharjah", service: "Maid Services", rating: 5,
    text: "Maid Services provides a background-checked professional every Tuesday. Booking confirmation occurs in under 2 minutes via the mobile app.",
    initials: "PN", color: "from-green-500 to-teal-500",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ══ S1: POWER HERO ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,98,255,0.18) 0%, transparent 70%), #081226" }}
        aria-label="Hero — Book verified home services across UAE"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-700/15 blur-[120px]" />
          <div className="absolute right-[5%] bottom-[15%] h-[280px] w-[280px] rounded-full bg-cyan-500/8 blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-5">

            {/* Left 60% */}
            <div className="lg:col-span-3">
              <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-white/5 px-5 py-2.5 text-sm text-blue-300 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-400 shrink-0 animate-pulse" />
                🇦🇪 Trusted by <strong className="mx-1">50,000+</strong> UAE Residents
              </div>

              {/* Reduced font size: clamp(2rem, 4.5vw, 3.75rem) */}
              <h1
                className="animate-fade-up anim-delay-1 mt-6 font-display font-extrabold leading-[1.08] tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                <strong>LocalServices AE</strong> provides{" "}
                <span className="gradient-text">3,619+</span> verified home services across{" "}
                <span className="gradient-text">all 7 Emirates</span>.
              </h1>

              <p className="animate-fade-up anim-delay-2 mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Booking confirmation occurs in under{" "}
                <strong className="text-white">120 seconds</strong>, if the user completes the secure AED checkout.
                Verified providers, including carpenters and DEWA-certified engineers, deliver results the same day.
              </p>

              <div className="animate-fade-up anim-delay-3 mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services/dubai"
                  className="btn-primary px-8 py-3.5 text-sm font-bold font-display"
                  aria-label="Browse all 3,619 home services across UAE"
                >
                  Browse All Services →
                </Link>
                <Link
                  href="/register?role=provider"
                  className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:border-[#0062FF]/50 hover:bg-white/10 transition-all duration-300"
                >
                  List Your Business
                </Link>
              </div>

              <div className="animate-fade-up anim-delay-4 mt-12 flex flex-wrap gap-8 sm:gap-12">
                {[
                  { value: "3,619+", label: "Verified Services" },
                  { value: "7", label: "Emirates" },
                  { value: "2,400+", label: "Vetted Providers" },
                  { value: "4.8★", label: "Avg Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold text-white font-display">{s.value}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 40% — Glassmorphism form */}
            <div className="animate-fade-up anim-delay-2 lg:col-span-2">
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                }}
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-300">Get a Quote in 2 Minutes</p>
                <h2 className="text-lg font-bold text-white font-display">Book Your Service</h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="hero-service" className="mb-1.5 block text-xs font-medium text-slate-300">Select Service</label>
                    <select
                      id="hero-service"
                      className="w-full rounded-xl border border-white/15 bg-[#0d1a3a] px-4 py-3 text-sm text-white focus:border-[#0062FF]/60 focus:outline-none focus:ring-2 focus:ring-[#0062FF]/25 transition-all"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-slate-400">AC Maintenance, Cleaning…</option>
                      <option value="cleaning">Home Cleaning — from AED 150</option>
                      <option value="ac">AC Maintenance — from AED 120</option>
                      <option value="plumbing">Plumbing — from AED 100</option>
                      <option value="electrical">Electrical — from AED 120</option>
                      <option value="handyman">Handyman — from AED 80</option>
                      <option value="pest">Pest Control — from AED 220</option>
                      <option value="maid">Maid Services — from AED 180</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hero-area" className="mb-1.5 block text-xs font-medium text-slate-300">Your Emirate</label>
                    <select
                      id="hero-area"
                      className="w-full rounded-xl border border-white/15 bg-[#0d1a3a] px-4 py-3 text-sm text-white focus:border-[#0062FF]/60 focus:outline-none focus:ring-2 focus:ring-[#0062FF]/25 transition-all"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-slate-400">Dubai, Abu Dhabi…</option>
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                      <option>Ajman</option>
                      <option>Ras Al Khaimah</option>
                      <option>Fujairah</option>
                      <option>Umm Al Quwain</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hero-whatsapp" className="mb-1.5 block text-xs font-medium text-slate-300">WhatsApp Number</label>
                    <input
                      id="hero-whatsapp"
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#0062FF]/60 focus:outline-none transition-all"
                    />
                  </div>

                  <Link
                    href="/services/dubai"
                    className="btn-primary block w-full py-3.5 text-center text-sm font-bold font-display"
                  >
                    Get Instant Booking →
                  </Link>
                </div>

                <p className="mt-3 text-center text-[11px] text-slate-500">
                  🔒 Secure AED payment · AED 20 fee held in escrow
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ S2: TRUST RIBBON ════════════════════════════════════════════════════ */}
      <section className="section-ghost border-y py-8" style={{ borderColor: "#E2E8F0" }} aria-label="Trusted by UAE institutions">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "#94A3B8" }}>
          Trusted &amp; Integrated With UAE's Leading Institutions
        </p>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...TRUST_ENTITIES, ...TRUST_ENTITIES].map((entity, i) => (
              <div key={i} className="trust-logo" aria-label={entity.name}>
                <span className="text-xl">{entity.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "#334155" }}>{entity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S3: EMIRATES HUB ════════════════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="Browse services by UAE Emirate">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">All 7 UAE Emirates</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Home Services Across Every Emirate</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#64748B" }}>
              <strong>LocalServices AE delivers verified professionals</strong> to all 7 UAE emirates — from Dubai to Umm Al Quwain.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {EMIRATES.map((emirate) => (
              <Link
                key={emirate.slug}
                href={`/services/${emirate.slug}`}
                className="emirate-card"
                aria-label={`Browse ${emirate.services} services in ${emirate.label}`}
              >
                <span className="emirate-icon text-4xl" role="img" aria-label={`${emirate.label} services icon`}>{emirate.icon}</span>
                <p className="text-sm font-bold" style={{ color: "#0F1923" }}>{emirate.label}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{emirate.services} services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S4: MAIN SERVICES GRID ══════════════════════════════════════════════ */}
      <section className="section-slate py-16 sm:py-20" aria-label="Popular home services in UAE">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Most Booked</p>
              <h2 className="section-h2-dark mt-2 text-fluid-h2">Professional Home Services in UAE</h2>
            </div>
            <Link href="/services/dubai" className="shrink-0 text-sm font-semibold hover:underline" style={{ color: "#0062FF" }}>
              View all 3,619 services →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_SERVICES.map((service) => (
              <div key={service.slug} className="service-card flex flex-col">
                {/* Card body — centered icon + title */}
                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <span
                    className="card-icon text-5xl"
                    role="img"
                    aria-label={service.altTag}
                  >
                    {service.icon}
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug font-display" style={{ color: "#0F1923" }}>
                    {service.name} Services in UAE
                  </h3>
                  <p className="mt-1 text-sm font-bold" style={{ color: "#0062FF" }}>
                    From {service.price}
                  </p>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>{service.bookings} bookings</p>

                  <ul className="mt-4 w-full space-y-1.5 text-left">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs" style={{ color: "#475569" }}>
                        <span className="mt-0.5 text-[#0062FF] shrink-0 font-bold">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Proper Book Now CTA button */}
                <div className="px-5 pb-5">
                  <Link
                    href={`/services/${service.slug}`}
                    className="block w-full rounded-xl py-2.5 text-center text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#0062FF", boxShadow: "0 4px 14px rgba(0,98,255,0.3)" }}
                    aria-label={`Book ${service.name} services — from ${service.price}`}
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S5: SEASONAL ESSENTIALS ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ background: "linear-gradient(135deg, #081226 0%, #0d2255 50%, #0062FF 100%)" }}
        aria-label="Summer AC Maintenance special"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.07)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                ☀️ Summer Special — Peak Season Priority Booking
              </span>
              <h2 className="mt-5 text-fluid-h2 font-extrabold leading-tight text-white font-display">
                AC Deep Cleaning Prevents System Failures During Peak Summer Months
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100">
                <strong>AC maintenance increases system cooling efficiency by 25%.</strong> Certified technicians execute coil chemical cleaning and refrigerant top-ups to reduce monthly DEWA costs. Optimal airflow remains constant, if regular servicing occurs every 4 months.
              </p>
              <ul className="mt-5 space-y-2.5">
                {["Coil sanitization & chemical wash", "Gas top-up & refrigerant recharge", "Filter replacements & duct cleaning"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/services/ac-maintenance" className="btn-ripple inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold transition-all hover:shadow-xl" style={{ color: "#0062FF" }}>
                  Book Summer Special ☀️
                </Link>
                <Link href="/services/ac-maintenance" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                  View AC Services →
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full sm:h-80 sm:w-80" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span className="text-8xl" role="img" aria-label="AC maintenance icon">❄️</span>
                <div className="absolute -right-3 -top-3 rounded-2xl px-3.5 py-2 text-xs font-bold text-white" style={{ background: "rgba(0,98,255,0.65)", backdropFilter: "blur(8px)" }}>25% More Efficient</div>
                <div className="absolute -bottom-3 -left-3 rounded-2xl px-3.5 py-2 text-xs font-bold text-white" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>Same-day Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S6: LIVE IMPACT COUNTER ══════════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="LocalServices AE statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label">Live Impact</p>
          <h2 className="section-h2-dark mt-3 text-fluid-h2">Numbers That Demonstrate Trust</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#64748B" }}>
            <strong>LocalServices AE processes verified booking data in real time</strong> across all 7 UAE emirates.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              { target: 50000, suffix: "+", label: "Happy Residents", icon: "😊", desc: "Verified bookings completed" },
              { target: 2400, suffix: "+", label: "Verified Providers", icon: "✅", desc: "Background-checked professionals" },
              { target: 0, suffix: "", label: "Average Rating", icon: "⭐", desc: "Across 50,000+ reviews", isRating: true },
              { target: 100, suffix: "%", label: "Secure AED Payments", icon: "🔒", desc: "Stripe UAE-compliant gateway" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center rounded-2xl py-8 px-4" style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}>
                <span className="text-4xl">{stat.icon}</span>
                <p className="mt-4 text-3xl font-extrabold font-display sm:text-4xl" style={{ color: "#0062FF" }}>
                  {stat.isRating ? "4.8★" : (
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2000} />
                  )}
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: "#0F1923" }}>{stat.label}</p>
                <p className="mt-1 text-xs" style={{ color: "#64748B" }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S7: SAFETY GOLD STANDARD ════════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="LocalServices AE safety standards">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">The Safety Gold Standard</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Every Booking Is Fully Protected</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "#64748B" }}>
              <strong>LocalServices AE enforces industry-leading security standards</strong> for all provider onboarding, service delivery, and payment processing.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {SAFETY_CARDS.map((card) => (
              <div key={card.title} className="safety-card">
                <span className="text-4xl">{card.icon}</span>
                <h3 className="mt-4 text-lg font-bold font-display" style={{ color: "#0F1923" }}>{card.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: "#475569" }}>
                      <span className="mt-0.5 shrink-0 text-[#0062FF] font-bold">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S8: 3-STEP PROCESS ══════════════════════════════════════════════════ */}
      <section className="section-slate py-16 sm:py-20" aria-label="How to book on LocalServices AE">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Simple Process</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Book Your Home Service in 3 Steps</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#64748B" }}>
              <strong>Booking confirmation occurs in under 120 seconds.</strong> Verified providers across all UAE emirates receive and confirm in real time.
            </p>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-1/2 top-8 hidden h-0.5 -translate-x-1/2 sm:block" style={{ width: "56%", background: "linear-gradient(to right, #0062FF, #4F46E5)" }} />
            <div className="grid gap-8 sm:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <div key={step.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: "#0062FF", boxShadow: "0 8px 24px rgba(0,98,255,0.35)" }}>
                    <span role="img" aria-hidden="true">{step.icon}</span>
                  </div>
                  <div className="mt-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: "#0047CC" }}>
                    {step.step}
                  </div>
                  <h3 className="mt-5 text-lg font-bold font-display" style={{ color: "#0F1923" }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ S9: WHO WE ARE ══════════════════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="About LocalServices AE">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-label">Who We Are</p>
              <h2 className="section-h2-dark mt-3 text-fluid-h2">LocalServices AE Facilitates Home Maintenance Logistics for UAE Homeowners</h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: "#475569" }}>
                <strong>The platform optimizes service delivery</strong> by connecting users with highly-skilled specialists, such as HVAC engineers and master plumbers, across all 7 UAE emirates. Maintenance records, such as invoice history and technician notes, remain accessible for 24 months.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#475569" }}>
                LocalServices AE launched with <strong>200 services in Dubai in 2023</strong>. The platform expanded to all 7 emirates within 6 months, reaching 3,619 services and 50,000+ completed bookings.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary px-7 py-3 text-sm font-bold">Join as Customer →</Link>
                <Link href="/about" className="rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:border-[#0062FF] hover:text-[#0062FF]" style={{ borderColor: "#E2E8F0", color: "#475569" }}>
                  Read Our Story
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Ahmed Al Rashidi", role: "Co-Founder & CEO", initials: "AR", color: "from-blue-500 to-cyan-400" },
                { name: "Layla Hassan", role: "Co-Founder & CTO", initials: "LH", color: "from-indigo-500 to-blue-400" },
                { name: "Omar Khalid", role: "Head of Operations", initials: "OK", color: "from-cyan-500 to-blue-500" },
                { name: "Priya Sharma", role: "Head of Product", initials: "PS", color: "from-purple-500 to-blue-400" },
              ].map((member) => (
                <div key={member.name} className="bento-card flex flex-col items-center text-center">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${member.color} text-lg font-black text-white`}>{member.initials}</div>
                  <p className="mt-3 text-sm font-bold font-display" style={{ color: "#0F1923" }}>{member.name}</p>
                  <p className="text-xs" style={{ color: "#0062FF" }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ S10: TESTIMONIALS CAROUSEL ══════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="Customer reviews for LocalServices AE">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Customer Reviews</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">What UAE Residents Say</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: "#64748B" }}>
              <strong>4.8/5 average rating across 50,000+ verified service bookings.</strong> Reviews are collected post-completion and cannot be edited.
            </p>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ══ S11: KNOWLEDGE HUB ══════════════════════════════════════════════════ */}
      <section className="section-slate py-16 sm:py-20" aria-label="SEO knowledge hub for UAE home services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Knowledge Hub</p>
              <h2 className="section-h2-dark mt-2 text-fluid-h2">Expert Guides for UAE Homeowners</h2>
            </div>
            <Link href="/services/dubai" className="shrink-0 text-sm font-semibold hover:underline" style={{ color: "#0062FF" }}>
              All Articles →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="blog-card">
                <div className="blog-img-wrap">
                  <div
                    className={`blog-img flex items-center justify-center text-6xl bg-gradient-to-br ${post.iconBg}`}
                    role="img"
                    aria-label={`${post.category} guide icon for UAE homeowners`}
                  >
                    {post.icon}
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(0,98,255,0.08)", color: "#0062FF" }}>{post.category}</span>
                  <h3 className="mt-3 text-base font-bold leading-snug font-display" style={{ color: "#0F1923" }}>{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed line-clamp-3" style={{ color: "#64748B" }}>{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{post.readTime} read</span>
                    <Link href="/services/dubai" className="text-xs font-semibold hover:underline" style={{ color: "#0062FF" }}>Read More →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S12: FAQ ════════════════════════════════════════════════════════════ */}
      <section className="section-ghost py-16 sm:py-20" aria-label="FAQ about LocalServices AE bookings">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Direct Answers to Common Questions</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#64748B" }}>
              <strong>AED 20 is the standard booking fee for all services.</strong> Funds remain in escrow until the user confirms job completion.
            </p>
          </div>

          {/* Premium numbered FAQ — modern design */}
          <div className="mt-12 space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <details key={faq.q} className="faq-item group">
                <summary className="faq-summary">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
                      style={{ background: "#0062FF" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "#0F1923" }}>{faq.q}</span>
                  </div>
                  <svg className="faq-chevron shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="faq-body" style={{ paddingLeft: "calc(1.5rem + 1.75rem + 0.5rem)" }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S13: GRAND CTA ══════════════════════════════════════════════════════ */}
      <section className="section-brand relative overflow-hidden py-20 sm:py-24" aria-label="Get started with LocalServices AE">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-semibold text-white">
            ⚡ New User Offer — Zero Booking Fee for First Service
          </span>
          <h2 className="mt-6 font-extrabold leading-tight text-white font-display" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)" }}>
            Ready to Simplify Your Home Life?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Join <strong>50,000 residents</strong> using LocalServices AE. Verified providers, including HVAC engineers and master plumbers, deliver results the same day across all 7 UAE Emirates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="btn-ripple inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-bold transition-all hover:shadow-2xl" style={{ color: "#0062FF" }}>
              Get Started Free →
            </Link>
            <Link href="/services/dubai" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-9 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              Browse Services
            </Link>
          </div>
          <p className="mt-5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            🔒 No credit card required · AED payments only · Cancel anytime
          </p>
        </div>
      </section>

    </div>
  );
}
