import React, { useState } from 'react';
import type { Company } from '../types';
import { formatCompactKES, getOmniScoreBadge } from '../utils/formatters';

interface MarketsViewProps {
  companies: Company[];
  onSelectCompany: (ticker: string) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({
  companies,
  onSelectCompany
}) => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [sortBy, setSortBy] = useState<keyof Company>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sectors = ['All', ...Array.from(new Set(companies.map(c => c.sector)))];

  const filtered = companies.filter(c => {
    const matchesSearch = c.ticker.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortBy] ?? 0;
    const valB = b[sortBy] ?? 0;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    return 0;
  });

  const handleSort = (field: keyof Company) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 pb-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Nairobi Securities Exchange — Market Equities
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight heading-serif">NSE Stock Directory</h1>
          <p className="text-sm text-slate-400 mt-1">
            Comprehensive list of listed equities with live valuations, OmniScore rankings, and ratios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold">
            Market Open
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#1a2236] text-slate-300 text-xs font-bold">
            {companies.length} Active Listings
          </span>
        </div>
      </div>

      <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search ticker or company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b0f17] border border-[#1a2236] focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSector === sec
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#0b0f17] text-slate-400 hover:text-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0f17] text-slate-500 uppercase text-[10px] font-bold border-b border-[#1a2236]">
              <tr>
                <th className="py-3 px-4 cursor-pointer hover:text-slate-200" onClick={() => handleSort('name')}>Company / Ticker ↕</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('currentPrice')}>Price (KSh) ↕</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('dayChangePercent')}>24h Change ↕</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('marketCap')}>Market Cap ↕</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('peRatio')}>P/E Ratio ↕</th>
                <th className="py-3 px-4 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('dividendYield')}>Div Yield ↕</th>
                <th className="py-3 px-4 text-center cursor-pointer hover:text-slate-200" onClick={() => handleSort('omniScore')}>OmniScore™ ↕</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2236]">
              {sorted.map(c => {
                const badge = getOmniScoreBadge(c.omniScore);
                return (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCompany(c.ticker)}
                    className="hover:bg-[#1a2236] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1a2236] flex items-center justify-center font-black text-[10px] text-slate-400">
                          {c.ticker.slice(0, 4)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100 text-sm">{c.name}</p>
                          <p className="text-[11px] text-slate-500">{c.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white number-font text-sm">
                      KSh {c.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-bold ${c.dayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {c.dayChange >= 0 ? '+' : ''}{c.dayChangePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-200 number-font">
                      {formatCompactKES(c.marketCap)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 number-font font-medium">
                      {c.peRatio > 0 ? `${c.peRatio.toFixed(1)}x` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-amber-400 number-font">
                      {c.dividendYield.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {c.omniScore} / 100 • {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
