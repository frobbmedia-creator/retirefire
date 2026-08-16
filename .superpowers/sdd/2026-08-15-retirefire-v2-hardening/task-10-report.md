# Task 10: V2 Risk Education and Responsive Experience Polish

## Outcome

Added calculator-page risk education and responsive polish without new financial
formulas. Standard calculator pages now show a compact methodology/disclaimer
strip next to results, then the shared hub, then six evidence-linked failure
modes (healthcare, housing, sequence, taxes, longevity, lifestyle). Scenario
Compare no longer uses a 640px table minimum: stacked cards render below `sm`,
and pin/clear controls are 44px. The homepage quick calculator reuses
`MoneyInput` and shows years only when `calculateYearsToFire` inputs are
present. Barista status is text plus icon, with the existing numeric
interpretation kept.

No paid-plan, SEPP, historical-provenance, or formula-registry changes.

## RED / GREEN evidence

### RED

Content tests were extended first. `npm run test:content` failed on the new
adjacent-methodology invariant before any UI copy or `FailureModes` file
existed:

```text
npm run test:content

All 15 decision-page checks passed.

AssertionError [ERR_ASSERTION]: Assumptions and methodology links must appear adjacent to consequential calculator results, not only after the SEO article.
    at assert (.../src/content/decision-pages.test.ts:112:8)
  expected: /\/methodology/
  operator: 'match'
```

That is the expected missing-link RED. The layout still had methodology only
after the SEO article.

The first draft of the test used `indexOf("CalculatorSeoSection")`, which
matched the import. After the UI landed, the marker was changed to
`lastIndexOf("<CalculatorSeoSection")` so the assertion inspects the results
region rather than the import line. The original RED already proved the footer
link was not adjacent.

### GREEN

```text
npm run test:content
All 15 decision-page checks passed.
Calculator-page content invariants passed.
exit 0
```

`shouldShowQuickYears` stays false when only a FIRE target exists or when
portfolio and contribution are both zero. It becomes true only when the
existing `calculateYearsToFire` inputs can actually project.

## Files changed

- `src/content/decision-pages.test.ts`
  - Scans calculator-page copy for `safe retirement`, `IRS-approved calculator`,
    `probability of future success`, and unnegated `guaranteed`.
  - Requires an adjacent `/methodology` link and `FailureModes` before the SEO
    article.
  - Requires the six named failure modes plus the sequence-risk and methodology
    links.
  - Gates homepage years with `shouldShowQuickYears`.
- `src/components/calculators/FailureModes.tsx`
  - New static server component. Links existing internal guides plus official
    IRS Pub. 590-A and SSA delayed-retirement pages. No new formulas.
- `src/components/calculators/CalculatorPageLayout.tsx`
  - Compact methodology/disclaimer strip immediately above the hub.
  - Mounts `FailureModes` after the hub and before the SEO article.
  - Keeps the existing footer links.
- `src/components/home/HomeQuickCalculator.tsx`
  - Reuses `MoneyInput` for spending, optional portfolio, and optional savings.
  - Documents the real-return input. Years render only when
    `shouldShowQuickYears` is true.
  - Adjacent methodology/disclaimer links and a text interpretation of the
    FIRE number.
- `src/components/calculators/ScenarioCompare.tsx`
  - Removes `min-w-[640px]`.
  - Stacked comparison cards below `sm`; table from `sm` up.
  - Pin/clear buttons are `h-11` / `min-h-11`.
  - Deltas use icon plus “Higher” / “Lower” / “Unchanged” text, not color
    alone.
  - Adjacent textual summary of FIRE number and years movement.
- `src/components/calculators/BaristaFireCalculator.tsx`
  - Status is text plus icon (already there / unreachable / years).
  - Keeps the existing barista interpretation.
  - Healthcare/housing/tax caveats point at `#failure-modes` and methodology.
- `.superpowers/sdd/2026-08-15-retirefire-v2-hardening/task-10-report.md`
  - This report.

`RETIREFFIRE_V2_TASK9_CONTINUATION.md` is not committed.

## Next.js documentation read

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - `FailureModes` and `CalculatorPageLayout` stay Server Components. Client
    interactivity remains in existing `"use client"` calculators.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - No new App Router pages. Existing calculator routes continue to compose
    `CalculatorPageLayout`.

## Verification

Each check was run separately.

```text
npm run test:content
All 15 decision-page checks passed.
Calculator-page content invariants passed.
exit 0

npm run lint
exit 0; ESLint reported no errors or warnings.

npx tsc --noEmit
exit 0; no diagnostics.

npm run build
exit 0
Next.js 16.2.12 compiled successfully. Google Fonts / Geist fetch did not
block this build.

git diff --check
exit 0; no whitespace errors.
```

## Self-review

- Completeness: the six failure modes are present and linked to existing
  evidence pages. Standard calculator pages get adjacent methodology before
  results. Scenario Compare is usable below 600px. Years are not invented
  from spending and withdrawal rate alone.
- Quality: reused `MoneyInput`, `Input`, `TrackedLink`, `computeScenarioMetrics`,
  `calculateFireNumber`, and `calculateYearsToFire`. No new chart library and
  no new formula module.
- Accessibility: status uses text and icon; new interactive controls are
  44px; chart-like comparison and FIRE/barista results have adjacent text.
- Safety copy: no “guaranteed”, “safe retirement”, “IRS-approved calculator”,
  or “probability of future success”. Historical and SEPP gates were not
  touched.
- Analytics: exact dollar, rate, age, and account values stay client-side.
  Methodology/disclaimer clicks still use the existing categorical actions.
- YAGNI: no homepage remount of the unused quick calculator, no custom-page
  rewrite for couples/two-phase/planning tools, no dependency upgrades.

## Remaining concerns

- `HomeQuickCalculator` is still not mounted on the homepage (`src/app/page.tsx`
  only renders `Hero`). The widget was upgraded in place as specified; wiring
  it back onto `/` was out of the listed file set.
- Custom calculator routes that do not use `CalculatorPageLayout` (couples,
  two-phase, planning tools, SEPP preview) do not automatically receive
  `FailureModes`. Content tests still ban the prohibited phrases in those
  files.
- Existing `SensitivityStrip` chips remain shorter than 44px. This task did
  not add those controls; new pin/clear and methodology links meet the target.
- Existing npm audit findings (3 moderate / 3 high) were left unchanged.
