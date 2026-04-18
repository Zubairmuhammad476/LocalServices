'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

interface PortalHeaderProps {
  userRole: UserRole | null;
  userName?: string;
}

export default function PortalHeader({ userRole, userName }: PortalHeaderProps) {
  const { handleLogout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await handleLogout();
    router.replace('/login');
  };

  return (
    <header className="portal-header" id="portal-header">
      {/* Logo */}
      <Link href="/" className="portal-logo-text" style={{ textDecoration: 'none' }}>
        LocalServices<span>AE</span>
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right: Role chip + user name + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {userRole && (
          <span className="portal-role-chip">{userRole}</span>
        )}

        {userName && (
          <span style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--portal-text-muted)',
            display: 'none',
          }}
            className="sm-show-inline"
          >
            {userName}
          </span>
        )}

        <button
          onClick={onLogout}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--portal-text-muted)',
            background: 'transparent',
            border: '1px solid var(--portal-border)',
            borderRadius: '0.4rem',
            padding: '0.375rem 0.75rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#DC2626';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#DC2626';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--portal-text-muted)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--portal-border)';
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
