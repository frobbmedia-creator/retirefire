# Monte Carlo / Sequence-of-Returns Stress Test — Technical Spec (MVP)

**Phase:** 2 (Week 3–6)  
**Goal:** Show that a deterministic Coast/FIRE number is an illustration; surface success-rate ranges and bad-sequence outcomes without pretending precision.

---

## Product principles

1. **Deterministic results stay primary** — stress test is a toggle/panel, not a replacement.  
2. **Transparency first** — every chart labels: distributional assumption, path count, success definition.  
3. **Conservative defaults** — fixed volatility; no “market-beating” drift.  
4. **Free forever:** basic stress test (e.g. 1,000 paths, fixed σ).  
5. **Pro later:** more paths, regime options, tax modules, PDF reports.

---

## User-facing copy (plain language)

### Panel title
**Stress test: sequence of returns**

### Short explanation
```
The main calculators assume a smooth return every year. Markets bounce.

This stress test runs thousands of random return paths with the same average
return and a fixed volatility, then shows how often your plan “succeeds”
under a simple definition you can change.

It is an educational range — not a forecast and not a guarantee.
```

### Success definition (default)
- **Accumulation stress (Years/Coast):** portfolio ≥ target at horizon.  
- **Withdrawal stress (later):** portfolio > 0 at end of retirement horizon with fixed real withdrawals.

### Disclaimer blurb
```
Returns are simulated with a simple model (lognormal or normal approx).
This is not historical backtesting, not tax-aware, and not advice.
See Methodology for details.
```

---

## Technical design

### Location
- New pure functions: `src/lib/monte-carlo.ts`  
- UI panel: `src/components/calculators/StressTestPanel.tsx`  
- Integrate first on **Coast FIRE** and **Years to FIRE** pages  
- Optional Chart.js or keep lightweight SVG (prefer no heavy dep if possible; Chart.js OK for MVP)

### Algorithm (MVP — fixed volatility)

```
Inputs:
  P0          current portfolio
  C           annual contribution (0 for pure coast)
  r_mean      mean real return (decimal) — from shared assumptions
  sigma       annual volatility default 0.15 (equity-heavy illustrative)
  nYears      horizon years
  target      success threshold (FIRE or coast target)
  nPaths      1000 (free) / 5000 (pro later)
  seed        optional for reproducibility

For each path:
  P = P0
  for year in 1..nYears:
    // geometric Brownian / lognormal annual step
    z ~ N(0,1)
    r = exp((r_mean - 0.5*sigma^2) + sigma*z) - 1
    // or simpler: r = r_mean + sigma*z (clip r > -0.99)
    P = P * (1+r) + C
  record terminal P
  success if P >= target

Outputs:
  successRate = successes / nPaths
  p10, p50, p90 of terminal wealth
  worstPathSample, medianPathSample, bestPathSample (yearly series for chart)
```

### Defaults

| Param | Free MVP | Pro later |
|-------|----------|-----------|
| Paths | 1,000 | 5,000–10,000 |
| σ | 0.12 / 0.15 / 0.18 presets | Custom + regime |
| Mean return | Shared assumptions | Same + drift toggles |
| Model | Simple annual shock | Historical bootstrap |

### Performance
- Run in Web Worker if UI janks >100ms  
- Cap paths at 5k in browser  
- Show progress “Running 1,000 paths…”

### Visualization
1. **Histogram / distribution** of terminal wealth  
2. **Percentile bands** fan chart (p10–p90) over time  
3. **Stat chips:** Success rate · Median terminal · p10 terminal  

### Accessibility
- Text summary of rates always visible without chart  
- Color + labels (not color alone)

---

## Starter TypeScript (core)

```typescript
export type McInput = {
  startPortfolio: number;
  annualContribution: number;
  meanReturn: number;
  volatility: number;
  years: number;
  target: number;
  paths: number;
  seed?: number;
};

export type McResult = {
  successRate: number;
  p10: number;
  p50: number;
  p90: number;
  terminals: number[];
  pathsSample: { worst: number[]; median: number[]; best: number[] };
};

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randn(rng: () => number) {
  // Box-Muller
  const u = 1 - rng();
  const v = 1 - rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function runMonteCarlo(input: McInput): McResult {
  const {
    startPortfolio,
    annualContribution,
    meanReturn,
    volatility,
    years,
    target,
    paths,
    seed = 42,
  } = input;
  const rng = mulberry32(seed);
  const terminals: number[] = [];
  const series: number[][] = [];

  for (let p = 0; p < paths; p++) {
    let wealth = startPortfolio;
    const path = [wealth];
    for (let y = 0; y < years; y++) {
      const z = randn(rng);
      const r = Math.max(-0.95, meanReturn + volatility * z);
      wealth = wealth * (1 + r) + annualContribution;
      path.push(wealth);
    }
    terminals.push(wealth);
    series.push(path);
  }

  const sorted = [...terminals].sort((a, b) => a - b);
  const q = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))]!;
  const successes = terminals.filter((t) => t >= target).length;

  // sample paths by terminal rank
  const indexed = series.map((s, i) => ({ s, t: terminals[i]! }));
  indexed.sort((a, b) => a.t - b.t);
  const worst = indexed[0]!.s;
  const median = indexed[Math.floor(indexed.length / 2)]!.s;
  const best = indexed[indexed.length - 1]!.s;

  return {
    successRate: successes / paths,
    p10: q(0.1),
    p50: q(0.5),
    p90: q(0.9),
    terminals,
    pathsSample: { worst, median, best },
  };
}
```

---

## Methodology page updates (when shipping)

Add section: “Monte Carlo stress test (illustrative)” documenting:
- annual independent shocks (limitation: no autocorrelation / regimes)
- fixed σ is not your personal asset allocation
- success definition
- not a substitute for historical cycle tools (cFIREsim lineage)

---

## Acceptance criteria (MVP)

- [ ] Toggle on Coast + Years pages  
- [ ] 1,000 paths complete < 2s on mid laptop  
- [ ] Success %, p10/p50/p90 shown  
- [ ] Fan or path chart renders  
- [ ] Copy explains limitations; links methodology  
- [ ] Unit tests for deterministic seed reproducibility  
- [ ] Free vs “More paths — Coming Pro” label ready  

---

## Implementation order

1. `monte-carlo.ts` + tests  
2. `StressTestPanel` UI with stats only  
3. Path chart  
4. Wire Coast / Years  
5. Methodology + blog CTA  
6. Event: `stress_test_run`
