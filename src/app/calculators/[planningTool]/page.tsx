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
import { pageMeta, softwareApplicationJsonLd, faqPageJsonLd } from "@/lib/seo";

type SeoTable = {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
};

type SeoDetails = {
  heading: string;
  howItWorks: readonly string[];
  formulaIntro?: string;
  formula: string;
  exampleTitle: string;
  exampleBody: readonly string[];
  table?: SeoTable;
  whenToUse: readonly string[];
  limitations: readonly string[];
  faq: readonly { question: string; answer: string }[];
};

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
    seo: {
      heading: "How does the retirement-age math work?",
      howItWorks: [
        "The calculation has two steps. First it sets the target: yearly spending divided by your planned withdrawal rate. At 4%, a $60,000 lifestyle needs $1,500,000 — the classic 25× rule.",
        "Then it solves for time: how many years of compounding your current portfolio plus your annual savings, at an assumed real return, until the balance reaches the target. The growth rate is after inflation because the spending target is in today's dollars.",
        "Higher savings shorten the timeline two ways at once: more dollars go in, and the compounding base grows faster. That is why the savings rate usually moves the date more than small return tweaks.",
      ],
      formula:
        "Target = Annual spending ÷ Withdrawal rate\nFV(n)  = PV·(1+r)ⁿ + PMT·[((1+r)ⁿ − 1) / r]\nSolve for n (years until FV(n) ≥ Target)\n\nPV = starting portfolio · PMT = annual savings · r = real return",
      exampleTitle: "Worked example: 35, $100k saved, $30k a year",
      exampleBody: [
        "A 35-year-old with $100,000 saved, adding $30,000 a year at 5% real return, targeting $1.5M ($60,000 spending ÷ 4%). After 22 years the projection is about $1.45M — just short. After 23 years it is about $1.55M — just over.",
        "So the estimated retirement age is roughly 57 to 58. Raise annual savings to $40,000 and the timeline compresses to about 19 years (around age 54). Drop to $20,000 and it stretches past 27 years.",
      ],
      table: {
        headers: ["Annual savings", "Years to $1.5M", "Retirement age (from 35)"],
        rows: [
          ["$20,000", "≈ 27.5", "≈ 62–63"],
          ["$30,000", "≈ 22.5", "≈ 57–58"],
          ["$40,000", "≈ 19.3", "≈ 54"],
          ["$50,000", "≈ 16.8", "≈ 52"],
        ],
        caption: "Illustrative: $100k starting balance, 5% real return, $1.5M target.",
      },
      whenToUse: [
        "You want a date, not just a number — when the saving can plausibly stop.",
        "You are comparing what raising your savings rate actually buys in years.",
        "You want to see how sensitive the date is to the return assumption.",
      ],
      limitations: [
        "Illustrative only — markets do not compound smoothly at 5% every year.",
        "Does not model taxes, fees, Social Security, or pensions; subtract reliable income from spending first.",
        "Spending is assumed constant in today's dollars; lifestyle changes move the target.",
      ],
      faq: [
        {
          question: "Does it include my employer 401(k) match?",
          answer:
            "Add the match to your annual savings number. The calculator only sees one savings figure, so fold every contribution source into it.",
        },
        {
          question: "What return should I assume?",
          answer:
            "A real (after-inflation) return, since the target is in today's dollars. Five percent is a common illustrative starting point; re-run at 3–4% to see the conservative case.",
        },
        {
          question: "Why does the last stretch take so long?",
          answer:
            "Compounding does the heavy lifting late. Early years are mostly your contributions; later years are mostly growth on growth. That is also why starting early beats saving harder later.",
        },
        {
          question: "Does it account for Social Security?",
          answer:
            "No. Reduce your spending target by the reliable income you expect (Social Security, pensions) and run the calculator on the remainder — that is the portfolio's actual job.",
        },
        {
          question: "How often should I recheck?",
          answer:
            "Yearly, or after any big change in savings, spending, or markets. The date is a moving estimate, not a contract.",
        },
      ],
    } satisfies SeoDetails,
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
    seo: {
      heading: "What does “ready” actually mean?",
      howItWorks: [
        "Ready is a ratio, not a balance. First compute the portfolio burden: yearly spending minus reliable income (Social Security, pensions). That remainder is the only part your investments must fund.",
        "Divide the burden by your withdrawal rate to get the required portfolio. At 4%, every $10,000 of annual burden needs $250,000 of portfolio. Your readiness is your actual portfolio divided by that required number.",
        "Most early retirees get two answers, not one: the bridge years before Social Security starts (burden is the full spending) and the years after (burden drops). Price both.",
      ],
      formula:
        "Portfolio burden = Annual spending − reliable income\nRequired portfolio = Burden ÷ Withdrawal rate\nReadiness = Actual portfolio ÷ Required portfolio",
      exampleTitle: "Worked example: $900k against a $70,000 life",
      exampleBody: [
        "Spending is $70,000 a year. Social Security will pay $24,000 starting at 67; no pension. After 67 the portfolio burden is $46,000, so the required portfolio at 4% is $1,150,000. A $900,000 portfolio is 78% ready for those years.",
        "Before 67 the burden is the full $70,000 — required portfolio $1,750,000, so the same $900,000 is only 51% ready for the bridge. The bridge is almost always the binding constraint, and it is the part most people forget to price.",
      ],
      table: {
        headers: ["Readiness", "What it means", "Sensible next step"],
        rows: [
          ["Under 70%", "Not yet — the gap is structural", "Raise savings or extend the timeline"],
          ["70–90%", "Close — within striking distance", "Trim spending or add a year or two"],
          ["90–110%", "Borderline — sequence risk decides", "Stress-test lower returns before quitting"],
          ["Over 110%", "Buffer — margin for bad markets", "Recheck yearly; don't inflate spending"],
        ],
      },
      whenToUse: [
        "You have a portfolio number and want to know if it covers your actual life.",
        "You are weighing retiring before Social Security or a pension starts.",
        "You want the honest two-phase answer: bridge years and after.",
      ],
      limitations: [
        "Illustrative only — a ratio can't capture sequence-of-returns risk.",
        "Home equity is excluded; you cannot spend the roof without selling or borrowing.",
        "Reliable income estimates (especially future Social Security) are themselves uncertain.",
      ],
      faq: [
        {
          question: "I'm at 100% — can I quit tomorrow?",
          answer:
            "100% means the math works on paper at your chosen withdrawal rate. It doesn't protect against retiring into a bear market. Stress-test 3–3.5% and read the sequence-risk guide before giving notice.",
        },
        {
          question: "Does it count my home equity?",
          answer:
            "No, and it shouldn't. Equity isn't spendable income unless you sell, downsize, or borrow against it — each of which is a separate decision with its own costs.",
        },
        {
          question: "What about part-time income in early retirement?",
          answer:
            "Treat it like Social Security: subtract it from spending to get the portfolio burden. Just be honest about how durable that income really is.",
        },
        {
          question: "Why two numbers — before and after 67?",
          answer:
            "Because the portfolio's job changes. Before reliable income starts it must fund everything; after, only the gap. The bridge years almost always need the bigger portfolio.",
        },
        {
          question: "How often should I recheck readiness?",
          answer:
            "Yearly, and after big market moves. Readiness is a live ratio — it moves with your balance whether you look at it or not.",
        },
      ],
    } satisfies SeoDetails,
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
    seo: {
      heading: "What are withdrawal guardrails?",
      howItWorks: [
        "The classic 4% rule spends a fixed inflation-adjusted amount no matter what markets do — simple, but brittle in bad decades. Guardrails make spending adaptive: pre-committed rules that cut spending when the portfolio shrinks and raise it when the portfolio grows.",
        "The mechanics come from the Guyton-Klinger decision rules. Each year you check the current withdrawal rate (this year's spending ÷ current portfolio). If it has fallen below your lower guardrail, the portfolio is strong — raise spending, typically 10%. If it has risen above your upper guardrail, the portfolio is stressed — cut spending, typically 10%.",
        "Between the guardrails you do nothing except the normal inflation adjustment. The discipline is the product: small, early, rule-based adjustments beat large, panicked ones later.",
      ],
      formula:
        "Current withdrawal rate = This year's spending ÷ Current portfolio\nIf WR < lower guardrail → raise spending ~10%\nIf WR > upper guardrail → cut spending ~10%\nOtherwise → inflation adjustment only",
      exampleTitle: "Worked example: $1.2M portfolio, $48,000 starting spend",
      exampleBody: [
        "Start with $1,200,000 and $48,000 a year — a 4% withdrawal rate. Set guardrails at 3.2% (raise) and 4.8% (cut). If the portfolio grows to $1.5M, the withdrawal rate falls to 3.2% and the rules say raise spending 10% to $52,800.",
        "If instead the portfolio falls to $1.0M, the withdrawal rate climbs to 4.8% and the rules say cut 10% to $43,200. The cut is unpleasant but small — and it happens early, when it does the most good.",
      ],
      table: {
        headers: ["Portfolio value", "Withdrawal rate", "Guardrail action"],
        rows: [
          ["$1,500,000", "3.2%", "Raise spending 10% → $52,800"],
          ["$1,200,000", "4.0%", "Hold — inflation adjustment only"],
          ["$1,000,000", "4.8%", "Cut spending 10% → $43,200"],
          ["$900,000", "5.3%", "Cut spending 10% → $43,200"],
        ],
        caption: "Illustrative: $48,000 starting spend, guardrails at 3.2% / 4.8%.",
      },
      whenToUse: [
        "You want a spending plan that survives bad markets without blind faith in 4%.",
        "You can tolerate 10% lifestyle adjustments in exchange for a higher starting spend.",
        "You want rules written down before stress arrives, not improvised during it.",
      ],
      limitations: [
        "Simplified illustration of Guyton-Klinger-style rules, not the full published methodology.",
        "Assumes you will actually cut spending when told — the behavioral part is the hard part.",
        "Does not model taxes, fees, or lumpy one-time expenses.",
      ],
      faq: [
        {
          question: "Is this the Guyton-Klinger rule?",
          answer:
            "It is inspired by it. The published Guyton-Klinger framework has more decision rules (including inflation and capital-preservation rules); this calculator implements the core guardrail mechanic in simplified form.",
        },
        {
          question: "How is this different from the 4% rule?",
          answer:
            "The 4% rule is fixed: same inflation-adjusted spending every year regardless of markets. Guardrails are adaptive: spending moves with the portfolio inside pre-set rules, which historically supports higher starting spending with similar safety.",
        },
        {
          question: "Won't the cuts hurt?",
          answer:
            "That is the trade. A 10% cut early in a downturn does far more for portfolio survival than a 30% cut forced years later. The rules make the pain small and early on purpose.",
        },
        {
          question: "Do I still get inflation raises?",
          answer:
            "Between the guardrails, yes — normal inflation adjustments continue. At the guardrails, the 10% adjustment replaces the inflation raise for that year.",
        },
        {
          question: "What guardrail levels should I pick?",
          answer:
            "Common setups center on the starting rate: roughly 20% below it for the raise trigger and 20% above for the cut trigger (e.g., 3.2% / 4.8% around a 4% start). Wider guardrails mean fewer adjustments; narrower means more.",
        },
      ],
    } satisfies SeoDetails,
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
    seo: {
      heading: "What does this calculator actually estimate?",
      howItWorks: [
        "A Roth conversion moves pre-tax IRA or 401(k) dollars into a Roth IRA, and the converted amount counts as ordinary taxable income in the conversion year. This calculator estimates the incremental federal income tax from one proposed conversion: it stacks your conversion on top of your current taxable income and runs the total through the progressive brackets.",
        "Progressive means marginal: only the dollars that land in each bracket are taxed at that bracket's rate. The question the calculator answers is what the conversion's dollars cost at the margin — not your average tax rate.",
        "Early retirees get a window for this: the low-income years between retiring and starting Social Security or RMDs, when there is often empty room in the lower brackets. Filling that room with conversions is the core strategy.",
      ],
      formula:
        "Incremental tax = Σ (conversion dollars in bracketᵢ × rateᵢ)\n\nThe conversion stacks on top of existing taxable income.\nOnly marginal dollars are taxed at the marginal rate.",
      exampleTitle: "Worked example: a $40,000 conversion in a low-income year",
      exampleBody: [
        "Retired at 55 with $30,000 of taxable income after deductions. Converting $40,000 brings total taxable income to $70,000 — and the conversion's dollars are taxed at the marginal rate they land in.",
        "If those marginal dollars fall in the 12% bracket, the incremental federal tax is about $4,800 (12% × $40,000). Push the conversion big enough to spill into the 22% bracket and each additional dollar costs 22 cents instead of 12 — which is exactly why conversions are usually sized to fill, not overflow, a bracket.",
      ],
      table: {
        headers: ["Conversion size", "Illustrative incremental tax", "Note"],
        rows: [
          ["$20,000", "≈ $2,400", "At a 12% marginal rate"],
          ["$40,000", "≈ $4,800", "At a 12% marginal rate"],
          ["$60,000", "≈ $7,200+", "Top dollars may spill into 22%"],
        ],
        caption: "Illustrative only — your marginal rate depends on total taxable income and filing status.",
      },
      whenToUse: [
        "You are in low-income years before Social Security or RMDs begin.",
        "You want to size a conversion to fill a bracket without spilling into the next.",
        "You are comparing converting now versus paying tax on larger RMDs later.",
      ],
      limitations: [
        "Federal income tax only — excludes state tax, credits, and capital-gain interactions.",
        "Excludes ACA premium assistance (conversions raise MAGI) and Medicare IRMAA (two-year lookback).",
        "Single-year snapshot — real optimization is multiyear and usually needs a tax professional.",
      ],
      faq: [
        {
          question: "What is the 5-year rule on conversions?",
          answer:
            "Each Roth conversion has its own 5-year clock. If you are under 59½, withdrawing converted principal before its clock runs out can trigger the 10% early-withdrawal penalty. The clocks are per-conversion, not per-account.",
        },
        {
          question: "What is the pro-rata rule?",
          answer:
            "If any of your traditional IRAs hold pre-tax money, you cannot convert only the after-tax dollars. Each conversion is treated as a proportional mix of pre-tax and after-tax money across all your traditional IRAs — which can make a 'clean' backdoor conversion partly taxable.",
        },
        {
          question: "Do Roth conversions affect ACA health subsidies?",
          answer:
            "Yes. Conversions raise your modified adjusted gross income, which is the number ACA premium assistance is based on. A conversion that looks cheap in tax brackets can cost far more in lost subsidies — model both together.",
        },
        {
          question: "Do conversions affect Medicare premiums?",
          answer:
            "Yes, through IRMAA: Medicare looks back at your income from two years prior, so a big conversion at 63 raises premiums at 65. Plan conversions around that lookback window.",
        },
        {
          question: "Should I convert more in a market dip?",
          answer:
            "Often yes, as a tactic: converting the same number of shares costs less tax when prices are down, and the recovery then happens inside the Roth tax-free. The bracket math still governs how much to convert.",
        },
        {
          question: "Is there a downside to converting too much?",
          answer:
            "Bracket spillover, lost ACA subsidies, IRMAA hits, and paying tax now at a higher rate than you'd pay later. Conversions are timing plays — the win is arbitraging your low-rate years against your high-rate years.",
        },
      ],
    } satisfies SeoDetails,
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
    seo: {
      heading: "What does early-retirement healthcare actually cost?",
      howItWorks: [
        "Retiring before 65 means funding your own health insurance for the bridge years — every year between your last employer plan and Medicare. The calculator builds the estimate from the pieces people forget: monthly premiums plus deductibles and out-of-pocket costs, dental and vision (usually separate from medical), minus any financial assistance, with medical inflation applied across the bridge.",
        "The bridge has three phases. COBRA lets you keep your employer plan for up to 18 months — convenient, but you pay the full premium plus a 2% administrative charge, so sticker shock is normal. Then the ACA marketplace covers the middle years, where assistance phases out as income rises. At 65, Medicare takes over with its own premium and supplemental structure.",
        "The lever most early retirees miss is income: ACA assistance is based on modified adjusted gross income, so Roth conversions, capital gains realizations, and part-time work all change what you pay for insurance. Healthcare budgeting and income planning are the same exercise.",
      ],
      formula:
        "Bridge cost = Σ over bridge years (annual premiums + expected out-of-pocket)\n              + dental/vision − financial assistance\n\nPhases: COBRA (up to 18 months) → ACA marketplace → Medicare at 65",
      exampleTitle: "Worked example: retiring at 55, ten bridge years",
      exampleBody: [
        "Retire at 55 and Medicare at 65 leaves a 10-year bridge. The first 18 months might run on COBRA at full employer-plan premiums; the remaining 8.5 years on a marketplace plan.",
        "At an illustrative $12,000 a year all-in (premiums plus out-of-pocket, net of assistance), the bridge costs about $120,000 — before medical inflation, which historically outpaces general inflation. That number belongs inside the FIRE target, not next to it.",
      ],
      table: {
        headers: ["Phase", "When (retire at 55)", "What you're paying for"],
        rows: [
          ["COBRA", "Ages 55–56.5", "Full employer premium + 2% admin charge"],
          ["ACA marketplace", "Ages 56.5–65", "Premiums + OOP; assistance phases out as income rises"],
          ["Medicare", "65+", "Parts A/B/D plus supplemental coverage"],
        ],
        caption: "The three phases of the healthcare bridge to Medicare.",
      },
      whenToUse: [
        "You are pricing retirement before 65 and need the bridge inside your FIRE number.",
        "You want to compare COBRA versus marketplace costs for the first 18 months.",
        "You are modeling how income choices (conversions, part-time work) change insurance costs.",
      ],
      limitations: [
        "Illustrative only — real premiums vary enormously by state, age, and plan.",
        "Assistance rules and program details change; verify current ACA and Medicare terms.",
        "Does not model long-term care, which is a separate and much larger risk.",
      ],
      faq: [
        {
          question: "How long does COBRA last?",
          answer:
            "Up to 18 months for the standard qualifying events. It keeps your exact employer plan, but you pay the full premium plus a 2% administrative charge — often two to three times what came out of your paycheck.",
        },
        {
          question: "When does Medicare start?",
          answer:
            "At 65 for most people. Note the IRMAA lookback: Medicare premiums at 65 are based on your income at 63, so big Roth conversions at 63 raise premiums at 65.",
        },
        {
          question: "What is the HSA triple tax advantage?",
          answer:
            "Contributions are deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free — the only account with all three. In early retirement, an HSA balance is a dedicated medical bridge fund.",
        },
        {
          question: "Do I need separate dental and vision coverage?",
          answer:
            "Usually yes, or a cash budget for it. Medical plans — including Medicare — typically exclude routine dental and vision, and those bills land exactly when you're paying everything else out of pocket.",
        },
        {
          question: "Can income planning really change my premiums?",
          answer:
            "Dramatically. ACA assistance keys off modified adjusted gross income, so the same household can pay wildly different premiums depending on how conversions, gains, and work income are timed across the bridge years.",
        },
      ],
    } satisfies SeoDetails,
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

