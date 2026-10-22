export type CalculatorSeoFaq = {
  question: string;
  answer: string;
};

export type CalculatorSeoContent = {
  id: "fire-number" | "years-to-fire" | "coast-fire" | "barista-fire";
  path: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  /** Visible H1 override (defaults to title). */
  h1?: string;
  /** Visible lede paragraph override (defaults to description). */
  lede?: string;
  /** Intro paragraph rendered under the formula heading. */
  formulaIntro?: string;
  /** Question-style heading overrides for the SEO section. */
  seoHeadings?: {
    howItWorks?: string;
    formula?: string;
    whenToUse?: string;
    limitations?: string;
    faq?: string;
  };
  howItWorks: string[];
  formula: string;
  exampleTitle: string;
  exampleBody: string[];
  whenToUse: string[];
  limitations: string[];
  related: { href: string; label: string }[];
  faq: CalculatorSeoFaq[];
};

export const CALCULATOR_SEO: Record<
  CalculatorSeoContent["id"],
  CalculatorSeoContent
> = {
  "fire-number": {
    id: "fire-number",
    path: "/calculators/fire-number",
    title: "FIRE Number Calculator",
    description:
      "Estimate the invested portfolio that can support your lifestyle at a chosen withdrawal rate. Defaults follow classic 4% / 25× math — fully adjustable.",
    metaTitle: "FIRE Number Calculator — Free 4% Rule / 25× Tool",
    metaDescription:
      "Free FIRE number calculator: annual spending ÷ withdrawal rate. Lean, Regular & Fat presets with transparent 4% rule math. No signup.",
    howItWorks: [
      "Your FIRE number is the portfolio size that, at a chosen safe withdrawal rate (SWR), is meant to support a given annual spend without a traditional paycheck.",
      "The classic starting point is the “4% rule” lineage (Bengen / Trinity Study): spending ÷ 0.04 equals 25× annual spending. Early retirees often stress-test 3–3.5% instead.",
      "Use Lean, Regular, or Fat presets as starting spending levels, then replace them with your real budget. Taxes, healthcare, and housing usually matter more than the nickname.",
    ],
    formula:
      "FIRE number = Annual spending ÷ Withdrawal rate\nMultiplier  = 1 ÷ Withdrawal rate\n\nExample (4%): $60,000 ÷ 0.04 = $1,500,000 (25×)",
    exampleTitle: "Example: $60,000 spending at 4%",
    exampleBody: [
      "If you expect to spend $60,000 per year in retirement (today’s dollars) and use a 4% withdrawal rate, the FIRE number is $1,500,000.",
      "At 3.5%, the same lifestyle needs about $1,714,000. At 3%, it needs $2,000,000. Lower rates buy more buffer for long early-retirement horizons and sequence-of-returns risk — at the cost of a larger nest egg.",
    ],
    whenToUse: [
      "You want a clear portfolio target before modeling years-to-FIRE or savings rates.",
      "You are comparing Lean vs Regular vs Fat lifestyle assumptions.",
      "You want to stress-test 3%, 3.5%, and 4% withdrawal rates side by side.",
    ],
    limitations: [
      "Illustrative only — not a guarantee markets will support a constant withdrawal rate for decades.",
      "Does not model taxes, fees, Social Security, pensions, or home equity.",
      "Spending often changes in retirement; revisit the number as your budget evolves.",
    ],
    related: [
      { href: "/calculators/years-to-fire", label: "Years to FIRE calculator" },
      { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
      { href: "/blog/what-is-a-fire-number", label: "What is a FIRE number?" },
      {
        href: "/blog/safe-withdrawal-rate-3-vs-4-percent",
        label: "3% vs 3.5% vs 4% SWR",
      },
      {
        href: "/blog/lean-regular-fat-fire-numbers-2026",
        label: "Lean / Regular / Fat FIRE 2026",
      },
      {
        href: "/blog/realistic-fire-numbers-2026",
        label: "Realistic FIRE numbers 2026",
      },
      {
        href: "/blog/retirefire-methodology-explained",
        label: "Methodology (human tour)",
      },
      { href: "/methodology", label: "Methodology" },
    ],
    faq: [
      {
        question: "How do I calculate my FIRE number?",
        answer:
          "Divide annual retirement spending by your chosen withdrawal rate. At 4%, FIRE number = spending × 25. At 3.5%, multiply by about 28.6; at 3%, multiply by about 33.3.",
      },
      {
        question: "Is the 4% rule safe for early retirement?",
        answer:
          "The 4% starting point comes from historical U.S. research on multi-decade retirements. It is not a guarantee, especially for 40–50+ year early-retirement horizons. Many planners prefer 3–3.5% for longer plans. Pair this calculator with the SWR deep-dive guide.",
      },
      {
        question: "What is Lean, Regular, and Fat FIRE?",
        answer:
          "They are informal spending labels, not academic categories. RetireFire’s example presets use about $40k / $60k / $100k annual spending — always substitute your real expenses, including healthcare.",
      },
      {
        question: "Does the FIRE number include taxes and fees?",
        answer:
          "No. This is a pre-tax planning illustration. Effective after-tax spending needs, investment fees, and account types can require a larger portfolio than the simple formula suggests.",
      },
      {
        question: "How should I stress-test my FIRE number?",
        answer:
          "Re-run at lower withdrawal rates and higher spending, compare Lean/Regular/Fat lifestyle bands, then use Years and Coast tools under the same shared assumptions. Sequence stress tests on Coast/Years show accumulation path ranges — not a full withdrawal backtest.",
      },
    ],
  },
  "years-to-fire": {
    id: "years-to-fire",
    path: "/calculators/years-to-fire",
    title: "Years to FIRE Calculator",
    description:
      "Solve for years until your nest egg hits your FIRE number. Uses constant real returns and end-of-year contributions, with an illustrative growth chart.",
    metaTitle: "Years to FIRE Calculator — Timeline + Stress Test",
    metaDescription:
      "Free years to FIRE calculator: project when you reach financial independence from portfolio, savings rate, and real return. Includes basic Monte Carlo stress test.",
    howItWorks: [
      "This years to FIRE calculator estimates how long it may take to reach financial independence given your current invested assets, annual savings, FIRE target, and assumed real (inflation-adjusted) return.",
      "Growth is modeled with a constant return and end-of-period contributions — a common planning simplification. Real markets bounce; treat the chart as an illustration, not a forecast.",
      "Raising your savings rate usually shortens the timeline more reliably than assuming a higher investment return.",
    ],
    formula:
      "With portfolio P, annual savings S, real return r, target T:\nsolve n such that P grows with contributions to ≥ T\n\n(Illustrative constant-return model; see Methodology)",
    exampleTitle: "Example: $200k portfolio, $40k saved per year",
    exampleBody: [
      "Suppose you have $200,000 invested, save $40,000 per year, target $1,500,000 (e.g. $60k spend at 4%), and assume a 5% real return.",
      "The calculator projects the year-by-year balance until the portfolio crosses the target. Change return, savings, or spending to see how sensitive “years to FI” is to each lever.",
    ],
    whenToUse: [
      "You already know (or can estimate) a FIRE number and want a timeline.",
      "You want to compare savings-rate scenarios before changing lifestyle.",
      "You want a simple growth chart to share with a partner or co-planner.",
    ],
    limitations: [
      "Constant real returns ignore crashes and valuation regimes; use the free sequence stress test for ranges.",
      "Does not model raises, job loss, windfalls, or changing savings capacity.",
      "Contributions are simplified; payroll timing and tax-advantaged accounts can differ.",
    ],
    related: [
      { href: "/calculators/fire-number", label: "FIRE number calculator" },
      { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
      {
        href: "/blog/how-many-years-until-fire",
        label: "How many years until FIRE?",
      },
      {
        href: "/blog/years-to-fire-which-lever-moves-the-needle",
        label: "Which lever moves years to FIRE?",
      },
      {
        href: "/blog/why-simple-fire-calculators-fail",
        label: "Why simple FIRE calculators fail",
      },
      { href: "/methodology", label: "Methodology" },
    ],
    faq: [
      {
        question: "What inputs drive years to financial independence?",
        answer:
          "Current portfolio, annual savings (or savings rate), spending-driven FIRE target, and assumed real return. Small changes in savings rate often move the timeline more than optimistic return assumptions.",
      },
      {
        question: "Should I use real or nominal returns?",
        answer:
          "RetireFire defaults to real returns so spending and portfolio growth are in today’s dollars. If you use nominal returns, also model inflation explicitly so you do not mix units.",
      },
      {
        question: "Why does a higher savings rate help so much?",
        answer:
          "You add more capital each year and you often reduce the FIRE target if spending falls. Both effects compound: more fuel and a shorter distance to the finish line.",
      },
      {
        question: "Which lever moves the timeline most?",
        answer:
          "For most mid-journey planners, spending and savings dominate; withdrawal-rate choice moves the finish line; assumed return is powerful but least controllable. Use Scenario compare to change one lever at a time.",
      },
      {
        question: "Does Years to FIRE include a stress test?",
        answer:
          "Yes. Besides the constant-return timeline, a free basic Monte Carlo (1,000 paths) estimates path dispersion around the target while contributions continue. It is educational, not a calendar guarantee.",
      },
    ],
  },
  "coast-fire": {
    id: "coast-fire",
    path: "/calculators/coast-fire",
    title: "Coast FIRE Calculator",
    description:
      "Calculate how much you need today so compound growth alone may reach full FIRE by a chosen traditional retirement age — then you can “coast” on savings rate.",
    metaTitle: "Coast FIRE Calculator: Find Your Coast Number",
    metaDescription:
      "Calculate how much you need invested today to Coast FIRE. Compare retirement ages, return assumptions, and risk scenarios. Free, no signup.",
    h1: "Coast FIRE Calculator: How Much Do You Need Today?",
    lede: "Find your Coast FIRE number: estimate the portfolio needed today to reach your retirement target without further contributions. Compare ages and inflation-adjusted return assumptions, then stress-test the result.",
    formulaIntro:
      "The calculator estimates today's Coast FIRE target by dividing the full FIRE target by (1 + real return) raised to the years remaining.",
    seoHeadings: {
      howItWorks: "How does Coast FIRE work?",
      formula: "What is the Coast FIRE formula?",
      whenToUse: "When can Coast FIRE help with planning?",
      limitations: "What are the limitations of Coast FIRE calculations?",
      faq: "Coast FIRE calculator: common questions",
    },
    howItWorks: [
      "Coast FIRE asks a different question than classic FIRE: do you already have enough invested that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age?",
      "If yes, you might stop aggressive saving (or save only for near-term goals) while still working for lifestyle, purpose, or benefits. Coast FIRE is not permission to stop working tomorrow.",
      "The coast number is essentially a discounted full FIRE target: the longer the runway and the higher the assumed real return, the smaller the nest egg you need today.",
    ],
    formula:
      "Coast number ≈ Full FIRE ÷ (1 + r)^n\n\nT = full FIRE target\nr = real return\nn = years until traditional retirement age",
    exampleTitle: "Example: $1.5M full FIRE, 20 years runway, 5% real",
    exampleBody: [
      "For example, a $1,500,000 full FIRE target, 20 years until retirement, and an assumed 5% real return gives an estimated Coast FIRE number of about $565,000. This is an illustration under those assumptions, not a forecast.",
    ],
    whenToUse: [
      "You want to know when aggressive saving can slow without abandoning long-term FI.",
      "You are comparing shortfall vs surplus under conservative return assumptions.",
      "You are planning a “work optional later, not unemployed today” path.",
    ],
    limitations: [
      "Not early retirement — coasters usually still need earned income for years.",
      "Healthcare, emergency funds, and debt plans still matter.",
      "Constant real returns are not guaranteed; use return sensitivity, age tables, and the free sequence stress test for ranges.",
    ],
    related: [
      { href: "/calculators/fire-number", label: "FIRE number calculator" },
      { href: "/calculators/barista-fire", label: "Barista FIRE calculator" },
      { href: "/blog/coast-fire-explained", label: "Coast FIRE explained" },
      {
        href: "/blog/coast-fire-by-age-tables",
        label: "Coast FIRE by age tables",
      },
      {
        href: "/blog/coast-fire-sequence-of-returns-risk",
        label: "Coast FIRE + sequence risk",
      },
      {
        href: "/resources/sequence-risk-guide",
        label: "Sequence risk guide",
      },
      {
        href: "/resources/coast-fire-checklist",
        label: "Coast FIRE checklist",
      },
      {
        href: "/blog/coast-fire-number-formula-examples",
        label: "Coast FIRE formula + examples",
      },
      {
        href: "/blog/how-to-stress-test-coast-fire-number",
        label: "How to stress-test your Coast number",
      },
      {
        href: "/blog/when-can-you-stop-saving-for-retirement",
        label: "When can you stop saving?",
      },
      { href: "/methodology", label: "Methodology" },
    ],
    faq: [
      {
        question: "What is a Coast FIRE number?",
        answer:
          "It is the portfolio you may need today for investments to grow to your full FIRE target by a chosen retirement age, assuming no further contributions and a stated real return.",
      },
      {
        question: "Does Coast FIRE mean I can quit my job?",
        answer:
          "Usually, no. Coast FIRE means you may be able to reduce retirement contributions while continuing to cover living expenses through work or another income source.",
      },
      {
        question: "How is Coast FIRE different from Barista FIRE?",
        answer:
          "Coast FIRE focuses on reducing or stopping contributions while investments grow. Barista FIRE includes part-time income to help cover expenses.",
      },
      {
        question: "Does the calculator include a sequence-of-returns stress test?",
        answer:
          "Yes. It includes a basic simulation of different return paths. The results are educational illustrations, not forecasts or historical backtests.",
      },
      {
        question: "When can I stop saving for retirement?",
        answer:
          "The calculator can estimate whether your current portfolio may reach a future FIRE target under its assumptions. Consider healthcare, emergencies, and other expenses separately.",
      },
      {
        question: "Why does a lower assumed return raise my Coast FIRE number?",
        answer:
          "A lower assumed return means less modeled growth over time, so a larger portfolio is needed today to reach the same future target.",
      },
    ],
  },
  "barista-fire": {
    id: "barista-fire",
    path: "/calculators/barista-fire",
    title: "Barista FIRE Calculator",
    description:
      "Semi-retirement math: set expected work income and see the smaller portfolio needed to cover the remaining spending gap at your withdrawal rate.",
    metaTitle: "Barista FIRE Calculator — Semi-Retirement Portfolio Tool",
    metaDescription:
      "Free Barista FIRE calculator for semi-retirement: part-time income covers some spending so your portfolio only funds the gap. Transparent math, no signup.",
    howItWorks: [
      "Barista FIRE (semi-retirement) blends portfolio withdrawals with intentional work income. The portfolio only needs to cover the spending gap after part-time or flexible earnings.",
      "Lower gap expenses mean a smaller “barista number,” which can unlock partial freedom years earlier than full FIRE — if the work income is realistic and sustainable.",
      "People choose this path for structure, community, health benefits, or as a bridge before Social Security or Medicare eligibility.",
    ],
    formula:
      "Gap expenses = max(0, Annual spending − Work income)\nBarista number = Gap expenses ÷ Withdrawal rate\n\nExample: ($60,000 − $20,000) ÷ 0.04 = $1,000,000",
    exampleTitle: "Example: $60k spend, $20k part-time income, 4% SWR",
    exampleBody: [
      "If annual spending is $60,000 and part-time work covers $20,000, the portfolio must fund $40,000 per year.",
      "At 4%, barista number = $40,000 ÷ 0.04 = $1,000,000 — $500,000 less than a $1.5M full FIRE number at the same spending level.",
    ],
    whenToUse: [
      "You are open to part-time or flexible work in “retirement.”",
      "You want to see how much side income shrinks the nest egg required.",
      "You are bridging to benefits eligibility or testing semi-retirement lifestyle fit.",
    ],
    limitations: [
      "Job reliability, benefit cliffs, and self-employment taxes are not modeled.",
      "Spending often rises with free time; keep a buffer.",
      "Educational illustration only — not a paycheck-replacement plan.",
    ],
    related: [
      { href: "/calculators/fire-number", label: "FIRE number calculator" },
      { href: "/calculators/coast-fire", label: "Coast FIRE calculator" },
      {
        href: "/blog/barista-fire-vs-coast-fire",
        label: "Barista FIRE vs Coast FIRE",
      },
      {
        href: "/blog/semi-retirement-math-portfolio-part-time-income",
        label: "Semi-retirement math deep dive",
      },
      {
        href: "/blog/barista-fire-healthcare-benefits-cliffs",
        label: "Healthcare & benefits cliffs",
      },
      {
        href: "/blog/barista-fire-and-semi-retirement",
        label: "Barista FIRE and semi-retirement",
      },
      {
        href: "/blog/barista-fire-number-formula-examples",
        label: "Barista FIRE formula + examples",
      },
      { href: "/resources", label: "Free resources" },
      { href: "/methodology", label: "Methodology" },
    ],
    faq: [
      {
        question: "How do you calculate a Barista FIRE number?",
        answer:
          "Subtract expected annual work income from annual spending, then divide the remaining gap by your withdrawal rate. At 4%, that is gap expenses × 25. Every durable $10k of work income reduces the 4% target by about $250k.",
      },
      {
        question: "Is Barista FIRE the same as Coast FIRE?",
        answer:
          "No. Coast FIRE is about having enough invested that growth alone may hit full FIRE later without new contributions. Barista FIRE uses ongoing work income to reduce how large the portfolio must be now.",
      },
      {
        question: "What should I watch out for with semi-retirement?",
        answer:
          "Income volatility, healthcare and benefits cliffs, taxes on side work, and lifestyle inflation. Stress-test lower income and higher spending than your base case. See the healthcare cliffs educational guide.",
      },
      {
        question: "Should healthcare premiums go in spending or income?",
        answer:
          "Usually put realistic premiums and out-of-pocket costs in annual spending, and put cash wages in work income. That keeps the gap honest when benefits change.",
      },
      {
        question: "Can Barista FIRE be more expensive than full FIRE?",
        answer:
          "The portfolio target is usually smaller, but total life cost can rise if coverage becomes expensive or work income is unreliable. Compare full FIRE, Coast, and Barista under the same assumptions before cutting hours.",
      },
    ],
  },
};
