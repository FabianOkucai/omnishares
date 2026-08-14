export function formatKES(val: number, showDecimals: boolean = false): string {
  const rounded = showDecimals ? val.toFixed(2) : Math.round(val).toLocaleString();
  const formattedStr = typeof rounded === 'string' ? rounded : val.toLocaleString(undefined, { minimumFractionDigits: showDecimals ? 2 : 0, maximumFractionDigits: 2 });
  return `KSh ${formattedStr}`;
}

export function formatCompactKES(val: number): string {
  if (val >= 1_000_000_000_000) {
    return `KSh ${(val / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (val >= 1_000_000_000) {
    return `KSh ${(val / 1_000_000_000).toFixed(2)}B`;
  }
  if (val >= 1_000_000) {
    return `KSh ${(val / 1_000_000).toFixed(2)}M`;
  }
  if (val >= 1_000) {
    return `KSh ${(val / 1_000).toFixed(1)}K`;
  }
  return `KSh ${val.toFixed(2)}`;
}

export function formatPercent(val: number, includeSign: boolean = true): string {
  const prefix = includeSign && val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(2)}%`;
}

export function getOmniScoreBadge(score: number): { label: string; bg: string; text: string; border: string } {
  if (score >= 85) {
    return { label: 'Strong', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
  }
  if (score >= 75) {
    return { label: 'Positive', bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' };
  }
  if (score >= 60) {
    return { label: 'Neutral', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
  }
  if (score >= 45) {
    return { label: 'Caution', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' };
  }
  return { label: 'Weak', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
}
