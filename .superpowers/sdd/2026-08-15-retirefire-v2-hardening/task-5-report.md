# Task 5: Historical Results UI With an Explicit Data Gate

## Changes

- Added `HistoricalScenarioPanel` with accessible loading, unavailable, error, and verified-result states.
- Added the pure `historicalPanelModel(status, result)` contract. The unverified status always takes precedence over a supplied successful result, so no success percentage can leak before provenance is verified.
- Rendered the panel on the Years to FIRE and Coast FIRE calculators. It reads the Task 4 public metadata statically and performs no fetch or historical calculation while production status is `unverified_source_blocked`.
- Added the historical-scenarios methodology section, including the cycle denominator, beginning-of-year withdrawals, real-dollar outcomes, verification gate, and non-probability disclosure.
- Added the requested behavioral contract test with hand-derived values: `67%` and `2 of 3 historical cycles lasted the full horizon.`

## Files

- `src/components/calculators/HistoricalScenarioPanel.tsx` (new)
- `src/components/calculators/YearsToFireCalculator.tsx`
- `src/components/calculators/CoastFireCalculator.tsx`
- `src/app/methodology/page.tsx`
- `src/lib/historical-scenarios.test.ts`

## Next.js documentation read

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - Kept the interactive calculator boundary unchanged; the panel has no hooks and its metadata/result inputs are serializable.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
  - Used the existing Tailwind utility convention with responsive layouts and no fixed minimum width in the new panel.
- `node_modules/next/dist/docs/03-architecture/accessibility.md`
  - Used a labelled section and `status`/`alert` semantics for non-ready states.

## RED / GREEN

RED command:

```text
npx tsx src/lib/historical-scenarios.test.ts
```

Observed RED output:

```text
Error: Cannot find module '../components/calculators/HistoricalScenarioPanel'
```

This was the expected missing-module failure: the new panel model did not yet exist.

GREEN command:

```text
npx tsx src/lib/historical-scenarios.test.ts
```

Observed GREEN output:

```text
All historical-scenarios tests passed.
```

## Verification

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npx tsx src/lib/historical-scenarios.test.ts` — passed.
- `npx tsx src/lib/calculations.test.ts` — passed.
- `npx tsx src/lib/monte-carlo.test.ts` — passed.
- `npx tsx src/lib/coast-tables.test.ts` — passed.
- `npx tsx src/lib/scenario-metrics.test.ts` — passed.
- `npx tsx src/lib/planning-tools.test.ts` — passed.
- `npx tsx src/lib/retirement-checkup.test.ts` — passed.
- `npx tsx src/lib/planner-state.test.ts` — passed.
- `npx tsx src/lib/planner-transfer.test.ts` — passed.
- `npx tsx src/lib/calculation-registry.test.ts` — passed.
- `npm run test:content` — passed.
- `git diff --check` — passed.
- `npm run build` / `npx next build` — blocked by the environment: Next could not fetch the existing `Geist` and `Geist Mono` Google fonts. Turbopack reported two font-fetch errors; no Task 5 code error was reported.

## Self-review

- The production metadata status is `unverified_source_blocked`; both calculator instances therefore render only the unavailable state and never receive or calculate a historical result.
- The pure model gates on unverified status before examining the result, and the test supplies an otherwise successful result to prove the percentage is suppressed.
- Ready-state copy explicitly contains the denominator, beginning-of-year withdrawal timing, real-dollar label, methodology link, and the required non-probability disclosure.
- The panel has no hooks, adds no analytics, and uses responsive `sm:` grid utilities without fixed minimum widths.

## Concerns

- A production build needs outbound access to Google Fonts (or a project-level font fallback) to complete in this environment. This is a pre-existing build dependency outside Task 5.
