import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/resources/coast-fire-checklist", {
  title: "Coast FIRE Assumptions Checklist",
  description:
    "Free Coast FIRE checklist: definitions, formula checks, return and SWR stress questions, healthcare and emergency-fund gates — before you change savings behavior.",
  openGraph: {
    title: "Coast FIRE Assumptions Checklist · RetireFire",
    description:
      "Transparent pre-flight checklist for Coast FIRE decisions. Educational only.",
  },
});

const SECTIONS = [
  {
    title: "1. Define the question",
    items: [
      "I am asking whether I can stop aggressive retirement contributions — not whether I can quit work tomorrow.",
      "I have separated Coast FIRE from Barista FIRE (semi-retirement with work income covering part of spend).",
      "I have a written annual spending number in today’s dollars (including healthcare realistically).",
    ],
  },
  {
    title: "2. Full FIRE target",
    items: [
      "FIRE number = annual spending ÷ withdrawal rate (I wrote both numbers down).",
      "I stress-tested at least two withdrawal rates (e.g. 3.5% and 4%), not only the most optimistic.",
      "I know Lean / Regular / Fat labels are presets, not research standards.",
    ],
  },
  {
    title: "3. Coast math",
    items: [
      "Coast ≈ full FIRE ÷ (1 + r)^n with n = traditional retirement age − current age.",
      "I tried a lower real return (e.g. 4% if my base case is 5%) and re-checked the coast number.",
      "I compared current portfolio to the coast number (shortfall vs surplus) under those assumptions.",
    ],
  },
  {
    title: "4. Sequence and cushions",
    items: [
      "I understand constant-return coast numbers ignore path risk.",
      "I ran (or plan to run) a sequence stress test / lower-r scenarios for ranges — not a single green light.",
      "I have an emergency fund separate from the invested coast pile.",
    ],
  },
  {
    title: "5. Life plumbing (outside the formula)",
    items: [
      "Healthcare plan is defined for the years I still work and for any gap years.",
      "High-interest debt and near-term cash needs are not silently assumed away.",
      "If I reduce savings, I have a rule for lifestyle creep (spending won’t silently raise full FIRE).",
    ],
  },
  {
    title: "6. Decision hygiene",
    items: [
      "A partner / co-planner (if any) saw the same assumptions (share link or CSV).",
      "I am not treating a calculator output as financial advice or a guarantee.",
      "I know what would make me re-run the numbers (job change, home, kids, markets).",
    ],
  },
] as const;

export default function CoastFireChecklistPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          {
            name: "Coast FIRE checklist",
            path: "/resources/coast-fire-checklist",
          },
        ]}
      />
      <p className="mt-6 text-sm font-medium text-emerald-400">Free resource</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Coast FIRE assumptions checklist
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Use this before you change savings behavior based on a single coast
        number. Print it, copy it, or keep it open next to the{" "}
        <Link
          href="/calculators/coast-fire"
          className="text-emerald-400 hover:underline"
        >
          Coast FIRE calculator
        </Link>
        . Educational only — not financial advice.
      </p>

      <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-100/90">
        Tip: pin a baseline in{" "}
        <Link href="/#scenario-compare" className="underline-offset-2 hover:underline">
          Scenario compare
        </Link>
        , then change return or spending and re-check this list.
      </div>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-zinc-50">
              {section.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm leading-relaxed text-zinc-300"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-600 text-[10px] text-zinc-500"
                    aria-hidden
                  >
                    ☐
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-lg font-semibold text-zinc-50">Next steps</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            <Link
              href="/calculators/coast-fire"
              className="text-emerald-400 hover:underline"
            >
              Run your Coast number
            </Link>{" "}
            with shared assumptions + age table + free stress test
          </li>
          <li>
            <Link
              href="/blog/coast-fire-by-age-tables"
              className="text-emerald-400 hover:underline"
            >
              Coast FIRE by age tables
            </Link>
          </li>
          <li>
            <Link
              href="/methodology"
              className="text-emerald-400 hover:underline"
            >
              Methodology
            </Link>{" "}
            and{" "}
            <Link href="/approach" className="text-emerald-400 hover:underline">
              Approach
            </Link>
          </li>
          <li>
            <Link
              href="/disclaimer"
              className="text-emerald-400 hover:underline"
            >
              Disclaimer
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-xs text-zinc-600">
          Email lead-magnet capture is planned later; this checklist is free
          with no account required.
        </p>
      </section>
    </div>
  );
}
