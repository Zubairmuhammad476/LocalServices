'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Choose Your Service',
    copy: 'Select from 50+ verified home services. AC repair, deep cleaning, plumbing, electrical — we cover it all across all 7 Emirates.',
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
    copy: 'Relax while our experts do the work. Pay securely via Card, Apple Pay, or Cash — only when you are 100% satisfied.',
  },
];

export default function HowItWorksSteps() {
  return (
    <section className="hiw-v3-section" aria-label="How LocalServices AE works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header — centered */}
        <div className="hiw-v3-header">
          <p className="hiw-v3-label">Simple Process</p>
          <h2 className="hiw-v3-title">How It Works</h2>
          <p className="hiw-v3-subtitle">
            Get your home services done in 3 easy steps. Professional, reliable, and hassle-free.
          </p>
        </div>

        {/* Steps grid */}
        <div className="hiw-v3-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="hiw-v3-card">
              {/* Step number */}
              <p className="hiw-v3-num">{step.num}</p>

              {/* Orange icon box */}
              <div className="hiw-v3-icon-box">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="hiw-v3-card-title">{step.title}</h3>

              {/* Description */}
              <p className="hiw-v3-card-copy">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
