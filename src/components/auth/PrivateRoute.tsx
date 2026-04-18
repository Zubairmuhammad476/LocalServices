'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<'SuperAdmin' | 'ContentEditor' | 'FinanceAdmin' | 'Vendor' | 'Customer'>;
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and user isn't authenticated, kick to login
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
      return;
    }

    // If authenticated but lacks role
    if (!isLoading && isAuthenticated && user) {
      const userRoleStr = (user as any).role || 'Customer'; // Handle string role mapping
      if (!allowedRoles.includes(userRoleStr)) {
        // Force redirect to their respective safe dashboard
        if (userRoleStr === 'SuperAdmin') router.replace('/admin/dashboard');
        else if (userRoleStr === 'FinanceAdmin') router.replace('/admin/finance');
        else if (userRoleStr === 'ContentEditor') router.replace('/admin/seo');
        else if (userRoleStr === 'Vendor') router.replace('/provider');
        else router.replace('/customer');
      }
    }
  }, [user, isAuthenticated, isLoading, allowedRoles, router]);

  // Block rendering until safety is verified
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex bg-[#0a0f1e] min-h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-2 border-blue-500/20 border-t-blue-500" />
      </div>
    );
  }

  const userRoleStr = (user as any).role || 'Customer';
  if (!allowedRoles.includes(userRoleStr)) {
    return null;
  }

  return <>{children}</>;
}
