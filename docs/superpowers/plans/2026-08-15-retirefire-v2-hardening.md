# RetireFire V2 Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the defensible RetireFire V2 improvements into the existing application and establish tested, versioned governance for consequential financial calculations.

**Architecture:** Existing `src/` components and shared planner APIs remain authoritative. New pure modules own validation, historical scenarios, tax-year calculations, SEPP calculations, and methodology metadata; client components consume those modules and never duplicate formulas. Features whose authoritative data or external review is unavailable render an explicit unavailable/beta state rather than fabricated results.

**Tech Stack:** Next.js 16.2 App Router, React 19, TypeScript 5, Tailwind CSS 4, Node assertion-based tests executed through `tsx`.

**Spec:** `docs/superpowers/specs/2026-08-15-retirefire-v2-hardening-design.md`

## Global Constraints

- Core calculators remain free forever.
- Do not transmit exact portfolio, income, spending, tax, or age values through analytics.
- Use Next.js 16 conventions documented under `node_modules/next/dist/docs/`.
- Do not represent the V2 CSV as verified Shiller data without reproducible provenance.
- Do not label SEPP results validated until independently reviewed golden cases are recorded.
- Do not deploy, push, publish, change paid-plan gating, or engage an external reviewer without separate authorization.
- New behavior follows red-green-refactor: write and run the failing test before production code.

---

### Task 1: Versioned Planner-State Validation and Persistence

**Files:**
- Create: `src/lib/planner-state.test.ts`
- Modify: `src/lib/planner-state.ts`
- Modify: `src/components/planner/PlannerProvider.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `parsePlannerState(value: unknown): PlannerStateParseResult`
- Produces: `parsePlannerSearchParams(params: URLSearchParams): PlannerSearchResult`
- Produces: `loadPlannerState(storage: Pick<Storage, "getItem">): PlannerStateLoadResult`
- Produces: `savePlannerState(storage: Pick<Storage, "setItem">, state: PlannerState): void`
- Preserves: `stateFromSearchParams` and `stateToQueryString` for current consumers.

- [ ] **Step 1: Write failing schema and URL tests**

Add assertion cases proving that non-finite values, ages outside 18–100, retirement before current age, withdrawal rates outside 0.5–10%, negative money, unknown styles, and incomplete URL scenarios are rejected or normalized with explicit issues. Include a valid round trip:

```ts
const state = { ...PLANNER_DEFAULTS, annualExpenses: 48_000, currentAge: 42 };
const query = stateToQueryString(state);
assert.deepEqual(parsePlannerSearchParams(new URLSearchParams(query)).state, state);
assert.equal(parsePlannerState({ ...state, currentAge: Number.NaN }).ok, false);
assert.equal(parsePlannerState({ ...state, retirementAge: 40 }).ok, false);
```

- [ ] **Step 2: Run the state tests and verify the missing interfaces fail**

Run: `npx tsx src/lib/planner-state.test.ts`

Expected: FAIL because the new parser and persistence interfaces do not exist.

- [ ] **Step 3: Implement the minimal schema, migration, and storage layer**

Add `PLANNER_STORAGE_KEY = "retirefire:planner:v2"`, `PLANNER_SCHEMA_VERSION = 2`, discriminated parse/load results, finite range helpers, v1-to-v2 migration, and guarded JSON persistence. URL parsing must report whether any supported key was supplied and only override storage when the supplied scenario is valid.

- [ ] **Step 4: Verify state tests pass**

Run: `npx tsx src/lib/planner-state.test.ts`

Expected: PASS with a single success line.

- [ ] **Step 5: Write a failing provider initialization test seam**

Extract and test a pure `resolveInitialPlannerState(url, stored)` helper proving precedence `valid URL > valid stored state > defaults`, and proving invalid URL does not destroy valid stored state.

- [ ] **Step 6: Implement hydration-before-persistence**

Update `PlannerProvider` to initialize through the resolver, set a hydration-ready flag, persist only after hydration, and update state on browser history changes without writing a replace loop.

- [ ] **Step 7: Add the state test to `test:calc` and run the full calculator suite**

Run: `npm run test:calc`

Expected: all existing and new calculation scripts pass.

- [ ] **Step 8: Commit the state slice**

```bash
git add src/lib/planner-state.ts src/lib/planner-state.test.ts src/components/planner/PlannerProvider.tsx package.json
git commit -m "feat: validate and persist planner state"
```

### Task 2: Safe Imports, Exports, Feedback, and Money Inputs

**Files:**
- Create: `src/lib/planner-transfer.test.ts`
- Create: `src/lib/planner-transfer.ts`
- Modify: `src/components/planner/AssumptionsBar.tsx`
- Modify: `src/components/ui/money-input.tsx`
- Modify: `src/lib/export-scenario.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `parsePlannerState` from Task 1.
- Produces: `exportPlannerJson(state): string`
- Produces: `importPlannerJson(text, byteLength): PlannerImportResult`
- Produces: `csvCell(value): string` for correct quoting.

