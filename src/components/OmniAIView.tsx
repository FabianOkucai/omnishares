import React, { useState } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import type { OmniAIMessage } from '../types';

interface OmniAIViewProps {
  onSelectCompany: (ticker: string) => void;
}

export const OmniAIView: React.FC<OmniAIViewProps> = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<OmniAIMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      timestamp: 'Just now',
      text: 'Hello! I am OmniAI, your dedicated investment and portfolio intelligence assistant for African stock markets. Ask me about any NSE stock (e.g., "Should I buy COOP?"), portfolio diversification, dividend yields, or sector risks.'
    }
  ]);

  const quickQuestions = [
    'Should I buy COOP?',
    'Compare KCB and Equity Bank',
    'Which stocks have strong dividends?',
    'Is my portfolio diversified?',
    'What sector am I overexposed to?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: OmniAIMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Generate Contextual AI Response
    setTimeout(() => {
      let aiMsg: OmniAIMessage;

      if (q.toLowerCase().includes('coop') || q.toLowerCase().includes('should i buy')) {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Here is my structured OmniAI evaluation for Co-operative Bank of Kenya (COOP):',
          structuredAnalysis: {
            summary: 'COOP presents an exceptional value and dividend income opportunity on the NSE with an OmniScore™ of 89/100.',
            strengths: [
              'Attractively low valuation at 3.6x P/E ratio and 0.68x Price-to-Book',
              'Market-leading dividend yield of 11.11% (KSh 1.50 per share)',
              'Robust ROE of 22.4% with expanding MSME loan portfolio'
            ],
            weaknesses: [
              'Higher non-performing loan (NPL) exposure in agrarian SME sectors',
              'Compressed Net Interest Margins under elevated central bank rates'
            ],
            risks: [
              'Macroeconomic inflation pressure on loan default rates',
              'Sovereign bond yield competition'
            ],
            valuation: 'Estimated fair-value range: KSh 16.50 – KSh 18.00 (Current market price KSh 13.50).',
            dividendProfile: 'Exceptional dividend security with 3.2x earnings coverage.',
            portfolioImpact: 'Adds high yield cash flow without taking on speculative balance sheet risk.',
            conclusion: 'Strong Buy for value and dividend income investors. (Educational synthesis, not guaranteed advice).'
          }
        };
      } else if (q.toLowerCase().includes('diversified') || q.toLowerCase().includes('overexposed')) {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Here is my OmniAI audit of your current portfolio asset allocation:',
          structuredAnalysis: {
            summary: 'Your portfolio has strong profitability but exhibits high sector concentration in Kenyan Banking.',
            strengths: ['High average dividend income (Yield on Cost: 9.8%)', 'Total unrealized capital gain of +14.2%'],
            weaknesses: ['69% of equity capital is concentrated in Banking (COOP, KCB)'],
            risks: ['Sector risk: Banking regulatory shifts or central bank rate cuts could affect all banking holdings simultaneously.'],
            valuation: 'Weighted average P/E of your holdings is 3.5x vs NSE average of 6.2x.',
            dividendProfile: 'Generating KSh 3,460 annual passive income.',
            portfolioImpact: 'Reallocating 15-20% of new deposits to Energy (KenGen) or Telecom (Safaricom) will reduce volatility.',
            conclusion: 'Maintain current holdings for dividends, but direct new cash deposits into non-financial sectors.'
          }
        };
      } else {
        aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Analyzing "${q}" against verified NSE market data: Kenya listed equities currently trade at an average P/E of 5.8x, offering some of the highest dividend yields in Sub-Saharan Africa.`
        };
      }

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      <div className="bg-gradient-to-r from-indigo-900/40 via-[#162032] to-[#111827] p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse-subtle" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              AI Financial Assistant Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            OmniAI Investment Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent reasoning on valuation, dividend coverage, portfolio diversification, and stock metrics.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-500 font-medium shrink-0">Try asking:</span>
        {quickQuestions.map(q => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-indigo-600/20 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-300 border border-[#1f2937] text-xs font-medium whitespace-nowrap transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl border border-[#1f2937] p-5 space-y-4 min-h-[420px] flex flex-col justify-between">
        
        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
          {messages.map(m => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl rounded-2xl p-4 text-xs space-y-3 ${
                m.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-[#0b0f17] text-slate-200 border border-[#1f2937] rounded-tl-none'
              }`}>
                <p className="leading-relaxed">{m.text}</p>

                {m.structuredAnalysis && (
                  <div className="p-4 rounded-xl bg-[#111827] border border-indigo-500/30 space-y-3 mt-3">
                    <div className="font-bold text-indigo-300 text-xs flex items-center gap-1.5 border-b border-[#1f2937] pb-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" /> Executive AI Summary
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.structuredAnalysis.summary}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <span className="font-bold text-emerald-400 text-[11px] block mb-1">Key Strengths</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                          {m.structuredAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                        <span className="font-bold text-rose-400 text-[11px] block mb-1">Risks & Weaknesses</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                          {m.structuredAnalysis.risks.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0b0f17] border border-[#1f2937] text-[11px] space-y-1">
                      <p><span className="font-bold text-slate-400">Valuation Range: </span><span className="text-white">{m.structuredAnalysis.valuation}</span></p>
                      <p><span className="font-bold text-slate-400">Portfolio Impact: </span><span className="text-white">{m.structuredAnalysis.portfolioImpact}</span></p>
                    </div>

                    <div className="pt-2 border-t border-[#1f2937] text-[11px] font-bold text-indigo-300">
                      Conclusion: {m.structuredAnalysis.conclusion}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-[#1f2937]">
          <input
            type="text"
            placeholder="Ask OmniAI about any stock, valuation, or your portfolio..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#0b0f17] border border-[#1f2937] focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-3 text-xs focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
