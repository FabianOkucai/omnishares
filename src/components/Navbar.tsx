import React, { useState } from 'react';
import { Search, Bell, Sparkles, ChevronDown, Globe, Sliders, ShieldCheck, LogOut, TrendingUp } from 'lucide-react';
import type { NavigationTab } from '../types';
import { MOCK_COMPANIES } from '../data/mockData';

interface NavbarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onSelectCompany: (ticker: string) => void;
  unreadAlertCount: number;
  user: { email: string; name: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onSelectCompany,
  unreadAlertCount,
  user,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredCompanies = searchQuery.trim() === ''
    ? []
    : MOCK_COMPANIES.filter(c =>
        c.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const initials = user ? user.name.slice(0, 2).toUpperCase() : 'OK';

  return (
    <header className="z-40 bg-[#0d1120] border-b border-[#1a2236] px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">

        {/* Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-black text-lg tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                OMNISHARES
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                NSE KENYA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Investment Intelligence &amp; Portfolio Manager
            </p>
          </div>
        </div>

        {/* Global Stock Search */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#111827] border transition-all ${
            isSearchFocused ? 'border-indigo-500' : 'border-[#1a2236]'
          }`}>
            <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search NSE stocks (e.g. COOP, SCOM, KCB)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
              >
                Clear
              </button>
            )}
          </div>

          {isSearchFocused && filteredCompanies.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-[#1a2236] rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-[#1a2236]">
              {filteredCompanies.map(c => (
                <div
                  key={c.id}
                  onClick={() => { onSelectCompany(c.ticker); setSearchQuery(''); }}
                  className="p-3 hover:bg-[#1a2236] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center font-bold text-xs text-indigo-400">
                      {c.ticker.slice(0, 4)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-100 number-font">KSh {c.currentPrice.toFixed(2)}</p>
                    <span className={`text-xs font-medium ${c.dayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {c.dayChange >= 0 ? '+' : ''}{c.dayChangePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Ask OmniAI */}
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 text-xs font-semibold transition-colors border border-indigo-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Ask OmniAI</span>
          </button>

          {/* Currency indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] border border-[#1a2236] text-xs font-semibold text-slate-400">
            <Globe className="w-3.5 h-3.5" />
            <span>KES (KSh)</span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => onNavigate('alerts')}
            className="relative p-2.5 rounded-xl bg-[#111827] border border-[#1a2236] hover:bg-[#1a2236] text-slate-400 transition-colors"
            title="Watchlist & Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-[#111827] border border-[#1a2236] hover:bg-[#1a2236] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-300">
                {initials}
              </div>
              <span className="text-xs font-semibold text-slate-300 hidden xl:inline max-w-[100px] truncate">
                {user?.name || 'Investor'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#111827] border border-[#1a2236] rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                <div className="px-4 py-2.5 border-b border-[#1a2236] mb-1">
                  <p className="font-bold text-slate-200 text-sm">{user?.name || 'Investor'}</p>
                  <p className="text-slate-500 truncate">{user?.email || ''}</p>
                </div>
                <button
                  onClick={() => { onNavigate('settings'); setIsProfileOpen(false); }}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#1a2236] text-slate-300 flex items-center gap-2.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" /> Account Settings
                </button>
                <button
                  onClick={() => { onNavigate('admin'); setIsProfileOpen(false); }}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#1a2236] text-slate-300 flex items-center gap-2.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Admin Dashboard
                </button>
                <div className="border-t border-[#1a2236] mt-1 pt-1">
                  <button
                    onClick={() => { onLogout(); setIsProfileOpen(false); }}
                    className="w-full px-4 py-2.5 text-left hover:bg-rose-500/10 text-rose-400 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
