'use client';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">⚡</span> Admin Dashboard Overview
        </h1>
      </div>

      <div className="glass-card bg-[#070b19] border border-blue-500/10 p-8 rounded-xl flex flex-col items-center justify-center text-center min-h-[300px]">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to LocalServices Command Center</h2>
        <p className="text-slate-400 max-w-lg mb-8">
          The system is fully operational. All Phase 1-5 automations including the Financial Ledger, Real-time Dispatch, and Vendor Trust Verification are active.
        </p>
        <div className="flex gap-4">
          <a href="/admin/vendors" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">
            Review Pending Vendors
          </a>
          <a href="/admin/finance" className="px-6 py-2 bg-[#1e293b] hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all border border-slate-600">
            View Ledger
          </a>
        </div>
      </div>
    </div>
  );
}