- [ ] **Step 1: Write failing transfer tests**

Cover JSON round trips, unsupported versions, malformed JSON, files over 256 KiB, formula-like CSV values, commas, quotes, and newlines:

```ts
assert.equal(csvCell('a,"b"'), '"a,""b"""');
assert.equal(importPlannerJson("{}", 2).ok, false);
assert.equal(importPlannerJson(validJson, 262_145).ok, false);
```

- [ ] **Step 2: Run transfer tests and verify failure**

Run: `npx tsx src/lib/planner-transfer.test.ts`

Expected: FAIL because the transfer module is missing.

- [ ] **Step 3: Implement guarded JSON and CSV helpers**

Use the shared planner schema, include `schemaVersion`, `exportedAt`, and `calculationVersions`, and prefix spreadsheet-formula-leading text cells with an apostrophe before quoting.

- [ ] **Step 4: Verify transfer tests pass**

Run: `npx tsx src/lib/planner-transfer.test.ts`

Expected: PASS.

- [ ] **Step 5: Write a failing controlled-input test**

Extract a pure `normalizeMoneyDraft(raw, min, max)` helper and prove decimals, external value changes, empty values, and bounds behave as specified.

- [ ] **Step 6: Update UI actions and money input**

Add JSON import/export to `AssumptionsBar`, accessible `aria-live` status text for copy/download/import errors, reset confirmation only when state differs from defaults, and `useEffect` synchronization for an externally changed `MoneyInput` value. Keep exact financial values out of analytics.

- [ ] **Step 7: Run transfer, calculator, lint, and type checks**

Run: `npx tsx src/lib/planner-transfer.test.ts && npm run test:calc && npm run lint && npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 8: Commit the transfer slice**

```bash
git add src/lib/planner-transfer.ts src/lib/planner-transfer.test.ts src/components/planner/AssumptionsBar.tsx src/components/ui/money-input.tsx src/lib/export-scenario.ts package.json
git commit -m "feat: harden planner transfer and inputs"
```

### Task 3: Calculation Registry and Privacy-Safe Analytics

**Files:**
- Create: `src/lib/calculation-registry.ts`
- Create: `src/lib/calculation-registry.test.ts`
- Modify: `src/lib/analytics.ts`
- Modify: `src/app/methodology/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `CALCULATION_REGISTRY: readonly CalculationMethod[]`
- Produces: `calculationVersion(id): string`
- Produces: `sanitizeAnalyticsProps(props): AnalyticsProps`

- [ ] **Step 1: Write failing registry and analytics tests**

Require unique IDs, semantic versions, HTTPS sources, ISO effective/review dates, explicit statuses, and rejection of forbidden analytics keys such as `portfolio`, `income`, `spending`, `tax`, and `age`.

- [ ] **Step 2: Run and verify the tests fail**

Run: `npx tsx src/lib/calculation-registry.test.ts`

Expected: FAIL because the registry is missing and analytics does not enforce the privacy allowlist.

- [ ] **Step 3: Implement the registry and analytics allowlist**

Register existing FIRE, years, Coast, Barista, Monte Carlo, and planning tools. Add historical, Roth, and SEPP entries with `development`, `beta`, or `blocked_external_review` status as appropriate. Permit analytics properties only from an exported allowlist of categorical operational fields.

- [ ] **Step 4: Render registry metadata on the methodology page**

Add a table showing method, version, status, effective date, last review, next trigger, and source links. Update the omissions section so it does not claim implemented features are absent.

- [ ] **Step 5: Verify tests and content checks**

