'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  name: string;
  emirate: string;
  service: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="w-full relative mt-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-custom-bullet',
          bulletActiveClass: 'swiper-custom-bullet-active',
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 2.5,
            centeredSlides: false,
          }
        }}
        className="w-full !pb-14"
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx} className="!h-auto">
            <div className="h-full block bg-white border border-[var(--border-light)] rounded-3xl p-6 md:p-8 hover:border-[var(--brand)] hover:shadow-xl transition-all duration-300">
              
              <div className="flex items-center justify-between mb-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-sm font-extrabold text-white shadow-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-[var(--text-dark)]">{t.name}</h3>
                    <p className="text-xs font-semibold text-[var(--text-muted)] tracking-wide">{t.emirate} • {t.service}</p>
                  </div>
                </div>
                {/* Rating */}
                <div className="hidden sm:flex gap-1 bg-[#fffbeb] px-3 py-1.5 rounded-lg border border-amber-200">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber-500 text-sm">★</span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-base leading-relaxed font-body font-medium text-[var(--text-dark)] opacity-90">
                "{t.text}"
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination CSS Override */}
      <style jsx global>{`
        .swiper-custom-bullet {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          background: #CBD5E1;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-custom-bullet-active {
          background: var(--brand);
          width: 32px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
