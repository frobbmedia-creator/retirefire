import type { Metadata } from "next";
import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/pro", {
  title: "RetireFire Pro Pricing",
  description: "Optional advanced retirement planning tools and reports. Core RetireFire calculators stay free forever.",
});

const proFeatures = [
  "Saved plans and scenario history",
  "Deeper scenario and market-risk analysis",
  "Detailed planning reports",
];

export default function ProPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pro", path: "/pro" }]} />
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">RetireFire Pro · In development</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Go deeper when you need to.</h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">Core calculators stay free forever. Paid plans will open after saved accounts, reliable purchase delivery, and self-service billing are complete.</p>
        <div className="mt-6 rounded-2xl bg-amber-500/10 px-5 py-4 text-left text-sm leading-relaxed text-amber-100 ring-1 ring-amber-500/25">
          Checkout is temporarily paused. We will not accept payment until every purchase can be delivered and managed reliably.
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800">
          <p className="text-sm font-medium text-emerald-400">Free forever</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Free</h2>
          <p className="mt-2 text-3xl font-semibold text-zinc-50">$0</p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {["All core FIRE calculators", "Published assumptions and methodology", "Useful basic stress testing"].map((feature) => <li className="flex gap-2" key={feature}><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />{feature}</li>)}
          </ul>
        </section>

        <section className="rounded-2xl bg-zinc-900 p-6 ring-2 ring-emerald-500/70">
          <p className="text-sm font-medium text-emerald-400">Best value</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Pro Annual</h2>
          <p className="mt-2 text-3xl font-semibold text-zinc-50">$79<span className="text-base font-normal text-zinc-400"> / year</span></p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {proFeatures.map((feature) => <li className="flex gap-2" key={feature}><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />{feature}</li>)}
          </ul>
          <button type="button" disabled className="mt-8 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-zinc-800 px-6 text-sm font-semibold text-zinc-500">Coming soon</button>
        </section>

        <section className="rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800">
          <p className="text-sm font-medium text-zinc-400">Flexible access</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Pro Monthly</h2>
          <p className="mt-2 text-3xl font-semibold text-zinc-50">$9<span className="text-base font-normal text-zinc-400"> / month</span></p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {proFeatures.map((feature) => <li className="flex gap-2" key={feature}><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />{feature}</li>)}
          </ul>
          <button type="button" disabled className="mt-8 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-zinc-800 px-6 text-sm font-semibold text-zinc-500">Coming soon</button>
        </section>
      </div>

      <section className="mx-auto mt-8 flex max-w-3xl flex-col gap-5 rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-semibold text-zinc-50">One-time Pro report</h2><p className="mt-1 text-sm text-zinc-400">Get a detailed planning report without a subscription.</p></div>
        <div className="min-w-48"><p className="mb-2 text-center text-2xl font-semibold text-zinc-50">$19</p><button type="button" disabled className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-zinc-800 px-6 text-sm font-semibold text-zinc-500">Coming soon</button></div>
      </section>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <Link href="/retirement-checkup" className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 font-semibold text-zinc-950 transition hover:bg-emerald-400">Use the free retirement checkup</Link>
        <p className="mt-5 text-sm leading-relaxed text-zinc-500">RetireFire is educational software, not financial, tax, or investment advice.</p>
      </div>
    </main>
  );
}
