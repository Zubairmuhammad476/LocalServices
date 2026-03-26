import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LocalServices AE — Book Home & Professional Services in UAE",
  description:
    "Book trusted home services, cleaning, AC repair, plumbing, beauty, healthcare and more across Dubai, Abu Dhabi, Sharjah, and all UAE emirates. Verified providers, AED payments.",
  alternates: { canonical: "https://localservices.ae" },
  openGraph: {
    title: "LocalServices AE — Book Home & Professional Services in UAE",
    description: "Trusted home services across all UAE emirates.",
    url: "https://localservices.ae",
    siteName: "LocalServices AE",
    type: "website",
  },
};

const FEATURED_SERVICES = [
  { name: "Cleaning", slug: "dubai/cleaning", icon: "🧹" },
  { name: "AC Services", slug: "dubai/ac", icon: "❄️" },
  { name: "Plumbing", slug: "dubai/plumbing", icon: "🔧" },
  { name: "Electrical", slug: "dubai/electrical", icon: "⚡" },
  { name: "Landscaping", slug: "dubai/landscaping", icon: "🌿" },
  { name: "Maid Services", slug: "dubai/maid", icon: "🏠" },
  { name: "Pest Control", slug: "dubai/pest-control", icon: "🛡️" },
  { name: "Handyman", slug: "dubai/handyman", icon: "🛠️" },
];

const EMIRATES = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman",
  "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-white">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-surface px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-pill border border-brand-500/30 bg-brand-900/50 px-4 py-1.5 text-fluid-caption text-brand-300 backdrop-blur-sm">
            🇦🇪 Serving All 7 UAE Emirates
          </p>

          <h1 className="text-fluid-h1 font-display font-extrabold leading-tight text-white">
            Book Trusted
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-gold-400 bg-clip-text text-transparent">
              Home Services
            </span>
            <br />
            Across UAE
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-fluid-body-lg text-zinc-300">
            3,600+ services. Verified providers. Instant booking in AED.
            Same-day availability across Dubai, Abu Dhabi, and all emirates.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services/dubai"
              className="rounded-pill bg-brand-500 px-8 py-4 text-fluid-body font-semibold text-white shadow-glow hover:bg-brand-400 transition-all duration-200 hover:scale-105"
            >
              Browse Services
            </Link>
            <Link
              href="/about"
              className="rounded-pill border border-white/20 bg-white/5 px-8 py-4 text-fluid-body font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              How It Works
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Featured Services ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-fluid-h2 font-display font-bold text-white">
          Popular Services
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURED_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-surface-raised p-6 text-center shadow-glass transition-all duration-300 hover:border-brand-400/50 hover:shadow-glow hover:-translate-y-1"
              >
                <span className="text-4xl" role="img" aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className="text-fluid-body font-semibold text-white group-hover:text-brand-300 transition-colors">
                  {service.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Emirates ─────────────────────────────────────────────────── */}
      <section className="bg-surface-subtle py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-fluid-h3 font-display font-semibold text-white">
            Available In
          </h2>
          <ul className="flex flex-wrap gap-3">
            {EMIRATES.map((emirate) => (
              <li key={emirate}>
                <Link
                  href={`/services/${emirate.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-pill border border-white/15 bg-surface-overlay px-5 py-2.5 text-fluid-body font-medium text-zinc-300 transition-all hover:border-brand-400/50 hover:text-white"
                >
                  {emirate}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
