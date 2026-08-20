import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/constants";

const SERIES = [
  {
    day: 1,
    title: "Hero — Pressure Test, Don't Guess",
    hook: "One retirement forecast isn't a plan — it's a guess. Stress-test against 1,000 market paths.",
    href: "/retirement-checkup",
    cta: "Start free checkup",
  },
  {
    day: 2,
    title: "FIRE Math",
    hook: "FIRE number = annual spending ÷ withdrawal rate. Change the rate, change your freedom date.",
    href: "/calculators/fire-number",
    cta: "Calculate FIRE number",
  },
  {
    day: 3,
    title: "FIRE Presets",
    hook: "Lean ≈ $40k · Regular ≈ $60k · Fat ≈ $100k+. Same formula, different freedom.",
    href: "/calculators/fire-number",
    cta: "Pick a preset",
  },
  {
    day: 4,
    title: "The 4% Rule",
    hook: "It's a starting point — not a promise. Test 3.5%–5% and see the difference.",
    href: "/calculators/fire-number",
    cta: "Test withdrawal rates",
  },
  {
    day: 5,
    title: "Years to FIRE",
    hook: "You don't need motivation. You need a date. Portfolio + savings + real return → exact years.",
    href: "/calculators/years-to-fire",
    cta: "Solve years to FIRE",
  },
  {
    day: 6,
    title: "Savings Rate",
    hook: "Save 20% → ~37 years. 50% → ~17 years. 70% → ~8 years. Salary is secondary.",
    href: "/calculators/years-to-fire",
    cta: "See your savings impact",
  },
  {
    day: 7,
    title: "Real vs Nominal",
    hook: "7% nominal − 2.5% inflation = 4.5% real. Plan with the honest number.",
    href: "/methodology",
    cta: "See methodology",
  },
  {
    day: 8,
    title: "Coast FIRE",
    hook: "The moment you can stop saving and still retire on schedule. Let compounding work.",
    href: "/calculators/coast-fire",
    cta: "Find Coast number",
  },
  {
    day: 9,
    title: "Coast by Age",
    hook: "What should your net worth be at 30, 35, or 40 to still retire at 60?",
    href: "/coast-fire-by-age",
    cta: "Coast by age table",
  },
  {
    day: 10,
    title: "Barista FIRE",
    hook: "Don't quit work forever — quit the expensive life. Part-time income shrinks the number.",
    href: "/calculators/barista-fire",
    cta: "Barista calculator",
  },
  {
    day: 11,
    title: "Barista vs Coast",
    hook: "Coast = stop saving, keep full-time. Barista = downshift now. Different trade-offs.",
    href: "/calculators",
    cta: "Compare paths",
  },
  {
    day: 12,
    title: "Shared Assumptions",
    hook: "Return, inflation, and withdrawal rate shared across every tool. One source of truth.",
    href: "/approach",
    cta: "Our approach",
  },
  {
    day: 13,
    title: "Shareable URL",
    hook: "Every scenario encodes into the URL. No login. No screenshots. Share the plan.",
    href: "/calculators/coast-fire",
    cta: "Build a shareable plan",
  },
  {
    day: 14,
    title: "CSV Export",
    hook: "Screenshot your plan? No — export it. Your data, your spreadsheet, your CPA.",
    href: "/calculators",
    cta: "Open tools",
  },
  {
    day: 15,
    title: "Monte Carlo",
    hook: "Does your plan survive 1,000 markets? Worst, median, best — not a single spreadsheet line.",
    href: "/calculators/coast-fire",
    cta: "Run stress test",
  },
  {
    day: 16,
    title: "Sequence Risk",
    hook: "Average 7% and still go broke if the crash hits early. Know your vulnerability.",
    href: "/resources/sequence-risk-guide",
    cta: "Sequence risk guide",
  },
  {
    day: 17,
    title: "A/B Compare",
    hook: "Save $500 more a month — or retire two years later? Pin A, edit B, decide.",
    href: "/calculators",
    cta: "Scenario compare",
  },
  {
    day: 18,
    title: "Methodology",
    hook: "If a calculator won't show its formula, don't trust it. Ours is on the table.",
    href: "/methodology",
    cta: "Full methodology",
  },
  {
    day: 19,
    title: "Coast Checklist",
    hook: "You hit Coast. Now what? Health insurance, match, bridge years, Roth ladder.",
    href: "/resources/coast-fire-checklist",
    cta: "Coast checklist",
  },
  {
    day: 20,
    title: "Mobile First",
    hook: "FIRE plans built for desktop die on mobile. Numeric keyboards. Big tap targets.",
    href: "/retirement-checkup",
    cta: "Try on mobile",
  },
  {
    day: 21,
    title: "Full Stack Recap",
    hook: "Don't just calculate your future — pressure-test it. Full stack free. No login.",
    href: "/calculators",
    cta: "Open the full stack",
  },
] as const;

export const metadata: Metadata = pageMeta("/series/arya-21-day", {
  title: "Arya 21-Day FIRE Series",
  description:
    "21 short lessons with Arya: FIRE number, Coast, Barista, Monte Carlo, sequence risk, and transparent math. Each day links to the free RetireFire tool.",
  openGraph: {
    title: "Arya 21-Day FIRE Series · RetireFire",
    description:
      "Pressure-test your retirement plan in 21 days. Transparent math, no hype, free tools.",
  },
});

export default function Arya21DaySeriesPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: "Arya 21-Day FIRE Series",
          description:
            "21 short lessons with Arya mapping FIRE concepts to free RetireFire calculators.",
          path: "/series/arya-21-day",
          datePublished: "2026-08-16",
          dateModified: "2026-08-20",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Arya 21-Day Series", path: "/series/arya-21-day" },
        ])}
      />

      <div className="border-b border-zinc-800/60">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Arya 21-Day Series", path: "/series/arya-21-day" },
            ]}
          />

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
            Series · Hosted by Arya
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            21 days to pressure-test your FIRE plan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            Arya is the face of {SITE.name}: clear numbers, no soft language.
            Each day below maps a core idea to a free calculator or resource.
            No account required. Educational only — not advice.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/retirement-checkup"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-medium text-zinc-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
            >
              Start free checkup
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/calculators"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-800 px-5 text-sm font-medium text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-700"
            >
              All FIRE tools
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <ol className="space-y-4">
          {SERIES.map((ep) => (
            <li
              key={ep.day}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  Day {ep.day}
                </span>
                <h2 className="text-lg font-semibold text-zinc-50">{ep.title}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{ep.hook}</p>
              <Link
                href={ep.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                {ep.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-zinc-500">
          Full video series produced with Arya (HeyGen). Social captions and
          square cuts live in the growth system. On-site clips roll out next —
          the math and tools are already free at{" "}
          <Link href="/calculators" className="text-emerald-400 hover:underline">
            /calculators
          </Link>
          .
        </p>
      </div>
    </>
  );
}
