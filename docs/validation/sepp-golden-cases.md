# Notice 2022-6 SEPP validation package

## Gate status

- Internal implementation status: `blocked_external_review`
- External review status: `pending`
- Actionable output enabled: `no`
- Fixed annuitization output: `unavailable`
- Joint and Last Survivor Table output: `unavailable`

Passing internal cases do not authorize retirement-account distributions. The
calculator returns `actionable: false`; Task 9 must preserve that gate unless a
qualified external reviewer verifies the governing tables, formulas, dates,
rates, outputs, warnings, and intended product use.

## Governing sources and effective periods

Only official IRS material was used as authority. Sources were rechecked on
2026-08-15.

1. **Notice 2022-6, Determination of Substantially Equal Periodic Payments**
   - URL: https://www.irs.gov/pub/irs-drop/n-22-06.pdf
   - Published in: 2022-5 I.R.B. 460 (January 31, 2022)
   - Effective period: replaces Rev. Rul. 2002-62 and Notice 2004-15 for series
     commencing on or after January 1, 2023; taxpayers could elect it for a
     series commencing during 2022.
   - Use: three recognized methods; permitted life-expectancy tables; 5%/120%
     federal mid-term maximum-rate rule; account-balance rules; fixed-method
     treatment; one-time switch rule; Appendix A Uniform Lifetime Table.
2. **IRS, Substantially equal periodic payments**
   - URL: https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments
   - Source date: page does not state a publication date; current page reviewed
     2026-08-15.
   - Effective period: current IRS explanatory guidance. The page warns that
     its FAQs are general information and not legal authority; Notice 2022-6
     controls.
   - Use: worked $400,000 age-50 examples and exact calendar-date modification
     examples.
3. **T.D. 9930, Updated Life Expectancy and Distribution Period Tables Used for
   Purposes of Determining Minimum Required Distributions**
   - URL: https://www.irs.gov/irb/2020-49_IRB
   - Published in: 2020-49 I.R.B. 1400 (November 30, 2020); final regulation
     published November 12, 2020.
   - Effective period: tables apply for distribution calendar years beginning
     on or after January 1, 2022.
   - Use: provenance for Treasury Regulation §1.401(a)(9)-9.
4. **IRS Publication 590-B (2025), Appendix B, Table I**
   - URL: https://www.irs.gov/publications/p590b
   - Revision: 2025.
   - Effective period: reprints the post-2021 Single Life Table used by Notice
     2022-6 through its reference to §1.401(a)(9)-9(b).
5. **IRS, Section 7520 interest rates**
   - URL: https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates
   - Page last reviewed or updated July 23, 2026.
   - Use: January-August 2026 unrounded annual-compounding 120% applicable
     federal mid-term rates and revenue-ruling provenance.
6. **IRS, Section 7520 interest rates for prior years**
   - URL: https://www.irs.gov/businesses/small-businesses-self-employed/section-7520-interest-rates-for-prior-years
   - Source date: continuously maintained historical table; reviewed
     2026-08-15.
   - Use: November 2022-December 2025 unrounded annual-compounding 120% federal
     mid-term rates and revenue-ruling provenance.

The rate implementation uses the unrounded 120% mid-term column, not the
separately rounded section 7520 rate.

## Table integrity and scope

| Input | Source/provenance | Supported range | Entries | Integer checksum | Status |
|---|---|---:|---:|---:|---|
| Single Life Table | §1.401(a)(9)-9(b); cross-checked against Publication 590-B (2025), Appendix B, Table I | ages 0-120+ | 121 | 39,132 tenths | available |
| Uniform Lifetime Table | Notice 2022-6, Appendix A | ages 10-120+ | 111 | 41,263 tenths | available |
| Joint and Last Survivor Table | §1.401(a)(9)-9(d) | none | 0 | n/a | unavailable |
| Mortality Table | §1.401(a)(9)-9(e) | none | 0 | n/a | unavailable |
| 120% federal mid-term rates | IRS current/prior Section 7520 pages | 2022-11 through 2026-08 | 46 | 22,720 basis points | available |

Checksums sum each one-decimal life-expectancy entry after multiplying by 10,
and each rate after converting it to whole basis points. Tests assert the
literal entry counts, endpoints, and checksum totals. Ages shown as `120+` in
the source are stored at index 120 and used for age 120 or older.

The Joint and Last Survivor matrix was not transcribed. A request without a
beneficiary birth date fails that validation and every joint-table request then
returns an explicit unavailable error. No substitute relationship or simplified
joint-life formula is used.

