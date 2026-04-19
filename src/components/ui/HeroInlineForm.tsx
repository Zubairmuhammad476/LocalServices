'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/* Static Data                                                           */
/* ------------------------------------------------------------------ */
const SERVICES = [
  'AC Repair', 'AC Installation', 'AC Duct Cleaning', 'AC Gas Refill',
  'Home Deep Cleaning', 'Regular Home Cleaning', 'Maid Services', 'Carpet Cleaning',
  'Plumbing', 'Pipe Leak Fix', 'Drain Unblocking', 'Water Heater Repair',
  'Electrical', 'DEWA Wiring', 'Electrical Fault Finding', 'Light Installation',
  'Handyman', 'Furniture Assembly', 'TV Wall Mounting', 'Curtain Fitting',
  'Pest Control', 'Cockroach Control', 'Termite Treatment', 'Bed Bug Removal',
  'Landscaping', 'Garden Maintenance', 'Artificial Grass', 'Tree Trimming',
  'Painting', 'Interior Painting', 'Exterior Painting', 'Wallpaper Fixing',
  'Appliance Repair', 'Washing Machine Repair', 'Fridge Repair', 'Oven Repair',
];

const LOCATIONS = [
  // Dubai
  'Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'JVC', 'JBR',
  'DIFC', 'Business Bay', 'Jumeirah 1', 'Jumeirah 2', 'Jumeirah 3',
  'Al Barsha', 'Mirdif', 'Deira', 'Bur Dubai', 'Silicon Oasis',
  'Al Quoz', 'Dubai Hills', 'Tilal Al Ghaf', 'Arabian Ranches', 'The Springs',
  // Abu Dhabi
  'Al Reem Island', 'Saadiyat Island', 'Yas Island', 'Khalidiyah',
  'Corniche Abu Dhabi', 'Al Raha Beach', 'Khalifa City', 'Al Ain',
  // Sharjah
  'Al Nahda', 'Al Majaz', 'Al Qasimia',
  // Others
  'Ajman City', 'Ras Al Khaimah', 'Fujairah City', 'Umm Al Quwain',
];

// Rough bounding boxes — we map lat/lng to nearest area name
const GEO_AREAS = [
  { name: 'Dubai Marina',    lat: 25.080, lng: 55.133 },
  { name: 'Downtown Dubai',  lat: 25.197, lng: 55.274 },
  { name: 'Palm Jumeirah',   lat: 25.112, lng: 55.139 },
  { name: 'JVC',             lat: 25.055, lng: 55.208 },
  { name: 'Business Bay',    lat: 25.186, lng: 55.264 },
  { name: 'Al Barsha',       lat: 25.103, lng: 55.203 },
  { name: 'Deira',           lat: 25.271, lng: 55.321 },
  { name: 'Bur Dubai',       lat: 25.247, lng: 55.295 },
  { name: 'Mirdif',          lat: 25.225, lng: 55.411 },
  { name: 'Al Reem Island',  lat: 24.502, lng: 54.405 },
  { name: 'Khalidiyah',      lat: 24.481, lng: 54.363 },
  { name: 'Al Nahda',        lat: 25.289, lng: 55.381 },
  { name: 'Ajman City',      lat: 25.405, lng: 55.513 },
  { name: 'Ras Al Khaimah',  lat: 25.787, lng: 55.942 },
];

const WHATSAPP_NUMBER = '97143000000';

// Trust ribbon — spec: Poppins Medium (500), 12–14px, directly beneath the bar
const TRUST_ITEMS = [
  '1,200+ Verified Pros in Dubai & Abu Dhabi',
  '100% Satisfaction Guarantee',
  'No Hidden Fees',
  'Response in Under 20 Minutes',
];

