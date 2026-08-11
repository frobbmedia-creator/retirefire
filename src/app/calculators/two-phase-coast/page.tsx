import type { Metadata } from "next";
import Link from "next/link";
import { TwoPhaseCoastCalculator } from "@/components/calculators/TwoPhaseCoastCalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd } from "@/lib/seo";

const path = "/calculators/two-phase-coast";
const description =
  "Model contribution years followed by Coast FIRE years with no new retirement contributions, using transparent real-return assumptions.";

export const metadata: Metadata = pageMeta(path, {
  title: "Two-Phase Coast FIRE Calculator",
  description,
  openGraph: { title: "Two-Phase Coast FIRE Calculator · RetireFire", description },
});

export default function TwoPhaseCoastPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={softwareApplicationJsonLd({ name: "Two-Phase Coast FIRE Calculator", description, path })} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "Two-Phase Coast FIRE", path }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Two-phase Coast FIRE calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">{description}</p>
      </header>
      <div className="mt-8"><TwoPhaseCoastCalculator /></div>
      <section className="mt-10 space-y-4 text-sm leading-relaxed text-zinc-400">
        <h2 className="text-xl font-semibold text-zinc-50">Why two phases?</h2>
        <p>
          Many people do not stop contributions today. They save aggressively
          for several more years, then reduce contributions while the portfolio
          compounds. This tool keeps those periods separate.
        </p>
        <p>
          Compare the result with the standard{" "}
          <Link href="/calculators/coast-fire" className="text-emerald-400 hover:underline">
            Coast FIRE calculator
          </Link>{" "}
          and stress-test lower returns before changing savings behavior.
        </p>
      </section>
    </main>
  );
}
