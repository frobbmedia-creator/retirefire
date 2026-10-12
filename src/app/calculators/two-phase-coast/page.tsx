import type { Metadata } from "next";
import Link from "next/link";
import { TwoPhaseCoastCalculator } from "@/components/calculators/TwoPhaseCoastCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd, faqPageJsonLd } from "@/lib/seo";

const path = "/calculators/two-phase-coast";
const description =
  "Model contribution years followed by Coast FIRE years with no new retirement contributions, using transparent real-return assumptions.";

export const metadata: Metadata = pageMeta(path, {
  title: "Two-Phase Coast FIRE Calculator",
  description,
  openGraph: { title: "Two-Phase Coast FIRE Calculator · RetireFire", description },
});

const faq = [
  {
    question: "Is two-phase Coast FIRE the same as Barista FIRE?",
    answer:
      "No. Barista FIRE means working part-time now so investments only cover the spending gap. Two-phase Coast FIRE means saving hard for a defined number of years, then stopping contributions entirely and letting compounding finish the job while you cover living costs with work.",
  },
  {
    question: "Do I have to stop contributing completely in phase two?",
    answer:
      "No. The model tests whether zero future contributions still reach your target — that is the conservative case. Any contributions you do make in phase two are pure margin on top of the plan.",
  },
  {
    question: "What real return should I assume?",
    answer:
      "Use after-inflation returns, since the target is in today's dollars. Five percent real is a common illustrative starting point; stress-test 3–4% before changing your savings behavior, because the coast phase is long and return-sensitive.",
  },
  {
    question: "What if I can't save the amount in the example?",
    answer:
      "Lower contributions need more phase-one years to reach the same phase-two starting balance. Re-run the calculator with your real savings number — the table above shows how sensitive the outcome is to the savings rate.",
  },
  {
    question: "Does this account for taxes?",
    answer:
      "No. Pre-tax, Roth, and taxable accounts compound differently after tax, and the calculator treats the portfolio as one pool. The math is a planning illustration, not a tax model.",
  },
  {
    question: "How often should I recheck the plan?",
    answer:
      "At least yearly, and after any big market move or life change. A 20% drawdown early in the coast phase can erase several years of phase-one saving.",
  },
] as const;

const th = "bg-zinc-900 px-4 py-2.5 text-left font-semibold text-zinc-200";
const td = "border-t border-zinc-800 px-4 py-2.5 text-zinc-400";

export default function TwoPhaseCoastPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={softwareApplicationJsonLd({ name: "Two-Phase Coast FIRE Calculator", description, path })} />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "Two-Phase Coast FIRE", path }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Two-phase Coast FIRE calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">{description}</p>
      </header>
      <div className="mt-8"><TwoPhaseCoastCalculator /></div>

      <section className="mt-14 max-w-3xl border-t border-zinc-800/80 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          What is two-phase Coast FIRE?
        </h2>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-400">
          <p>
            Standard Coast FIRE asks one question: is your current portfolio big
            enough that compounding alone reaches your full retirement target by
            traditional retirement age? Two-phase Coast FIRE is for people whose
            honest answer is “not yet” — but who plan to save aggressively for a
            few more years first.
          </p>
          <p>
            Phase one is the sprint: you keep contributing for a defined number
            of years. Phase two is the coast: contributions stop, and the
            portfolio compounds untouched until retirement age. The calculator
            tests whether the phase-one balance, grown through phase two,
            clears your full FIRE number.
          </p>
          <p>
            This is the most realistic Coast FIRE variant for high earners in
            their 30s and 40s. Almost nobody goes from full saving to zero
            overnight; they taper. Two-phase modeling keeps the sprint and the
            coast honest instead of smearing them into one average.
          </p>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          How does the two-phase math work?
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
          Phase one grows your starting balance and your contributions. Phase
          two compounds that result with no new money. Coast succeeds when the
          phase-two ending balance meets or beats your full FIRE target.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
{`Phase 1: FV₁ = PV·(1+r)ᵃ + PMT·[((1+r)ᵃ − 1) / r]
Phase 2: FV₂ = FV₁·(1+r)ᵇ
Coast works when FV₂ ≥ full FIRE target

PV = starting portfolio · PMT = annual savings
r = real return · a = saving years · b = coast years`}
        </pre>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          Worked example: 7 more saving years, then coasting
        </h3>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-400">
          <p>
            Take a 35-year-old with $150,000 saved, saving $40,000 a year, who
            wants a $1.5M full FIRE number ($60,000 spending ÷ 4%) by age 65.
            Assume 5% real returns.
          </p>
          <p>
            Seven saving years grow the portfolio to about $537,000: $211,000
            from the starting balance compounding, plus roughly $326,000 from
            the contributions. Twenty-three coast years then grow that to about
            $1.65M — clearing the $1.5M target with margin.
          </p>
          <p>
            The table below shows what different sprint lengths buy, holding
            everything else fixed. Five saving years lands at about $1.40M —
            short. Seven clears it. That two-year gap is the whole decision.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] rounded-xl text-sm ring-1 ring-zinc-800">
            <thead>
              <tr>
                <th className={th}>Saving years (phase 1)</th>
                <th className={th}>Balance at coast start</th>
                <th className={th}>Value at age 65</th>
                <th className={th}>Clears $1.5M?</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>0 (plain Coast FIRE)</td><td className={td}>$150,000</td><td className={td}>≈ $648,000</td><td className={td}>No</td></tr>
              <tr><td className={td}>3</td><td className={td}>≈ $300,000</td><td className={td}>≈ $1,119,000</td><td className={td}>No</td></tr>
              <tr><td className={td}>5</td><td className={td}>≈ $412,000</td><td className={td}>≈ $1,397,000</td><td className={td}>No</td></tr>
              <tr><td className={td}>7</td><td className={td}>≈ $537,000</td><td className={td}>≈ $1,649,000</td><td className={td}>Yes</td></tr>
              <tr><td className={td}>10</td><td className={td}>≈ $747,000</td><td className={td}>≈ $1,983,000</td><td className={td}>Yes</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Illustrative: 5% real return, $150k starting balance, $40k/year savings, age 35 → 65.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              When does two-phase beat plain Coast FIRE?
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Your current balance fails the plain Coast test but your savings rate is high.</li>
              <li>You want a concrete “stop saving” date instead of a vague taper.</li>
              <li>You are comparing job offers or career breaks against a savings deadline.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              What can break the plan?
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Low returns early in the coast phase — the longest, least controllable stretch.</li>
              <li>Lifestyle creep raising the full FIRE target mid-plan.</li>
              <li>Treating the phase-one balance as spendable; it must stay invested.</li>
              <li>Ignoring taxes: account mix changes the after-tax ending balance.</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          Related guides & tools
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {[
            { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
            { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
            { href: "/calculators/years-to-fire", label: "Years to FIRE calculator" },
            { href: "/resources/sequence-risk-guide", label: "Sequence-risk guide" },
            { href: "/methodology", label: "Methodology" },
          ].map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="inline-flex rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-emerald-400 ring-1 ring-zinc-800 transition hover:bg-zinc-800 hover:ring-emerald-500/30"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">FAQ</h3>
        <dl className="mt-4 space-y-3">
          {faq.map((item) => (
            <div key={item.question} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
              <dt className="font-medium text-zinc-100">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-xs leading-relaxed text-zinc-600">
          Educational illustration only — not financial, investment, tax, or legal
          advice. <Link href="/disclaimer" className="text-zinc-500 hover:text-emerald-400">Full disclaimer</Link>.
        </p>
      </section>
    </main>
  );
}
