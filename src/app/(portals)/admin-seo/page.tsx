import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin SEO Dashboard | LocalServices AE",
  robots: { index: false, follow: false },
};

export default function AdminSeoDashboard() {
  return (
    <main className="min-h-screen bg-surface p-8 text-white">
      <header className="mb-8">
        <h1 className="text-fluid-h2 font-display font-bold text-white">
          SEO Control Center
        </h1>
        <p className="mt-2 text-fluid-body text-zinc-400">
          Manage metadata, schema, redirects, and canonical tags for all 3,600+ pages.
        </p>
      </header>

      {/* Dashboard grid — Sprint 2 will wire live data */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-label="SEO stats">
        {[
          { label: "Total Pages", value: "3,621", desc: "Service pages indexed" },
          { label: "SEO Optimized", value: "0%", desc: "Pages with custom metadata" },
          { label: "Redirects", value: "0", desc: "Active 301 redirects" },
          { label: "Schema Issues", value: "—", desc: "Requires audit" },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-white/10 bg-surface-raised p-6 shadow-glass"
          >
            <h2 className="text-fluid-label font-medium text-zinc-400">{stat.label}</h2>
            <p className="mt-2 text-fluid-h3 font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-fluid-caption text-zinc-500">{stat.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-white/10 bg-surface-raised p-6 shadow-glass">
        <h2 className="mb-4 text-fluid-h4 font-semibold text-white">Service Pages</h2>
        <p className="text-fluid-body text-zinc-400">
          Full CRUD table with inline SEO editing — Sprint 2 implementation.
        </p>
      </section>
    </main>
  );
}
