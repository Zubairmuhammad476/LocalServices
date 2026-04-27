/**
 * Master Catch-all Route for all Service and Sub-Service pages
 * ─────────────────────────────────────────────
 * Route: /services/[[...slug]]
 *
 * This intelligently loads the exact CSV slug from the database and routes
 * to the proper UI template while rendering optimized SEO data dynamically.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  fetchServiceBySlug,
  fetchTopSlugs,
  serviceCanonical,
} from '@/lib/server/fetchService';
import { generateSeoMetadata } from '@/lib/seo';

import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import SubServiceTemplate from '@/components/templates/SubServiceTemplate';

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug?: string[] }>;
}

// ─── ISR Pre-rendering ────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs = await fetchTopSlugs(3600);
    if (!slugs?.length) return [];
    return slugs.map(({ slug }) => {
      // The slug from DB is like "services/dubai/cleaning", split by "/"
      // But we are in `src/app/services/[[...slug]]` so the route is `/services/[...slug]`
      // So if the DB slug is `services/dubai/cleaning`, Next.js appends it to `/services/`.
      // Wait, if the URL is `/services/dubai/cleaning`, the DB slug is `services/dubai/cleaning`.
      // The Next.js path `app/services/[[...slug]]` will match `slug = ["dubai", "cleaning"]`.
      
      const stripped = slug.startsWith('services/') ? slug.substring(9) : slug;
      return { slug: stripped.split('/').filter(Boolean) };
    });
  } catch {
    return [];
  }
}

// ─── Dynamic Metadata (Koray Formula) ────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const slugArray = p.slug || [];
  const fullSlug = `services/${slugArray.join('/')}`;
  
  const svc = await fetchServiceBySlug(fullSlug);
  if (!svc) return { title: 'Service Not Found' };

  // Derive location from slug (e.g. services/dubai/cleaning → Dubai)
  const locationSlug = slugArray[0] ?? 'uae';
  const location = locationSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Koray title: [Entity] in [Location] | [Numeric] | LocalServices AE
  const entityName = svc.seo_title
    ? svc.seo_title.split(' in ')[0]
    : svc.name;
  const korayTitle = `${entityName} in ${location} | 3,619+ Verified Pros | LocalServices AE`
    .substring(0, 60);

  // Koray description: Factual + action-first "if" + CTA (max 160 chars)
  const korayDesc = (
    svc.seo_description ||
    `${entityName} services in ${location} are delivered by verified professionals. ` +
    `Booking confirmation occurs in under 120 seconds, if the user completes the AED checkout. Book now.`
  ).substring(0, 160);

  // Alt-text formula for OG image
  const imageAlt = svc.image_alt_text ||
    `Verified ${entityName} specialist performing home services for a residential property in ${location}, UAE`;

  return {
    title: korayTitle,
    description: korayDesc,
    alternates: { canonical: serviceCanonical(fullSlug) },
    openGraph: {
      title: korayTitle,
      description: korayDesc,
      url: serviceCanonical(fullSlug),
      type: 'website',
      images: svc.image_url
        ? [{ url: svc.image_url, width: 1200, height: 630, alt: imageAlt }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: korayTitle,
      description: korayDesc,
    },
  };
}

// ─── Static fallback factory ──────────────────────────────────────────────────
// Called when the backend API is unreachable (e.g. Vercel without backend).
// Generates a fully-functional page from slug alone so the site never 404s.
function buildFallback(slugArray: string[]): import('@/lib/server/fetchService').ServiceData {
  const location  = slugArray[0] || 'dubai';
  const service   = slugArray[1] || '';
  const locName   = location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ');
  const svcName   = service
    ? service.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : `${locName} Services`;

  const CITY_SERVICES = [
    { id: 101, name: 'Home Cleaning',    slug: `services/${location}/home-cleaning`,    base_price: '149', design_layout: 'sub_service_layout', image_url: null },
    { id: 102, name: 'Maid Services',    slug: `services/${location}/maid-services`,    base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 103, name: 'AC Maintenance',   slug: `services/${location}/ac-maintenance`,   base_price: '249', design_layout: 'sub_service_layout', image_url: null },
    { id: 104, name: 'Plumbing',         slug: `services/${location}/plumbing`,         base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 105, name: 'Electrical',       slug: `services/${location}/electrical`,       base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 106, name: 'Painting',         slug: `services/${location}/painting`,         base_price: '349', design_layout: 'sub_service_layout', image_url: null },
    { id: 107, name: 'Carpentry',        slug: `services/${location}/carpentry`,        base_price: '299', design_layout: 'sub_service_layout', image_url: null },
    { id: 108, name: 'Pest Control',     slug: `services/${location}/pest-control`,     base_price: '299', design_layout: 'sub_service_layout', image_url: null },
    { id: 109, name: 'Handyman',         slug: `services/${location}/handyman`,         base_price: '149', design_layout: 'sub_service_layout', image_url: null },
    { id: 110, name: 'Landscaping',      slug: `services/${location}/landscaping`,      base_price: '399', design_layout: 'sub_service_layout', image_url: null },
    { id: 111, name: 'Deep Cleaning',    slug: `services/${location}/deep-cleaning`,    base_price: '249', design_layout: 'sub_service_layout', image_url: null },
    { id: 112, name: 'Move-in Cleaning', slug: `services/${location}/move-in-cleaning`, base_price: '349', design_layout: 'sub_service_layout', image_url: null },
  ];

  return {
    id: 1,
    name: svcName,
    slug: `services/${slugArray.join('/')}`,
    description: service
      ? `Professional ${svcName} in ${locName}, UAE. Our DED-licensed experts deliver guaranteed quality with transparent AED pricing and same-day availability.`
      : `Discover all home and maintenance services in ${locName}. DED-licensed professionals, transparent pricing, and same-day booking.`,
    design_layout: service ? 'sub_service_layout' : 'city_hub_layout',
    base_price: '149',
    pricing_model: 'fixed',
    seo_title: null,
    seo_description: null,
    image_url: null,
    image_alt_text: null,
    canonical_url: null,
    no_index: false,
    h1_override: null,
    schema_markup: null,
    is_active: true,
    is_seo_optimized: false,
    emirate: locName,
    category: svcName,
    parent: null,
    children: service ? [] : CITY_SERVICES,
  };
}

// ─── Component Render ─────────────────────────────────────────────────────────
export default async function GenericServicePage({ params }: Props) {
  const p = await params;
  const slugArray = p.slug || [];
  
  // Reconstruct full slug to match the DB exactly
  const fullSlug = `services/${slugArray.join('/')}`;
  
  // Try the live API first; fall back to static content if offline
  const svc = (await fetchServiceBySlug(fullSlug)) ?? buildFallback(slugArray);

  // Branch routing based on backend template config mapping
  if (svc.design_layout === 'sub_service_layout') {
    return <SubServiceTemplate svc={svc} slug={fullSlug} />;
  }

  // Default / City Hub / Primary Layout
  return <ServicePageTemplate svc={svc} slug={fullSlug} />;
}

