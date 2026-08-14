import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const AdminView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            System Administration & Telemetry
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Admin Health Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor API latency, database connections, market data ingestion, and OmniScore calculation status.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Systems Operational
        </span>
      </div>

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <span className="text-xs text-slate-400 block mb-1">Active Platform Users</span>
          <h3 className="text-2xl font-black text-white number-font">1,482</h3>
          <span className="text-[11px] text-emerald-400 font-bold">+12% this month</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <span className="text-xs text-slate-400 block mb-1">Market Data Provider</span>
          <h3 className="text-sm font-bold text-slate-100">NSE Data Layer Engine</h3>
          <span className="text-[11px] text-slate-400">Delay: 15m (EOD Verified)</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <span className="text-xs text-slate-400 block mb-1">API Latency</span>
          <h3 className="text-2xl font-black text-emerald-400 number-font">24 ms</h3>
          <span className="text-[11px] text-slate-400">FastAPI Server</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <span className="text-xs text-slate-400 block mb-1">OmniScore™ Engine</span>
          <h3 className="text-sm font-bold text-amber-400">Active (v1.0)</h3>
          <span className="text-[11px] text-slate-400">7 Pillars Normalized</span>
        </div>
      </div>

      {/* System Status Table */}
      <div className="glass-panel p-6 rounded-2xl border border-[#1f2937] space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">Services & Integration Status</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-[#0b0f17] border border-[#1f2937] flex justify-between items-center">
            <span className="font-semibold text-slate-200">REST API Router (FastAPI)</span>
            <span className="text-emerald-400 font-bold">200 OK</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0b0f17] border border-[#1f2937] flex justify-between items-center">
            <span className="font-semibold text-slate-200">Database Layer (PostgreSQL / SQLite)</span>
            <span className="text-emerald-400 font-bold">Connected</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0b0f17] border border-[#1f2937] flex justify-between items-center">
            <span className="font-semibold text-slate-200">OmniAI Inference Engine</span>
            <span className="text-indigo-400 font-bold">Ready</span>
          </div>
        </div>
      </div>

    </div>
  );
};
