'use client';

import React from 'react';

interface ServiceCard {
  name: string;
  slug: string;
  icon: string;
  price: string;
  bookings: string;
  imageUrl?: string;
  altTag: string;
}

/* UAE-relevant Unsplash photos — no Western Western stock aesthetics */
const IMAGE_MAP: Record<string, string> = {
  'home-cleaning':   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'ac-maintenance':  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
  'plumbing':        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  'electrical':      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
  'maid-services':   'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  'pest-control':    'https://images.unsplash.com/photo-1632922267756-9b71242b1592?w=600&q=80',
  'handyman':        'https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=600&q=80',
  'landscaping':     'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
};

interface ServicePowerGridProps {
  services: ServiceCard[];
}

export default function ServicePowerGrid({ services }: ServicePowerGridProps) {
  return (
    <div className="power-grid">
      {services.map((service) => {
        const imgSrc = IMAGE_MAP[service.slug] ?? IMAGE_MAP['home-cleaning'];
        return (
          <a
            key={service.slug}
            href={`/services/dubai/${service.slug}`}
            className="power-card group"
            aria-label={`Book ${service.name} — Starting from ${service.price}`}
          >
            {/* Photo */}
            <div className="power-card-img-wrap">
              <img
                src={imgSrc}
                alt={service.altTag}
                className="power-card-img"
                loading="lazy"
              />
              {/* Price badge */}
              <div className="power-card-price-badge">
                <span className="text-[10px] font-medium text-slate-500">Starting from</span>
                <span className="text-sm font-extrabold text-[#002366]">{service.price}</span>
              </div>
              {/* Bookings badge */}
              <div className="power-card-bookings-badge">
                🔥 {service.bookings} bookings
              </div>
            </div>

            {/* Content */}
            <div className="power-card-content">
              <div className="power-card-icon">{service.icon}</div>
              <h3 className="power-card-name">{service.name}</h3>
              <button
                className="power-card-cta group-hover:bg-[#e05500]"
                tabIndex={-1}
                aria-hidden="true"
              >
                Book Now →
              </button>
            </div>
          </a>
        );
      })}
    </div>
  );
}
