from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import datetime
import math
import random

app = FastAPI(
    title="OmniShares API",
    description="Investment Intelligence & Portfolio Management API for African Markets (NSE)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Structures ---
class TransactionCreate(BaseModel):
    type: str # BUY, SELL, DIVIDEND, DEPOSIT, WITHDRAWAL, FEE
    ticker: Optional[str] = None
    companyName: Optional[str] = None
    shares: Optional[float] = 0
    pricePerShare: Optional[float] = 0
    fees: Optional[float] = 0
    totalAmount: float
    notes: Optional[str] = ""
    broker: Optional[str] = ""

class AIQueryRequest(BaseModel):
    prompt: str
    tickerContext: Optional[str] = None

# --- In-Memory State & Seed Data ---
COMPANIES_DB = [
    {
        "id": "scom",
        "ticker": "SCOM",
        "name": "Safaricom Plc",
        "sector": "Telecommunications",
        "currentPrice": 16.85,
        "previousClose": 16.50,
        "dayChange": 0.35,
        "dayChangePercent": 2.12,
        "volume": 14250000,
        "marketCap": 675000000000,
        "peRatio": 12.4,
        "pbRatio": 3.1,
        "eps": 1.36,
        "dividendYield": 7.12,
        "fiftyTwoWeekHigh": 18.20,
        "fiftyTwoWeekLow": 12.10,
        "description": "Safaricom Plc is the leading telecommunications provider in Kenya, offering mobile communication, M-PESA mobile money transfer, enterprise connectivity, and digital financial services.",
        "omniScore": 86,
        "omniScoreRating": "Strong"
    },
    {
        "id": "coop",
        "ticker": "COOP",
        "name": "Co-operative Bank of Kenya",
        "sector": "Banking",
        "currentPrice": 13.50,
        "previousClose": 13.30,
        "dayChange": 0.20,
        "dayChangePercent": 1.50,
        "volume": 3850000,
        "marketCap": 79200000000,
        "peRatio": 3.6,
        "pbRatio": 0.68,
        "eps": 3.75,
        "dividendYield": 11.11,
        "fiftyTwoWeekHigh": 14.80,
        "fiftyTwoWeekLow": 10.90,
        "description": "Co-operative Bank of Kenya is one of Kenya’s largest commercial banks, serving over 9 million customers with strong cooperative movement integration, microfinance, and retail banking.",
        "omniScore": 89,
        "omniScoreRating": "Strong"
    },
    {
        "id": "kcb",
        "ticker": "KCB",
        "name": "KCB Group Plc",
        "sector": "Banking",
        "currentPrice": 38.50,
        "previousClose": 37.80,
        "dayChange": 0.70,
        "dayChangePercent": 1.85,
        "volume": 2950000,
        "marketCap": 123700000000,
        "peRatio": 3.1,
        "pbRatio": 0.54,
        "eps": 12.40,
        "dividendYield": 9.09,
        "fiftyTwoWeekHigh": 42.00,
        "fiftyTwoWeekLow": 19.50,
        "description": "KCB Group is East Africa’s largest financial services provider by asset base, operating across Kenya, Rwanda, Tanzania, Uganda, South Sudan, Burundi, and DRC.",
        "omniScore": 84,
        "omniScoreRating": "Strong"
    },
    {
        "id": "eqty",
        "ticker": "EQTY",
        "name": "Equity Group Holdings Plc",
        "sector": "Banking",
        "currentPrice": 42.00,
        "previousClose": 41.50,
        "dayChange": 0.50,
        "dayChangePercent": 1.20,
        "volume": 3100000,
        "marketCap": 158500000000,
        "peRatio": 3.8,
        "pbRatio": 0.78,
        "eps": 11.05,
        "dividendYield": 9.52,
        "fiftyTwoWeekHigh": 47.50,
        "fiftyTwoWeekLow": 34.00,
        "description": "Equity Group Holdings is a financial powerhouse offering commercial banking, investment banking, fintech (Equitel), and insurance across East and Central Africa.",
        "omniScore": 88,
        "omniScoreRating": "Strong"
    },
    {
        "id": "kegn",
        "ticker": "KEGN",
        "name": "KenGen Plc",
        "sector": "Energy",
        "currentPrice": 2.85,
        "previousClose": 2.80,
        "dayChange": 0.05,
        "dayChangePercent": 1.79,
        "volume": 5600000,
        "marketCap": 18800000000,
        "peRatio": 3.9,
        "pbRatio": 0.17,
        "eps": 0.73,
        "dividendYield": 10.53,
        "fiftyTwoWeekHigh": 3.40,
        "fiftyTwoWeekLow": 2.10,
        "description": "KenGen is Kenya’s leading electric power generation company, producing over 65% of electricity.",
        "omniScore": 81,
        "omniScoreRating": "Positive"
    }
]

TRANSACTIONS_DB = [
    {
        "id": "t1",
        "date": "2024-01-15",
        "type": "DEPOSIT",
        "fees": 0.0,
        "totalAmount": 35000.0,
        "notes": "Initial deposit via M-Pesa",
        "broker": ""
    },
    {
        "id": "t2",
        "date": "2024-01-18",
        "type": "BUY",
        "ticker": "COOP",
        "companyName": "Co-operative Bank of Kenya",
        "shares": 1200,
        "pricePerShare": 11.50,
        "fees": 207.0,
        "totalAmount": -14007.0,
        "broker": "Dyer & Blair"
    },
    {
        "id": "t3",
        "date": "2024-02-05",
        "type": "BUY",
        "ticker": "KCB",
        "companyName": "KCB Group Plc",
        "shares": 200,
        "pricePerShare": 35.00,
        "fees": 105.0,
        "totalAmount": -7105.0,
        "broker": "NCBA Bank"
    }
]

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "OmniShares API Service Active", "market": "NSE (KES)", "version": "1.0.0"}

