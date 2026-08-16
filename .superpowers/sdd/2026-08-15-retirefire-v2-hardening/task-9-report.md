# Task 9: SEPP Calculator Page in Review-Pending Mode

## Outcome

Implemented a review-gated public SEPP methodology preview. The static server
page exposes Notice 2022-6 methodology, example inputs, official source links,
visible limitations, and planning alternatives. The interactive client form
never renders an annual or periodic payment amount.

`seppUiModel(registryStatus, inputs)` is the fail-closed UI boundary. It enters
`phase: "review_pending"` only when the registry status is exactly
`blocked_external_review`. Unknown or runtime-invalid statuses fail closed to
`phase: "unavailable"`. In every case `paymentOutput` is `null`.

Preserved and completed interrupted uncommitted work rather than starting over.
Navigation wording is `SEPP methodology preview — validation pending`. Sitemap
`lastModified` is `2026-08-15`. The registry remains
`blocked_external_review` with blank external sign-off.

This report does not claim professional validation, certification, or completed
external review.

## RED / GREEN evidence

The UI-model tests already existed in the interrupted work. To confirm
trustworthy RED evidence without deleting valid implementation, the
`seppUiModel` export was temporarily hidden (`seppUiModelHiddenForRedEvidence`,
unexported) and the existing test was rerun.

### RED

```text
npx tsx src/lib/sepp.test.ts
TypeError: (0 , import_SeppCalculator.seppUiModel) is not a function
    at assert (.../src/lib/sepp.test.ts:392:24)
```

The failure occurred at the blocked-status assertion that requires the public
`seppUiModel` export. That is the expected missing-model RED.

The export and call site were then restored unchanged.

### GREEN

```text
npx tsx src/lib/sepp.test.ts
All SEPP checks passed; external review remains pending.
```

The restored model:

- returns `phase: "review_pending"` only for `blocked_external_review`;
- classifies recognized versus invalid example inputs without exposing payment;
- returns `phase: "unavailable"` and `paymentOutput: null` for `active`,
  `reviewed`, `""`, `null`, and `undefined` statuses;
- keeps malformed blocked inputs in review-pending with `inputState: "invalid"`;
- stringifies without `11049.72` and without `IRS-approved calculator`.

## Files changed

- `src/components/calculators/SeppCalculator.tsx`
  - Exports `seppUiModel` and the interactive client form. Hooks are
    unconditional. Layouts are responsive with no fixed minimum widths. Numeric
    payment output is never included in the model or rendered.
- `src/app/calculators/72t-sepp/page.tsx`
  - Static Server Component with metadata, breadcrumbs, JSON-LD, visible
    limitations, official Notice 2022-6 and related IRS links, alternatives
    including Roth as a link only, and the gated client preview.
- `src/app/calculators/page.tsx`
  - Hub entry titled `SEPP methodology preview — validation pending`.
- `src/app/sitemap.ts`
  - Adds `/calculators/72t-sepp` with `lastModified: 2026-08-15`.
- `src/lib/calculation-registry.ts`
  - Adds the official Notice 2022-6 source. Status remains
    `blocked_external_review`.
- `src/lib/calculation-registry.test.ts`
  - Asserts blocked status and the Notice 2022-6 source URL.
- `src/lib/sepp.test.ts`
  - Adds `seppUiModel` tests for blocked, unknown, and malformed inputs, no
    payment leak, and no “IRS-approved calculator” claim.
- `.superpowers/sdd/2026-08-15-retirefire-v2-hardening/task-9-report.md`
  - This report.

`RETIREFFIRE_V2_TASK9_CONTINUATION.md` is not committed.

## Final bounded verification

Each check was run separately.

```text
npx tsx src/lib/sepp.test.ts
All SEPP checks passed; external review remains pending.
exit 0

npx tsx src/lib/calculation-registry.test.ts
All calculation-registry tests passed.
exit 0

npm run test:content
All 15 decision-page checks passed.
exit 0

npm run lint
exit 0; ESLint reported no errors or warnings.

npx tsc --noEmit
exit 0; no diagnostics.

npm run test:calc
All calculation, Monte Carlo, coast-table, scenario-metric, federal-tax,
retirement-income, planning-tool, retirement-checkup, planner-state,
planner-transfer, SEPP, and calculation-registry checks passed.
exit 0

npm run build
exit 0
Next.js 16.2.12 compiled successfully. `/calculators/72t-sepp` prerendered as
static content (○). Google Fonts / Geist fetch did not block this build.

git diff --check
exit 0; no whitespace errors.
```

## Gate status

- Registry status: `blocked_external_review`
- Calculation external-review status: `pending`
- Calculation actionable flag: `false` (unchanged; UI never consumes payment)
- Fixed-annuitization availability: unavailable
- Joint-table availability: unavailable
- External reviewer engaged: no
- Reviewer/date/sign-off fields: blank
- Public page: methodology preview only; no actionable payment output

