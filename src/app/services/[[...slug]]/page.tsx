/**
 * Master Catch-all Route for all Service and Sub-Service pages
 * ─────────────────────────────────────────────
 * Route: /services/[[...slug]]
 *
 * Routing logic:
 *  • /services              → ServicesHubTemplate (all services, all Emirates)
 *  • /services/dubai        → ServicePageTemplate  (city hub)
 *  • /services/dubai/ac-repair → SubServiceTemplate (individual service)
 */
import type { Metadata } from 'next';
import {
  fetchServiceBySlug,
  fetchTopSlugs,
  serviceCanonical,
} from '@/lib/server/fetchService';

import ServicePageTemplate  from '@/components/templates/ServicePageTemplate';
import SubServiceTemplate   from '@/components/templates/SubServiceTemplate';
import ServicesHubTemplate  from '@/components/templates/ServicesHubTemplate';

export const revalidate  = 3600;
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
      const stripped = slug.startsWith('services/') ? slug.substring(9) : slug;
      return { slug: stripped.split('/').filter(Boolean) };
    });
  } catch {
    return [];
  }
}

// ─── Dynamic Metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p         = await params;
  const slugArray = p.slug || [];

  // /services hub
  if (slugArray.length === 0) {
    return {
      title: 'Professional Home Services in UAE | 3,600+ Verified Experts | LocalServices AE',
      description:
        'Book verified home services in Dubai, Abu Dhabi and all 7 UAE Emirates. ' +
        'AC repair, cleaning, plumbing, electrical and more. DED-licensed pros, transparent AED pricing, same-day availability.',
      alternates: { canonical: 'https://localservices.ae/services' },
    };
  }

  const fullSlug = `services/${slugArray.join('/')}`;
  const svc      = await fetchServiceBySlug(fullSlug);
  if (!svc) {
    const locName = (slugArray[0] || 'UAE')
      .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const svcName = slugArray[1]
      ? slugArray[1].split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : `Home Services in ${locName}`;
    return {
      title: `${svcName} in ${locName} | Verified Professionals | LocalServices AE`.substring(0, 60),
      description: `Book ${svcName} in ${locName} with DED-licensed experts. Transparent pricing and same-day availability.`.substring(0, 160),
    };
  }

  const locationSlug = slugArray[0] ?? 'uae';
  const location = locationSlug
    .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const entityName = svc.seo_title ? svc.seo_title.split(' in ')[0] : svc.name;

  const korayTitle = `${entityName} in ${location} | 3,619+ Verified Pros | LocalServices AE`
    .substring(0, 60);
  const korayDesc = (
    svc.seo_description ||
    `${entityName} services in ${location} are delivered by verified professionals. ` +
    `Booking confirmation occurs in under 120 seconds, if the user completes the AED checkout. Book now.`
  ).substring(0, 160);

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
    twitter: { card: 'summary_large_image', title: korayTitle, description: korayDesc },
  };
}

// ─── Static fallback factory ──────────────────────────────────────────────────
function buildFallback(slugArray: string[]): import('@/lib/server/fetchService').ServiceData {
  const location = slugArray[0] || 'dubai';
  const service  = slugArray[1] || '';
  const locName  = location
    .split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const svcName  = service
    ? service.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : `${locName} Services`;

  const CITY_SERVICES = [
    { id: 101, name: 'Home Cleaning',  slug: `services/${location}/home-cleaning`,  base_price: '149', design_layout: 'sub_service_layout', image_url: null },
    { id: 102, name: 'Maid Services',  slug: `services/${location}/maid-services`,  base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 103, name: 'AC Maintenance', slug: `services/${location}/ac-maintenance`, base_price: '249', design_layout: 'sub_service_layout', image_url: null },
    { id: 104, name: 'Plumbing',       slug: `services/${location}/plumbing`,       base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 105, name: 'Electrical',     slug: `services/${location}/electrical`,     base_price: '199', design_layout: 'sub_service_layout', image_url: null },
    { id: 106, name: 'Painting',       slug: `services/${location}/painting`,       base_price: '349', design_layout: 'sub_service_layout', image_url: null },
    { id: 107, name: 'Carpentry',      slug: `services/${location}/carpentry`,      base_price: '299', design_layout: 'sub_service_layout', image_url: null },
    { id: 108, name: 'Pest Control',   slug: `services/${location}/pest-control`,   base_price: '299', design_layout: 'sub_service_layout', image_url: null },
    { id: 109, name: 'Handyman',       slug: `services/${location}/handyman`,       base_price: '149', design_layout: 'sub_service_layout', image_url: null },
    { id: 110, name: 'Landscaping',    slug: `services/${location}/landscaping`,    base_price: '399', design_layout: 'sub_service_layout', image_url: null },
    { id: 111, name: 'Deep Cleaning',  slug: `services/${location}/deep-cleaning`,  base_price: '249', design_layout: 'sub_service_layout', image_url: null },
    { id: 112, name: 'Move-In',        slug: `services/${location}/move-in`,        base_price: '349', design_layout: 'sub_service_layout', image_url: null },
  ];

  return {
    id: 1,
    name: svcName,
    slug: `services/${slugArray.join('/')}`,
    description: service
      ? `Professional ${svcName} in ${locName}, UAE. DED-licensed experts, transparent AED pricing, same-day availability.`
      : `Discover all home and maintenance services in ${locName}. Verified professionals, transparent pricing, and same-day booking.`,
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
  const p         = await params;
  const slugArray = p.slug || [];

  // ── /services (no slug) → dedicated hub page ──────────────────────────────
  if (slugArray.length === 0) {
    return <ServicesHubTemplate />;
  }

  // ── /services/[city] or /services/[city]/[service] ─────────────────────────
  const fullSlug = `services/${slugArray.join('/')}`;
  const svc      = (await fetchServiceBySlug(fullSlug)) ?? buildFallback(slugArray);

  if (svc.design_layout === 'sub_service_layout') {
    return <SubServiceTemplate svc={svc} slug={fullSlug} />;
  }

  return <ServicePageTemplate svc={svc} slug={fullSlug} />;
}
