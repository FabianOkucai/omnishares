import type { 
  Company, 
  PricePoint, 
  CompanyFinancials, 
  OmniScoreBreakdown, 
  Transaction, 
  Holding, 
  MarketIndex, 
  NewsArticle, 
  AlertItem, 
  InvestmentGoal
} from '../types';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'scom',
    ticker: 'SCOM',
    name: 'Safaricom Plc',
    sector: 'Telecommunications',
    currentPrice: 16.85,
    previousClose: 16.50,
    dayChange: 0.35,
    dayChangePercent: 2.12,
    volume: 14250000,
    marketCap: 675000000000,
    peRatio: 12.4,
    pbRatio: 3.1,
    eps: 1.36,
    dividendYield: 7.12,
    fiftyTwoWeekHigh: 18.20,
    fiftyTwoWeekLow: 12.10,
    description: 'Safaricom Plc is the leading telecommunications provider in Kenya, offering mobile communication, M-PESA mobile money transfer, enterprise connectivity, and digital financial services.',
    omniScore: 86,
    omniScoreRating: 'Strong'
  },
  {
    id: 'coop',
    ticker: 'COOP',
    name: 'Co-operative Bank of Kenya',
    sector: 'Banking',
    currentPrice: 13.50,
    previousClose: 13.30,
    dayChange: 0.20,
    dayChangePercent: 1.50,
    volume: 3850000,
    marketCap: 79200000000,
    peRatio: 3.6,
    pbRatio: 0.68,
    eps: 3.75,
    dividendYield: 11.11,
    fiftyTwoWeekHigh: 14.80,
    fiftyTwoWeekLow: 10.90,
    description: 'Co-operative Bank of Kenya is one of Kenya’s largest commercial banks, serving over 9 million customers with strong cooperative movement integration, microfinance, and retail banking.',
    omniScore: 89,
    omniScoreRating: 'Strong'
  },
  {
    id: 'kcb',
    ticker: 'KCB',
    name: 'KCB Group Plc',
    sector: 'Banking',
    currentPrice: 38.50,
    previousClose: 37.80,
    dayChange: 0.70,
    dayChangePercent: 1.85,
    volume: 2950000,
    marketCap: 123700000000,
    peRatio: 3.1,
    pbRatio: 0.54,
    eps: 12.40,
    dividendYield: 9.09,
    fiftyTwoWeekHigh: 42.00,
    fiftyTwoWeekLow: 19.50,
    description: 'KCB Group is East Africa’s largest financial services provider by asset base, operating across Kenya, Rwanda, Tanzania, Uganda, South Sudan, Burundi, and DRC.',
    omniScore: 84,
    omniScoreRating: 'Strong'
  },
  {
    id: 'eqty',
    ticker: 'EQTY',
    name: 'Equity Group Holdings Plc',
    sector: 'Banking',
    currentPrice: 42.00,
    previousClose: 41.50,
    dayChange: 0.50,
    dayChangePercent: 1.20,
    volume: 3100000,
    marketCap: 158500000000,
    peRatio: 3.8,
    pbRatio: 0.78,
    eps: 11.05,
    dividendYield: 9.52,
    fiftyTwoWeekHigh: 47.50,
    fiftyTwoWeekLow: 34.00,
    description: 'Equity Group Holdings is a financial powerhouse offering commercial banking, investment banking, fintech (Equitel), and insurance across East and Central Africa.',
    omniScore: 88,
    omniScoreRating: 'Strong'
  },
  {
    id: 'eabl',
    ticker: 'EABL',
    name: 'East African Breweries Plc',
    sector: 'Manufacturing',
    currentPrice: 148.00,
    previousClose: 150.00,
    dayChange: -2.00,
    dayChangePercent: -1.33,
    volume: 480000,
    marketCap: 117000000000,
    peRatio: 9.8,
    pbRatio: 2.1,
    eps: 15.10,
    dividendYield: 7.43,
    fiftyTwoWeekHigh: 175.00,
    fiftyTwoWeekLow: 115.00,
    description: 'EABL is the premier beverage company in East Africa, producing iconic brands such as Tusker, Guinness, Senator, and Johnny Walker.',
    omniScore: 78,
    omniScoreRating: 'Positive'
  },
  {
    id: 'kegn',
    ticker: 'KEGN',
    name: 'KenGen Plc (Kenya Electricity Generating Co)',
    sector: 'Energy',
    currentPrice: 2.85,
    previousClose: 2.80,
    dayChange: 0.05,
    dayChangePercent: 1.79,
    volume: 5600000,
    marketCap: 18800000000,
    peRatio: 3.9,
    pbRatio: 0.17,
    eps: 0.73,
    dividendYield: 10.53,
    fiftyTwoWeekHigh: 3.40,
    fiftyTwoWeekLow: 2.10,
    description: 'KenGen is Kenya’s leading electric power power generation company, producing over 65% of the electricity consumed in Kenya through hydro, geothermal, wind, and thermal energy.',
    omniScore: 81,
    omniScoreRating: 'Positive'
  },
  {
    id: 'ncba',
    ticker: 'NCBA',
    name: 'NCBA Group Plc',
    sector: 'Banking',
    currentPrice: 41.20,
    previousClose: 40.80,
    dayChange: 0.40,
    dayChangePercent: 0.98,
    volume: 1120000,
    marketCap: 67800000000,
    peRatio: 3.2,
    pbRatio: 0.61,
    eps: 12.87,
    dividendYield: 11.53,
    fiftyTwoWeekHigh: 45.00,
    fiftyTwoWeekLow: 35.50,
    description: 'NCBA Group is a leading financial institution specializing in corporate banking, asset finance, digital banking partnerships (M-Shwari), and investment banking.',
    omniScore: 83,
    omniScoreRating: 'Positive'
  },
  {
    id: 'absa',
    ticker: 'ABSA',
    name: 'Absa Bank Kenya Plc',
    sector: 'Banking',
    currentPrice: 13.80,
    previousClose: 13.65,
    dayChange: 0.15,
    dayChangePercent: 1.10,
    volume: 2100000,
    marketCap: 74900000000,
    peRatio: 4.2,
    pbRatio: 0.89,
    eps: 3.28,
    dividendYield: 10.87,
    fiftyTwoWeekHigh: 15.20,
    fiftyTwoWeekLow: 11.00,
    description: 'Absa Bank Kenya offers retail, business, corporate, and investment banking services backed by global expertise and digital financial solutions.',
    omniScore: 82,
    omniScoreRating: 'Positive'
  },
  {
    id: 'bamb',
    ticker: 'BAMB',
    name: 'Bamburi Cement Plc',
    sector: 'Manufacturing',
    currentPrice: 76.50,
    previousClose: 75.00,
    dayChange: 1.50,
    dayChangePercent: 2.00,
    volume: 320000,
    marketCap: 27700000000,
    peRatio: 14.5,
    pbRatio: 0.92,
    eps: 5.27,
    dividendYield: 7.19,
    fiftyTwoWeekHigh: 82.00,
    fiftyTwoWeekLow: 38.00,
    description: 'Bamburi Cement is East Africa’s largest cement manufacturer, producing high-grade building cement, concrete products, and construction materials.',
    omniScore: 74,
    omniScoreRating: 'Positive'
  },
  {
    id: 'jub',
    ticker: 'JUB',
    name: 'Jubilee Holdings Ltd',
    sector: 'Insurance',
    currentPrice: 185.00,
    previousClose: 187.00,
    dayChange: -2.00,
    dayChangePercent: -1.07,
    volume: 45000,
    marketCap: 13400000000,
    peRatio: 2.9,
    pbRatio: 0.32,
    eps: 63.80,
    dividendYield: 6.49,
    fiftyTwoWeekHigh: 210.00,
    fiftyTwoWeekLow: 170.00,
    description: 'Jubilee Holdings is the largest insurer in East Africa, offering medical, life, general insurance, and asset management across Kenya, Uganda, Tanzania, Burundi, and Mauritius.',
    omniScore: 79,
    omniScoreRating: 'Positive'
  },
  {
    id: 'ctum',
    ticker: 'CTUM',
    name: 'Centum Investment Co Plc',
    sector: 'Investment',
    currentPrice: 9.10,
    previousClose: 9.15,
    dayChange: -0.05,
    dayChangePercent: -0.55,
    volume: 680000,
    marketCap: 6050000000,
    peRatio: -12.0,
    pbRatio: 0.18,
    eps: -0.76,
    dividendYield: 6.59,
    fiftyTwoWeekHigh: 10.50,
    fiftyTwoWeekLow: 7.80,
    description: 'Centum Investment is East Africa’s leading private equity and investment holding company, with assets in real estate, power generation, financial services, and FMCG.',
    omniScore: 61,
    omniScoreRating: 'Neutral'
  }
];

