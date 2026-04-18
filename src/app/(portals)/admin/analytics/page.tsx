'use client';
import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-jakarta text-white flex items-center gap-2">
          <span className="text-blue-500">📊</span> Boom Automations: Network Intelligence
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Surge Pricing Live Monitor */}
        <div className="glass-card bg-[#070b19] border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)] rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[60px]" />
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Surge Engine Focus: Active
          </h2>
          <p className="text-sm text-slate-400 mb-6 font-mono">10% Multiplier triggers &lt; 15% Availability</p>

          <div className="space-y-4">
            <div className="border border-white/5 rounded-lg p-4 bg-white/[0.02]">
              <div className="flex justify-between text-sm font-bold text-white mb-2">
                <span>Dubai Marina</span>
                <span className="text-rose-400">12% Available (Surge Active)</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[12%] shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
              </div>
            </div>
            <div className="border border-white/5 rounded-lg p-4 bg-white/[0.02]">
              <div className="flex justify-between text-sm font-bold text-white mb-2">
                <span>Downtown Dubai</span>
                <span className="text-emerald-400">45% Available</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Neighbor Grouping */}
        <div className="glass-card bg-[#070b19] border border-blue-500/20 rounded-xl p-6 relative">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            🧠 AI Neighbor Grouping
          </h2>
          <p className="text-sm text-slate-400 mb-6 font-mono">Live clustering algorithms</p>
          
          <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-white">Marina Gate Tower 1</h3>
                <p className="text-xs text-blue-400 font-mono mt-1">3 Bookings • Same Day</p>
              </div>
              <button className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow shadow-blue-600/50 hover:bg-blue-500 transition-colors">
                Suggest 1 Assignment
              </button>
            </div>
            <p className="text-xs text-slate-400 border-t border-blue-500/10 pt-2 mt-2">
              Estimated efficiency gain: <strong className="text-emerald-400">45 minutes saved</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
