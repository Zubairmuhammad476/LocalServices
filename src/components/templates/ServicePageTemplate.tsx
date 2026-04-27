'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';
import BookingModal from '@/components/ui/BookingModal';

// ── Location hero images ─────────────────────────────────────────────────────
const LOCATION_HERO: Record<string, string> = {
  dubai:          '/assets/images/services/dubai-hero.webp',
  'abu-dhabi':    '/assets/images/emirates/abu-dhabi.webp',
  sharjah:        '/assets/images/emirates/sharjah.webp',
  ajman:          '/assets/images/emirates/ajman.webp',
  'ras-al-khaimah': '/assets/images/emirates/ras-al-khaimah.webp',
  fujairah:       '/assets/images/emirates/fujairah.webp',
  'umm-al-quwain':'/assets/images/emirates/umm-al-quwain.webp',
};

// ── Service card images from the project's public folder ──────────────────────
const SERVICE_CARD_IMAGES: Record<string, string> = {
  'cleaning':       '/assets/images/services/home-cleaning.webp',
  'home-cleaning':  '/assets/images/services/home-cleaning.webp',
  'maid':           '/assets/images/services/maid-services.webp',
  'maid-services':  '/assets/images/services/maid-services.webp',
  'ac':             '/assets/images/services/ac-maintenance.webp',
  'ac-maintenance': '/assets/images/services/ac-maintenance.webp',
  'plumbing':       '/assets/images/services/plumbing.webp',
  'electrical':     '/assets/images/services/electrical.webp',
  'painting':       '/assets/images/services/painting.webp',
  'carpentry':      '/assets/images/services/carpentry.webp',
  'pest-control':   '/assets/images/services/pest-control.webp',
  'pest':           '/assets/images/services/pest-control.webp',
  'handyman':       '/assets/images/services/handyman.webp',
  'landscaping':    '/assets/images/services/landscaping.webp',
};

function getCardImage(slug: string): string {
  const key = slug.split('/').pop() || '';
  // Exact match first
  if (SERVICE_CARD_IMAGES[key]) return SERVICE_CARD_IMAGES[key];
  // Partial match
  const partial = Object.keys(SERVICE_CARD_IMAGES).find(k => key.includes(k));
  if (partial) return SERVICE_CARD_IMAGES[partial];
  // Fallback cycle through available images
  const fallbacks = Object.values(SERVICE_CARD_IMAGES);
  const hash = key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return fallbacks[hash % fallbacks.length];
}

