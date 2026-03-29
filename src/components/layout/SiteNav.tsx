"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/services/dubai", label: "Services" },
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
    <nav className="sticky top-0 z-50 border-b border-blue-500/10 bg-[#0a0f1e]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
            <span className="text-xs font-black text-white">LA</span>
          </div>
          <span className="text-lg font-bold text-white">
            LocalServices<span className="text-blue-400"> AE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-blue-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href={getDashboardHref()}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => void handleLogout()}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="btn-primary px-5 py-2 text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-white">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-[#0a0f1e] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            {isAuthenticated ? (
              <button
                onClick={() => { void handleLogout(); setMenuOpen(false); }}
                className="text-left text-sm text-slate-400 hover:text-white"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-slate-400">Sign in</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary py-2 text-center text-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
