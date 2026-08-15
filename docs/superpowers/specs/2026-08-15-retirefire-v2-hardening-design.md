# RetireFire V2 Hardening and Integration Design

## Objective

Integrate the useful RetireFire V2 product improvements into the existing RetireFire.net application without overwriting established architecture, while ensuring that every user-visible financial result is reproducible, validated, appropriately disclosed, and operationally maintainable.

## Scope

This project covers:

- Historical retirement scenarios and their source dataset.
- 72(t) substantially equal periodic payment calculations.
- The Roth conversion preview and tax-related estimates.
- Shared calculator input, storage, URL, export, and import behavior.
- V2 interface elements including assumption disclosure, scenario comparison, historical results, risk education, sharing, and static calculator landing pages.
- Automated testing, methodology documentation, analytics, accessibility, and release gates for these additions.

It does not include production deployment, a new authentication system, personalized investment recommendations, tax-return preparation, or a generalized financial-planning platform.

## Integration Strategy

The V2 archive is a proposal and source of components, not an overlay to copy into the repository. Existing `src/` modules and conventions remain authoritative. Each V2 feature will be compared with its existing equivalent, and only the behavior that materially improves the product will be integrated.

Shared calculations will live in focused pure modules under `src/lib/`. UI components will consume these modules rather than duplicate formulas. Existing public routes and established component APIs will be preserved unless a change is required to prevent an incorrect result.

Integration will proceed in three releasable phases:

1. Low-risk experience improvements: input behavior, assumptions, exports, sharing, risk education, and static explanatory content.
2. Historical scenarios after source and calculation validation.
3. SEPP and Roth functionality after authoritative-method and golden-case validation.

## Calculation Governance

Every regulated, tax-sensitive, or market-data calculation must declare:

- A stable calculation identifier and methodology version.
- Authoritative source links.
- A source or rule effective date.
- User-visible assumptions and material exclusions.
- Pure calculation functions with finite input and output contracts.
- Independently derived golden cases plus boundary tests.
- A named review cadence in the methodology documentation.

Calculation modules must not silently substitute one permitted method or table for another. Unsupported selections must be rejected explicitly.

## Historical Scenario Engine

### Data convention

The canonical stored annual series will contain nominal total returns for stocks and bonds plus annual CPI inflation. The engine will convert both asset returns to real returns using the Fisher equation and maintain balances and withdrawals in today's dollars. Fees will be applied as an annual real-balance drag using a documented convention.

The dataset will include provenance metadata recording source identity, retrieval date, covered period, transformation method, schema version, and checksum. The application must reject missing years, duplicate years, non-finite values, impossible allocations, and retirement horizons that exceed available contiguous data.

The bundled V2 CSV will not be represented as verified Shiller data until its values can be reproduced from an authoritative source. Until then, the production engine must use only the existing verified source or keep the feature unavailable.

### Simulation convention

The default retirement withdrawal occurs at the beginning of each simulated year. Any alternate timing must be an explicit input and visible assumption. Results will be described as historical scenarios, not a probability of future success.

Sequence stress will operate on a selected contiguous cycle and will report synthetic year positions rather than falsely preserving reordered calendar labels. The transformation must preserve asset-return and inflation rows as a unit.

The engine will return cycle counts, success counts, failure timing, real ending balances, and drawdowns with enough metadata for the UI to describe exactly what was tested.

## SEPP Engine

The SEPP engine will implement IRS Notice 2022-6 rather than approximate it.

- RMD, fixed amortization, and fixed annuitization will be separate implementations.
- Permitted life-expectancy tables will be represented explicitly and used only where allowed.
- Fixed annuitization will use the applicable mortality table and permitted interest rate to derive its annuity factor.
- The maximum interest rate will be the greater of 5% or 120% of the federal mid-term rate for either of the two months preceding the first distribution month.
- The input contract will include calculation date or first-distribution month, account balance date, age/date-of-birth information needed by the selected method, and table selection.
- Unsupported or incomplete inputs will produce a validation result, never a plausible-looking fallback payment.
- Duration and modification warnings will distinguish statutory rules from operational best practices.

Authoritative rate data may be entered through a dated internal table maintained in code. Automatic network retrieval is not required for this phase. Each table update must include its source and effective period.

SEPP output will display the method, table, rate, calculation date, result, material warnings, and an educational-not-advice notice. A qualified tax professional must independently review golden cases before the feature is considered production-ready. If external review is unavailable, the feature remains clearly marked unavailable or beta and must not present actionable payment amounts as validated.

## Roth and Tax Estimates

The V2 lifetime-tax-savings claim will not ship. The initial Roth experience will estimate current-year federal taxable-income headroom and incremental federal income tax only.

The calculation will:

- Use explicitly versioned tax-year parameters.
- Apply the standard deduction only when the selected simplified model says it is applicable.
- Traverse brackets progressively rather than taxing an entire conversion at one marginal rate.
- Clamp the conversion to the eligible traditional balance.
- Reject negative or non-finite values.
- Disclose exclusions including state tax, IRMAA, credits, capital gains interactions, future law, and opportunity cost.

