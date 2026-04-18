'use client';

import React from 'react';

const TRUST_SIGNALS = [
  {
    id: 'rating',
    icon: (
      <span className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={i <= 4 ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5" className="w-4 h-4">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </span>
    ),
    headline: '4.9/5 Google Rating',
    sub: 'Based on 50,000+ verified reviews',
  },
  {
    id: 'verified',
    icon: <span className="text-2xl">✅</span>,
    headline: 'Verified & Background Checked',
    sub: 'Emirates ID + criminal record check',
  },
  {
    id: 'guarantee',
    icon: <span className="text-2xl">💯</span>,
    headline: '100% Satisfaction Guarantee',
    sub: '7-day re-service or full refund',
  },
  {
    id: 'ded',
    icon: <span className="text-2xl">🏛️</span>,
    headline: 'Licensed by Dubai Economy',
    sub: 'DED certified & fully insured pros',
  },
];

export default function TrustRibbon() {
  return (
    <section
      className="trust-ribbon-section"
      aria-label="Trust signals — why UAE homeowners choose LocalServices AE"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {TRUST_SIGNALS.map((item) => (
            <div key={item.id} className="trust-signal-item">
              <div className="trust-signal-icon">{item.icon}</div>
              <div>
                <p className="trust-signal-headline">{item.headline}</p>
                <p className="trust-signal-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
