"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service, Breadcrumb } from "@/types/service";

interface Props {
  service: Service;
  breadcrumbs: Breadcrumb[];
}

export default function CityHubLayout({ service, breadcrumbs }: Props) {
  return (
    <main className="min-h-screen bg-surface text-white">
      {/* ─── City Hero ────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-surface-overlay pb-20 pt-28">
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt={`Services in ${service.name}`}
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          {/* Exactly ONE h1 */}
          <h1 className="text-fluid-h1 font-display font-extrabold text-white">
            {service.seoTitle ?? `Services in ${service.name}`}
          </h1>

          {service.seoDescription && (
            <p className="mt-4 max-w-3xl text-fluid-body-lg text-brand-200">
              {service.seoDescription}
            </p>
          )}
        </div>
      </header>

      {/* ─── Service Categories Grid ──────────────────────────────────── */}
      {service.children && service.children.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-fluid-h2 font-display font-bold text-white">
            All Services in {service.name}
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {service.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/services/${child.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-surface-raised p-5 shadow-glass transition-all duration-300 hover:border-brand-400/60 hover:shadow-glow hover:-translate-y-1"
                >
                  <h3 className="text-fluid-body font-semibold text-white group-hover:text-brand-300 transition-colors">
                    {child.name}
                  </h3>
                  <span className="text-fluid-caption capitalize text-zinc-500">
                    {child.pricingModel.replace("_", " ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
