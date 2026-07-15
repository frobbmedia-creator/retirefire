/**
 * Run: npx tsx src/lib/scenario-metrics.test.ts
 */
import { PLANNER_DEFAULTS } from "./planner-state";
import { computeScenarioMetrics } from "./scenario-metrics";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

{
  const m = computeScenarioMetrics(PLANNER_DEFAULTS, "A");
  assert(m.label === "A", "label");
  assert(m.fireNumber === PLANNER_DEFAULTS.annualExpenses / 0.04, "fire 4%");
  assert(m.withdrawalRate === 0.04, "wr");
  assert(Number.isFinite(m.coastNumber), "coast");
  assert(m.baristaNumber < m.fireNumber, "barista < full with default income");
}

{
  const lean = computeScenarioMetrics({
    ...PLANNER_DEFAULTS,
    annualExpenses: 40_000,
    withdrawalRatePct: 4,
  });
  const fat = computeScenarioMetrics({
    ...PLANNER_DEFAULTS,
    annualExpenses: 100_000,
    withdrawalRatePct: 4,
  });
  assert(fat.fireNumber > lean.fireNumber, "higher spend → higher FIRE");
  assert(fat.coastNumber > lean.coastNumber, "higher spend → higher coast");
}

console.log("All scenario-metrics tests passed.");