export const MOCK_INDICES: MarketIndex[] = [
  {
    name: 'NSE All Share Index',
    code: 'NASI',
    value: 108.45,
    change: 1.42,
    changePercent: 1.33,
    chartData: generatePricePoints(108.45, 30, 0.015)
  },
  {
    name: 'NSE 20 Share Index',
    code: 'NSE 20',
    value: 1685.20,
    change: 14.80,
    changePercent: 0.89,
    chartData: generatePricePoints(1685.20, 30, 0.012)
  },
  {
    name: 'NSE 25 Share Index',
    code: 'NSE 25',
    value: 2940.10,
    change: 32.50,
    changePercent: 1.12,
    chartData: generatePricePoints(2940.10, 30, 0.014)
  }
];

export const MOCK_COMPANY_FINANCIALS: Record<string, CompanyFinancials> = {
  COOP: {
    revenue: 71200000000,
    netProfit: 23200000000,
    eps: 3.75,
    roe: 22.4,
    roa: 3.5,
    totalDebt: 45000000000,
    totalAssets: 671000000000,
    cashAndEquivalents: 89000000000,
    freeCashFlow: 18500000000,
    historicalYears: [
      { year: '2020', revenue: 53800000000, netProfit: 10800000000, eps: 1.84, roe: 13.2, dividendPerShare: 1.00 },
      { year: '2021', revenue: 60400000000, netProfit: 16500000000, eps: 2.81, roe: 18.1, dividendPerShare: 1.00 },
      { year: '2022', revenue: 71300000000, netProfit: 22000000000, eps: 3.75, roe: 21.8, dividendPerShare: 1.50 },
      { year: '2023', revenue: 71700000000, netProfit: 23200000000, eps: 3.95, roe: 22.4, dividendPerShare: 1.50 },
      { year: '2024 (E)', revenue: 78500000000, netProfit: 26100000000, eps: 4.45, roe: 23.5, dividendPerShare: 1.65 }
    ]
  },
  SCOM: {
    revenue: 335000000000,
    netProfit: 54600000000,
    eps: 1.36,
    roe: 38.5,
    roa: 14.2,
    totalDebt: 72000000000,
    totalAssets: 480000000000,
    cashAndEquivalents: 41000000000,
    freeCashFlow: 49000000000,
    historicalYears: [
      { year: '2020', revenue: 262000000000, netProfit: 73600000000, eps: 1.84, roe: 52.1, dividendPerShare: 1.40 },
      { year: '2021', revenue: 264000000000, netProfit: 68600000000, eps: 1.71, roe: 47.0, dividendPerShare: 1.37 },
      { year: '2022', revenue: 298000000000, netProfit: 67400000000, eps: 1.68, roe: 42.5, dividendPerShare: 1.39 },
      { year: '2023', revenue: 310000000000, netProfit: 52500000000, eps: 1.31, roe: 36.2, dividendPerShare: 1.20 },
      { year: '2024', revenue: 335000000000, netProfit: 54600000000, eps: 1.36, roe: 38.5, dividendPerShare: 1.20 }
    ]
  }
};

