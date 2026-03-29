import Link from "next/link";

const FOOTER_LINKS = {
  Services: [
    { label: "Cleaning", href: "/services/cleaning" },
    { label: "AC Maintenance", href: "/services/ac-maintenance" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Electrical", href: "/services/electrical" },
    { label: "Handyman", href: "/services/handyman" },
    { label: "Pest Control", href: "/services/pest-control" },
  ],
  Emirates: [
    { label: "Dubai", href: "/services/dubai" },
    { label: "Abu Dhabi", href: "/services/abu-dhabi" },
    { label: "Sharjah", href: "/services/sharjah" },
    { label: "Ajman", href: "/services/ajman" },
    { label: "Ras Al Khaimah", href: "/services/ras-al-khaimah" },
    { label: "Fujairah", href: "/services/fujairah" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Provider Login", href: "/provider" },
    { label: "Admin Portal", href: "/admin-seo" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-blue-500/10 bg-[#08111f]">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
                <span className="text-sm font-black text-white">LA</span>
              </div>
              <span className="text-lg font-bold text-white">
                LocalServices<span className="text-blue-400"> AE</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              UAE&apos;s most trusted home services marketplace. 3,600+ verified professionals across all 7 emirates.
            </p>
            <div className="mt-6 flex gap-3">
              {["𝕏", "in", "f", "📘"].map((icon) => (
                <div
                  key={icon}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-slate-400 transition-all hover:border-blue-500/40 hover:text-blue-400"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            © 2026 LocalServices AE. All rights reserved. Registered in UAE.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300">Terms</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-slate-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
