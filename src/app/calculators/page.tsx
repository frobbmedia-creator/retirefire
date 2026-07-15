import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/calculators", {
  title: "All FIRE Calculators",
  description:
    "Free FIRE Number, Years to FIRE, Coast FIRE, Barista FIRE, and savings-rate tools — evidence-based retirement calculators with published methodology.",
  openGraph: {
    title: "All FIRE Calculators · RetireFire",
    description:
      "FIRE Number, Years to FIRE, Coast FIRE, Barista FIRE — free and transparent.",
  },
});

const TOOLS = [
  {
    href: "/calculators/fire-number",
    title: "FIRE Number",
    body: "How large a portfolio you need for Lean, Regular, or Fat FIRE.",
  },
  {
    href: "/calculators/years-to-fire",
    title: "Years to FIRE",
    body: "Timeline to financial independence with a growth chart.",
  },
  {
    href: "/calculators/coast-fire",
    title: "Coast FIRE",
    body: "When you can stop saving and let compound growth finish.",
  },
  {
    href: "/calculators/barista-fire",
    title: "Barista FIRE",
    body: "Semi-retirement: part-time income + a smaller nest egg.",
  },
  {
    href: "/#savings-rate",
    title: "Savings rate table",
    body: "See how different savings rates change years to FI.",
  },
] as const;

export default function CalculatorsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Free FIRE calculators
      </h1>
      <p className="mt-3 text-zinc-400">
        Every tool shares assumptions and can be linked via URL. Or use the{" "}
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
    </div>
  );
}
