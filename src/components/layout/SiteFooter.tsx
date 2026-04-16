import Link from "next/link";

const FOOTER_LINKS = {
  Services: [
    { label: "Home Cleaning", href: "/services/home-cleaning" },
    { label: "AC Maintenance", href: "/services/ac-maintenance" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Electrical", href: "/services/electrical" },
    { label: "Handyman", href: "/services/handyman" },
    { label: "Pest Control", href: "/services/pest-control" },
    { label: "Maid Services", href: "/services/maid-services" },
  ],
  Emirates: [
    { label: "Dubai", href: "/services/dubai" },
    { label: "Abu Dhabi", href: "/services/abu-dhabi" },
    { label: "Sharjah", href: "/services/sharjah" },
    { label: "Ajman", href: "/services/ajman" },
    { label: "Ras Al Khaimah", href: "/services/ras-al-khaimah" },
    { label: "Fujairah", href: "/services/fujairah" },
    { label: "Umm Al Quwain", href: "/services/umm-al-quwain" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Become a Provider", href: "/register?role=provider" },
    { label: "Provider Login", href: "/login" },
  ],
};

export default function SiteFooter() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(0,98,255,0.1)", background: "#080d18" }}
      role="contentinfo"
      aria-label="LocalServices AE site footer"
    >
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="LocalServices AE — Home"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #0062FF, #22d3ee)" }}
              >
                <span className="text-sm font-black text-white">LA</span>
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                LocalServices<span style={{ color: "#60a5fa" }}> AE</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              UAE's most trusted home services marketplace. 3,619+ verified professionals across all 7 emirates.
            </p>
            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/8 px-2.5 py-1 text-xs text-green-400">
                ✅ PDPL Compliant
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/8 px-2.5 py-1 text-xs text-blue-400">
                🔒 SSL Secured
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3
                className="mb-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: "#60a5fa", fontFamily: "var(--font-display)" }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                      aria-label={link.label}
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
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            © 2026 LocalServices AE. All rights reserved. Registered in Dubai, UAE.
          </p>
          <div className="flex gap-5" role="list" aria-label="Footer legal links">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/services/dubai" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Services</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
