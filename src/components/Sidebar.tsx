import React from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Filter,
  Briefcase,
  Bookmark,
  Newspaper,
  Sparkles,
  Target,
  Settings,
  ShieldCheck,
  Award
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  unreadAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  unreadAlertCount
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets' as NavigationTab, label: 'Markets Directory', icon: BarChart2 },
    { id: 'screener' as NavigationTab, label: 'Stock Screener', icon: Filter },
    { id: 'portfolio' as NavigationTab, label: 'My Investments', icon: Briefcase, badge: 'Core' },
    // Watchlist & Alerts combined — both route to same page
    { id: 'watchlist' as NavigationTab, label: 'Watchlist & Alerts', icon: Bookmark, count: unreadAlertCount },
    { id: 'news' as NavigationTab, label: 'NSE News', icon: Newspaper },
    { id: 'ai-assistant' as NavigationTab, label: 'OmniAI Assistant', icon: Sparkles, highlight: true },
    { id: 'goals' as NavigationTab, label: 'Investment Goals', icon: Target },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
    { id: 'admin' as NavigationTab, label: 'Admin Panel', icon: ShieldCheck }
  ];

  // Both watchlist and alerts tabs are "active" when on the combined page
  const isWatchlistActive = currentTab === 'watchlist' || currentTab === 'alerts';

  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-60 bg-[#0d1120] border-r border-[#1a2236] min-h-[calc(100vh-61px)] p-3 shrink-0">

      <div className="space-y-0.5">
        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2 mt-1">
          Platform Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'watchlist' ? isWatchlistActive : currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                isActive
                  ? item.highlight
                    ? 'bg-indigo-600/20 text-indigo-300'
                    : 'bg-[#1a2236] text-white'
                  : item.highlight
                  ? 'text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300'
                  : 'text-slate-400 hover:bg-[#1a2236] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? item.highlight ? 'text-indigo-400' : 'text-emerald-400'
                    : item.highlight ? 'text-indigo-400' : 'text-slate-500'
                }`} />
                <span className="text-[13px]">{item.label}</span>
              </div>

              <div className="flex items-center gap-1">
                {item.badge && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                    {item.badge}
                  </span>
                )}
                {item.count && item.count > 0 ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white leading-none">
                    {item.count}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {/* OmniScore promo box */}
      <div className="mt-auto pt-4 border-t border-[#1a2236]">
        <div className="p-4 rounded-2xl bg-[#111827] text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5 heading-serif text-sm">
              <Award className="w-4 h-4 text-amber-400" /> OmniScore™
            </span>
            <span className="text-[9px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-400/10">
              v1.0
            </span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed mb-2.5">
            Proprietary 7-factor equity scoring engine evaluating value, dividends &amp; health.
          </p>
          <button
            onClick={() => onNavigate('screener')}
            className="w-full py-2 rounded-xl bg-[#1a2236] hover:bg-[#212d44] text-slate-200 text-center text-xs font-semibold transition-colors"
          >
            Explore Top Rated Stocks
          </button>
        </div>
      </div>

    </aside>
  );
};
