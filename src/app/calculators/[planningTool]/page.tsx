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
      "The calculator first estimates how much you need. It divides yearly spending by the percentage you plan to withdraw each year. The growth rate should be after inflation because spending is entered in today’s dollars.",
    related: [
      ["/retire-at-50", "Retire at 50 guide"],
      ["/retire-at-55", "Retire at 55 guide"],
      ["/retire-at-60", "Retire at 60 guide"],
    ],
  },
  "portfolio-readiness": {
    title: "Can I Retire With This Portfolio?",
    description:
      "Test whether your investments can cover the spending left after Social Security, pensions, or other reliable income.",
    component: PortfolioReadinessCalculator,
    explanation:
      "An investment balance does not tell the whole story. Compare it with the yearly expenses your investments must cover after other income is counted.",
    related: [
      ["/can-i-retire-with-1-million", "Retiring with $1 million"],
      ["/can-i-retire-with-2-million", "Retiring with $2 million"],
      ["/fire-calculator-with-social-security", "Add Social Security"],
    ],
  },
  "withdrawal-guardrails": {
    title: "Retirement Withdrawal Guardrails Calculator",
    description:
      "Set clear investment-balance levels for cutting or raising retirement spending.",
    component: GuardrailsCalculator,
    explanation:
      "A flexible spending plan uses rules instead of raising spending automatically every year. This worksheet shows when your rules would call for a cut or an increase.",
    related: [
      ["/resources/sequence-risk-guide", "Sequence-risk guide"],
      ["/blog/how-to-stress-test-coast-fire-number", "Stress-testing assumptions"],
      ["/methodology", "Calculator methodology"],
    ],
  },
  "roth-conversion": {
    title: "Roth Conversion Calculator for Early Retirement",
    description:
      "Estimate the incremental regular federal income tax from one proposed 2026 Roth conversion using progressive brackets.",
    component: RothConversionCalculator,
    explanation:
      "Enter current 2026 federal taxable income after deductions. The estimate adds one proposed conversion, applies ordinary-income brackets progressively, and excludes state tax, credits, capital-gain interactions, ACA assistance, Medicare IRMAA, and multiyear optimization.",
    related: [
      ["/early-retirement-health-insurance", "Healthcare before Medicare"],
      ["/retire-at-55", "Retire at 55 guide"],
      ["/disclaimer", "Financial disclaimer"],
    ],
  },
  "healthcare-budget": {
    title: "Early Retirement Healthcare Cost Calculator",
    description:
      "Estimate health costs for the first year of retirement and for all the years until Medicare begins.",
    component: HealthcareBudgetCalculator,
    explanation:
      "Monthly insurance payments are only part of the cost. Include deductibles and other out-of-pocket bills, dental and vision care, possible financial assistance, and rising medical prices.",
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
