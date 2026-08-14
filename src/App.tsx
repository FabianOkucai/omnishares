import { useState } from 'react';
import { AuthView } from './components/AuthView';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/DashboardView';
import { MarketsView } from './components/MarketsView';
import { ScreenerView } from './components/ScreenerView';
import { CompanyDetailView } from './components/CompanyDetailView';
import { PortfolioView } from './components/PortfolioView';
import { WatchlistAlertsView } from './components/WatchlistAlertsView';
import { NewsView } from './components/NewsView';
import { OmniAIView } from './components/OmniAIView';
import { GoalsView } from './components/GoalsView';
import { SettingsView } from './components/SettingsView';
import { AdminView } from './components/AdminView';

import type { NavigationTab, Transaction, Holding, Company } from './types';
import { MOCK_COMPANIES, MOCK_INDICES, MOCK_ALERTS, DEFAULT_HOLDINGS, DEFAULT_TRANSACTIONS } from './data/mockData';

export function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Nav state
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedCompanyTicker, setSelectedCompanyTicker] = useState<string>('COOP');

  // Dynamic State
  const [companies] = useState<Company[]>(MOCK_COMPANIES);
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [alerts] = useState(MOCK_ALERTS);

  const unreadAlertCount = alerts.filter(a => !a.isRead).length;

  const handleLogin = (email: string, name: string) => {
    setCurrentUser({ email, name });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentTab('dashboard');
  };

  const handleSelectCompany = (ticker: string) => {
    setSelectedCompanyTicker(ticker);
    setCurrentTab('company-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const id = `t${Date.now()}`;
    const newTx: Transaction = { id, ...newTxData };
    setTransactions(prev => [newTx, ...prev]);

    if ((newTx.type === 'BUY' || newTx.type === 'SELL') && newTx.ticker && newTx.shares) {
      const comp = companies.find(c => c.ticker === newTx.ticker);
      const curPrice = comp?.currentPrice || newTx.pricePerShare || 10;

      setHoldings(prev => {
        const existingIndex = prev.findIndex(h => h.ticker === newTx.ticker);

        if (newTx.type === 'BUY') {
          if (existingIndex >= 0) {
            const existing = prev[existingIndex];
            const updatedShares = existing.shares + newTx.shares!;
            const updatedInvested = existing.investedAmount + (newTx.shares! * newTx.pricePerShare!);
            const updatedAvgPrice = updatedInvested / updatedShares;
            const updatedValue = updatedShares * curPrice;
            const updatedPnL = updatedValue - updatedInvested;
            const updatedHoldings = [...prev];
            updatedHoldings[existingIndex] = {
              ...existing,
              shares: updatedShares,
              averageBuyPrice: updatedAvgPrice,
              investedAmount: updatedInvested,
              marketValue: updatedValue,
              unrealizedPnL: updatedPnL,
              unrealizedPnLPercent: (updatedPnL / updatedInvested) * 100
            };
            return updatedHoldings;
          } else {
            const invested = newTx.shares! * newTx.pricePerShare!;
            const mktValue = newTx.shares! * curPrice;
            const pnl = mktValue - invested;
            const newHolding: Holding = {
              id: `h-${Date.now()}`,
              ticker: newTx.ticker!,
              companyName: newTx.companyName || newTx.ticker!,
              sector: comp?.sector || 'Equities',
              shares: newTx.shares!,
              averageBuyPrice: newTx.pricePerShare!,
              currentPrice: curPrice,
              investedAmount: invested,
              marketValue: mktValue,
              unrealizedPnL: pnl,
              unrealizedPnLPercent: (pnl / invested) * 100,
              todayChange: 0,
              todayChangePercent: 0,
              annualDividendIncome: (newTx.shares! * (comp?.dividendYield || 5) * curPrice) / 100
            };
            return [...prev, newHolding];
          }
        } else if (newTx.type === 'SELL') {
          if (existingIndex >= 0) {
            const existing = prev[existingIndex];
            const remainingShares = existing.shares - newTx.shares!;
            if (remainingShares <= 0) {
              return prev.filter(h => h.ticker !== newTx.ticker);
            } else {
              const updatedInvested = remainingShares * existing.averageBuyPrice;
              const updatedValue = remainingShares * curPrice;
              const updatedPnL = updatedValue - updatedInvested;
              const updatedHoldings = [...prev];
              updatedHoldings[existingIndex] = {
                ...existing,
                shares: remainingShares,
                investedAmount: updatedInvested,
                marketValue: updatedValue,
                unrealizedPnL: updatedPnL,
                unrealizedPnLPercent: (updatedPnL / updatedInvested) * 100
              };
              return updatedHoldings;
            }
          }
        }
        return prev;
      });
    }
  };

  // ── Auth Gate ─────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  // ── Main App Layout ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">

      {/* Non-sticky top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onSelectCompany={handleSelectCompany}
        unreadAlertCount={unreadAlertCount}
        user={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 w-full">

        {/* Desktop Sidebar – sits at the very left edge */}
        <Sidebar
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          unreadAlertCount={unreadAlertCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 min-w-0 pb-24 lg:pb-8">

          {currentTab === 'dashboard' && (
            <DashboardView
              holdings={holdings}
              transactions={transactions}
              indices={MOCK_INDICES}
              companies={companies}
              alerts={alerts}
              onNavigate={setCurrentTab}
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'markets' && (
            <MarketsView
              companies={companies}
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'screener' && (
            <ScreenerView
              companies={companies}
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'company-detail' && (
            <CompanyDetailView
              ticker={selectedCompanyTicker}
              companies={companies}
              onBack={() => setCurrentTab('markets')}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'portfolio' && (
            <PortfolioView
              holdings={holdings}
              transactions={transactions}
              companies={companies}
              onAddTransaction={handleAddTransaction}
              onSelectCompany={handleSelectCompany}
            />
          )}

          {/* Combined watchlist & alerts route */}
          {(currentTab === 'watchlist' || currentTab === 'alerts') && (
            <WatchlistAlertsView
              alerts={alerts}
              companies={companies}
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'news' && (
            <NewsView
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'ai-assistant' && (
            <OmniAIView
              onSelectCompany={handleSelectCompany}
            />
          )}

          {currentTab === 'goals' && <GoalsView />}

          {currentTab === 'settings' && (
            <SettingsView
              transactions={transactions}
            />
          )}

          {currentTab === 'admin' && <AdminView />}

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        unreadAlertCount={unreadAlertCount}
      />

    </div>
  );
}

export default App;
