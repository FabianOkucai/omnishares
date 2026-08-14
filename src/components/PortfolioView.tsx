import React, { useState } from 'react';
import { 
  PlusCircle, 
  Receipt, 
  X, 
  ShieldAlert
} from 'lucide-react';
import type { Holding, Transaction, Company, TransactionType } from '../types';
import { formatKES, formatPercent } from '../utils/formatters';

interface PortfolioViewProps {
  holdings: Holding[];
  transactions: Transaction[];
  companies: Company[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  onSelectCompany: (ticker: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  holdings,
  transactions,
  companies,
  onAddTransaction,
  onSelectCompany
}) => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions' | 'dividends' | 'cash'>('holdings');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [txType, setTxType] = useState<TransactionType>('BUY');
  const [selectedTicker, setSelectedTicker] = useState<string>('COOP');
  const [sharesInput, setSharesInput] = useState<number>(100);
  const [priceInput, setPriceInput] = useState<number>(13.50);
  const [feesInput, setFeesInput] = useState<number>(20);
  const [depositAmountInput, setDepositAmountInput] = useState<number>(10000);
  const [notesInput, setNotesInput] = useState<string>('');
  const [brokerInput, setBrokerInput] = useState<string>('Dyer & Blair');

  // Portfolio Summary Calculations
  const portfolioHoldingsValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const investedCapital = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  
  const totalDeposited = transactions.filter(t => t.type === 'DEPOSIT').reduce((s, t) => s + t.totalAmount, 0);
  const totalWithdrawn = transactions.filter(t => t.type === 'WITHDRAWAL').reduce((s, t) => s + t.totalAmount, 0);
  const netContributions = totalDeposited - totalWithdrawn;
  const cashBalance = Math.max(netContributions - investedCapital, 5303);
  
  const totalPortfolioValue = portfolioHoldingsValue + cashBalance;
  const totalProfitLoss = portfolioHoldingsValue - investedCapital;
  const totalReturnPercent = investedCapital > 0 ? (totalProfitLoss / investedCapital) * 100 : 0;
  const annualDividendIncome = holdings.reduce((sum, h) => sum + h.annualDividendIncome, 0);

  // Sector Concentration Checks
  const sectorMap: Record<string, number> = {};
  holdings.forEach(h => {
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.marketValue;
  });

  const highConcentrationSector = Object.keys(sectorMap).find(
    sec => (sectorMap[sec] / (portfolioHoldingsValue || 1)) > 0.40
  );
  const concentrationPercent = highConcentrationSector 
    ? ((sectorMap[highConcentrationSector] / (portfolioHoldingsValue || 1)) * 100).toFixed(1)
    : 0;

  // Submit Transaction Handler
  const handleSubmitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const company = companies.find(c => c.ticker === selectedTicker);
    const dateStr = new Date().toISOString().split('T')[0];

