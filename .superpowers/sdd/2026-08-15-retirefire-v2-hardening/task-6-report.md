# Task 6: Current-Year Roth Conversion Estimate

## Outcome

Implemented a tax-year 2026 Roth conversion estimator that calculates regular
federal income tax progressively before and after one proposed conversion. The
contract accepts filing status, current federal taxable income, desired
conversion, and traditional balance; caps the conversion at the available
balance; returns an explicit validation failure for invalid inputs; and makes no
lifetime-savings estimate.

## Official IRS research evidence

All tax parameters were verified against official IRS material on 2026-08-15.
No third-party tax source was used.

- **Primary authority:** **Revenue Procedure 2025-32**
  - URL: https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
  - Source status date: parameters are stated as in effect on 2025-10-09.
  - Effective period: section 5.02 states that section 4 applies to taxable
    years beginning in 2026; the code record uses `2026-01-01` as the effective
    date.
  - Section 4.01 provides every supported ordinary-income bracket and section
    4.14 provides the basic, dependent, and aged/blind standard-deduction
    amounts.
- **Published bulletin:** **Internal Revenue Bulletin: 2025-45**
  - URL: https://www.irs.gov/irb/2025-45_IRB
  - This is the official bulletin publication of Revenue Procedure 2025-32.
- **IRS announcement:** **IRS releases tax inflation adjustments for tax year
  2026, including amendments from the One, Big, Beautiful Bill**
  - URL: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
  - Published as IR-2025-103 on 2025-10-09; it corroborates the 2026 base
    standard deductions and single/joint thresholds.
- **Current IRS cross-check:** **Federal income tax rates and brackets**
  - URL: https://www.irs.gov/filing/federal-income-tax-rates-and-brackets
  - Last reviewed or updated by the IRS on 2026-07-27; it explains progressive
    bracket layering and directs readers to the official 2026 rates.

Verified 2026 upper bracket thresholds (the final 37% bracket is unbounded):

| Filing status | 10% | 12% | 22% | 24% | 32% | 35% |
|---|---:|---:|---:|---:|---:|---:|
| Single | $12,400 | $50,400 | $105,700 | $201,775 | $256,225 | $640,600 |
| Married filing jointly / qualifying surviving spouse | $24,800 | $100,800 | $211,400 | $403,550 | $512,450 | $768,700 |
| Married filing separately | $12,400 | $50,400 | $105,700 | $201,775 | $256,225 | $384,350 |
| Head of household | $17,700 | $67,450 | $105,700 | $201,750 | $256,200 | $640,600 |

Verified 2026 basic standard deductions are $16,100 for single and married
filing separately, $32,200 for married filing jointly and qualifying surviving
spouse, and $24,150 for head of household. Revenue Procedure 2025-32 also gives
the dependent minimum of $1,350, the dependent earned-income increment of $450,
the aged/blind additional amount of $1,650, and the increased $2,050 aged/blind
amount for an unmarried taxpayer who is not a surviving spouse. These fixtures
are recorded even though the calculator accepts taxable income already after
deductions and therefore does not subtract a deduction again.

## Changes and files

- `src/lib/federal-tax.ts` (new)
  - Added the deeply frozen, versioned 2026 IRS parameter record with exact
    source titles, URLs, effective date, source-as-of date, and verification
    date.
  - Added `estimateFederalIncomeTax(input): FederalTaxEstimate`, progressive
    bracket traversal, balance capping, currency rounding, and an explicit
    success/failure union.
  - Successful results return taxable income and federal tax before/after,
    desired/applied conversion, incremental tax, effective conversion rate,
    remaining traditional balance, the selected basic standard deduction, and
    exclusions.
- `src/lib/federal-tax.test.ts` (new)
  - Added hand-derived literal fixtures for every 2026 filing-status bracket,
    every base standard deduction, dependent and aged/blind adjustments,
    runtime immutability, zero conversion, a three-layer bracket crossing,
    conversion above balance, unsupported contracts, negative/non-finite
    inputs, and addition overflow.
- `src/lib/planning-tools.ts` / `src/lib/planning-tools.test.ts`
  - Replaced the old marginal-rate/multiyear Roth contract with the governed
    2026 estimator and added planning-level success and invalid-input
    regressions.
- `src/components/calculators/PlanningTools.tsx`
  - Replaced years and marginal-rate fields with filing status, 2026 taxable
    income after deductions, desired conversion, and traditional balance.
  - Shows current-year taxable income and tax before/after, applied conversion,
    incremental tax, effective rate, remaining balance, cap disclosure,
    exclusions, and the registry-derived methodology version.
- `src/app/methodology/page.tsx`
  - Added the current-year formula, deduction treatment, direct IRS source,
    effective period, registry-derived version, and explicit exclusions.
