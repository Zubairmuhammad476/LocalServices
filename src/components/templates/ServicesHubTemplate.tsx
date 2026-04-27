'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingModal from '@/components/ui/BookingModal';

// ── All UAE Services — each with a unique local WebP image ────────────────────
const ALL_SERVICES = [
  {
    name: 'Home Cleaning',
    slug: 'services/dubai/home-cleaning',
    price: '149',
    img: '/assets/images/services/home-cleaning.webp',
    icon: '🧹',
    desc: 'Deep-clean your villa or apartment. HEPA vacuums, eco-safe products.',
  },
  {
    name: 'Maid Services',
    slug: 'services/dubai/maid-services',
    price: '199',
    img: '/assets/images/services/maid-services.webp',
    icon: '🏠',
    desc: 'Trusted, background-checked housekeepers on weekly or monthly plans.',
  },
  {
    name: 'AC Maintenance',
    slug: 'services/dubai/ac-maintenance',
    price: '249',
    img: '/assets/images/services/ac-maintenance.webp',
    icon: '❄️',
    desc: 'Coil cleaning, refrigerant top-up and full system servicing.',
  },
  {
    name: 'Plumbing',
    slug: 'services/dubai/plumbing',
    price: '199',
    img: '/assets/images/services/plumbing.webp',
    icon: '🔧',
    desc: 'Fix leaks, unblock drains and replace fittings same-day.',
  },
  {
    name: 'Electrical',
    slug: 'services/dubai/electrical',
    price: '199',
    img: '/assets/images/services/electrical.webp',
    icon: '⚡',
    desc: 'DEWA-approved wiring, fault finding and smart-home installation.',
  },
  {
    name: 'Painting',
    slug: 'services/dubai/painting',
    price: '349',
    img: '/assets/images/services/painting.webp',
    icon: '🎨',
    desc: 'Interior and exterior painting with premium washable emulsions.',
  },
  {
    name: 'Carpentry',
    slug: 'services/dubai/carpentry',
    price: '299',
    img: '/assets/images/services/carpentry.webp',
    icon: '🪚',
    desc: 'Custom furniture, kitchen cabinets and precision woodwork.',
  },
  {
    name: 'Pest Control',
    slug: 'services/dubai/pest-control',
    price: '299',
    img: '/assets/images/services/pest-control.webp',
    icon: '🛡️',
    desc: 'Municipality-approved treatments with 60-day zero-recurrence guarantee.',
  },
  {
    name: 'Handyman',
    slug: 'services/dubai/handyman',
    price: '149',
    img: '/assets/images/services/handyman.webp',
    icon: '🛠️',
    desc: 'TV mounting, furniture assembly, curtain fitting and minor repairs.',
  },
  {
    name: 'Landscaping',
    slug: 'services/dubai/landscaping',
    price: '399',
    img: '/assets/images/services/landscaping.webp',
    icon: '🌿',
    desc: 'Lawn mowing, tree trimming, irrigation and desert-resilient planting.',
  },
  {
    name: 'Deep Cleaning',
    slug: 'services/dubai/deep-cleaning',
    price: '249',
    img: '/assets/images/services/deep-cleaning.webp',
    icon: '✨',
    desc: 'Intensive sanitization of all surfaces, grout, appliances and fixtures.',
  },
  {
    name: 'Move-In',
    slug: 'services/dubai/move-in',
    price: '349',
    img: '/assets/images/services/move-in.webp',
    icon: '📦',
    desc: 'End-to-end relocation assistance — packing, transport and setup.',
  },
];

const EMIRATES = [
  { name: 'Dubai',            slug: 'services/dubai',          emoji: '🏙️' },
  { name: 'Abu Dhabi',        slug: 'services/abu-dhabi',       emoji: '🏛️' },
  { name: 'Sharjah',          slug: 'services/sharjah',         emoji: '🕌' },
  { name: 'Ajman',            slug: 'services/ajman',           emoji: '🌊' },
  { name: 'Ras Al Khaimah',   slug: 'services/ras-al-khaimah',  emoji: '⛰️' },
  { name: 'Fujairah',         slug: 'services/fujairah',        emoji: '🌄' },
  { name: 'Umm Al Quwain',    slug: 'services/umm-al-quwain',   emoji: '🌅' },
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
            HERO — Clean, centered, light
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-[#f0f6ff] to-white pt-16 pb-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-blue-600">Services</span>
            </nav>

            {/* Label */}
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-700">
              Verified UAE Professionals
            </p>

            {/* H1 — Koray-formula SEO title */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Professional Home Services{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Across UAE
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 leading-relaxed">
              3,600+ verified experts in Dubai, Abu Dhabi, Sharjah and all 7 Emirates.
              DED-licensed, background-checked, transparent AED pricing — book in under 2 minutes.
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="text-yellow-400 text-base">★★★★★</span> 4.9 / 5
              </div>
              <div className="flex items-center gap-1.5"><span className="text-blue-500">🛡️</span> DED Licensed</div>
              <div className="flex items-center gap-1.5"><span className="text-blue-500">⚡</span> Same-Day Available</div>
              <div className="flex items-center gap-1.5"><span className="text-blue-500">💳</span> AED Payments Only</div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-blue-600 px-10 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-[1.03] transition-all"
              >
                Book a Service →
              </button>
              <Link
                href="/contact"
                className="rounded-full border-2 border-slate-200 px-10 py-4 text-base font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SERVICES GRID — All 12, square-ish cards, unique images
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
              <p className="section-label mb-3">Service Catalog</p>
              <h2 className="section-h2-dark text-fluid-h2">
                All Home &amp; Maintenance Services
              </h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                Choose your service below — each is staffed by verified UAE professionals with transparent pricing.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ALL_SERVICES.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${svc.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 bg-slate-100"
                >
                  {/* Background image */}
                  <Image
                    src={svc.img}
                    alt={`${svc.name} service in UAE — DED licensed professionals`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-600"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-slate-900/5" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-center">
                    <span className="mb-2 text-2xl">{svc.icon}</span>
                    <h3 className="text-base font-extrabold text-white leading-tight mb-0.5">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-blue-200 font-semibold">
                      From AED {svc.price}
                    </p>
                    {/* Arrow pill */}
                    <div className="mt-3 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 text-xs group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EMIRATES STRIP — Browse by location
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-16 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-slate-900">Browse by Emirate</h2>
              <p className="mt-2 text-slate-500 text-sm">Services available in all 7 UAE Emirates</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              {EMIRATES.map((em) => (
                <Link
                  key={em.slug}
                  href={`/${em.slug}`}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-slate-100 p-5 text-center shadow-sm hover:border-blue-400 hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <span className="text-3xl">{em.emoji}</span>
                  <span className="text-sm font-bold text-slate-800">{em.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FINAL CTA
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#002366] py-20 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-blue-200 mb-8">
              Tell us what the problem is — our team will recommend the right expert and book them for you.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-white px-10 py-4 text-base font-extrabold text-blue-900 shadow-xl hover:scale-105 transition-all"
            >
              Book a Service Now
            </button>
          </div>
        </section>

      </div>
    </>
  );
}
