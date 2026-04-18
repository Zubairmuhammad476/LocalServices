'use client';

import React from 'react';

const STEPS = [
  {
    num: '01',
    icon: '🔍',
    title: 'Choose Your Service',
    copy: 'Select from 50+ verified home services. AC repair, deep cleaning, plumbing, electrical — we cover it all across all 7 Emirates.',
    action: 'Dropdown below',
    actionIcon: '▾',
    color: '#002366',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Get Matched Instantly',
    copy: 'Our smart system connects you with the highest-rated professional in your specific neighborhood within seconds.',
    action: '50+ Pros Active',
    actionIcon: '🟢',
    color: '#FF6B00',
  },
  {
    num: '03',
    icon: '✅',
    title: 'Pay After Completion',
    copy: 'Relax while our experts do the work. Pay securely via Card, Apple Pay, or Cash — only when you are 100% satisfied.',
    action: 'Guarantee Badge',
    actionIcon: '🛡️',
    color: '#002366',
  },
];

export default function HowItWorksSteps() {
  return (
    <section
      className="how-it-works-section"
      aria-label="How LocalServices AE works — 3 simple steps"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Simple Process</p>
          <h2 className="section-h2-dark text-fluid-h2">3 Simple Steps to a Better Home</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-muted)] leading-relaxed">
            Booking a professional has never been easier. No hassle, no guesswork.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-grid">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="hiw-card">
                {/* Faded background number */}
                <div className="hiw-bg-num" aria-hidden="true">{step.num}</div>

                {/* Icon circle */}
                <div className="hiw-icon-wrap">
                  <span className="hiw-icon">{step.icon}</span>
                </div>

                {/* Step number label */}
                <p className="hiw-step-label">{step.num}</p>

                {/* Content */}
                <h3 className="hiw-title">{step.title}</h3>
                <p className="hiw-copy">{step.copy}</p>

                {/* Action pill */}
                <div className="hiw-action-pill">
                  <span>{step.actionIcon}</span>
                  <span>{step.action}</span>
                </div>
              </div>

              {/* Connector line (between steps) */}
              {idx < STEPS.length - 1 && (
                <div className="hiw-connector" aria-hidden="true">
                  <div className="hiw-connector-line" />
                  <div className="hiw-connector-arrow">›</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
