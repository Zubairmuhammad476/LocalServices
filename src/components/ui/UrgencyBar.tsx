'use client';

import React, { useState, useEffect } from 'react';

const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];

export default function UrgencyBar() {
  const [cityIndex, setCityIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((i) => (i + 1) % UAE_CITIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="urgency-bar" role="banner" aria-label="Emergency service availability">
      {/* Dismiss button */}
      <button
        className="urgency-bar-dismiss"
        onClick={() => setVisible(false)}
        aria-label="Dismiss this notification"
      >
        ✕
      </button>

      {/* Centred ticker text */}
      <div className="urgency-bar-content">
        <span className="urgency-bar-fire">🔥</span>
        <span>
          Emergency? AC &amp; Plumbing Pros available in{' '}
          <strong className="urgency-bar-city">{UAE_CITIES[cityIndex]}</strong>
          {' '}— Arriving in 45 mins.{' '}
          <a
            href="tel:+97143000000"
            className="urgency-bar-phone"
            aria-label="Call LocalServices AE now"
          >
            Call Now: 800-LOCAL
          </a>
        </span>
      </div>
    </div>
  );
}