## Self-review

- Completeness: the page has breadcrumbs, metadata, visible limitations,
  official Notice 2022-6 / FAQ / Pub. 590-B / T.D. 9930 links, alternatives,
  and a client form whose outputs are gated by registry status. Navigation
  wording and sitemap date match the binding instruction.
- Quality: the page follows existing calculator-page patterns (`pageMeta`,
  `Breadcrumbs`, `JsonLd`, `MoneyInput`, `Input`). The server page stays a
  Server Component; interactivity is isolated in the client module.
- YAGNI: no payment-rendering path, no analytics of exact financial values, no
  new formula, no Select primitive, and no change to Task 8 core formulas.
- Testing: the UI-model tests prove blocked/unknown/malformed fail-closed
  behavior and assert the known RMD golden payment never appears in the model.
- Safety copy: limitations disclose pre-2022 fail-closed, September 2026 rate
  coverage, unavailable 2022 fixed-method lookbacks, §2.04 as the
  modification/recapture citation, and that `firstDistributionDate` remains
  the modification-period anchor. Roth appears only as an alternative link.
- “Last reviewed” language was avoided on the public page so the dated
  methodology record cannot be read as completed professional review.

## Remaining concerns

- Fixed annuitization and the Joint and Last Survivor Table remain unavailable.
  The static rate ledger still ends at 2026-08, so first-payment months after
  2026-09 continue to fail closed.
- Passing local checks is not professional tax review and does not authorize a
  distribution. The external-review gate and blank sign-off must be preserved.

## Review fix — Round 1

### Outcome

Resolved the two Important quality-review findings without adding a Server
Action or changing Task 8 formulas.

- Moved `SeppUiModel` and `seppUiModel` to `src/lib/sepp-ui-model.ts`.
- Stopped classifying example inputs with `calculateSepp`. The model now uses
  a shallow structural check: a non-null object with a finite balance,
  `YYYY-MM-DD`-shaped date strings, and a present method is `recognized`.
- `SeppCalculator.tsx` is the form/view only. It does not import `@/lib/sepp`
  or `calculateSepp`, and it does not re-export `seppUiModel`.
- Tests still call `calculateSepp` to prove the RMD and amortization golden
  payments exist, then prove the UI model returns `paymentOutput: null` and
  does not leak `11049.72` or `21101.63`. A structurally complete 99%
  amortization example remains `recognized` even though the core rejects it,
  so the UI model cannot act as a rate-ceiling oracle.

Registry status remains `blocked_external_review`. External review remains
`pending`. Successful core results remain `actionable: false`.

### RED / GREEN evidence

Tests were pointed at `./sepp-ui-model` and the amortization / no-oracle
assertions were added before the new module existed:

```text
npx tsx src/lib/sepp.test.ts
Error: Cannot find module './sepp-ui-model'
```

After adding the lib module and stripping the client engine import:

```text
npx tsx src/lib/sepp.test.ts
All SEPP checks passed; external review remains pending.
```

### Files changed

- `src/lib/sepp-ui-model.ts` — new fail-closed UI model; no engine import.
- `src/components/calculators/SeppCalculator.tsx` — form/view only.
- `src/lib/sepp.test.ts` — lib import, amortization leak, over-ceiling
  recognized-shape lock.
- `.superpowers/sdd/2026-08-15-retirefire-v2-hardening/task-9-report.md`
  — this appendix.

### Bounded verification

```text
npx tsx src/lib/sepp.test.ts
All SEPP checks passed; external review remains pending.

npx tsx src/lib/calculation-registry.test.ts
All calculation-registry tests passed.

npm run test:content
All 15 decision-page checks passed.

npm run lint
exit 0; ESLint reported no errors or warnings.

npx tsc --noEmit
exit 0; no diagnostics. Ran again after test:calc; exit 0.

npm run test:calc
All calculation, Monte Carlo, coast-table, scenario-metric, federal-tax,
retirement-income, planning-tool, retirement-checkup, planner-state,
planner-transfer, SEPP, and calculation-registry checks passed.

git diff --check
exit 0; no whitespace errors.
```

`npm run build` was not rerun; lint and TypeScript were clean after the
client/lib split.

### Self-review

- Completeness: both Important findings are closed. Existing
  blocked/unknown/malformed/no-IRS-approved assertions remain.
- Quality: the client bundle no longer pulls `sepp.ts` or `sepp-rates.ts`.
- YAGNI: no Server Action, no new UI primitive, no analytics, no formula
  change.
- Testing: the over-ceiling case fails if `seppUiModel` is later wired back
  to `calculateSepp`.
