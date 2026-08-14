export type NavigationTab = 
  | 'dashboard'
  | 'markets'
  | 'screener'
  | 'company-detail'
  | 'portfolio'
  | 'watchlist'
  | 'alerts'
  | 'news'
  | 'ai-assistant'
  | 'goals'
  | 'settings'
  | 'admin';

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX';

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface Company {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  logoUrl?: string;
  currentPrice: number;
  previousClose: number;
  dayChange: number;
  dayChangePercent: number;
  volume: number;
  marketCap: number; // in KSh
  peRatio: number;
  pbRatio: number;
  eps: number;
  dividendYield: number; // percentage e.g. 8.5
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  description: string;
  website?: string;
  omniScore: number; // 0-100
  omniScoreRating: 'Strong' | 'Positive' | 'Neutral' | 'Caution' | 'Weak';
}

export interface OmniScoreBreakdown {
  ticker: string;
  overallScore: number;
  rating: 'Strong' | 'Positive' | 'Neutral' | 'Caution' | 'Weak';
  summaryReasoning: string;
  pillars: {
    value: { score: number; weight: number; details: string };
    growth: { score: number; weight: number; details: string };
    financialHealth: { score: number; weight: number; details: string };
    dividend: { score: number; weight: number; details: string };
    risk: { score: number; weight: number; details: string };
    momentum: { score: number; weight: number; details: string };
    management: { score: number; weight: number; details: string };
  };
}

export interface CompanyFinancials {
  revenue: number;
  netProfit: number;
  eps: number;
  roe: number;
  roa: number;
  totalDebt: number;
  totalAssets: number;
  cashAndEquivalents: number;
  freeCashFlow: number;
  historicalYears: Array<{
    year: string;
    revenue: number;
    netProfit: number;
    eps: number;
    roe: number;
    dividendPerShare: number;
  }>;
}

export interface DividendRecord {
  id: string;
  companyId: string;
  ticker: string;
  companyName: string;
  amountPerShare: number;
  exDividendDate: string;
  paymentDate: string;
  recordDate: string;
  status: 'Upcoming' | 'Paid' | 'Announced';
  grossDividend?: number;
  netDividend?: number;
}

export type TransactionType = 'BUY' | 'SELL' | 'DIVIDEND' | 'DEPOSIT' | 'WITHDRAWAL' | 'FEE';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  ticker?: string;
  companyName?: string;
  shares?: number;
  pricePerShare?: number;
  fees: number;
  totalAmount: number; // Positive for inflow/sell/dividend, negative for outflow/buy/fee
  notes?: string;
  broker?: string;
}

export interface Holding {
  id: string;
  ticker: string;
  companyName: string;
  sector: string;
  shares: number;
  averageBuyPrice: number;
  currentPrice: number;
  investedAmount: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  todayChange: number;
  todayChangePercent: number;
  annualDividendIncome: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PortfolioSummary {
  totalValue: number;
  investedCapital: number;
  cashBalance: number;
  todayChange: number;
  todayChangePercent: number;
  totalProfitLoss: number;
  totalReturnPercent: number;
  annualDividendIncome: number;
  dividendYieldOnCost: number;
  netContributions: number;
  totalDeposited: number;
  totalWithdrawn: number;
  holdingsCount: number;
}

export interface SectorConcentrationWarning {
  sector: string;
  percentage: number;
  threshold: number;
  message: string;
  severity: 'warning' | 'critical' | 'info';
}

export interface MarketIndex {
  name: string;
  code: string;
  value: number;
  change: number;
  changePercent: number;
  chartData: PricePoint[];
}

export interface AlertItem {
  id: string;
  ticker?: string;
  title: string;
  message: string;
  type: 'price' | 'percentage' | 'dividend' | 'earnings' | 'omniscore' | 'portfolio' | 'news';
  targetValue?: number;
  currentValue?: number;
  createdAt: string;
  isRead: boolean;
  isImportant: boolean;
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  date: string;
  category: 'NSE' | 'Companies' | 'Banking' | 'Energy' | 'Telecom' | 'Economy';
  relatedTicker?: string;
  summary: string;
  aiKeyTakeaway: string;
  content: string;
  imageUrl?: string;
}

export interface OmniAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  structuredAnalysis?: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    risks: string[];
    valuation: string;
    dividendProfile: string;
    portfolioImpact: string;
    conclusion: string;
  };
}

export interface InvestmentGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: 'Portfolio Milestone' | 'Dividend Target' | 'Retirement' | 'Emergency';
  targetDate: string;
  monthlyContributionAssumption: number;
  estimatedCompletionYears: number;
}
