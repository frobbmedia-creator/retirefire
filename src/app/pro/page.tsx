import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pro/CheckoutButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/pro", {
  title: "RetireFire Pro Pricing",
  description: "Optional advanced retirement planning tools and reports. Core RetireFire calculators stay free forever.",
});

const proFeatures = [
  "Advanced planning workflows",
  "Deeper scenario analysis",
  "Pro reports and future premium tools",
];

export default function ProPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pro", path: "/pro" }]} />
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">RetireFire Pro</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Go deeper when you need to.</h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">Optional paid tools support more detailed planning. Core calculators stay free forever—no account wall, no stripped-down essentials.</p>
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
          <div className="mt-8"><CheckoutButton plan="annual">Choose annual</CheckoutButton></div>
        </section>

        <section className="rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800">
          <p className="text-sm font-medium text-zinc-400">Flexible access</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Pro Monthly</h2>
          <p className="mt-2 text-3xl font-semibold text-zinc-50">$9<span className="text-base font-normal text-zinc-400"> / month</span></p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {proFeatures.map((feature) => <li className="flex gap-2" key={feature}><Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />{feature}</li>)}
          </ul>
          <div className="mt-8"><CheckoutButton plan="monthly" variant="secondary">Choose monthly</CheckoutButton></div>
        </section>
      </div>

      <section className="mx-auto mt-8 flex max-w-3xl flex-col gap-5 rounded-2xl bg-zinc-900/50 p-6 ring-1 ring-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-semibold text-zinc-50">One-time Pro report</h2><p className="mt-1 text-sm text-zinc-400">Get a detailed planning report without a subscription.</p></div>
        <div className="min-w-48"><p className="mb-2 text-center text-2xl font-semibold text-zinc-50">$19</p><CheckoutButton plan="report" variant="secondary">Buy one report</CheckoutButton></div>
      </section>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-zinc-500">RetireFire is educational software, not financial, tax, or investment advice. Purchases unlock software features—not outcomes or guarantees.</p>
    </main>
  );
}
