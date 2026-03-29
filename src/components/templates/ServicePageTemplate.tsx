import Link from 'next/link';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';

export default function ServicePageTemplate({ svc, slug }: { svc: ServiceData; slug: string }) {
  const displayName = svc.name ?? toTitle(slug);
  const basePrice   = formatBasePrice(svc.base_price);
  const subServices = svc.children ?? [];
  const breadcrumbParent = svc.parent;

  // Static review/trust data (in production: fetch from reviews API)
  const reviews = getStaticReviews(displayName);
  const faqs    = getStaticFaqs(displayName);

  // JSON-LD Schema
  const jsonLd = buildJsonLd(svc, displayName);

  return (
    <>
      {/* ── JSON-LD ─────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white text-slate-900">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30">
          {/* Decorative blob */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-cyan-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              {breadcrumbParent && (
                <>
                  <ChevronRight className="size-3.5" />
                  <Link href={`/${breadcrumbParent.slug}`} className="hover:text-blue-600 transition-colors capitalize">
                    {breadcrumbParent.name}
                  </Link>
                </>
              )}
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-slate-700">{displayName}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16 lg:items-center">
              {/* Left content */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                  </span>
                  Available Today across UAE
                </div>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                  {displayName}{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Services
                  </span>
                  <br />in UAE
                </h1>

                <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
                  {svc.description ?? `Book verified ${displayName.toLowerCase()} professionals across Dubai, Abu Dhabi, Sharjah and all 7 UAE emirates. Background-checked providers, AED pricing, instant confirmation.`}
                </p>

                {/* Rating row */}
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={4.8} />
                    <span className="text-sm font-semibold text-slate-700">4.8</span>
                    <span className="text-sm text-slate-400">(2,400+ reviews)</span>
                  </div>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <span>✅</span> Background checked
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <span>⚡</span> Same-day available
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/register"
                    className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
                  >
                    Book a Service →
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border-2 border-slate-200 px-7 py-3.5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    Get Free Quote
                  </Link>
                </div>

                {/* Trust pill row */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {['No hidden fees', 'AED payments', '100% guarantee', 'Cancel anytime'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      <span className="text-green-500">✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Quick Book Card */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/60">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Quick Booking</p>
                <p className="mt-1 text-xl font-bold text-slate-900">Book in under 2 minutes</p>
                <div className="mt-5 space-y-3">
                  {[
                    { icon: '📍', label: 'Location', placeholder: 'Dubai, Marina, JBR…' },
                    { icon: '📅', label: 'Date & Time', placeholder: 'When do you need it?' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                      <span className="text-lg">{f.icon}</span>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{f.label}</p>
                        <p className="text-sm text-slate-500">{f.placeholder}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/register"
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
                >
                  Book Now — Starting at {basePrice}
                </Link>
                <p className="mt-3 text-center text-xs text-slate-400">No credit card required to book</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — STATS STRIP
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: '2,400+', label: 'Verified Providers' },
                { value: '4.8★', label: 'Average Rating' },
                { value: '< 15 min', label: 'Response Time' },
                { value: 'All 7', label: 'Emirates Covered' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-blue-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — SERVICE OVERVIEW (alternating layout)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
              {/* Text side */}
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  About This Service
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  UAE&apos;s Most Trusted<br />
                  <span className="text-blue-600">{displayName} Experts</span>
                </h2>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  LocalServices AE connects you directly with the best {displayName.toLowerCase()} professionals operating across the UAE. Every provider is rigorously vetted — identity verified, background checked, and certified in their trade.
                </p>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  We operate in all 7 emirates and offer real-time booking with instant confirmation. No waiting, no uncertainty. Just professional service at transparent, AED-denominated prices.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    'Identity Verified', 'Trade Certified',
                    'Insured & Bonded', 'Customer Rated',
                    'GPS Tracked', 'Digital Invoices',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Visual side */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-[2px]">
                  <div className="h-80 rounded-[14px] bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                    <div className="p-8 text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-4xl shadow-xl">
                        🏠
                      </div>
                      <p className="text-2xl font-extrabold text-blue-700">{displayName}</p>
                      <p className="mt-2 text-sm text-slate-500">Starting from {basePrice}</p>
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">Same-day</span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-xl border border-slate-100">
                  <p className="text-xs text-slate-500">Next available slot</p>
                  <p className="text-sm font-bold text-slate-800">Today, 2:00 PM</p>
                </div>
                <div className="absolute -right-4 -top-4 rounded-xl bg-white p-4 shadow-xl border border-slate-100">
                  <p className="text-xs text-slate-500">Satisfaction rate</p>
                  <p className="text-sm font-bold text-green-600">98.6%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — SUB-SERVICES / CATEGORIES GRID
           ══════════════════════════════════════════════════════════════════ */}
        {subServices.length > 0 && (
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  What We Offer
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  {displayName} Services Available
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-500">
                  Choose your exact service. Every option includes vetted professionals, transparent pricing, and a satisfaction guarantee.
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subServices.map((sub, i) => (
                  <Link
                    key={sub.id}
                    href={`/${sub.slug}`}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
                  >
                    {/* Icon area */}
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl ${SERVICE_ICON_COLORS[i % SERVICE_ICON_COLORS.length]} shadow-sm`}>
                      {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    </div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{sub.name}</h3>
                    {sub.base_price && (
                      <p className="mt-1 text-sm text-cyan-600 font-semibold">
                        From AED {parseFloat(sub.base_price).toFixed(0)}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-slate-400">Certified professionals</p>
                    <span className="absolute bottom-4 right-4 text-slate-200 group-hover:text-blue-400 transition-colors text-lg">→</span>
                  </Link>
                ))}
              </div>

              {subServices.length === 0 && (
                <div className="mt-10 text-center text-slate-400">
                  <p>All service packages available on booking. Contact us for custom requirements.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — HOW IT WORKS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Process</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">Book in 3 Simple Steps</h2>
              <p className="mt-3 text-slate-500">From request to completion in under 60 minutes for most services.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: '01',
                  icon: '🔍',
                  title: 'Choose Your Service',
                  desc: 'Browse our catalog of 3,600+ verified {displayName} services. Filter by emirate, price, and availability.',
                },
                {
                  step: '02',
                  icon: '📅',
                  title: 'Pick a Time Slot',
                  desc: 'Select your preferred date and time. We have same-day and next-day slots available across all UAE emirates.',
                },
                {
                  step: '03',
                  icon: '✅',
                  title: 'Relax & Get It Done',
                  desc: 'A vetted professional arrives at your door. Pay securely in AED after the job is completed to your satisfaction.',
                },
              ].map((step, i) => (
                <div key={step.step} className="relative">
                  {/* Connector line */}
                  {i < 2 && (
                    <div className="absolute left-full top-10 hidden h-0.5 w-full -translate-x-8 bg-gradient-to-r from-blue-200 to-transparent sm:block" />
                  )}
                  <div className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl shadow-lg shadow-blue-500/20">
                        {step.icon}
                      </div>
                      <span className="text-4xl font-extrabold text-slate-100">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {step.desc.replace('{displayName}', displayName.toLowerCase())}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — INLINE CTA BANNER
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">Limited slots today</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Book Your {displayName} Service Now
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-blue-100">
              Join 50,000+ UAE residents who trust LocalServices AE. Starting at {basePrice} with a 100% satisfaction guarantee.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-blue-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Book Now — It&apos;s Free to Sign Up
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Request a Custom Quote
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — WHY CHOOSE US / TRUST PILLARS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Why LocalServices AE</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">Built for UAE Residents</h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto">The only platform built specifically for the UAE market — Arabized, licensed, and fully compliant.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: '🛡️',
                  color: 'bg-blue-50 border-blue-100',
                  iconBg: 'bg-blue-600',
                  title: 'Fully Vetted',
                  desc: 'Criminal background checks, trade qualification verification, and insurance — every provider, every time.',
                },
                {
                  icon: '💳',
                  color: 'bg-cyan-50 border-cyan-100',
                  iconBg: 'bg-cyan-600',
                  title: 'AED Payments',
                  desc: 'Pay in local currency via card, Apple Pay, or bank transfer. No forex fees, no hidden charges.',
                },
                {
                  icon: '⚡',
                  color: 'bg-green-50 border-green-100',
                  iconBg: 'bg-green-600',
                  title: 'Same-Day Service',
                  desc: 'Most services available today. Book before noon for guaranteed afternoon slots in Dubai & Abu Dhabi.',
                },
                {
                  icon: '♻️',
                  color: 'bg-amber-50 border-amber-100',
                  iconBg: 'bg-amber-500',
                  title: '100% Guarantee',
                  desc: 'Not satisfied? We&apos;ll send another professional free of charge, or issue a full refund. No questions asked.',
                },
              ].map((card) => (
                <div key={card.title} className={`rounded-2xl border p-6 ${card.color} transition-all hover:shadow-md`}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white ${card.iconBg} shadow-sm`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-slate-800">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — CUSTOMER TESTIMONIALS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Reviews</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Trusted by 50,000+ UAE Residents
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((rev, i) => (
                <div key={i} className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 p-2 shadow-lg">
                    <span className="text-white text-xs">★★★★★</span>
                  </div>
                  <div className="mt-4 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-lg font-bold text-white shadow">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{rev.name}</p>
                      <p className="text-xs text-slate-400">{rev.location} · {rev.date}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
                  <div className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {rev.service}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 9 — EMIRATES COVERAGE
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-blue-900/50 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-800">Coverage</span>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                {displayName} Services Across All UAE
              </h2>
              <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                We operate in every emirate with local providers who know the areas, regulations, and building types.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {EMIRATES.map((em) => (
                <Link
                  key={em.slug}
                  href={`/services/${em.slug}`}
                  className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 hover:border-blue-500/30 transition-all font-display"
                >
                  <span className="text-2xl mb-2">{em.flag}</span>
                  <p className="text-xs font-semibold text-white">{em.name}</p>
                  <p className="mt-1 text-[10px] text-slate-400 group-hover:text-blue-400 transition-colors">View services →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 10 — FAQ
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">FAQ</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Common Questions About {displayName}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-100 bg-white shadow-sm hover:border-blue-100 transition-all open:shadow-md open:border-blue-200"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-slate-800 select-none">
                    {faq.q}
                    <span className="ml-4 shrink-0 rounded-full bg-slate-100 p-1 group-open:bg-blue-100 group-open:text-blue-600 transition-all">
                      <ChevronDown className="size-4 group-open:rotate-180 transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 11 — FINAL CTA
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-blue-600 to-cyan-500 py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest">Ready to book?</p>
            <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
              Your Home Deserves<br />the Best
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-blue-100 text-lg">
              Join 50,000+ UAE residents. Book a {displayName.toLowerCase()} professional today with instant confirmation and a 100% money-back guarantee.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-white px-9 py-4 text-base font-extrabold text-blue-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Book a {displayName} Expert →
              </Link>
            </div>
            <p className="mt-5 text-sm text-blue-200">No credit card required · Cancel anytime · 100% satisfaction guaranteed</p>
          </div>
        </section>

      </div>
    </>
  );
}

// ─── Inline SVG Components (no extra dep) ─────────────────────────────────────
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} className={`h-4 w-4 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Static Data Helpers ──────────────────────────────────────────────────────
const SERVICE_ICONS = ['🔧', '⚡', '🧹', '❄️', '🌿', '🎨', '🔑', '🚿', '🖥️', '🏗️', '🛡️', '📦'];
const SERVICE_ICON_COLORS = [
  'bg-blue-50 text-blue-600',
  'bg-amber-50 text-amber-600',
  'bg-green-50 text-green-600',
  'bg-cyan-50 text-cyan-600',
  'bg-purple-50 text-purple-600',
  'bg-rose-50 text-rose-600',
];
const EMIRATES = [
  { name: 'Dubai', slug: 'dubai', flag: '🏙️' },
  { name: 'Abu Dhabi', slug: 'abu-dhabi', flag: '🕌' },
  { name: 'Sharjah', slug: 'sharjah', flag: '🌆' },
  { name: 'Ajman', slug: 'ajman', flag: '🏘️' },
  { name: 'Ras Al Khaimah', slug: 'ras-al-khaimah', flag: '⛰️' },
  { name: 'Fujairah', slug: 'fujairah', flag: '🌊' },
  { name: 'Umm Al Quwain', slug: 'umm-al-quwain', flag: '🌴' },
];

function toTitle(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getStaticReviews(serviceName: string) {
  return [
    {
      name: 'Ahmed Al Rashidi',
      location: 'Dubai Marina',
      date: 'March 2025',
      text: `Exceptional ${serviceName.toLowerCase()} service. The team arrived on time, was professional, and the results exceeded my expectations.`,
      service: `${serviceName} — Marina, Dubai`,
    },
    {
      name: 'Fatima Al Zahra',
      location: 'Abu Dhabi, Khalidiyah',
      date: 'February 2025',
      text: 'Best booking experience I\'ve had in the UAE. The app is easy to use, pricing is transparent, and the quality is consistently high.',
      service: `${serviceName} — Abu Dhabi`,
    },
    {
      name: 'James Henderson',
      location: 'Sharjah, Al Nahda',
      date: 'March 2025',
      text: 'As an expat, finding reliable home services was a challenge before this platform. Now it\'s my go-to solution every time.',
      service: `${serviceName} — Sharjah`,
    },
  ];
}

function getStaticFaqs(serviceName: string) {
  return [
    {
      q: `How much does ${serviceName.toLowerCase()} cost in the UAE?`,
      a: `Pricing varies by scope, emirate, and provider. Most ${serviceName.toLowerCase()} services start from AED 100–200 for standard jobs. You always see the final price before confirming — no surprises.`,
    },
    {
      q: 'Are all service providers background checked?',
      a: 'Yes. Every provider on our platform undergoes full identity verification, criminal background screening, and trade certification checks before their first booking.',
    },
    {
      q: 'How quickly can I get a service?',
      a: 'Many services are available same-day, especially in Dubai and Abu Dhabi. Simply choose a time slot during booking — we\'ll confirm within 15 minutes.',
    },
    {
      q: 'What if I\'m not satisfied with the service?',
      a: `All ${serviceName.toLowerCase()} bookings are covered by our 100% Satisfaction Guarantee. If you're not happy, we'll send another professional at no charge — or issue a full refund.`,
    },
    {
      q: 'Can I book for another emirate?',
      a: 'Absolutely. We operate across all 7 UAE emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.',
    },
  ];
}

function buildJsonLd(svc: ServiceData, displayName: string) {
  return svc.schema_markup ?? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': displayName,
    'description': svc.description ?? `Professional ${displayName} services across the UAE.`,
    'provider': {
      '@type': 'Organization',
      'name': 'LocalServices AE',
      'url': 'https://localservices.ae',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'United Arab Emirates',
    },
    'offers': svc.base_price ? {
      '@type': 'Offer',
      'priceCurrency': 'AED',
      'price': svc.base_price,
      'priceSpecification': { '@type': 'UnitPriceSpecification' },
    } : undefined,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '2400',
    },
  };
}
