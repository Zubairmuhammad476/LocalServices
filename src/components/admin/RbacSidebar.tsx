'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UserRole } from '@/types';

// ─── RBAC Access Matrix ───────────────────────────────────────────────────────
// This is the SINGLE SOURCE OF TRUTH for portal navigation.
// Add / remove items here — the sidebar renders only what a role can access.

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
  section?: string;
}

// Simple inline SVGs — no external icon dependency required
const Icon = {
  Dashboard: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Users: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Vendors: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Bookings: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Finance: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Payouts: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Editor: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  SEO: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Jobs: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="portal-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

// ─── The Master Nav Registry ──────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  // OVERVIEW
  {
    id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard',
    icon: <Icon.Dashboard />, section: 'Overview',
    allowedRoles: ['SuperAdmin'],
  },
  {
    id: 'analytics', label: 'Analytics', path: '/admin/analytics',
    icon: <Icon.Analytics />, section: 'Overview',
    allowedRoles: ['SuperAdmin'],
  },

  // CONTENT
  {
    id: 'page-editor', label: 'Page Editor', path: '/admin/seo',
    icon: <Icon.Editor />, section: 'Content',
    allowedRoles: ['SuperAdmin', 'ContentEditor'],
  },
  {
    id: 'seo-dashboard', label: 'SEO Dashboard', path: '/admin/seo',
    icon: <Icon.SEO />, section: 'Content',
    allowedRoles: ['SuperAdmin', 'ContentEditor'],
  },

  // OPERATIONS
  {
    id: 'users', label: 'Users', path: '/admin/users',
    icon: <Icon.Users />, section: 'Operations',
    allowedRoles: ['SuperAdmin'],
  },
  {
    id: 'vendors', label: 'Vendor Verification', path: '/admin/vendors',
    icon: <Icon.Vendors />, section: 'Operations',
    allowedRoles: ['SuperAdmin'],
  },
  {
    id: 'bookings', label: 'Bookings', path: '/admin/bookings',
    icon: <Icon.Bookings />, section: 'Operations',
    allowedRoles: ['SuperAdmin'],
  },

  // FINANCE
  {
    id: 'earnings', label: 'Earnings', path: '/admin/finance',
    icon: <Icon.Finance />, section: 'Finance',
    allowedRoles: ['SuperAdmin', 'FinanceAdmin'],
  },
  {
    id: 'payouts', label: 'Vendor Payouts', path: '/finance/payouts',
    icon: <Icon.Payouts />, section: 'Finance',
    allowedRoles: ['SuperAdmin', 'FinanceAdmin'],
  },

  // VENDOR-SPECIFIC
  {
    id: 'my-jobs', label: 'My Jobs', path: '/provider/jobs',
    icon: <Icon.Jobs />, section: 'My Portal',
    allowedRoles: ['Vendor'],
  },
  {
    id: 'vendor-earnings', label: 'My Earnings', path: '/provider/earnings',
    icon: <Icon.Finance />, section: 'My Portal',
    allowedRoles: ['Vendor'],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface RbacSidebarProps {
  currentRole: UserRole;
}

export default function RbacSidebar({ currentRole }: RbacSidebarProps) {
  const pathname = usePathname();

  // Filter the master list down to only what this role can see
  const visibleItems = NAV_ITEMS.filter(item => item.allowedRoles.includes(currentRole));

  // Group by section
  const sections = Array.from(new Set(visibleItems.map(i => i.section).filter(Boolean))) as string[];

  return (
    <nav className="portal-sidebar" aria-label="Portal Navigation">
      {sections.map(section => {
        const items = visibleItems.filter(i => i.section === section);
        return (
          <div key={section}>
            <div className="portal-sidebar-section">{section}</div>
            {items.map(item => {
              const isActive = pathname === item.path || pathname?.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  id={`nav-${item.id}`}
                  className={`portal-nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        );
      })}

      {/* Role Watermark */}
      <div style={{ marginTop: 'auto', padding: '1rem 0.75rem' }}>
        <div style={{
          padding: '0.625rem 0.75rem',
          background: 'rgba(37,99,235,0.05)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(37,99,235,0.12)',
        }}>
          <p style={{ fontSize: '0.6875rem', color: 'var(--portal-text-light)', fontWeight: 500, marginBottom: '0.125rem' }}>
            ACTIVE ROLE
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--portal-primary)', fontWeight: 600 }}>
            {currentRole}
          </p>
        </div>
      </div>
    </nav>
  );
}