export const MOCK_OMNISCORES: Record<string, OmniScoreBreakdown> = {
  COOP: {
    ticker: 'COOP',
    overallScore: 89,
    rating: 'Strong',
    summaryReasoning: 'COOP exhibits exceptional valuation metrics (P/E of 3.6x), outstanding dividend yield (11.1%), high ROE (22.4%), and robust financial health backed by strong cooperative sector market share.',
    pillars: {
      value: { score: 94, weight: 20, details: 'Extremely cheap relative to book value (P/B 0.68x) and earnings power (P/E 3.6x).' },
      growth: { score: 82, weight: 20, details: '5-year earnings CAGR of 14.5% driven by digital banking growth.' },
      financialHealth: { score: 91, weight: 20, details: 'NPL coverage above 65% and strong tier-1 capital adequacy ratios.' },
      dividend: { score: 95, weight: 15, details: 'Consistently high payout (KSh 1.50/share) yielding over 11%.' },
      risk: { score: 78, weight: 10, details: 'Moderate interest rate and macroeconomic sensitivity in Kenya.' },
      momentum: { score: 85, weight: 10, details: 'Trading comfortably above 50-day and 200-day moving averages.' },
      management: { score: 88, weight: 5, details: 'Disciplined capital allocation and proven execution in retail micro-banking.' }
    }
  },
  SCOM: {
    ticker: 'SCOM',
    overallScore: 86,
    rating: 'Strong',
    summaryReasoning: 'Safaricom retains a dominant mobile monopoly in Kenya with M-PESA cashflow compounding, despite near-term capital expenditure investments in Ethiopia.',
    pillars: {
      value: { score: 76, weight: 20, details: 'P/E of 12.4x is attractive compared to historical average of 18x.' },
      growth: { score: 88, weight: 20, details: 'M-PESA revenue growing at 19% YoY; Ethiopia expansion unlocks long-term TAM.' },
      financialHealth: { score: 92, weight: 20, details: 'Low leverage, high operating margin (35%), robust free cash generation.' },
      dividend: { score: 84, weight: 15, details: 'Reliable bi-annual dividend yield around 7.1%.' },
      risk: { score: 75, weight: 10, details: 'Regulatory oversight and Ethiopia currency devaluations pose transient risk.' },
      momentum: { score: 89, weight: 10, details: 'Strong rebound from 52-week lows with high trading volumes.' },
      management: { score: 90, weight: 5, details: 'World-class leadership team in digital fintech innovation.' }
    }
  }
};

