import React, { useState } from 'react';
import { Star, Bell, ArrowRight } from 'lucide-react';
import type { AlertItem, Company } from '../types';

interface WatchlistAlertsViewProps {
  alerts: AlertItem[];
  companies: Company[];
  onSelectCompany: (ticker: string) => void;
}

export const WatchlistAlertsView: React.FC<WatchlistAlertsViewProps> = ({
  alerts,
  companies,
  onSelectCompany
}) => {
  const [watchlistTickers, setWatchlistTickers] = useState<string[]>(['SCOM', 'COOP', 'KCB', 'EABL']);
  const [activeTab, setActiveTab] = useState<'watchlist' | 'alerts'>('watchlist');

  const watchlistCompanies = companies.filter(c => watchlistTickers.includes(c.ticker));

  const toggleWatchlist = (ticker: string) => {
    if (watchlistTickers.includes(ticker)) {
      setWatchlistTickers(watchlistTickers.filter(t => t !== ticker));
    } else {
      setWatchlistTickers([...watchlistTickers, ticker]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Real-Time Tracking & Intelligence
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Watchlist & Alert Centre
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor key stocks, set custom price targets, dividend alerts, and portfolio threshold notifications.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'watchlist' ? 'bg-indigo-600 text-white shadow' : 'bg-[#1f293d] text-slate-300 border border-[#374151]'
              }`}
            >
              Watchlist ({watchlistTickers.length})
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'alerts' ? 'bg-indigo-600 text-white shadow' : 'bg-[#1f293d] text-slate-300 border border-[#374151]'
              }`}
            >
              Alerts ({alerts.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'watchlist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlistCompanies.map(c => (
            <div 
              key={c.id} 
              className="glass-panel p-5 rounded-2xl border border-[#1f2937] hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                      {c.ticker}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{c.name}</h4>
                      <span className="text-xs text-slate-400">{c.sector}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleWatchlist(c.ticker)}
                    className="text-amber-400 hover:text-slate-400 p-1"
                    title="Remove from watchlist"
                  >
                    <Star className="w-5 h-5 fill-amber-400" />
                  </button>
                </div>

                <div className="flex items-baseline justify-between py-3 border-y border-[#1f2937] my-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Price</span>
                    <span className="font-bold text-white text-base number-font">KSh {c.currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">24h Change</span>
                    <span className={`font-bold text-xs ${c.dayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {c.dayChange >= 0 ? '+' : ''}{c.dayChangePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCompany(c.ticker)}
                className="w-full py-2 rounded-xl bg-[#1f293d] hover:bg-[#2d3a54] text-slate-200 text-xs font-semibold border border-[#374151] transition-all flex items-center justify-center gap-1"
              >
                View Stock Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937] space-y-3">
          <h3 className="font-bold text-slate-200 text-sm mb-2">Notification Center</h3>
          {alerts.map(a => (
            <div key={a.id} className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-xs">{a.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{a.message}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{a.createdAt}</span>
                </div>
              </div>
              {a.ticker && (
                <button
                  onClick={() => onSelectCompany(a.ticker!)}
                  className="px-3 py-1 rounded-lg bg-[#1f293d] text-slate-200 text-xs font-semibold shrink-0"
                >
                  View {a.ticker}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
