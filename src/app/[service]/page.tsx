import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getTopServiceSlugs } from "@/lib/api";
import { getBreadcrumbsFromService, generateCanonicalUrl } from "@/lib/utils";
import MainServiceLayout from "@/components/layouts/MainServiceLayout";
import SubServiceLayout from "@/components/layouts/SubServiceLayout";
import CityHubLayout from "@/components/layouts/CityHubLayout";

interface PageProps {
  params: Promise<{ service: string }>;
}

// ─── ISR Configuration ────────────────────────────────────────────────────────
export const revalidate = 60;

// ─── generateStaticParams: Pre-render top 500 slugs at build time ─────────────
export async function generateStaticParams(): Promise<{ service: string }[]> {
  const slugs = await getTopServiceSlugs(500);
  return slugs.map((slug) => ({ service: slug }));
}

// ─── Dynamic Metadata per service ─────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | LocalServices AE" };
  }

  const canonicalUrl = generateCanonicalUrl(`/services/${slug}`);
  const title = service.seoTitle ?? `${service.name} in UAE | LocalServices AE`;
  const description =
    service.seoDescription ??
    `Book professional ${service.name} services in UAE. Verified experts, instant booking.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "LocalServices AE",
      type: "website",
      images: service.imageUrl ? [{ url: service.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── JSON-LD Schema Generator ─────────────────────────────────────────────────
function getServiceJsonLd(
  service: Awaited<ReturnType<typeof getServiceBySlug>>,
  slug: string
) {
  if (!service) return null;

  const canonicalUrl = generateCanonicalUrl(`/services/${slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.seoDescription ?? service.description ?? "",
        url: canonicalUrl,
        provider: {
          "@type": "LocalBusiness",
          name: "LocalServices AE",
          url: generateCanonicalUrl("/"),
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
        },
        ...(service.basePrice && {
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: service.basePrice,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: getBreadcrumbsFromService(service).map(
          (crumb, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: crumb.label,
            item: generateCanonicalUrl(crumb.href),
          })
        ),
      },
    ],
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.isActive) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbsFromService(service);
  const jsonLd = getServiceJsonLd(service, slug);

  const renderLayout = () => {
    switch (service.designLayout) {
      case "main_category_layout":
        return (
          <MainServiceLayout service={service} breadcrumbs={breadcrumbs} />
        );
      case "city_hub_layout":
        return (
          <CityHubLayout service={service} breadcrumbs={breadcrumbs} />
        );
      default:
        return (
          <SubServiceLayout service={service} breadcrumbs={breadcrumbs} />
        );
    }
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {renderLayout()}
    </>
  );
}
