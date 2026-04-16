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

// ─── Component Render ─────────────────────────────────────────────────────────
export default async function GenericServicePage({ params }: Props) {
  const p = await params;
  const slugArray = p.slug || [];
  
  // Reconstruct full slug to match the DB exactly
  const fullSlug = `services/${slugArray.join('/')}`;
  const svc = await fetchServiceBySlug(fullSlug);

  if (!svc) {
    notFound();
  }

  // Branch routing based on backend template config mapping
  if (svc.design_layout === 'sub_service_layout') {
    return <SubServiceTemplate svc={svc} slug={fullSlug} />;
  }

  // Default / City Hub / Primary Layout
  return <ServicePageTemplate svc={svc} slug={fullSlug} />;
}
