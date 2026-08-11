import type { Metadata } from "next";
import Link from "next/link";
import { CouplesFireCalculator } from "@/components/calculators/CouplesFireCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd } from "@/lib/seo";

const path = "/calculators/couples-fire";
const description =
  "Combine two portfolios and durable income streams against shared household spending without hiding account ownership or survivor limitations.";

export const metadata: Metadata = pageMeta(path, {
  title: "FIRE Calculator for Couples",
  description,
  openGraph: { title: "FIRE Calculator for Couples · RetireFire", description },
});

export default function CouplesFirePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={softwareApplicationJsonLd({ name: "FIRE Calculator for Couples", description, path })} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "Couples FIRE", path }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          FIRE calculator for couples
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">{description}</p>
      </header>
      <div className="mt-8"><CouplesFireCalculator /></div>
      <section className="mt-10 space-y-4 text-sm leading-relaxed text-zinc-400">
        <h2 className="text-xl font-semibold text-zinc-50">Use one household target, preserve two timelines</h2>
        <p>
          This quick calculator combines balances and later income for a
          steady-state view. The{" "}
          <Link href="/coast-fire-for-couples" className="text-emerald-400 hover:underline">
            couples planning guide
          </Link>{" "}
          covers benefit dates, healthcare, account ownership, and survivor scenarios.
        </p>
      </section>
    </main>
  );
}
