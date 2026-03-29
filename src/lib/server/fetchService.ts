/**
 * Server-side fetch utilities for service data.
 * Called from Next.js Server Components (NOT from Client Components).
 * Uses native fetch() with Next.js ISR cache semantics.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api';

// ─── Type Definitions ──────────────────────────────────────────────────────────

export interface ServiceData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  design_layout: 'main_category_layout' | 'sub_service_layout' | 'city_hub_layout' | string;
  base_price: string | null;
  pricing_model: 'fixed' | 'quote' | 'hourly' | string;
  seo_title: string | null;
  seo_description: string | null;
  image_url: string | null;
  schema_markup: Record<string, unknown> | null;
  is_active: boolean;
  is_seo_optimized: boolean;
  emirate?: string | null;
  category?: string | null;
  parent: Pick<ServiceData, 'id' | 'name' | 'slug'> | null;
  children: Pick<ServiceData, 'id' | 'name' | 'slug' | 'base_price' | 'design_layout' | 'image_url'>[];
}

export interface SlugEntry {
  slug: string;
  design_layout: string;
}

// ─── Fetch single service by slug ─────────────────────────────────────────────

export async function fetchServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${slug}`, {
      next: { revalidate: 3600 }, // ISR: revalidate every 1 hour
    });
    if (!res.ok) return null;
    const json = await res.json() as { data: ServiceData };
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ─── Fetch top slugs for generateStaticParams ─────────────────────────────────

export async function fetchTopSlugs(limit = 500): Promise<SlugEntry[]> {
  try {
    const res = await fetch(`${API_BASE}/services/slugs?limit=${limit}`, {
      next: { revalidate: 86400 }, // Rebuild slug list once per day
    });
    if (!res.ok) return [];
    const json = await res.json() as { data: SlugEntry[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

// ─── Fetch top-level hierarchy (for home page / navigation) ──────────────────

export async function fetchServiceHierarchy(): Promise<ServiceData[]> {
  try {
    const res = await fetch(`${API_BASE}/services/hierarchy`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json() as { data: ServiceData[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** A service page is a "City Hub" (e.g. /dubai) */
export const isCityHub = (s: ServiceData) => s.design_layout === 'city_hub_layout';

/** A service page is a top-level category (e.g. /home-cleaning) */
export const isMainCategory = (s: ServiceData) => s.design_layout === 'main_category_layout';

/** Format price for display */
export function formatBasePrice(raw: string | null): string {
  if (!raw) return 'Call for price';
  const n = parseFloat(raw);
  return Number.isNaN(n) ? raw : `AED ${n.toLocaleString('en-AE', { minimumFractionDigits: 0 })}`;
}

/** Canonical URL helper */
export function serviceCanonical(slug: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localservices.ae';
  return `${site}/${slug}`;
}