export const DEFAULT_HOLDINGS: Holding[] = [
  {
    id: 'h1',
    ticker: 'COOP',
    companyName: 'Co-operative Bank of Kenya',
    sector: 'Banking',
    shares: 1200,
    averageBuyPrice: 11.50,
    currentPrice: 13.50,
    investedAmount: 13800,
    marketValue: 16200,
    unrealizedPnL: 2400,
    unrealizedPnLPercent: 17.39,
    todayChange: 240,
    todayChangePercent: 1.50,
    annualDividendIncome: 1800
  },
  {
    id: 'h2',
    ticker: 'KCB',
    companyName: 'KCB Group Plc',
    sector: 'Banking',
    shares: 200,
    averageBuyPrice: 35.00,
    currentPrice: 38.50,
    investedAmount: 7000,
    marketValue: 7700,
    unrealizedPnL: 700,
    unrealizedPnLPercent: 10.00,
    todayChange: 140,
    todayChangePercent: 1.85,
    annualDividendIncome: 700
  },
  {
    id: 'h3',
    ticker: 'KEGN',
    companyName: 'KenGen Plc',
    sector: 'Energy',
    shares: 2000,
    averageBuyPrice: 2.40,
    currentPrice: 2.85,
    investedAmount: 4800,
    marketValue: 5700,
    unrealizedPnL: 900,
    unrealizedPnLPercent: 18.75,
    todayChange: 100,
    todayChangePercent: 1.79,
    annualDividendIncome: 600
  },
  {
    id: 'h4',
    ticker: 'SCOM',
    companyName: 'Safaricom Plc',
    sector: 'Telecommunications',
    shares: 300,
    averageBuyPrice: 15.80,
    currentPrice: 16.85,
    investedAmount: 4740,
    marketValue: 5055,
    unrealizedPnL: 315,
    unrealizedPnLPercent: 6.65,
    todayChange: 105,
    todayChangePercent: 2.12,
    annualDividendIncome: 360
  }
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    date: '2024-01-15',
    type: 'DEPOSIT',
    fees: 0,
    totalAmount: 35000,
    notes: 'Initial investment deposit via M-Pesa'
  },
  {
    id: 't2',
    date: '2024-01-18',
    type: 'BUY',
    ticker: 'COOP',
    companyName: 'Co-operative Bank of Kenya',
    shares: 1200,
    pricePerShare: 11.50,
    fees: 207,
    totalAmount: -14007,
    broker: 'Dyer & Blair'
  },
  {
    id: 't3',
    date: '2024-02-05',
    type: 'BUY',
    ticker: 'KCB',
    companyName: 'KCB Group Plc',
    shares: 200,
    pricePerShare: 35.00,
    fees: 105,
    totalAmount: -7105,
    broker: 'NCBA Investment Bank'
  },
  {
    id: 't4',
    date: '2024-02-20',
    type: 'BUY',
    ticker: 'KEGN',
    companyName: 'KenGen Plc',
    shares: 2000,
    pricePerShare: 2.40,
    fees: 72,
    totalAmount: -4872,
    broker: 'Faida Investment Bank'
  },
  {
    id: 't5',
    date: '2024-03-10',
    type: 'BUY',
    ticker: 'SCOM',
    companyName: 'Safaricom Plc',
    shares: 300,
    pricePerShare: 15.80,
    fees: 71,
    totalAmount: -4811,
    broker: 'Dyer & Blair'
  },
  {
    id: 't6',
    date: '2024-04-28',
    type: 'DIVIDEND',
    ticker: 'COOP',
    companyName: 'Co-operative Bank of Kenya',
    shares: 1200,
    pricePerShare: 1.50,
    fees: 90,
    totalAmount: 1710,
    notes: 'Final Dividend FY2023 (KSh 1.50/share less 5% WHT)'
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    headline: 'Co-op Bank Reports 12% Growth in Q2 Net Profit to KSh 13.0 Billion',
    source: 'Business Daily Africa',
    date: '2024-08-12',
    category: 'Banking',
    relatedTicker: 'COOP',
    summary: 'Co-operative Bank of Kenya delivered strong performance driven by double-digit interest income growth and expanding digital loans through Kingdom Bank.',
    aiKeyTakeaway: 'Bullish indicator for COOP: Dividend security remains intact with expanding non-interest revenue margins and tight NPL management.',
    content: 'Co-operative Bank of Kenya registered a 12% growth in profit after tax for the half-year ended June 2024, reaching KSh 13.0 billion compared to KSh 11.6 billion in the previous period. Group CEO Dr. Gideon Muriuki attributed the stellar performance to cost efficiency and digital transformation.'
  },
  {
    id: 'n2',
    headline: 'Safaricom M-PESA Revenue Crosses KSh 140B Threshold as Ethiopia User Base Surges',
    source: 'The EastAfrican',
    date: '2024-08-10',
    category: 'Telecom',
    relatedTicker: 'SCOM',
    summary: 'Safaricom Telecommunications Ethiopia added 4.5 million active customers, positioning Safaricom for strong regional revenue diversification.',
    aiKeyTakeaway: 'Positive catalyst: Ethiopia subscriber monetization is accelerating faster than analyst consensus models predicted.',
    content: 'Safaricom Plc announced that M-PESA transaction velocity surged 19.4% year-on-year, offsetting voice revenue pressure. The operator expects its Ethiopian subsidiary to reach cash flow break-even by 2026.'
  },
  {
    id: 'n3',
    headline: 'Central Bank of Kenya Cuts Benchmark CBR Rate to 12.75% to Stimulate Market Credit',
    source: 'Central Bank of Kenya',
    date: '2024-08-06',
    category: 'Economy',
    summary: 'The Monetary Policy Committee (MPC) lowered the Central Bank Rate by 25 basis points as headline inflation cooled to 4.3%.',
    aiKeyTakeaway: 'Macro environment: Lower interest rates will boost equity valuations on the NSE and lower debt servicing burdens for listed corporates.',
    content: 'The Central Bank of Kenya noted that inflation has stabilized within the target band of 5.0%, creating policy room to lower benchmark rates and lower borrowing costs across commercial banking networks.'
  }
];

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'a1',
    ticker: 'COOP',
    title: 'High Banking Concentration Warning',
    message: 'Banking sector represents 69% of your total equity holdings. Consider diversifying into Energy or Telecoms.',
    type: 'portfolio',
    createdAt: '2024-08-14 09:30',
    isRead: false,
    isImportant: true
  },
  {
    id: 'a2',
    ticker: 'COOP',
    title: 'Dividend Announcement',
    message: 'Co-operative Bank announced KSh 1.50 per share dividend with ex-date set for April 15th.',
    type: 'dividend',
    targetValue: 1.50,
    createdAt: '2024-08-10 14:15',
    isRead: true,
    isImportant: false
  },
  {
    id: 'a3',
    ticker: 'KCB',
    title: 'Target Price Reached',
    message: 'KCB Group crossed your price target threshold of KSh 38.00 (Current price KSh 38.50).',
    type: 'price',
    targetValue: 38.00,
    currentValue: 38.50,
    createdAt: '2024-08-14 11:05',
    isRead: false,
    isImportant: true
  }
];

export const MOCK_GOALS: InvestmentGoal[] = [
  {
    id: 'g1',
    title: 'Build KSh 1,000,000 Portfolio',
    targetAmount: 1000000,
    currentAmount: 34655,
    category: 'Portfolio Milestone',
    targetDate: '2028-12-31',
    monthlyContributionAssumption: 15000,
    estimatedCompletionYears: 3.8
  },
  {
    id: 'g2',
    title: 'Annual KSh 100,000 Dividend Passive Income',
    targetAmount: 100000,
    currentAmount: 3460,
    category: 'Dividend Target',
    targetDate: '2027-06-30',
    monthlyContributionAssumption: 20000,
    estimatedCompletionYears: 2.9
  }
];

export function generatePricePoints(currentPrice: number, days: number = 30, volatility: number = 0.02): PricePoint[] {
  const points: PricePoint[] = [];
  const now = new Date();
  let price = currentPrice * (1 - volatility * (days / 2));
  
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const changePercent = (Math.random() - 0.48) * volatility;
    price = Math.max(price * (1 + changePercent), 0.5);
    if (i === 0) price = currentPrice;
    
    points.push({
      date: dateStr,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 2000000 + 500000)
    });
  }
  return points;
}