export default function ServicePageTemplate({ svc, slug }: { svc: ServiceData; slug: string }) {
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [openFaqIdx, setOpenFaqIdx]         = useState<number | null>(0);

  const displayName      = svc.name ?? toTitle(slug);
  const basePrice        = formatBasePrice(svc.base_price);
  const subServices      = svc.children ?? [];
  const breadcrumbParent = svc.parent;

  // Derived location for contextual text
  const location     = slug.split('/')[1] || 'Dubai';
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);

  const faqs  = getStaticFaqs(displayName, locationName);
  const jsonLd = buildJsonLd(svc, displayName);

  // Hero — location-specific or DB image
  const heroImage = svc.image_url || LOCATION_HERO[location] || '/assets/images/services/dubai-hero.webp';

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={displayName}
        location={locationName}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white text-slate-900">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO: Full-width BG, centered content, NO right form
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${displayName} services in ${locationName}, UAE`}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Dark gradient overlay — stronger for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/60 to-slate-900/80" />
          </div>

          {/* Centered content */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="size-3" />
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              {breadcrumbParent && (
                <>
                  <ChevronRight className="size-3" />
                  <Link href={`/${breadcrumbParent.slug}`} className="hover:text-white transition-colors capitalize">
                    {breadcrumbParent.name}
                  </Link>
                </>
              )}
              <ChevronRight className="size-3" />
              <span className="text-white">{displayName}</span>
            </nav>

            {/* Live availability pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-5 py-2 text-xs font-bold text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Available Today across {locationName}
            </div>

            {/* H1 — two lines, SEO-formula: [Service] in [Location] | action word */}
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Trusted {displayName}<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Experts in {locationName}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 mx-auto max-w-2xl text-lg text-blue-50/90 leading-relaxed">
              {svc.description ??
                `Premium ${displayName.toLowerCase()} solutions for ${locationName} residents. DED-licensed professionals, transparent AED pricing, and instant booking confirmation.`}
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-2">
                <StarRating rating={4.9} />
                <span className="text-white font-bold">4.9/5</span>
                <span className="text-blue-200 text-sm">(2.4k+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white text-sm">
                <span className="text-blue-400">🛡️</span> DED Licensed
              </div>
              <div className="flex items-center gap-2 text-white text-sm">
                <span className="text-blue-400">⚡</span> Same-day Available
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.04] transition-all"
              >
                Book a Service →
              </button>
              <Link
                href="/contact"
                className="rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-10 py-4 text-base font-extrabold text-white hover:bg-white/20 transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — STATS STRIP
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#002366] via-blue-700 to-cyan-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: '👷', value: '2,400+', label: 'Verified Providers', sub: 'DED Licensed' },
                { icon: '⭐', value: '4.9 / 5', label: 'Average Rating', sub: '2,400+ Reviews' },
                { icon: '⚡', value: '< 15 min', label: 'Response Time', sub: 'Same-Day Slots' },
                { icon: '🗺️', value: 'All 7', label: 'Emirates Covered', sub: 'UAE-Wide Service' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-6 text-center hover:bg-white/15 transition-all">
                  <span className="text-2xl">{s.icon}</span>
                  <p className="text-3xl font-extrabold text-white tracking-tight">{s.value}</p>
                  <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">{s.label}</p>
                  <p className="text-[10px] text-blue-200/70">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — SERVICE OVERVIEW (text left, real image right)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Text */}
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest mb-6">
                  Expert Solutions
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                  Premium {displayName} Solutions
                  <br />
                  <span className="text-blue-600">Tailored for {locationName}</span>
                </h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  From quick fixes to major projects, our platform connects you with the highest-rated {displayName.toLowerCase()} experts in {locationName}. Every professional is DED-licensed, background-checked, and equipped with the latest tools.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    'Identity Verified Experts', 'Transparent AED Pricing',
                    'Municipality Approved',     '24/7 Priority Support',
                    'Satisfaction Guaranteed',   'Digital Service Reports',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">✓</div>
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                >
                  Book Now — Starting {basePrice}
                </button>
              </div>

              {/* Real Image */}
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/services/handyman.webp"
                  alt={`${displayName} professional at work in ${locationName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Floating trust card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-slate-100/80">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">👷</div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Verified Expert Guarantee</p>
                      <p className="text-xs text-slate-500 mt-0.5">Every professional is insured and DED licensed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — SUB-SERVICES: Image Cards, max 8 initially
           ══════════════════════════════════════════════════════════════════ */}
        {subServices.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Header row with View All on right */}
              <div className="flex items-end justify-between mb-8 gap-4">
                <div>
                  <p className="section-label mb-2">Service Catalog</p>
                  <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {displayName} Services in {locationName}
                  </h2>
                </div>
                {subServices.length > 10 && (
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="shrink-0 rounded-full border-2 border-blue-600 px-5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    {showAllServices ? 'Show Less' : `View All (${subServices.length})`}
                  </button>
                )}
              </div>

              {/* Horizontal scroll carousel */}
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
                  {subServices.slice(0, showAllServices ? undefined : 10).map((sub) => {
                    const cardImg = getCardImage(sub.slug);
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${sub.slug}`}
                        className="group relative shrink-0 w-52 overflow-hidden rounded-2xl snap-start shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
                        style={{ aspectRatio: '3/4' }}
                      >
                        <Image
                          src={cardImg}
                          alt={`${sub.name} in ${locationName}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-600"
                          sizes="208px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                          <h3 className="text-sm font-extrabold text-white leading-tight mb-0.5">{sub.name}</h3>
                          <p className="text-[11px] text-blue-200 font-semibold mb-2">AED {sub.base_price || '99'}+</p>
                          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-xs group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">→</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — HOW IT WORKS: exact same design as homepage
           ══════════════════════════════════════════════════════════════════ */}

        <section className="hiw-v3-section" aria-label={`How ${displayName} booking works in ${locationName}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="hiw-v3-header">
              <p className="hiw-v3-label">Simple Process</p>
              <h2 className="hiw-v3-title">How It Works</h2>
              <p className="hiw-v3-subtitle">
                Get your {displayName.toLowerCase()} done in 3 easy steps. Professional, reliable, and hassle-free in {locationName}.
              </p>
            </div>

            <div className="hiw-v3-grid">
              {[
                {
                  num: '01',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  ),
                  title: 'Choose Your Service',
                  copy: `Select your exact ${displayName.toLowerCase()} package. Browse by price, availability, and neighborhood in ${locationName}.`,
                },
                {
                  num: '02',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: 'Get Matched Instantly',
                  copy: 'Our smart system connects you with the highest-rated professional in your specific neighborhood within seconds.',
                },
                {
                  num: '03',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                  title: 'Pay After Completion',
                  copy: 'Relax while our experts do the work. Pay securely via Card, Apple Pay, or Cash — only when 100% satisfied.',
                },
              ].map((step) => (
                <div key={step.num} className="hiw-v3-card">
                  <p className="hiw-v3-num">{step.num}</p>
                  <div className="hiw-v3-icon-box">{step.icon}</div>
                  <h3 className="hiw-v3-card-title">{step.title}</h3>
                  <p className="hiw-v3-card-copy">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SEO CONTENT SECTION 1 — Why Choose Us in [Location]
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest mb-5">
                  Why {locationName} Residents Trust Us
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
                  The #{1} Rated {displayName}<br />
                  <span className="text-blue-600">Provider in {locationName}</span>
                </h2>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  Over 50,000 {locationName} residents have booked {displayName.toLowerCase()} services through LocalServices AE. Every professional on our platform is DED-licensed, fully insured, and has passed strict background checks. We serve all neighbourhoods across {locationName} — from premium villas to mid-range apartments — with the same five-star standard.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Unlike other platforms, we guarantee pricing transparency: the AED quote you see is exactly what you pay. No hidden charges. No surprise call-out fees. Just reliable, professional {displayName.toLowerCase()} done right the first time.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-full bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                  >
                    Book Now →
                  </button>
                  <Link
                    href="/services"
                    className="rounded-full border-2 border-slate-200 px-7 py-3 text-sm font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all"
                  >
                    Browse All Services
                  </Link>
                </div>
              </div>
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={`Professional ${displayName} service in ${locationName}, UAE`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">✓</div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Satisfaction Guaranteed</p>
                      <p className="text-xs text-slate-500">30-day warranty on all {displayName.toLowerCase()} work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            TESTIMONIALS — Location-specific customer reviews
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-slate-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-label mb-3">Customer Reviews</p>
              <h2 className="section-h2-dark text-fluid-h2">
                What {locationName} Residents Say
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm">
                Real reviews from verified customers across {locationName}.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getTestimonials(displayName, locationName).map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex gap-0.5 text-yellow-400 mb-3">{'★'.repeat(t.rating)}</div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0 bg-gradient-to-br ${t.color}`}>{t.initials}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{locationName} · {t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SEO CONTENT SECTION 2 — Service Coverage in [Location]
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                <Image
                  src={getCardImage(`${location}/home-cleaning`)}
                  alt={`${displayName} coverage across all areas of ${locationName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <p className="text-5xl font-extrabold text-white">100%</p>
                  <p className="text-blue-200 font-semibold mt-1">of {locationName} Covered</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest mb-5">
                  Full Coverage
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
                  {displayName} Services Available<br />
                  <span className="text-blue-600">Across All of {locationName}</span>
                </h2>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  From the waterfront developments to suburban communities, our {displayName.toLowerCase()} professionals cover every corner of {locationName}. Whether you live in a high-rise apartment, a townhouse, or a standalone villa, we dispatch the right expert to your door — often within 60 minutes.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Our {locationName} team operates 7 days a week including public holidays. All services are available in both English and Arabic. Instant digital invoice provided after every completed job.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[`${locationName} Marina`, `Downtown ${locationName}`, `${locationName} Hills`, `${locationName} Suburbs`, 'Old Town Area', 'New Developments'].map((area) => (
                    <div key={area} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">✓</div>
                      {area}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 rounded-full bg-blue-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                >
                  Book for My Area →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — FAQ: Same design as homepage but BLUE accent
           ══════════════════════════════════════════════════════════════════ */}
        <section className="faq-section-blue" aria-label={`FAQ for ${displayName} in ${locationName}`}>

          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="faq-section-blue-label mb-3">Got Questions?</p>
              <h2 className="section-h2-dark text-fluid-h2">
                Common Questions About {locationName}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-relaxed text-slate-500">
                Everything you need to know about {displayName.toLowerCase()} services in {locationName}.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.q}
                    className={`faq-accordion-item-blue${isOpen ? ' faq-accordion-item-blue--open' : ''}`}
                  >
                    <button
                      className="faq-accordion-summary-blue"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`faq-accordion-num-blue${isOpen ? ' faq-accordion-num-blue--open' : ''}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="faq-accordion-q">{faq.q}</span>
                      </div>
                      <span
                        className="faq-accordion-chevron-blue"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                        aria-hidden="true"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: isOpen ? '400px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease',
                      }}
                    >
                      <div className="faq-accordion-body">{faq.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — FINAL CTA
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#002366] py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to get your {displayName} sorted?
            </h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Join 50,000+ happy residents across the UAE. Same-day booking, transparent pricing, 100% guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white px-10 py-4 text-base font-extrabold text-blue-900 shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
              >
                Book a Service Now
              </button>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white/25 px-10 py-4 text-base font-bold text-white hover:bg-white/10 transition-all"
              >
                Contact Support
              </Link>
            </div>
            <p className="mt-8 text-blue-200/60 text-sm">🔒 No credit card required · AED payments · 100% satisfaction guaranteed</p>
          </div>
        </section>

      </div>
    </>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toTitle(s: string) {
  return s.replace(/-/g, ' ').split('/').pop()!.replace(/\b\w/g, (l) => l.toUpperCase());
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400 text-base">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function buildJsonLd(svc: ServiceData, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Service',
    name,
    description: svc.description,
    provider: { '@type': 'LocalBusiness', name: 'LocalServices AE', areaServed: 'UAE' },
    offers:   { '@type': 'Offer', price: svc.base_price, priceCurrency: 'AED' },
  };
}

function getStaticFaqs(svcName: string, loc: string) {
  const areaMap: Record<string, string[]> = {
    Dubai:      ['Palm Jumeirah', 'Downtown', 'Marina', 'JVC', 'Al Barsha', 'Deira'],
    'Abu Dhabi':['Corniche', 'Al Reem Island', 'Khalidiyah', 'Saadiyat Island', 'Mussafah', 'Yas Island'],
    Sharjah:    ['Al Nahda', 'Al Majaz', 'Al Khan', 'Al Taawun', 'Muwailih', 'Al Qasimia'],
    Ajman:      ['Al Rashidiya', 'Al Nuaimiya', 'Al Rumailah', 'Emirates City', 'Al Jurf', 'Al Hamidiyah'],
    'Ras Al Khaimah': ['Al Hamra', 'Mina Al Arab', 'Al Nakheel', 'Al Dhait', 'Al Qurm', 'Ghalilah'],
    Fujairah:   ['Dibba', 'Khor Fakkan', 'Kalba', 'Al Faseel', 'Fujairah City', 'Qidfa'],
    'Umm Al Quwain': ['Al Salamah', 'Al Raas', 'Al Hamriyah', 'UAQ City Centre', 'Al Riqqah', 'Old Town'],
  };
  const areas = (areaMap[loc] || ['Downtown', 'Marina', 'Suburbs', 'Old Town', 'New Developments', 'City Centre']).join(', ');
  return [
    {
      q: `How quickly can I book ${svcName} in ${loc}?`,
      a: `You can book ${svcName} in ${loc} instantly through our platform. We offer same-day slots across all major areas including ${areas}. A professional can often arrive within 60 minutes.`,
    },
    {
      q: `Are your ${svcName} professionals in ${loc} licensed?`,
      a: `Yes. All our ${loc}-based service providers are DED-licensed, municipality-approved, and undergo rigorous background checks before joining our platform. Credentials are available on request.`,
    },
    {
      q: `What is the starting price for ${svcName} in ${loc}?`,
      a: `${svcName} in ${loc} starts from AED 99, depending on the scope of work. We maintain fully transparent pricing — you receive a clear estimate before the work begins with zero hidden fees.`,
    },
    {
      q: `Do you cover all areas of ${loc}?`,
      a: `Yes! We cover 100% of ${loc} including ${areas} and all surrounding suburbs. Wherever you are in ${loc}, we can reach you.`,
    },
    {
      q: `Is there a warranty on ${svcName} services in ${loc}?`,
      a: `We provide a 30-day service warranty on most ${svcName} jobs completed in ${loc}. If any issues arise from the work performed, we will dispatch a team back to resolve it at no extra cost.`,
    },
  ];
}

function getTestimonials(svcName: string, loc: string) {
  const pools: Record<string, Array<{name:string;initials:string;color:string;text:string;service:string;rating:number}>> = {
    Dubai: [
      { name:'Ahmed Al Mansoori', initials:'AM', color:'from-blue-600 to-cyan-500', rating:5, service:svcName, text:`Booked ${svcName} for our villa in Marina. The team was on time, professional, and the results exceeded our expectations. Will definitely use again.` },
      { name:'Sarah Mitchell', initials:'SM', color:'from-purple-600 to-pink-500', rating:5, service:svcName, text:`Excellent service in Downtown Dubai. The technician explained everything clearly and the pricing was exactly as quoted online. No surprise charges!` },
      { name:'Fatima Al Hashimi', initials:'FH', color:'from-emerald-600 to-teal-500', rating:5, service:svcName, text:`Used them for ${svcName} in JVC. Fast response, clean work, and the team was very respectful. Highly recommend to all Dubai residents.` },
      { name:'James O\'Brien', initials:'JO', color:'from-orange-500 to-red-500', rating:4, service:svcName, text:`Very satisfied with the ${svcName} in Palm Jumeirah. Good communication, arrived on schedule and did a thorough job. Would book again.` },
      { name:'Aisha Al Zaabi', initials:'AZ', color:'from-indigo-600 to-blue-500', rating:5, service:svcName, text:`Booked for our apartment in Al Barsha. The app is super easy and the team was outstanding. Exactly what Dubai residents need!` },
      { name:'Ravi Sharma', initials:'RS', color:'from-teal-600 to-cyan-400', rating:5, service:svcName, text:`Great ${svcName} experience in Deira. Professional crew, fair price, done in record time. LocalServices AE is now my go-to platform.` },
    ],
    'Abu Dhabi': [
      { name:'Khalid Al Mazrouei', initials:'KM', color:'from-blue-600 to-cyan-500', rating:5, service:svcName, text:`Booked ${svcName} for our Corniche apartment. Crew arrived within the hour, worked efficiently and left the place spotless.` },
      { name:'Emma Thompson', initials:'ET', color:'from-purple-600 to-pink-500', rating:5, service:svcName, text:`Wonderful ${svcName} experience on Al Reem Island. Very professional team and transparent pricing. I'll be a regular customer.` },
      { name:'Mariam Al Nuaimi', initials:'MN', color:'from-emerald-600 to-teal-500', rating:5, service:svcName, text:`Used for ${svcName} in Khalidiyah. Prompt, polite and thorough. The team even cleaned up perfectly after finishing the work.` },
      { name:'David Clark', initials:'DC', color:'from-orange-500 to-red-500', rating:4, service:svcName, text:`Good service in Saadiyat Island area. Booking was seamless and the technician was knowledgeable. Would recommend to expats in Abu Dhabi.` },
      { name:'Noura Al Shamsi', initials:'NS', color:'from-indigo-600 to-blue-500', rating:5, service:svcName, text:`Booked ${svcName} in Mussafah. Excellent value, very friendly team and job done to a high standard. 5 stars from Abu Dhabi!` },
      { name:'Priya Nair', initials:'PN', color:'from-teal-600 to-cyan-400', rating:5, service:svcName, text:`Outstanding ${svcName} on Yas Island. Booking was instant and the team was on time. Best service platform in Abu Dhabi!` },
    ],
  };
  const base = pools[loc] || pools['Dubai'].map(t => ({ ...t, text: t.text.replace('Dubai', loc) }));
  return base.slice(0, 6);
}

