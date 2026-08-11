import type { Metadata } from "next";
import Link from "next/link";
import { RetirementCheckup } from "@/components/checkup/RetirementCheckup";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd } from "@/lib/seo";

const path = "/retirement-checkup";
const description =
  "Answer six simple questions to see whether your retirement plan is on track, estimate a retirement age, and find practical next steps.";

export const metadata: Metadata = pageMeta(path, {
  title: "Free Retirement Checkup: Am I on Track?",
  description,
  openGraph: {
    title: "Free Retirement Checkup · RetireFire",
    description,
  },
});

export default function RetirementCheckupPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd
        data={softwareApplicationJsonLd({
          name: "RetireFire Retirement Checkup",
          description,
          path,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Retirement Checkup", path },
        ]}
      />
      <header className="mx-auto mt-5 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
          Six questions · About three minutes
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Are you on track for retirement?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Get a clear starting point without creating an account. We will
          estimate your retirement age, the spending your plan may support, and
          the changes that could help most.
        </p>
      </header>

      <div className="mt-8 sm:mt-10">
        <RetirementCheckup />
      </div>

      <section className="mx-auto mt-10 max-w-3xl border-t border-zinc-800 pt-8">
        <h2 className="text-xl font-semibold text-zinc-50">
          A simple start, with FIRE depth behind it
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          This checkup gives you a useful first answer. RetireFire’s detailed
          tools let you continue with Coast FIRE, Barista FIRE, couples
          planning, retirement spending limits, Roth conversions, healthcare,
          and tests of different market paths.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/calculators" className="text-emerald-400 hover:underline">
            View all FIRE calculators
          </Link>
          <Link href="/guides" className="text-emerald-400 hover:underline">
            Browse retirement guides
          </Link>
          <Link href="/research" className="text-emerald-400 hover:underline">
            Explore research and data
          </Link>
        </div>
      </section>
    </main>
  );
}