@app.get("/api/health")
def get_health():
    return {
        "status": "healthy",
        "dataFreshness": "Real-time / Delay 15m",
        "database": "connected",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/api/companies")
def get_companies(
    sector: Optional[str] = None,
    minOmniScore: Optional[int] = None,
    minDividendYield: Optional[float] = None,
    maxPE: Optional[float] = None,
    query: Optional[str] = None
):
    results = COMPANIES_DB
    if query:
        q = query.lower()
        results = [c for c in results if q in c["ticker"].lower() or q in c["name"].lower()]
    if sector and sector != "All":
        results = [c for c in results if c["sector"].lower() == sector.lower()]
    if minOmniScore:
        results = [c for c in results if c["omniScore"] >= minOmniScore]
    if minDividendYield:
        results = [c for c in results if c["dividendYield"] >= minDividendYield]
    if maxPE:
        results = [c for c in results if c["peRatio"] <= maxPE and c["peRatio"] > 0]
    return results

@app.get("/api/companies/{ticker}")
def get_company_detail(ticker: str):
    t = ticker.upper()
    comp = next((c for c in COMPANIES_DB if c["ticker"] == t), None)
    if not comp:
        raise HTTPException(status_code=404, detail="Company not found")
    return comp

@app.get("/api/companies/{ticker}/omniscore")
def get_omniscore(ticker: str):
    t = ticker.upper()
    return {
        "ticker": t,
        "overallScore": 89 if t == "COOP" else 84,
        "rating": "Strong",
        "summaryReasoning": f"{t} ranks in the top decile for Value (P/E < 4x) and Dividend Yield (>9%), with strong balance sheet resilience.",
        "pillars": {
            "value": {"score": 94, "weight": 20, "details": "Trading significantly below 5-year historical average valuation metrics."},
            "growth": {"score": 82, "weight": 20, "details": "Robust revenue growth driven by digital channels."},
            "financialHealth": {"score": 91, "weight": 20, "details": "Strong tier-1 capital and liquidity ratios."},
            "dividend": {"score": 95, "weight": 15, "details": "Yield outperforms 90% of NSE listed equities."},
            "risk": {"score": 78, "weight": 10, "details": "Low volatility relative to broader market index."},
            "momentum": {"score": 85, "weight": 10, "details": "Positive 50-day moving average cross."},
            "management": {"score": 88, "weight": 5, "details": "Strong leadership track record."}
        }
    }

@app.get("/api/transactions")
def get_transactions():
    return TRANSACTIONS_DB

@app.post("/api/transactions")
def add_transaction(tx: TransactionCreate):
    new_id = f"t{len(TRANSACTIONS_DB) + 1}"
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    record = {
        "id": new_id,
        "date": date_str,
        "type": tx.type,
        "ticker": tx.ticker,
        "companyName": tx.companyName,
        "shares": tx.shares,
        "pricePerShare": tx.pricePerShare,
        "fees": tx.fees,
        "totalAmount": tx.totalAmount,
        "notes": tx.notes,
        "broker": tx.broker
    }
    TRANSACTIONS_DB.insert(0, record)
    return record

@app.post("/api/ai/query")
def process_ai_query(req: AIQueryRequest):
    prompt = req.prompt.lower()
    ticker = req.tickerContext or "COOP"
    
    if "buy" in prompt or "should i" in prompt:
        return {
            "text": f"Based on OmniScore analysis for {ticker}, it presents a compelling long-term value case with an overall score of 89/100.",
            "structuredAnalysis": {
                "summary": f"{ticker} is currently trading at an attractive earnings multiple with an outstanding dividend yield.",
                "strengths": [
                    "P/E ratio under 4.0x, providing margin of safety",
                    "Dividend yield exceeding 11.0%",
                    "Strong digital transaction volume growth"
                ],
                "weaknesses": [
                    "Credit loss provisioning sensitive to macroeconomic shifts",
                    "Tight net interest margin environment"
                ],
                "risks": [
                    "Macroeconomic inflation impact on SME borrower repayment",
                    "Interest rate volatility"
                ],
                "valuation": "Fair value estimate range: KSh 16.50 – KSh 18.00 (Current: KSh 13.50)",
                "dividendProfile": "High dividend security with 3.2x dividend cover.",
                "portfolioImpact": "Will enhance portfolio dividend cash flows without elevating debt risk.",
                "conclusion": "Favorable Risk/Reward profile for dividend and value investors. (Disclaimer: Educational analysis, not guaranteed financial advice)."
            }
        }
    else:
        return {
            "text": "OmniAI Analysis: Your portfolio demonstrates high cash flow productivity through dividend yields, but maintaining sector diversification across Energy and Telecoms is recommended.",
            "structuredAnalysis": {
                "summary": "Portfolio analysis reveals solid performance and positive cashflow trajectory.",
                "strengths": ["High average dividend yield (9.8%)", "Unrealized capital gain +14.2%"],
                "weaknesses": ["Sector concentration in Banking (69%)"],
                "risks": ["Banking sector regulatory changes"],
                "valuation": "Portfolio weighted P/E is 3.5x vs market average 6.2x",
                "dividendProfile": "Projected annual passive income: KSh 3,460",
                "portfolioImpact": "Solid foundation for KSh 1,000,000 portfolio milestone goal.",
                "conclusion": "Rebalance 15% of future cash contributions into non-financial sectors."
            }
        }
