import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/calculators", {
  title: "All FIRE Calculators — Coast, Barista, Number & Years",
  description:
    "Free Coast FIRE, Barista FIRE, FIRE number, and years-to-FI calculators with sequence stress tests, age tables, scenario compare, and published methodology.",
  openGraph: {
    title: "All FIRE Calculators · RetireFire",
    description:
      "Coast, Barista, FIRE number, years — free stress tests and transparent math.",
  },
});

const TOOLS = [
  {
    href: "/calculators/fire-number",
    title: "FIRE Number",
    body: "How large a portfolio you need for Lean, Regular, or Fat FIRE — with SWR sensitivity.",
  },
  {
    href: "/calculators/years-to-fire",
    title: "Years to FIRE",
    body: "Timeline to FI with growth chart, lever sensitivity, and free sequence stress test.",
  },
  {
    href: "/calculators/coast-fire",
    title: "Coast FIRE",
    body: "Coast number, age table, sensitivity, free sequence stress test, and checklist links.",
  },
  {
    href: "/calculators/barista-fire",
    title: "Barista FIRE",
    body: "Semi-retirement: part-time income + smaller nest egg, with income sensitivity.",
  },
  {
    href: "/#scenario-compare",
    title: "Scenario A/B compare",
    body: "Pin a baseline and compare FIRE, years, Coast, and Barista side by side.",
  },
  {
    href: "/#savings-rate",
    title: "Savings rate table",
    body: "See how different savings rates change years to FI.",
  },
] as const;

const GUIDES = [
  {
    href: "/resources/coast-fire-checklist",
    label: "Coast assumptions checklist",
  },
  {
    href: "/resources/sequence-risk-guide",
    label: "Sequence risk guide",
  },
  {
    href: "/blog/how-to-stress-test-coast-fire-number",
    label: "How to stress-test Coast",
  },
  {
    href: "/methodology",
    label: "Methodology",
  },
] as const;

export default function CalculatorsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Free FIRE calculators
      </h1>
      <p className="mt-3 text-zinc-400">
        Every tool shares assumptions and can be linked via URL. Coast and Years
        include a free basic stress test. Or use the{" "}
        <Link href="/#calculators" className="text-emerald-400 hover:underline">
          all-in-one hub on the homepage
        </Link>
        .
      </p>
      <ul className="mt-10 space-y-3">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-500/30 hover:bg-zinc-900"
            >
              <p className="font-medium text-zinc-100">{t.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{t.body}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Pair with free guides
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="text-emerald-400 hover:underline">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