Run: `npx tsx src/lib/calculation-registry.test.ts && npm run test:content && npm run lint && npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 6: Commit governance**

```bash
git add src/lib/calculation-registry.ts src/lib/calculation-registry.test.ts src/lib/analytics.ts src/app/methodology/page.tsx package.json
git commit -m "feat: add calculation governance registry"
```

### Task 4: Historical Dataset Contract and Scenario Engine

**Files:**
- Create: `src/lib/historical-scenarios.ts`
- Create: `src/lib/historical-scenarios.test.ts`
- Create: `public/data/historical-returns.metadata.json`
- Modify: `package.json`

**Interfaces:**
- Produces: `parseHistoricalCsv(text, metadata): HistoricalDatasetResult`
- Produces: `runHistoricalScenarios(input): HistoricalScenarioResult`
- Produces: `applySequenceStress(cycle, count): HistoricalYear[]`
- Consumes: `realFromNominal` from `src/lib/calculations.ts`.

- [ ] **Step 1: Write failing dataset validation tests**

Prove rejection of duplicate years, gaps, `NaN`, returns at or below -100%, allocations outside 0–1, invalid horizons, missing checksum/provenance, and mismatched metadata coverage.

- [ ] **Step 2: Write failing simulation golden tests**

Use a hand-calculated three-year nominal fixture. Convert stock and bond returns through Fisher, withdraw at the beginning of each year, apply fees, and compare exact real ending balance. Prove that stress reorders whole rows and uses synthetic sequence labels.

- [ ] **Step 3: Run and verify historical tests fail**

Run: `npx tsx src/lib/historical-scenarios.test.ts`

Expected: FAIL because the module is absent.

- [ ] **Step 4: Implement the minimal parser and engine**

Return structured validation errors rather than partial data. Calculate real weighted portfolio returns from nominal asset returns and CPI. Return methodology version, withdrawal timing, cycle count, success count, failure year offset, real ending values, and drawdowns.

- [ ] **Step 5: Add provenance status without mislabeling the ZIP dataset**

Create metadata with status `unverified_source_blocked` and explain that production historical results remain disabled until the series can be reproduced. Do not copy the submitted CSV into a production path.

- [ ] **Step 6: Verify historical and existing calculator tests**

Run: `npx tsx src/lib/historical-scenarios.test.ts && npm run test:calc`

Expected: exit 0.

- [ ] **Step 7: Commit the historical core**

```bash
git add src/lib/historical-scenarios.ts src/lib/historical-scenarios.test.ts public/data/historical-returns.metadata.json package.json
git commit -m "feat: add governed historical scenario engine"
```

### Task 5: Historical Results UI With an Explicit Data Gate

**Files:**
- Create: `src/components/calculators/HistoricalScenarioPanel.tsx`
- Modify: `src/components/calculators/YearsToFireCalculator.tsx`
- Modify: `src/components/calculators/CoastFireCalculator.tsx`
- Modify: `src/app/methodology/page.tsx`

**Interfaces:**
- Consumes: `HistoricalScenarioResult` and dataset provenance status from Task 4.
- Produces: accessible loading, unavailable, error, and populated panel states.

- [ ] **Step 1: Add a failing render-state contract test**

Create an exported pure `historicalPanelModel(status, result)` and assert that unverified data yields an unavailable message with no success percentage, while a verified result yields text summary values.

- [ ] **Step 2: Run and verify failure**

Run: `npx tsx src/lib/historical-scenarios.test.ts`

Expected: FAIL because the panel model does not exist.

- [ ] **Step 3: Implement the accessible panel**

Keep hooks unconditional. Use responsive CSS without fixed minimum width. Include a text summary, methodology link, cycle denominator, beginning-of-year withdrawal label, real-dollar label, and “historical scenarios are not future probabilities” disclosure.

- [ ] **Step 4: Wire the panel in unavailable mode**

Place it on Years and Coast pages, showing the provenance blocker. Do not fetch or calculate with unverified data.

- [ ] **Step 5: Verify lint, types, and build**

Run: `npm run lint && npx tsc --noEmit && npm run build`

Expected: exit 0.

- [ ] **Step 6: Commit the historical UI**

```bash
git add src/components/calculators/HistoricalScenarioPanel.tsx src/components/calculators/YearsToFireCalculator.tsx src/components/calculators/CoastFireCalculator.tsx src/app/methodology/page.tsx
git commit -m "feat: add historical scenario readiness panel"
```

### Task 6: Current-Year Roth Conversion Estimate

**Files:**
- Create: `src/lib/federal-tax.ts`
- Create: `src/lib/federal-tax.test.ts`
- Modify: `src/lib/planning-tools.ts`
- Modify: `src/lib/planning-tools.test.ts`
- Modify: `src/components/calculators/PlanningTools.tsx`
- Modify: `src/app/methodology/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `estimateFederalIncomeTax(input): FederalTaxEstimate`
- Replaces: `rothConversionEstimate` with a tax-year, filing-status, taxable-income, and conversion contract.

