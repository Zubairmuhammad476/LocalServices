import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CommandSidebarProps {
  role: 'SuperAdmin' | 'FinanceAdmin' | 'ContentEditor' | 'Vendor' | 'Customer';
}

export default function CommandSidebar({ role }: CommandSidebarProps) {
  const pathname = usePathname();

  const menuItems = {
    SuperAdmin: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: '⚡' },
      { label: 'Users', path: '/admin/users', icon: '👥' },
      { label: 'Vendors Verification', path: '/admin/vendors', icon: '🛡️' },
      { label: 'Bookings Command', path: '/admin/bookings', icon: '📅' },
      { label: 'Total Earnings', path: '/admin/finance', icon: '💰' },
      { label: 'Page Editor', path: '/admin/seo', icon: '⚙️' },
      { label: 'Data Analytics', path: '/admin/analytics', icon: '📊' },
    ],
    ContentEditor: [
      { label: 'Page Editor', path: '/admin/seo', icon: '⚙️' },
      { label: 'Services List', path: '/admin/services', icon: '📋' },
    ],
    FinanceAdmin: [
      { label: 'Total Earnings', path: '/finance/earnings', icon: '💰' },
      { label: 'Vendor Payouts', path: '/finance/payouts', icon: '💼' },
      { label: 'Invoices', path: '/finance/invoices', icon: '📄' },
    ],
    Vendor: [
      { label: 'My Active Jobs', path: '/provider/jobs', icon: '📦' },
      { label: 'Earnings', path: '/provider/earnings', icon: '💵' },
      { label: 'Profile', path: '/provider/profile', icon: '📄' },
    ],
    Customer: [
      { label: 'My Bookings', path: '/customer/bookings', icon: '📅' },
      { label: 'Saved Services', path: '/customer/saved', icon: '❤️' },
      { label: 'Invoices', path: '/customer/invoices', icon: '🧾' },
    ]
  };

  const currentLinks = menuItems[role] || menuItems.Customer;

  return (
    <aside className="w-64 min-h-screen bg-[#070b19] border-r border-blue-500/20 shadow-[4px_0_24px_rgba(59,130,246,0.15)] flex flex-col transition-all duration-300">
      <div className="p-6 border-b border-blue-500/10">
        <h1 className="text-xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">⚡</span> LocalServices
        </h1>
        <p className="text-xs text-blue-300/70 mt-1 uppercase tracking-wider font-semibold">
          {role} Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {currentLinks.map((item) => {
          const isActive = pathname?.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm
                ${isActive 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[inset_0_1px_12px_rgba(59,130,246,0.2)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-500/10">
        <div className="glass-card bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400">System Status</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
            <span className="text-sm font-semibold text-emerald-400">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
