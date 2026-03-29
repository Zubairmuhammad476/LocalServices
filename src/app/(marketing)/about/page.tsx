import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About LocalServices AE — UAE's Trusted Home Services Marketplace",
  description:
    "Learn about LocalServices AE — our mission to connect UAE residents with verified, professional home service providers across all 7 emirates.",
};

const STATS = [
  { value: "3,619+", label: "Services Listed", icon: "🎯" },
  { value: "7", label: "Emirates Covered", icon: "🇦🇪" },
  { value: "2,400+", label: "Verified Providers", icon: "✅" },
  { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
];

const TEAM = [
  {
    name: "Ahmed Al Rashidi",
    role: "Co-Founder & CEO",
    bio: "Former VP at Careem with 12+ years building UAE tech platforms.",
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
    bio: "10 years in UAE service industry. Obsessed with quality and provider success.",
    initials: "OK",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "UX expert. Former Noon.com product lead. Customer experience evangelist.",
    initials: "PS",
    color: "from-purple-500 to-blue-400",
  },
];

const VALUES = [
  {
    icon: "🛡️",
    title: "Trust & Transparency",
    desc: "Every provider on our platform is background-checked, licensed, and verified. We never compromise on safety.",
  },
  {
    icon: "⚡",
    title: "Speed & Reliability",
    desc: "Same-day service availability. Real-time booking confirmations. No waiting, no guessing.",
  },
  {
    icon: "💎",
    title: "Quality First",
    desc: "Providers maintain a minimum 4.5-star rating. Every job comes with our satisfaction guarantee.",
  },
  {
    icon: "🌍",
    title: "Local Expertise",
    desc: "Built specifically for UAE culture, language, and regulations. We understand your home.",
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    desc: "Transparent AED pricing. No hidden fees. Compare quotes and choose what works for you.",
  },
  {
    icon: "🤝",
    title: "Community Impact",
    desc: "Supporting 2,400+ small businesses and service professionals to grow their careers in UAE.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 text-xs font-medium text-blue-300">
            🇦🇪 Proudly UAE-Built
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            Connecting UAE Homes
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              With Trusted Professionals
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            LocalServices AE was born from a simple frustration — finding reliable home services in Dubai shouldn't be hard. We built the platform we wished existed.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-blue-500/10 bg-gradient-to-r from-[#0d1530]/50 to-[#0a1628]/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl">{stat.icon}</div>
                <p className="mt-2 text-4xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Our Story</span>
            <h2 className="mt-3 text-4xl font-bold text-white leading-tight">
              Started in a Dubai Apartment,&nbsp;
              <span className="gradient-text">Built for All of UAE</span>
            </h2>
            <p className="mt-6 text-slate-300 leading-relaxed">
              In 2023, our founders spent weeks trying to find a reliable AC technician before Ramadan. After three no-shows and two overpriced quotes, they decided to build a better solution.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              LocalServices AE launched with 200 services and 50 providers in Dubai. Within 6 months, we expanded to all 7 emirates and built the UAE&apos;s most comprehensive service marketplace — 3,619 services, 2,400+ providers, and tens of thousands of happy customers.
            </p>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Today, we help UAE residents book everything from apartment deep cleaning to commercial fit-outs, all in one trusted platform built with UAE regulations, culture, and values in mind.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/register" className="btn-primary px-6 py-3 text-sm">
                Join as Customer →
              </Link>
              <Link href="/register?role=provider" className="rounded-full border border-blue-500/30 px-6 py-3 text-sm font-semibold text-blue-300 hover:border-blue-500/60 hover:text-blue-200 transition-all">
                Become a Provider
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: "2023", event: "Founded in Dubai" },
              { year: "Q2 2023", event: "200 providers onboarded" },
              { year: "Q4 2023", event: "All 7 emirates live" },
              { year: "2024", event: "50k bookings milestone" },
              { year: "Q2 2024", event: "AED payments launched" },
              { year: "2025", event: "3,619 services live" },
            ].map(({ year, event }) => (
              <div key={year} className="glass-card p-4">
                <p className="text-xs font-semibold text-blue-400">{year}</p>
                <p className="mt-1 text-sm text-white">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-transparent to-[#06111f] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">What We Stand For</span>
            <h2 className="mt-3 text-4xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="glass-card p-7 group">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">The People</span>
          <h2 className="mt-3 text-4xl font-bold text-white">Leadership Team</h2>
          <p className="mt-3 text-slate-400">Experienced operators who have built and scaled UAE tech companies.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="glass-card p-6 text-center">
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-2xl font-black text-white shadow-lg`}>
                {member.initials}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{member.name}</h3>
              <p className="text-xs font-medium text-blue-400">{member.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 to-[#0d2050] p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
          <h2 className="relative text-4xl font-bold text-white">
            Ready to Book Your First Service?
          </h2>
          <p className="relative mt-3 text-slate-300">Join thousands of satisfied UAE residents.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/services/dubai" className="btn-primary px-8 py-3">Browse Services →</Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
