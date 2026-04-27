'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingModal from '@/components/ui/BookingModal';

// ── All UAE Services — unique local WebP images, no icons ─────────────────────
const ALL_SERVICES = [
  {
    name: 'Home Cleaning',
    slug: 'services/dubai/home-cleaning',
    price: '149',
    img: '/assets/images/services/home-cleaning.webp',
    desc: 'Deep-clean your villa or apartment with HEPA vacuums and eco-safe products.',
  },
  {
    name: 'Maid Services',
    slug: 'services/dubai/maid-services',
    price: '199',
    img: '/assets/images/services/maid-services.webp',
    desc: 'Trusted, background-checked housekeepers on weekly or monthly plans.',
  },
  {
    name: 'AC Maintenance',
    slug: 'services/dubai/ac-maintenance',
    price: '249',
    img: '/assets/images/services/ac-maintenance.webp',
    desc: 'Coil cleaning, refrigerant top-up and full system servicing.',
  },
  {
    name: 'Plumbing',
    slug: 'services/dubai/plumbing',
    price: '199',
    img: '/assets/images/services/plumbing.webp',
    desc: 'Fix leaks, unblock drains and replace fittings same-day.',
  },
  {
    name: 'Electrical',
    slug: 'services/dubai/electrical',
    price: '199',
    img: '/assets/images/services/electrical.webp',
    desc: 'DEWA-approved wiring, fault finding and smart-home installation.',
  },
  {
    name: 'Painting',
    slug: 'services/dubai/painting',
    price: '349',
    img: '/assets/images/services/painting.webp',
    desc: 'Interior and exterior painting with premium washable emulsions.',
  },
  {
    name: 'Carpentry',
    slug: 'services/dubai/carpentry',
    price: '299',
    img: '/assets/images/services/carpentry.webp',
    desc: 'Custom furniture, kitchen cabinets and precision woodwork.',
  },
  {
    name: 'Pest Control',
    slug: 'services/dubai/pest-control',
    price: '299',
    img: '/assets/images/services/pest-control.webp',
    desc: 'Municipality-approved treatments with 60-day zero-recurrence guarantee.',
  },
  {
    name: 'Handyman',
    slug: 'services/dubai/handyman',
    price: '149',
    img: '/assets/images/services/handyman.webp',
    desc: 'TV mounting, furniture assembly, curtain fitting and minor repairs.',
  },
  {
    name: 'Landscaping',
    slug: 'services/dubai/landscaping',
    price: '399',
    img: '/assets/images/services/landscaping.webp',
    desc: 'Lawn mowing, tree trimming, irrigation and desert-resilient planting.',
  },
  {
    name: 'Deep Cleaning',
    slug: 'services/dubai/deep-cleaning',
    price: '249',
    img: '/assets/images/services/deep-cleaning.webp',
    desc: 'Intensive sanitization of all surfaces, grout, appliances and fixtures.',
  },
  {
    name: 'Move-In',
    slug: 'services/dubai/move-in',
    price: '349',
    img: '/assets/images/services/move-in.webp',
    desc: 'End-to-end relocation assistance — packing, transport and setup.',
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

                  {/* Strong bottom gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Text content — bottom aligned, NO icon */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                    <h3 className="text-[15px] font-extrabold text-white leading-tight mb-1">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-blue-300 font-semibold mb-3">
                      From AED {svc.price}
                    </p>
                    {/* Arrow — shows on hover */}
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300">
                      →
                    </div>
                  </div>
                </Link>
              ))}
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

      </div>
    </>
  );
}
