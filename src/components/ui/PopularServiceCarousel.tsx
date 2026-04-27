'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import type { Service } from '@/types/service';

interface PopularServiceCarouselProps {
  services: Service[];
}

const FALLBACK_IMG = '/assets/images/services/home-cleaning.webp';

export default function PopularServiceCarousel({ services }: PopularServiceCarouselProps) {
  return (
    <div className="w-full relative px-2">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={20}
        className="w-full !pb-8 !pt-2"
      >
        {services.map((service) => {
          // Use local WebP for known slugs; fall back to external URL or local placeholder
          const imgSrc = service.imageUrl?.startsWith('http')
            ? service.imageUrl
            : FALLBACK_IMG;

          return (
            <SwiperSlide key={service.id} className="!w-[85%] sm:!w-[300px] md:!w-[340px]">
              <a
                href={`/services/dubai/${service.slug}`}
                className="block h-full bg-white border border-[var(--border-light)] rounded-2xl overflow-hidden hover:border-[var(--brand)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(28,82,151,0.12)] transition-all group"
              >
                {/* Image Container */}
                <div className="w-full h-48 relative bg-[#F1F5F9] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={service.seoTitle || service.name}
                    fill
                    sizes="(max-width: 640px) 85vw, 340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    unoptimized={imgSrc.startsWith('http')}
                  />

                  {/* Price Tag Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[var(--border-light)] shadow-sm">
                    <span className="text-xs font-semibold text-[var(--text-muted)]">From </span>
                    <span className="text-sm font-extrabold text-[var(--brand)] font-display">{service.basePrice || 'AED 150'}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--text-dark)] font-display mb-1 group-hover:text-[var(--brand)] transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">
                    {service.description || "Top-rated professional service with guaranteed fixed pricing and same-day availability across all emirates."}
                  </p>

                  <div className="w-full flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-dark)]">
                      <span className="text-yellow-400 text-sm">★</span> 4.8
                    </div>
                    <span className="text-xs font-bold text-[var(--brand)] bg-[#eff6ff] px-3 py-1.5 rounded-md">Book Now</span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
