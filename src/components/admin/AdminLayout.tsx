'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import PortalHeader from '@/components/admin/PortalHeader';
import RbacSidebar from '@/components/admin/RbacSidebar';

// Import the isolated portal CSS (light theme — does NOT affect marketing pages)
import '@/app/(portals)/admin/portal.css';

interface AdminLayoutProps {
  children: React.ReactNode;
  /** Pass the roles that ARE allowed to see this page/section */
  allowedRoles?: UserRole[];
}

// Role → default redirect if user accesses a page they shouldn't
const ROLE_HOME: Record<UserRole, string> = {
  SuperAdmin:    '/admin/dashboard',
  ContentEditor: '/admin/seo',
  FinanceAdmin:  '/admin/finance',
  Vendor:        '/provider/jobs',
  Customer:      '/customer',
};

export default function AdminLayout({ children, allowedRoles }: AdminLayoutProps) {
  const { user, userRole, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // 1. Not logged in → login page
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // 2. Role restriction check
    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      // Redirect to their own home page instead of a 403
      const safeRoute = ROLE_HOME[userRole] ?? '/login';
      router.replace(safeRoute);
    }
  }, [isLoading, isAuthenticated, userRole, allowedRoles, router]);

  // Show spinner while hydrating
  if (isLoading) {
    return (
      <div
        className="portal-root"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
        }}
      >
        <div
          style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            border: '2px solid #E2E8F0',
            borderTopColor: '#2563EB',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      </div>
    );
  }

  // Block render if not authenticated or wrong role
  if (!isAuthenticated || !user) return null;
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) return null;

  return (
    <div className="portal-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── Sticky Header ────────────────────────────────────────────── */}
      <PortalHeader userRole={userRole} userName={user.name} />

      {/* ── Body: Sidebar + Main ──────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar only renders when we have a role */}
        {userRole && <RbacSidebar currentRole={userRole} />}

        {/* Page content */}
        <main className="portal-main">
          {children}
        </main>
      </div>
    </div>
  );
}
