"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service, Breadcrumb } from "@/types/service";
import { formatAEDCurrency } from "@/lib/utils";

interface Props {
  service: Service;
  breadcrumbs: Breadcrumb[];
}

export default function SubServiceLayout({ service, breadcrumbs }: Props) {
  return (
    <main className="min-h-screen bg-surface text-white">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative bg-gradient-to-b from-surface-overlay to-surface py-20">
        {service.imageUrl && (
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
        )}

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-fluid-caption text-zinc-400">
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

          {/* Exactly ONE h1 per page */}
          <h1 className="text-fluid-h1 font-display font-extrabold text-white">
            {service.seoTitle ?? service.name}
          </h1>

          {service.seoDescription && (
            <p className="mt-4 text-fluid-body text-zinc-300 max-w-2xl">
              {service.seoDescription}
            </p>
          )}
        </div>
      </header>

      {/* ─── Booking Card + Info ──────────────────────────────────────── */}
      <section
        className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8"
        aria-label="Service details and booking"
      >
        {/* Left: Info */}
        <article className="lg:col-span-2 space-y-6">
          {service.description && (
            <>
              <h2 className="text-fluid-h3 font-display font-semibold text-white">
                About this Service
              </h2>
              <p className="text-fluid-body text-zinc-300 leading-relaxed">
                {service.description}
              </p>
            </>
          )}
        </article>

        {/* Right: Booking Sidebar */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-surface-raised p-6 shadow-glass-lg">
          <h2 className="mb-4 text-fluid-h4 font-display font-bold text-white">
            Book This Service
          </h2>

          {service.basePrice && (
            <p className="mb-4 text-fluid-h5 font-bold text-gold-400">
              {formatAEDCurrency(Number(service.basePrice))}
            </p>
          )}

          <p className="mb-6 text-fluid-body-sm capitalize text-zinc-400">
            Pricing: {service.pricingModel.replace("_", " ")}
          </p>

          <Link
            id="book"
            href={`/book?service=${service.slug}`}
            className="block w-full rounded-pill bg-brand-500 px-6 py-3 text-center text-fluid-label font-semibold text-white shadow-glow hover:bg-brand-400 transition-all duration-200"
          >
            Book Now
          </Link>

          <p className="mt-3 text-center text-fluid-caption text-zinc-500">
            Verified providers · AED payments
          </p>
        </aside>
      </section>
    </main>
  );
}