- `src/lib/calculation-registry.ts` /
  `src/lib/calculation-registry.test.ts`
  - Promoted Roth methodology `1.0.0` to active, added the direct IRS Revenue
    Procedure source, and aligned assumptions/exclusions with the estimator.
- `src/app/calculators/[planningTool]/page.tsx` /
  `src/app/calculators/page.tsx`
  - Removed contradictory multiyear framing from user-visible route and index
    copy.
- `package.json`
  - Added the federal-tax suite to `test:calc`.

No analytics event or payload was added or changed. Exact income, conversion,
balance, and tax values remain client-side.

## Local Next.js 16 documentation read

- `node_modules/next/dist/docs/index.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - Confirmed the App Router page convention used by the methodology and
    planning-tool routes.
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
  - Kept the static methodology as a Server Component and interactive input
    state inside the existing focused Client Component.
- `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
  - Preserved server-only metadata exports while updating route descriptions.

## RED / GREEN evidence

### Initial bracket and planning RED

Commands:

```text
npx tsx src/lib/federal-tax.test.ts
npx tsx src/lib/planning-tools.test.ts
```

Observed failures:

```text
AssertionError [ERR_ASSERTION]: progressive federal tax estimator is absent
```

```text
Expected values to be strictly deep-equal:
actual: { converted: NaN, estimatedFederalTax: NaN, remainingPretax: NaN }
expected: the new successful 2026 progressive-tax contract
```

The first failure proved the progressive estimator did not exist. The second
proved that sending the new contract to the legacy marginal-rate/multiyear
implementation produced invalid `NaN` output.

### Focused GREEN

Commands:

```text
npx tsx src/lib/federal-tax.test.ts
npx tsx src/lib/planning-tools.test.ts
```

Observed output:

```text
All federal-tax checks passed.
All planning-tool checks passed.
```

### Review RED / GREEN

- Runtime immutability failed first because the initial `as const` record was
  not frozen (`Object.isFrozen(FEDERAL_TAX_PARAMETERS) === false`); deep freeze
  made the focused suite pass.
- Registry governance failed first with `0.1.0 !== 1.0.0`; the active 1.0.0
  methodology and direct IRS source made the registry suite pass.
- Source-completeness/overflow additions failed first for missing verification
  metadata and source details; adding the direct PDF metadata, all
  standard-deduction adjustments, and finite-sum validation made both focused
  suites pass.

## Final verification

The first sandboxed attempt was blocked because `tsx` could not create its IPC
socket (`listen EPERM .../tsx-501/...pipe`). The unchanged command was rerun
outside that sandbox restriction and produced readable evidence:

```text
npx tsx src/lib/federal-tax.test.ts &&
npx tsx src/lib/planning-tools.test.ts &&
npm run test:content &&
npm run lint &&
npx tsc --noEmit &&
npm run test:calc &&
git diff --check
```

Exit 0. Observed results:

- Federal-tax checks passed.
- Planning-tool checks passed.
- All 15 decision-page content checks passed.
- ESLint passed with no output.
- TypeScript passed with no output.
- Complete calculator suite passed: calculations, Monte Carlo, coast tables,
  scenario metrics, federal tax, planning tools, retirement checkup, planner
  state, planner transfer, and calculation registry.
- `git diff --check` passed with no output.

## Self-review

- The crossing-bracket case is independently hand-derived: for a single filer,
  $49,000 taxable income plus a $60,000 conversion adds $168 at 12%, $12,166 at
  22%, and $792 at 24%, for $13,126 incremental federal tax. The test does not
  reuse estimator helpers.
- Tax before and tax after both use the same progressive traversal; no entire
  conversion is taxed at one marginal rate.
- A requested conversion above the traditional balance uses the available
  balance, reports that it was limited, and never makes the remaining balance
  negative.
- Negative, non-finite, unsupported-year, unsupported-status, and overflow
  inputs return `ok: false` with messages and exclusions; they never return a
  plausible partial amount or `NaN`.
- Current taxable income is explicitly defined as after deductions, preventing
  the standard deduction from being subtracted twice. The fully-taxable
  conversion assumption is visible in registry methodology.
- Outputs and copy are current-year only. There is no lifetime-savings field or
  claim, and multiyear optimization is explicitly excluded.
- The UI derives methodology version from the registry. No financial values are
  sent to analytics and analytics code was untouched.

## Concerns

- No blocking concern. This remains an educational regular-federal-income-tax
  estimate. Users with nondeductible IRA basis, itemized/age/dependent deduction
  differences, capital gains, credits, ACA/IRMAA interactions, state tax, AMT,
  NIIT, or other excluded circumstances need a fuller tax calculation.

## Review fix — Round 1

### Findings addressed

- Replaced prototype-chain membership validation with an own-property check.
  Runtime inputs using `__proto__`, `constructor`, or `toString` now return
  `ok: false` with a filing-status error and never reach bracket traversal or
  throw.
