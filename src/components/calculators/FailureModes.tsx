import Link from "next/link";
import {
  AlertTriangle,
  HeartPulse,
  Home,
  Hourglass,
  Receipt,
  Sparkles,
  TrendingDown,
} from "lucide-react";

const MODES = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: HeartPulse,
    body: "Premiums, deductibles, and the years before Medicare are outside the simple FIRE multiple.",
    href: "/early-retirement-health-insurance",
    linkLabel: "Healthcare before Medicare",
  },
  {
    id: "housing",
    title: "Housing",
    icon: Home,
    body: "Rent, insurance, maintenance, and location can move spending more than the withdrawal-rate nickname.",
    href: "/blog/lean-fire-budget-lifestyle",
    linkLabel: "Budget and lifestyle notes",
  },
  {
    id: "sequence",
    title: "Sequence of returns",
    icon: TrendingDown,
    body: "The same long-run average can fail if poor markets arrive early in withdrawals.",
    href: "/resources/sequence-risk-guide",
    linkLabel: "Sequence-risk guide",
  },
  {
    id: "taxes",
    title: "Taxes",
    icon: Receipt,
    body: "These tools illustrate pre-tax planning math. Account types and later withdrawals can raise the cash you need.",
    href: "https://www.irs.gov/publications/p590a",
    linkLabel: "IRS Publication 590-A",
    external: true,
  },
  {
    id: "longevity",
    title: "Longevity",
    icon: Hourglass,
    body: "A longer retirement needs more years of spending than a 30-year historical rule of thumb.",
    href: "https://www.ssa.gov/benefits/retirement/planner/delayret.html",
    linkLabel: "SSA delayed retirement",
    external: true,
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    icon: Sparkles,
    body: "Travel, family support, and spending creep change the target. Revisit the number when life changes.",
    href: "/blog/lean-regular-fat-fire-numbers-2026",
    linkLabel: "Lean / Regular / Fat examples",
  },
] as const;

/**
 * Evidence-linked planning risks that sit next to calculator results.
 * Educational only — no new formulas and no outcome guarantees.
 */
export function FailureModes() {
  return (
    <section
      id="failure-modes"
      aria-labelledby="failure-modes-heading"
      className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl bg-amber-500/10 p-2.5 text-amber-300 ring-1 ring-amber-500/20">
          <AlertTriangle className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2
            id="failure-modes-heading"
            className="text-base font-semibold text-zinc-100"
          >
            Ways a plan can miss
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            The numbers above are illustrations under stated assumptions. These
            six gaps are common reasons a tidy multiple does not hold up in
            life. Read the{" "}
            <Link
              href="/methodology"
              className="text-emerald-400 hover:underline"
            >
              methodology
            </Link>{" "}
            and{" "}
            <Link href="/disclaimer" className="text-emerald-400 hover:underline">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          return (
            <li
              key={mode.id}
              className="rounded-xl bg-zinc-900/60 p-3 ring-1 ring-zinc-800"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-zinc-100">
                <Icon className="h-4 w-4 text-zinc-400" aria-hidden />
                <span>{mode.title}</span>
                <span className="text-xs font-normal text-zinc-500">
                  Watch item
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {mode.body}
              </p>
              {"external" in mode && mode.external ? (
                <a
                  href={mode.href}
                  className="mt-2 inline-flex min-h-11 items-center text-sm text-emerald-400 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {mode.linkLabel}
                </a>
              ) : (
                <Link
                  href={mode.href}
                  className="mt-2 inline-flex min-h-11 items-center text-sm text-emerald-400 hover:underline"
                >
                  {mode.linkLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
