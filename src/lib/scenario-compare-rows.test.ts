/**
 * Run: npx tsx src/lib/scenario-compare-rows.test.ts
 */
import assert from "node:assert/strict";
import {
  boolRow,
  deltaBadgeText,
  yearsRow,
} from "./scenario-compare-rows";
import type { ScenarioMetrics } from "./scenario-metrics";

function metrics(partial: Partial<ScenarioMetrics>): ScenarioMetrics {
  return {
    label: "t",
    annualExpenses: 60_000,
    currentPortfolio: 150_000,
    annualContribution: 30_000,
    withdrawalRate: 0.04,
    realReturn: 0.05,
    currentAge: 30,
    retirementAge: 65,
    partTimeIncome: 0,
    fireNumber: 1_500_000,
    yearsToFire: 20,
    yearsUnreachable: false,
    alreadyAtFire: false,
    coastNumber: 400_000,
    alreadyCoast: false,
    coastShortfall: 0,
    coastSurplus: 0,
    baristaNumber: 1_000_000,
    gapExpenses: 40_000,
    ...partial,
  };
}

{
  const row = yearsRow(
    metrics({ yearsToFire: null, yearsUnreachable: true }),
    metrics({ yearsToFire: 12, yearsUnreachable: false }),
  );
  assert.notEqual(
    row.delta,
    "Unchanged",
    "incomparable years must not be labeled Unchanged",
  );
  assert.match(
    row.delta,
    /^(?:—|Not comparable)$/,
    "incomparable years should be an explicit non-comparison",
  );
  assert.doesNotMatch(
    deltaBadgeText(row.direction, row.delta),
    /Unchanged/,
    "badge must not say Unchanged when years cannot be compared",
  );
}

{
  const row = yearsRow(
    metrics({ yearsToFire: 10, yearsUnreachable: false }),
    metrics({ yearsToFire: 10, yearsUnreachable: false }),
  );
  assert.equal(row.delta, "Unchanged");
  assert.equal(deltaBadgeText(row.direction, row.delta), "Unchanged");
}

{
  const row = boolRow("Already coasting?", false, true);
  assert.equal(row.delta, "Now yes");
  const badge = deltaBadgeText(row.direction, row.delta);
  assert.notEqual(row.direction, "flat");
  assert.doesNotMatch(badge, /Unchanged/);
  assert.equal(badge, "Now yes");
}

{
  const row = boolRow("Already coasting?", true, false);
  assert.equal(row.delta, "Now no");
  assert.doesNotMatch(deltaBadgeText(row.direction, row.delta), /Unchanged/);
}

{
  const row = boolRow("Already coasting?", true, true);
  assert.equal(row.delta, "Unchanged");
  assert.equal(deltaBadgeText(row.direction, row.delta), "Unchanged");
}

console.log("All scenario-compare row checks passed.");
