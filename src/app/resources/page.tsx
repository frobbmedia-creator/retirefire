import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/resources", {
  title: "Free FIRE Resources",
  description:
    "Free Coast FIRE checklist, sequence-of-returns risk guide, and educational tools from RetireFire — transparent math, no account required.",
  openGraph: {
    title: "Free FIRE Resources · RetireFire",
    description: "Checklists and guides that pair with free FIRE calculators.",
  },
});

const RESOURCES = [
  {
    href: "/resources/coast-fire-checklist",
    title: "Coast FIRE assumptions checklist",
    body: "Pre-flight questions before you change savings behavior based on a single coast number.",
  },
  {
    href: "/resources/sequence-risk-guide",
    title: "Sequence of returns risk guide",
    body: "How to read path risk, success rates, and free stress tests without false precision.",
  },
  {
    href: "/methodology",
    title: "Methodology",
    body: "Published formulas, defaults, and the Monte Carlo model notes.",
  },
  {
    href: "/approach",
    title: "Approach, limitations & roadmap",
    body: "Product philosophy and what stays free.",
  },
  {
    href: "/blog",
    title: "Blog guides",
    body: "Coast, Barista, SWR, age tables, and stress-test education.",
  },
  {
    href: "/calculators",
    title: "All calculators",
    body: "FIRE number, years, Coast, Barista — free and shareable.",
  },
] as const;

export default function ResourcesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Free resources
      </h1>
      <p className="mt-3 text-zinc-400">
        Educational checklists and guides that pair with RetireFire calculators.
        No account required. Not financial advice.
      </p>
      <ul className="mt-10 space-y-3">
        {RESOURCES.map((r) => (
          <li key={r.href}>
            <Link
              href={r.href}
              className="block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-500/30 hover:bg-zinc-900"
            >
              <p className="font-medium text-zinc-100">{r.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{r.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
