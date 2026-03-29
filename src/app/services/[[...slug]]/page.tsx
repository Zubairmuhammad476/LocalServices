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

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const slugArray = p.slug || [];
  const fullSlug = `services/${slugArray.join('/')}`;
  
  const svc = await fetchServiceBySlug(fullSlug);
  if (!svc) return { title: 'Service Not Found' };

  const title = svc.seo_title ?? `${svc.name} in UAE | LocalServices AE`;
  const description = svc.seo_description ?? `Professional ${svc.name} services in the UAE. Vetted experts, transparent pricing.`;

  return {
    title,
    description,
    alternates: { canonical: serviceCanonical(fullSlug) },
    openGraph: {
      title,
      description,
      url: serviceCanonical(fullSlug),
      type: 'website',
      images: svc.image_url ? [{ url: svc.image_url }] : undefined,
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