function nearestArea(lat: number, lng: number): string {
  let best = GEO_AREAS[0];
  let bestDist = Infinity;
  for (const area of GEO_AREAS) {
    const d = Math.hypot(lat - area.lat, lng - area.lng);
    if (d < bestDist) { bestDist = d; best = area; }
  }
  return best.name;
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */
export default function HeroInlineForm() {
  const [service, setService]             = useState('');
  const [location, setLocation]           = useState('');
  const [suggestions, setSuggestions]     = useState<string[]>([]);
  const [showSugg, setShowSugg]           = useState(false);
  const [detecting, setDetecting]         = useState(false);
  const [activeSugg, setActiveSugg]       = useState(-1);
  const [showMobileCta, setShowMobileCta] = useState(false);

  const serviceRef = useRef<HTMLInputElement>(null);
  const locRef     = useRef<HTMLSelectElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Typeahead: update suggestions when service input changes ── */
  useEffect(() => {
    if (!service.trim()) { setSuggestions(SERVICES.slice(0, 6)); return; }
    const q = service.toLowerCase();
    setSuggestions(SERVICES.filter(s => s.toLowerCase().includes(q)).slice(0, 7));
  }, [service]);

  /* ── Mobile sticky CTA: show after form scrolls off screen ─── */
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      setShowMobileCta(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Detect location via browser GPS ──────────────────────── */
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const area = nearestArea(pos.coords.latitude, pos.coords.longitude);
        setLocation(area);
        setDetecting(false);
      },
      () => setDetecting(false),
      { timeout: 8000 },
    );
  }, []);

  /* ── WhatsApp submit ──────────────────────────────────────── */
  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    const svc = service.trim() || 'a home service';
    const loc = location || 'UAE';
    const msg = encodeURIComponent(`Hi, I need ${svc} in ${loc}. Please provide a quote.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }, [service, location]);

  /* ── Keyboard navigation on suggestions ──────────────────── */
  const handleServiceKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSugg) { if (e.key === 'Enter') handleSubmit(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveSugg(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveSugg(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') {
      if (activeSugg >= 0 && suggestions[activeSugg]) {
        e.preventDefault();
        setService(suggestions[activeSugg]);
        setShowSugg(false);
        setActiveSugg(-1);
        locRef.current?.focus();
      } else {
        setShowSugg(false);
        handleSubmit();
      }
    } else if (e.key === 'Escape') { setShowSugg(false); setActiveSugg(-1); }
  };

  /* ── Enter in location field triggers submit ──────────────── */
  const handleLocKey = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const mobileCtaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I need a home service in UAE. Please provide a quote.')}`;

  return (
    <div ref={wrapperRef} className="hif-wrapper animate-fade-up anim-delay-3">

      {/* ──────────────────────────────────────────────────────── */}
      {/* Glassmorphic one-line search bar                        */}
      {/* Desktop: [ Service ✦ Location + GPS ✦ Get Instant Quotes ] */}
      {/* Mobile:  stacked vertically, full-width orange button   */}
      {/* ──────────────────────────────────────────────────────── */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="hif-bar"
        role="search"
        aria-label="Find verified home services in UAE"
        noValidate
      >

        {/* ── Service input with typeahead ─────────────────────── */}
        <div className="hif-field hif-field--service">
          {/* Magnifying-glass icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"
            stroke="currentColor" strokeWidth="1.75" className="hif-icon" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5"/>
            <path d="m13.5 13.5 3 3" strokeLinecap="round"/>
          </svg>

          <input
            ref={serviceRef}
            id="hif-service"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={showSugg}
            aria-controls="hif-suggestions"
            aria-activedescendant={activeSugg >= 0 ? `hif-sugg-${activeSugg}` : undefined}
            value={service}
            onChange={e => { setService(e.target.value); setShowSugg(true); setActiveSugg(-1); }}
            onFocus={() => setShowSugg(true)}
            onBlur={() => setTimeout(() => { setShowSugg(false); setActiveSugg(-1); }, 180)}
            onKeyDown={handleServiceKey}
            placeholder="What service do you need?"
            className="hif-input"
            autoComplete="off"
          />

          {/* Typeahead dropdown */}
          {showSugg && suggestions.length > 0 && (
            <ul
              id="hif-suggestions"
              role="listbox"
              aria-label="Service suggestions"
              className="hif-suggestions"
            >
              {suggestions.map((s, i) => (
                <li
                  key={s}
                  id={`hif-sugg-${i}`}
                  role="option"
                  aria-selected={i === activeSugg}
                  className={`hif-sugg-item${i === activeSugg ? ' hif-sugg-item--active' : ''}`}
                  onMouseDown={e => {
                    e.preventDefault();
                    setService(s);
                    setShowSugg(false);
                    setActiveSugg(-1);
                    locRef.current?.focus();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                    className="hif-sugg-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd"/>
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vertical divider — desktop only */}
        <div className="hif-divider" aria-hidden="true" />

        {/* ── Location select + GPS detect ─────────────────────── */}
        <div className="hif-field hif-field--location">
          {/* Location-pin icon (Vivid Orange) */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FF6B00"
            className="hif-icon" aria-hidden="true">
            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd"/>
          </svg>

          <select
            ref={locRef}
            id="hif-location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyDown={handleLocKey}
            className="hif-select"
            aria-label="Select your neighborhood in UAE"
          >
            <option value="">Select your neighborhood</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          {/* Detect my location — compass/crosshair icon */}
          <button
            type="button"
            onClick={detectLocation}
            disabled={detecting}
            className="hif-detect-btn"
            aria-label="Detect my current location automatically"
            title="Detect my location"
          >
            {detecting
              ? <span className="hif-spinner" aria-hidden="true" />
              : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                  className="hif-detect-icon" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.543a6.752 6.752 0 015.957 5.957h1.543a.75.75 0 010 1.5h-1.543a6.752 6.752 0 01-5.957 5.957v1.543a.75.75 0 01-1.5 0v-1.543a6.752 6.752 0 01-5.957-5.957H1.75a.75.75 0 010-1.5h1.543A6.752 6.752 0 019.25 3.293V1.75A.75.75 0 0110 1Zm0 5.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7Z" clipRule="evenodd"/>
                </svg>
              )
            }
          </button>
        </div>

        {/* Vertical divider — desktop only */}
        <div className="hif-divider" aria-hidden="true" />

        {/* ── Primary CTA: "Get Instant Quotes" ─────────────────── */}
        {/* Poppins SemiBold (600) | #FF6B00 | inner-glow shadow   */}
        <button
          type="submit"
          id="hero-get-quotes-cta"
          className="hif-cta"
          aria-label="Get instant quotes on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="hif-cta-icon" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.51 5.831L.057 23.633a.75.75 0 00.916.916l5.802-1.453A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.855-.538-5.46-1.48l-.389-.233-4.035 1.009 1.009-4.035-.234-.39A10.444 10.444 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
          </svg>
          Get Instant Quotes
        </button>
      </form>

      {/* ── Trust Ribbon — Poppins Medium (500), 12–14px ──────── */}
      {/* Kills last-minute doubts right at the point of click    */}
      <div className="hif-trust-ribbon" role="list" aria-label="Trust indicators">
        {TRUST_ITEMS.map(item => (
          <span key={item} role="listitem" className="hif-trust-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#4ADE80"
              className="hif-trust-icon" aria-hidden="true">
              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd"/>
            </svg>
            {item}
          </span>
        ))}
      </div>

      {/* ── Mobile Floating Sticky CTA ─────────────────────────── */}
      {/* Appears once user scrolls past the hero form            */}
      <a
        href={mobileCtaUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="mobile-sticky-get-quotes"
        className={`mobile-sticky-cta${showMobileCta ? ' visible' : ''}`}
        aria-label="Get instant quotes on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          style={{ width: 18, height: 18 }} aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.51 5.831L.057 23.633a.75.75 0 00.916.916l5.802-1.453A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.855-.538-5.46-1.48l-.389-.233-4.035 1.009 1.009-4.035-.234-.39A10.444 10.444 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
        </svg>
        Get Quotes
      </a>

    </div>
  );
}