The fixed-annuitization mortality table was not transcribed. During research,
the 2022 unisex §417(e)(3) table in Notice 2020-85 was evaluated and rejected:
it is not the governing static table in §1.401(a)(9)-9(e), and it does not
reproduce the IRS age-50 factor. No value from Notice 2020-85 is present in the
implementation. Under the binding safety rule, fixed annuitization returns no
factor and no payment until the correct table is reproducibly transcribed and
independently verified.

Automated failure fixtures exercise attained ages 10, 50, and 120. Each returns
the same mortality-table-unavailable error without a factor or payment, so the
implementation does not imply partial annuitization age coverage or fall back
to fixed amortization at either end of the supported life-expectancy range.

## Golden cases

Dollar comparisons to IRS FAQ examples use a tolerance of $0.50 because the
FAQ displays whole dollars while code returns cents. Factor comparisons use the
display precision in the FAQ.

### Case 1: IRS age-50 RMD example

| Field | Value |
|---|---:|
| Balance | $400,000 |
| Birth date used by fixture | 1973-06-15 |
| First payment date used by fixture | 2023-01-15 |
| Attained age in distribution year | 50 |
| Table | Single Life |
| Source factor | 36.2 |
| Hand formula | $400,000 / 36.2 |
| Code factor | 36.2 |
| Exact code payment | $11,049.72 |
| IRS displayed payment | $11,050 |
| Difference | $0.28 |
| Result | within tolerance; externally unreviewed |

### Case 2: IRS age-50 fixed-amortization example

| Field | Value |
|---|---:|
| Balance | $400,000 |
| Life-expectancy factor | 36.2 years |
| Selected rate | 4.00% |
| Maximum for January 2023 | 5.14% |
| Hand formula | `(1 - 1.04^-36.2) / 0.04` |
| Hand/code amortization factor | 18.95587933451237 |
| IRS displayed factor | 18.9559 |
| Exact code payment | $21,101.63 |
| IRS displayed payment | $21,102 |
| Difference | $0.37 |
| Result | within tolerance; externally unreviewed |

January 2023 looks back to November 2022 (4.78%, Rev. Rul. 2022-20) and
December 2022 (5.14%, Rev. Rul. 2022-22), so the maximum is 5.14%. A 4.00%
input is permitted.

### Case 3: 5% statutory floor

| Field | Value |
|---|---:|
| First-payment month | 2023-07 |
| May 2023 120% mid-term rate | 4.30% |
| June 2023 120% mid-term rate | 4.28% |
| Required maximum | 5.00% floor |
| Code maximum | 5.00% |
| Result | exact; externally unreviewed |

### Case 4: latest complete rate lookback at review date

| Field | Value |
|---|---:|
| First-payment month | 2026-09 |
| July 2026 rate | 5.23%, Rev. Rul. 2026-12 |
| August 2026 rate | 5.23%, Rev. Rul. 2026-13 |
| Code maximum | 5.23% |
| Result | exact; externally unreviewed |

October 2026 is unavailable because the September 2026 rate was not published
and verified as of August 15, 2026. The function does not invent or forecast it.

### Case 5: calendar-date modification period

The IRS FAQ gives a taxpayer born August 15, 1968 who commences payments on
December 1, 2024. Age 59½ occurs February 15, 2028; the fifth anniversary is
December 1, 2029. The later date, and the code result, is December 1, 2029.

The tests also cover the opposite branch: a November 20, 1976 birth and an
August 31, 2026 first payment produce age 59½ on May 20, 2036, later than the
August 31, 2031 fifth anniversary. The code returns May 20, 2036. Neither case
uses decimal-age subtraction.

### Case 6: fixed annuitization blocker

The IRS FAQ's age-50, $400,000, 4.00% example displays a Table 4 mortality
factor of 18.1568 and an annual amount of $22,030. Code result:
`unavailable`; no factor and no payment are returned. This is an intentional
failed validation checkpoint, not a golden-case pass and not an approximation.

## Returned warnings and exclusions

- Every success is marked `externalReviewStatus: "pending"` and
  `actionable: false`.
- A SoSEPP is tied to one account; balances and distributions cannot be
  combined across accounts.
- RMD amounts must be redetermined each distribution year using the same life
  table, subject to Notice 2022-6's beneficiary and transition rules.
- The fixed-amortization amount remains level in succeeding years.
- Unauthorized changes before the later of the fifth payment anniversary and
  age 59½ can trigger recapture tax plus interest.
- The implementation does not decide plan separation-from-service facts,
  designated-beneficiary status, account-balance reasonableness, permitted
  exceptions, one-time method changes, taxability, withholding, or individual
  eligibility.
- Rate data is static through August 2026; later first-payment months remain
  unavailable until both official lookback rates are added and verified.

## External review sign-off

Reviewer:

Review date:

Sign-off:
