'use client';

import Image from 'next/image';
import React from 'react';

interface ServiceCard {
  name: string;
  slug: string;
  icon: string;
  bookings: string;
  imageUrl?: string;
  active_image_url?: string;
  altTag: string;
  desc?: string;
}

const IMAGE_MAP: Record<string, string> = {
  'home-cleaning':   '/assets/images/services/home-cleaning.webp',
  'ac-maintenance':  '/assets/images/services/ac-maintenance.webp',
  'plumbing':        '/assets/images/services/plumbing.webp',
  'electrical':      '/assets/images/services/electrical.webp',
  'maid-services':   '/assets/images/services/maid-services.webp',
  'pest-control':    '/assets/images/services/pest-control.webp',
  'handyman':        '/assets/images/services/handyman.webp',
  'landscaping':     '/assets/images/services/landscaping.webp',
};

interface ServicePowerGridProps {
  services: ServiceCard[];
}

export default function ServicePowerGrid({ services }: ServicePowerGridProps) {
  return (
    <div className="power-grid">
      {services.map((service, idx) => {
        // Use external URL as-is; for local assets always use the .webp version
        const rawSrc = service.active_image_url || service.imageUrl || IMAGE_MAP[service.slug] || IMAGE_MAP['home-cleaning'];
        const imgSrc = rawSrc.startsWith('http') ? rawSrc : rawSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        return (
          <a
            key={service.slug}
            href={`/services/dubai/${service.slug}`}
            className="power-card group"
            aria-label={`Book ${service.name}`}
          >
            {/* Photo — Next.js Image for automatic optimization + lazy loading */}
            <div className="power-card-img-wrap">
              <Image
                src={imgSrc}
                alt={service.altTag}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="power-card-img"
                loading={idx < 4 ? 'eager' : 'lazy'}
                priority={idx < 2}
              />
              {/* Navy blue glassmorphism bookings badge */}
              <div className="power-card-bookings-badge-glass">
                {service.bookings} bookings
              </div>
            </div>

            {/* Content */}
            <div className="power-card-content power-card-content--center">
              <h3 className="power-card-name">{service.name}</h3>
              {service.desc && (
                <p className="power-card-desc">{service.desc}</p>
              )}
              <button
                className="power-card-cta"
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
