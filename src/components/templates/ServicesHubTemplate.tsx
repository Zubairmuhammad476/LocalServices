'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingModal from '@/components/ui/BookingModal';

// ── All UAE Services — SEO-optimised descriptions, unique WebP images ─────────
const ALL_SERVICES = [
  {
    name: 'Home Cleaning',
    slug: 'services/dubai/home-cleaning',
    img: '/assets/images/services/home-cleaning.webp',
    desc: 'Professional home cleaning in Dubai using HEPA-filtered vacuums and eco-safe products. Trained maids sanitize every room to hotel-grade standards — book same-day.',
  },

  {
    name: 'AC Maintenance',
    slug: 'services/dubai/ac-maintenance',
    img: '/assets/images/services/ac-maintenance.webp',
    desc: 'Certified AC technicians in Dubai for coil cleaning, refrigerant top-ups and full system servicing. Reduce your DEWA bill and breathe cleaner air.',
  },
  {
    name: 'Plumbing',
    slug: 'services/dubai/plumbing',
    img: '/assets/images/services/plumbing.webp',
    desc: 'Licensed plumbers fix leaks, unblock drains and replace fittings same-day across Dubai and Abu Dhabi. Arrive with all parts — no second visit needed.',
  },
  {
    name: 'Electrical',
    slug: 'services/dubai/electrical',
    img: '/assets/images/services/electrical.webp',
    desc: 'DEWA-approved electricians for wiring, fault finding and smart-home installation. Certified, insured and available same-day throughout UAE.',
  },
  {
    name: 'Painting',
    slug: 'services/dubai/painting',
    img: '/assets/images/services/painting.webp',
    desc: 'Interior and exterior painting with premium washable emulsions. Villa, apartment and commercial projects completed by experienced painters in UAE.',
  },
  {
    name: 'Carpentry',
    slug: 'services/dubai/carpentry',
    img: '/assets/images/services/carpentry.webp',
    desc: 'Custom furniture, kitchen cabinets and precision woodwork by skilled carpenters. From IKEA assembly to bespoke joinery — serving Dubai, Abu Dhabi and Sharjah.',
  },
  {
    name: 'Pest Control',
    slug: 'services/dubai/pest-control',
    img: '/assets/images/services/pest-control.webp',
    desc: 'Municipality-approved pest control treatments in Dubai with a 60-day zero-recurrence guarantee. One visit eliminates cockroaches, ants and rodents.',
  },
  {
    name: 'Handyman',
    slug: 'services/dubai/handyman',
    img: '/assets/images/services/handyman.webp',
    desc: 'Skilled handymen for TV mounting, furniture assembly, curtain fitting and minor repairs. Fully equipped — arrive on time, every time across UAE.',
  },
  {
    name: 'Landscaping',
    slug: 'services/dubai/landscaping',
    img: '/assets/images/services/landscaping.webp',
    desc: 'Professional landscaping in UAE — lawn mowing, tree trimming, irrigation setup and desert-resilient planting to keep your garden lush year-round.',
  },
  {
    name: 'Deep Cleaning',
    slug: 'services/dubai/deep-cleaning',
    img: '/assets/images/services/deep-cleaning.webp',
    desc: 'Intensive deep-cleaning of all surfaces, grout, kitchen appliances and bathroom fixtures. Ideal for move-in, move-out or seasonal sanitization in UAE.',
  },

];

// ── Emirates — each with its own photorealistic background image ───────────────
const EMIRATES = [
  { name: 'Dubai',          slug: 'services/dubai',         img: '/assets/images/emirates/dubai.webp' },
  { name: 'Abu Dhabi',      slug: 'services/abu-dhabi',      img: '/assets/images/emirates/abu-dhabi.webp' },
  { name: 'Sharjah',        slug: 'services/sharjah',        img: '/assets/images/emirates/sharjah.webp' },
  { name: 'Ajman',          slug: 'services/ajman',          img: '/assets/images/emirates/ajman.webp' },
  { name: 'Ras Al Khaimah', slug: 'services/ras-al-khaimah', img: '/assets/images/emirates/ras-al-khaimah.webp' },
  { name: 'Fujairah',       slug: 'services/fujairah',       img: '/assets/images/emirates/fujairah.webp' },
  { name: 'Umm Al Quwain',  slug: 'services/umm-al-quwain',  img: '/assets/images/emirates/umm-al-quwain.webp' },
];

