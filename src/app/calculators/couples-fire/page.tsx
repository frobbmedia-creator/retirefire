import type { Metadata } from "next";
import Link from "next/link";
import { CouplesFireCalculator } from "@/components/calculators/CouplesFireCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd, faqPageJsonLd } from "@/lib/seo";

const path = "/calculators/couples-fire";
const description =
  "Combine two portfolios and durable income streams against shared household spending without hiding account ownership or survivor limitations.";

export const metadata: Metadata = pageMeta(path, {
  title: "FIRE Calculator for Couples",
  description,
  openGraph: { title: "FIRE Calculator for Couples · RetireFire", description },
});

const faq = [
  {
    question: "Should we use one withdrawal rate for the whole household?",
    answer:
      "Usually yes for the target itself, but the longer-lived spouse sets the horizon. A couple with a 40-plus-year joint horizon is planning a longer retirement than either would alone, which argues for stress-testing 3–3.5% alongside 4%.",
  },
  {
    question: "What happens to the plan if one spouse dies early?",
    answer:
      "Household spending typically falls, but so does one Social Security check — the survivor keeps the larger of the two benefits. Pensions depend on the survivor option elected. Re-run the numbers for the survivor alone; the original household target no longer applies.",
  },
  {
    question: "Should accounts be his, hers, or ours?",
    answer:
      "The calculator combines balances for the target, but ownership still matters: beneficiary designations, estate plans, and what happens in divorce all follow the account titling, not the spreadsheet. Keep beneficiaries current on every account.",
  },
  {
    question: "How do we handle a big age gap?",
    answer:
      "Anchor the planning horizon to the younger spouse's life expectancy, price the extra healthcare bridge years before their Medicare starts, and remember the older spouse's Social Security and RMD timelines arrive years earlier.",
  },
  {
    question: "Do pensions with survivor options change the math?",
    answer:
      "Meaningfully. A pension paying 100% to the survivor is worth far more to household planning than a single-life pension of the same amount. Model the survivor benefit, not the headline payment.",
  },
  {
    question: "Does this replace estate planning?",
    answer:
      "No. This is a portfolio-target illustration. Wills, trusts, powers of attorney, and beneficiary designations are separate work with a separate professional.",
  },
] as const;

const th = "bg-zinc-900 px-4 py-2.5 text-left font-semibold text-zinc-200";
const td = "border-t border-zinc-800 px-4 py-2.5 text-zinc-400";

export default function CouplesFirePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={softwareApplicationJsonLd({ name: "FIRE Calculator for Couples", description, path })} />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "Couples FIRE", path }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          FIRE calculator for couples
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">{description}</p>
      </header>
      <div className="mt-8"><CouplesFireCalculator /></div>

      <section className="mt-14 max-w-3xl border-t border-zinc-800/80 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Why do couples need their own FIRE math?
        </h2>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-400">
          <p>
            A single-person FIRE number is one timeline: one life expectancy,
            one Social Security record, one Medicare date. A couple is two
            timelines sharing one budget — and the differences between those
            timelines are where household plans quietly break.
          </p>
          <p>
            The younger spouse usually sets the planning horizon, because the
            money has to last as long as the longer life. Income arrives on two
            different schedules: Social Security benefits start at different
            ages and amounts, pensions may or may not survive the first death,
            and Medicare starts years apart. A household target built on one
            person's timeline understates all of it.
          </p>
          <p>
            Use one household target, but keep two timelines visible. That is
            the entire discipline of couples FIRE planning.
          </p>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          How does the couples calculation work?
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
          Start with combined household spending, subtract durable income the
          household can count on, and divide the remainder by the withdrawal
          rate. Then check the result against the longer of the two timelines.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
{`Household FIRE number = (combined spending − durable income) ÷ withdrawal rate
Planning horizon = longer-lived spouse's life expectancy

Durable income = Social Security + pensions with survivor options.
Anchor the horizon to the younger spouse, not the average.`}
        </pre>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          Worked example: the age-gap problem
        </h3>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-400">
          <p>
            Alex is 45, Jordan is 38. Combined spending is $80,000 a year. At a
            4% withdrawal rate the household target is $2,000,000. That number
            looks simple. The timelines underneath it are not.
          </p>
          <p>
            Alex reaches Medicare at 65 in about 20 years; Jordan gets there 7
            years later — seven extra years of marketplace or COBRA premiums to
            price. If Alex's Social Security is the larger benefit, Jordan as
            survivor keeps that larger amount, but only after Alex is gone. And
            the portfolio doesn't need to last until Alex is 90; it needs to
            last until Jordan is 90-plus.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] rounded-xl text-sm ring-1 ring-zinc-800">
            <thead>
              <tr>
                <th className={th}>Milestone</th>
                <th className={th}>Alex (45)</th>
                <th className={th}>Jordan (38)</th>
                <th className={th}>Planning note</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>Medicare at 65</td><td className={td}>~20 years out</td><td className={td}>~27 years out</td><td className={td}>7 extra bridge years to fund</td></tr>
              <tr><td className={td}>Social Security</td><td className={td}>Larger benefit</td><td className={td}>Smaller benefit</td><td className={td}>Survivor keeps the larger one</td></tr>
              <tr><td className={td}>Planning horizon</td><td className={td}>~45 years</td><td className={td}>~55+ years</td><td className={td}>Anchor to Jordan's timeline</td></tr>
              <tr><td className={td}>RMDs</td><td className={td}>Early 70s</td><td className={td}>7 years later</td><td className={td}>Staggered forced withdrawals</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Illustrative ages and horizons; your plan should use your real numbers.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              When is the household number enough?
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>You want a single portfolio target for joint savings decisions.</li>
              <li>Both spouses have similar ages and earnings histories.</li>
              <li>You are comparing the household target against combined balances.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              When does it mislead?
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
              <li>Big age or earnings gaps — timelines diverge sharply.</li>
              <li>Pensions without survivor options — income dies with the pensioner.</li>
              <li>Ignoring whose name is on which account — ownership, not math, governs inheritance.</li>
              <li>One spouse's health suggests very different life expectancies.</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-10 text-lg font-semibold text-zinc-100">
          Related guides & tools
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {[
            { href: "/calculators/fire-number", label: "FIRE number calculator" },
            { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
            { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
            { href: "/retire-at-55", label: "Retire at 55 guide" },
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
