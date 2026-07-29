import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  GuardrailsCalculator,
  HealthcareBudgetCalculator,
  PortfolioReadinessCalculator,
  RetirementAgeCalculator,
  RothConversionCalculator,
} from "@/components/calculators/PlanningTools";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, softwareApplicationJsonLd } from "@/lib/seo";

const TOOLS = {
  "retirement-age": {
    title: "Retirement Age Calculator",
    description:
      "Estimate the age when your current portfolio and annual savings could reach a spending-based retirement target.",
    component: RetirementAgeCalculator,
    explanation:
      "The estimate solves for the time needed to reach annual spending divided by your selected withdrawal rate. Use a real return when entering spending in today’s dollars.",
    related: [
      ["/retire-at-50", "Retire at 50 guide"],
      ["/retire-at-55", "Retire at 55 guide"],
      ["/retire-at-60", "Retire at 60 guide"],
    ],
  },
  "portfolio-readiness": {
    title: "Can I Retire With This Portfolio?",
    description:
      "Test whether a portfolio can cover the spending left after Social Security, pensions, or other durable income.",
    component: PortfolioReadinessCalculator,
    explanation:
      "A portfolio amount is not enough context by itself. The useful comparison is between investable assets and the annual spending gap those assets must support.",
    related: [
      ["/can-i-retire-with-1-million", "Retiring with $1 million"],
      ["/can-i-retire-with-2-million", "Retiring with $2 million"],
      ["/fire-calculator-with-social-security", "Add Social Security"],
    ],
  },
  "withdrawal-guardrails": {
    title: "Retirement Withdrawal Guardrails Calculator",
    description:
      "Turn upper and lower withdrawal-rate guardrails into portfolio triggers and planned spending adjustments.",
    component: GuardrailsCalculator,
    explanation:
      "Guardrails replace a rigid inflation-only withdrawal with explicit decision rules. This worksheet shows the trigger math so you can document the policy before markets move.",
    related: [
      ["/resources/sequence-risk-guide", "Sequence-risk guide"],
      ["/blog/how-to-stress-test-coast-fire-number", "Stress-testing assumptions"],
      ["/methodology", "Calculator methodology"],
    ],
  },
  "roth-conversion": {
    title: "Roth Conversion Calculator for Early Retirement",
    description:
      "Estimate a multi-year Roth conversion runway, simplified federal tax cost, and remaining pretax balance.",
    component: RothConversionCalculator,
    explanation:
      "Early retirement can create lower-income years before required minimum distributions. A conversion plan should also account for tax brackets, ACA subsidies, state tax, and five-year rules.",
    related: [
      ["/early-retirement-health-insurance", "Healthcare before Medicare"],
      ["/retire-at-55", "Retire at 55 guide"],
      ["/disclaimer", "Financial disclaimer"],
    ],
  },
  "healthcare-budget": {
    title: "Early Retirement Healthcare Cost Calculator",
    description:
      "Estimate the first-year and multi-year healthcare budget from retirement until Medicare eligibility.",
    component: HealthcareBudgetCalculator,
    explanation:
      "Premiums are only one part of the bridge. Include expected out-of-pocket costs, dental and vision care, possible subsidies, and a medical inflation assumption.",
    related: [
      ["/early-retirement-health-insurance", "Health insurance guide"],
      ["/retire-at-50", "Retire at 50 guide"],
      ["/calculators/roth-conversion", "Income-planning considerations"],
    ],
  },
} as const;

type ToolSlug = keyof typeof TOOLS;

export function generateStaticParams() {
  return Object.keys(TOOLS).map((planningTool) => ({ planningTool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planningTool: string }>;
}): Promise<Metadata> {
  const { planningTool } = await params;
  const tool = TOOLS[planningTool as ToolSlug];
  if (!tool) return {};
  return pageMeta(`/calculators/${planningTool}`, {
    title: tool.title,
    description: tool.description,
  });
}

export default async function PlanningToolPage({
  params,
}: {
  params: Promise<{ planningTool: string }>;
}) {
  const { planningTool } = await params;
  const tool = TOOLS[planningTool as ToolSlug];
  if (!tool) notFound();
  const Calculator = tool.component;
  const path = `/calculators/${planningTool}`;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={softwareApplicationJsonLd({
          name: tool.title,
          description: tool.description,
          path,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: tool.title, path },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-400">
          {tool.description}
        </p>
      </header>
      <div className="mt-8">
        <Calculator />
      </div>
      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-xl font-semibold text-zinc-50">
          How to use this estimate
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {tool.explanation}
        </p>
        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Continue planning
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {tool.related.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="text-emerald-400 hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
