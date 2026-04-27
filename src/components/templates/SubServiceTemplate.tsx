'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';
import BookingModal from '@/components/ui/BookingModal';

export default function SubServiceTemplate({ svc, slug }: { svc: ServiceData; slug: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const displayName = svc.name ?? toTitle(slug.split('/').pop() || slug);
  const parentName  = svc.parent?.name ?? 'Service';
  const basePrice   = formatBasePrice(svc.base_price);
  
  // Location detection
  const location = slug.split('/')[1] || 'Dubai';
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);

  const included = getIncluded(displayName);
  const faqs     = getStaticFaqs(displayName, locationName);

  // Premium Hero Image
  const heroImage = svc.image_url || `https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1920&fm=webp`;

  return (
    <>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={displayName}
        location={locationName}
      />

      <div className="min-h-screen bg-white text-slate-900">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — PREMIUM HERO (BG Image + Glassmorphic Booking)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={displayName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px] items-center">
              <div>
                <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200/80">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <ChevronRight className="size-3" />
                  <Link href="/services" className="hover:text-white">Services</Link>
                  <ChevronRight className="size-3" />
                  <span className="text-white">{displayName}</span>
                </nav>

                <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-7xl leading-tight">
                  {displayName}
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    in {locationName}
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-blue-50">
                  {svc.description ?? `Get your ${displayName.toLowerCase()} sorted today. Trusted by 50,000+ residents in ${locationName}.`}
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-full bg-blue-600 px-10 py-4 text-base font-extrabold text-white shadow-xl hover:scale-105 transition-all"
                  >
                    Book Now — {basePrice}
                  </button>
                </div>
              </div>

              {/* Glassmorphic Panel */}
              <div className="hidden lg:block">
                <div 
                  className="rounded-3xl p-8 border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10"
                >
                  <p className="text-xs font-bold text-blue-200 uppercase mb-2">Service Details</p>
                  <div className="space-y-4 mb-8">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Availability</p>
                      <p className="text-white font-medium">Same-day available</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Price Guarantee</p>
                      <p className="text-white font-medium">Starting from {basePrice}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white text-blue-900 py-4 rounded-2xl font-extrabold shadow-xl hover:scale-[1.02] transition-all"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — WHAT'S INCLUDED
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8">What&apos;s Included</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {included.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
                 <Image
                    src={`https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800&fm=webp`}
                    alt="Service quality"
                    fill
                    className="object-cover"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — LOCATION FAQS
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-16">
              FAQs for {displayName} in {locationName}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm open:shadow-md transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-slate-800">
                    {faq.q}
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — FINAL CTA
           ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-blue-900 py-24 text-center text-white">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-4xl font-extrabold mb-6">Ready to get started?</h2>
            <p className="text-blue-100 text-lg mb-10">Experience the best {displayName.toLowerCase()} service in {locationName}.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-900 px-12 py-4 rounded-full font-extrabold text-lg shadow-2xl hover:scale-105 transition-all"
            >
              Book Your Service Now
            </button>
          </div>
        </section>

      </div>
    </>
  );
}

function toTitle(s: string) {
  return s.replace(/-/g, ' ').split('/').pop()!.replace(/\b\w/g, (l) => l.toUpperCase());
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

function getIncluded(name: string) {
  return [
    'Certified Professional',
    'Standard Equipment',
    'Service Warranty',
    'Digital Invoice',
  ];
}

function getStaticFaqs(svcName: string, loc: string) {
  return [
    { q: `How quickly can I book ${svcName} in ${loc}?`, a: `You can book ${svcName} in ${loc} instantly. We offer same-day slots in most areas.` },
    { q: `Are the providers verified?`, a: `Yes, all providers are background-checked and DED-licensed.` },
  ];
}
