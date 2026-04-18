'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR_SERVICES = [
  { name: 'AC Maintenance',  slug: 'ac-maintenance',  icon: '❄️' },
  { name: 'Home Cleaning',   slug: 'home-cleaning',   icon: '🧹' },
  { name: 'Plumbing',        slug: 'plumbing',        icon: '🔧' },
  { name: 'Electrical',      slug: 'electrical',      icon: '⚡' },
  { name: 'Maid Services',   slug: 'maid-services',   icon: '🏠' },
  { name: 'Pest Control',    slug: 'pest-control',    icon: '🛡️' },
  { name: 'Handyman',        slug: 'handyman',        icon: '🛠️' },
  { name: 'Landscaping',     slug: 'landscaping',     icon: '🌿' },
];

/* UAE neighborhoods — specific, local, trust-building */
const NEIGHBORHOODS = [
  // Dubai
  'JVC (Jumeirah Village Circle)',
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'JBR (Jumeirah Beach Residence)',
  'DIFC',
  'Business Bay',
  'Jumeirah 1',
  'Jumeirah 2',
  'Jumeirah 3',
  'Al Barsha',
  'Mirdif',
  'Deira',
  'Bur Dubai',
  'Silicon Oasis',
  'Motor City',
  'Al Quoz',
  'Nad Al Sheba',
  // Abu Dhabi
  'Al Reem Island',
  'Saadiyat Island',
  'Yas Island',
  'Khalidiyah',
  'Corniche',
  'Al Raha Beach',
  'Masdar City',
  // Sharjah
  'Al Nahda',
  'Al Qasimia',
  'Al Majaz',
  // Other Emirates
  'Ajman City Centre',
  'Ras Al Khaimah',
  'Fujairah City',
];

/* Map neighborhood → emirate slug for routing */
const neighborhoodToEmirate = (n: string): string => {
  if (n.includes('Abu Dhabi') || ['Al Reem Island','Saadiyat Island','Yas Island','Khalidiyah','Corniche','Al Raha Beach','Masdar City'].includes(n)) return 'abu-dhabi';
  if (['Al Nahda','Al Qasimia','Al Majaz'].includes(n)) return 'sharjah';
  if (n.includes('Ajman')) return 'ajman';
  if (n.includes('Ras Al Khaimah')) return 'ras-al-khaimah';
  if (n.includes('Fujairah')) return 'fujairah';
  return 'dubai';
};

export default function SearchBar() {
  const router = useRouter();
  const [neighborhood, setNeighborhood] = useState('Downtown Dubai');
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectService = (slug: string) => {
    const emirate = neighborhoodToEmirate(neighborhood);
    router.push(`/services/${emirate}/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emirate = neighborhoodToEmirate(neighborhood);
    if (query.trim()) {
      router.push(`/services/${emirate}?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/services/${emirate}`);
    }
  };

  return (
    <div className="search-bar-wrapper">
      <form
        onSubmit={handleSearchSubmit}
        className="search-bar-form"
        role="search"
        aria-label="Search for home services in UAE"
      >
        {/* Neighborhood selector */}
        <div className="search-bar-location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FF6B00"
            className="search-bar-pin absolute left-4 z-10 w-5 h-5 shrink-0"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.093 3.963-5.25 3.963-9.167A8.25 8.25 0 002.25 12c0 3.917 2.02 7.074 3.963 9.167a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
          </svg>
          <select
            id="neighborhood-select"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="search-bar-select select-light"
            aria-label="Select your neighborhood"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Divider */}
        <div className="search-bar-divider" aria-hidden="true" />

        {/* Search input */}
        <div className="search-bar-input-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 w-5 h-5 shrink-0" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            id="service-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="What do you need help with?"
            className="search-bar-input"
            autoComplete="off"
            aria-label="Search for a service"
          />
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          id="search-get-price"
          className="search-bar-cta"
          aria-label="Get price now"
        >
          Get Price Now
        </button>
      </form>

      {/* Suggestion dropdown */}
      {isFocused && (
        <div
          className="search-suggestions"
          role="listbox"
          aria-label="Popular services"
        >
          <div className="search-suggestions-header">
            Popular Services
          </div>
          <ul>
            {POPULAR_SERVICES.map((s) => (
              <li key={s.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  onMouseDown={(e) => { e.preventDefault(); handleSelectService(s.slug); }}
                  className="search-suggestion-item"
                >
                  <span className="search-suggestion-icon">{s.icon}</span>
                  <span>{s.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-auto w-4 h-4 text-[#FF6B00]" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
