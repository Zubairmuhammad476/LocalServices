'use client';

import React, { useState } from 'react';

const SERVICES = [
  'AC Repair',
  'AC Installation',
  'AC Cleaning',
  'Home Cleaning',
  'Deep Cleaning',
  'Maid Services',
  'Plumbing',
  'Electrical',
  'Handyman',
  'Pest Control',
  'Landscaping',
  'Painting',
  'Carpentry',
  'Appliance Repair',
  'Water Tank Cleaning',
];

const LOCATIONS = [
  // Dubai
  'Dubai Marina',
  'Downtown Dubai',
  'JVC (Jumeirah Village Circle)',
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
  'Al Quoz',
  // Abu Dhabi
  'Al Reem Island',
  'Saadiyat Island',
  'Yas Island',
  'Khalidiyah',
  'Corniche Abu Dhabi',
  'Al Raha Beach',
  // Sharjah
  'Al Nahda',
  'Al Majaz',
  // Other
  'Ajman City',
  'Ras Al Khaimah',
  'Fujairah City',
];

const WHATSAPP_NUMBER = '97143000000'; // Replace with real business WA number

export default function WhatsAppLeadForm() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const filteredServices = SERVICES.filter((s) =>
    s.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const buildWhatsAppUrl = () => {
    const svc = service || 'a home service';
    const loc = location || 'UAE';
    const msg = encodeURIComponent(
      `Hi, I need ${svc} in ${loc}. Please provide a quote.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="waf-card" aria-label="Get an instant WhatsApp quote">
      {/* Card header */}
      <div className="waf-header">
        <p className="waf-eyebrow">Free Instant Quote</p>
        <h2 className="waf-title">
          Request Instant<br />Service Quotes
        </h2>
        <p className="waf-subtitle">
          2-tap booking. No registration. No phone number needed.
        </p>
      </div>

      <form onSubmit={handleWhatsApp} className="waf-form" noValidate>
        {/* Field 1 — Service */}
        <div className="waf-field-wrap">
          <label htmlFor="waf-service" className="waf-label">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="waf-label-icon" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            What do you need?
          </label>
          <div className="waf-input-wrap" style={{ position: 'relative' }}>
            <input
              id="waf-service"
              type="text"
              value={serviceSearch}
              onChange={(e) => {
                setServiceSearch(e.target.value);
                setShowServiceDropdown(true);
              }}
              onFocus={() => setShowServiceDropdown(true)}
              onBlur={() => setTimeout(() => setShowServiceDropdown(false), 200)}
              placeholder="e.g., AC Repair, Cleaning, Plumbing..."
              className="waf-input"
              autoComplete="off"
              aria-haspopup="listbox"
              aria-expanded={showServiceDropdown}
            />
            {/* Service dropdown */}
            {showServiceDropdown && filteredServices.length > 0 && (
              <ul className="waf-dropdown" role="listbox" aria-label="Available services">
                {filteredServices.map((s) => (
                  <li key={s}
                    role="option"
                    aria-selected={service === s}
                    className={`waf-dropdown-item${service === s ? ' waf-dropdown-item--active' : ''}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setService(s);
                      setServiceSearch(s);
                      setShowServiceDropdown(false);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Field 2 — Location */}
        <div className="waf-field-wrap">
          <label htmlFor="waf-location" className="waf-label">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FF6B00" className="waf-label-icon" aria-hidden="true">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
            </svg>
            Your area
          </label>
          <div className="waf-input-wrap">
            <select
              id="waf-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="waf-select"
              aria-label="Select your UAE neighborhood"
            >
              <option value="">Select your area (e.g., Dubai Marina, Al Reem Island)...</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <button
          type="submit"
          id="waf-whatsapp-cta"
          className="waf-cta"
          aria-label="Get instant quote on WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="waf-cta-icon" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.74 12.74 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.51 5.831L.057 23.633a.75.75 0 00.916.916l5.802-1.453A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.855-.538-5.46-1.48l-.389-.233-4.035 1.009 1.009-4.035-.234-.39A10.444 10.444 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
          </svg>
          Get Instant Quote on WhatsApp
        </button>

        {/* Trust micro-copy */}
        <p className="waf-trust">
          <span>✅ Verified Experts</span>
          <span aria-hidden="true">·</span>
          <span>🎟️ No Booking Fees</span>
          <span aria-hidden="true">·</span>
          <span>⚡ Response in &lt; 2 Mins</span>
        </p>
      </form>
    </div>
  );
}