- [ ] **Step 1: Write failing bracket-traversal tests**

Use versioned 2026 bracket and standard-deduction fixtures. Test zero conversion, conversion crossing two brackets, conversion above remaining balance, invalid inputs, and the difference between tax before and after conversion.

- [ ] **Step 2: Run and verify failure**

Run: `npx tsx src/lib/federal-tax.test.ts`

Expected: FAIL because progressive tax calculation is absent.

- [ ] **Step 3: Implement the 2026 parameter table and estimator**

Keep parameters in one immutable record with IRS source URL and effective date. Return taxable income before/after, incremental tax, effective rate on conversion, remaining pretax balance, and exclusion strings. Do not calculate lifetime savings.

- [ ] **Step 4: Update the Roth planning tool and copy**

Replace marginal-rate and multiyear inputs with filing status, current taxable income, desired conversion, and traditional balance. Show current-year estimate, explicit exclusions, and methodology version.

- [ ] **Step 5: Verify tax, planning, content, lint, and type tests**

Run: `npx tsx src/lib/federal-tax.test.ts && npx tsx src/lib/planning-tools.test.ts && npm run test:content && npm run lint && npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 6: Commit the Roth slice**

```bash
git add src/lib/federal-tax.ts src/lib/federal-tax.test.ts src/lib/planning-tools.ts src/lib/planning-tools.test.ts src/components/calculators/PlanningTools.tsx src/app/methodology/page.tsx package.json
git commit -m "feat: make Roth estimate current-year and progressive"
```

### Task 7: Social Security and Federal Taxable-Benefit Estimates

**Files:**
- Create: `src/lib/retirement-income.ts`
- Create: `src/lib/retirement-income.test.ts`
- Modify: `src/components/calculators/IncomeGapCalculator.tsx`
- Modify: `src/app/methodology/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `estimateSocialSecurityClaim(input): SocialSecurityEstimate`
- Produces: `estimateTaxableSocialSecurity(input): TaxableSocialSecurityEstimate`

- [ ] **Step 1: Write failing SSA golden and boundary tests**

Test birth-year FRA, monthly early reductions, delayed credits through age 70, rejection below 62 or above 70, and SSA examples for a worker with FRA 67.

- [ ] **Step 2: Write failing provisional-income tests**

Cover single and married-joint lower threshold, upper threshold, and 85% benefit cap using dated federal thresholds.

- [ ] **Step 3: Run and verify failure**

Run: `npx tsx src/lib/retirement-income.test.ts`

Expected: FAIL because the module is missing.

- [ ] **Step 4: Implement versioned estimates and update the income-gap UI**

Use monthly claim ages, clamp delayed credits at 70, and clearly distinguish gross estimated benefit from taxable federal portion. Preserve a manual-income mode for users who already have an SSA estimate.

- [ ] **Step 5: Verify tests, lint, and types**

Run: `npx tsx src/lib/retirement-income.test.ts && npm run lint && npx tsc --noEmit`

Expected: exit 0.

- [ ] **Step 6: Commit retirement income**

```bash
git add src/lib/retirement-income.ts src/lib/retirement-income.test.ts src/components/calculators/IncomeGapCalculator.tsx src/app/methodology/page.tsx package.json
git commit -m "feat: add governed retirement income estimates"
```

### Task 8: Notice 2022-6 SEPP Core and External-Review Gate

**Files:**
- Create: `src/lib/sepp.ts`
- Create: `src/lib/sepp.test.ts`
- Create: `src/lib/sepp-rates.ts`
- Create: `docs/validation/sepp-golden-cases.md`
- Modify: `package.json`

