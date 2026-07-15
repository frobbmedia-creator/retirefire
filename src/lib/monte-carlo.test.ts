/**
 * Monte Carlo sanity checks.
 * Run: npx tsx src/lib/monte-carlo.test.ts
 */
import {
  FREE_PATH_CAP,
  buildTerminalHistogram,
  mulberry32,
  randn,
  runMonteCarlo,
} from "./monte-carlo";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

function approx(a: number, b: number, tol: number) {
  return Math.abs(a - b) <= tol;
}

// PRNG deterministic
{
  const a = mulberry32(123);
  const b = mulberry32(123);
  assert(a() === b(), "same seed → same first draw");
  const seq = [a(), a(), a()];
  const c = mulberry32(123);
  c(); // burn first
  assert(c() === seq[0], "sequence continues deterministically");
}

// randn finite
{
  const rng = mulberry32(7);
  for (let i = 0; i < 50; i++) {
    const z = randn(rng);
    assert(Number.isFinite(z), `randn finite ${z}`);
  }
}

// Seed reproducibility of full run
{
  const input = {
    startPortfolio: 200_000,
    annualContribution: 20_000,
    meanReturn: 0.05,
    volatility: 0.15,
    years: 15,
    target: 500_000,
    paths: 500,
    seed: 99,
  };
  const r1 = runMonteCarlo(input);
  const r2 = runMonteCarlo(input);
  assert(r1.successRate === r2.successRate, "successRate stable");
  assert(r1.p50 === r2.p50, "p50 stable");
  assert(r1.pathsSample.median[5] === r2.pathsSample.median[5], "path sample stable");
}

// Zero volatility → near-deterministic growth
{
  const years = 10;
  const start = 100_000;
  const contrib = 0;
  const mean = 0.05;
  const target = start * Math.pow(1.05, years);
  const r = runMonteCarlo({
    startPortfolio: start,
    annualContribution: contrib,
    meanReturn: mean,
    volatility: 0,
    years,
    target: target * 0.99,
    paths: 200,
    seed: 1,
  });
  // All terminals should equal FV
  const expected = start * Math.pow(1.05, years);
  assert(approx(r.p10, expected, 1), `p10 ~ ${expected} got ${r.p10}`);
  assert(approx(r.p90, expected, 1), `p90 ~ ${expected} got ${r.p90}`);
  assert(r.successRate === 1, "zero vol should always succeed vs 0.99*FV target");
}

// Higher vol → wider p10–p90 spread (same mean, seed family)
{
  const base = {
    startPortfolio: 150_000,
    annualContribution: 0,
    meanReturn: 0.05,
    years: 20,
    target: 400_000,
    paths: 800,
    seed: 42,
  };
  const low = runMonteCarlo({ ...base, volatility: 0.08 });
  const high = runMonteCarlo({ ...base, volatility: 0.2 });
  const spreadLow = low.p90 - low.p10;
  const spreadHigh = high.p90 - high.p10;
  assert(spreadHigh > spreadLow, `higher vol wider spread ${spreadHigh} vs ${spreadLow}`);
}

// Path length = years + 1
{
  const r = runMonteCarlo({
    startPortfolio: 50_000,
    annualContribution: 5_000,
    meanReturn: 0.04,
    volatility: 0.12,
    years: 12,
    target: 100_000,
    paths: 100,
    seed: 3,
  });
  assert(r.pathsSample.worst.length === 13, "worst path length");
  assert(r.pathsSample.best.length === 13, "best path length");
  assert(r.years === 12, "years echoed");
}

// Cap paths
{
  const r = runMonteCarlo({
    startPortfolio: 1,
    annualContribution: 0,
    meanReturn: 0,
    volatility: 0,
    years: 1,
    target: 0,
    paths: 50_000,
    seed: 0,
  });
  assert(r.paths === FREE_PATH_CAP, `capped at ${FREE_PATH_CAP}`);
}

// Histogram sums to 1
{
  const r = runMonteCarlo({
    startPortfolio: 100_000,
    annualContribution: 10_000,
    meanReturn: 0.05,
    volatility: 0.15,
    years: 10,
    target: 200_000,
    paths: 300,
    seed: 5,
  });
  const hist = buildTerminalHistogram(r.terminalsSorted, 10);
  const shareSum = hist.reduce((s, b) => s + b.share, 0);
  assert(approx(shareSum, 1, 1e-9), `histogram share sum ${shareSum}`);
}

console.log("All monte-carlo tests passed.");
