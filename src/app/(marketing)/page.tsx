import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LocalServices AE — Book Trusted Home Services Across the UAE",
  description:
    "Book cleaning, AC repair, plumbing, electrical, and 3,600+ more verified home services across Dubai, Abu Dhabi, Sharjah, and all UAE emirates. Instant booking in AED.",
  alternates: { canonical: "https://localservices.ae" },
  openGraph: {
    title: "LocalServices AE — UAE's #1 Home Services Marketplace",
    description: "3,619+ services. Verified providers. AED payments. All 7 UAE emirates.",
    url: "https://localservices.ae",
    siteName: "LocalServices AE",
    type: "website",
  },
};

const FEATURED_SERVICES = [
  { name: "Home Cleaning", slug: "home-cleaning", icon: "🧹", price: "From AED 150", bookings: "12,400+" },
  { name: "AC Maintenance", slug: "ac-maintenance", icon: "❄️", price: "From AED 120", bookings: "8,900+" },
  { name: "Plumbing", slug: "plumbing", icon: "🔧", price: "From AED 100", bookings: "6,200+" },
  { name: "Electrical", slug: "electrical", icon: "⚡", price: "From AED 120", bookings: "5,400+" },
  { name: "Landscaping", slug: "landscaping", icon: "🌿", price: "From AED 200", bookings: "3,100+" },
  { name: "Maid Services", slug: "maid-services", icon: "🏠", price: "From AED 180", bookings: "9,800+" },
  { name: "Pest Control", slug: "pest-control", icon: "🛡️", price: "From AED 220", bookings: "4,200+" },
  { name: "Handyman", slug: "handyman", icon: "🛠️", price: "From AED 80", bookings: "7,600+" },
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

const TRUST_BADGES = [
  { icon: "✅", label: "Background Checked", desc: "Every provider verified" },
  { icon: "🔒", label: "Secure Payments", desc: "AED via encrypted checkout" },
  { icon: "⭐", label: "4.8 Avg Rating", desc: "Across 50,000+ reviews" },
  { icon: "🔄", label: "Satisfaction Guarantee", desc: "Free re-service or refund" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse Services",
    desc: "Search across 3,600+ services by category or emirate. Filter by price, rating, and availability.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Instant Booking",
    desc: "Select your preferred provider and time slot. Confirm in under 2 minutes. Pay securely in AED.",
    icon: "⚡",
  },
  {
    step: "03",
    title: "Service Delivered",
    desc: "Your verified professional arrives on time. Track job status in real-time. Rate when complete.",
    icon: "🎯",
  },
];

const STATS = [
  { value: "3,619+", label: "Services Available" },
  { value: "7", label: "Emirates Covered" },
  { value: "2,400+", label: "Verified Providers" },
  { value: "50k+", label: "Happy Customers" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-24">
        {/* Background mesh */}
        <div className="pointer-events-none absolute inset-0 mesh-bg" />
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-800/20 blur-[130px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />

        <div className="relative z-10 max-w-5xl text-center">
          {/* Pill badge */}
          <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-900/50 to-cyan-900/30 px-5 py-2 text-sm text-blue-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-400 shrink-0" />
            🇦🇪 Trusted by 50,000+ UAE Residents
          </div>

          <h1 className="mt-8 font-display text-fluid-h1 font-extrabold leading-[1.05] tracking-tight">
            Book Trusted
            <br />
            <span className="gradient-text">Home Services</span>
            <br />
            Across UAE
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-fluid-body text-slate-300">
            3,619+ verified services. Background-checked providers. Instant booking in AED. Same-day availability across all 7 emirates.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/services/dubai" className="btn-primary text-base px-8 py-4 glow-blue">
              Browse All Services →
            </Link>
            <Link href="/register?role=provider" className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-blue-500/40 hover:bg-white/8 transition-all duration-300">
              List Your Business
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-extrabold text-white sm:text-5xl">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ────────────────────────────────────────────────────── */}
      <section className="border-y border-blue-500/10 bg-gradient-to-r from-[#0d1530]/60 via-[#0a1628]/60 to-[#0d1530]/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-left">
                <span className="flex-shrink-0 text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{badge.label}</p>
                  <p className="text-xs text-slate-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Services ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Most Booked</span>
            <h2 className="mt-2 text-fluid-h2 font-bold text-white">Popular Services</h2>
          </div>
          <Link href="/services/dubai" className="hidden text-sm font-medium text-blue-400 hover:text-blue-300 sm:block">
            View all 3,619 services →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURED_SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="glass-card group flex flex-col gap-4 p-6"
            >
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {service.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-cyan-400">{service.price}</p>
                <p className="text-xs text-slate-500">{service.bookings} bookings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────────── */}
      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1530]/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Simple Process</span>
            <h2 className="mt-2 text-fluid-h2 font-bold text-white">Book in 3 Steps</h2>
            <p className="mt-3 text-slate-400">From browse to booked — in under 2 minutes.</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative glass-card p-8 text-center">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-6 translate-x-6 -translate-y-1/2 bg-gradient-to-r from-blue-500/50 to-transparent sm:block" />
                )}
                <span className="text-4xl">{step.icon}</span>
                <div className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-xs font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Browse by Emirate ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">All UAE</span>
            <h2 className="mt-2 text-fluid-h2 font-bold text-white">Browse by Emirate</h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {EMIRATES.map((emirate) => (
            <Link
              key={emirate.slug}
              href={`/services/${emirate.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-all hover:border-blue-500/40 hover:bg-blue-900/10 hover:-translate-y-1 duration-300"
            >
              <span className="text-3xl">{emirate.icon}</span>
              <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{emirate.label}</p>
              <p className="text-xs text-slate-500">{emirate.services} services</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/70 via-[#0d2565]/80 to-cyan-900/50 p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-blue-600/10 to-transparent" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-900/30 px-4 py-1.5 text-xs text-cyan-300">
              ⚡ Limited Time — Free Booking Fee for New Users
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
              Your Home, Taken Care Of
            </h2>
            <p className="mt-3 text-lg text-slate-300">
              Join 50,000+ UAE residents who trust LocalServices AE.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-primary px-8 py-4 text-base glow-blue">
                Get Started Free →
              </Link>
              <Link href="/services/dubai" className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
