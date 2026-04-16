"use client";

import { useState, useRef, useCallback } from "react";

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
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((idx: number) => {
    setActive(idx);
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[idx] as HTMLElement;
    if (!slide) return;
    const offset = slide.offsetLeft - track.offsetLeft - (track.clientWidth / 2 - slide.clientWidth / 2);
    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(testimonials.length - 1, active + 1));

  return (
    <div className="mt-10">
      {/* Slide track */}
      <div
        ref={trackRef}
        className="testimonial-track -mx-2 px-2"
        aria-roledescription="carousel"
        aria-label="Customer testimonials carousel"
      >
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className={`testimonial-slide ${idx === active ? "testimonial-slide--active" : "testimonial-slide--inactive"}`}
            aria-roledescription="slide"
            aria-label={`Testimonial ${idx + 1} of ${testimonials.length}: ${t.name}`}
          >
            <div className="bento-card h-full cursor-pointer transition-all duration-400" onClick={() => scrollTo(idx)}>
              {/* Stars */}
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm" aria-hidden="true">★</span>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed" style={{ color: "#475569" }}>
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-sm font-black text-white`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold font-display" style={{ color: "#0F1923" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{t.emirate} · {t.service}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots + arrows */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          disabled={active === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-all disabled:opacity-30"
          style={{ borderColor: "#E2E8F0", color: "#0062FF" }}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === active}
              onClick={() => scrollTo(idx)}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === active ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: idx === active ? "#0062FF" : "#CBD5E1",
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={active === testimonials.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-all disabled:opacity-30"
          style={{ borderColor: "#E2E8F0", color: "#0062FF" }}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
}
