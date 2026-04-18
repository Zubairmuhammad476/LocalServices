'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type PortalRole = 'SuperAdmin' | 'ContentEditor' | 'FinanceAdmin' | 'Vendor';

interface DynamicSidebarProps {
  currentRole: PortalRole;
}

export default function DynamicSidebar({ currentRole }: DynamicSidebarProps) {
  const pathname = usePathname();

  // The Master Link Repository
  const allLinks = [
    { id: 'dash', label: 'Overview', path: '/admin/dashboard', icon: '⚡', roles: ['SuperAdmin'] },
    
    // Content Editor Bounds
    { id: 'seo', label: 'Page Content Editor', path: '/admin/seo', icon: '📝', roles: ['SuperAdmin', 'ContentEditor'] },
    { id: 'services', label: 'Services Index', path: '/admin/services', icon: '📋', roles: ['SuperAdmin', 'ContentEditor'] },
    
    // Finance Bounds
    { id: 'ledger', label: 'Financial Ledger', path: '/admin/finance', icon: '💰', roles: ['SuperAdmin', 'FinanceAdmin'] },
    { id: 'payouts', label: 'Vendor Payouts', path: '/finance/payouts', icon: '💳', roles: ['SuperAdmin', 'FinanceAdmin'] },
    { id: 'invoices', label: 'Tax Invoices', path: '/finance/invoices', icon: '🧾', roles: ['SuperAdmin', 'FinanceAdmin'] },
    
    // Vendor Bounds
    { id: 'vendors', label: 'Vendor CRM', path: '/admin/vendors', icon: '🛡️', roles: ['SuperAdmin'] }, // Admin managing vendors
    { id: 'my-jobs', label: 'My Active Jobs', path: '/provider/jobs', icon: '📦', roles: ['Vendor'] },
  ];

  // Conditional Rendering Engine: Iterates Links array and filters out unauthorized paths
  const authorizedLinks = allLinks.filter(link => link.roles.includes(currentRole));

  return (
    <aside className="w-64 min-h-screen bg-[#070b19] border-r border-blue-500/10 p-6 flex flex-col gap-4">
      <div className="mb-8">
        <h2 className="text-xl font-black text-white px-2">LocalServices<span className="text-blue-500">AE</span></h2>
        <p className="text-[10px] text-slate-500 tracking-widest uppercase mt-1 px-2">{currentRole} PORTAL</p>
      </div>

      <nav className="flex flex-col gap-1">
        {authorizedLinks.map((link) => {
          const isActive = pathname?.startsWith(link.path);
          return (
            <Link 
              key={link.id} 
              href={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      {/* Visual Debug / Helper block */}
      <div className="mt-auto bg-rose-500/5 border border-rose-500/10 p-4 rounded-lg">
        <p className="text-[10px] text-rose-400 uppercase tracking-wide">Security Matrix Applied</p>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          The portal layout is dynamically rendering only {authorizedLinks.length} links authorized for your physical clearance tier.
        </p>
      </div>
    </aside>
  );
}
