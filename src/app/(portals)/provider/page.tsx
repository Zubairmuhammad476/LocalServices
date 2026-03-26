import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Portal | LocalServices AE",
  robots: { index: false, follow: false },
};

export default function ProviderPortal() {
  return (
    <main className="min-h-screen bg-surface p-8 text-white">
      <header className="mb-8">
        <h1 className="text-fluid-h2 font-display font-bold text-white">
          Provider Dashboard
        </h1>
        <p className="mt-2 text-fluid-body text-zinc-400">
          Manage your leads, earnings, payouts, and schedule.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3" aria-label="Provider stats">
        {[
          { label: "New Leads", value: "0" },
          { label: "Active Jobs", value: "0" },
          { label: "Earnings (AED)", value: "0.00" },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-white/10 bg-surface-raised p-6 shadow-glass"
          >
            <h2 className="text-fluid-label font-medium text-zinc-400">{stat.label}</h2>
            <p className="mt-2 text-fluid-h3 font-bold text-white">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-surface-raised p-6 shadow-glass">
        <h2 className="mb-2 text-fluid-h4 font-semibold text-white">Lead Management</h2>
        <p className="text-fluid-body text-zinc-400">Lead table — Sprint 2 implementation.</p>
      </section>
    </main>
  );
}
