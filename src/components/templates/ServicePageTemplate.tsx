'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';
import BookingModal from '@/components/ui/BookingModal';

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

  // Hero — use DB image or project local Dubai hero photo
  const heroImage = svc.image_url || '/assets/images/services/dubai-hero.webp';

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
        <section className="relative min-h-[620px] flex items-center justify-center overflow-hidden">
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

            {/* H1 */}
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {displayName}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Services
              </span>
              <br />in {locationName}
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
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: '2,400+', label: 'Verified Providers' },
                { value: '4.9★',   label: 'Average Rating' },
                { value: '< 15 min', label: 'Response Time' },
                { value: 'All 7',  label: 'Emirates Covered' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-1 text-sm font-semibold text-blue-100 uppercase tracking-wider">{s.label}</p>
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
          <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="section-label mb-3">Service Catalog</p>
                <h2 className="section-h2-dark text-fluid-h2">
                  Our specialized {displayName} offerings
                </h2>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                  Click any card to see detailed pricing and book your service in {locationName}.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subServices.slice(0, showAllServices ? undefined : 8).map((sub) => {
                  const cardImg = getCardImage(sub.slug);
                  return (
                    <Link
                      key={sub.slug}
                      href={`/${sub.slug}`}
                      className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                      <Image
                        src={cardImg}
                        alt={`${sub.name} service in ${locationName}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                        <h3 className="text-lg font-extrabold text-white mb-1.5 leading-tight">
                          {sub.name}
                        </h3>
                        <p className="text-xs text-blue-200 font-semibold mb-4">
                          Starting at AED {sub.base_price || '99'}
                        </p>
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-sm font-bold group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                          →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* View More / Show Less */}
              {subServices.length > 8 && (
                <div className="mt-14 text-center">
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="rounded-full bg-white border-2 border-slate-200 px-10 py-4 text-sm font-extrabold text-slate-800 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all"
                  >
                    {showAllServices
                      ? 'Show Less'
                      : `View All ${displayName} Services (+${subServices.length - 8} more)`}
                  </button>
                </div>
              )}
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
  return [
    {
      q: `How quickly can I book ${svcName} in ${loc}?`,
      a: `You can book ${svcName} in ${loc} instantly through our platform. We offer same-day slots across all major areas. In Downtown ${loc}, JBR, and Marina, a professional can arrive within 60 minutes.`,
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
      a: `Yes! We cover 100% of ${loc} including Palm Jumeirah, Downtown, Marina, Arabian Ranches, JVC, Al Barsha, Deira, Bur Dubai and all surrounding suburbs. Wherever you are, we can reach you.`,
    },
    {
      q: `Is there a warranty on ${svcName} services in ${loc}?`,
      a: `We provide a 30-day service warranty on most ${svcName} jobs completed in ${loc}. If any issues arise from the work performed, we will dispatch a team back to resolve it at no extra cost.`,
    },
  ];
}
