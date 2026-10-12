import type { DecisionPage } from "@/content/decision-shared";
import { expanded, money, published } from "@/content/decision-shared";

export const evergreenPagesB: DecisionPage[] = [
  {
    slug: "fire-calculator-with-social-security",
    title: "FIRE calculator with Social Security",
    description:
      "Estimate how Social Security may reduce the later portfolio-funded spending gap without incorrectly using future benefits to fund the early-retirement bridge.",
    eyebrow: "Two-phase retirement math",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Social Security can reduce the amount a portfolio must provide after benefits begin. It does not fund the years before claiming, and a simple subtraction can understate the bridge required for early retirement.",
      "Use the calculator below for the later steady-state gap, then separately reserve for the pre-benefit years.",
    ],
    takeaway:
      "Subtract Social Security only from spending in years when the benefit is expected, and separately fund the bridge before claiming.",
    sections: [
      {
        heading: "Two-phase method",
        bullets: [
          "Phase 1: retirement date through the year before benefits begin. The portfolio covers the full spending gap.",
          "Phase 2: benefit years. Subtract expected Social Security and other durable income from spending.",
          "Stress both phases for taxes, benefit uncertainty, survivor changes, and poor early returns.",
        ],
      },
      {
        heading: "Example",
        paragraphs: [
          "A household spends $72,000 and expects $30,000 of annual Social Security beginning in ten years. At 4%, the later steady-state gap of $42,000 corresponds to $1.05 million. That does not include the first ten years of larger withdrawals, so $1.05 million is not the complete retirement target.",
        ],
      },
      {
        heading: "What this quick calculator omits",
        bullets: [
          "Benefit taxation and account-specific withdrawal taxes.",
          "Cost-of-living adjustments and claiming-age tradeoffs.",
          "Survivor and spousal benefit rules.",
          "Sequence risk during the bridge.",
        ],
      },
    ],
    faq: [
      {
        question: "Does a FIRE number include Social Security?",
        answer:
          "A basic FIRE number usually does not. Social Security can be modeled as later income that reduces the spending gap after benefits begin.",
      },
      {
        question: "Can I subtract my full estimated benefit?",
        answer:
          "Use a conservative, current estimate and account for taxes, claiming age, and timing. Do not subtract it from years before it begins.",
      },
      {
        question: "What if I plan to claim at 70?",
        answer:
          "The later benefit may be higher, but the portfolio must fund a longer bridge. Compare both the benefit amount and the additional bridge withdrawals.",
      },
    ],
    related: [
      { href: "/retire-at-50", label: "Retire at 50" },
      { href: "/retire-at-55", label: "Retire at 55" },
      { href: "/fire-calculator-with-pension", label: "Include pension income" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Open the full FIRE calculator",
    embeddedIncomeCalculator: true,
  },
  {
    slug: "fire-calculator-with-pension",
    title: "FIRE calculator with pension income",
    description:
      "Estimate how pension income changes a portfolio target while keeping pension start dates, inflation protection, survivor benefits, and the bridge visible.",
    eyebrow: "Income-gap calculator",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "A pension can shrink the portfolio-funded spending gap, but only after payments begin and only for as long as the chosen benefit continues. Treat a pension as an income stream, not as a reason to ignore timing or survivor risk.",
      "Use the quick calculator for a steady-state estimate, then separately fund any years before the pension starts.",
    ],
    takeaway:
      "At a 4% planning rate, every reliable $10,000 of annual pension income reduces a simple steady-state portfolio target by about $250,000.",
    sections: [
      {
        heading: "Steady-state formula",
        paragraphs: [
          "Portfolio gap = annual spending − pension − Social Security − other durable income. Portfolio target = portfolio gap ÷ planning withdrawal rate.",
        ],
      },
      {
        heading: "Pension details that change the answer",
        bullets: [
          "Start date and whether payments are reduced for early commencement.",
          "Cost-of-living adjustment or loss of purchasing power.",
          "Single-life versus survivor benefit election.",
          "Plan credit quality and any benefit limits.",
          "Taxes and health benefits tied to the pension.",
        ],
      },
      {
        heading: "Bridge example",
        paragraphs: [
          "If retirement begins at 55 and a $24,000 pension begins at 60, the portfolio covers five years without that income. Subtracting the pension from every retirement year would understate the amount required.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does a pension reduce a FIRE number?",
        answer:
          "Divide reliable annual pension income by the planning withdrawal rate for a steady-state estimate. At 4%, $20,000 corresponds to $500,000, but timing and benefit terms still matter.",
      },
      {
        question: "Should a non-COLA pension be treated at face value?",
        answer:
          "A level payment loses purchasing power over time. Model it conservatively rather than treating it as constant real income.",
      },
      {
        question: "How should a survivor pension be modeled?",
        answer:
          "Use the actual survivor election and compare household spending after one death. Do not assume the original payment continues unchanged.",
      },
    ],
    related: [
      { href: "/fire-calculator-with-social-security", label: "Include Social Security" },
      { href: "/calculators/fire-number", label: "FIRE Number calculator" },
      { href: "/can-i-retire-with-1-million", label: "Test a $1M portfolio" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Open the full FIRE calculator",
    embeddedIncomeCalculator: true,
  },
  {
    slug: "early-retirement-health-insurance",
    title: "Early-retirement health insurance: build an honest FIRE budget",
    description:
      "Plan the health-insurance bridge before Medicare using premiums, out-of-pocket exposure, household income, plan changes, and a dedicated contingency.",
    eyebrow: "Healthcare before Medicare",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "Healthcare is the budget line most likely to break an early-retirement plan. A 45-year-old faces 20 years of private insurance before Medicare; a 55-year-old faces 10. Premiums reset every year, networks change, and one bad health year can cost the full out-of-pocket maximum on top of premiums. This page builds the bridge in phases so the number you carry into your FIRE target is honest.",
      "This is a budgeting framework, not insurance or tax advice. Premiums, subsidy rules, and plan designs change yearly — get current quotes for your household, age band, and state before making an employment decision.",
    ],
    takeaway:
      "Healthcare is the only budget line that can add $250,000–$500,000 to your number without changing your lifestyle. Price it in phases, bracket it in threes, and never let a single average stand in for your household's quotes.",
    sections: [
      {
        heading: "Phase the bridge: COBRA, marketplace, Medicare",
        paragraphs: [
          "The bridge has three segments with different economics. COBRA continues your exact employer plan for up to 18 months after you leave — same doctors, same network — but you pay the full premium plus an administrative fee, which makes it the most expensive option per month and the smoothest transition.",
          "After COBRA, the marketplace covers the long middle: the years from your late 40s or 50s until 65. This is where income management matters most, because assistance is tied to household income and the unsubsidized price is the number you must be able to pay. At 65, Medicare replaces private insurance — but it does not make healthcare free, so the bridge ends with a cost step-down, not a cost elimination.",
        ],
      },
      {
        heading: "Manage MAGI like a budget line",
        paragraphs: [
          "Marketplace assistance keys off household income, which means your tax plan and your healthcare plan are the same decision. Roth conversions, capital-gains harvesting, and part-time earnings all raise recognized income — and each extra dollar can cost multiples in lost assistance. Run conversions and withdrawals through both lenses before executing either.",
          "The practical move is to decide your income target first, then fit the tax strategy inside it — not the reverse. A Roth conversion that looks brilliant in isolation can be the most expensive transaction of your year once the subsidy math is included.",
        ],
      },
      {
        heading: "Use the HSA triple advantage while you still can",
        bullets: [
          "Contributions are deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free — the only triple-advantaged account in the code.",
          "Fund it aggressively in your final high-earning years, invest it rather than spending it, and keep receipts: qualified expenses can be reimbursed years later, turning the HSA into a stealth retirement account.",
          "After 65 it functions like a traditional IRA for non-medical spending (taxed, no penalty), so nothing is wasted if your health costs come in low.",
          "You can only contribute while enrolled in a qualifying high-deductible plan — once you retire onto marketplace coverage, check whether your chosen plan preserves eligibility.",
        ],
      },
      {
        heading: "Cost-bracket your healthcare number",
        bullets: [
          "Low bracket: subsidized premium plus routine care — the optimistic case, only if your income plan holds.",
          "Base bracket: quoted unsubsidized premium plus expected deductibles, prescriptions, dental, and vision — this is the number that goes into your FIRE target.",
          "High bracket: full premium plus the out-of-pocket maximum plus one high-utilization year per decade — hold this as contingency, not as target.",
          "Convert each bracket to portfolio terms: every permanent $10,000 of annual healthcare spending needs roughly $250,000 at 4% or $333,000 at 3%.",
          "Price every household member separately and note the year each becomes Medicare-eligible — a couple with a five-year age gap has two different bridge lengths.",
        ],
      },
      {
        heading: "Stress-test the bridge",
        bullets: [
          "Model the quoted premium, quoted premium plus 20%, and the full unsubsidized premium — subsidies are the first thing income changes take away.",
          "Use at least one high out-of-pocket year per decade, not the average year.",
          "Test the loss of a spouse's employer plan or part-time benefit mid-bridge.",
          "Do not assume Medicare eliminates premiums or out-of-pocket costs at 65 — Part B, Part D, and supplemental coverage are real budget lines.",
          "Recheck quotes annually: the bridge is 10–20 years long and pricing moves every single year.",
        ],
      },
    ],
    faq: [
      {
        question: "How much should I budget for healthcare before Medicare?",
        answer:
          "Use current household-specific quotes plus expected out-of-pocket costs and a contingency. National averages are not a substitute for age, location, income, and plan design.",
      },
      {
        question: "Should health insurance be included in my FIRE number?",
        answer:
          "Yes, include the portion funded by portfolio withdrawals. If the cost changes at Medicare eligibility, model separate phases.",
      },
      {
        question: "Can Barista FIRE solve healthcare?",
        answer:
          "It may if a specific job offers durable coverage at the expected hours. Verify eligibility, employee premiums, waiting periods, and the risk that benefits or hours change.",
      },
    ],
    related: [
      { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
      { href: "/blog/barista-fire-healthcare-benefits-cliffs", label: "Benefits-cliff guide" },
      { href: "/retire-at-50", label: "Retiring at 50" },
      { href: "/retire-at-55", label: "Retiring at 55" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/fire-number",
    calculatorLabel: "Add healthcare to annual spending",
  },
  {
    slug: "fire-number-by-age",
    title: "FIRE number by age: what actually changes?",
    description:
      "Understand how age affects FIRE through retirement horizon, healthcare, benefit timing, flexibility, and sequence risk—not through a different core formula.",
    eyebrow: "Age and retirement math",
    datePublished: published,
    dateModified: expanded,
    intro: [
      "The core FIRE formula does not contain age: annual portfolio-funded spending divided by a planning withdrawal rate. Age changes the surrounding assumptions—how long withdrawals may last, when healthcare and benefits begin, and how much time remains to recover from a poor sequence.",
      "Use age to choose stress tests and phases, not to manufacture a universal age-based target.",
    ],
    takeaway:
      "Age does not change the spending ÷ withdrawal-rate identity; it changes the horizon, bridge periods, and level of uncertainty that should shape the inputs.",
    sections: [
      {
        heading: "What changes by retirement age",
        table: {
          caption: "Planning emphasis by retirement starting age",
          headers: ["Starting age", "Illustrative horizon", "Planning emphasis"],
          rows: [
            ["40", "50+ years", "Very long horizon, healthcare bridge, high flexibility value"],
            ["45", "45–50 years", "Long healthcare bridge, sequence risk, benefit timing"],
            ["50", "40+ years", "Medicare and Social Security bridges, sequence risk"],
            ["55", "35–40 years", "Healthcare bridge, account access, later-income phases"],
            ["60", "30–35 years", "Benefit timing, healthcare transition, tax windows"],
            ["65", "25–30 years", "Medicare choices, Social Security, RMD planning"],
          ],
        },
      },
      {
        heading: "Do not use age as a shortcut for spending",
        paragraphs: [
          "Two people of the same age can require radically different portfolios because their spending, pensions, taxes, housing, and flexibility differ. Build the cash-flow requirement first.",
        ],
      },
      {
        heading: "Use the correct age-specific bridge",
        bullets: [
          "Retirement date to Medicare eligibility.",
          "Retirement date to pension start.",
          "Retirement date to Social Security claiming.",
          "Years until penalty-free or practical account access.",
        ],
      },
    ],
    faq: [
      {
        question: "Does FIRE require more money at a younger age?",
        answer:
          "Often, because the potential withdrawal horizon is longer and benefit bridges are larger. The exact difference depends on spending and plan design.",
      },
      {
        question: "Is 25× spending enough at every age?",
        answer:
          "No single multiple is guaranteed. Longer horizons often justify testing lower withdrawal rates and flexible spending rules.",
      },
      {
        question: "What is the best age to calculate FIRE?",
        answer:
          "Calculate it at any age, then update the inputs whenever spending, savings, family structure, or retirement timing changes.",
      },
    ],
    related: [
      { href: "/retire-at-40", label: "Retire at 40" },
      { href: "/retire-at-45", label: "Retire at 45" },
      { href: "/retire-at-50", label: "Retire at 50" },
      { href: "/retire-at-55", label: "Retire at 55" },
      { href: "/retire-at-60", label: "Retire at 60" },
      { href: "/fire-number-by-spending", label: "FIRE number by spending" },
      { href: "/series/arya-21-day", label: "Arya 21-day series" },
    ],
    calculatorHref: "/calculators/years-to-fire",
    calculatorLabel: "Estimate your timeline",
  },
];
