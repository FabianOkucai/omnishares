import React, { useState } from 'react';
import { Sparkles, X, ExternalLink } from 'lucide-react';
import type { NewsArticle } from '../types';
import { MOCK_NEWS } from '../data/mockData';

interface NewsViewProps {
  onSelectCompany: (ticker: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onSelectCompany }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'Banking', 'Telecom', 'Economy', 'NSE', 'Companies'];

  const filteredNews = selectedCategory === 'All' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category === selectedCategory);

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Nairobi Securities Exchange Financial News
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Market Intelligence Feed
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Curated corporate releases, central bank monetary updates, and AI executive summaries.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-[#0b0f17] text-slate-400 hover:text-slate-200 border border-[#1f2937]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(n => (
          <div 
            key={n.id} 
            className="glass-panel p-5 rounded-2xl border border-[#1f2937] hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                  {n.category}
                </span>
                <span>{n.date}</span>
              </div>

              <h3 className="font-bold text-slate-100 text-base leading-snug mb-2 hover:text-indigo-400 cursor-pointer" onClick={() => setActiveArticle(n)}>
                {n.headline}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {n.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1f2937] space-y-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" /> AI Executive Takeaway
                </div>
                <p className="text-[11px] leading-relaxed">{n.aiKeyTakeaway}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{n.source}</span>
                <button 
                  onClick={() => setActiveArticle(n)}
                  className="font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Read Article <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1f2937] w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#1f2937] pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{activeArticle.category} • {activeArticle.source}</span>
                <h2 className="text-xl font-bold text-white mt-1">{activeArticle.headline}</h2>
                <span className="text-xs text-slate-500">{activeArticle.date}</span>
              </div>
              <button onClick={() => setActiveArticle(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
              <span className="font-bold block mb-1 text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Summary & Market Impact:
              </span>
              {activeArticle.aiKeyTakeaway}
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3 pt-2">
              <p>{activeArticle.content}</p>
            </div>

            {activeArticle.relatedTicker && (
              <div className="pt-4 border-t border-[#1f2937] flex justify-end">
                <button
                  onClick={() => {
                    const t = activeArticle.relatedTicker!;
                    setActiveArticle(null);
                    onSelectCompany(t);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  View {activeArticle.relatedTicker} Stock Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
