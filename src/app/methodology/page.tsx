import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  CALCULATION_REGISTRY,
  calculationVersion,
} from "@/lib/calculation-registry";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/methodology", {
  title: "Methodology",
  description:
    "Formulas, assumptions, and research sources behind RetireFire calculators — FIRE number, years to FIRE, Coast FIRE, Barista FIRE, and savings-rate tables.",
  openGraph: {
    title: "Methodology · RetireFire",
    description:
      "Published formulas and sources for free FIRE calculators — not a black box.",
  },
});

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Methodology", path: "/methodology" },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-emerald-400">Transparency</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Methodology
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        RetireFire is built for people who want to understand the math, not just
        a black-box number. Below are the formulas, default assumptions, and
        primary research traditions we reference. Prefer a narrative first? Read
        the{" "}
        <Link
          href="/blog/retirefire-methodology-explained"
          className="text-emerald-400 hover:underline"
        >
          human methodology tour
        </Link>
        . Nothing here is personalized advice — see the{" "}
        <Link href="/disclaimer" className="text-emerald-400 hover:underline">
          disclaimer
        </Link>
        .
      </p>

      <div className="prose-invert mt-12 space-y-12 text-[15px] leading-relaxed text-zinc-300">
        <section>
          <h2 className="text-xl font-semibold text-zinc-50">1. FIRE number</h2>
          <p className="mt-3 text-zinc-400">
            Your FIRE number is the portfolio size that, at a chosen safe
            withdrawal rate (SWR), is expected to support a given annual spend:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            FIRE number = Annual spending ÷ Withdrawal rate{"\n"}
            Multiplier  = 1 ÷ Withdrawal rate{"\n"}
            {"\n"}
            Example (4% rule): $60,000 ÷ 0.04 = $1,500,000 (25×)
          </pre>
          <p className="mt-3 text-zinc-400">
            <strong className="text-zinc-200">Lean / Regular / Fat</strong> are
            only spending presets for convenience. They are not standards of
            living defined by academic research — edit them to your actual
            budget.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            2. Safe withdrawal rates &amp; the “4% rule”
          </h2>
          <p className="mt-3 text-zinc-400">
            The popular 4% starting withdrawal rate is associated with work on
            historical retirement portfolio survival in the United States —
            commonly traced to William Bengen (1994) and the “Trinity Study”
            (Cooley, Hubbard &amp; Walz, 1998 and updates). These studies ask, in
            substance: for a given stock/bond mix and initial withdrawal rate
            adjusted for inflation, how often would a portfolio have lasted 30
            years in past U.S. market history?
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">4%</strong> is a widely cited
              starting point for ~30-year horizons — not a guarantee.
            </li>
            <li>
              <strong className="text-zinc-200">Early retirement</strong> (40–50+
              year horizons) often motivates more conservative rates (e.g.
              3–3.5%) or flexible spending rules.
            </li>
            <li>
              Outcomes depend on asset allocation, fees, taxes, sequence of
              returns, and spending flexibility — none of which our simple
              calculator fully models.
            </li>
          </ul>
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-sm font-medium text-zinc-200">Primary sources</p>
            <ul className="mt-2 space-y-2 text-sm text-zinc-400">
              <li>
                Bengen, W. P. (1994). “Determining Withdrawal Rates Using
                Historical Data.” <em>Journal of Financial Planning</em>.
              </li>
              <li>
                Cooley, P. L., Hubbard, C. M., &amp; Walz, D. T. (1998).
                “Retirement Savings: Choosing a Withdrawal Rate That Is
                Sustainable.” <em>AAII Journal</em> (Trinity University) —
                often called the Trinity Study.
              </li>
              <li>
                Subsequent updates and related SWR literature (e.g. later
                Trinity updates; Bengen follow-ups; Kitces and others on
                flexible withdrawal strategies). Treat popular summaries as
                gateways to the original papers.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">3. Years to FIRE</h2>
          <p className="mt-3 text-zinc-400">
            We project a constant real return with end-of-year contributions:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            T = P(1+r)^n + C × ((1+r)^n − 1) / r{"\n"}
            {"\n"}
            Solved for n (years):{"\n"}
            n = ln((T·r + C) / (P·r + C)) / ln(1+r){"\n"}
            {"\n"}
            If r ≈ 0: n = (T − P) / C
          </pre>
          <p className="mt-3 text-zinc-400">
            Where <strong className="text-zinc-200">P</strong> is current
            portfolio, <strong className="text-zinc-200">C</strong> annual
            contribution, <strong className="text-zinc-200">r</strong> real
            return, and <strong className="text-zinc-200">T</strong> the FIRE
            target. This is a smooth compound-growth illustration — not a Monte
            Carlo simulation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">4. Coast FIRE</h2>
          <p className="mt-3 text-zinc-400">
            Coast FIRE asks: how much do you need{" "}
            <em className="text-zinc-200">today</em> so that, with no further
            contributions, compound growth reaches full FIRE by a chosen
            traditional retirement age?
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            years = retirement age − current age{"\n"}
            coast number = FIRE number ÷ (1+r)^years{"\n"}
            {"\n"}
            Projected at retirement (stop saving now):{"\n"}
            FV = current × (1+r)^years
          </pre>
          <p className="mt-3 text-zinc-400">
            Hitting Coast FIRE means you{" "}
            <em className="text-zinc-200">could</em> stop saving for retirement —
            not that you must stop working or that early retirement is funded
            yet. Lifestyle, healthcare, and Social Security are out of scope of
            this simple model.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            5. Barista FIRE (semi-retirement)
          </h2>
          <p className="mt-3 text-zinc-400">
            When part-time or flexible work covers some spending, the portfolio
            only needs to fund the remainder:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            gap = max(0, annual expenses − work income){"\n"}
            barista number = gap ÷ withdrawal rate
          </pre>
          <p className="mt-3 text-zinc-400">
            Years to Barista uses the same compound-growth solver as Years to
            FIRE, with the barista number as the target. Job stability, benefits,
            and taxes are not modeled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            6. Savings-rate table
          </h2>
          <p className="mt-3 text-zinc-400">
            Holding lifestyle spending fixed, each savings rate{" "}
            <em className="text-zinc-200">s</em> implies income = spending ÷
            (1−s) and annual savings = s × income. We then solve years to the
            full FIRE target from your current portfolio. Rows near your current
            implied savings rate are highlighted in the UI.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            7. Real vs nominal returns
          </h2>
          <p className="mt-3 text-zinc-400">
            By default, expected return is{" "}
            <strong className="text-zinc-200">real</strong> (after inflation),
            matching targets expressed in today’s dollars. In{" "}
            <strong className="text-zinc-200">nominal</strong> mode we convert:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            real ≈ (1 + nominal) / (1 + inflation) − 1
          </pre>
          <p className="mt-3 text-zinc-400">
            Projections always compound at the effective real rate so FIRE
            targets stay in today’s purchasing power.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            8. Default assumptions
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-zinc-800">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="px-4 py-3">Withdrawal rate</td>
                  <td className="px-4 py-3 font-mono">4%</td>
                  <td className="px-4 py-3 text-zinc-500">
                    Classic starting point; adjust for horizon
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Real return</td>
                  <td className="px-4 py-3 font-mono">5%</td>
                  <td className="px-4 py-3 text-zinc-500">
                    After inflation; not a forecast
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Inflation (reference)</td>
                  <td className="px-4 py-3 font-mono">~2.5%</td>
                  <td className="px-4 py-3 text-zinc-500">
                    Used conceptually; calculators work in real terms
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Coast horizon age</td>
                  <td className="px-4 py-3 font-mono">65</td>
                  <td className="px-4 py-3 text-zinc-500">
                    Traditional retirement age default
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            9. What we deliberately omit (for now)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              Comprehensive tax planning, including capital gains, RMDs, NIIT,
              state taxes, and multiyear Roth optimization
            </li>
            <li>Investment fees and advisory costs</li>
            <li>
              Personalized Social Security, pension, annuity, and ACA subsidy
              analysis
            </li>
            <li>Taxes on withdrawals, account types, and rebalancing rules inside stress tests</li>
            <li>Historical cycle backtesting (cFIREsim-style overlapping periods)</li>
            <li>Inflation shocks, currency risk, and home equity strategies</li>
          </ul>
          <p className="mt-3 text-zinc-400">
            Product philosophy and free-core commitments live on the{" "}
            <Link href="/approach" className="text-emerald-400 hover:underline">
              Approach, Limitations &amp; Roadmap
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            10. Monte Carlo stress test (illustrative)
          </h2>
          <p className="mt-3 text-zinc-400">
            Coast FIRE and Years to FIRE include an optional{" "}
            <strong className="text-zinc-200">sequence-of-returns stress test</strong>.
            It does <em>not</em> replace the deterministic formulas above. It
            samples many random return paths so you can see a range of terminal
            outcomes under a transparent toy model.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            Each year:{"\n"}
            {"  "}Z ~ Normal(0, 1){"\n"}
            {"  "}r = max(−0.95, mean_return + σ · Z){"\n"}
            {"  "}wealth = wealth × (1 + r) + contribution{"\n"}
            {"\n"}
            Success = terminal wealth ≥ target{"\n"}
            Free tier: 1,000 paths · fixed σ presets · seed 42
          </pre>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Mean return</strong> comes from
              shared assumptions (same real return as the main calculators).
            </li>
            <li>
              <strong className="text-zinc-200">Volatility σ</strong> is an
              illustrative annual standard deviation (12% / 15% / 18% presets) —
              not a fitted estimate of your portfolio.
            </li>
            <li>
              <strong className="text-zinc-200">Independence</strong>: year shocks
              are i.i.d. There is no autocorrelation, regime switching, or crash
              clustering in the free model.
            </li>
            <li>
              <strong className="text-zinc-200">Not historical backtesting</strong>:
              this is not overlapping historical market sequences. Those tools
              answer a related but different question.
            </li>
            <li>
              Reported statistics (success rate, p10 / p50 / p90, sample paths)
              are educational ranges — not probabilities of your life outcomes.
            </li>
          </ul>
          <p className="mt-3 text-zinc-400">
            Coast stress tests use{" "}
            <strong className="text-zinc-200">zero contributions</strong> over
            the coast horizon and compare terminal wealth to full FIRE. Years
            stress tests keep your annual contributions and compare to the FIRE
            number over the modeled years-to-FIRE horizon (or a fallback horizon
            if unreachable).
          </p>
        </section>

        <section id="historical-scenarios">
          <h2 className="text-xl font-semibold text-zinc-50">
            11. Historical retirement scenarios
          </h2>
          <p className="mt-3 text-zinc-400">
            Historical scenario results use overlapping, contiguous periods from
            a verified annual return series. Each cycle applies withdrawals at
            the beginning of the year, then applies the year&apos;s portfolio
            return and reports the ending balance in real dollars. The cycle
            denominator is the number of full-horizon periods available in that
            verified series.
          </p>
          <p className="mt-3 text-zinc-400">
            Historical scenarios are not future probabilities. RetireFire keeps
            this tool unavailable until its source, transformation method,
            coverage, and checksum can be independently reproduced.
          </p>
        </section>

        <section id="roth-conversion-tax">
          <h2 className="text-xl font-semibold text-zinc-50">
            12. Current-year Roth conversion tax estimate
          </h2>
          <p className="mt-3 text-zinc-400">
            The Roth calculator estimates regular federal income tax for tax
            year 2026 only. It treats the entered current taxable income as
            income after the standard or itemized deduction, caps the conversion
            at the traditional account balance, adds the applied conversion to
            taxable income, and traverses the selected filing status&apos;s ordinary
            income brackets progressively.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            Applied conversion = min(desired conversion, traditional balance){"\n"}
            Tax after = progressive tax(current taxable income + applied conversion){"\n"}
            Incremental tax = tax after − tax before{"\n"}
            Effective rate = incremental tax ÷ applied conversion (if conversion &gt; 0){"\n"}
            If applied conversion = $0: effective rate = N/A
          </pre>
          <p className="mt-3 text-zinc-400">
            The model assumes the entire applied conversion is taxable. It does
            not calculate nondeductible IRA or plan basis or applicable pro-rata
            treatment. IRS guidance explains that a traditional-IRA conversion
            may be partly nontaxable when it returns basis; see{" "}
            <a
              href="https://www.irs.gov/publications/p590a"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              IRS Publication 590-A
            </a>
            . The model also does not subtract the standard deduction a second
            time. Its 2026 standard-deduction amounts and bracket thresholds
            come from{" "}
            <a
              href="https://www.irs.gov/pub/irs-drop/rp-25-32.pdf"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              Revenue Procedure 2025-32
            </a>
            , effective for taxable years beginning in 2026. This is methodology
            version {calculationVersion("roth-conversion")} and a current-year
            illustration, not a multiyear or lifetime tax-savings forecast.
          </p>
          <p className="mt-3 text-zinc-400">
            Explicit exclusions include state and local tax, AMT, NIIT, credits,
            deduction changes, capital-gain and qualified-dividend interactions,
            nondeductible IRA or plan basis and pro-rata treatment, ACA premium
            tax credits, Medicare IRMAA, future law, multiyear optimization,
            withholding and estimated-tax penalties, and the opportunity cost
            of paying conversion tax.
          </p>
        </section>

        <section id="social-security-estimates">
          <h2 className="text-xl font-semibold text-zinc-50">
            13. Social Security claim and federal taxable-benefit estimates
          </h2>
          <p className="mt-3 text-zinc-400">
            The claim-age estimate starts with the retired worker&apos;s own SSA
            monthly estimate at full retirement age. Full retirement age follows
            SSA&apos;s birth-year schedule. For a January 1 birthday, SSA says to use
            the prior birth year. Claim ages are whole months from age 62 through
            exactly age 70.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            First 36 early months: reduce 5/9 of 1% per month{"\n"}
            Additional early months: reduce 5/12 of 1% per month{"\n"}
            After FRA: apply the birth-year delayed-credit rate monthly{"\n"}
            Delayed credits stop at age 70{"\n"}
            Estimated monthly benefit: next lower whole dollar
          </pre>
          <p className="mt-3 text-zinc-400">
            The monthly early-retirement rules and FRA schedule come from SSA&apos;s{" "}
            <a
              href="https://www.ssa.gov/oact/quickcalc/earlyretire.html"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              Benefit Reduction for Early Retirement
            </a>
            . Delayed-credit rates and the age-70 stop come from SSA&apos;s{" "}
            <a
              href="https://www.ssa.gov/benefits/retirement/planner/delayret.html"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              Delayed Retirement Credits
            </a>
            . Dollar rounding and golden cases were checked against the{" "}
            <a
              href="https://www.ssa.gov/policy/docs/statcomps/supplement/2025/apnc.html"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              Annual Statistical Supplement, 2025, Appendix C
            </a>
            . This is method v{calculationVersion("social-security-claim")}.
          </p>
          <p className="mt-3 text-zinc-400">
            The separate taxable-benefit estimate implements Worksheet 1 from{" "}
            <a
              href="https://www.irs.gov/pub/irs-pdf/p915.pdf"
              className="text-emerald-400 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              IRS Publication 915 (2025)
            </a>
            , applicable to 2025 federal income tax returns and the latest
            completed publication reviewed on August 15, 2026. It supports
            single and married-filing-jointly estimates only.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
            Provisional income = other income + tax-exempt interest{"\n"}
            {"                     "}+ 50% of gross Social Security{"\n"}
            Lower thresholds: $25,000 single · $32,000 joint{"\n"}
            Upper thresholds: $34,000 single · $44,000 joint{"\n"}
            Maximum included in federal taxable income: 85% of benefits
          </pre>
          <p className="mt-3 text-zinc-400">
            Gross benefits are cash received and reduce the later portfolio gap;
            the federally taxable portion is only the amount included in federal
            taxable income. It is not the tax owed and is never substituted for
            gross income. This is method v
            {calculationVersion("social-security-taxable")}. Manual benefit mode
            remains available for a user who already has an SSA estimate.
          </p>
          <p className="mt-3 text-zinc-400">
            The models do not provide individualized claiming advice and exclude
            earnings-record calculations, COLAs, the retirement earnings test,
            spousal and survivor benefits, state tax, total federal tax, lump-sum
            elections, repayments, special Publication 915 adjustments, and
            future law. Exact inputs and results remain client-side.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">
            14. Calculation governance
          </h2>
          <p className="mt-3 text-zinc-400">
            Every calculation tracked here has a stable methodology version and
            review record. Status is intentionally visible: development and beta
            entries are not validated planning advice, and SEPP remains blocked
            until external review is complete.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-zinc-800">
            <table className="w-full min-w-[1280px] text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">Version</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Effective date</th>
                  <th className="px-4 py-3 font-medium">Last review</th>
                  <th className="px-4 py-3 font-medium">Review cadence</th>
                  <th className="px-4 py-3 font-medium">Next review trigger</th>
                  <th className="px-4 py-3 font-medium">Assumptions</th>
                  <th className="px-4 py-3 font-medium">Material exclusions</th>
                  <th className="px-4 py-3 font-medium">Sources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {CALCULATION_REGISTRY.map((method) => (
                  <tr key={method.id}>
                    <td className="px-4 py-3 font-medium text-zinc-100">
                      {method.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{method.version}</td>
                    <td className="px-4 py-3">{method.status.replaceAll("_", " ")}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{method.effectiveDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{method.lastReviewed}</td>
                    <td className="px-4 py-3 text-zinc-400">{method.reviewCadence}</td>
                    <td className="px-4 py-3 text-zinc-400">{method.nextReviewTrigger}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      <ul className="list-disc space-y-1 pl-4">
                        {method.assumptions.map((assumption) => (
                          <li key={assumption}>{assumption}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      <ul className="list-disc space-y-1 pl-4">
                        {method.exclusions.map((exclusion) => (
                          <li key={exclusion}>{exclusion}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      {method.sources.map((source, index) => (
                        <span key={source.href}>
                          {index > 0 ? ", " : ""}
                          <a
                            href={source.href}
                            className="text-emerald-400 hover:underline"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {source.label}
                          </a>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">15. Further reading</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            <li>
              Bengen (1994) and Trinity Study papers (library / journal access)
            </li>
            <li>
              Peer-reviewed and practitioner work on variable withdrawal
              strategies (e.g. guardrails frameworks)
            </li>
            <li>
              Long-run asset return summaries from reputable research shops
              (always check methodology and period bias)
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        Questions about a formula or source? The calculators are intentionally
        open about inputs — if something is unclear, that&apos;s a product bug we
        want to fix.
      </p>
      <p className="mt-4">
        <Link
          href="/#calculators"
          className="text-sm font-medium text-emerald-400 hover:underline"
        >
          ← Back to calculators
        </Link>
      </p>
    </div>
  );
}
