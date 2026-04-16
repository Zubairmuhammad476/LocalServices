import type { Metadata } from "next";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  entity: "About LocalServices AE",
  location: "UAE",
  numericValue: "3,619+ Verified Services",
  factStatement: "LocalServices AE facilitates home maintenance logistics for UAE homeowners by connecting users with verified specialists, such as HVAC engineers and master plumbers.",
  ifStatement: "Booking confirmation occurs in under 120 seconds, if the user completes the secure AED checkout.",
  cta: "Learn how LocalServices AE operates across all 7 UAE emirates.",
  canonical: "https://localservices.ae/about",
});

const STATS = [
  { value: "3,619+", label: "Services Listed", icon: "🎯" },
  { value: "7", label: "Emirates Covered", icon: "🇦🇪" },
  { value: "2,400+", label: "Verified Providers", icon: "✅" },
  { value: "4.8★", label: "Average Service Rating", icon: "⭐" },
];

const TEAM = [
  {
    name: "Ahmed Al Rashidi",
    role: "Co-Founder & CEO",
    bio: "Former VP at Careem with 12+ years building UAE tech platforms. Led growth from 0 to 50k users.",
    initials: "AR",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Layla Hassan",
    role: "Co-Founder & CTO",
    bio: "Ex-Google engineer. Stanford CS graduate. Built scalable systems for 10M+ users.",
    initials: "LH",
    color: "from-indigo-500 to-blue-400",
  },
  {
    name: "Omar Khalid",
    role: "Head of Operations",
    bio: "10 years in the UAE service industry. Obsessed with quality and provider success metrics.",
    initials: "OK",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "UX specialist. Former Noon.com product lead. Drives zero-friction booking experiences.",
    initials: "PS",
    color: "from-purple-500 to-blue-400",
  },
];

const VALUES = [
  {
    icon: "🛡️",
    title: "Trust & Transparency",
    desc: "Every provider on the platform passes an Emirates ID verification and criminal record check. Vetting occurs before any provider accesses the platform.",
  },
  {
    icon: "⚡",
    title: "Speed & Reliability",
    desc: "Same-day service availability operates across all 7 emirates. Booking confirmations reach users in under 120 seconds.",
  },
  {
    icon: "💎",
    title: "Quality Standards",
    desc: "Providers maintain a minimum 4.5-star rating to remain active on the platform. Refund or re-service is guaranteed for 7 days.",
  },
  {
    icon: "🌍",
    title: "Local Expertise",
    desc: "LocalServices AE is built specifically for UAE culture, regulations, and residential requirements across all 7 emirates.",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "Pricing is displayed in AED before booking confirmation. AED 20 booking fee stays in escrow until the user confirms job completion.",
  },
  {
    icon: "🤝",
    title: "Community Impact",
    desc: "LocalServices AE supports 2,400+ small businesses and service professionals to grow their careers and revenue in the UAE.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: "#081226" }}
        aria-label="About LocalServices AE"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,98,255,0.2)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-900/20 px-4 py-1.5 text-xs font-semibold text-blue-300">
            🇦🇪 Proudly UAE-Built
          </span>
          <h1 className="mt-7 text-5xl font-extrabold leading-tight text-white sm:text-6xl font-display">
            LocalServices AE Connects UAE Homes With{" "}
            <span className="gradient-text">Trusted Professionals</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
            <strong>LocalServices AE facilitates home maintenance logistics</strong> for UAE homeowners. The platform optimizes service delivery by connecting users with highly-skilled specialists, such as HVAC engineers and master plumbers, across all 7 UAE emirates.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section
        className="border-y py-12"
        style={{ background: "linear-gradient(90deg, rgba(13,21,48,0.5) 0%, rgba(10,22,40,0.5) 100%)", borderColor: "rgba(0,98,255,0.12)" }}
        aria-label="LocalServices AE platform statistics"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center" role="figure" aria-label={`${stat.value} ${stat.label}`}>
                <div className="text-3xl" aria-hidden="true">{stat.icon}</div>
                <p className="mt-2 text-4xl font-extrabold text-white font-display">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-ghost py-24 sm:py-28" aria-label="The LocalServices AE founding story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="section-h2-dark mt-3 text-fluid-h2">
                Founded in Dubai. Operating Across All 7 UAE Emirates.
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: "#475569" }}>
                <strong>LocalServices AE launched with 200 services and 50 providers in Dubai in 2023.</strong> The founders identified a systemic gap: reliable residential service professionals, including AC technicians and licensed plumbers, were inaccessible through a single trusted platform.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#475569" }}>
                Within 6 months, the platform expanded to all 7 UAE emirates and built the UAE's most comprehensive service marketplace — 3,619 services, 2,400+ verified providers, and 50,000+ completed bookings by 2025. Maintenance records, such as invoice history and technician notes, remain accessible in the user dashboard for 24 months.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/register" className="btn-primary px-7 py-3 text-sm font-bold" aria-label="Join LocalServices AE as a customer">
                  Join as Customer →
                </Link>
                <Link
                  href="/register?role=provider"
                  className="rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:border-[#0062FF] hover:text-[#0062FF]"
                  style={{ borderColor: "#E2E8F0", color: "#475569" }}
                  aria-label="Register as a service provider on LocalServices AE"
                >
                  Become a Provider
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: "2023", event: "Founded in Dubai" },
                { year: "Q2 2023", event: "200 providers onboarded" },
                { year: "Q4 2023", event: "All 7 emirates live" },
                { year: "2024", event: "50,000 bookings milestone" },
                { year: "Q2 2024", event: "AED payments launched via Stripe" },
                { year: "2025", event: "3,619 services live" },
              ].map(({ year, event }) => (
                <div key={year} className="bento-card">
                  <p className="text-xs font-bold" style={{ color: "#0062FF" }}>{year}</p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "#0F1923" }}>{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-slate py-24 sm:py-28" aria-label="LocalServices AE core values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">What We Stand For</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Core Operational Standards</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="safety-card" role="article" aria-label={v.title}>
                <span className="text-3xl" aria-hidden="true">{v.icon}</span>
                <h3 className="mt-3 text-lg font-bold font-display" style={{ color: "#0F1923" }}>{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-ghost py-24 sm:py-28" aria-label="LocalServices AE leadership team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">The People</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Leadership Team</h2>
            <p className="mt-3 text-sm" style={{ color: "#64748B" }}>
              Experienced operators who have built and scaled UAE tech companies serving millions of users.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="bento-card text-center" role="article" aria-label={`${member.name}, ${member.role}`}>
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-2xl font-black text-white shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="mt-4 text-base font-bold font-display" style={{ color: "#0F1923" }}>{member.name}</h3>
                <p className="text-xs font-semibold" style={{ color: "#0062FF" }}>{member.role}</p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "#64748B" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-brand relative overflow-hidden py-24" aria-label="Get started with LocalServices AE">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white font-display">Ready to Book Your First Service?</h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            Join thousands of satisfied UAE residents. Verified providers deliver results the same day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/services/dubai" className="btn-ripple inline-block rounded-full bg-white px-9 py-4 text-sm font-bold hover:shadow-xl transition-all" style={{ color: "#0062FF" }}>
              Browse Services →
            </Link>
            <Link href="/contact" className="inline-block rounded-full border-2 border-white/35 px-9 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
