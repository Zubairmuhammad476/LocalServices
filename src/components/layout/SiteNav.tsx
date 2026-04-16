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
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(8,18,38,0.88)",
        borderBottom: "1px solid rgba(0,98,255,0.12)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="LocalServices AE — Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #0062FF, #22d3ee)" }}>
            <span className="text-[11px] font-black text-white">LA</span>
          </div>
          <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-jakarta, sans-serif)" }}>
            LocalServices<span style={{ color: "#60a5fa" }}> AE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex" role="menubar">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: pathname === link.href ? "#60a5fa" : "#94a3b8",
              }}
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
                className="text-sm font-medium transition-colors"
                style={{ color: "#94a3b8" }}
                aria-label="Go to your dashboard"
              >
                Dashboard
              </Link>
              <button
                onClick={() => void handleLogout()}
                className="rounded-full border px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors"
                style={{ color: "#94a3b8" }}
                aria-label="Sign in to LocalServices AE"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="btn-primary px-5 py-2 text-sm font-bold"
                aria-label="Create a free LocalServices AE account"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-white text-sm">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="border-t border-white/5 px-4 py-4 md:hidden"
          style={{ background: "#081226" }}
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
                className="text-sm font-medium py-1"
                style={{ color: pathname === link.href ? "#60a5fa" : "#cbd5e1" }}
              >
                {link.label}
              </Link>
            ))}
            <hr style={{ borderColor: "rgba(255,255,255,0.05)" }} />
            {isAuthenticated ? (
              <button
                onClick={() => { void handleLogout(); setMenuOpen(false); }}
                className="text-left text-sm"
                style={{ color: "#94a3b8" }}
              >
                Sign out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: "#94a3b8" }}>
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary py-2 text-center text-sm font-bold"
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
