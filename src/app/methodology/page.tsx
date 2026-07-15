import type { Metadata } from "next";
import Link from "next/link";
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
      <p className="text-sm font-medium text-emerald-400">Transparency</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Methodology
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        RetireFire is built for people who want to understand the math, not just
        a black-box number. Below are the formulas, default assumptions, and
        primary research traditions we reference. Nothing here is personalized
        advice — see the{" "}
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
            <li>Taxes (ordinary income, capital gains, RMDs, NIIT)</li>
            <li>Investment fees and advisory costs</li>
            <li>Social Security, pensions, and annuities</li>
            <li>Healthcare and ACA subsidy cliffs</li>
            <li>Sequence-of-returns risk and Monte Carlo paths</li>
            <li>Inflation shocks, currency risk, and home equity strategies</li>
          </ul>
          <p className="mt-3 text-zinc-400">
            Omitting these keeps the tools understandable. Adding them later
            will always ship with the same transparency standard.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-50">10. Further reading</h2>
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
