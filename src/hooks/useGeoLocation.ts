'use client';

import { useState, useEffect } from 'react';

/**
 * Maps common city / area names returned by geo-IP providers to the
 * canonical emirate key used across the project.
 */
const CITY_TO_EMIRATE: Record<string, string> = {
  // Dubai
  dubai:             'Dubai',
  'dubai marina':    'Dubai',
  'jumeirah':        'Dubai',
  'deira':           'Dubai',
  'bur dubai':       'Dubai',

  // Abu Dhabi
  'abu dhabi':       'Abu Dhabi',
  'al ain':          'Abu Dhabi',
  'mussafah':        'Abu Dhabi',
  'khalifa city':    'Abu Dhabi',

  // Sharjah
  sharjah:           'Sharjah',
  'al nahda':        'Sharjah',

  // Ajman
  ajman:             'Ajman',

  // Ras Al Khaimah
  'ras al khaimah':  'Ras Al Khaimah',
  'ras al-khaimah':  'Ras Al Khaimah',
  'rak':             'Ras Al Khaimah',

  // Fujairah
  fujairah:          'Fujairah',
  'khor fakkan':     'Fujairah',
  'kalba':           'Fujairah',
  'dibba al fujairah': 'Fujairah',

  // Umm Al Quwain
  'umm al quwain':   'Umm Al Quwain',
  'umm al-quwain':   'Umm Al Quwain',
  'uaq':             'Umm Al Quwain',
};

const STORAGE_KEY = 'ls_geo_emirate';

/**
 * Detects the visitor's emirate via IP geolocation (GeoJS — free, no key).
 *
 * - Returns the resolved emirate string (e.g. "Sharjah") or `null` while loading.
 * - Falls back to `fallback` (default: "Dubai") if detection fails or the
 *   visitor is outside the UAE.
 * - Caches the result in `sessionStorage` so we only call the API once per tab.
 */
export function useGeoLocation(fallback = 'Dubai') {
  const [emirate, setEmirate] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check sessionStorage first
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        setEmirate(cached);
        return;
      }
    } catch {
      // sessionStorage unavailable (SSR / privacy mode) — continue
    }

    // 2. Fetch from GeoJS
    const controller = new AbortController();

    (async () => {
      try {
        const res  = await fetch('https://get.geojs.io/v1/ip/geo.json', {
          signal: controller.signal,
        });
        const data = await res.json();

        // GeoJS returns { country_code, city, region, ... }
        const countryCode = (data.country_code || '').toUpperCase();

        if (countryCode === 'AE') {
          const rawCity = (data.city || '').toLowerCase().trim();
          const rawRegion = (data.region || '').toLowerCase().trim();

          // Try city first, then region
          const resolved =
            CITY_TO_EMIRATE[rawCity] ||
            CITY_TO_EMIRATE[rawRegion] ||
            Object.entries(CITY_TO_EMIRATE).find(
              ([key]) => rawCity.includes(key) || rawRegion.includes(key),
            )?.[1] ||
            fallback;

          setEmirate(resolved);

          try {
            sessionStorage.setItem(STORAGE_KEY, resolved);
          } catch { /* ignore */ }
        } else {
          // Visitor is outside the UAE — use fallback
          setEmirate(fallback);
          try {
            sessionStorage.setItem(STORAGE_KEY, fallback);
          } catch { /* ignore */ }
        }
      } catch {
        // Network error / aborted — use fallback
        if (!controller.signal.aborted) {
          setEmirate(fallback);
        }
      }
    })();

    return () => controller.abort();
  }, [fallback]);

  return emirate;
}
