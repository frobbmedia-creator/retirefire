/**
 * Illustrative Monte Carlo / sequence-of-returns stress tests.
 *
 * Model (MVP): independent annual return shocks
 *   r_t = meanReturn + volatility * Z,  Z ~ N(0,1), clipped at -95%
 * End-of-year contribution added after each year's return.
 *
 * This is educational — not historical backtesting, not tax-aware,
 * and not a forecast. See /methodology and /approach.
 */

export type MonteCarloInput = {
  startPortfolio: number;
  annualContribution: number;
  /** Mean real return (decimal), e.g. 0.05 */
  meanReturn: number;
  /** Annual volatility (decimal), e.g. 0.15 */
  volatility: number;
  /** Whole years to simulate */
  years: number;
  /** Success if terminal wealth >= target */
  target: number;
  /** Number of paths (capped at FREE_PATH_CAP) */
  paths: number;
  /** Deterministic seed for reproducibility */
  seed?: number;
};

export type MonteCarloResult = {
  successRate: number;
  successes: number;
  paths: number;
  years: number;
  p10: number;
  p50: number;
  p90: number;
  meanTerminal: number;
  /** Terminal wealth samples (sorted ascending) — useful for histograms */
  terminalsSorted: number[];
  pathsSample: {
    worst: number[];
    median: number[];
    best: number[];
  };
  /** Inputs echoed for UI transparency */
  meanReturn: number;
  volatility: number;
  target: number;
};

/** Free-tier path cap for browser MVP */
export const FREE_PATH_CAP = 1_000;
export const PRO_PATH_TEASER = 5_000;

export const VOLATILITY_PRESETS = [
  {
    id: "moderate",
    label: "12%",
    value: 0.12,
    description: "More balanced / lower equity mix (illustrative)",
  },
  {
    id: "default",
    label: "15%",
    value: 0.15,
    description: "Equity-heavy portfolio (illustrative default)",
  },
  {
    id: "aggressive",
    label: "18%",
    value: 0.18,
    description: "Higher equity volatility (illustrative)",
  },
] as const;

export type VolatilityPresetId = (typeof VOLATILITY_PRESETS)[number]["id"];

/** Mulberry32 PRNG — fast, seedable, good enough for education sims */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal via Box–Muller */
export function randn(rng: () => number): number {
  let u = 0;
  let v = 0;
  // Avoid log(0)
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function quantileSorted(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(
    sorted.length - 1,
    Math.max(0, Math.floor(q * (sorted.length - 1))),
  );
  return sorted[idx]!;
}

/**
 * Run accumulation stress test: random annual returns, end-of-year contributions.
 * Success = terminal portfolio ≥ target.
 */
export function runMonteCarlo(input: MonteCarloInput): MonteCarloResult {
  const years = Math.max(0, Math.floor(input.years));
  const pathCount = Math.min(
    FREE_PATH_CAP,
    Math.max(1, Math.floor(input.paths)),
  );
  const start = Math.max(0, input.startPortfolio);
  const contrib = Math.max(0, input.annualContribution);
  const mean = input.meanReturn;
  const vol = Math.max(0, input.volatility);
  const target = Math.max(0, input.target);
  const seed = input.seed ?? 42;
  const rng = mulberry32(seed);

  const terminals: number[] = [];
  const series: number[][] = [];

  for (let p = 0; p < pathCount; p++) {
    let wealth = start;
    const path = new Array<number>(years + 1);
    path[0] = wealth;

    for (let y = 0; y < years; y++) {
      const z = randn(rng);
      const r = Math.max(-0.95, mean + vol * z);
      wealth = wealth * (1 + r) + contrib;
      if (!Number.isFinite(wealth) || wealth < 0) wealth = 0;
      path[y + 1] = wealth;
    }

    terminals.push(wealth);
    series.push(path);
  }

  const terminalsSorted = [...terminals].sort((a, b) => a - b);
  const successes = terminals.filter((t) => t >= target).length;

  const indexed = series.map((s, i) => ({ s, t: terminals[i]! }));
  indexed.sort((a, b) => a.t - b.t);

  const worst = indexed[0]!.s;
  const median = indexed[Math.floor(indexed.length / 2)]!.s;
  const best = indexed[indexed.length - 1]!.s;

  const meanTerminal =
    terminals.reduce((sum, t) => sum + t, 0) / Math.max(1, terminals.length);

  return {
    successRate: successes / pathCount,
    successes,
    paths: pathCount,
    years,
    p10: quantileSorted(terminalsSorted, 0.1),
    p50: quantileSorted(terminalsSorted, 0.5),
    p90: quantileSorted(terminalsSorted, 0.9),
    meanTerminal,
    terminalsSorted,
    pathsSample: { worst, median, best },
    meanReturn: mean,
    volatility: vol,
    target,
  };
}

/** Build coarse histogram bins for terminal wealth visualization */
export function buildTerminalHistogram(
  terminalsSorted: number[],
  binCount = 12,
): { mid: number; count: number; share: number }[] {
  if (terminalsSorted.length === 0) return [];
  const min = terminalsSorted[0]!;
  const max = terminalsSorted[terminalsSorted.length - 1]!;
  if (max <= min) {
    return [{ mid: min, count: terminalsSorted.length, share: 1 }];
  }
  const width = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => ({
    mid: min + (i + 0.5) * width,
    count: 0,
    share: 0,
  }));
  for (const t of terminalsSorted) {
    let idx = Math.floor((t - min) / width);
    if (idx >= binCount) idx = binCount - 1;
    if (idx < 0) idx = 0;
    bins[idx]!.count += 1;
  }
  const n = terminalsSorted.length;
  for (const b of bins) b.share = b.count / n;
  return bins;
}
