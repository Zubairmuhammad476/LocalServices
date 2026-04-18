'use client';
import React from 'react';
import CommandSidebar from './CommandSidebar';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200 selection:bg-blue-500/30">
      <CommandSidebar role="Vendor" />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Placeholder */}
        <header className="h-16 border-b border-blue-500/10 bg-[#070b19]/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <h2 className="font-jakarta font-semibold text-slate-300">Provider Portal</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              Verified Professional
            </span>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
