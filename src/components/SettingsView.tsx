import React from 'react';
import { Download, User, Globe } from 'lucide-react';
import type { Transaction } from '../types';

interface SettingsViewProps {
  transactions: Transaction[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({ transactions }) => {

  const exportTransactionsCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Ticker', 'Company', 'Shares', 'PricePerShare', 'Fees', 'TotalAmount', 'Notes'];
    const rows = transactions.map(t => [
      t.id,
      t.date,
      t.type,
      t.ticker || '',
      t.companyName || '',
      t.shares || '',
      t.pricePerShare || '',
      t.fees,
      t.totalAmount,
      t.notes || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `omnishares_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-tight">Account & Platform Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage profile, currency defaults, export data, and notification preferences.</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-[#1f2937] space-y-6">
        
        <div className="space-y-3 pb-6 border-b border-[#1f2937]">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" /> Personal Investor Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Investor Name</label>
              <input type="text" value="Kenyan Retail Investor" readOnly className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-200 rounded-xl p-2.5" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">CDS Account Number</label>
              <input type="text" value="NSE-8849201" readOnly className="w-full bg-[#0b0f17] border border-[#1f2937] text-slate-200 rounded-xl p-2.5" />
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-6 border-b border-[#1f2937]">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" /> Currency & Market Standards
          </h3>
          <div className="p-4 rounded-xl bg-[#0b0f17] border border-[#1f2937] text-xs flex justify-between items-center">
            <div>
              <span className="font-bold text-white block">Primary Currency</span>
              <span className="text-slate-400">Kenyan Shilling (KSh / KES)</span>
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Default</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-400" /> Data Export & Backup
          </h3>
          <p className="text-xs text-slate-400">Export full transaction ledger and holdings history to CSV spreadsheet format.</p>
          <button
            onClick={exportTransactionsCSV}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Transactions CSV
          </button>
        </div>

      </div>

    </div>
  );
};
