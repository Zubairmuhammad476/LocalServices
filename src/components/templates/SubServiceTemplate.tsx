'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  formatBasePrice,
  type ServiceData,
} from '@/lib/server/fetchService';
import BookingModal from '@/components/ui/BookingModal';
import { useGeoLocation } from '@/hooks/useGeoLocation';

export default function SubServiceTemplate({ svc, slug }: { svc: ServiceData; slug: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx]   = useState<number | null>(null);
  
  const displayName = svc.name ?? toTitle(slug.split('/').pop() || slug);
  const parentName  = svc.parent?.name ?? 'Service';
  const basePrice   = formatBasePrice(svc.base_price);
  
  // Location detection
  const location = slug.split('/')[1] || 'Dubai';
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);

  // IP-based geolocation — detected emirate for testimonials
  const detectedEmirate = useGeoLocation(locationName);
  const [reviewLocation, setReviewLocation] = useState(locationName);

  useEffect(() => {
    if (detectedEmirate) {
      setReviewLocation(detectedEmirate);
    }
  }, [detectedEmirate]);

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
            SECTION 1 — PREMIUM HERO (Centered, Full-width BG)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${displayName} services in ${locationName}, UAE`}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/60 to-slate-900/80" />
          </div>

          {/* Centered content */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 text-center">

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="size-3" />
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight className="size-3" />
              <Link href={`/services/${location}`} className="hover:text-white transition-colors">{locationName}</Link>
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
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {displayName}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Experts in {locationName}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 mx-auto max-w-2xl text-lg text-blue-50/90 leading-relaxed">
              {svc.description ?? `Premium ${displayName.toLowerCase()} solutions for ${locationName} residents. DED-licensed professionals, transparent AED pricing, and instant booking confirmation.`}
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
              <a
                href={`https://wa.me/923329073273?text=${encodeURIComponent(`Hi! I need ${displayName} service in ${locationName}. Can you help?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-10 py-4 text-base font-extrabold text-white shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.04] transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="#ffffff" aria-hidden="true">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.738 5.507 2.031 7.838L0 32l8.396-2.002A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.77 22.584c-.322.904-1.891 1.728-2.604 1.839-.713.112-1.596.16-2.577-.162-.594-.195-1.36-.455-2.33-.893-4.085-1.768-6.752-5.828-6.956-6.098-.203-.27-1.656-2.199-1.656-4.196s1.047-2.976 1.42-3.385c.372-.41.811-.512 1.081-.512.27 0 .54.002.776.014.249.012.582-.095.912.695.338.81 1.149 2.806 1.25 3.01.101.203.168.44.034.71-.135.27-.203.44-.405.676-.203.236-.427.528-.609.71-.203.203-.414.422-.178.828.236.405 1.047 1.725 2.247 2.793 1.543 1.373 2.846 1.797 3.251 1.999.405.203.642.169.88-.101.237-.27 1.014-1.182 1.285-1.588.27-.405.54-.338.912-.203.372.135 2.364 1.116 2.77 1.317.405.203.675.304.776.473.101.169.101.979-.22 1.884z" />
                </svg>
                Chat on WhatsApp
              </a>
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
            SECTION 3 — FAQ: Blue accordion (same design as ServicePageTemplate)
           ══════════════════════════════════════════════════════════════════ */}
        <section className="faq-section-blue" aria-label={`FAQ for ${displayName} in ${locationName}`}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="faq-section-blue-label mb-3">Got Questions?</p>
              <h2 className="section-h2-dark text-fluid-h2">
                Common Questions About {displayName} in {locationName}
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
            TESTIMONIALS — Dynamic location-based customer reviews
           ══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Customer Reviews</p>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                What {reviewLocation} Residents Say
              </h2>
              <p className="mt-3 text-slate-500 max-w-lg mx-auto text-sm">
                Real reviews from verified customers across {reviewLocation}.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getTestimonials(displayName, reviewLocation).map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex gap-0.5 text-yellow-400 mb-3">{'★'.repeat(t.rating)}</div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0 bg-gradient-to-br ${t.color}`}>{t.initials}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{reviewLocation} · {t.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION — FINAL CTA
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
  const areaMap: Record<string, string[]> = {
    Dubai:             ['Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'JVC', 'Al Barsha', 'Deira', 'Business Bay', 'Jumeirah'],
    'Abu Dhabi':       ['Corniche', 'Al Reem Island', 'Khalidiyah', 'Saadiyat Island', 'Mussafah', 'Yas Island', 'Al Shamkha', 'Mohammed Bin Zayed City'],
    Sharjah:           ['Al Nahda', 'Al Majaz', 'Al Khan', 'Al Taawun', 'Muwailih', 'Al Qasimia', 'University City', 'Al Mamzar'],
    Ajman:             ['Al Rashidiya', 'Al Nuaimiya', 'Al Rumailah', 'Emirates City', 'Al Jurf', 'Al Hamidiyah', 'Al Mowaihat', 'Al Tallah'],
    'Ras Al Khaimah':  ['Al Hamra', 'Mina Al Arab', 'Al Nakheel', 'Al Dhait', 'Al Qurm', 'Ghalilah', 'Khuzam', 'Al Mairid'],
    Fujairah:          ['Fujairah City', 'Al Faseel', 'Dibba Al Fujairah', 'Khor Fakkan', 'Kalba', 'Qidfa', 'Mirbah', 'Al Aqah'],
    'Umm Al Quwain':   ['Al Salamah', 'Al Raas', 'Al Hamriyah', 'UAQ City Centre', 'Al Riqqah', 'Old Town', 'Falaj Al Mualla', 'Al Dar Al Baida'],
  };
  const areas = (areaMap[loc] || areaMap['Dubai']).join(', ');
  const topAreas = (areaMap[loc] || areaMap['Dubai']).slice(0, 4).join(', ');

  return [
    {
      q: `How quickly can I book ${svcName} in ${loc}?`,
      a: `You can book ${svcName} in ${loc} instantly through our platform. We offer same-day slots across all major areas including ${areas}. A qualified professional can often arrive within 60 minutes of confirmed booking.`,
    },
    {
      q: `Are your ${svcName} professionals in ${loc} licensed?`,
      a: `Yes. Every ${svcName} professional on our platform serving ${loc} is DED-licensed, municipality-approved, and has passed rigorous background verification. We maintain strict onboarding standards to ensure only qualified experts join our network.`,
    },
    {
      q: `What is the starting price for ${svcName} in ${loc}?`,
      a: `${svcName} in ${loc} starts from AED 99, depending on the scope of work and property type. We maintain fully transparent pricing — the AED quote you receive before booking is exactly what you pay. No hidden fees, no surprise call-out charges.`,
    },
    {
      q: `Do you cover all areas of ${loc}?`,
      a: `Yes! We cover 100% of ${loc} including ${areas} and all surrounding residential and commercial zones. Wherever you are in ${loc}, our verified professionals can reach you.`,
    },
    {
      q: `Is there a warranty on ${svcName} in ${loc}?`,
      a: `We provide a 30-day service warranty on most ${svcName} jobs completed in ${loc}. If any issues arise from the work performed, we dispatch a professional back to resolve it at no extra cost. Your satisfaction is guaranteed.`,
    },
    {
      q: `What payment methods do you accept for ${svcName} in ${loc}?`,
      a: `We accept multiple payment options for your convenience: cash on completion, credit/debit cards (Visa & Mastercard), Apple Pay, and bank transfers. Payment is collected only after the ${svcName} job is completed to your satisfaction.`,
    },
    {
      q: `Can I book ${svcName} for weekends or holidays in ${loc}?`,
      a: `Absolutely. Our ${loc}-based ${svcName} professionals operate 7 days a week, including public holidays and weekends. We offer flexible morning, afternoon, and evening time slots — so you can book whenever it suits your schedule.`,
    },
    {
      q: `How do I choose the right ${svcName} professional in ${loc}?`,
      a: `Our platform automatically matches you with the highest-rated available professional near ${topAreas} and your specific neighbourhood. Each provider profile includes verified ratings, completed job count, and certifications — so you can book with full confidence.`,
    },
  ];
}