**Interfaces:**
- Produces: `calculateSepp(input): SeppCalculationResult`
- Produces: `getSeppMaximumRate(firstDistributionMonth): SeppRateResult`
- Produces distinct RMD, fixed-amortization, and fixed-annuitization results.

- [ ] **Step 1: Write failing validation and duration tests**

Reject unsupported tables, missing beneficiary age when joint data requires it, invalid dates, invalid balances, and interest above the permitted rate. Test the statutory five-year/age-59½ modification date using calendar dates rather than decimal-age subtraction.

- [ ] **Step 2: Write failing method tests**

Use IRS Notice 2022-6 examples where available and independently hand-computed fixtures for RMD and amortization. Assert that annuitization uses mortality probabilities and does not equal amortization for the same ordinary case.

- [ ] **Step 3: Run and verify failure**

Run: `npx tsx src/lib/sepp.test.ts`

Expected: FAIL because the governed implementation is absent.

- [ ] **Step 4: Implement tables, rate selection, and three distinct methods**

Transcribe permitted life-expectancy and mortality inputs with source citations and checksum-style test totals. Select the greater of 5% or the eligible 120% federal mid-term rates from the two preceding months. Return all inputs, selected sources, method factor, annual payment, and warnings.

- [ ] **Step 5: Verify automated SEPP cases**

Run: `npx tsx src/lib/sepp.test.ts`

Expected: all internal cases pass while external review status remains `pending`.

- [ ] **Step 6: Record the external-review package**

Populate `docs/validation/sepp-golden-cases.md` with inputs, expected results, code results, source references, tolerances, and a blank reviewer/date/sign-off section. This is not a claim of review.

- [ ] **Step 7: Commit the SEPP core**

```bash
git add src/lib/sepp.ts src/lib/sepp.test.ts src/lib/sepp-rates.ts docs/validation/sepp-golden-cases.md package.json
git commit -m "feat: implement governed SEPP calculation core"
```

### Task 9: SEPP Calculator Page in Review-Pending Mode

**Files:**
- Create: `src/components/calculators/SeppCalculator.tsx`
- Create: `src/app/calculators/72t-sepp/page.tsx`
- Modify: `src/app/calculators/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/lib/calculation-registry.ts`

**Interfaces:**
- Consumes: `calculateSepp` from Task 8.
- Obeys: calculation-registry status `blocked_external_review`.

- [ ] **Step 1: Write a failing status-model test**

Add `seppUiModel(registryStatus, inputs)` tests proving that `blocked_external_review` exposes methodology and example inputs but suppresses actionable payment output and uses no “IRS-approved calculator” claim.

- [ ] **Step 2: Run and verify failure**

Run: `npx tsx src/lib/sepp.test.ts`

Expected: FAIL because the UI model is missing.

- [ ] **Step 3: Implement the review-pending page**

Create a static server page with breadcrumbs, metadata, visible limitations, Notice 2022-6 links, alternatives, and an interactive client component whose numeric outputs remain gated by registry status. Use existing UI primitives and responsive layouts.

- [ ] **Step 4: Add navigation and sitemap entries**

Describe the tool as “SEPP methodology preview — validation pending.” Use a current last-modified date.

- [ ] **Step 5: Verify content, lint, type, and build gates**

Run: `npm run test:content && npm run lint && npx tsc --noEmit && npm run build`

Expected: exit 0.

- [ ] **Step 6: Commit the SEPP UI**

```bash
git add src/components/calculators/SeppCalculator.tsx src/app/calculators/72t-sepp/page.tsx src/app/calculators/page.tsx src/app/sitemap.ts src/lib/calculation-registry.ts
git commit -m "feat: add review-gated SEPP methodology page"
```

### Task 10: V2 Risk Education and Responsive Experience Polish

**Files:**
- Create: `src/components/calculators/FailureModes.tsx`
- Modify: `src/components/home/HomeQuickCalculator.tsx`
- Modify: `src/components/calculators/ScenarioCompare.tsx`
- Modify: `src/components/calculators/CalculatorPageLayout.tsx`
- Modify: `src/components/calculators/BaristaFireCalculator.tsx`

