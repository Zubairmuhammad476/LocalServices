'use client';
import React, { useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface Booking {
  id: number;
  service: string;
  customer: string;
  status: 'Booked' | 'On Way' | 'Started' | 'Done' | 'Disputed' | 'Pending';
  time: string;
}

const MOCK_BOOKINGS: Booking[] = Array.from({ length: 5000 }).map((_, i) => ({
  id: 1000 + i,
  service: ['Deep Cleaning', 'AC Repair', 'Plumbing', 'Pest Control'][i % 4],
  customer: `User ${i + 1}`,
  status: ['Pending', 'Booked', 'On Way', 'Started', 'Done'][i % 5] as Booking['status'],
  time: new Date(Date.now() - i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}));

export default function BookingsCommandCenter() {
  const [filter, setFilter] = useState<'All' | Booking['status']>('All');
  
  const filteredBookings = MOCK_BOOKINGS.filter(b => filter === 'All' || b.status === filter);
  
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: filteredBookings.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">📅</span> Command Center: Live Bookings
        </h1>
        <div className="flex gap-2">
          {['All', 'Pending', 'On Way', 'Disputed'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]' : 'bg-[#1e293b] text-slate-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {['Pending', 'On Way', 'Started', 'Done'].map(stat => (
          <div key={stat} className="glass-card bg-[#070b19] border border-blue-500/10 p-4 rounded-xl text-center">
            <h3 className="text-sm font-bold text-slate-400 mb-1">{stat} Jobs</h3>
            <p className="text-3xl font-bold text-white">
              {MOCK_BOOKINGS.filter(b => b.status === stat).length}
            </p>
          </div>
        ))}
      </div>

      <div 
        ref={parentRef}
        className="h-[500px] w-full overflow-y-auto rounded-xl border border-blue-500/10 bg-[#070b19] shadow-2xl glass-card custom-scrollbar"
      >
        <div 
          style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const booking = filteredBookings[virtualRow.index];
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
                className="border-b border-blue-500/5 px-6 py-3 flex items-center justify-between hover:bg-blue-600/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono text-slate-500">#{booking.id}</div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{booking.service}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{booking.customer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-slate-400">{booking.time}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    booking.status === 'Done' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' :
                    booking.status === 'On Way' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                    booking.status === 'Started' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                    booking.status === 'Disputed' ? 'bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse' :
                    'bg-slate-500/20 text-slate-400 border border-slate-500/20'
                  }`}>
                    {booking.status}
                  </span>
                  
                  {booking.status === 'Disputed' && (
                    <button className="text-xs font-bold bg-red-600 text-white px-3 py-1 rounded shadow-[0_0_10px_rgba(220,38,38,0.4)]">
                      Freeze Payout
                    </button>
                  )}
                  {booking.status === 'Pending' && (
                    <button className="text-xs font-bold bg-[#1e293b] text-slate-300 hover:text-white px-3 py-1 rounded border border-slate-600">
                      Force Dispatch
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
