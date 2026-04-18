'use client';
import React, { useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface Transaction {
  id: string;
  vendor: string;
  amount: number;
  type: 'Payout Request' | 'System Credit';
  status: 'Pending' | 'Completed';
  date: string;
}

const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `TRX-${1000 + i}`,
  vendor: `Vendor Professional ${i + 1}`,
  amount: Math.floor(Math.random() * 500) + 150,
  type: i % 3 === 0 ? 'Payout Request' : 'System Credit',
  status: i % 4 === 0 ? 'Pending' : 'Completed',
  date: new Date(Date.now() - i * 86400000).toLocaleDateString()
}));

export default function FinancialLedgerPage() {
  const [filter, setFilter] = useState<'All' | 'Pending'>('All');
  const filtered = MOCK_TRANSACTIONS.filter(t => filter === 'All' || t.status === filter);
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">💰</span> Admin Wallet & Ledger
        </h1>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-semibold transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]">
          Download VAT Report (PDF)
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="glass-card bg-[#070b19] border border-blue-500/10 p-6 rounded-xl flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-400 mb-2">Gross Platform Revenue</h3>
          <p className="text-4xl font-bold text-white tracking-tight"><span className="text-blue-500 text-2xl">AED</span> 458,250</p>
        </div>
        <div className="glass-card bg-[#070b19] border border-emerald-500/10 p-6 rounded-xl flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px]" />
          <h3 className="text-sm font-bold text-slate-400 mb-2">Net 20% Commission</h3>
          <p className="text-4xl font-bold text-emerald-400 tracking-tight"><span className="text-emerald-500/50 text-2xl">AED</span> 91,650</p>
        </div>
        <div className="glass-card bg-[#070b19] border border-amber-500/10 p-6 rounded-xl flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-400 mb-2">Pending Vendor Payouts</h3>
          <p className="text-4xl font-bold text-amber-400 tracking-tight"><span className="text-amber-500/50 text-2xl">AED</span> 12,450</p>
        </div>
      </div>

      <div className="glass-card bg-[#070b19] border border-blue-500/10 rounded-xl max-h-[400px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-blue-500/10 flex justify-between items-center bg-[#0a0f1e]/50">
          <h3 className="font-bold text-white">Recent Transactions</h3>
          <div className="flex gap-2">
            <button onClick={() => setFilter('All')} className={`text-xs px-3 py-1 rounded ${filter==='All' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>All</button>
            <button onClick={() => setFilter('Pending')} className={`text-xs px-3 py-1 rounded ${filter==='Pending' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Pending Withdrawals</button>
          </div>
        </div>
        <div ref={parentRef} className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const trx = filtered[virtualRow.index];
              return (
                <div key={virtualRow.key} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${virtualRow.size}px`, transform: `translateY(${virtualRow.start}px)` }} className="border-b border-white/5 p-3 flex justify-between items-center hover:bg-white/5 rounded-lg transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-white">{trx.vendor}</h4>
                    <p className="text-xs text-slate-400 font-mono">{trx.id} • {trx.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold ${trx.type === 'Payout Request' ? 'text-amber-400' : 'text-emerald-400'}`}>AED {trx.amount}</span>
                    {trx.status === 'Pending' ? (
                      <button className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold shadow-sm rounded">Approve Payout</button>
                    ) : (
                      <span className="px-3 py-1 bg-slate-800 text-slate-500 text-xs font-bold rounded">Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
