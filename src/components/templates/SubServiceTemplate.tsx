/**
 * Sub-Service Detail Page — ISR Template
 * ─────────────────────────────────────────────
 * Routes:  /home-cleaning/deep-cleaning-dubai
 *          /ac-maintenance/ac-repair-dubai
 *          /plumbing/pipe-leakage-repair-sharjah  etc.
 *
 * Design:  Clean white base, alternating section backgrounds.
 *          Side-by-side hero (content left, booking widget right).
 *          Pricing packages, provider cards, before/after checklist.
 * Strategy: ISR with revalidate = 3600.
 */

import Link from 'next/link';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';

export default function SubServiceTemplate({ svc, slug }: { svc: ServiceData; slug: string }) {
  const displayName  = svc.name ?? toTitle(slug.split('/').pop() || slug);
  const parentName   = svc.parent?.name ?? 'Service';
  const parentSlug   = svc.parent?.slug ?? slug.split('/').slice(0, -1).join('/');
  const basePrice    = formatBasePrice(svc.base_price);

  const relatedSvcs  = svc.parent
    ? [] // in prod: fetch siblings from parent children
    : [];

  const included     = getIncluded(displayName);
  const notIncluded  = getNotIncluded();
  const process      = getProcessSteps(displayName);
  const packages     = getPricingPackages(displayName, svc.base_price);
  const providers    = getStaticProviders();
  const reviews      = getStaticReviews(displayName);
  const faqs         = getStaticFaqs(displayName, parentName);

  // JSON-LD
  const jsonLd = buildJsonLd(svc, displayName, parentName);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white text-slate-900">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO (2-col: content + sticky booking widget)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-slate-100 bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
              {/* LEFT — main content */}
              <div>
                {/* Breadcrumb */}
                <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                  <ChevronRight className="size-3.5" />
                  <Link href={`/${parentSlug}`} className="hover:text-blue-600 transition-colors capitalize">
                    {parentName}
                  </Link>
                  <ChevronRight className="size-3.5" />
                  <span className="font-medium text-slate-700">{displayName}</span>
                </nav>

                {/* Ratings badge */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <StarRating rating={4.9} />
                    <span className="text-sm font-bold text-slate-800">4.9</span>
                  </div>
                  <span className="text-xs text-slate-400">(1,200+ jobs completed)</span>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    ✓ Available Today
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                  {displayName}
                  <br />
                  <span className="text-2xl font-semibold text-blue-600 sm:text-3xl">
                    across UAE
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">
                  {svc.description ??
                    `Professional ${displayName.toLowerCase()} service delivered to your door by vetted experts. Transparent AED pricing, no hidden fees, and a 100% satisfaction guarantee across all UAE emirates.`}
                </p>

                {/* Key highlights */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    '🏆 Top Rated in UAE',
                    '⚡ Same-day slots',
                    '🔒 Fully insured',
                    '💳 Pay in AED',
                    '♻️ 100% guarantee',
                  ].map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile CTA (hidden on desktop where widget lives) */}
                <div className="mt-8 flex gap-3 lg:hidden">
                  <Link href="/register" className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
                    Book Now
                  </Link>
                  <Link href="/contact" className="rounded-full border-2 border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:border-blue-300 transition-all">
                    Get Quote
                  </Link>
                </div>
              </div>

              {/* RIGHT — Sticky Booking Widget */}
              <div className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">Book This Service</p>
                    <p className="mt-1 text-2xl font-extrabold text-white">
                      Starting at <span className="text-cyan-200">{basePrice}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-blue-100">
                      <span>⚡ Response within 15 min</span>
                      <span>·</span>
                      <span>✓ Free cancellation</span>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-6">
                    <div className="space-y-3">
                      {[
                        { icon: '📍', label: 'Location', hint: 'Building / Area, Emirate' },
                        { icon: '📅', label: 'Date', hint: 'Choose a date' },
                        { icon: '🕐', label: 'Time', hint: 'Morning / Afternoon / Evening' },
                      ].map((f) => (
                        <div key={f.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <span className="text-lg">{f.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{f.label}</p>
                            <p className="text-sm text-slate-500 truncate">{f.hint}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/register"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all"
                    >
                      Book Now — Instant Confirmation
                    </Link>

                    {/* Trust items */}
                    <div className="mt-5 space-y-2.5">
                      {[
                        { icon: '🛡️', text: 'Insured & background-checked provider' },
                        { icon: '💳', text: 'Pay after service — AED / card / Apple Pay' },
                        { icon: '♻️', text: '100% money-back if not satisfied' },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-2.5 text-xs text-slate-500">
                          <span>{item.icon}</span>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — QUICK FACTS STRIP
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-blue-50 border-b border-blue-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-blue-100 sm:grid-cols-4">
              {[
                { icon: '💰', label: 'Starting Price', value: basePrice },
                { icon: '⏱️', label: 'Avg. Duration', value: '2–4 hours' },
                { icon: '🌟', label: 'Satisfaction', value: '98.6%' },
                { icon: '📞', label: 'Response Time', value: '< 15 mins' },
              ].map((fact) => (
                <div key={fact.label} className="px-6 py-5 text-center">
                  <div className="text-2xl">{fact.icon}</div>
                  <p className="mt-1 text-lg font-extrabold text-blue-700">{fact.value}</p>
                  <p className="text-xs text-blue-500">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — WHAT'S INCLUDED / NOT INCLUDED
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Scope of Work</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                What&apos;s Included
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                Every {displayName.toLowerCase()} booking comes with these services as standard. See pricing section for package differences.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Included grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-100 px-5 py-4">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">✓</span>
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              {/* Not included + note card */}
              <div>
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
                  <p className="text-sm font-bold text-orange-700 mb-3">⚠ Not Included in Base Price</p>
                  <ul className="space-y-2">
                    {notIncluded.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-orange-400">—</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                    Need extras? Select add-ons during booking or contact us for a custom quote — charged separately at transparent rates.
                  </p>
                </div>
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-sm font-bold text-blue-800">Best-Rated in UAE</p>
                      <p className="text-xs text-blue-600">4.9★ from 1,200+ verified reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — HOW IT WORKS (vertical timeline)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Process</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                How Your {displayName} Works
              </h2>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-blue-300 via-cyan-300 to-transparent lg:left-1/2 lg:-translate-x-1/2" />
              <div className="space-y-8">
                {process.map((step, i) => (
                  <div
                    key={step.title}
                    className={`relative flex items-start gap-6 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Bubble */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-extrabold text-sm shadow-lg lg:mx-auto lg:left-auto">
                      {i + 1}
                    </div>
                    {/* Card */}
                    <div className={`flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:max-w-[45%] ${i % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}>
                      <div className="mb-3 text-2xl">{step.icon}</div>
                      <h3 className="font-bold text-slate-800">{step.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block lg:flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — PRICING PACKAGES
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Pricing</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Transparent, Upfront Pricing
              </h2>
              <p className="mt-3 text-slate-500">All prices in AED. No hidden charges. Choose the package that fits your needs.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative overflow-hidden rounded-2xl border p-7 transition-all hover:shadow-lg ${
                    pkg.recommended
                      ? 'border-blue-500 shadow-xl shadow-blue-100 scale-[1.02]'
                      : 'border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  )}
                  {pkg.recommended && (
                    <div className="absolute right-5 top-4 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white">
                      POPULAR
                    </div>
                  )}
                  <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">{pkg.name}</p>
                  <p className="mt-2 text-4xl font-extrabold text-slate-900">
                    {pkg.price}
                    <span className="text-lg font-normal text-slate-400"> AED</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{pkg.duration}</p>
                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${pkg.recommended ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`mt-7 flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-all ${
                      pkg.recommended
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02]'
                        : 'border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    Book {pkg.name} →
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400">
              Need something custom?{' '}
              <Link href="/contact" className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
                Request a tailored quote →
              </Link>
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — INSTANT QUOTE CTA (full-width gradient)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">No obligation</p>
                <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  Get an Instant Quote for<br />Your{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {displayName}
                  </span>
                </h2>
                <p className="mt-3 text-slate-300 max-w-lg">
                  Tell us about your property and we&apos;ll send you an exact price within minutes. No sales calls, no pressure.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['Dubai Marina', 'Downtown Dubai', 'Abu Dhabi', 'Sharjah City', 'JBR', 'Jumeirah'].map((loc) => (
                    <span key={loc} className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white/70">
                      📍 {loc}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:min-w-[240px]">
                <Link
                  href="/register"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 text-center text-sm font-bold text-white shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all"
                >
                  Get Instant Quote →
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-medium text-white/80 hover:bg-white/5 transition-all"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — MEET OUR PROVIDERS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Our Experts</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Meet Your {displayName} Professionals
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto">
                Every provider is background-checked, trade-certified, and rated by real customers.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {providers.map((prov) => (
                <div key={prov.name} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold text-white shadow">
                      {prov.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 truncate">{prov.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{prov.specialty}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <StarRating rating={prov.rating} />
                        <span className="text-xs font-semibold text-slate-600">{prov.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 border border-slate-100">
                    {[
                      { label: 'Jobs Done', value: prov.jobs },
                      { label: 'Experience', value: prov.years },
                      { label: 'Reviews', value: prov.reviews },
                    ].map((stat) => (
                      <div key={stat.label} className="px-3 py-2.5 text-center">
                        <p className="text-sm font-bold text-slate-700">{stat.value}</p>
                        <p className="text-[10px] text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prov.badges.map((b) => (
                      <span key={b} className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400">
              The platform auto-matches you with the nearest available provider when you book.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — CUSTOMER TESTIMONIALS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Reviews</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                What Customers Are Saying
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {reviews.map((rev, i) => (
                <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="flex-1 text-sm text-slate-600 leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 text-base font-bold text-white">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{rev.name}</p>
                      <p className="text-xs text-slate-400">{rev.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 9 — FAQ
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">FAQ</span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-100 bg-white shadow-sm open:shadow-md open:border-blue-200 transition-all"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-7 py-5 text-sm font-semibold text-slate-800 select-none list-none">
                    {faq.q}
                    <span className="ml-4 shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 group-open:bg-blue-100 group-open:text-blue-600 transition-colors">
                      <ChevronDown className="size-4 group-open:rotate-180 transition-transform" />
                    </span>
                  </summary>
                  <div className="px-7 pb-6 pt-0 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 10 — RELATED SERVICES
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Explore More</span>
              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                Related {parentName} Services
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getRelatedServices(parentSlug, displayName).map((rel, i) => (
                <Link
                  key={rel.name}
                  href={`/${parentSlug}/${rel.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${ICON_COLORS[i % ICON_COLORS.length]}`}>
                    {rel.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{rel.name}</p>
                    <p className="text-xs text-slate-400">{rel.price}</p>
                  </div>
                  <span className="text-slate-200 group-hover:text-blue-400 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 11 — FINAL CTA + EMERGENCY
           ══════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-slate-100 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-16 lg:items-center">
              {/* Main CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-10 text-white">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">100% Guaranteed</p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Ready to Book Your<br/>{displayName}?
                </h2>
                <p className="mt-3 text-blue-100 max-w-md">
                  Join over 50,000 UAE residents who trust LocalServices AE. Start today — it&apos;s free to sign up and browse.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/register"
                    className="rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-blue-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    Book Now →
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    Custom Quote
                  </Link>
                </div>
              </div>
              {/* Emergency / Urgent card */}
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-white text-2xl shadow-lg">🚨</span>
                  <div>
                    <p className="font-extrabold text-red-700">Emergency Service</p>
                    <p className="text-xs text-red-400">Available 24/7</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Urgent {displayName.toLowerCase()} issue? We have on-call professionals available around the clock across all UAE emirates.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
                >
                  📞 Call Emergency Line
                </Link>
                <p className="mt-3 text-center text-xs text-red-400">Response guaranteed within 1 hour</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

// ─── Inline SVG Components ─────────────────────────────────────────────────────
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
        <svg key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Static Data Generators ───────────────────────────────────────────────────
const ICON_COLORS = [
  'bg-blue-50 text-blue-600', 'bg-green-50 text-green-600',
  'bg-amber-50 text-amber-600', 'bg-purple-50 text-purple-600',
  'bg-cyan-50 text-cyan-600', 'bg-rose-50 text-rose-600',
];

function toTitle(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getIncluded(name: string) {
  return [
    `Full ${name} service by certified professional`,
    'All equipment and materials (as specified)',
    'Pre-service inspection & assessment',
    'Safe disposal of waste/debris (if applicable)',
    'Post-service quality check and sign-off',
    'Digital invoice with warranty details',
    'Follow-up support within 48 hours',
    'Re-service guarantee if standards not met',
  ];
}

function getNotIncluded() {
  return [
    'Materials not specified in the base package',
    'Heavy furniture removal or moving',
    'Structural repairs or permits',
    'Third-party specialized equipment',
    'Service beyond agreed scope of work',
  ];
}

function getProcessSteps(name: string) {
  return [
    {
      icon: '📱',
      title: 'Book Online or by Phone',
      desc: `Choose your ${name.toLowerCase()} package on our website or app. Select your preferred date, time slot, and provide your location — takes less than 2 minutes.`,
    },
    {
      icon: '✅',
      title: 'Instant Confirmation & Provider Match',
      desc: 'Receive instant booking confirmation via SMS/email. Our system auto-matches you with the nearest available, highest-rated provider in your area.',
    },
    {
      icon: '🚗',
      title: 'Professional Arrives At Your Door',
      desc: `Your vetted ${name.toLowerCase()} expert arrives on time with all necessary equipment. You receive a real-time arrival notification when they\'re 15 minutes away.`,
    },
    {
      icon: '🏆',
      title: 'Service Delivered & Quality Approved',
      desc: 'Work is completed to the agreed scope. You inspect and approve before the professional leaves. Rate your experience and receive a digital invoice.',
    },
  ];
}

function getPricingPackages(name: string, basePrice: string | null) {
  const base = basePrice ? Math.round(parseFloat(basePrice)) : 150;
  return [
    {
      name: 'Basic',
      price: base,
      duration: '1–2 hrs · Standard scope',
      recommended: false,
      features: [
        `Core ${name} service`,
        'Standard equipment',
        'Single professional',
        'Digital invoice',
        '48-hr support',
      ],
    },
    {
      name: 'Standard',
      price: Math.round(base * 1.6),
      duration: '2–4 hrs · Full scope',
      recommended: true,
      features: [
        `Comprehensive ${name}`,
        'Premium equipment',
        'Senior professional',
        'Priority booking',
        'Digital invoice + warranty',
        '7-day follow-up',
      ],
    },
    {
      name: 'Premium',
      price: Math.round(base * 2.4),
      duration: '4–6 hrs · Deluxe scope',
      recommended: false,
      features: [
        `Full-service ${name}`,
        'Professional-grade materials',
        'Team of 2 experts',
        'Same-day priority',
        'Full warranty coverage',
        '30-day aftercare',
      ],
    },
  ];
}

function getStaticProviders() {
  return [
    {
      name: 'Mohammed Al Farsi',
      specialty: 'Senior Specialist · Dubai',
      rating: 4.9,
      jobs: '847',
      years: '8 yrs',
      reviews: '612',
      badges: ['✓ Verified', '🏆 Top Rated', '⚡ Fast'],
    },
    {
      name: 'Rajesh Kumar',
      specialty: 'Certified Expert · Abu Dhabi',
      rating: 4.8,
      jobs: '534',
      years: '6 yrs',
      reviews: '389',
      badges: ['✓ Verified', '🌟 5-Star', '📜 Certified'],
    },
    {
      name: 'Ahmed Ibrahim',
      specialty: 'Lead Professional · Sharjah',
      rating: 4.9,
      jobs: '691',
      years: '10 yrs',
      reviews: '501',
      badges: ['✓ Verified', '🏆 Senior', '💎 Elite'],
    },
  ];
}

function getStaticReviews(name: string) {
  return [
    {
      name: 'Layla Al Mansoori',
      location: 'Dubai Marina · March 2025',
      text: `Outstanding ${name.toLowerCase()} service. The professional arrived on time, explained every step, and the results were immaculate. Will definitely book again.`,
    },
    {
      name: 'David Chen',
      location: 'Abu Dhabi ADNOC Area · Feb 2025',
      text: `Best ${name.toLowerCase()} experience I've had in the UAE. Transparent pricing, no surprises, and the workmanship was top quality. Highly recommend.`,
    },
    {
      name: 'Mariam Al Zahra',
      location: 'Sharjah, Al Nahda · Jan 2025',
      text: 'Booked through LocalServices AE for the first time. The whole process — from booking to completion — was seamless. Professional, punctual, and thorough.',
    },
  ];
}

function getStaticFaqs(name: string, parent: string) {
  return [
    {
      q: `How long does ${name.toLowerCase()} take?`,
      a: `Standard ${name.toLowerCase()} typically takes 2–4 hours depending on property size and scope. Premium packages may take up to 6 hours. Your booking confirmation will include an estimated duration.`,
    },
    {
      q: 'Do I need to provide any equipment or materials?',
      a: `No. Our ${parent.toLowerCase()} professionals arrive fully equipped. All standard tools and materials are included in the price. If specialist materials are needed, they\'ll be quoted separately.`,
    },
    {
      q: `Is ${name.toLowerCase()} available in my area?`,
      a: 'We cover all 7 UAE emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Simply enter your postcode or area during booking.',
    },
    {
      q: 'What if I\'m not satisfied with the work?',
      a: 'Every booking is protected by our 100% Satisfaction Guarantee. If you\'re not completely satisfied, we\'ll arrange a free re-service within 48 hours — or issue a full refund.',
    },
    {
      q: 'Can I reschedule or cancel my booking?',
      a: 'Yes — cancellations and reschedules are free up to 2 hours before your scheduled appointment. Just log in to your account or call our support team.',
    },
  ];
}

function getRelatedServices(parentSlug: string, currentName: string) {
  const options = [
    { name: 'Deep Cleaning', slug: `deep-cleaning-dubai`, icon: '🧹', price: 'From AED 199' },
    { name: 'AC Service & Repair', slug: `ac-service-repair`, icon: '❄️', price: 'From AED 149' },
    { name: 'Plumbing', slug: `plumbing-services`, icon: '🔧', price: 'From AED 120' },
    { name: 'Electrical Works', slug: `electrical-services`, icon: '⚡', price: 'From AED 150' },
    { name: 'Painting', slug: `painting-services`, icon: '🎨', price: 'From AED 250' },
    { name: 'Pest Control', slug: `pest-control`, icon: '🛡️', price: 'From AED 180' },
  ];
  return options.filter(o => !o.name.toLowerCase().includes(currentName.substring(0, 5).toLowerCase())).slice(0, 6);
}

function buildJsonLd(svc: ServiceData, displayName: string, parentName: string) {
  return svc.schema_markup ?? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': displayName,
    'serviceType': parentName,
    'description': svc.description ?? `Professional ${displayName} service in the UAE by vetted experts.`,
    'provider': {
      '@type': 'Organization',
      'name': 'LocalServices AE',
      'url': 'https://localservices.ae',
      'email': 'support@localservices.ae',
    },
    'areaServed': [
      'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
      'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
    ].map(name => ({ '@type': 'City', 'name': name })),
    'offers': svc.base_price ? {
      '@type': 'Offer',
      'priceCurrency': 'AED',
      'price': svc.base_price,
    } : undefined,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'bestRating': '5',
      'reviewCount': '1200',
    },
  };
}
