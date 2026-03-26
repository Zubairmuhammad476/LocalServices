"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service, Breadcrumb } from "@/types/service";
import { formatAEDCurrency } from "@/lib/utils";

interface Props {
  service: Service;
  breadcrumbs: Breadcrumb[];
}

export default function MainServiceLayout({ service, breadcrumbs }: Props) {
  return (
    <main className="min-h-screen bg-surface text-white">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-surface pb-16 pt-24">
        {/* Background Image */}
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-fluid-caption text-brand-300">
              {breadcrumbs.map((crumb, idx) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true">/</span>}
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-white" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Main Heading — exactly ONE h1 per page */}
          <h1 className="text-fluid-h1 font-display font-extrabold text-white">
            {service.seoTitle ?? service.name}
          </h1>

          {service.seoDescription && (
            <p className="mt-4 max-w-3xl text-fluid-body-lg text-brand-200">
              {service.seoDescription}
            </p>
          )}

          {/* Pricing CTA */}
          {service.basePrice && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-fluid-h4 font-bold text-gold-400">
                Starting from {formatAEDCurrency(Number(service.basePrice))}
              </span>
              <Link
                href="#book"
                className="rounded-pill bg-brand-500 px-6 py-3 text-fluid-label font-semibold text-white shadow-glow hover:bg-brand-400 transition-all duration-200"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ─── Sub-services Grid ────────────────────────────────────────── */}
      {service.children && service.children.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-fluid-h2 font-display font-bold text-white">
            Our {service.name} Services
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {service.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/services/${child.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface-raised p-4 shadow-glass transition-all duration-200 hover:border-brand-400/50 hover:shadow-glow"
                >
                  <span className="text-fluid-body font-medium text-white group-hover:text-brand-300 transition-colors">
                    {child.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ─── Description ─────────────────────────────────────────────── */}
      {service.description && (
        <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-fluid-h3 font-display font-semibold text-white">
            About {service.name}
          </h2>
          <p className="text-fluid-body text-zinc-300 leading-relaxed">
            {service.description}
          </p>
        </article>
      )}
    </main>
  );
}
