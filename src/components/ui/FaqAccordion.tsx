'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // first one open by default

  return (
    <div className="space-y-3">
      {items.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={faq.q}
            className={`faq-accordion-item${isOpen ? ' faq-accordion-item--open' : ''}`}
          >
            <button
              className="faq-accordion-summary"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-body-${idx}`}
              id={`faq-btn-${idx}`}
            >
              <div className="flex items-center gap-4">
                <span className="faq-accordion-num">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="faq-accordion-q">{faq.q}</span>
              </div>
              <span
                className="faq-accordion-chevron"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* Animated body */}
            <div
              id={`faq-body-${idx}`}
              role="region"
              aria-labelledby={`faq-btn-${idx}`}
              className="faq-accordion-body-wrapper"
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
  );
}
