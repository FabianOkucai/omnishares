import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  DollarSign, 
  BarChart2, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { Company, TimeRange, NavigationTab } from '../types';
import { MOCK_COMPANY_FINANCIALS, MOCK_OMNISCORES, generatePricePoints } from '../data/mockData';
import { formatCompactKES, formatPercent, getOmniScoreBadge } from '../utils/formatters';

interface CompanyDetailViewProps {
  ticker: string;
  companies: Company[];
  onBack: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const CompanyDetailView: React.FC<CompanyDetailViewProps> = ({
  ticker,
  companies,
  onBack,
  onNavigate
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');
  const [activeTab, setActiveTab] = useState<'chart' | 'fundamentals' | 'dividends' | 'omniscore' | 'risk'>('omniscore');

  const company = companies.find(c => c.ticker === ticker) || companies[0];
  const financials = MOCK_COMPANY_FINANCIALS[company.ticker] || MOCK_COMPANY_FINANCIALS['COOP'];
  const omniScoreData = MOCK_OMNISCORES[company.ticker] || MOCK_OMNISCORES['COOP'];
  const badge = getOmniScoreBadge(company.omniScore);

  const priceData = generatePricePoints(company.currentPrice, 60, 0.02);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111827] hover:bg-[#1f293d] text-slate-300 font-semibold text-xs border border-[#1f2937] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </button>
        <button
          onClick={() => onNavigate('ai-assistant')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-indigo-300 font-semibold text-xs border border-indigo-500/30 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" /> Analyze {company.ticker} with OmniAI
        </button>
      </div>

      {/* Main Stock Header Card */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-black text-xl text-indigo-400">
              {company.ticker}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{company.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1f293d] text-slate-300 font-semibold border border-[#374151]">
                  {company.sector}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl line-clamp-2">
                {company.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#1f2937] pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Current Market Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-white number-font">
                  KSh {company.currentPrice.toFixed(2)}
                </span>
                <span className={`text-xs font-bold ${company.dayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {company.dayChange >= 0 ? '+' : ''}{company.dayChange.toFixed(2)} ({formatPercent(company.dayChangePercent)})
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs text-slate-400 block font-medium mb-1">OmniScore™</span>
              <span className={`px-3 py-1.5 rounded-xl text-sm font-extrabold border ${badge.bg} ${badge.text} ${badge.border}`}>
                {company.omniScore} / 100 • {badge.label}
              </span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-4 border-t border-[#1f2937] text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Market Cap</span>
            <span className="font-bold text-white number-font">{formatCompactKES(company.marketCap)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">P/E Ratio</span>
            <span className="font-bold text-emerald-400 number-font">{company.peRatio > 0 ? `${company.peRatio.toFixed(1)}x` : 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">EPS</span>
            <span className="font-bold text-slate-200 number-font">KSh {company.eps.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Dividend Yield</span>
            <span className="font-bold text-amber-400 number-font">{company.dividendYield.toFixed(2)}%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">52W High</span>
            <span className="font-bold text-slate-200 number-font">KSh {company.fiftyTwoWeekHigh.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">52W Low</span>
            <span className="font-bold text-slate-200 number-font">KSh {company.fiftyTwoWeekLow.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#1f2937] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('omniscore')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'omniscore' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          <Award className="w-4 h-4" /> OmniScore™ Breakdown
        </button>
        <button
          onClick={() => setActiveTab('chart')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'chart' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Stock Price Chart
        </button>
        <button
          onClick={() => setActiveTab('fundamentals')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'fundamentals' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          <FileText className="w-4 h-4" /> Financial Fundamentals
        </button>
        <button
          onClick={() => setActiveTab('dividends')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'dividends' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          <DollarSign className="w-4 h-4 text-amber-400" /> Dividend History
        </button>
      </div>

      {activeTab === 'omniscore' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1f2937]">
              <div>
                <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> OmniScore™ Proprietary Rating Engine
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Standardized 0–100 score combining Value (20%), Growth (20%), Financial Health (20%), Dividend (15%), Risk (10%), Momentum (10%), and Management (5%).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-emerald-400 number-font">{omniScoreData.overallScore}/100</span>
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {omniScoreData.rating}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937] text-xs text-slate-300 leading-relaxed mb-6">
              <span className="font-bold text-amber-400 block mb-1">OmniScore Executive Synthesis:</span>
              {omniScoreData.summaryReasoning}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">1. Value Factor (20%)</span>
                  <span className="font-black text-emerald-400 text-sm">{omniScoreData.pillars.value.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.value.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">2. Growth Factor (20%)</span>
                  <span className="font-black text-indigo-400 text-sm">{omniScoreData.pillars.growth.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.growth.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">3. Financial Health (20%)</span>
                  <span className="font-black text-teal-400 text-sm">{omniScoreData.pillars.financialHealth.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.financialHealth.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">4. Dividend Safety (15%)</span>
                  <span className="font-black text-amber-400 text-sm">{omniScoreData.pillars.dividend.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.dividend.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">5. Risk Rating (10%)</span>
                  <span className="font-black text-rose-400 text-sm">{omniScoreData.pillars.risk.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.risk.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-200 text-xs">6. Momentum & Exec (15%)</span>
                  <span className="font-black text-blue-400 text-sm">{omniScoreData.pillars.momentum.score}/100</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{omniScoreData.pillars.momentum.details}</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="glass-panel p-6 rounded-2xl border border-[#1f2937] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm">Interactive Price Action (KSh)</h3>
            <div className="flex gap-1 bg-[#0b0f17] p-1 rounded-xl border border-[#1f2937]">
              {(['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'MAX'] as TimeRange[]).map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${timeRange === r ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} domain={['auto', 'auto']} tickFormatter={(v) => `KSh ${v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="price" stroke="#10B981" strokeWidth={2} fill="url(#stockGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'fundamentals' && (
        <div className="glass-panel p-6 rounded-2xl border border-[#1f2937] space-y-6">
          <h3 className="font-bold text-slate-100 text-sm">5-Year Financial Statement Performance</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 border-b border-[#1f2937]">
                <tr>
                  <th className="py-3 px-4 font-bold">Metric / Fiscal Year</th>
                  {financials.historicalYears.map(h => (
                    <th key={h.year} className="py-3 px-4 text-right font-bold text-slate-200">{h.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-300">Revenue (KSh)</td>
                  {financials.historicalYears.map(h => (
                    <td key={h.year} className="py-3 px-4 text-right font-bold text-slate-100 number-font">
                      {formatCompactKES(h.revenue)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-300">Net Profit (KSh)</td>
                  {financials.historicalYears.map(h => (
                    <td key={h.year} className="py-3 px-4 text-right font-bold text-emerald-400 number-font">
                      {formatCompactKES(h.netProfit)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-300">Earnings Per Share (EPS)</td>
                  {financials.historicalYears.map(h => (
                    <td key={h.year} className="py-3 px-4 text-right text-slate-200 number-font">
                      KSh {h.eps.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-300">Return on Equity (ROE)</td>
                  {financials.historicalYears.map(h => (
                    <td key={h.year} className="py-3 px-4 text-right font-bold text-teal-300 number-font">
                      {h.roe.toFixed(1)}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-300">Dividend Per Share</td>
                  {financials.historicalYears.map(h => (
                    <td key={h.year} className="py-3 px-4 text-right font-bold text-amber-400 number-font">
                      KSh {h.dividendPerShare.toFixed(2)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'dividends' && (
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" /> Dividend Policy & Historical Payouts
            </h3>
            <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Current Yield: {company.dividendYield.toFixed(2)}%
            </span>
          </div>

          <p className="text-xs text-slate-400">
            {company.name} pays reliable dividends bi-annually with a 5% withholding tax rate under Kenyan tax law.
          </p>
        </div>
      )}

    </div>
  );
};
