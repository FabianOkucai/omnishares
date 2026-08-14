import React from 'react';
import type { InvestmentGoal } from '../types';
import { MOCK_GOALS } from '../data/mockData';
import { formatKES } from '../utils/formatters';

export const GoalsView: React.FC = () => {
  const goals: InvestmentGoal[] = MOCK_GOALS;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111827] via-[#162032] to-[#111827] p-6 rounded-2xl border border-[#1f2937] shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Wealth Building & Target Milestones
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            Investment Goals Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor progress towards portfolio milestones, dividend income targets, and retirement goals.
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(g => {
          const progressPercent = Math.min(((g.currentAmount / g.targetAmount) * 100), 100);
          return (
            <div key={g.id} className="glass-panel p-6 rounded-2xl border border-[#1f2937] space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {g.category}
                  </span>
                  <h3 className="font-extrabold text-white text-base mt-2">{g.title}</h3>
                </div>
                <span className="text-xs font-bold text-emerald-400">{progressPercent.toFixed(1)}%</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 bg-[#0b0f17] rounded-full overflow-hidden p-0.5 border border-[#1f2937]">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Current: <strong className="text-white">{formatKES(g.currentAmount)}</strong></span>
                  <span>Target: <strong className="text-white">{formatKES(g.targetAmount)}</strong></span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b0f17] border border-[#1f2937] text-xs text-slate-400 flex justify-between items-center">
                <span>Monthly Contribution Assumption:</span>
                <span className="font-bold text-amber-400">{formatKES(g.monthlyContributionAssumption)}/mo</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
