import type { Metadata } from "next";

interface SeoOptions {
  entity: string;          // e.g. "AC Maintenance"
  location?: string;       // e.g. "Dubai" — optional, defaults to "UAE"
  numericValue?: string;   // e.g. "3,600+ Verified Pros"
  factStatement?: string;  // Opening factual statement for description
  ifStatement?: string;    // Action-first "if" clause
  cta?: string;            // Call-to-action phrase
  canonical?: string;      // Canonical URL
  image?: string;          // OG image URL
}

const SITE_NAME = "LocalServices AE";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae";

/**
 * Generates metadata following the Koray SEO formula:
 *
 * Title:    [Entity] in [Location] | [Numeric Value] | LocalServices AE
 * Desc:     [Factual statement]. [Action-first "if" statement]. [CTA].
 *
 * Titles stay under 60 chars; descriptions 150–160 chars.
 */
export function generateSeoMetadata(opts: SeoOptions): Metadata {
  const location = opts.location ?? "UAE";
  const numeric  = opts.numericValue ?? "3,619+ Verified Pros";

  // Title: truncates to 60 chars
  const rawTitle = `${opts.entity} in ${location} | ${numeric} | ${SITE_NAME}`;
  const title = rawTitle.length > 60 ? rawTitle.substring(0, 57) + "…" : rawTitle;

  // Description: concatenate parts and trim to 160 chars
  const parts = [
    opts.factStatement ?? `${opts.entity} services are available across all 7 UAE emirates.`,
    opts.ifStatement ?? `Booking confirmation occurs in under 120 seconds, if the user completes the secure checkout.`,
    opts.cta ?? `Book your verified specialist today.`,
  ];
  const rawDesc = parts.join(" ");
  const description = rawDesc.length > 160 ? rawDesc.substring(0, 157) + "…" : rawDesc;

  return {
    title,
    description,
    alternates: {
      canonical: opts.canonical ?? SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: opts.canonical ?? SITE_URL,
      siteName: SITE_NAME,
      type: "website",
      images: opts.image ? [{ url: opts.image, width: 1200, height: 630, alt: `${opts.entity} in ${location} - ${SITE_NAME}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Alt-tag formula: [Specific Tool/Specialist] performing [Action/Service]
 * for [Home Type] in [Emirate], UAE.
 */
export function generateAltTag(specialist: string, action: string, homeType: string, emirate: string): string {
  return `${specialist} performing ${action} for a ${homeType} in ${emirate}, UAE`;
}

/**
 * Icon alt-tag formula for LocalServices AE
 */
export function generateIconAlt(serviceType: string, emirate = "UAE"): string {
  return `${serviceType} icon for LocalServices AE ${emirate} regional hub`;
}