- Added the explicit returned exclusion: “Nondeductible IRA or plan basis and
  pro-rata treatment; the estimate assumes the entire applied conversion is
  taxable.” The calculator renders both that exclusion and a direct fully
  taxable assumption sentence; the calculation registry mirrors it.
- Froze `FEDERAL_TAX_EXCLUSIONS` at runtime. Because the array contains only
  immutable strings, a shallow runtime freeze fully protects the shared value;
  tests prove `push` throws and cannot contaminate later estimates.
- Changed the effective conversion rate for a zero applied conversion from `0`
  to `null`, because the ratio is undefined rather than 0%. The primary UI maps
  `null` to `N/A`, and methodology now documents the zero-conversion convention.
- Bumped the governed Roth methodology version from `1.0.0` to `1.0.1` for the
  validation/disclosure and zero-rate contract correction. UI methodology copy
  continues to derive the version from the registry.

### IRS basis/pro-rata evidence

The review wording was verified on 2026-08-15 against official IRS material:

- **Publication 590-A (2025)** —
  https://www.irs.gov/pub/irs-pdf/p590a.pdf
  - “Converting From Any Traditional IRA Into a Roth IRA” explains that part or
    all of a traditional-IRA conversion may be included in gross income and
    that a return of traditional-IRA basis is not included.
- **About Publication 590-A, Contributions to Individual Retirement
  Arrangements (IRAs)** —
  https://www.irs.gov/forms-pubs/about-publication-590-a
  - The IRS current-revision page was last reviewed or updated 2026-03-30.
- **Instructions for Form 8606 (2025)** —
  https://www.irs.gov/instructions/i8606
  - Identifies nondeductible traditional-IRA contributions, distributions when
    basis exists, and Roth conversions as Form 8606 reporting/calculation uses.

The estimator does not collect basis or perform Form 8606 allocation, so it
retains the conservative “entire applied conversion is taxable” assumption and
now discloses the omitted basis/pro-rata treatment in every returned result and
the visible calculator.

### RED evidence

Root-cause reproduction before code changes:

```text
npx tsx -e '<call estimateFederalIncomeTax for __proto__, constructor, toString>'
```

Observed for all three values:

```text
TypeError: brackets is not iterable
```

Focused RED commands:

```text
npx tsx src/lib/federal-tax.test.ts
npx tsx src/lib/planning-tools.test.ts
npx tsx src/lib/calculation-registry.test.ts
```

Observed failures:

```text
Federal tax: Object.isFrozen(FEDERAL_TAX_EXCLUSIONS) was false.
Planning tools: returned exclusions omitted the nondeductible-basis/pro-rata disclosure.
Registry: Roth exclusions omitted the governed nondeductible-basis/pro-rata disclosure.
```

The own-property status regression was also protected with `assert.doesNotThrow`
plus `ok: false` and filing-status-error assertions for each prototype-chain
name. The zero-conversion golden result independently changed its expected
effective rate from `0` to `null`.

The methodology-version regression was then changed to `1.0.1` and failed
before the scoped registry bump:

```text
AssertionError: '1.0.0' !== '1.0.1'
```

### GREEN and verification evidence

Focused GREEN:

```text
npx tsx src/lib/federal-tax.test.ts
All federal-tax checks passed.

npx tsx src/lib/planning-tools.test.ts
All planning-tool checks passed.

npx tsx src/lib/calculation-registry.test.ts
All calculation-registry tests passed.
```

The initial combined final-verification invocation was interrupted after an
unusually long wait and produced no usable completion evidence. Following the
bounded-wait instruction, every required command was rerun individually:

```text
npx tsx src/lib/federal-tax.test.ts        — exit 0
npx tsx src/lib/planning-tools.test.ts     — exit 0
npm run test:content                       — exit 0; 15 checks passed
npm run lint                               — exit 0
npx tsc --noEmit                           — exit 0
npm run test:calc                          — exit 0; all 10 suites passed
git diff --check                           — exit 0
```

The full calculator run covered calculations, Monte Carlo, coast tables,
scenario metrics, federal tax, planning tools, retirement checkup, planner
state, planner transfer, and calculation registry.

### Self-review and concerns

- Mutation check: inherited object-property names, removing the own-property
  guard, unfreezing exclusions, removing the basis exclusion, or restoring the
  zero rate to numeric `0` each fail a focused behavioral assertion.
- The rendered-calculator regression uses React server rendering of the real
  component and asserts user-visible disclosure, rather than grepping source
  text.
- No analytics code or payload changed; financial inputs and results remain
  client-side.
- No blocking concern remains. The estimator still intentionally excludes
  actual Form 8606 basis allocation and applicable plan-basis treatment.
