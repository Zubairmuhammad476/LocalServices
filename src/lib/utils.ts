import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Breadcrumb, Service } from "@/types/service";

// ─── Tailwind Class Merge ──────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Currency Formatting ──────────────────────────────────────────────────────

/**
 * Formats a number as AED currency string.
 * e.g. formatAEDCurrency(1250) → "AED 1,250.00"
 */
export function formatAEDCurrency(amount: number): string {
  return `AED ${new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

// ─── Breadcrumb Helpers ────────────────────────────────────────────────────────

export function getBreadcrumbsFromService(service: Service): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];

  if (service.parent) {
    crumbs.push({
      label: service.parent.name,
      href: `/services/${service.parent.slug}`,
    });
  }

  crumbs.push({
    label: service.name,
    href: `/services/${service.slug}`,
  });

  return crumbs;
}

// ─── String Helpers ───────────────────────────────────────────────────────────

export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ─── SEO Helpers ──────────────────────────────────────────────────────────────

export function generateCanonicalUrl(path: string): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae";
  return `${siteUrl}${path}`;
}

// ─── Boolean Checks ───────────────────────────────────────────────────────────

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function shouldShowFullDescription(textLength: number): boolean {
  return textLength <= 300;
}
