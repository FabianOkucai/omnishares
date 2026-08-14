import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Briefcase,
  Sparkles,
  Menu,
  X,
  Filter,
  Bookmark,
  Newspaper,
  Target,
  Settings,
  ShieldCheck
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface MobileNavProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  unreadAlertCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onNavigate,
  unreadAlertCount
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryTabs = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets' as NavigationTab, label: 'Markets', icon: BarChart2 },
    { id: 'portfolio' as NavigationTab, label: 'Portfolio', icon: Briefcase },
    { id: 'ai-assistant' as NavigationTab, label: 'OmniAI', icon: Sparkles, highlight: true },
  ];

  const secondaryTabs = [
    { id: 'screener' as NavigationTab, label: 'Stock Screener', icon: Filter },
    { id: 'watchlist' as NavigationTab, label: 'Watchlist & Alerts', icon: Bookmark, count: unreadAlertCount },
    { id: 'news' as NavigationTab, label: 'NSE News', icon: Newspaper },
    { id: 'goals' as NavigationTab, label: 'Investment Goals', icon: Target },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
    { id: 'admin' as NavigationTab, label: 'Admin', icon: ShieldCheck }
  ];

  const isWatchlistActive = currentTab === 'watchlist' || currentTab === 'alerts';

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 bg-[#111827] border-t border-[#1a2236] rounded-t-2xl p-4 space-y-1 shadow-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1a2236] mb-2">
              <span className="font-bold text-sm text-slate-200">More Tools &amp; Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            {secondaryTabs.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'watchlist' ? isWatchlistActive : currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#1a2236] text-white' : 'text-slate-300 hover:bg-[#1a2236]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count && item.count > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-xs">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1120]/95 backdrop-blur-lg border-t border-[#1a2236] px-2 py-1.5 lg:hidden">
        <div className="flex items-center justify-around">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? tab.highlight ? 'text-indigo-400' : 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isMenuOpen ? 'text-white' : 'text-slate-500'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </>
  );
};