    if (txType === 'BUY') {
      const gross = sharesInput * priceInput;
      const totalCost = gross + feesInput;
      onAddTransaction({
        date: dateStr,
        type: 'BUY',
        ticker: selectedTicker,
        companyName: company?.name || selectedTicker,
        shares: sharesInput,
        pricePerShare: priceInput,
        fees: feesInput,
        totalAmount: -totalCost,
        notes: notesInput || 'Equity Purchase',
        broker: brokerInput
      });
    } else if (txType === 'SELL') {
      const gross = sharesInput * priceInput;
      const netProceeds = gross - feesInput;
      onAddTransaction({
        date: dateStr,
        type: 'SELL',
        ticker: selectedTicker,
        companyName: company?.name || selectedTicker,
        shares: sharesInput,
        pricePerShare: priceInput,
        fees: feesInput,
        totalAmount: netProceeds,
        notes: notesInput || 'Equity Sale',
        broker: brokerInput
      });
    } else if (txType === 'DEPOSIT') {
      onAddTransaction({
        date: dateStr,
        type: 'DEPOSIT',
        fees: 0,
        totalAmount: depositAmountInput,
        notes: notesInput || 'Cash Deposit via M-Pesa'
      });
    } else if (txType === 'DIVIDEND') {
      const gross = sharesInput * priceInput;
      const netDiv = gross - feesInput;
      onAddTransaction({
        date: dateStr,
        type: 'DIVIDEND',
        ticker: selectedTicker,
        companyName: company?.name || selectedTicker,
        shares: sharesInput,
        pricePerShare: priceInput,
        fees: feesInput,
        totalAmount: netDiv,
        notes: notesInput || 'Dividend Payout'
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Personal Portfolio Management
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
              My Investments Workspace
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Track holdings, record BUY/SELL transactions, calculate dividend yields, and monitor cash balances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* High Sector Concentration Warning Banner */}
      {highConcentrationSector && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 text-xs text-amber-200">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Sector Concentration Warning: </span>
              Your portfolio has <span className="font-bold">{concentrationPercent}%</span> exposure in the <span className="font-bold uppercase text-white">{highConcentrationSector}</span> sector. Consider diversifying new contributions.
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <p className="text-xs font-medium text-slate-400 mb-1">Portfolio Total Value</p>
          <h2 className="text-2xl font-black text-white number-font tracking-tight mb-2">
            {formatKES(totalPortfolioValue)}
          </h2>
          <p className="text-xs text-slate-400">
            Cash Balance: <span className="font-bold text-emerald-400">{formatKES(cashBalance)}</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <p className="text-xs font-medium text-slate-400 mb-1">Invested Capital</p>
          <h2 className="text-2xl font-black text-slate-100 number-font tracking-tight mb-2">
            {formatKES(investedCapital)}
          </h2>
          <p className="text-xs text-slate-400">
            Holdings Count: <span className="font-bold text-white">{holdings.length} Companies</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#1f2937]">
          <p className="text-xs font-medium text-slate-400 mb-1">Total Profit / Loss</p>
          <h2 className={`text-2xl font-black number-font tracking-tight mb-2 ${
            totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {totalProfitLoss >= 0 ? '+' : ''}{formatKES(totalProfitLoss)}
          </h2>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            totalReturnPercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {formatPercent(totalReturnPercent)} Return
          </span>
        </div>

        <div className="glass-panel-gold p-5 rounded-2xl border border-amber-500/20">
          <p className="text-xs font-medium text-amber-300 mb-1">Annual Dividend Income</p>
          <h2 className="text-2xl font-black text-amber-400 number-font tracking-tight mb-2">
            {formatKES(annualDividendIncome)}
          </h2>
          <p className="text-xs text-slate-400">
            Yield on Cost: <span className="font-bold text-amber-300">{((annualDividendIncome / (investedCapital || 1)) * 100).toFixed(2)}%</span>
          </p>
        </div>

      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2937] pb-2">
        <button
          onClick={() => setActiveTab('holdings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'holdings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          Current Equity Holdings ({holdings.length})
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'transactions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200 bg-[#111827]'
          }`}
        >
          <Receipt className="w-4 h-4" /> Transaction Ledger ({transactions.length})
        </button>
      </div>

      {/* Tab 1: Holdings Table */}
      {activeTab === 'holdings' && (
        <div className="glass-panel rounded-2xl border border-[#1f2937] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 uppercase text-[10px] font-bold border-b border-[#1f2937]">
                <tr>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4 text-right">Shares</th>
                  <th className="py-3.5 px-4 text-right">Avg Buy Price</th>
                  <th className="py-3.5 px-4 text-right">Current Price</th>
                  <th className="py-3.5 px-4 text-right">Invested</th>
                  <th className="py-3.5 px-4 text-right">Market Value</th>
                  <th className="py-3.5 px-4 text-right">Unrealized P/L</th>
                  <th className="py-3.5 px-4 text-right">Annual Div</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                {holdings.map(h => (
                  <tr 
                    key={h.id}
                    onClick={() => onSelectCompany(h.ticker)}
                    className="hover:bg-[#1f293d] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                          {h.ticker}
                        </div>
                        <div>
                          <p className="font-bold text-slate-100">{h.companyName}</p>
                          <p className="text-[11px] text-slate-400">{h.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white number-font">
                      {h.shares.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 number-font">
                      KSh {h.averageBuyPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white number-font">
                      KSh {h.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 number-font">
                      {formatKES(h.investedAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white number-font">
                      {formatKES(h.marketValue)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-bold ${h.unrealizedPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {h.unrealizedPnL >= 0 ? '+' : ''}{formatKES(h.unrealizedPnL)} ({formatPercent(h.unrealizedPnLPercent)})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-amber-400 number-font">
                      KSh {h.annualDividendIncome.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Transaction Ledger */}
      {activeTab === 'transactions' && (
        <div className="glass-panel rounded-2xl border border-[#1f2937] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0f17] text-slate-400 uppercase text-[10px] font-bold border-b border-[#1f2937]">
                <tr>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Company / Description</th>
                  <th className="py-3.5 px-4 text-right">Shares</th>
                  <th className="py-3.5 px-4 text-right">Price / Share</th>
                  <th className="py-3.5 px-4 text-right">Fees</th>
                  <th className="py-3.5 px-4 text-right">Total Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937]">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-[#1f293d] transition-colors">
                    <td className="py-3.5 px-4 text-slate-300 font-medium">{t.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                        t.type === 'BUY' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        t.type === 'SELL' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        t.type === 'DIVIDEND' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200 font-semibold">
                      {t.companyName || t.notes}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 number-font">
                      {t.shares ? t.shares.toLocaleString() : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300 number-font">
                      {t.pricePerShare ? `KSh ${t.pricePerShare.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 number-font">
                      KSh {t.fees.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold number-font">
                      <span className={t.totalAmount >= 0 ? 'text-emerald-400' : 'text-slate-200'}>
                        {t.totalAmount >= 0 ? '+' : ''}{formatKES(t.totalAmount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1f2937] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2937]">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-400" /> Record New Portfolio Transaction
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitTransaction} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Transaction Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['BUY', 'SELL', 'DIVIDEND', 'DEPOSIT'] as TransactionType[]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTxType(t)}
                      className={`py-2 rounded-xl font-bold transition-all ${
                        txType === t ? 'bg-indigo-600 text-white' : 'bg-[#0b0f17] text-slate-400 border border-[#1f2937]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {txType !== 'DEPOSIT' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Select NSE Stock</label>
                    <select
                      value={selectedTicker}
                      onChange={(e) => {
                        setSelectedTicker(e.target.value);
                        const c = companies.find(comp => comp.ticker === e.target.value);
                        if (c) setPriceInput(c.currentPrice);
                      }}
                      className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                    >
                      {companies.map(c => (
                        <option key={c.ticker} value={c.ticker}>{c.ticker} - {c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Number of Shares</label>
                      <input
                        type="number"
                        min="1"
                        value={sharesInput}
                        onChange={(e) => setSharesInput(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Price / Share (KSh)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={priceInput}
                        onChange={(e) => setPriceInput(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {txType === 'DEPOSIT' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deposit Amount (KSh)</label>
                  <input
                    type="number"
                    value={depositAmountInput}
                    onChange={(e) => setDepositAmountInput(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Broker / Method</label>
                  <input
                    type="text"
                    value={brokerInput}
                    onChange={(e) => setBrokerInput(e.target.value)}
                    className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fees (KSh)</label>
                  <input
                    type="number"
                    value={feesInput}
                    onChange={(e) => setFeesInput(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Transaction Notes</label>
                <input
                  type="text"
                  placeholder="Optional notes..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-100 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  Confirm & Save Transaction
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