const th = "bg-zinc-900 px-4 py-2.5 text-left font-semibold text-zinc-200";
const td = "border-t border-zinc-800 px-4 py-2.5 text-zinc-400";

function ToolSeoSection({ seo }: { seo: SeoDetails }) {
  return (
    <section className="mt-14 max-w-3xl border-t border-zinc-800/80 pt-12">
      <JsonLd data={faqPageJsonLd(seo.faq)} />
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        {seo.heading}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-400">
        {seo.howItWorks.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">Formula</h3>
      {seo.formulaIntro && (
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
          {seo.formulaIntro}
        </p>
      )}
      <pre className="mt-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-sm text-emerald-300 ring-1 ring-zinc-800">
        {seo.formula}
      </pre>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">
        {seo.exampleTitle}
      </h3>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-400">
        {seo.exampleBody.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </div>

      {seo.table && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] rounded-xl text-sm ring-1 ring-zinc-800">
            <thead>
              <tr>
                {seo.table.headers.map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seo.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={td}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {seo.table.caption && (
            <p className="mt-3 text-xs text-zinc-600">{seo.table.caption}</p>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">When to use it</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            {seo.whenToUse.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">Limitations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            {seo.limitations.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-10 text-lg font-semibold text-zinc-100">FAQ</h3>
      <dl className="mt-4 space-y-3">
        {seo.faq.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <dt className="font-medium text-zinc-100">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-xs leading-relaxed text-zinc-600">
        Educational illustration only — not financial, investment, tax, or legal
        advice.{" "}
        <Link href="/disclaimer" className="text-zinc-500 hover:text-emerald-400">
          Full disclaimer
        </Link>
        .
      </p>
    </section>
  );
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
      <ToolSeoSection seo={tool.seo} />
    </main>
  );
}
