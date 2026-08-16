import {
  PLANNER_SCHEMA_VERSION,
  parsePlannerState,
  type PlannerState,
  type PlannerStateIssue,
} from "@/lib/planner-state";
import { calculationVersion } from "@/lib/calculation-registry";

export const MAX_PLANNER_IMPORT_BYTES = 256 * 1024;

const PLANNER_CALCULATION_IDS = ["fire", "years", "coast", "barista"] as const;

export type PlannerImportResult =
  | { ok: true; state: PlannerState; issues: [] }
  | { ok: false; issues: PlannerStateIssue[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function importIssue(field: string, message: string): PlannerImportResult {
  return { ok: false, issues: [{ field, message }] };
}

/** Export only client planner inputs and version metadata needed for a safe future import. */
export function exportPlannerJson(state: PlannerState): string {
  const parsed = parsePlannerState(state);
  if (!parsed.ok) throw new Error("Cannot export an invalid planner state");

  return JSON.stringify({
    schemaVersion: PLANNER_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    calculationVersions: Object.fromEntries(
      PLANNER_CALCULATION_IDS.map((id) => [id, calculationVersion(id)]),
    ),
    state: parsed.state,
  });
}

/** Parse a size-limited, current-version planner export without throwing. */
export function importPlannerJson(text: string, byteLength: number): PlannerImportResult {
  if (byteLength > MAX_PLANNER_IMPORT_BYTES) {
    return importIssue("file", "planner import must be 256 KiB or smaller");
  }

  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return importIssue("file", "planner import is not valid JSON");
  }

  if (!isRecord(value)) {
    return importIssue("file", "planner import must be an object");
  }
  if (value.schemaVersion !== PLANNER_SCHEMA_VERSION) {
    return importIssue("schemaVersion", "planner import has an unsupported schema version");
  }

  return parsePlannerState(value.state);
}

/** Quote CSV values and prevent spreadsheet programs from evaluating untrusted text as formulas. */
export function csvCell(value: string | number): string {
  const text = typeof value === "string" && /^[\t\r ]*[=+\-@]/.test(value) ? `'${value}` : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
