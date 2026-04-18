'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SiteFooter() {
  const { user, isAuthenticated } = useAuth();

  const getDashboardHref = () => {
    if (!user) return "/login";
    if (user.roles.includes("admin")) return "/admin/dashboard";
    if (user.roles.includes("provider")) return "/provider";
    return "/customer";
  };

  const FOOTER_LINKS = {
    Company: [
      { label: "About Us",        href: "/about" },
      { label: "Careers",         href: "/careers" },
      { label: "Press",           href: "/press" },
      { label: "Contact",         href: "/contact" },
    ],
    Services: [
      { label: "Home Cleaning",   href: "/services/dubai/home-cleaning" },
      { label: "AC Maintenance",  href: "/services/dubai/ac-maintenance" },
      { label: "Plumbing",        href: "/services/dubai/plumbing" },
      { label: "Electrical",      href: "/services/dubai/electrical" },
      { label: "Maid Services",   href: "/services/dubai/maid-services" },
      { label: "Pest Control",    href: "/services/dubai/pest-control" },
    ],
    Legal: [
      { label: "Privacy Policy",  href: "/privacy" },
      { label: "Terms of Service",href: "/terms" },
      { label: "Trust & Safety",  href: "/trust" },
      { label: "Accessibility",   href: "/accessibility" },
    ],
    Account: [
      { label: isAuthenticated ? "My Dashboard" : "Sign In", href: getDashboardHref() },
      { label: "Create Account",       href: "/register" },
      { label: "Become a Provider",    href: "/register?role=provider" },
      { label: "Support Center",       href: "/support" },
    ],
  };

  const SEO_MATRIX = [
    {
      title: "Dubai Services",
      links: [
        { label: "AC Repair Dubai",         href: "/services/dubai/ac-maintenance" },
        { label: "Cleaning Dubai",          href: "/services/dubai/home-cleaning" },
        { label: "Plumbing Dubai",          href: "/services/dubai/plumbing" },
        { label: "Electrician Dubai",       href: "/services/dubai/electrical" },
        { label: "Handyman Dubai",          href: "/services/dubai/handyman" },
      ],
    },
    {
      title: "Abu Dhabi Services",
      links: [
        { label: "AC Repair Abu Dhabi",     href: "/services/abu-dhabi/ac-maintenance" },
        { label: "Cleaning Abu Dhabi",      href: "/services/abu-dhabi/home-cleaning" },
        { label: "Plumbing Abu Dhabi",      href: "/services/abu-dhabi/plumbing" },
        { label: "Maid Services Abu Dhabi", href: "/services/abu-dhabi/maid-services" },
        { label: "Pest Control Abu Dhabi",  href: "/services/abu-dhabi/pest-control" },
      ],
    },
    {
      title: "Other Emirates",
      links: [
        { label: "Handyman Sharjah",        href: "/services/sharjah/handyman" },
        { label: "Cleaning Sharjah",        href: "/services/sharjah/home-cleaning" },
        { label: "Plumbing Ajman",          href: "/services/ajman/plumbing" },
        { label: "Services Ras Al Khaimah", href: "/services/ras-al-khaimah" },
        { label: "Services Fujairah",       href: "/services/fujairah" },
      ],
    },
    {
      title: "Locations",
      links: [
        { label: "Dubai Marina",            href: "/services/dubai" },
        { label: "Downtown Dubai",          href: "/services/dubai" },
        { label: "Palm Jumeirah",           href: "/services/dubai" },
        { label: "Al Reem Island",          href: "/services/abu-dhabi" },
        { label: "Saadiyat Island",         href: "/services/abu-dhabi" },
      ],
    },
  ];

  return (
    <footer
      className="bg-[var(--deep-navy)] border-t border-[rgba(28,82,151,0.2)]"
      role="contentinfo"
      aria-label="LocalServices AE site footer"
    >
      {/* SEO Link Matrix */}
      <div className="border-b border-[rgba(255,255,255,0.06)] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-600 mb-6">
            Explore Services Across UAE
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SEO_MATRIX.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-slate-600 hover:text-slate-300 transition-colors"
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
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          
          {/* Brand & Mission (Spans 2 columns on lg) */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="LocalServices AE — Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)] shadow-sm">
                <span className="text-[11px] font-black text-white tracking-widest">LA</span>
              </div>
              <span className="text-lg font-extrabold text-white font-display tracking-tight">
                LocalServices<span className="text-[var(--brand)]"> AE</span>
              </span>
            </Link>
            <p className="mt-6 text-sm font-light leading-relaxed text-slate-300 max-w-sm">
              Experience seamless, verified home services at your fingertips. From premium maid services to certified deep AC maintenance across all 7 UAE emirates.
            </p>
            
            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] bg-[#15407A]/40 px-3 py-1.5 text-xs font-semibold text-white">
                🛡️ Verified Pros
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC72C]/40 bg-[#FFC72C]/10 px-3 py-1.5 text-xs font-semibold text-[#FFC72C]">
                💳 Secure AED Payments
              </span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white font-display">
                  {category}
                </h3>
                <ul className="space-y-3" role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-slate-400 transition-colors hover:text-[var(--brand)]"
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
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)] bg-[#050914]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} LocalServices AE. All rights reserved. Registered in Dubai, UAE.
          </p>
          <div className="flex items-center gap-6" role="list">
            <span className="text-xs font-bold text-slate-600 block">System Online. Built for UAE.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