**Interfaces:**
- Consumes existing planner and calculation interfaces only.
- Produces no new financial formulas.

- [ ] **Step 1: Add failing content invariants**

Extend content tests to require adjacent methodology links and prohibit absolute claims including `guaranteed`, `safe retirement`, `IRS-approved calculator`, and `probability of future success` on calculator pages.

- [ ] **Step 2: Run and verify content failure**

Run: `npm run test:content`

Expected: FAIL until the new UI copy and links are added.

- [ ] **Step 3: Integrate low-risk V2 improvements**

Add evidence-linked failure modes for healthcare, housing, sequence, taxes, longevity, and lifestyle. Upgrade the homepage quick calculator to reuse `MoneyInput` and show years only when the existing planner inputs support it. Improve Scenario Compare mobile rendering by replacing the 640-pixel table minimum with stacked comparison cards below the `sm` breakpoint.

- [ ] **Step 4: Add accessible feedback and chart summaries**

Ensure status is conveyed by text and icon, interactive controls have 44-pixel mobile targets, and every chart-like result has an adjacent textual interpretation.

- [ ] **Step 5: Verify content, lint, types, and build**

Run: `npm run test:content && npm run lint && npx tsc --noEmit && npm run build`

Expected: exit 0.

- [ ] **Step 6: Commit experience polish**

```bash
git add src/components/calculators/FailureModes.tsx src/components/home/HomeQuickCalculator.tsx src/components/calculators/ScenarioCompare.tsx src/components/calculators/CalculatorPageLayout.tsx src/components/calculators/BaristaFireCalculator.tsx src/content/decision-pages.test.ts
git commit -m "feat: integrate V2 risk and responsive UX"
```

### Task 11: Final Release-Gate Script and Operational Documentation

**Files:**
- Create: `docs/operations/calculation-review.md`
- Create: `docs/validation/retirefire-v2-release-checklist.md`
- Modify: `package.json`
- Modify: `README.md`

**Interfaces:**
- Produces: `npm run verify:v2`

- [ ] **Step 1: Add the complete verification script**

Define:

```json
"verify:v2": "npm run test:calc && npm run test:content && npm run test:support && npm run lint && tsc --noEmit && npm run build"
```

- [ ] **Step 2: Document calculation ownership and review triggers**

Record the local owner role, source-update process, annual tax review, regulatory-change trigger, historical-source extension trigger, privacy constraints, rollback criteria, and how registry status controls UI claims.

- [ ] **Step 3: Create the release checklist**

Include automated gates; manual keyboard and narrow-width checks; analytics payload inspection; historical provenance blocker; SEPP external-review blocker; and explicit deployment/push authorization fields.

- [ ] **Step 4: Run the full fresh verification gate**

Run: `npm run verify:v2`

Expected: exit 0 with all test scripts, lint, TypeScript, and production build passing. If the environment lacks required database variables, run the documented non-mutating build configuration or record the exact blocker rather than claiming success.

- [ ] **Step 5: Inspect the final repository state**

Run: `git status --short && git log --oneline --decorate -12`

Expected: only intentionally uncommitted external-review checklist fields, if any; otherwise clean.

- [ ] **Step 6: Commit operations and verification**

```bash
git add docs/operations/calculation-review.md docs/validation/retirefire-v2-release-checklist.md package.json README.md
git commit -m "chore: add V2 calculation release gates"
```

### Task 12: Final Requirements Audit

**Files:**
- Review: `docs/superpowers/specs/2026-08-15-retirefire-v2-hardening-design.md`
- Review: all files changed by Tasks 1–11.

- [ ] **Step 1: Map every acceptance criterion to evidence**

Create a concise checklist in the task handoff tying each design acceptance criterion to a test command, source file, registry status, or documented external blocker.

- [ ] **Step 2: Re-run the full verification command**

Run: `npm run verify:v2`

Expected: exit 0. Do not reuse Task 11 output.

- [ ] **Step 3: Confirm no unauthorized external action occurred**

Verify that no push, deployment, publication, paid-plan change, or external professional engagement was performed.

- [ ] **Step 4: Report the actual release state**

Distinguish:

- locally implemented and verified;
- present but intentionally unavailable due to historical provenance;
- present but gated pending SEPP professional review;
- requiring separate authorization for push or deployment.

