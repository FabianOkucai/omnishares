import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';
import type { Company } from '../types';
import { getOmniScoreBadge } from '../utils/formatters';

interface ScreenerViewProps {
  companies: Company[];
  onSelectCompany: (ticker: string) => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  companies,
  onSelectCompany
}) => {
  const [minDividendYield, setMinDividendYield] = useState<number>(5.0);
  const [maxPE, setMaxPE] = useState<number>(10.0);
  const [minOmniScore, setMinOmniScore] = useState<number>(75);
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const sectors = ['All', ...Array.from(new Set(companies.map(c => c.sector)))];

  const resetFilters = () => {
    setMinDividendYield(0);
    setMaxPE(30);
    setMinOmniScore(0);
    setSelectedSector('All');
  };

  const presetHighYieldValue = () => {
    setMinDividendYield(8.0);
    setMaxPE(5.0);
    setMinOmniScore(80);
    setSelectedSector('All');
  };

  const filtered = companies.filter(c => {
    const matchesDiv = c.dividendYield >= minDividendYield;
    const matchesPE = c.peRatio <= maxPE && c.peRatio > 0;
    const matchesScore = c.omniScore >= minOmniScore;
    const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
    return matchesDiv && matchesPE && matchesScore && matchesSector;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Screener Header */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Filter className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Multi-Pillar Stock Discovery Engine
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              NSE Stock Screener
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter companies by valuation ratios, dividend output, OmniScore™ thresholds, and market sectors.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={presetHighYieldValue}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/30 transition-all"
            >
              ⚡ High-Yield Value Preset
            </button>
            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-xl bg-[#1f293d] hover:bg-[#2d3a54] text-slate-300 font-semibold text-xs border border-[#374151] flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 glass-panel p-5 rounded-2xl border border-[#1f2937]">
        
        {/* Min Dividend Yield Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Min Dividend Yield</span>
            <span className="font-bold text-amber-400">{minDividendYield}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={minDividendYield}
            onChange={(e) => setMinDividendYield(parseFloat(e.target.value))}
            className="w-full accent-amber-500 bg-[#0b0f17] h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Filters companies paying &gt;= {minDividendYield}% p.a.</span>
        </div>

        {/* Max P/E Ratio Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Max P/E Ratio</span>
            <span className="font-bold text-emerald-400">{maxPE}x</span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="0.5"
            value={maxPE}
            onChange={(e) => setMaxPE(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 bg-[#0b0f17] h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Filters stocks trading under {maxPE}x earnings</span>
        </div>

        {/* Min OmniScore Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Min OmniScore™</span>
            <span className="font-bold text-indigo-400">{minOmniScore} / 100</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="1"
            value={minOmniScore}
            onChange={(e) => setMinOmniScore(parseInt(e.target.value))}
            className="w-full accent-indigo-500 bg-[#0b0f17] h-2 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Filters quality factor score &gt;= {minOmniScore}</span>
        </div>

        {/* Sector Select */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Market Sector</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full bg-[#0b0f17] border border-[#1f2937] text-xs text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {sectors.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          <span className="text-[10px] text-slate-500">Select target sector</span>
        </div>

      </div>

      {/* Match Counter Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-200 text-sm">
          Matching Companies ({filtered.length})
        </h3>
        <span className="text-xs text-slate-400">
          Showing ranked results sorted by OmniScore™
        </span>
      </div>

      {/* Matching Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => {
          const badge = getOmniScoreBadge(c.omniScore);
          return (
            <div 
              key={c.id} 
              onClick={() => onSelectCompany(c.ticker)}
              className="glass-panel p-5 rounded-2xl border border-[#1f2937] hover:border-indigo-500/50 cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-sm text-indigo-400">
                      {c.ticker}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{c.name}</h4>
                      <span className="text-xs text-slate-400">{c.sector}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                    {c.omniScore} / 100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1f2937] text-xs my-3">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Price</span>
                    <span className="font-bold text-white number-font">KSh {c.currentPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">P/E Ratio</span>
                    <span className="font-bold text-emerald-400 number-font">{c.peRatio.toFixed(1)}x</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Div Yield</span>
                    <span className="font-bold text-amber-400 number-font">{c.dividendYield.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-indigo-400 font-semibold group">
                <span>View Complete Stock Analysis</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full glass-panel p-12 rounded-2xl border border-[#1f2937] text-center space-y-3">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="font-bold text-slate-300">No stocks match your exact criteria</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your max P/E ratio, lowering minimum dividend yield, or resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
