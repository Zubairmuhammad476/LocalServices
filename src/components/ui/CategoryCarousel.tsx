'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

interface CategoryCarouselProps {
  categories: { name: string; slug: string; icon: string }[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={16}
        className="w-full !pb-6"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} className="!w-auto">
            <a 
              href={`/services/dubai/${cat.slug}`}
              className="group flex flex-col items-center justify-center min-w-[100px] p-4 bg-white border border-[var(--border-light)] rounded-2xl hover:border-[var(--brand)] hover:shadow-[0_10px_20px_rgba(28,82,151,0.1)] transition-all cursor-pointer"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform text-[var(--brand)] drop-shadow-sm">{cat.icon}</span>
              <span className="text-xs font-semibold text-[var(--text-dark)] whitespace-nowrap">{cat.name}</span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