export default function ServicesHubTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Home Service"
        location="UAE"
      />

      <div className="min-h-screen bg-white">

        {/* ══════════════════════════════════════════════════════════════════
            HERO — Full-width real photo background, centered content
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden">
          {/* Background photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/services/services-hero.webp"
              alt="Professional home services across UAE — LocalServices AE"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/80" />
          </div>

          {/* Centered content */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-blue-400/60">/</span>
              <span className="text-white">Services</span>
            </nav>

            {/* Label pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-5 py-2 text-xs font-bold text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Verified UAE Professionals — Available Now
            </div>

            {/* H1 */}
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Professional Home{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Services
              </span>
              <br />Across UAE
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-50/85 leading-relaxed">
              3,600+ verified experts in Dubai, Abu Dhabi, Sharjah and all 7 Emirates.
              DED-licensed, background-checked — book in under 2 minutes.
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5</span>
                <span className="text-blue-200 font-normal text-sm">(2.4k+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-white text-sm"><span className="text-blue-400">🛡️</span> DED Licensed</div>
              <div className="flex items-center gap-1.5 text-white text-sm"><span className="text-blue-400">⚡</span> Same-Day Available</div>
              <div className="flex items-center gap-1.5 text-white text-sm"><span className="text-blue-400">💳</span> AED Payments</div>
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
            SERVICES GRID — 12 square cards, image backgrounds, NO icons
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="section-label mb-3">Service Catalog</p>
              <h2 className="section-h2-dark text-fluid-h2">
                All Home &amp; Maintenance Services
              </h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm">
                Choose your service — all staffed by verified UAE professionals with transparent AED pricing.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ALL_SERVICES.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${svc.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-slate-200"
                >
                  {/* Full background image */}
                  <Image
                    src={svc.img}
                    alt={`${svc.name} service in UAE — DED licensed professionals`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Default gradient — lighter at top, strong at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-400" />

                  {/* Hover overlay — stronger gradient for description readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-[#002366]/85 to-[#002366]/60 opacity-0 group-hover:opacity-95 transition-opacity duration-400" />

                  {/* Default state: name + arrow at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center transition-all duration-400 group-hover:opacity-0 group-hover:translate-y-4">
                    <h3 className="text-base font-extrabold text-white leading-tight mb-3">
                      {svc.name}
                    </h3>
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs">
                      →
                    </div>
                  </div>

                  {/* Hover state: name + description + CTA */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    <h3 className="text-lg font-extrabold text-white leading-tight mb-2">
                      {svc.name}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-blue-100/90 mb-4 max-w-[220px]">
                      {svc.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 text-xs font-bold text-white">
                      View Service →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SEO CONTENT — Image + text side-by-side for search authority
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-[var(--ghost-white)]" aria-label="Why choose LocalServices AE for home services in UAE">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Image side */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/assets/images/services/why-localservices.png"
                    alt="LocalServices AE technician consulting with a homeowner inside a modern Dubai apartment"
                    width={640}
                    height={480}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Glassmorphism DED badge — center bottom of image */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-2xl px-6 py-3.5 shadow-lg border border-white/25 backdrop-blur-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg">🏛️</div>
                    <div>
                      <p className="text-sm font-extrabold text-white">DED Licensed</p>
                      <p className="text-[11px] text-white/70">Dubai Economy & Tourism</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div>
                <p className="section-label mb-3">Why LocalServices AE</p>
                <h2 className="section-h2-dark text-fluid-h2 mb-6">UAE&apos;s Most Trusted Home Service Marketplace</h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                  <p>
                    LocalServices AE connects homeowners across <strong className="text-slate-900">Dubai, Abu Dhabi, Sharjah</strong> and all 7 UAE Emirates with <strong className="text-slate-900">3,600+ DED-licensed professionals</strong>. Every technician is background-checked, fully insured with AED 10,000 accidental damage coverage, and arrives with all tools and materials — so you never need a second visit.
                  </p>
                  <p>
                    From <strong className="text-slate-900">emergency AC repair</strong> and <strong className="text-slate-900">same-day plumbing</strong> to scheduled deep-cleaning and villa painting, our platform handles bookings in under 2 minutes. Transparent AED pricing means no hidden fees — the quote you see is the price you pay.
                  </p>
                  <p>
                    We serve over <strong className="text-slate-900">80 neighborhoods</strong> including JVC, Palm Jumeirah, Al Reem Island, Mirdif, Saadiyat Island and Downtown Dubai. Whether you need a one-time handyman or recurring deep cleaning, our <strong className="text-slate-900">7-day satisfaction guarantee</strong> ensures you are 100% protected.
                  </p>
                </div>

                {/* Trust bullets */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { icon: '⏰', text: '60-Min Emergency Response' },
                    { icon: '🛡️', text: 'AED 10k Damage Cover' },
                    { icon: '✅', text: 'Background-Checked Pros' },
                    { icon: '💰', text: 'Transparent AED Pricing' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base">{item.icon}</span>
                      <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EMIRATES STRIP — Real photographic cards, no emoji
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-slate-900">Browse by Emirate</h2>
              <p className="mt-2 text-slate-500 text-sm">Services available across all 7 UAE Emirates</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {EMIRATES.map((em) => (
                <Link
                  key={em.slug}
                  href={`/${em.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
                >
                  {/* Background photo */}
                  <Image
                    src={em.img}
                    alt={`Home services in ${em.name}, UAE`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                    <span className="text-xs font-extrabold text-white leading-tight block">{em.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FINAL CTA
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#002366] py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)]" />
          <div className="relative mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              Tell us your problem — our team will recommend the right expert and book them for you.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white px-10 py-4 text-base font-extrabold text-blue-900 shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
            >
              Book a Service Now
            </button>
            <p className="mt-6 text-blue-200/50 text-sm">🔒 No credit card required · AED payments · 100% satisfaction guaranteed</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FAQ — Service-related questions for SEO & user trust
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 bg-[var(--ghost-white)]" aria-label="Frequently asked questions about home services in UAE">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label">Got Questions?</p>
              <h2 className="section-h2-dark mt-3 text-fluid-h2">Frequently Asked Questions</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: '#64748B' }}>
                Everything you need to know before booking a home service in the UAE.
              </p>
            </div>
            <div className="mt-12 space-y-3">
              {[
                {
                  q: 'What home services do you offer in Dubai and Abu Dhabi?',
                  a: 'We offer 13 professional home services including AC maintenance, home cleaning, deep cleaning, plumbing, electrical, painting, carpentry, pest control, landscaping, pool services, renovation, waterproofing, glass & aluminum, and handyman services. All services are available across Dubai, Abu Dhabi, Sharjah and all 7 UAE Emirates.',
                },
                {
                  q: 'How quickly can a technician arrive at my home?',
                  a: 'For emergency services such as AC repair or plumbing, we guarantee arrival within 60 minutes across Dubai and Abu Dhabi. Standard bookings can be scheduled same-day or for the next available morning slot at your preferred time.',
                },
                {
                  q: 'Are your service providers licensed and insured?',
                  a: 'Yes. Every professional on our platform holds a valid UAE trade licence and is fully insured. We carry AED 10,000 accidental damage coverage per booking. All credentials are verified before onboarding, including DED licence checks and background screening.',
                },
                {
                  q: 'How does pricing work — are there hidden fees?',
                  a: 'We operate on a transparent AED pricing model. The quote you receive is the price you pay — no hidden charges, no surge pricing, and no call-out fees. You can view service rates before confirming your booking.',
                },
                {
                  q: 'Can I book a service for the same day?',
                  a: 'Absolutely. Most of our services offer same-day availability. Simply select your preferred time slot when booking and receive confirmation within 2 minutes. Emergency services like plumbing and electrical are dispatched immediately.',
                },
                {
                  q: 'What happens if I am not satisfied with the service?',
                  a: 'We offer a 7-day satisfaction guarantee on every booking. If you are not 100% satisfied, we will arrange a complimentary re-service or issue a full refund. Your payment is held in escrow until you confirm the job is complete.',
                },
                {
                  q: 'Do I need to provide tools or cleaning supplies?',
                  a: 'No. Our professionals arrive fully equipped with all necessary tools, equipment and industry-grade consumables. For specialty requirements such as specific paint brands, we will advise you in advance so you can approve the materials.',
                },
                {
                  q: 'Which areas in the UAE do you cover?',
                  a: 'We operate in all 7 Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. Coverage includes over 80 neighborhoods such as JVC, Palm Jumeirah, Al Reem Island, Mirdif, Saadiyat Island, Downtown Dubai, Al Nahda and more.',
                },
              ].map((faq, i) => (
                <details
                  key={faq.q}
                  className="faq-item"
                >
                  <summary className="faq-summary">
                    <span>{faq.q}</span>
                    <svg className="faq-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </summary>
                  <div className="faq-body">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
