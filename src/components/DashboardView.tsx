import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type {
  Holding,
  Transaction,
  MarketIndex,
  Company,
  TimeRange,
  NavigationTab,
  AlertItem
} from '../types';
import { formatKES, formatPercent, formatCompactKES } from '../utils/formatters';

interface DashboardViewProps {
  holdings: Holding[];
  transactions: Transaction[];
  indices: MarketIndex[];
  companies: Company[];
  alerts: AlertItem[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectCompany: (ticker: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  holdings,
  transactions,
  indices,
  companies,
  onNavigate,
  onSelectCompany
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers' | 'active' | 'dividends'>('gainers');

  // Portfolio Totals
  const portfolioHoldingsValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const investedCapital = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalDeposited = transactions.filter(t => t.type === 'DEPOSIT').reduce((s, t) => s + t.totalAmount, 0);
  const totalWithdrawn = transactions.filter(t => t.type === 'WITHDRAWAL').reduce((s, t) => s + t.totalAmount, 0);
  const netContributions = totalDeposited - totalWithdrawn;
  const cashBalance = Math.max(netContributions - investedCapital, 5303);
  const totalPortfolioValue = portfolioHoldingsValue + cashBalance;
  const todayChange = holdings.reduce((sum, h) => sum + h.todayChange, 0);
  const todayChangePercent = portfolioHoldingsValue > 0 ? (todayChange / portfolioHoldingsValue) * 100 : 0;
  const totalProfitLoss = portfolioHoldingsValue - investedCapital;
  const totalReturnPercent = investedCapital > 0 ? (totalProfitLoss / investedCapital) * 100 : 0;
  const annualDividendIncome = holdings.reduce((sum, h) => sum + h.annualDividendIncome, 0);

  // Sector Allocation
  const sectorMap: Record<string, number> = {};
  holdings.forEach(h => { sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.marketValue; });
  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
  const sectorData = Object.keys(sectorMap).map((sec, idx) => ({
    name: sec,
    value: sectorMap[sec],
    percentage: ((sectorMap[sec] / (portfolioHoldingsValue || 1)) * 100).toFixed(1),
    color: COLORS[idx % COLORS.length]
  }));

  // Market Movers
  const gainers = [...companies].sort((a, b) => b.dayChangePercent - a.dayChangePercent).slice(0, 5);
  const losers = [...companies].sort((a, b) => a.dayChangePercent - b.dayChangePercent).slice(0, 5);
  const active = [...companies].sort((a, b) => b.volume - a.volume).slice(0, 5);
  const dividendStocks = [...companies].sort((a, b) => b.dividendYield - a.dividendYield).slice(0, 5);
  const activeMovers = moverTab === 'gainers' ? gainers : moverTab === 'losers' ? losers : moverTab === 'active' ? active : dividendStocks;

  // Chart Data
  const generateChartPoints = (range: TimeRange) => {
    const count = range === '1D' ? 12 : range === '1W' ? 7 : range === '1M' ? 30 : 60;
    let val = totalPortfolioValue * 0.9;
    const now = new Date();
    const points = [];
    for (let i = count; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' });
      val = val * (1 + (Math.random() - 0.47) * 0.015);
      if (i === 0) val = totalPortfolioValue;
      points.push({ date: dateStr, value: Math.round(val) });
    }
    return points;
  };

  const chartData = generateChartPoints(timeRange);

  const TIME_RANGES: TimeRange[] = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'MAX'];

  return (
    <div className="space-y-6 pb-8">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Nairobi Securities Exchange — Market Open
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight heading-serif">
            Portfolio Command Centre
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time intelligence, NSE equity benchmarks &amp; personal asset allocation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('portfolio')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            Manage Portfolio
          </button>
          <button
            onClick={() => onNavigate('screener')}
            className="px-4 py-2.5 rounded-xl bg-[#1a2236] hover:bg-[#212d44] text-slate-200 font-semibold text-sm transition-colors"
          >
            Stock Screener
          </button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="card p-5 relative overflow-hidden col-span-2 sm:col-span-1">
          <p className="text-xs font-medium text-slate-400 mb-1">Total Portfolio Value</p>
          <h2 className="text-2xl font-black text-white number-font tracking-tight mb-2">
            {formatKES(totalPortfolioValue)}
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
              todayChange >= 0
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
            }`}>
              {todayChange >= 0 ? '+' : ''}{formatKES(todayChange, true)} ({formatPercent(todayChangePercent)})
            </span>
            <span className="text-slate-500">Today</span>
          </div>
        </div>

        <div className="card p-5">
          <p className="text-xs font-medium text-slate-400 mb-1">Capital &amp; Cash Balance</p>
          <p className="text-xl font-bold text-slate-100 number-font mb-2">{formatKES(investedCapital)}</p>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1a2236]">
            <span className="text-slate-500">Cash:</span>
            <span className="font-bold text-emerald-400 number-font">{formatKES(cashBalance)}</span>
          </div>
        </div>

        <div className="card p-5">
          <p className="text-xs font-medium text-slate-400 mb-1">Total Return / Profit</p>
          <h2 className={`text-2xl font-black number-font tracking-tight mb-2 ${
            totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {totalProfitLoss >= 0 ? '+' : ''}{formatKES(totalProfitLoss)}
          </h2>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            totalReturnPercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {formatPercent(totalReturnPercent)} Total Return
          </span>
        </div>

        <div className="card card-gold p-5">
          <p className="text-xs font-medium text-amber-300 mb-1">Annual Dividend Income</p>
          <h2 className="text-2xl font-black text-amber-400 number-font tracking-tight mb-2">
            {formatKES(annualDividendIncome)}
          </h2>
          <p className="text-xs text-slate-400">
            Yield on Cost:{' '}
            <span className="font-bold text-amber-300">
              {((annualDividendIncome / (investedCapital || 1)) * 100).toFixed(2)}%
            </span>
          </p>
        </div>

      </div>

      {/* Portfolio Chart + Sector Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Performance Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-slate-100 heading-serif">Portfolio Performance Trajectory</h3>
              <p className="text-xs text-slate-400 mt-0.5">Historical valuation across selected timeframes</p>
            </div>
            <div className="flex items-center gap-1 bg-[#0b0f17] p-1 rounded-xl">
              {TIME_RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    timeRange === r ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 240, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="#374151"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#374151"
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  domain={['dataMin - 500', 'dataMax + 500']}
                  width={40}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#f9fafb', fontSize: '12px' }}
                  formatter={(val: unknown) => [formatKES(Number(val)), 'Portfolio Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#portfolioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-100 heading-serif">Sector Allocation</h3>
            <span className="text-xs text-slate-400">{holdings.length} holdings</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">Distribution by equity market sector</p>

          <div style={{ height: 180, width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  formatter={(val: unknown) => [formatKES(Number(val)), 'Market Value']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] text-slate-400">Total</span>
              <span className="text-sm font-black text-white number-font">{formatCompactKES(portfolioHoldingsValue)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#1a2236]">
            {sectorData.map((sec) => (
              <div key={sec.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sec.color }} />
                  <span className="text-slate-300">{sec.name}</span>
                </div>
                <span className="font-bold text-slate-200 number-font">{sec.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* NSE Indices */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Nairobi Securities Exchange Indices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {indices.map((idx) => (
            <div key={idx.code} className="card p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">{idx.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-white number-font">{idx.value.toFixed(2)}</span>
                  <span className={`text-xs font-bold ${idx.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({formatPercent(idx.changePercent)})
                  </span>
                </div>
              </div>
              <div style={{ width: 64, height: 32 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={idx.chartData}>
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={idx.change >= 0 ? '#10B981' : '#EF4444'}
                      fill="none"
                      strokeWidth={1.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Movers + OmniAI teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Market Movers Table */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h3 className="font-bold text-slate-100 heading-serif">Market Movers (NSE)</h3>
            <div className="flex items-center gap-1 bg-[#0b0f17] p-1 rounded-xl text-xs">
              {[
                { key: 'gainers', label: 'Gainers', activeClass: 'bg-emerald-500/15 text-emerald-400' },
                { key: 'losers', label: 'Losers', activeClass: 'bg-rose-500/15 text-rose-400' },
                { key: 'active', label: 'Most Active', activeClass: 'bg-indigo-500/15 text-indigo-400' },
                { key: 'dividends', label: 'Top Yields', activeClass: 'bg-amber-500/15 text-amber-400' },
              ].map(({ key, label, activeClass }) => (
                <button
                  key={key}
                  onClick={() => setMoverTab(key as typeof moverTab)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    moverTab === key ? activeClass : 'text-slate-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-[#1a2236]">
                  <th className="py-2.5 font-medium">Company</th>
                  <th className="py-2.5 font-medium text-right">Price (KSh)</th>
                  <th className="py-2.5 font-medium text-right">Change</th>
                  <th className="py-2.5 font-medium text-right">Volume / Yield</th>
                  <th className="py-2.5 font-medium text-center">OmniScore</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2236]">
                {activeMovers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCompany(c.ticker)}
                    className="hover:bg-[#1a2236] cursor-pointer transition-colors"
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1a2236] flex items-center justify-center font-black text-[10px] text-slate-300 flex-shrink-0">
                          {c.ticker.slice(0, 4)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{c.name}</p>
                          <p className="text-[11px] text-slate-500">{c.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-bold text-slate-100 number-font">
                      {c.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`font-bold ${c.dayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {c.dayChange >= 0 ? '+' : ''}{c.dayChangePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-400 number-font">
                      {moverTab === 'dividends' ? `${c.dividendYield.toFixed(2)}%` : `${(c.volume / 1000).toFixed(0)}k`}
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                        {c.omniScore}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OmniAI Teaser */}
        <div className="card card-indigo p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-100 heading-serif mb-3">OmniAI Portfolio Insight</h3>
            <p className="text-xs text-slate-400 leading-relaxed p-4 rounded-xl bg-[#0b0f17]/60 mb-4">
              "Your portfolio shows high cash productivity driven by Co-op Bank's 11.1% dividend yield.
              Banking accounts for 69% of equity holdings — consider rebalancing future deposits into
              Energy or Telecommunications sectors."
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            Open OmniAI Assistant
          </button>
        </div>

      </div>

    </div>
  );
};