// ── Testimonials — unique reviewers per emirate ───────────────────────────────

type Testimonial = { name: string; initials: string; color: string; text: string; service: string; rating: number };

function getTestimonials(svcName: string, loc: string): Testimonial[] {
  const pools: Record<string, Testimonial[]> = {

    /* ── Dubai ─────────────────────────────────────────────────────────── */
    Dubai: [
      { name: 'Ahmed Al Mansoori',  initials: 'AM', color: 'from-blue-600 to-cyan-500',    rating: 5, service: svcName, text: `Booked ${svcName} for our villa in Dubai Marina. The team was on time, professional, and the results exceeded our expectations. Will definitely use again.` },
      { name: 'Sarah Mitchell',     initials: 'SM', color: 'from-purple-600 to-pink-500',   rating: 5, service: svcName, text: `Excellent ${svcName} service in Downtown Dubai. The technician explained everything clearly and the pricing was exactly as quoted online. No surprise charges!` },
      { name: 'Fatima Al Hashimi',  initials: 'FH', color: 'from-emerald-600 to-teal-500',  rating: 5, service: svcName, text: `Used them for ${svcName} in JVC. Fast response, clean work, and the team was very respectful. Highly recommend to all Dubai residents.` },
      { name: 'James O\'Brien',    initials: 'JO', color: 'from-orange-500 to-red-500',     rating: 5, service: svcName, text: `Very satisfied with the ${svcName} in Palm Jumeirah. Good communication, arrived on schedule and did a thorough job. Would book again.` },
      { name: 'Aisha Al Zaabi',     initials: 'AZ', color: 'from-indigo-600 to-blue-500',   rating: 5, service: svcName, text: `Booked ${svcName} for our apartment in Al Barsha. The app is super easy and the team was outstanding. Exactly what Dubai residents need!` },
      { name: 'Ravi Sharma',        initials: 'RS', color: 'from-teal-600 to-cyan-400',     rating: 5, service: svcName, text: `Great ${svcName} experience in Deira. Professional crew, fair price, done in record time. LocalServices AE is now my go-to platform.` },
    ],

    /* ── Abu Dhabi ─────────────────────────────────────────────────────── */
    'Abu Dhabi': [
      { name: 'Khalid Al Mazrouei', initials: 'KM', color: 'from-blue-600 to-cyan-500',    rating: 5, service: svcName, text: `Booked ${svcName} for our Corniche apartment. Crew arrived within the hour, worked efficiently and left the place spotless.` },
      { name: 'Emma Thompson',      initials: 'ET', color: 'from-purple-600 to-pink-500',   rating: 5, service: svcName, text: `Wonderful ${svcName} experience on Al Reem Island. Very professional team and transparent pricing. I'll be a regular customer.` },
      { name: 'Mariam Al Nuaimi',   initials: 'MN', color: 'from-emerald-600 to-teal-500',  rating: 5, service: svcName, text: `Used for ${svcName} in Khalidiyah. Prompt, polite and thorough. The team even cleaned up perfectly after finishing the work.` },
      { name: 'David Clark',        initials: 'DC', color: 'from-orange-500 to-red-500',     rating: 5, service: svcName, text: `Good ${svcName} service in Saadiyat Island area. Booking was seamless and the technician was knowledgeable. Would recommend to expats in Abu Dhabi.` },
      { name: 'Noura Al Shamsi',    initials: 'NS', color: 'from-indigo-600 to-blue-500',   rating: 5, service: svcName, text: `Booked ${svcName} in Mussafah. Excellent value, very friendly team and job done to a high standard. 5 stars from Abu Dhabi!` },
      { name: 'Priya Nair',         initials: 'PN', color: 'from-teal-600 to-cyan-400',     rating: 5, service: svcName, text: `Outstanding ${svcName} on Yas Island. Booking was instant and the team was on time. Best service platform in Abu Dhabi!` },
    ],

    /* ── Sharjah ───────────────────────────────────────────────────────── */
    Sharjah: [
      { name: 'Omar Al Suwaidi',    initials: 'OS', color: 'from-sky-600 to-blue-500',      rating: 5, service: svcName, text: `Called for ${svcName} in Al Nahda and the professional arrived within 40 minutes. Very skilled, polite, and left everything clean. Outstanding service!` },
      { name: 'Linda Fernandez',    initials: 'LF', color: 'from-rose-500 to-pink-500',     rating: 5, service: svcName, text: `We needed urgent ${svcName} in Al Majaz. LocalServices AE connected us with a licensed technician same-day. Couldn't be happier with the quality.` },
      { name: 'Hassan Al Ketbi',    initials: 'HK', color: 'from-amber-500 to-orange-500',  rating: 5, service: svcName, text: `Reliable ${svcName} in Al Khan area. Fair pricing, no hidden fees, and they even followed up the next day. This is how service should be done.` },
      { name: 'Catherine Moore',    initials: 'CM', color: 'from-violet-600 to-purple-500', rating: 5, service: svcName, text: `Booked ${svcName} for our flat in Al Taawun. The booking process was seamless and the work was completed faster than expected. Highly recommended!` },
      { name: 'Yousuf Al Hammadi',  initials: 'YH', color: 'from-emerald-500 to-green-500', rating: 5, service: svcName, text: `Needed ${svcName} in Muwailih Commercial. The team was professional from start to finish. Will use LocalServices AE every time now.` },
      { name: 'Deepa Krishnan',     initials: 'DK', color: 'from-cyan-600 to-teal-500',     rating: 4, service: svcName, text: `Good ${svcName} experience in Al Qasimia. The technician was knowledgeable and courteous. Pricing was fair for Sharjah. Would recommend to neighbours.` },
    ],

    /* ── Ajman ─────────────────────────────────────────────────────────── */
    Ajman: [
      { name: 'Sultan Al Nuaimi',   initials: 'SN', color: 'from-blue-700 to-indigo-500',   rating: 5, service: svcName, text: `Excellent ${svcName} in Al Rashidiya. The professional arrived on time and the workmanship was top-notch. Best service experience I've had in Ajman!` },
      { name: 'Maria Santos',       initials: 'MS', color: 'from-pink-500 to-rose-500',     rating: 5, service: svcName, text: `Booked ${svcName} for our place in Al Nuaimiya. Quick response, transparent pricing, and the results were perfect. Saved me so much time and stress!` },
      { name: 'Abdulrahman Al Ali', initials: 'AA', color: 'from-emerald-600 to-green-500', rating: 5, service: svcName, text: `Used LocalServices AE for ${svcName} in Al Rumailah. The platform is easy, the team was professional, and the pricing was honest. Five stars from Ajman!` },
      { name: 'Jennifer Adams',     initials: 'JA', color: 'from-orange-500 to-amber-500',  rating: 5, service: svcName, text: `Needed emergency ${svcName} in Emirates City. They dispatched someone within an hour. Fantastic service for Ajman residents — will be a repeat customer.` },
      { name: 'Saeed Al Dhaheri',   initials: 'SD', color: 'from-purple-600 to-violet-500', rating: 4, service: svcName, text: `Great ${svcName} in Al Jurf. Professional crew, polite and thorough. The quote matched the final bill exactly. Refreshingly honest service in Ajman.` },
      { name: 'Anita Dsouza',       initials: 'AD', color: 'from-teal-500 to-cyan-400',     rating: 5, service: svcName, text: `Wonderful ${svcName} experience in Al Hamidiyah. The technician was skilled and efficient. Very happy I found this platform — perfect for Ajman!` },
    ],

    /* ── Ras Al Khaimah ────────────────────────────────────────────────── */
    'Ras Al Khaimah': [
      { name: 'Hamad Al Qassimi',   initials: 'HQ', color: 'from-blue-600 to-sky-500',      rating: 5, service: svcName, text: `Booked ${svcName} for our home in Al Hamra Village. Incredibly professional team — they treated our home with respect. Best service in RAK!` },
      { name: 'Rachel Wilson',      initials: 'RW', color: 'from-pink-600 to-purple-500',   rating: 5, service: svcName, text: `We've tried many providers in Ras Al Khaimah, but LocalServices AE is the best for ${svcName}. Booked for Mina Al Arab and the quality was superb.` },
      { name: 'Rashid Al Shehhi',   initials: 'RS', color: 'from-amber-600 to-orange-500',  rating: 5, service: svcName, text: `Prompt ${svcName} in Al Nakheel. The whole process from booking to completion was smooth. Fair price and excellent workmanship. Will recommend to everyone in RAK.` },
      { name: 'Sophie Laurent',     initials: 'SL', color: 'from-violet-500 to-indigo-500', rating: 5, service: svcName, text: `Amazing ${svcName} service in Al Dhait area. The technician was experienced and completed everything in one visit. Ras Al Khaimah finally has a reliable platform!` },
      { name: 'Mohammed Al Tunaiji', initials: 'MT', color: 'from-emerald-600 to-teal-500', rating: 4, service: svcName, text: `Good ${svcName} experience near Al Qurm. Professional behaviour, clean work, and the pricing was very reasonable for RAK. Solid platform overall.` },
      { name: 'Pooja Menon',        initials: 'PM', color: 'from-cyan-500 to-blue-400',     rating: 5, service: svcName, text: `Booked ${svcName} in Ghalilah. Even though we're outside the city centre, the team arrived quickly. Top-tier service for all of Ras Al Khaimah!` },
    ],

    /* ── Fujairah ──────────────────────────────────────────────────────── */
    Fujairah: [
      { name: 'Ali Al Sharqi',      initials: 'AS', color: 'from-blue-700 to-cyan-600',     rating: 5, service: svcName, text: `Needed ${svcName} in Fujairah City and the response was outstanding. Professional, punctual, and the work quality was excellent. Highly recommended!` },
      { name: 'Elena Petrova',      initials: 'EP', color: 'from-rose-500 to-pink-400',     rating: 5, service: svcName, text: `We booked ${svcName} for our villa in Al Faseel. The team was meticulous and very respectful. So glad to find a reliable platform covering Fujairah!` },
      { name: 'Saif Al Kaabi',      initials: 'SK', color: 'from-amber-500 to-yellow-500',  rating: 5, service: svcName, text: `Great ${svcName} in Dibba Al Fujairah. On time, skilled, and reasonably priced. The online booking made everything so easy. Will use again for sure.` },
      { name: 'Amanda Chen',        initials: 'AC', color: 'from-purple-500 to-violet-400', rating: 5, service: svcName, text: `Booked ${svcName} for Khor Fakkan and wasn't sure if they'd cover that area. They did — and the service was exceptional! Best option for the East Coast.` },
      { name: 'Obaid Al Dhahouri',  initials: 'OD', color: 'from-emerald-500 to-teal-400',  rating: 4, service: svcName, text: `Solid ${svcName} service in Kalba. The technician knew exactly what to do. Transparent pricing and no upselling. Rare to find this in Fujairah.` },
      { name: 'Sunita Patel',       initials: 'SP', color: 'from-teal-600 to-cyan-500',     rating: 5, service: svcName, text: `Quick and professional ${svcName} in Qidfa area. The team went above and beyond. Finally a platform that properly serves Fujairah residents!` },
    ],

    /* ── Umm Al Quwain ────────────────────────────────────────────────── */
    'Umm Al Quwain': [
      { name: 'Mansoor Al Mualla',  initials: 'MM', color: 'from-blue-600 to-indigo-500',   rating: 5, service: svcName, text: `Booked ${svcName} in Al Salamah and was impressed by the speed and quality. LocalServices AE is a game-changer for UAQ residents!` },
      { name: 'Jessica Taylor',     initials: 'JT', color: 'from-pink-500 to-rose-400',     rating: 5, service: svcName, text: `We needed ${svcName} urgently in Al Raas. Got a professional within 90 minutes. The work was clean, efficient, and fairly priced. Excellent!` },
      { name: 'Nasser Al Shamsi',   initials: 'NS', color: 'from-amber-600 to-orange-400',  rating: 5, service: svcName, text: `Used their ${svcName} service in Al Hamriyah Free Zone area. Professional crew, clear communication, and no hidden charges. Will definitely book again.` },
      { name: 'Karen White',        initials: 'KW', color: 'from-violet-600 to-purple-400', rating: 5, service: svcName, text: `Living in UAQ, it's hard to find reliable services. LocalServices AE exceeded my expectations for ${svcName}. The technician was skilled and courteous.` },
      { name: 'Faisal Al Hosani',   initials: 'FH', color: 'from-emerald-600 to-green-400', rating: 4, service: svcName, text: `Good ${svcName} near UAQ City Centre. Booking was simple, service was punctual, and the pricing was competitive. Great option for Umm Al Quwain.` },
      { name: 'Meera Reddy',        initials: 'MR', color: 'from-cyan-600 to-teal-400',     rating: 5, service: svcName, text: `Wonderful ${svcName} experience in Al Riqqah. The team was respectful, hardworking, and completed the job ahead of schedule. UAQ needs more services like this!` },
    ],
  };

  const base = pools[loc] || pools['Dubai'].map((t) => ({ ...t, text: t.text.replace(/Dubai/g, loc) }));
  return base.slice(0, 6);
}
