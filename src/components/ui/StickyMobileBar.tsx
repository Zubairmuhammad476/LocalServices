'use client';

import React from 'react';

export default function StickyMobileBar() {
  return (
    <div
      className="sticky-mobile-bar md:hidden"
      role="navigation"
      aria-label="Quick contact actions"
    >
      <a
        href="tel:+97143000000"
        id="sticky-call-now"
        className="sticky-mobile-btn sticky-mobile-btn--call"
        aria-label="Call LocalServices AE now"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
        </svg>
        <span>Call Now</span>
      </a>

      <a
        href="https://wa.me/97143000000?text=Hi%2C%20I%20need%20a%20home%20service%20in%20UAE"
        target="_blank"
        rel="noopener noreferrer"
        id="sticky-whatsapp"
        className="sticky-mobile-btn sticky-mobile-btn--whatsapp"
        aria-label="Book on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.51 5.831L.057 23.633a.75.75 0 00.916.916l5.802-1.453A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.855-.538-5.46-1.48l-.389-.233-4.035 1.009 1.009-4.035-.234-.39A10.444 10.444 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
        </svg>
        <span>Book on WhatsApp</span>
      </a>
    </div>
  );
}
