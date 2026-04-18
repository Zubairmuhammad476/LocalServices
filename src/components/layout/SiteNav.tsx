"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services/dubai", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const { user, handleLogout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getDashboardHref = () => {
    if (!user) return "/login";
    if (user.roles.includes("admin")) return "/admin-seo";
    if (user.roles.includes("provider")) return "/provider";
    return "/customer";
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[var(--border-light)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="LocalServices AE — Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)] shadow-sm">
            <span className="text-[11px] font-black text-white tracking-widest">LA</span>
          </div>
          <span className="text-lg font-extrabold text-[var(--deep-navy)] font-display tracking-tight">
            LocalServices<span className="text-[var(--brand)]"> AE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === link.href ? "text-[var(--brand)]" : "text-[var(--text-muted)] hover:text-[var(--deep-navy)]"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href={getDashboardHref()}
                className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                aria-label="Go to your dashboard"
              >
                Dashboard
              </Link>
              <button
                onClick={() => void handleLogout()}
                className="rounded-full border border-[var(--border-light)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] transition-all hover:bg-[var(--soft-slate)]"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                aria-label="Sign in to LocalServices AE"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[var(--brand)] hover:opacity-90 transition-opacity text-white px-5 py-2 text-sm font-bold shadow-sm"
                aria-label="Create a free LocalServices AE account"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-light)] bg-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-[var(--deep-navy)] text-sm font-bold">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t border-[var(--border-light)] bg-white px-4 py-4 md:hidden shadow-lg"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                role="menuitem"
                className={`text-sm font-bold py-1 ${
                  pathname === link.href ? "text-[var(--brand)]" : "text-[var(--text-muted)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[var(--border-light)]" />
            {isAuthenticated ? (
              <button
                onClick={() => { void handleLogout(); setMenuOpen(false); }}
                className="text-left text-sm font-semibold text-[var(--text-muted)]"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[var(--text-muted)]">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-[var(--brand)] py-2 text-center text-sm font-bold text-white shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
