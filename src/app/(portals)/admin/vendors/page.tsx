'use client';
import React, { useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface Vendor {
  id: number;
  name: string;
  email: string;
  status: 'Pending' | 'Verified' | 'Blocked';
  documents: string[];
}

// Sample fallback data (would be fetched via TanStack Query)
const MOCK_VENDORS: Vendor[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: i,
  name: `Vendor Professional ${i + 1}`,
  email: `vendor${i + 1}@example.com`,
  status: i % 5 === 0 ? 'Pending' : 'Verified',
  documents: ['/docs/trade_license.pdf'],
}));

export default function VendorCrmPage() {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Verified' | 'Blocked'>('All');
  
  const filteredVendors = MOCK_VENDORS.filter(v => filter === 'All' || v.status === filter);
  
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: filteredVendors.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 76,
    overscan: 5,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">🛡️</span> Trust Portal: Vendor CRM
        </h1>
        <div className="flex gap-2">
          {['All', 'Pending', 'Verified', 'Blocked'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]' : 'bg-[#1e293b] text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div 
        ref={parentRef}
        className="h-[600px] w-full overflow-y-auto rounded-xl border border-blue-500/10 bg-[#070b19] shadow-2xl glass-card custom-scrollbar"
      >
        <div 
          style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const vendor = filteredVendors[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="border-b border-blue-500/5 px-6 py-4 flex items-center justify-between hover:bg-blue-600/5 transition-colors"
              >
                <div>
                  <h3 className="text-white font-semibold text-sm">{vendor.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{vendor.email}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  {vendor.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-all">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-xs font-semibold hover:bg-red-500 hover:text-white transition-all">
                        Reject
                      </button>
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    vendor.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400' :
                    vendor.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