Future multiyear optimization is outside this phase.

Social Security estimates will honor claim-age bounds and birth-year full retirement age, calculate adjustments monthly, and stop delayed retirement credits at age 70. Taxable Social Security calculations will be versioned and described as federal estimates.

## State, URL, Import, and Export

Planner state will have one runtime-validated schema and explicit version migrations.

The initialization order is:

1. Parse and validate supported URL parameters.
2. If no valid URL scenario exists, parse, migrate, and validate stored state.
3. Otherwise use documented defaults.
4. Enable persistence only after hydration completes.

URL parameters override stored state only when they form a valid scenario. Invalid parameters are ignored with a recoverable user message. Back and forward navigation will update state without loops.

JSON import will enforce file-size limits, schema validation, and supported versions before invoking application callbacks. Exports will include schema and calculation-method versions but no secrets or server-side account data. Clipboard and download failures will be announced accessibly rather than silently ignored.

## User Interface and Accessibility

Existing RetireFire design primitives and responsive conventions remain authoritative. V2 components will be adapted to those primitives rather than introducing a second visual system.

- Hooks must be unconditional and components must support loading, empty, error, and populated transitions.
- Financial inputs must have labels, accessible descriptions, appropriate mobile keyboards, bounds, and keyboard-operable controls.
- Formatted inputs must synchronize when their external value changes and support decimals or negatives only when the calculation contract permits them.
- Charts require text summaries; color must not be the only status indicator.
- No component may require a 600-pixel minimum width on mobile.
- Share, import, export, and reset actions must provide success and failure feedback.
- Assumptions and methodology links must appear adjacent to consequential results.

## Content and SEO

New calculator pages will use the existing page layout, metadata, breadcrumb, structured-data, and sitemap systems. Structured data must describe visible page content accurately. Calculator copy must not characterize approximations as IRS-approved calculations, evidence-based outputs, or guaranteed outcomes.

Static benchmark pages will use conservative documented assumptions and link to an interactive calculator for personalized inputs. Data downloads will use valid CSV quoting.

## Analytics and Privacy

Analytics will measure feature-level events without transmitting raw financial values. Permitted properties include calculator identifier, methodology version, completion status, validation-error category, share/export action, and coarse predefined scenario bands. Exact portfolio, income, spending, tax, age, and account values must remain client-side unless the user deliberately saves them through an existing account feature governed by its privacy policy.

Initial decision metrics are:

- Calculator start-to-valid-result completion.
- Assumption interaction rate.
- Share and export action rate.
- Return visit with successfully restored local state.
- Cross-calculator continuation.
- Validation-error and calculation-error rates.
- Engagement with methodology and risk disclosures.

## Testing and Release Gates

Implementation will follow test-driven development. New behavior requires a failing test before production code.

Required test layers:

- Unit tests for formulas, validators, migrations, and CSV parsing.
- Golden cases for historical, SEPP, Roth, Social Security, and taxable-benefit calculations.
- Boundary and invalid-input cases, including non-finite values.
- Component tests for hydration, URL precedence, imports, hooks, and feedback states where supported by the repository.
- Content tests for methodology metadata and prohibited claims.
- Route/build verification for every new page and generated image.

Release gates are:

1. Calculator, content, and relevant component tests pass.
2. TypeScript compilation and lint pass.
3. Production build passes using the repository's normal environment.
4. No unexpected network transmission of financial inputs.
5. Mobile-width and keyboard accessibility smoke checks pass.
6. Historical dataset provenance is complete before historical results are enabled.
7. Independent professional golden-case review is complete before SEPP is labeled validated.

A blocked external review does not block the rest of V2. It blocks only the validated SEPP release state.

## Operational Ownership

The methodology page will list each governed calculation, its version, source, effective date, last review date, and next review trigger. Tax and regulatory modules require review annually and when relevant law or agency guidance changes. Historical data requires review when its source series is extended or transformed.

Production deployment, public launch, paid-plan gating, repository push, and external professional engagement require separate authorization. Local implementation, testing, and documentation do not.

## Acceptance Criteria

The project is complete when:

- Approved V2 experience improvements are integrated without duplicate formula implementations.
- All consequential inputs are runtime validated.
- Historical outputs use a consistent real-dollar methodology and verified dataset provenance, or remain disabled.
- SEPP methods are distinct and Notice 2022-6-compliant, with external-review status visible.
- Roth output contains no unsupported lifetime-savings claim.
- URL, storage, imports, and exports round-trip through a versioned schema.
- The UI meets the accessibility and responsive requirements above.
- Privacy-safe analytics and methodology documentation are present.
- All available automated release gates pass with fresh evidence.
- Any remaining external-review or deployment gate is explicitly documented rather than silently assumed complete.
