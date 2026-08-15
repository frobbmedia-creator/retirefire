import assert from "node:assert/strict";
import { PLANNER_DEFAULTS, PLANNER_SCHEMA_VERSION } from "./planner-state";
import {
  csvCell,
  exportPlannerJson,
  importPlannerJson,
} from "./planner-transfer";
import { normalizeMoneyDraft } from "../components/ui/money-input";

const validState = {
  ...PLANNER_DEFAULTS,
  annualExpenses: 48_000.5,
  expectedReturnPct: 5.25,
};

// Exports preserve the validated state and include compatibility metadata.
{
  const json = exportPlannerJson(validState);
  const exported = JSON.parse(json) as {
    schemaVersion: number;
    exportedAt: string;
    calculationVersions: Record<string, string>;
    state: unknown;
  };
  assert.equal(exported.schemaVersion, PLANNER_SCHEMA_VERSION);
  assert.match(exported.exportedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.ok(Object.keys(exported.calculationVersions).length > 0);

  const imported = importPlannerJson(json, new TextEncoder().encode(json).byteLength);
  assert.equal(imported.ok, true);
  if (imported.ok) assert.deepEqual(imported.state, validState);
}

// Imports reject unsupported schema versions and malformed or oversized input.
{
  const validJson = exportPlannerJson(validState);
  const unsupported = JSON.stringify({
    ...JSON.parse(validJson),
    schemaVersion: PLANNER_SCHEMA_VERSION + 1,
  });
  assert.equal(importPlannerJson(unsupported, unsupported.length).ok, false);
  assert.equal(importPlannerJson("{", 1).ok, false);
  assert.equal(importPlannerJson("{}", 2).ok, false);
  assert.equal(importPlannerJson(validJson, 262_145).ok, false);
}

// CSV cells quote special characters and neutralize spreadsheet formulas in text.
{
  assert.equal(csvCell('a,"b"'), '"a,""b"""');
  assert.equal(csvCell("a,b"), '"a,b"');
  assert.equal(csvCell("a\nb"), '"a\nb"');
  assert.equal(csvCell("=SUM(A1:A2)"), "'=SUM(A1:A2)");
  assert.equal(csvCell("\t=SUM(A1:A2)"), "'\t=SUM(A1:A2)");
  assert.equal(csvCell("-not-a-number"), "'-not-a-number");
  assert.equal(csvCell(-12.5), "-12.5");
}

// Money drafts preserve decimals, treat an empty draft as zero, and clamp external values.
{
  assert.equal(normalizeMoneyDraft("$1,234.56", 0), 1234.56);
  assert.equal(normalizeMoneyDraft("", 0), 0);
  assert.equal(normalizeMoneyDraft("75.25", 0, 50), 50);
  assert.equal(normalizeMoneyDraft(String(18.75), 0, 100), 18.75);
  assert.equal(normalizeMoneyDraft("-5", 0, 100), 0);
}

console.log("All planner-transfer tests passed.");
