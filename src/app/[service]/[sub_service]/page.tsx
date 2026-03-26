import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/api";
import { getBreadcrumbsFromService, generateCanonicalUrl } from "@/lib/utils";
import SubServiceLayout from "@/components/layouts/SubServiceLayout";

interface PageProps {
  params: Promise<{ service: string; sub_service: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sub_service } = await params;
  const service = await getServiceBySlug(sub_service);

  if (!service) return { title: "Service Not Found | LocalServices AE" };

  const canonicalUrl = generateCanonicalUrl(`/services/${service.parent?.slug ?? ""}/${sub_service}`);
  const title = service.seoTitle ?? `${service.name} in UAE | LocalServices AE`;
  const description = service.seoDescription ?? `Book ${service.name} in UAE.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "LocalServices AE",
      images: service.imageUrl ? [{ url: service.imageUrl }] : [],
    },
  };
}

export default async function SubServicePage({ params }: PageProps) {
  const { sub_service } = await params;
  const service = await getServiceBySlug(sub_service);

  if (!service || !service.isActive) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbsFromService(service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.seoDescription ?? "",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: generateCanonicalUrl(crumb.href),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubServiceLayout service={service} breadcrumbs={breadcrumbs} />
    </>
  );
}
