export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  readingMinutes: number;
  tags: string[];
  sources?: Array<{ label: string; href: string }>;
  /** Simple paragraphs + optional headings for MVP (no MDX dependency) */
  body: Array<{ type: "p" | "h2" | "ul"; content: string | string[] }>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "2026-401k-roth-catch-up-rule",
    title: "2026 401(k) Roth catch-up rule: what FIRE savers need to know",
    description:
      "2026 401(k) limits, age 50 catch-ups, the age 60-63 super catch-up, and the high-earner Roth catch-up rule explained for FIRE planning.",
    date: "2026-08-08",
    readingMinutes: 9,
    tags: ["2026", "tax-planning", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "The 2026 401(k) catch-up rules matter for FIRE households because they change where late-career savings land, not just how much can go into a plan. For 2026, the IRS lists a $24,500 employee elective deferral limit for traditional and safe harbor 401(k) plans. If you are age 50 or older by year-end, the regular catch-up limit is $8,000. If you turn 60, 61, 62, or 63 during the calendar year, the SECURE 2.0 higher catch-up limit is $11,250.",
      },
      {
        type: "p",
        content:
          "The headline tax wrinkle is the Roth catch-up requirement. Beginning in 2026, participants in plans with Roth features that offer catch-up contributions must make catch-up contributions on a Roth basis if prior-year wages from the plan sponsor exceeded $150,000 for 2026. That means some high earners may lose the pre-tax catch-up deduction they expected, even though the dollars can still help their retirement plan.",
      },
      {
        type: "h2",
        content: "2026 limits to model",
      },
      {
        type: "ul",
        content: [
          "Employee elective deferral limit: $24,500 for 401(k), 403(b), SARSEP, and most governmental 457(b) plans.",
          "Age 50-plus catch-up: $8,000 for traditional and safe harbor 401(k) plans, if the plan permits catch-ups.",
          "Age 60-63 higher catch-up: $11,250 for most 401(k), 403(b), governmental 457(b), and TSP participants.",
          "High-earner Roth catch-up threshold: prior-year wages with the plan sponsor above $150,000 for 2026.",
          "SIMPLE 401(k) limits differ: $17,000 employee deferral, $4,000 regular catch-up, and $5,250 age 60-63 catch-up for 2026.",
        ],
      },
      {
        type: "h2",
        content: "Why this changes FIRE planning",
      },
      {
        type: "p",
        content:
          "For a FIRE plan, the Roth catch-up rule can shift the tax timing of your final high-income years. A pre-tax catch-up lowers current taxable income. A Roth catch-up does not, but it may reduce required taxable withdrawals later and can improve tax diversification before a Roth conversion ladder or early-retirement gap period.",
      },
      {
        type: "ul",
        content: [
          "If you are under the $150,000 prior-year wage threshold, you may still have access to pre-tax or Roth catch-up choices depending on your plan.",
          "If you are above the threshold and your plan has Roth catch-ups, model catch-up dollars as after-tax Roth contributions.",
          "If your plan does not support Roth catch-ups, ask HR or the plan administrator how the plan will handle affected participants before assuming the catch-up is available.",
          "If you are age 60-63, the super catch-up can be meaningful, but only cash flow you can actually save belongs in the plan.",
        ],
      },
      {
        type: "h2",
        content: "FIRE example",
      },
      {
        type: "p",
        content:
          "Suppose a 61-year-old employee can save the full 2026 deferral plus the age 60-63 catch-up. The employee-side total is $35,750 before employer match. At a 4% withdrawal-rate shortcut, every extra $10,000 of durable retirement assets supports roughly $400 of first-year annual spending. The bigger value may be account placement: Roth dollars can create flexibility if the early-retirement plan depends on managing taxable income.",
      },
      {
        type: "h2",
        content: "How to use RetireFire",
      },
      {
        type: "ul",
        content: [
          "Use the FIRE Number calculator to test whether the extra contribution changes your target date or only improves margin.",
          "Use Years to FIRE to model a one-year or four-year late-career savings sprint.",
          "Use Coast FIRE if the catch-up window is really about reducing future contributions instead of retiring immediately.",
          "Use Scenario Compare to test pre-tax-heavy versus Roth-heavy paths under the same spending and withdrawal-rate assumptions.",
        ],
      },
      {
        type: "h2",
        content: "Source notes",
      },
      {
        type: "p",
        content:
          "This guide is grounded in IRS retirement-plan guidance current as of August 8, 2026, including the IRS catch-up contribution page and IRS 2026 401(k) contribution-limit page. It is educational only and is not tax, investment, legal, or plan-administration advice.",
      },
    ],
  },
  {
    slug: "roth-conversion-ladder-vs-taxable-brokerage-2026",
    title: "Roth conversion ladder vs. taxable brokerage in 2026",
    description:
      "Compare a Roth conversion ladder and taxable brokerage bridge for early retirement in 2026, including tax brackets, cash-flow timing, and calculator workflow.",
    date: "2026-08-08",
    readingMinutes: 10,
    tags: ["2026", "tax-planning", "comparison", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "A Roth conversion ladder and a taxable brokerage account solve different early-retirement problems. The conversion ladder moves pre-tax retirement money into Roth accounts over time, often during lower-income years. The taxable brokerage account is the liquid bridge you can spend without waiting for retirement-plan access rules. In a strong FIRE plan, the question is usually not either-or. It is how much bridge cash you need while the ladder matures.",
      },
      {
        type: "p",
        content:
          "For 2026 planning, the IRS tax inflation adjustments matter because conversion income stacks on top of other taxable income. The 2026 standard deduction is $16,100 for single filers, $32,200 for married filing jointly, and $24,150 for heads of household. The 12% bracket runs up to $50,400 of taxable income for single filers and $100,800 for married filing jointly; the 22% bracket starts above those levels.",
      },
      {
        type: "h2",
        content: "What a Roth conversion ladder does",
      },
      {
        type: "ul",
        content: [
          "You convert pre-tax IRA or 401(k) rollover dollars into a Roth IRA.",
          "The converted amount is generally taxable income in the conversion year.",
          "The strategy is most attractive when early retirement creates lower taxable-income years.",
          "It can reduce future pre-tax balances, which may lower later required minimum distributions.",
          "It needs careful timing, because converted principal generally has access rules that make a cash bridge important.",
        ],
      },
      {
        type: "h2",
        content: "What a taxable brokerage bridge does",
      },
      {
        type: "ul",
        content: [
          "It provides flexible spending money before age 59 1/2 and while Roth ladder rungs mature.",
          "It can fund living costs, estimated taxes, ACA premiums, and market downturn buffers.",
          "It may generate taxable dividends, interest, and capital gains along the way.",
          "It avoids forced conversion amounts, but it does not move pre-tax retirement balances into Roth space by itself.",
        ],
      },
      {
        type: "h2",
        content: "The 2026 decision frame",
      },
      {
        type: "p",
        content:
          "Start with annual spending, then separate spending liquidity from tax-location strategy. If your first five early-retirement years require $60,000 per year and you cannot access retirement accounts comfortably, the taxable bridge has to cover real cash flow. After that, use the conversion ladder to fill low tax brackets deliberately instead of converting random amounts because the phrase sounds efficient.",
      },
      {
        type: "ul",
        content: [
          "Low-income gap years: stronger case for annual Roth conversions up to a chosen bracket ceiling.",
          "Large taxable balance: stronger cash-flow bridge, but watch dividends, gains, and ACA income cliffs.",
          "Large pre-tax balance: stronger reason to evaluate conversions before Social Security, pensions, or RMDs arrive.",
          "Thin cash bridge: do not over-convert if the tax bill creates liquidity stress.",
          "High state tax year: compare retiring, relocating, or timing conversions instead of assuming federal brackets tell the whole story.",
        ],
      },
      {
        type: "h2",
        content: "Calculator workflow",
      },
      {
        type: "ul",
        content: [
          "Use FIRE Number for the full portfolio target based on actual spending and a conservative withdrawal rate.",
          "Use Years to FIRE to see whether redirecting savings into taxable brokerage meaningfully changes the retirement date.",
          "Use Scenario Compare for two versions: more taxable bridge now versus more pre-tax or Roth retirement savings.",
          "Stress test sequence risk if the bridge depends on selling stock in the first few years after quitting.",
        ],
      },
      {
        type: "h2",
        content: "Practical rule of thumb",
      },
      {
        type: "p",
        content:
          "A taxable brokerage account buys access and flexibility. A Roth conversion ladder buys future tax optionality. FIRE households often need both: enough taxable assets to avoid a forced sale or penalty problem, and enough annual tax planning to keep pre-tax retirement money from becoming a later tax trap.",
      },
      {
        type: "h2",
        content: "Source notes",
      },
      {
        type: "p",
        content:
          "The 2026 bracket and standard-deduction figures in this article are based on IRS tax-year 2026 inflation adjustment guidance current as of August 8, 2026. This is educational content only, not tax, investment, legal, or financial advice.",
      },
    ],
  },
  {
    slug: "social-security-62-vs-70-fire",
    title: "Social Security at 62 vs. 70 for FIRE: the portfolio impact",
    description:
      "Claiming Social Security at 62 vs. 70 can change a FIRE portfolio target by six figures. Compare monthly benefit tradeoffs, sequence risk, and bridge planning.",
    date: "2026-08-08",
    readingMinutes: 9,
    tags: ["2026", "sequence-risk", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "For FIRE planning, Social Security claiming age is not just a retirement-income choice. It can change the portfolio you need to fund the same lifestyle. Claim at 62 and monthly benefits start earlier but are reduced. Delay to 70 and the monthly benefit can be much higher, but your portfolio must bridge eight additional years without that income.",
      },
      {
        type: "p",
        content:
          "SSA guidance says retirement benefits can start as early as age 62, benefits are reduced before full retirement age, and delayed retirement credits increase the amount if you wait beyond full retirement age. For people born in 1960 or later, full retirement age is 67, and SSA's delayed-retirement table shows age 70 at 124% of the full retirement benefit. There is no additional benefit increase for waiting past 70.",
      },
      {
        type: "h2",
        content: "The FIRE math",
      },
      {
        type: "p",
        content:
          "A simple FIRE number treats portfolio need as annual spending minus durable income, divided by withdrawal rate. If delaying Social Security raises a household benefit by $1,000 per month, that is $12,000 per year of later guaranteed-like income before tax details. At a 4% withdrawal-rate shortcut, $12,000 of annual income is equivalent to about $300,000 of portfolio support. At 3.5%, it is about $343,000. At 3%, it is about $400,000.",
      },
      {
        type: "h2",
        content: "Why 62 can still make sense",
      },
      {
        type: "ul",
        content: [
          "Health, family longevity, or cash-flow needs may make earlier income valuable.",
          "A weak market early in retirement can make portfolio withdrawals painful, and a benefit at 62 may reduce forced selling.",
          "Some households value spending certainty now more than a larger inflation-adjusted check later.",
          "Spousal, survivor, tax, and earnings-test rules can change the answer, so household-level planning matters.",
        ],
      },
      {
        type: "h2",
        content: "Why 70 can be powerful",
      },
      {
        type: "ul",
        content: [
          "A larger benefit can reduce required portfolio withdrawals for the rest of retirement.",
          "Higher guaranteed-like income can make the FIRE number less fragile late in life.",
          "Delaying can improve survivor-benefit resilience for some married households.",
          "It can be especially valuable if you have enough taxable or Roth bridge assets to reach 70 without stressing the portfolio.",
        ],
      },
      {
        type: "h2",
        content: "Sequence-risk tradeoff",
      },
      {
        type: "p",
        content:
          "The hard part is the bridge. Delaying to 70 may improve lifetime income, but it increases withdrawals between 62 and 70. If those years overlap with a bear market, the larger bridge can hurt. Claiming at 62 does the opposite: it lowers early withdrawals but locks in a smaller monthly check. FIRE plans should test both the early-retirement bridge period and the late-retirement income floor.",
      },
      {
        type: "h2",
        content: "How to model it on RetireFire",
      },
      {
        type: "ul",
        content: [
          "Use FIRE Number with spending net of expected Social Security income for a rough portfolio-impact view.",
          "Use Years to FIRE to see whether building a larger age-62-to-70 bridge delays your target date.",
          "Use Coast FIRE if Social Security is part of a later traditional-retirement income floor.",
          "Use the sequence-risk guide to pressure-test the bridge years before assuming delay is automatically better.",
        ],
      },
      {
        type: "h2",
        content: "Bottom line",
      },
      {
        type: "p",
        content:
          "The 62 vs. 70 decision is not won by a slogan. Age 62 can reduce early portfolio strain. Age 70 can reduce long-run portfolio dependence. The right FIRE answer depends on health, longevity assumptions, spouse and survivor needs, taxes, work income, and how much bridge liquidity you already have.",
      },
      {
        type: "h2",
        content: "Source notes",
      },
      {
        type: "p",
        content:
          "This article uses SSA retirement-planning guidance current as of August 8, 2026, including SSA pages on early benefits, delayed retirement credits, and planning between ages 62 and 70. Educational only, not Social Security, tax, investment, or financial advice.",
      },
    ],
  },
  {
    slug: "lean-fire-explained",
    title: "Lean FIRE explained: definition, math, path, and risks",
    description:
      "Lean FIRE is a spending-based FI target, not a personality test. Core formula, $25k–$50k tables, 3–4% SWR grids, path math, vs other FIRE styles, and free calculators — educational only.",
    date: "2026-07-21",
    readingMinutes: 14,
    tags: ["lean-fire", "fire-number", "basics"],
    body: [
      {
        type: "p",
        content:
          "Lean FIRE is one of the most searched — and most misused — labels in Financial Independence. Online, it can sound like a moral rank: frugal good, comfortable bad. In the math, Lean FIRE is simpler and less dramatic. It is a lifestyle spending level you choose, plugged into the same FIRE identity every other style uses: portfolio target equals annual spending divided by a planned withdrawal rate.",
      },
      {
        type: "p",
        content:
          "This pillar defines Lean FIRE precisely, shows worked USD tables, sketches the accumulation path, and flags where Lean plans break (healthcare, housing, sequence risk, under-counted spending). RetireFire’s example Lean preset is $40,000/year spending — an illustration, not a research standard and not a claim that $40k fits your city or household.",
      },
      {
        type: "h2",
        content: "What Lean FIRE means (and what it does not)",
      },
      {
        type: "ul",
        content: [
          "Means: a relatively low planned annual spend in early retirement / FI, and therefore a smaller portfolio target at a given safe withdrawal rate (SWR).",
          "Does not mean: a certified definition from academia. Bands differ by blog, forum, and country.",
          "Does not mean: “better” than Regular or Fat FIRE. Spending is a preference and a constraint, not a virtue score.",
          "Does not mean: your rent, insurance, or family size will cooperate with a nickname.",
        ],
      },
      {
        type: "p",
        content:
          "Community conversation often treats Lean as roughly the lower lifestyle band (examples people cite range around the mid-five-figures or less for a household, sometimes lower for one person). RetireFire publishes Lean / Regular / Fat example presets at $40k / $60k / $100k so tables stay comparable across tools. Replace every preset with your actual budget.",
      },
      {
        type: "h2",
        content: "Core formula",
      },
      {
        type: "ul",
        content: [
          "FIRE number = annual spending ÷ withdrawal rate.",
          "At 4% SWR, FIRE number = 25 × annual spending.",
          "At 3.5% SWR, FIRE number ≈ 28.6 × annual spending.",
          "At 3% SWR, FIRE number ≈ 33.3 × annual spending.",
          "Lean only changes the spending input (and sometimes the humility of your SWR choice) — not the algebra.",
        ],
      },
      {
        type: "p",
        content:
          "Example: $40,000 spend at 4% → $1,000,000. Same spend at 3% → about $1,333,333. Dropping planned withdrawal rate from 4% to 3% raises the target by one-third for the same lifestyle. That trade-off is the heart of early-retirement planning, Lean or otherwise.",
      },
      {
        type: "h2",
        content: "Worked Lean spending bands",
      },
      {
        type: "ul",
        content: [
          "$25,000/year: 4% → $625k · 3.5% → ≈ $714k · 3% → ≈ $833k",
          "$30,000/year: 4% → $750k · 3.5% → ≈ $857k · 3% → $1.0M",
          "$40,000/year (RetireFire Lean example): 4% → $1.0M · 3.5% → ≈ $1.14M · 3% → ≈ $1.33M",
          "$50,000/year (upper-Lean / lower-Regular border for many): 4% → $1.25M · 3.5% → ≈ $1.43M · 3% → ≈ $1.67M",
        ],
      },
      {
        type: "p",
        content:
          "These are pre-tax portfolio illustrations under a constant withdrawal-rate model. Taxes, account types, fees, Social Security, pensions, and real insurance premiums are outside the simple identity. For full grids across Lean / Regular / Fat, see the 2026 comparison tables post.",
      },
      {
        type: "h2",
        content: "Path math: why Lean is “faster” only if spending is real",
      },
      {
        type: "p",
        content:
          "The strategic case for Lean FIRE is speed and optionality: a smaller target can be reached with fewer years of high savings, or with a lower required savings rate for the same timeline. That advantage evaporates if the $40k budget was fiction. Under-counted healthcare, housing shocks, family changes, or lifestyle creep turn a “Lean” FI date into a funding gap.",
      },
      {
        type: "ul",
        content: [
          "Higher savings rate shortens years to a fixed Lean target more than small return tweaks (see Years calculator lever posts).",
          "Cutting spend lowers both the years needed and the portfolio required — double leverage, if sustainable.",
          "Coast FIRE: stop aggressive saving earlier if the pile can compound to full Lean FIRE by a traditional retirement age — different question than retiring tomorrow.",
          "Barista FIRE: part-time income covers part of Lean spend so the portfolio only funds the gap — job and benefits risk remain.",
        ],
      },
      {
        type: "h2",
        content: "Lean vs Regular vs Fat vs Coast vs Barista",
      },
      {
        type: "ul",
        content: [
          "Lean / Regular / Fat: spending-band labels for full FI (portfolio covers lifestyle).",
          "Coast: work still funds today’s lifestyle; portfolio sized so contributions can pause while compounding toward full FI later.",
          "Barista / semi-retirement: intentional work income shrinks the portfolio gap now.",
          "You can be Lean Coast or Lean Barista — “Lean” still only describes spend level, not the work structure.",
        ],
      },
      {
        type: "h2",
        content: "Risks that hit Lean plans harder",
      },
      {
        type: "ul",
        content: [
          "Sequence of returns: early bad markets plus thin discretionary buffer leave less room to cut without pain.",
          "Healthcare and insurance: premiums and coverage cliffs can dominate a Lean budget (especially pre-Medicare in the U.S.).",
          "HCOL housing: geo arbitrage or roommates may be load-bearing assumptions, not side notes.",
          "Longevity + low SWR tension: long early-retirement horizons often argue for testing 3–3.5% — which raises the Lean number.",
          "Behavioral risk: chronic under-spending that only works until resentment or a crisis arrives is not a plan.",
        ],
      },
      {
        type: "h2",
        content: "How to run Lean FIRE on RetireFire",
      },
      {
        type: "ul",
        content: [
          "FIRE Number: set your true annual spend and SWR; try the Lean-style preset only as a starting hint.",
          "Years to FIRE: hold spend fixed, vary savings rate; then hold savings fixed, stress spend +10%.",
          "Coast FIRE: ask whether you can stop contributions and still reach full Lean FI by your horizon age; run free stress test.",
          "Barista FIRE: model gap = max(0, Lean spend − work income) ÷ SWR.",
          "Scenario compare + CSV / share URL: freeze assumptions so “Lean” stays attached to numbers.",
        ],
      },
      {
        type: "h2",
        content: "Cluster guides in this series",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE number: how much do you need? — full tables and multiples.",
          "Lean FIRE budget and lifestyle systems — building a spend figure that survives contact with reality.",
          "Lean FIRE path: years and savings rate — accumulation math and Coast hybrids.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is there an official Lean FIRE dollar cutoff? No. Treat any cutoff as a community shorthand.",
          "Is $40k Lean everywhere? No. Local housing and healthcare can make $40k austere or impossible.",
          "Should Lean retirees always use 4%? Not automatically. Long horizons often deserve 3–3.5% sensitivity tests.",
          "Is Lean FIRE the same as being cheap? No. Intentional low spending can still include high values on time, health, or place — the model only sees cash flows.",
          "Can I combine Lean with Coast or Barista? Yes; Lean describes spend, Coast/Barista describe work and contribution structure.",
        ],
      },
      {
        type: "p",
        content:
          "Educational only — not financial, tax, or investment advice. Read Methodology for formulas, the SWR deep dive for withdrawal context, sequence-risk resources for path risk, and the disclaimer before any decision. Start with your budget, not the nickname.",
      },
    ],
  },
  {
    slug: "lean-fire-number-how-much",
    title: "Lean FIRE number: how much do you need? (tables)",
    description:
      "Lean FIRE number = annual spending ÷ withdrawal rate. Full tables for $25k–$50k spend at 3%, 3.5%, and 4% SWR, 25×–33× multiples, and free calculator workflow — educational only.",
    date: "2026-07-21",
    readingMinutes: 10,
    tags: ["lean-fire", "fire-number", "tables"],
    body: [
      {
        type: "p",
        content:
          "The Lean FIRE number is not a secret formula. It is the same portfolio identity as every other FIRE style: divide the annual spending you intend to support from the portfolio by the withdrawal rate you are willing to plan with. What makes it “Lean” is only the size of that spending input.",
      },
      {
        type: "h2",
        content: "Formula and multiples",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE number = Lean annual spending ÷ SWR.",
          "4% SWR → 25 × spending.",
          "3.5% SWR → ≈ 28.57 × spending.",
          "3% SWR → ≈ 33.33 × spending.",
          "RetireFire Lean example preset: $40,000/year → $1.0M at 4%, ≈ $1.14M at 3.5%, ≈ $1.33M at 3%.",
        ],
      },
      {
        type: "h2",
        content: "Full grid (USD, pre-tax illustration)",
      },
      {
        type: "ul",
        content: [
          "$25k spend: 4% → $625,000 · 3.5% → ≈ $714,000 · 3% → ≈ $833,000",
          "$30k spend: 4% → $750,000 · 3.5% → ≈ $857,000 · 3% → $1,000,000",
          "$35k spend: 4% → $875,000 · 3.5% → $1,000,000 · 3% → ≈ $1,167,000",
          "$40k spend: 4% → $1,000,000 · 3.5% → ≈ $1,143,000 · 3% → ≈ $1,333,000",
          "$45k spend: 4% → $1,125,000 · 3.5% → ≈ $1,286,000 · 3% → $1,500,000",
          "$50k spend: 4% → $1,250,000 · 3.5% → ≈ $1,429,000 · 3% → ≈ $1,667,000",
        ],
      },
      {
        type: "p",
        content:
          "Read across a row to see SWR sensitivity. Read down a column to see how housing or healthcare “small” increases cascade into six-figure portfolio changes. A $10k permanent spend increase at 4% is a $250k target increase.",
      },
      {
        type: "h2",
        content: "Choosing an SWR for a Lean plan",
      },
      {
        type: "ul",
        content: [
          "4% is a historical U.S. research conversation starter (Bengen / Trinity-style lineage) — not a warranty for 40–50 year early retirements.",
          "Many early-retirement planners stress 3–3.5% as a planning band, especially with thin discretionary buffers.",
          "Lower SWR → higher Lean number → more accumulation or more years working — explicit trade-off.",
          "Flexibility (cuttable spend, part-time optionality) can matter as much as the point estimate.",
        ],
      },
      {
        type: "h2",
        content: "Coast and Barista numbers at Lean spend",
      },
      {
        type: "ul",
        content: [
          "Full Lean FIRE: spending ÷ SWR (tables above).",
          "Coast (constant-return sketch): coast ≈ full Lean FIRE ÷ (1+r)^n, with n = years until traditional retirement age.",
          "Example: $1.0M Lean target, n = 25, r = 5% real → coast ≈ $295k; at 4% real → coast ≈ $375k.",
          "Barista: gap = max(0, Lean spend − work income); barista number = gap ÷ SWR. $40k spend − $15k work → $25k gap → $625k at 4%.",
        ],
      },
      {
        type: "h2",
        content: "Workflow in the FIRE Number calculator",
      },
      {
        type: "ul",
        content: [
          "Enter your all-in annual spend (not “hope spend”).",
          "Set SWR to 4%, then re-run at 3.5% and 3%.",
          "Use Lean preset only if you need a starting stub — overwrite it.",
          "Export CSV or copy share URL so the number is reproducible.",
          "Cross-check Years, Coast, and Barista under the same assumptions.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is $1M the Lean FIRE number? Only if your spend and SWR imply it (e.g. $40k at 4%).",
          "Do I include taxes in spending? Be consistent: either model gross needs carefully or treat the simple number as pre-tax illustration and stress upward.",
          "Should partners use one number or two? Model the household cash-flow unit you actually run.",
        ],
      },
      {
        type: "p",
        content:
          "Part of the Lean FIRE pillar series. See Lean FIRE explained, budget systems, and path/savings-rate guides. Educational tables only — not advice. Methodology and disclaimer apply.",
      },
    ],
  },
  {
    slug: "lean-fire-budget-lifestyle",
    title: "Lean FIRE budget and lifestyle systems (that survive reality)",
    description:
      "Build a Lean FIRE spending figure from categories, fixed vs flexible costs, housing and healthcare load-bearers, HCOL reality checks, and a tracking loop — educational only.",
    date: "2026-07-21",
    readingMinutes: 11,
    tags: ["lean-fire", "basics", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "Most Lean FIRE failures are not spreadsheet algebra failures. They are budget design failures: a target built from vibes, coffee-shop cuts, and last year’s luck. The portfolio formula is mercilessly honest — garbage spend in, garbage FIRE number out. This cluster is about constructing a Lean annual spending figure that can survive contact with housing, healthcare, and human behavior.",
      },
      {
        type: "h2",
        content: "Start from categories, not aesthetics",
      },
      {
        type: "ul",
        content: [
          "Housing (rent/mortgage, tax, insurance, maintenance, HOA)",
          "Utilities and communications",
          "Food (home + away) — track, don’t invent",
          "Transportation",
          "Healthcare premiums, out-of-pocket, dental/vision",
          "Insurance (beyond health)",
          "Debt payments (if any remain in the plan)",
          "Kids / dependents / pets if applicable",
          "Discretionary (travel, hobbies, gifts) — small on Lean, not zero if zero is unstable",
          "Buffer / irregular (repairs, replacements, one-offs annualized)",
        ],
      },
      {
        type: "p",
        content:
          "Sum 12 months of real data when you can. Then build a FI-year version: what changes when paychecks stop, commute changes, or employer benefits disappear. Lean plans often under-price the benefits cliff.",
      },
      {
        type: "h2",
        content: "Fixed vs flexible (Lean’s real safety valve)",
      },
      {
        type: "ul",
        content: [
          "Fixed: hard to cut quickly without moving or major life change.",
          "Flexible: can compress in a bad market year (travel, dining, hobbies).",
          "A Lean budget with almost no flexible line items has little sequence-risk shock absorber.",
          "Planning exercise: write a “recession Lean” budget 10–20% below baseline and ask if life is still acceptable.",
        ],
      },
      {
        type: "h2",
        content: "Housing and healthcare: load-bearing beams",
      },
      {
        type: "ul",
        content: [
          "If housing alone is 40%+ of a Lean target, stress geo arbitrage, housemates, or longer accumulation honestly.",
          "Healthcare quotes beat forum averages. Model premiums at the ages you will actually be.",
          "Barista paths sometimes exist mainly for benefits — portfolio math must not ignore that motive.",
          "HCOL Lean without a structural housing solution is often Regular spend wearing a Lean label.",
        ],
      },
      {
        type: "h2",
        content: "Lifestyle design vs deprivation",
      },
      {
        type: "p",
        content:
          "Sustainable Lean aligns low cash outflows with high non-cash values (time, health, community, place). Fragile Lean is chronic deprivation that only works until burnout. The calculator cannot detect resentment; you must. If the only way the numbers close is a life you will abandon in year three, raise spend, lengthen the timeline, or change location — do not cosplay a $40k life on a $65k personality.",
      },
      {
        type: "h2",
        content: "Tracking loop (simple, boring, effective)",
      },
      {
        type: "ul",
        content: [
          "Monthly: categorize transactions; flag one-offs.",
          "Quarterly: recompute annualized run-rate; update FIRE number at 3% / 3.5% / 4%.",
          "Annually: re-quote insurance; re-check housing plan; re-run Coast/Barista if work structure changed.",
          "After any life event (move, kid, job loss, health): rebuild spend before celebrating FI math.",
        ],
      },
      {
        type: "h2",
        content: "Map budget → RetireFire tools",
      },
      {
        type: "ul",
        content: [
          "FIRE Number: paste the honest annual spend.",
          "Years to FIRE: test savings rate if you cut flexible spend 10% vs raise income.",
          "Coast / Barista: only after the spend figure is trustworthy.",
          "Lean number tables cluster: convert budget into portfolio targets.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Should I use net or gross spending? Use the cash you need the portfolio (and other income) to support; be consistent about taxes.",
          "Is grocery-maxxing enough? Rarely. Housing and health dominate most Lean failures.",
          "Can couples be Lean if one partner is not? Household cash-flow must be negotiated; the spreadsheet is not a couples therapist.",
        ],
      },
      {
        type: "p",
        content:
          "Part of the Lean FIRE pillar series. Educational only — not financial, tax, or insurance advice. Verify benefits and housing with primary sources. See Lean FIRE explained and the disclaimer.",
      },
    ],
  },
  {
    slug: "lean-fire-path-years-savings-rate",
    title: "Lean FIRE path: years, savings rate, and Coast hybrids",
    description:
      "How long to Lean FIRE under savings-rate math, worked path tables, which levers move the date, and when Lean Coast or Barista hybrids help — educational only.",
    date: "2026-07-21",
    readingMinutes: 12,
    tags: ["lean-fire", "years-to-fire", "coast-fire"],
    body: [
      {
        type: "p",
        content:
          "Once you trust a Lean spending figure and a withdrawal-rate band, the next question is path: how many years of saving and investing might it take, and which lever moves the FI date most? This cluster sketches accumulation math the way RetireFire’s Years tool does — constant real return illustrations first, then humility about markets and life.",
      },
      {
        type: "h2",
        content: "Targets first, then years",
      },
      {
        type: "ul",
        content: [
          "Pick Lean spend S (example $40,000).",
          "Pick SWR → target portfolio F = S ÷ SWR (example 4% → $1,000,000).",
          "Years solver grows portfolio with contributions until it reaches F under assumed real return r.",
          "If you are already above F, years ≈ 0 for full Lean FI under those assumptions (work may still be chosen for other reasons).",
        ],
      },
      {
        type: "h2",
        content: "Savings rate intuition",
      },
      {
        type: "p",
        content:
          "Savings rate is roughly annual savings divided by gross or take-home income — define it the same way every time. Higher savings rate usually dominates small return tweaks for time-to-FI because it both adds more dollars and often correlates with lower lifestyle spend (if the spend is the Lean target itself).",
      },
      {
        type: "ul",
        content: [
          "Illustrative only (constant 5% real return, $0 start, $40k Lean target at 4% = $1M): the higher the annual savings, the shorter the path — re-run with your numbers in Years to FIRE.",
          "From a $100k or $250k starting portfolio, years compress nonlinearly; early capital matters.",
          "Raising spend to $50k (target $1.25M at 4%) lengthens the path even if savings stay fixed.",
          "Dropping SWR to 3% (target ≈ $1.33M on $40k) lengthens the path without any lifestyle upgrade — pure safety premium.",
        ],
      },
      {
        type: "h2",
        content: "Lever ranking (typical)",
      },
      {
        type: "ul",
        content: [
          "1) Sustainable spend level (defines F).",
          "2) Annual savings / savings rate (fills F).",
          "3) Starting portfolio.",
          "4) Assumed real return (sensitive, uncertain).",
          "5) Withdrawal-rate choice (policy, not a market forecast).",
        ],
      },
      {
        type: "p",
        content:
          "For most accumulators, arguing about 5.0% vs 5.5% real return while ignoring a $8k housing decision is inverted priority. Fix spend and savings clarity before fine-tuning return fantasies.",
      },
      {
        type: "h2",
        content: "Lean Coast hybrid",
      },
      {
        type: "ul",
        content: [
          "Full Lean FI: portfolio covers Lean spend now; work optional.",
          "Lean Coast: work still covers today’s Lean (or current) lifestyle; portfolio is large enough that contributions can stop while compounding toward full Lean FI by a traditional retirement age.",
          "Coast number ≈ F ÷ (1+r)^n. Smaller F (Lean) → smaller coast number → earlier option to stop aggressive saving.",
          "Always stress coast with lower r, higher spend, and free sequence tools — coast is not a green light by itself.",
        ],
      },
      {
        type: "h2",
        content: "Lean Barista hybrid",
      },
      {
        type: "ul",
        content: [
          "Gap = max(0, Lean spend − durable work income).",
          "Barista number = gap ÷ SWR — often much smaller than full Lean FI.",
          "Trade-off: job risk, hours, and benefits vs smaller portfolio.",
          "Model benefits cliffs separately; market Monte Carlo does not price insurance policy changes.",
        ],
      },
      {
        type: "h2",
        content: "Practical path workflow",
      },
      {
        type: "ul",
        content: [
          "Write S, SWR, F, current portfolio, annual savings, ages.",
          "Run Years to FIRE baseline; export or share URL.",
          "Scenario B: +10% spend; Scenario C: −$5k savings; Scenario D: 3.5% SWR.",
          "If years blow up under mild stress, the plan was brittle.",
          "Only then explore Coast or Barista as structural alternatives.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Does a high savings rate guarantee Lean FIRE? No — returns, job loss, and spend shocks still exist.",
          "Is Coast “better” than full Lean FI? Different question: optional work now vs optional contributions later.",
          "Should I use nominal or real returns? RetireFire emphasizes real (inflation-adjusted) clarity; stay consistent.",
        ],
      },
      {
        type: "p",
        content:
          "Part of the Lean FIRE pillar series with number tables and budget systems. Use Years, Coast, and FIRE Number calculators under shared assumptions. Educational only — not financial advice. Methodology, sequence-risk guide, and disclaimer apply.",
      },
    ],
  },
  {
    slug: "retirefire-methodology-explained",
    title: "RetireFire methodology explained (human version)",
    description:
      "Plain-language tour of RetireFire math: FIRE number, years, Coast, Barista, shared assumptions, free Monte Carlo stress tests, and deliberate limits — without the jargon wall.",
    date: "2026-07-20",
    readingMinutes: 11,
    tags: ["methodology", "basics", "stress-test"],
    body: [
      {
        type: "p",
        content:
          "Methodology pages are often written for people who already trust the product. This post is the human version: what each RetireFire tool computes, which assumptions are shared, what the free stress test does, and what we deliberately leave out. Pair it with the full Methodology page when you want formulas on one screen.",
      },
      {
        type: "h2",
        content: "The one-sentence product idea",
      },
      {
        type: "p",
        content:
          "Show transparent FIRE math under named assumptions, keep core tools free, and prefer ranges over false confidence. If a result cannot be explained in plain language, it should not ship as a green checkmark.",
      },
      {
        type: "h2",
        content: "Four questions, four tools",
      },
      {
        type: "ul",
        content: [
          "FIRE Number — “How large a portfolio for this spending and withdrawal rate?” → spending ÷ SWR.",
          "Years to FIRE — “How long might accumulation take under constant real return and steady savings?”",
          "Coast FIRE — “Can growth alone finish full FIRE by a traditional retirement age if I stop contributions?” → full FIRE ÷ (1+r)^n.",
          "Barista FIRE — “What portfolio covers the gap after part-time income?” → max(0, spend − work income) ÷ SWR.",
        ],
      },
      {
        type: "h2",
        content: "Shared assumptions (why that matters)",
      },
      {
        type: "p",
        content:
          "Spending, portfolio, savings, withdrawal rate, real return, ages, and part-time income live in one planner state. Change SWR once and FIRE, Coast, Barista, and Years stay consistent. Share URLs and CSV export freeze a snapshot so “my plan” is not a vibe.",
      },
      {
        type: "h2",
        content: "Defaults are starting points, not forecasts",
      },
      {
        type: "ul",
        content: [
          "Example default SWR: 4% (historical conversation starter; early retirees often stress 3–3.5%).",
          "Example default real return: 5% (illustrative; lower it when you want conservatism).",
          "Lean / Regular / Fat: spending presets ($40k / $60k / $100k examples) — not academic standards.",
          "Traditional retirement age default: 65 for Coast horizon math — edit it.",
        ],
      },
      {
        type: "h2",
        content: "Constant return first, then ranges",
      },
      {
        type: "p",
        content:
          "Main calculators assume the same real return every year. That is intentional clarity, not a claim markets are smooth. Sensitivity chips and Scenario A/B let you change one lever at a time. Coast and Years also offer a free basic Monte Carlo: 1,000 paths, volatility presets, success rate and p10/p50/p90 terminals under a simple shock model (seed 42). It is educational dispersion — not historical cycle backtesting and not a life success probability.",
      },
      {
        type: "h2",
        content: "What we leave out on purpose (for now)",
      },
      {
        type: "ul",
        content: [
          "Taxes, account types, RMDs, withdrawal ordering",
          "Fees as a first-class drag model",
          "Social Security, pensions, annuities",
          "Healthcare premiums and subsidy cliffs (see Barista healthcare guide)",
          "Full historical market engines and multi-regime Pro-depth sims (teased, not gated on free core)",
        ],
      },
      {
        type: "h2",
        content: "Research lineage we cite carefully",
      },
      {
        type: "p",
        content:
          "The 4% conversation tracks Bengen and Trinity Study–style historical U.S. portfolio survival research. We describe it as history-based guidance, not a warranty. Safe withdrawal rate posts and Methodology expand the nuance for early retirement horizons.",
      },
      {
        type: "h2",
        content: "How to use the suite without lying to yourself",
      },
      {
        type: "ul",
        content: [
          "Name spending honestly (including healthcare).",
          "Run at least two SWR and two return assumptions.",
          "Use Coast checklist before cutting contributions.",
          "Read stress-test tails, not only success rate.",
          "Compare Coast vs Barista when the question is work vs savings.",
          "Escalate high-stakes plans to full planning tools and professionals.",
        ],
      },
      {
        type: "h2",
        content: "Free core promise",
      },
      {
        type: "p",
        content:
          "If optional Pro features ship later (more paths, regimes, saved scenarios, detailed reports), core calculators and a useful free stress-test tier are intended to remain free. Approach documents that contract in plain language.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is Methodology the same as this post? Methodology is the formula reference; this is the narrative tour.",
          "Why not taxes first? Complexity that obscures the core identity question ships later, if ever, as optional depth.",
          "Why seed 42? Reproducibility for the free stress test under the same inputs.",
        ],
      },
      {
        type: "p",
        content:
          "Read the full Methodology page, Approach & roadmap, sequence-risk guide, and disclaimer. Educational only — not financial, tax, or investment advice.",
      },
    ],
  },
  {
    slug: "semi-retirement-math-portfolio-part-time-income",
    title: "Semi-retirement math: portfolio + part-time income",
    description:
      "Worked Barista FIRE / semi-retirement math: gap formula, SWR tables, Coast comparison, income volatility, and a practical scenario workflow — educational only.",
    date: "2026-07-20",
    readingMinutes: 11,
    tags: ["barista-fire", "semi-retirement", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "Semi-retirement (Barista FIRE) asks a cash-flow question: if intentional work income covers part of spending, how large a portfolio do you still need? The formula is short. The life design is not. This guide works the math with transparent examples and shows where to stress it.",
      },
      {
        type: "h2",
        content: "Core formula",
      },
      {
        type: "ul",
        content: [
          "Gap spending = max(0, annual expenses − annual work income).",
          "Barista / semi-retirement number = gap ÷ withdrawal rate.",
          "If work income ≥ expenses, portfolio need for the gap is $0 under this model — you still may want reserves, and the model ignores job risk.",
          "Full FIRE number remains expenses ÷ SWR for comparison.",
        ],
      },
      {
        type: "h2",
        content: "Worked table ($60k spend)",
      },
      {
        type: "ul",
        content: [
          "Work $0 → gap $60k → 4% = $1.5M · 3.5% ≈ $1.71M · 3% = $2.0M (full FIRE).",
          "Work $20k → gap $40k → 4% = $1.0M · 3.5% ≈ $1.14M · 3% ≈ $1.33M.",
          "Work $30k → gap $30k → 4% = $750k · 3.5% ≈ $857k · 3% = $1.0M.",
          "Work $45k → gap $15k → 4% = $375k · 3.5% ≈ $429k · 3% = $500k.",
        ],
      },
      {
        type: "p",
        content:
          "Every $10k of durable work income at 4% SWR reduces the portfolio target by $250k. That leverage is why Barista is popular — and why fragile income assumptions are dangerous.",
      },
      {
        type: "h2",
        content: "Barista vs Coast vs full FI",
      },
      {
        type: "ul",
        content: [
          "Full FI: portfolio covers spending; work optional.",
          "Barista: work covers part of spend now; portfolio covers the rest.",
          "Coast: work still covers full lifestyle spend; portfolio is sized so contributions can stop while compounding toward full FI by traditional retirement age.",
          "Same person can Coast first (stop maxing retirement savings) then later Barista (cut hours) — different tools for different stages.",
        ],
      },
      {
        type: "h2",
        content: "Income is not an annuity",
      },
      {
        type: "ul",
        content: [
          "Hours get cut; gigs dry up; clients churn.",
          "Benefits may vanish below hour thresholds (see healthcare cliffs guide).",
          "Self-employment taxes and irregular cash flow differ from W-2 part-time.",
          "Stress case: re-run with work income −25% and −50%, and with a year of $0 work income (bridge reserve).",
        ],
      },
      {
        type: "h2",
        content: "Spending often rises with free time",
      },
      {
        type: "p",
        content:
          "Travel, hobbies, and “I have time now” projects can lift expenses exactly when income falls. Model semi-retirement spend as a separate budget, not last year’s full-time lifestyle with salary deleted.",
      },
      {
        type: "h2",
        content: "Practical workflow in RetireFire",
      },
      {
        type: "ul",
        content: [
          "1. Set true semi-retirement spending (with healthcare).",
          "2. Enter expected work income in Barista calculator.",
          "3. Toggle SWR 4% / 3.5% / 3%.",
          "4. Pin Scenario A (full-time / full FIRE path) vs B (semi-retirement inputs).",
          "5. Compare Coast if the real question is “stop aggressive saving” not “cut hours.”",
          "6. Keep emergency reserves outside the barista pile.",
          "7. Revisit yearly — income and benefits change.",
        ],
      },
      {
        type: "h2",
        content: "Example story (synthetic)",
      },
      {
        type: "p",
        content:
          "Alex spends $70k, holds $900k invested, can earn $28k part-time. Gap $42k → at 4% needs $1.05M (short ~$150k); at 3.5% needs ~$1.2M. Full FIRE at 4% is $1.75M. Coast to 65 may already be green while Barista is not — meaning Alex might reduce retirement contributions but not yet cut to part-time without a larger pile or lower spend. Numbers are illustrations, not advice.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Does work income get inflated in the model? Simple tools usually treat it as a constant real amount — edit inputs as your plan changes.",
          "Should I include employer benefits as income? Better to put full costs in spending and cash pay in income.",
          "Is semi-retirement safer than full FIRE? Often lower portfolio risk target, higher job and benefits risk — different risk, not free lunch.",
        ],
      },
      {
        type: "p",
        content:
          "Open the Barista FIRE calculator, read Barista vs Coast and healthcare cliffs posts, and see Methodology for formulas. Educational only — not financial, tax, or career advice.",
      },
    ],
  },
  {
    slug: "barista-fire-healthcare-benefits-cliffs",
    title: "Barista FIRE healthcare & benefits cliffs (education)",
    description:
      "How employer hours, insurance eligibility, and benefit cliffs can dominate Barista FIRE math — what simple portfolio gap calculators omit, and a practical planning checklist.",
    date: "2026-07-19",
    readingMinutes: 11,
    tags: ["barista-fire", "semi-retirement", "basics"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE math is seductively clean: portfolio only needs to cover the gap between spending and part-time income. In real households, healthcare and benefits often dwarf that gap. A “cheap” semi-retirement that loses affordable coverage can be more expensive than full FIRE with a larger pile. This guide is educational framing for the cliffs calculators deliberately omit — not tax, legal, or benefits advice.",
      },
      {
        type: "h2",
        content: "What Barista FIRE calculators measure",
      },
      {
        type: "ul",
        content: [
          "Gap spending = max(0, annual expenses − part-time / work income).",
          "Barista number ≈ gap ÷ withdrawal rate (same SWR dial as full FIRE).",
          "They usually ignore premiums, subsidies, payroll taxes, job reliability, and hour thresholds.",
          "They assume work income is a flat annuity. Real gigs are lumpy.",
        ],
      },
      {
        type: "h2",
        content: "The major cliff categories (conceptual)",
      },
      {
        type: "ul",
        content: [
          "Hours eligibility: many employer medical plans require a minimum hours threshold. Dropping below it can mean full retail premiums or marketplace plans.",
          "Household income tests: some subsidies and program eligibility phase out as modified income rises — more work can raise coverage cost nonlinearly.",
          "Age gates: Medicare-era coverage (when eligible) changes the bridge problem; early semi-retirement often means decades before that.",
          "Family structure: partner coverage, dependents, and COBRA-style bridges (time-limited, often expensive) change the math year by year.",
          "Tax treatment of premiums and HSA eligibility can differ by plan type and employment status — model outside the simple gap formula.",
        ],
      },
      {
        type: "h2",
        content: "Why “just earn $25k part-time” is incomplete",
      },
      {
        type: "p",
        content:
          "Suppose spending is $60k and part-time pay is $25k. Gap = $35k. At 4% SWR, barista portfolio ≈ $875k vs full FIRE $1.5M — a big reduction on paper. If leaving full-time work raises healthcare costs by $12k/year, true gap becomes $47k and barista number ≈ $1.175M. If a partner’s plan covers you only while they stay employed, the plan is contingent on their job. The calculator’s gap is not wrong; the spending input was incomplete.",
      },
      {
        type: "h2",
        content: "A practical workflow (still not advice)",
      },
      {
        type: "ul",
        content: [
          "1. Write full lifestyle spending including a realistic healthcare line (premiums + out-of-pocket estimate), not “medical = $0 because employer paid it.”",
          "2. Run Barista FIRE at that all-in spend and your expected work income.",
          "3. Re-run with healthcare +20–50% (premium shock) and with work income −25% (hours cut / dry spell).",
          "4. Compare to full FIRE and Coast: sometimes Coast + continued benefits job is safer than thin Barista + expensive coverage.",
          "5. Use Scenario compare to pin “full-time benefits job” vs “semi-retirement + marketplace-style costs.”",
          "6. Stress SWR (3.5% / 3%) — semi-retirement often still has multi-decade portfolio risk.",
        ],
      },
      {
        type: "h2",
        content: "Benefits that are not only health insurance",
      },
      {
        type: "ul",
        content: [
          "Employer match / stock purchase — walking away can be a high opportunity cost even if you “have enough.”",
          "Disability and life insurance through work — replacing privately can be expensive or underwritten.",
          "Paid leave, training, and network effects — hard to price, easy to miss until gone.",
          "Visa / professional licensing requirements — career-specific constraints calculators never see.",
        ],
      },
      {
        type: "h2",
        content: "Integrity rules for Barista planning",
      },
      {
        type: "ul",
        content: [
          "Never treat part-time income as risk-free forever.",
          "Model coverage separately from portfolio gap for at least two ages (now and 5–10 years out).",
          "If the plan only works with a perfect cheap insurance outcome, it is fragile.",
          "RetireFire will not invent fake precision about your country’s subsidy schedule — you must bring real quotes.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is Barista always cheaper than full FIRE? Portfolio target yes; total life cost including benefits maybe not.",
          "Should I count employer healthcare as “income”? Better: put true total spend (with premiums) in expenses and leave pay as cash income.",
          "Does stress test cover healthcare cliffs? No — Monte Carlo is market path risk, not benefits policy.",
        ],
      },
      {
        type: "p",
        content:
          "Run numbers in the Barista FIRE calculator, compare Coast vs Barista guides, and read Approach for what models omit. Rules and programs change by jurisdiction and year — verify with official sources or a licensed professional. Educational only — not financial, tax, or insurance advice.",
      },
    ],
  },
  {
    slug: "lean-regular-fat-fire-numbers-2026",
    title: "Lean vs Regular vs Fat FIRE numbers (2026)",
    description:
      "Transparent 2026 FIRE number tables for Lean, Regular, and Fat spending presets at 3%, 3.5%, and 4% withdrawal rates — plus Coast and Barista sketches and stress context.",
    date: "2026-07-19",
    readingMinutes: 10,
    tags: ["fire-number", "2026", "basics"],
    body: [
      {
        type: "p",
        content:
          "Lean, Regular, and Fat FIRE are community labels for lifestyle spending bands — not research standards and not moral ranks. In 2026 they remain useful as transparent presets: pick a spending level, divide by a withdrawal rate, and you have a starting FIRE number. Below uses RetireFire’s published example presets ($40k / $60k / $100k annual spend) so you can re-run every cell yourself.",
      },
      {
        type: "h2",
        content: "Presets (illustrative USD spending)",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE example: $40,000/year lifestyle spend.",
          "Regular FIRE example: $60,000/year.",
          "Fat FIRE example: $100,000/year.",
          "Your real number is your budget, not the label. Housing, healthcare, and family can move you across bands overnight.",
        ],
      },
      {
        type: "h2",
        content: "FIRE number table (spending ÷ SWR)",
      },
      {
        type: "ul",
        content: [
          "Lean $40k: 4% → $1.0M · 3.5% → ≈ $1.14M · 3% → ≈ $1.33M",
          "Regular $60k: 4% → $1.5M · 3.5% → ≈ $1.71M · 3% → $2.0M",
          "Fat $100k: 4% → $2.5M · 3.5% → ≈ $2.86M · 3% → ≈ $3.33M",
        ],
      },
      {
        type: "p",
        content:
          "Moving from 4% to 3% raises the target by one-third for the same lifestyle. That is the core trade-off: lower planned withdrawal rate means more accumulation (or lower spending), and often more buffer for long early-retirement horizons.",
      },
      {
        type: "h2",
        content: "Coast sketch (constant-return illustration)",
      },
      {
        type: "p",
        content:
          "Coast ≈ full FIRE ÷ (1+r)^n. Example: Regular $1.5M full FIRE, n = 25 years to traditional retirement age, r = 5% real → coast ≈ $443k. At 4% real → coast ≈ $563k. Lean and Fat scale linearly with full FIRE. Use the Coast calculator age table and free stress test; do not treat a single coast number as a green light.",
      },
      {
        type: "h2",
        content: "Barista sketch (gap only)",
      },
      {
        type: "p",
        content:
          "If Regular spend is $60k and part-time income is $25k, gap = $35k. At 4% → barista pile ≈ $875k; at 3.5% → ≈ $1.0M. Healthcare cliffs can erase the “savings” versus full FIRE — see the Barista healthcare guide. Labels still apply: Lean Barista vs Fat Barista is still about total lifestyle spend, not virtue.",
      },
      {
        type: "h2",
        content: "2026 planning context (no hype)",
      },
      {
        type: "ul",
        content: [
          "Inflation and local housing mean $60k “Regular” is not the same lifestyle in every city.",
          "Taxes, fees, and account types are outside these pre-tax illustrations.",
          "Long horizons still argue for SWR sensitivity and sequence awareness.",
          "RetireFire defaults (example): 4% SWR starting point, 5% real return — change them; they are not forecasts.",
        ],
      },
      {
        type: "h2",
        content: "How to use the calculators",
      },
      {
        type: "ul",
        content: [
          "FIRE Number: set spend + SWR; try Lean/Regular/Fat style hints if offered.",
          "Years to FIRE: see which lever (spend vs save) closes your band faster.",
          "Coast / Barista: answer different questions with the same shared assumptions.",
          "Scenario compare: pin Regular 4% vs Fat 3.5% side by side.",
          "Export CSV / share URL so labels stay attached to numbers, not vibes.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is Fat FIRE “better”? Only if it matches your values and funding path — it is a spending choice.",
          "Can I be Lean FIRE in a HCOL city? Maybe with roommates/geo arbitrage; the label does not override rent.",
          "Should I plan Fat spend at Lean SWR? That is a large pile; run ranges honestly rather than marketing a number.",
        ],
      },
      {
        type: "p",
        content:
          "Educational tables only — not financial advice and not a claim that these spends fit you in 2026. For a full Lean-only deep dive (definition, budget systems, path math), see Lean FIRE explained and its number / budget / years clusters. Start at the FIRE Number calculator; read Methodology and the disclaimer.",
      },
    ],
  },
  {
    slug: "how-to-stress-test-coast-fire-number",
    title: "How to stress-test your Coast FIRE number (practical guide)",
    description:
      "Step-by-step: deterministic Coast math first, then lower return/SWR sensitivity, free Monte Carlo ranges, and a go/no-go checklist before you change savings.",
    date: "2026-07-18",
    readingMinutes: 12,
    tags: ["coast-fire", "stress-test", "sequence-risk"],
    body: [
      {
        type: "p",
        content:
          "Hitting a Coast FIRE number on a smooth-return calculator feels decisive. It should not be. Coast math answers: “If returns equal my assumed real rate every year until traditional retirement age, is my pile large enough that contributions can drop?” Sequence risk, lower returns, and life plumbing can still make that “yes” fragile. This guide is a practical stress-test workflow you can run in an afternoon.",
      },
      {
        type: "h2",
        content: "What you are testing (and what you are not)",
      },
      {
        type: "ul",
        content: [
          "You are testing whether a coast decision looks robust under worse assumptions and path noise.",
          "You are not proving you can retire early, quit healthcare planning, or ignore taxes.",
          "Success rates from a toy Monte Carlo are model outputs under stated rules — not the probability your life works out.",
          "Coast ≠ Barista. If part-time income covers a spending gap, use Barista math separately.",
        ],
      },
      {
        type: "h2",
        content: "Step 1 — Write the deterministic baseline",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator. Set annual spending, withdrawal rate, current age, traditional retirement age, current portfolio, and real return. Write down: full FIRE = spending ÷ SWR; coast ≈ FIRE ÷ (1+r)^n with n = retirement age − current age; shortfall or surplus vs portfolio today. Export CSV or copy the share link so the baseline is recoverable.",
      },
      {
        type: "h2",
        content: "Step 2 — Sensitivity before simulation",
      },
      {
        type: "ul",
        content: [
          "Drop real return by ~1 percentage point (e.g. 5% → 4%). Recompute coast.",
          "Drop SWR (e.g. 4% → 3.5% or 3%). Full FIRE and coast both rise.",
          "Raise spending 10% (lifestyle creep or healthcare realism). Recompute.",
          "Use Scenario compare: pin baseline A, change one lever at a time as B.",
          "If surplus disappears under two mild stresses, treat “already coasting” as soft, not permanent.",
        ],
      },
      {
        type: "h2",
        content: "Step 3 — Free sequence stress test (Coast tool)",
      },
      {
        type: "p",
        content:
          "On Coast FIRE, open the stress-test panel. It runs 1,000 paths with the same mean real return and a chosen volatility (12% / 15% / 18% presets), contributions = 0, target = full FIRE, seed 42 for reproducibility. Read: success rate (paths with terminal ≥ full FIRE), p10 / median / p90 terminals, sample paths, and the histogram. Prefer interpreting the band of outcomes over a single green success percentage.",
      },
      {
        type: "h2",
        content: "Step 4 — How to read the results without false precision",
      },
      {
        type: "ul",
        content: [
          "High success + p10 still near target → model says more cushion under this toy path model.",
          "OK median but weak p10 → order risk bites; keep savings, lower spending target, or delay the coast decision.",
          "Changing σ from 12% to 18% swings results a lot → your conclusion depends on volatility assumptions; say so out loud.",
          "Never treat 1,000 i.i.d. annual shocks as historical truth. See Monte Carlo vs historical cycles for the other family of tools.",
        ],
      },
      {
        type: "h2",
        content: "Worked sketch (illustrative only)",
      },
      {
        type: "p",
        content:
          "Spending $60k, SWR 4% → FIRE $1.5M. Age 40 → 65 (25 years), r = 5% real → coast ≈ $443k. Portfolio $500k: constant-return model says past coast. Sensitivity at 4% real and 3.5% SWR can erase that surplus. A free stress test may still show a non-trivial share of paths finishing under $1.5M if σ is high and the horizon is long. Decision: maybe reduce contributions gradually, keep emergency funds, re-run yearly — not “markets are guaranteed.”",
      },
      {
        type: "h2",
        content: "Step 5 — Life gates outside the formula",
      },
      {
        type: "ul",
        content: [
          "Healthcare plan for remaining working years and any gap years.",
          "Emergency fund separate from the invested coast pile.",
          "High-interest debt and near-term cash needs named, not assumed away.",
          "Rule against lifestyle creep silently raising full FIRE after you “coast.”",
          "Partner / co-planner saw the same share link or CSV.",
        ],
      },
      {
        type: "h2",
        content: "Go / no-go hygiene",
      },
      {
        type: "ul",
        content: [
          "Go (cautious): surplus under base + mild stresses; stress-test tails acceptable to you; life gates green.",
          "Hold: base case coasts but stress cases do not — keep contributing a floor amount.",
          "No-go: base case only works at optimistic r and SWR — do not change savings on that alone.",
          "Use the free Coast assumptions checklist as a pre-flight.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is a 90% success rate “safe”? It is 90% of simulated paths under this model definition — not a warranty.",
          "Should I coast if stress test is “ugly” but constant return is green? Prefer ranges; often keep a savings floor.",
          "Does stress test replace historical tools? No — it is complementary and simpler. Use both families when stakes are high.",
          "Taxes? Not in the model. Effective after-tax plans can need a larger pile.",
        ],
      },
      {
        type: "p",
        content:
          "Run the workflow on the Coast FIRE calculator, read Methodology for formulas, Approach for what stays free, and the sequence-risk guide for path concepts. Educational only — not financial, tax, or investment advice.",
      },
    ],
  },
  {
    slug: "years-to-fire-which-lever-moves-the-needle",
    title: "Years to FIRE: which lever moves the needle most?",
    description:
      "Savings rate, spending, returns, and withdrawal rate ranked by impact on years-to-FIRE — with worked examples, sensitivity tips, and how to stress-test the timeline.",
    date: "2026-07-18",
    readingMinutes: 11,
    tags: ["years-to-fire", "fire-number", "basics"],
    body: [
      {
        type: "p",
        content:
          "Years-to-FIRE calculators solve a compound-growth question: given portfolio, annual savings, spending, real return, and a withdrawal rate that sets the FIRE target, how long until portfolio ≥ spending ÷ SWR? People often obsess over return assumptions. For most mid-journey plans, the levers that move the timeline hardest are closer to your paycheck and lifestyle.",
      },
      {
        type: "h2",
        content: "The levers (ranked for typical workers)",
      },
      {
        type: "ul",
        content: [
          "1. Annual spending (sets FIRE number and how much you can save).",
          "2. Annual savings / savings rate (direct fuel into the portfolio).",
          "3. Withdrawal rate choice (changes the finish line more than people admit).",
          "4. Starting portfolio (big if you already have a large pile; less if early).",
          "5. Assumed real return (matters, but is the least controllable and easiest to overfit).",
        ],
      },
      {
        type: "h2",
        content: "Why spending punches twice",
      },
      {
        type: "p",
        content:
          "Lower spending shrinks full FIRE (spending ÷ SWR) and usually raises how much you can save. That double effect is why “earn more and spend it all” often fails to shorten the timeline as much as a durable spending cut. Raising income only helps years-to-FIRE if the margin becomes invested capital, not lifestyle.",
      },
      {
        type: "h2",
        content: "Worked comparison (illustrative)",
      },
      {
        type: "p",
        content:
          "Start: portfolio $200k, spending $70k, save $30k/year, r = 5% real, SWR 4% → FIRE = $1.75M. Timeline is multi-decade. Case A: cut spending to $60k (FIRE $1.5M) and save $40k — timeline drops sharply. Case B: keep $70k spend, “optimize” return assumption to 7% real — chart looks better, but you did not control markets. Case C: keep spend and save, drop SWR to 3.5% (FIRE ≈ $2.0M) — finish line moves out. Use the Years calculator and Scenario compare to pin A and toggle one input at a time.",
      },
      {
        type: "h2",
        content: "Savings rate vs return (intuition)",
      },
      {
        type: "ul",
        content: [
          "Early years: contributions dominate terminal wealth; return noise matters less than consistent savings.",
          "Late years: portfolio size is large; return and sequence risk dominate residual years.",
          "If you are early, prioritize savings rate and career capital; if late, prioritize sequence cushions and SWR honesty.",
        ],
      },
      {
        type: "h2",
        content: "Withdrawal rate is a finish-line lever",
      },
      {
        type: "p",
        content:
          "Planning at 4% vs 3.5% is a 14% larger pile for the same spending. That is not a free “efficiency tip” — it is a risk preference about long horizons and flexible spending. Early retirees often stress lower rates or flexible rules. See the safe withdrawal rate guide for 3% / 3.5% / 4% framing.",
      },
      {
        type: "h2",
        content: "How to use RetireFire for lever analysis",
      },
      {
        type: "ul",
        content: [
          "Years to FIRE calculator: baseline timeline under shared assumptions.",
          "Sensitivity chips (± return / SWR style controls where available): instant “what if.”",
          "Scenario A/B: pin current plan, change savings or spending, read Δ years.",
          "Stress test on Years: keep contributions, target = FIRE number — see path dispersion around the deterministic date.",
          "CSV export / share URL: keep honest records of which lever you claimed moved the plan.",
        ],
      },
      {
        type: "h2",
        content: "Common mistakes",
      },
      {
        type: "ul",
        content: [
          "Raising assumed returns until the chart hits a preferred year.",
          "Ignoring that higher spending raises FIRE and lowers savings simultaneously.",
          "Treating a single years estimate as a calendar appointment.",
          "Forgetting taxes, fees, and healthcare — all of which can add years in real life.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is maximizing savings rate always best? Not if it burns you out into a higher future spend; durability beats hero months.",
          "Should I wait for market dips to invest? Timing is not a reliable years-to-FIRE lever in these models.",
          "What about side income? Only the saved portion shortens years; Barista changes the question to semi-retirement cash flow.",
        ],
      },
      {
        type: "p",
        content:
          "Open Years to FIRE, pin a baseline in Scenario compare, and stress-test the timeline. Methodology documents formulas; Approach documents limits. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "when-can-you-stop-saving-for-retirement",
    title: "When can you stop saving for retirement?",
    description:
      "Coast FIRE is the clean answer to “when can I stop aggressive retirement saving?” — definitions, formula, decision gates, and why sequence risk still matters after you coast.",
    date: "2026-07-18",
    readingMinutes: 10,
    tags: ["coast-fire", "basics", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "“When can I stop saving for retirement?” is not the same as “when can I retire?” The Coast FIRE framing is usually the right one: you have enough invested that, if it compounds at an assumed real return until a traditional retirement age, it should reach a full FIRE target without further contributions — while you still earn enough to cover current spending.",
      },
      {
        type: "h2",
        content: "Precise definition",
      },
      {
        type: "ul",
        content: [
          "Full FIRE number ≈ annual spending ÷ planned withdrawal rate.",
          "Coast number ≈ full FIRE ÷ (1 + r)^n, n = years until traditional retirement age.",
          "You are “coasting” (under the model) when current portfolio ≥ coast number.",
          "You still need earned income (or other cash flow) for today’s lifestyle unless you are fully FI.",
        ],
      },
      {
        type: "h2",
        content: "What “stop saving” should mean in practice",
      },
      {
        type: "p",
        content:
          "Stopping aggressive retirement contributions is not the same as zero savings forever. Many people keep a floor: emergency fund top-ups, employer match (often still free money), HSA contributions, or a small default investment habit to fight lifestyle creep. “Stop saving” is better phrased as “stop prioritizing max retirement savings over other life goals under these assumptions.”",
      },
      {
        type: "h2",
        content: "Worked example",
      },
      {
        type: "p",
        content:
          "Spend $80k/year, plan 4% SWR → FIRE $2.0M. Age 38, traditional age 65 → n = 27 years. At 5% real, coast ≈ $2.0M / (1.05)^27 ≈ $534k. If you hold $600k invested (and healthcare/debt are handled), the constant-return model says you can reduce retirement contributions. If you hold $400k, you are not there yet — save more, spend less, or accept a later traditional age.",
      },
      {
        type: "h2",
        content: "Decision gates before you cut contributions",
      },
      {
        type: "ul",
        content: [
          "Surplus still exists at a lower real return (e.g. −1 pp) and a stricter SWR.",
          "Sequence stress test tails are acceptable for your risk tolerance (Coast free stress test).",
          "Healthcare and emergency funds are not “inside” the coast pile.",
          "You will not silently raise spending enough to re-inflate full FIRE.",
          "Partner alignment if household finances are shared.",
          "You re-run the numbers on job change, housing, kids, or market regime shifts.",
        ],
      },
      {
        type: "h2",
        content: "Coast vs Barista vs full FI",
      },
      {
        type: "ul",
        content: [
          "Coast: stop (or reduce) retirement contributions; still work for living expenses.",
          "Barista / semi-retirement: portfolio covers part of spend; part-time income covers the rest.",
          "Full FI: portfolio covers spending at your planned withdrawal rate without required work income.",
        ],
      },
      {
        type: "h2",
        content: "Why people regret stopping too early",
      },
      {
        type: "ul",
        content: [
          "Optimistic return or SWR assumptions that reverse under stress.",
          "Lifestyle creep after “I’m coasting” identity.",
          "Healthcare costs and family changes not in the spreadsheet.",
          "Confusing Coast with early retirement and withdrawing too soon.",
        ],
      },
      {
        type: "h2",
        content: "How to answer the question with RetireFire",
      },
      {
        type: "ul",
        content: [
          "Coast FIRE calculator for the number and age table for horizon intuition.",
          "Free stress test for path ranges (not a single green light).",
          "Scenario compare to pin “keep saving” vs “floor only.”",
          "Coast assumptions checklist as pre-flight before you change behavior.",
          "Methodology for formulas; Approach for limits and free-core promise.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Should I always take the employer match after coasting? Often yes — it is usually a high risk-adjusted return — but this is not personalized advice.",
          "Can I coast at 40 with a 50-year horizon? Full FIRE for early withdrawal is a different problem; coast-to-65 is not early retirement math.",
          "Is there one universal age to stop saving? No — only assumptions + pile + spending + gates.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice. See the disclaimer. Start with the Coast FIRE calculator and the free assumptions checklist.",
      },
    ],
  },
  {
    slug: "monte-carlo-vs-historical-cycles-fire",
    title: "Monte Carlo vs historical cycles: what free FIRE tools can teach",
    description:
      "How simple Monte Carlo stress tests differ from historical cycle backtests — success rates, limitations, and how to use each without false precision.",
    date: "2026-07-17",
    readingMinutes: 11,
    tags: ["sequence-risk", "stress-test", "methodology"],
    body: [
      {
        type: "p",
        content:
          "Once you leave constant-return FIRE math, two families of tools dominate: historical cycle backtests and Monte Carlo simulations. Both are useful. Neither is a crystal ball. This guide explains what free tools can honestly teach — and how RetireFire’s free stress test fits.",
      },
      {
        type: "h2",
        content: "Historical cycles (the cFIREsim / FIRECalc tradition)",
      },
      {
        type: "ul",
        content: [
          "Replay overlapping periods of real market history (and often inflation) through your plan.",
          "Strength: paths come from markets that actually happened, with real sequence clusters.",
          "Limit: the future will not be a shuffle of 1871–present; sample size of independent long retirements is smaller than it looks; US-centric history is common.",
        ],
      },
      {
        type: "h2",
        content: "Monte Carlo (random paths from a model)",
      },
      {
        type: "ul",
        content: [
          "Draw many return sequences from a statistical model (e.g. mean + volatility shocks).",
          "Strength: easy to explore “what if volatility is higher?” and to produce percentile bands.",
          "Limit: garbage-in assumptions (mean, σ, independence) dominate the pretty success rate; i.i.d. years miss regime crashes and autocorrelation unless the model adds them.",
        ],
      },
      {
        type: "h2",
        content: "What “success rate” means (and does not)",
      },
      {
        type: "p",
        content:
          "In accumulation stress tests, success often means terminal wealth ≥ target. In withdrawal tests, it often means the portfolio lasts N years. That percentage is the share of simulated or historical paths meeting the definition — not the probability that your life, taxes, and healthcare work out. If the definition is wrong for your question, the percentage is theater.",
      },
      {
        type: "h2",
        content: "How RetireFire’s free stress test works",
      },
      {
        type: "ul",
        content: [
          "1,000 paths, fixed volatility presets (12% / 15% / 18%).",
          "Mean return = the same shared real return as the main calculators.",
          "Annual independent shocks: r = mean + σ·Z (clipped), end-of-year contributions.",
          "Coast: contributions = 0; target = full FIRE. Years: keep contributions; target = FIRE number.",
          "Reports success rate, p10/p50/p90, sample paths, terminal histogram.",
          "Documented on Methodology; labeled educational, not historical backtesting.",
        ],
      },
      {
        type: "h2",
        content: "A practical workflow",
      },
      {
        type: "ul",
        content: [
          "Start with transparent constant-return Coast / FIRE / Barista numbers.",
          "Sensitivity: lower r and SWR before you celebrate.",
          "Run the free Monte Carlo for dispersion under a stated toy model.",
          "If the plan is high-stakes, graduate to a historical-cycle tool (cFIREsim lineage, etc.) and/or a planner.",
          "Never skip taxes, healthcare, and flexibility — tools omit them for a reason.",
        ],
      },
      {
        type: "h2",
        content: "What we are not claiming",
      },
      {
        type: "p",
        content:
          "We are not claiming Monte Carlo is “better” than history, or that 1,000 paths equal truth. We are claiming that a free, documented range next to a deterministic number beats a single green checkmark. Advanced paths, regimes, and historical engines may appear later as optional depth — core tools and a useful free stress test stay free.",
      },
      {
        type: "p",
        content:
          "Try Coast and Years stress tests on RetireFire, read Methodology, and use the Coast checklist before changing savings behavior. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "coast-fire-by-age-tables",
    title: "Coast FIRE by age: tables and worked examples",
    description:
      "Age-by-age Coast FIRE numbers for common spending levels, with 4% vs 5% real return stress columns and clear assumptions — plus how to run your own table.",
    date: "2026-07-17",
    readingMinutes: 12,
    tags: ["coast-fire", "tables", "linkable"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE is mostly a function of three inputs: your full FIRE target (spending ÷ withdrawal rate), years until a traditional retirement age, and an assumed real return. That makes age-by-age tables useful — if every assumption is listed. Below are transparent tables you can re-run in the calculator.",
      },
      {
        type: "h2",
        content: "Assumptions for all tables on this page",
      },
      {
        type: "ul",
        content: [
          "Traditional retirement age = 65",
          "Withdrawal rate for full FIRE = 4% (25× spending)",
          "Primary real return = 5%; stress column = 4%",
          "No future contributions after the coast number is held",
          "No taxes, fees, sequence risk, or Social Security in the table itself",
        ],
      },
      {
        type: "p",
        content:
          "Formula: coast ≈ FIRE ÷ (1+r)^n where n = 65 − current age. Educational only — not advice and not a promise markets deliver a constant real return.",
      },
      {
        type: "h2",
        content: "Table A — $60,000 spending → FIRE $1,500,000",
      },
      {
        type: "ul",
        content: [
          "Age 25 (40y): ~$213k @ 5% · ~$304k @ 4%",
          "Age 30 (35y): ~$272k @ 5% · ~$370k @ 4%",
          "Age 35 (30y): ~$347k @ 5% · ~$450k @ 4%",
          "Age 40 (25y): ~$443k @ 5% · ~$547k @ 4%",
          "Age 45 (20y): ~$565k @ 5% · ~$684k @ 4%",
          "Age 50 (15y): ~$722k @ 5% · ~$833k @ 4%",
          "Age 55 (10y): ~$921k @ 5% · ~$1.01M @ 4%",
        ],
      },
      {
        type: "h2",
        content: "Table B — $40,000 spending → FIRE $1,000,000",
      },
      {
        type: "ul",
        content: [
          "Age 30: ~$181k @ 5% · ~$247k @ 4%",
          "Age 35: ~$231k @ 5% · ~$300k @ 4%",
          "Age 40: ~$295k @ 5% · ~$365k @ 4%",
          "Age 45: ~$377k @ 5% · ~$456k @ 4%",
          "Age 50: ~$481k @ 5% · ~$555k @ 4%",
        ],
      },
      {
        type: "h2",
        content: "Table C — $100,000 spending → FIRE $2,500,000",
      },
      {
        type: "ul",
        content: [
          "Age 30: ~$453k @ 5% · ~$617k @ 4%",
          "Age 35: ~$578k @ 5% · ~$750k @ 4%",
          "Age 40: ~$738k @ 5% · ~$912k @ 4%",
          "Age 45: ~$942k @ 5% · ~$1.14M @ 4%",
          "Age 50: ~$1.20M @ 5% · ~$1.39M @ 4%",
        ],
      },
      {
        type: "h2",
        content: "How to read these without fooling yourself",
      },
      {
        type: "ul",
        content: [
          "Coast is not early retirement. You still need income for spending until traditional retirement age (or you switch to a different plan).",
          "Lower r always raises the coast bar — if only 5% “works,” the plan is fragile.",
          "If spending rises, every cell in the table scales up with FIRE.",
          "Sequence risk is not in the table. Use the free stress test on the Coast calculator for dispersion of terminal wealth.",
        ],
      },
      {
        type: "h2",
        content: "Worked example — age 35, $60k lifestyle",
      },
      {
        type: "p",
        content:
          "Full FIRE at 4% is $1.5M. With 30 years to age 65 and 5% real, coast ≈ $347k. At 4% real, coast ≈ $450k. If you hold $300k today, you are short on both columns — more savings, lower spending, or a longer horizon closes the gap. If you hold $500k, the constant-return model says you are past coast at 5% real, but you should still keep emergency funds and healthcare planned separately.",
      },
      {
        type: "h2",
        content: "Build your own live table",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator, set spending, withdrawal rate, and retirement age. The interactive age table updates from shared assumptions and can be exported as CSV. Compare Barista FIRE if your question is semi-retirement cash flow rather than stopping contributions. Methodology documents formulas; Approach documents limits.",
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice.",
      },
    ],
  },
  {
    slug: "why-simple-fire-calculators-fail",
    title: "Why most simple FIRE calculators fail long-term planners",
    description:
      "Constant returns, missing sequence risk, taxes, and lifestyle — what simple FIRE math gets right, what it quietly omits, and how to use tools without false confidence.",
    date: "2026-07-16",
    readingMinutes: 11,
    tags: ["basics", "sequence-risk", "methodology"],
    body: [
      {
        type: "p",
        content:
          "Simple FIRE calculators are not scams. Most of them implement clear formulas: spending ÷ withdrawal rate, compound growth with constant contributions, a Coast discount, a Barista gap. The failure mode is subtler: long-term planners treat a single smooth path as a plan, then discover markets, taxes, and life do not follow the chart.",
      },
      {
        type: "h2",
        content: "What simple calculators get right",
      },
      {
        type: "ul",
        content: [
          "They force you to name spending, savings, and a withdrawal rate.",
          "They show leverage: savings rate often moves the timeline more than optimistic return assumptions.",
          "They make Coast vs full FIRE vs Barista distinctions computable.",
          "When formulas are published, you can audit the math in minutes.",
        ],
      },
      {
        type: "h2",
        content: "Failure mode 1: constant returns as destiny",
      },
      {
        type: "p",
        content:
          "A 5% real return every year is an illustration, not a forecast. Two sequences with the same average return can leave very different portfolios — especially if you withdraw, but also if you stop contributing after “hitting Coast” with no cushion. Sequence of returns is the order problem: bad years early hurt more when cash flows are fragile.",
      },
      {
        type: "h2",
        content: "Failure mode 2: one withdrawal rate forever",
      },
      {
        type: "p",
        content:
          "The 4% starting point is research history, not a warranty. Early retirement horizons (40–50+ years), high equity concentration, inflexible spending, and concentrated human-capital risk all argue for stress-testing lower rates (3–3.5%) or flexible spending rules. A calculator that only highlights 4% invites overconfidence.",
      },
      {
        type: "h2",
        content: "Failure mode 3: taxes, fees, and account plumbing",
      },
      {
        type: "ul",
        content: [
          "Effective withdrawal rates after tax differ from pre-tax spreadsheet rates.",
          "Fees compound against you silently.",
          "401(k)/IRA/taxable withdrawal order changes longevity in ways a single “portfolio” box cannot see.",
        ],
      },
      {
        type: "h2",
        content: "Failure mode 4: lifestyle and optionality",
      },
      {
        type: "p",
        content:
          "Healthcare cliffs, housing, kids, career shocks, and lifestyle creep can dominate the gap between a pretty chart and a durable plan. Semi-retirement income is rarely a flat annuity. Coast FIRE is not early retirement. If the tool’s copy does not say that, the user often invents a friendlier story.",
      },
      {
        type: "h2",
        content: "How to use simple tools without lying to yourself",
      },
      {
        type: "ul",
        content: [
          "Run ranges: lower r, lower SWR, higher spending.",
          "Prefer surplus cushions over exact “I hit the number today” narratives.",
          "Separate emergency funds and healthcare from the FIRE multiple.",
          "Use a sequence stress test (even a simple Monte Carlo) to see dispersion — not to claim a true probability of life success.",
          "Read what the model omits before you change jobs or savings rate.",
        ],
      },
      {
        type: "h2",
        content: "How RetireFire is designed around this",
      },
      {
        type: "p",
        content:
          "We keep deterministic calculators primary and transparent. Shared assumptions sync across FIRE number, years, Coast, and Barista. Share links and CSV export keep scenarios honest offline. Coast and Years include a free basic stress test (1,000 paths, fixed volatility presets) with success rate and percentile terminals — labeled as educational, not prophecy. Methodology and Approach pages list formulas and limits in plain language.",
      },
      {
        type: "p",
        content:
          "Educational only — not financial advice. Tools inform judgment; they do not replace it. See the disclaimer.",
      },
    ],
  },
  {
    slug: "realistic-fire-numbers-2026",
    title: "Realistic FIRE numbers in 2026 (with stress-test context)",
    description:
      "Worked FIRE, Coast, and Barista numbers for common spending levels in 2026 — plus how lower SWR and sequence stress tests change the story.",
    date: "2026-07-16",
    readingMinutes: 12,
    tags: ["fire-number", "coast-fire", "2026"],
    body: [
      {
        type: "p",
        content:
          "“What’s a realistic FIRE number in 2026?” is really three questions: how much do you spend, what withdrawal rate are you willing to plan with, and how much path risk can you tolerate? Below are transparent worked examples — not benchmarks you must match, and not advice.",
      },
      {
        type: "h2",
        content: "Full FIRE at common spending levels (4% and 3.5%)",
      },
      {
        type: "ul",
        content: [
          "$40k spend → $1.0M at 4% · ~$1.14M at 3.5%",
          "$60k spend → $1.5M at 4% · ~$1.71M at 3.5%",
          "$80k spend → $2.0M at 4% · ~$2.29M at 3.5%",
          "$100k spend → $2.5M at 4% · ~$2.86M at 3.5%",
        ],
      },
      {
        type: "p",
        content:
          "The jump from 4% to 3.5% is large in dollars because the multiplier moves from 25× to about 28.6×. Early retirees often explore that band precisely because horizons are long and sequence risk is less forgiving.",
      },
      {
        type: "h2",
        content: "Coast examples (age 35 → 65, 5% real)",
      },
      {
        type: "ul",
        content: [
          "Full FIRE $1.5M → coast ≈ $1.5M ÷ (1.05)^30 ≈ $347k",
          "Full FIRE $2.0M → coast ≈ $463k",
          "Same $1.5M target at 4% real → coast ≈ $462k (lower r raises today’s bar)",
        ],
      },
      {
        type: "p",
        content:
          "Coast numbers look “small” next to full FIRE because they are not funding early retirement spending from the portfolio. They only ask whether growth may finish the nest egg by a traditional retirement age if contributions stop.",
      },
      {
        type: "h2",
        content: "Barista examples ($60k spend, 4% SWR)",
      },
      {
        type: "ul",
        content: [
          "$0 work income → $1.5M (full FIRE)",
          "$15k work income → gap $45k → $1.125M",
          "$25k work income → gap $35k → $875k",
          "$40k work income → gap $20k → $500k",
        ],
      },
      {
        type: "p",
        content:
          "Barista math only helps if the work income is realistic after taxes, benefits cliffs, and dry spells. Semi-retirement is a cash-flow design, not a slogan.",
      },
      {
        type: "h2",
        content: "Add stress-test context",
      },
      {
        type: "p",
        content:
          "A constant 5% real path to a $1.5M target can look tidy while a 1,000-path stress test with 15% volatility shows a wide band of terminal wealth. Success rate is the share of simulated paths that finish at or above target under the toy model — not the probability that your life works out. Use it to see whether you need more surplus, more savings years, or a lower lifestyle assumption.",
      },
      {
        type: "h2",
        content: "A 2026 planning checklist",
      },
      {
        type: "ul",
        content: [
          "Write annual spending in today’s dollars (include healthcare realistically).",
          "Compute FIRE at 3%, 3.5%, and 4%.",
          "Compute Coast with 4% and 5% real over your true horizon.",
          "If semi-retiring, stress work income at 50% of the hopeful number.",
          "Run the free sequence stress test on Coast/Years and note p10 vs median.",
          "Export CSV or share the URL so a partner sees the same assumptions.",
        ],
      },
      {
        type: "h2",
        content: "Run the numbers",
      },
      {
        type: "p",
        content:
          "Use the free FIRE Number, Years to FIRE, Coast FIRE, and Barista FIRE calculators on RetireFire with shared assumptions. Read Methodology for formulas and the stress-test model. Educational only — not advice.",
      },
    ],
  },
  {
    slug: "coast-fire-sequence-of-returns-risk",
    title: "Coast FIRE with sequence of returns risk",
    description:
      "Why a single Coast FIRE number can look safe under constant returns — and how sequence risk, lower return assumptions, and stress testing change the picture.",
    date: "2026-07-15",
    readingMinutes: 12,
    tags: ["coast-fire", "sequence-risk", "stress-test"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE answers a focused question: do you already have enough invested that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age under an assumed real return? The classic answer is a single discounted number. That number is useful — and incomplete — because it usually assumes a smooth return every year.",
      },
      {
        type: "h2",
        content: "The coast formula (and what it hides)",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n: coast number ≈ T ÷ (1+r)^n. Example: T = $1,500,000, r = 5%, n = 20 → coast ≈ $565,000. Under those assumptions, holding roughly that amount today and never contributing again is modeled as “enough” for full FIRE by the horizon age.",
      },
      {
        type: "p",
        content:
          "What the formula hides: markets do not deliver 5% real every calendar year. Some decades are friendly; some open with long drawdowns. Sequence of returns risk is the idea that the order of good and bad years matters — especially when you later withdraw, but also when you treat a point estimate as a green light to change savings behavior.",
      },
      {
        type: "h2",
        content: "Stress-test the return before you celebrate",
      },
      {
        type: "ul",
        content: [
          "Same $1.5M target, 20-year horizon, 5% real → coast ≈ $565k",
          "Same target and horizon, 4% real → coast ≈ $684k",
          "Same target and horizon, 3% real → coast ≈ $831k",
        ],
      },
      {
        type: "p",
        content:
          "Lowering r is a crude but honest stress test available in any transparent calculator. If only the optimistic r “works,” the plan is fragile. Early “coasters” who also reduce savings and increase lifestyle stack multiple risks: lower future contributions, higher spending (higher T), and path-dependent markets.",
      },
      {
        type: "h2",
        content: "Coast FIRE is not early retirement",
      },
      {
        type: "ul",
        content: [
          "You may still need earned income for decades of spending before traditional retirement age.",
          "Healthcare, housing, and career optionality are outside the discount formula.",
          "Hitting coast does not immunize you against a bad decade if you later switch to full withdrawals early.",
        ],
      },
      {
        type: "h2",
        content: "What simple calculators get right — and wrong",
      },
      {
        type: "p",
        content:
          "Simple models get the discount math right and keep assumptions visible. They get long-term decision quality wrong when users treat constant r as a forecast, ignore sequence risk, or skip taxes and fees. Historical cycle tools and Monte Carlo stress tests address path risk with different trade-offs: history is path-rich but not a crystal ball; Monte Carlo is flexible but depends on the return distribution you assume.",
      },
      {
        type: "h2",
        content: "A practical checklist",
      },
      {
        type: "ul",
        content: [
          "Run coast at 3%, 4%, and 5% real with the same spending and SWR.",
          "Recompute full FIRE at 3–4% SWR; early horizons often warrant lower SWR.",
          "Keep an emergency fund and healthcare plan separate from the coast number.",
          "If you stop contributing, track whether lifestyle creep raises T faster than markets help.",
          "Prefer ranges and surplus cushions over exact “I hit coast today” narratives.",
        ],
      },
      {
        type: "h2",
        content: "How to use RetireFire",
      },
      {
        type: "p",
        content:
          "Open the Coast FIRE calculator, set your spending, portfolio, ages, withdrawal rate, and real return. Copy a share link or export CSV for your notes. Compare with full FIRE and Barista FIRE under the same shared assumptions. Read Methodology for formulas and Our Approach for what we deliberately omit — including the upcoming transparent stress-test mode.",
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial advice. Past returns do not guarantee future results. See the disclaimer before making decisions.",
      },
    ],
  },
  {
    slug: "barista-fire-vs-coast-fire",
    title: "Barista FIRE vs Coast FIRE: a data-driven comparison",
    description:
      "Same spending, different questions: stopping contributions (Coast) versus covering part of spend with work income (Barista). Formulas, tables, and when each frame helps.",
    date: "2026-07-15",
    readingMinutes: 11,
    tags: ["barista-fire", "coast-fire", "comparison"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE and Barista FIRE are often mixed up in headlines. Both can lower pressure versus classic full FIRE, but they answer different planning questions. Confusing them produces the wrong savings target and the wrong lifestyle story.",
      },
      {
        type: "h2",
        content: "Definitions that actually compute",
      },
      {
        type: "ul",
        content: [
          "Full FIRE number ≈ annual spending ÷ withdrawal rate (e.g. $60k ÷ 4% = $1.5M).",
          "Coast number ≈ full FIRE ÷ (1+r)^years until traditional retirement age — portfolio that may grow to full FIRE with zero future contributions.",
          "Barista number ≈ max(0, spending − work income) ÷ withdrawal rate — portfolio that funds only the gap while work covers the rest.",
        ],
      },
      {
        type: "h2",
        content: "Worked comparison at $60k spending, 4% SWR, 5% real",
      },
      {
        type: "ul",
        content: [
          "Full FIRE: $1,500,000",
          "Coast (age 35 → 65, 30 years): coast ≈ $1,500,000 ÷ (1.05)^30 ≈ $347,000",
          "Barista ($20k work income): gap $40k → barista number $1,000,000",
          "Barista ($30k work income): gap $30k → barista number $750,000",
        ],
      },
      {
        type: "p",
        content:
          "Notice the intuition trap: Coast can show a much smaller number than Barista because Coast is not funding early retirement spending from the portfolio — it is only asking whether growth can finish the nest egg by a later age while you still cover life with earnings. Barista is about semi-retirement cash flow now.",
      },
      {
        type: "h2",
        content: "When Coast is the better frame",
      },
      {
        type: "ul",
        content: [
          "You still plan to work (full- or part-time) for many years.",
          "You want permission to reduce savings rate or career intensity without claiming early retirement.",
          "Your question is “can compounding finish the job?” not “can I live on withdrawals + side income this year?”",
        ],
      },
      {
        type: "h2",
        content: "When Barista is the better frame",
      },
      {
        type: "ul",
        content: [
          "You want a near-term semi-retirement lifestyle with intentional work income.",
          "Benefits, structure, or purpose from work matter as much as the math.",
          "You need a portfolio target that funds a spending gap, not a distant full FIRE discount.",
        ],
      },
      {
        type: "h2",
        content: "Shared risks (do not skip)",
      },
      {
        type: "ul",
        content: [
          "Work income can be uneven; benefits can cliff.",
          "Sequence risk still matters if you withdraw from the portfolio.",
          "Taxes, healthcare, and housing can dominate spreadsheet gaps.",
          "Lifestyle creep can erase both Coast surplus and Barista gap math.",
        ],
      },
      {
        type: "h2",
        content: "How to compare on RetireFire",
      },
      {
        type: "p",
        content:
          "Set one spending level and withdrawal rate in shared assumptions. Read Coast FIRE and Barista FIRE side by side. Export CSV or copy a share link so a partner sees the same scenario. Stress-test by lowering r and SWR. Methodology documents formulas; Our Approach documents limits and the roadmap for explicit stress tests.",
      },
      {
        type: "p",
        content:
          "Educational only — not advice. Use professionals for personal decisions.",
      },
    ],
  },
  {
    slug: "safe-withdrawal-rate-3-vs-4-percent",
    title: "Safe withdrawal rate: 3% vs 3.5% vs 4% (early retirement deep dive)",
    description:
      "SWR for FIRE and early retirees: research lineage of 4%, why 3–3.5% is common for long horizons, worked multiples, flexibility rules, and how to stress-test without false precision.",
    date: "2026-07-14",
    readingMinutes: 12,
    tags: ["swr", "fire-number", "sequence-risk"],
    body: [
      {
        type: "p",
        content:
          "A safe withdrawal rate (SWR) is the percentage of your portfolio you plan to spend in year one of retirement, often adjusted for inflation afterward. Combined with annual spending, it sets your FIRE number: spending ÷ withdrawal rate. For early retirees, that single dial can move the finish line by hundreds of thousands of dollars — and it still does not capture taxes, fees, or sequence risk by itself.",
      },
      {
        type: "h2",
        content: "Where 4% comes from (and what it is not)",
      },
      {
        type: "p",
        content:
          "The classic 4% starting point is associated with William Bengen’s research and the Trinity Study lineage on historical U.S. stock/bond portfolios. It is a research-based rule of thumb for multi-decade retirements under historical market paths — not a warranty that global markets, valuations, or your personal spending will behave the same way for the next 30–50 years. “4% worked in many past U.S. samples” is not the same as “4% is safe for you.”",
      },
      {
        type: "h2",
        content: "Why early retirees often plan at 3–3.5%",
      },
      {
        type: "ul",
        content: [
          "Longer horizon: retiring at 40 can mean 45–55+ years of withdrawals vs a classic 30-year study window.",
          "Sequence-of-returns risk: poor markets early hurt more when you cannot easily return to peak earnings.",
          "Less flexibility if identity and budget are rigid (“I already retired”).",
          "Higher equity concentration and valuation risk than mid-century samples assumed.",
          "Healthcare and family shocks can force higher spending exactly when markets are down.",
        ],
      },
      {
        type: "h2",
        content: "Multiples table (portfolio ÷ annual spending)",
      },
      {
        type: "ul",
        content: [
          "4.0% SWR → 25× spending",
          "3.5% SWR → ≈ 28.6× spending",
          "3.0% SWR → ≈ 33.3× spending",
          "2.5% SWR → 40× spending (very conservative / large buffer illustrations)",
        ],
      },
      {
        type: "h2",
        content: "Worked comparison at $60,000 spending",
      },
      {
        type: "ul",
        content: [
          "4.0% → FIRE number $1,500,000",
          "3.5% → FIRE number about $1,714,000",
          "3.0% → FIRE number $2,000,000",
        ],
      },
      {
        type: "p",
        content:
          "That is a $500,000 spread between 4% and 3% for the same lifestyle. Scale it: at $100k spend (Fat-style preset), the same rates imply $2.5M / ≈ $2.86M / ≈ $3.33M. The “right” rate depends on flexibility to cut spending, other income (Social Security later, pensions, Barista work), asset allocation, and risk tolerance — none of which a single percentage captures perfectly.",
      },
      {
        type: "h2",
        content: "Horizon intuition (not a formula guarantee)",
      },
      {
        type: "ul",
        content: [
          "≈30-year traditional retirement windows: 4% is the common historical starting conversation.",
          "40–50+ year early retirement windows: many planners stress 3–3.5% or flexible spending rules.",
          "Very long horizons with no cut flexibility: lower starting rates or larger cash buffers often appear in stress discussions.",
          "Always re-check with your actual spend — including healthcare — not a blog example.",
        ],
      },
      {
        type: "h2",
        content: "Fixed SWR vs flexible spending (concept)",
      },
      {
        type: "p",
        content:
          "A fixed inflation-adjusted withdrawal is easy to model and hard to live when markets crash. Flexible approaches (cut discretionary spend after bad years, raise after good years, guardrails) can improve sustainability in research discussions — but they require behavior you will actually execute. Calculators that only show a constant SWR hide that behavioral requirement.",
      },
      {
        type: "h2",
        content: "What SWR does not include",
      },
      {
        type: "ul",
        content: [
          "Taxes and account withdrawal ordering",
          "Investment fees and advisory costs",
          "Sequence risk explicitly (use stress tests / historical tools)",
          "Healthcare cliffs and long-term care",
          "Legacy goals or large one-time expenses",
        ],
      },
      {
        type: "h2",
        content: "How to use SWR in RetireFire",
      },
      {
        type: "ul",
        content: [
          "Treat SWR as a dial: run FIRE number at 3%, 3.5%, and 4% every time.",
          "If only the optimistic case “works,” the plan is fragile — say so.",
          "Pair with Years to FIRE (finish line moves when SWR drops).",
          "Coast and Barista inherit the same SWR via shared assumptions — keep them consistent.",
          "Sensitivity chips and Scenario compare make A/B honest.",
          "Accumulation stress tests (Coast/Years) are not full retirement withdrawal backtests; read Monte Carlo vs historical cycles.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Is 4% dead? No — it remains a historical reference. It is not a personal guarantee.",
          "Is 3% always safer? It buys more buffer for the same spend, at the cost of more capital or lower lifestyle.",
          "Should I change SWR every year? Planning rate vs actual annual spend decision can differ; this site models the planning dial.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial advice. See Methodology for formula notes, the sequence-risk guide for path concepts, Lean/Regular/Fat tables for 2026 presets, and the disclaimer before decisions.",
      },
    ],
  },
  {
    slug: "how-many-years-until-fire",
    title: "How many years until FIRE?",
    description:
      "The levers that move your timeline to financial independence: savings rate, spending, portfolio, and return assumptions — plus links to deeper lever analysis and stress tests.",
    date: "2026-07-13",
    readingMinutes: 8,
    tags: ["years-to-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "“Years to FIRE” is the planning question after you know a target nest egg: given what you have, what you save, and what you assume markets return (in real terms), how long might it take to reach financial independence?",
      },
      {
        type: "h2",
        content: "The four main levers",
      },
      {
        type: "ul",
        content: [
          "Current invested portfolio — starting capital compounds.",
          "Annual savings (or savings rate) — usually the lever you control most.",
          "FIRE target — driven by spending and withdrawal rate.",
          "Expected real return — powerful, but easiest to over-assume.",
        ],
      },
      {
        type: "h2",
        content: "Why savings rate dominates",
      },
      {
        type: "p",
        content:
          "Raising savings often does double duty: more money invested each year and, if spending falls, a lower FIRE number. Assuming a higher return shortens the timeline on a spreadsheet but does not put cash in your brokerage account. Conservative planners stress-test lower returns rather than banking on bull markets. For a ranked lever deep-dive with Scenario compare workflow, see “Years to FIRE: which lever moves the needle most?”",
      },
      {
        type: "h2",
        content: "A worked sketch",
      },
      {
        type: "p",
        content:
          "Imagine $200,000 invested, $40,000 saved per year, a $1,500,000 target ($60k spend at 4%), and a 5% real return. A constant-return model will show a multi-year path with a growth chart. Change only the savings amount or only the return to see which move changes the finish line more for your situation.",
      },
      {
        type: "h2",
        content: "What the model leaves out",
      },
      {
        type: "ul",
        content: [
          "Market volatility and sequence risk",
          "Career interruptions, raises, and windfalls",
          "Taxes, fees, and account-type constraints",
          "Lifestyle changes as you approach FI",
        ],
      },
      {
        type: "p",
        content:
          "Use the free Years to FIRE calculator for an interactive timeline, Scenario compare to pin lever experiments, and the free stress test on Years for path dispersion around a smooth date. Cross-check the target with the FIRE Number tool and Methodology notes. Educational only.",
      },
    ],
  },
  {
    slug: "coast-fire-number-formula-examples",
    title: "Coast FIRE number: formula and examples",
    description:
      "How to calculate a Coast FI number, with a clear discount formula and numeric examples you can re-run in the calculator.",
    date: "2026-07-12",
    readingMinutes: 7,
    tags: ["coast-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "Your Coast FIRE number is the portfolio you need today so that, with no further contributions, compound growth may reach full FIRE by a traditional retirement age under an assumed real return.",
      },
      {
        type: "h2",
        content: "The discount formula",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n: coast number ≈ T ÷ (1+r)^n. You are discounting the future target back to today.",
      },
      {
        type: "h2",
        content: "Example A — 20-year runway",
      },
      {
        type: "p",
        content:
          "Full FIRE $1,500,000, r = 5%, n = 20. Coast number ≈ $1,500,000 ÷ (1.05)^20 ≈ $565,000. With roughly that amount invested today (under those assumptions), the model says growth alone could finish the job by traditional retirement age.",
      },
      {
        type: "h2",
        content: "Example B — shorter runway",
      },
      {
        type: "p",
        content:
          "Same $1,500,000 target and 5% real return, but only 10 years left: coast ≈ $1,500,000 ÷ (1.05)^10 ≈ $921,000. Less time means less help from compounding, so you need more capital today.",
      },
      {
        type: "h2",
        content: "Stress-test the return",
      },
      {
        type: "p",
        content:
          "At 4% real over 20 years, coast ≈ $1,500,000 ÷ (1.04)^20 ≈ $684,000. Lower assumed growth raises the coast number. When in doubt, use a more conservative r rather than a heroic one.",
      },
      {
        type: "h2",
        content: "What Coast FIRE is not",
      },
      {
        type: "ul",
        content: [
          "Not early retirement by itself",
          "Not a substitute for an emergency fund or healthcare plan",
          "Not a guarantee of constant real returns",
        ],
      },
      {
        type: "p",
        content:
          "Run your own numbers in the Coast FIRE calculator (age table + free sequence stress test), walk the Coast checklist, compare full FIRE and Barista, and read Methodology for model details. Guides: how to stress-test Coast, when can you stop saving. Educational only.",
      },
    ],
  },
  {
    slug: "barista-fire-number-formula-examples",
    title: "Barista FIRE number: formula and examples",
    description:
      "How part-time income shrinks the portfolio you need — with clear semi-retirement math and examples.",
    date: "2026-07-11",
    readingMinutes: 6,
    tags: ["barista-fire", "semi-retirement"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE (semi-retirement) means intentional work income covers part of your spending so your portfolio only funds the gap. The barista number is usually smaller than full FIRE — if the work income is realistic.",
      },
      {
        type: "h2",
        content: "The formula",
      },
      {
        type: "p",
        content:
          "Gap expenses = max(0, annual spending − work income). Barista number = gap expenses ÷ withdrawal rate. At 4%, that is gap × 25.",
      },
      {
        type: "h2",
        content: "Example — $20k part-time income",
      },
      {
        type: "p",
        content:
          "Spend $60,000, earn $20,000 part-time, use 4% SWR. Gap = $40,000. Barista number = $40,000 ÷ 0.04 = $1,000,000. Full FIRE at the same spend would be $1,500,000 — a $500,000 difference.",
      },
      {
        type: "h2",
        content: "Example — lower SWR",
      },
      {
        type: "p",
        content:
          "Same $40,000 gap at 3.5% SWR: barista number ≈ $1,143,000. More conservative withdrawals still need a larger portfolio even when work income helps.",
      },
      {
        type: "h2",
        content: "Practical caveats",
      },
      {
        type: "ul",
        content: [
          "Income can be uneven; plan for dry spells.",
          "Benefits cliffs (healthcare, employer perks) can change the math overnight.",
          "Self-employment taxes and expenses reduce “take-home” work income.",
          "Spending sometimes rises when you have more free time.",
        ],
      },
      {
        type: "p",
        content:
          "Use the Barista FIRE calculator to dial income and spending, then compare Coast FIRE if your question is about stopping contributions rather than partial work in retirement.",
      },
    ],
  },
  {
    slug: "barista-fire-and-semi-retirement",
    title: "Barista FIRE and semi-retirement",
    description:
      "How part-time income changes the portfolio you need, why people choose semi-retirement, model limits, and where to go deeper on math and healthcare cliffs.",
    date: "2026-07-10",
    readingMinutes: 8,
    tags: ["barista-fire", "semi-retirement"],
    body: [
      {
        type: "p",
        content:
          "Barista FIRE (sometimes called semi-retirement) blends portfolio withdrawals with intentional work income. The portfolio only needs to cover the spending gap: max(0, expenses − work income) ÷ withdrawal rate.",
      },
      {
        type: "h2",
        content: "Why people choose it",
      },
      {
        type: "ul",
        content: [
          "Lower savings target than full FIRE.",
          "Structure, community, or health benefits from light work.",
          "Bridge years before Social Security or Medicare eligibility.",
          "Identity: not “never work,” but “work on purpose.”",
        ],
      },
      {
        type: "h2",
        content: "Quick numeric sketch",
      },
      {
        type: "p",
        content:
          "Spend $60k, earn $25k part-time, gap $35k. At 4% SWR the barista pile is $875k vs $1.5M full FIRE. At 3.5% those become ≈ $1.0M vs ≈ $1.71M. The gap formula is linear; life is not — healthcare and hours cliffs can erase the paper savings.",
      },
      {
        type: "h2",
        content: "Barista vs Coast (do not mix them)",
      },
      {
        type: "ul",
        content: [
          "Coast: still cover full lifestyle with work; stop aggressive retirement contributions if the pile can compound to full FIRE by traditional age.",
          "Barista: cut hours or change work; portfolio must fund part of spending now.",
          "See the Barista vs Coast comparison pillar and the semi-retirement math deep dive for tables.",
        ],
      },
      {
        type: "h2",
        content: "Model limitations",
      },
      {
        type: "ul",
        content: [
          "Job reliability and income volatility",
          "Benefit and healthcare cliffs",
          "Self-employment taxes and irregular cash flow",
          "Spending changes when free time rises",
          "Sequence risk on the remaining portfolio withdrawals",
        ],
      },
      {
        type: "p",
        content:
          "Treat Barista FIRE numbers as a planning conversation starter, not a paycheck replacement plan. For worked tables and scenario workflow, read “Semi-retirement math: portfolio + part-time income.” For coverage traps, read the healthcare & benefits cliffs guide.",
      },
      {
        type: "p",
        content:
          "Try the free Barista FIRE calculator, compare full FIRE and Coast with shared assumptions, and export CSV if you want an offline record. Educational only.",
      },
    ],
  },
  {
    slug: "coast-fire-explained",
    title: "Coast FIRE explained",
    description:
      "Why “coasting” is about stopping aggressive saving — not retiring tomorrow.",
    date: "2026-07-05",
    readingMinutes: 6,
    tags: ["coast-fire", "basics"],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE answers a different question than classic FIRE. Instead of “Can I quit forever today?”, it asks: “Do I already have enough invested that compound growth can reach my full FIRE number by a traditional retirement age — even if I never invest another dollar?”",
      },
      {
        type: "h2",
        content: "The discount formula",
      },
      {
        type: "p",
        content:
          "If full FIRE is T, real return is r, and years until traditional retirement is n, then coast number ≈ T ÷ (1+r)^n. The longer the runway and the higher the assumed return, the smaller the nest egg you need today.",
      },
      {
        type: "h2",
        content: "What Coast FIRE is not",
      },
      {
        type: "ul",
        content: [
          "Not permission to ignore healthcare or emergency funds.",
          "Not a guarantee markets will deliver a constant real return.",
          "Not early retirement — many “coasters” still work for lifestyle, purpose, or benefits.",
        ],
      },
      {
        type: "p",
        content:
          "Use the Coast FIRE calculator to compare shortfall vs surplus under conservative returns, run the free sequence stress test for ranges, and walk the Coast assumptions checklist before you change savings behavior. When in doubt, lower r and extend your horizon. Deeper: when can you stop saving, how to stress-test your Coast number, and Coast by age tables. Educational only.",
      },
    ],
  },
  {
    slug: "what-is-a-fire-number",
    title: "What is a FIRE number?",
    description:
      "A plain-English guide to the portfolio multiple that underpins Lean, Regular, and Fat FIRE.",
    date: "2026-07-01",
    readingMinutes: 5,
    tags: ["basics", "fire-number"],
    body: [
      {
        type: "p",
        content:
          "Your FIRE number is the size of the invested portfolio that can support a chosen lifestyle without relying on a traditional paycheck. The classic starting formula is simple: annual spending divided by a safe withdrawal rate.",
      },
      {
        type: "h2",
        content: "The 25× rule of thumb",
      },
      {
        type: "p",
        content:
          "At a 4% withdrawal rate, you need 25 times annual spending (because 1 ÷ 0.04 = 25). Spending $60,000 per year implies a $1.5 million FIRE number. Lower withdrawal rates (3–3.5%) mean larger multiples and more buffer for long early-retirement horizons.",
      },
      {
        type: "h2",
        content: "Lean, Regular, and Fat",
      },
      {
        type: "ul",
        content: [
          "Lean FIRE: lower spending target; frugal but intentional lifestyle.",
          "Regular FIRE: middle-class comfort in retirement spending.",
          "Fat FIRE: higher discretionary spending — travel, housing, hobbies.",
        ],
      },
      {
        type: "p",
        content:
          "These labels are not academic categories. Use them as presets, then replace them with your actual budget. Taxes, healthcare, and housing choices matter more than the nickname.",
      },
      {
        type: "p",
        content:
          "Try the free FIRE Number calculator, compare Lean/Regular/Fat 2026 tables, and stress withdrawal rates with the SWR deep dive. Pair with Years, Coast, and Barista under shared assumptions. Methodology and Approach explain formulas and free-core limits. Educational only.",
      },
    ],
  },
  {
    slug: "mini-retirement-fire-plan",
    title: "Mini-retirement math: take a career break without derailing FIRE",
    description:
      "Price a 3–12 month mini-retirement, measure the true FIRE delay, protect the downside, and decide whether using some freedom now is worth it.",
    date: "2026-07-28",
    dateModified: "2026-07-29",
    readingMinutes: 11,
    tags: ["years-to-fire", "coast-fire", "barista-fire", "semi-retirement"],
    sources: [
      {
        label: "Fidelity Investments — 2026 State of Retirement Planning Study",
        href: "https://newsroom.fidelity.com/pressreleases/fidelity-investments--study--72--of-americans-say-they-will-retire-on-their-own-terms-as-they-embrac/s/609fbcb7-3ea5-4773-a300-0659da881d2a",
      },
      {
        label: "Journal of Accountancy — Beyond FIRE: Planning for mini-retirements",
        href: "https://www.journalofaccountancy.com/newsletters/pfp-digest/beyond-fire-planning-for-mini-retirements/",
      },
      {
        label: "RetireFire methodology",
        href: "/methodology",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "Traditional retirement asks you to save your freedom for the end. A mini-retirement asks a better question: can you afford to use some of it now?",
      },
      {
        type: "p",
        content:
          "That question is moving into the mainstream. Fidelity’s 2026 retirement study found that nearly 7 in 10 Americans are considering a nontraditional retirement path, while 61% expect to transition into retirement rather than stop work on a single date. The Journal of Accountancy has also highlighted growing interest in midcareer breaks that spread leisure and earning years across a lifetime.",
      },
      {
        type: "p",
        content:
          "The appeal is obvious. A three-, six-, or twelve-month break can buy time with young children, a long trip while your knees still cooperate, recovery from burnout, or space to test a different kind of work. The risk is also obvious: a break costs more than the money you spend. Here is how to price one without pretending the answer is more precise than it is.",
      },
      {
        type: "h2",
        content: "The real cost has four parts",
      },
      {
        type: "p",
        content:
          "Most people budget for flights, rent, and food. That is only the first line. Use this identity: true break cost = extra spending + lost take-home pay + lost employer benefits + lost investment growth.",
      },
      {
        type: "h2",
        content: "1. Extra spending",
      },
      {
        type: "p",
        content:
          "Count only costs above your normal baseline. If you normally spend $5,000 a month and expect to spend $6,500 while traveling, the break adds $1,500 a month — not $6,500.",
      },
      {
        type: "ul",
        content: [
          "Add travel, temporary housing, storage, visas, insurance, transportation, and higher dining or activity costs.",
          "Add the cost of a home left vacant or a lease you cannot exit.",
          "Add re-entry expenses such as a deposit, moving costs, or a replacement car.",
          "Subtract costs that disappear: commuting, childcare, work clothes, and other job-linked spending.",
        ],
      },
      {
        type: "h2",
        content: "2. Lost take-home pay",
      },
      {
        type: "p",
        content:
          "Use take-home pay, not salary. If your salary is $120,000 but your bank account receives $7,000 a month after taxes and deductions, a six-month break removes roughly $42,000 of cash flow — not $60,000.",
      },
      {
        type: "p",
        content:
          "Do not count retirement contributions twice. If a 401(k) contribution reduced the paycheck you used above, capture that missed saving separately when you model your FIRE date.",
      },
      {
        type: "h2",
        content: "3. Lost employer benefits",
      },
      {
        type: "p",
        content:
          "Price the benefits you must replace, not the number printed on your total-compensation statement. Health coverage deserves its own quote before you resign. “I’ll use the marketplace” is not a price.",
      },
      {
        type: "ul",
        content: [
          "Health insurance premiums and expected out-of-pocket costs.",
          "Lost 401(k) match, HSA contributions, or equity vesting.",
          "Disability and life insurance you still need.",
          "A bonus tied to a specific employment date.",
        ],
      },
      {
        type: "h2",
        content: "4. Lost investment growth",
      },
      {
        type: "p",
        content:
          "Money spent today cannot compound tomorrow. But avoid the internet’s favorite exaggeration: projecting every vacation dollar at a high return for 40 years and calling the result its “real cost.” Use the same real-return assumption as your FIRE plan. RetireFire defaults to 5% real as an educational planning assumption, not a forecast.",
      },
      {
        type: "p",
        content:
          "If a break consumes $40,000 that would otherwise remain invested, its projected value in 20 years at 5% real is about $106,000 in today’s dollars: $40,000 × 1.05²⁰. That is useful context, not a bill. The break also creates value, and not every valuable experience can be postponed without loss.",
      },
      {
        type: "h2",
        content: "The number that matters: FIRE delay",
      },
      {
        type: "p",
        content:
          "“This costs $40,000” is emotionally loud and strategically incomplete. The more useful question is: how many months does this move my likely FI date?",
      },
      {
        type: "ul",
        content: [
          "Scenario A — keep working: current portfolio, normal annual contribution, current spending, chosen withdrawal rate, and a conservative real-return assumption.",
          "Scenario B — take the break: subtract portfolio money used, reduce this year’s contribution for missed saving and match, and add any lasting spending change.",
          "Keep every other assumption identical. The gap between the two Years to FIRE results is your estimated delay.",
          "Do not punish the break scenario with a crash while giving the work scenario a smooth 8% return. Stress-test both under the same assumptions.",
        ],
      },
      {
        type: "h2",
        content: "Worked example: the funding source changes the answer",
      },
      {
        type: "p",
        content:
          "Maya is 37 with $450,000 invested, $50,000 in annual contributions, $60,000 in annual spending, and a $1.5 million target at a 4% withdrawal rate. She assumes a 5% real return for planning.",
      },
      {
        type: "ul",
        content: [
          "$9,000 in extra travel costs.",
          "$7,000 for health coverage and medical costs.",
          "$25,000 less contributed to investments.",
          "$3,000 in lost employer match.",
          "$10,000 kept as a re-entry reserve.",
        ],
      },
      {
        type: "p",
        content:
          "Her cash reserve covers travel, insurance, and re-entry, so she does not sell investments. Her portfolio starts in the same place, but her annual contribution falls by $28,000. In a smooth-return model, the break may delay her target by months rather than years. The exact result depends on timing and assumptions, which is why she should compare scenarios instead of accepting a universal rule.",
      },
      {
        type: "p",
        content:
          "Now change one fact: Maya funds the break by selling $49,000 during a bear market. The damage could be larger because she locks in losses and removes capital early. Same break, different funding plan. Funding source matters almost as much as price.",
      },
      {
        type: "h2",
        content: "Use three gates before you book",
      },
      {
        type: "ul",
        content: [
          "Liquidity gate: after paying for the break, keep the full break budget, a re-entry reserve, your normal emergency fund, and cash for known bills due within 12 months.",
          "Downside gate: write a response for a 30% market fall, costs running 20% high, a six-month job search, or a family issue ending the trip early.",
          "Return gate: decide the default route home — same field, part-time work, a new career, a business, or an extension allowed only when a pre-set financial condition is met.",
        ],
      },
      {
        type: "p",
        content:
          "Do not label the same dollar “travel money,” “emergency fund,” and “house down payment.” If every downside answer is “sell more investments,” the plan is fragile.",
      },
      {
        type: "h2",
        content: "Your one-page mini-retirement plan",
      },
      {
        type: "ul",
        content: [
          "Purpose: I am taking this break to ________.",
          "Dates: I stop work on ________ and plan to resume earning by ________.",
          "Base budget + 20% contingency: $________.",
          "Re-entry reserve: $________.",
          "Health coverage: ________ at $________ per month.",
          "Funding source: ________.",
          "Estimated FIRE delay / maximum acceptable delay: ________ / ________ months.",
          "Job-outreach date, extension rule, and abort rule: ________.",
        ],
      },
      {
        type: "h2",
        content: "Mini-retirement, Barista FIRE, or Coast FIRE?",
      },
      {
        type: "ul",
        content: [
          "Mini-retirement: work pauses, then resumes. Best when you want a defined block of time now.",
          "Barista FIRE: work continues at lower income or intensity. Best when you want an ongoing blend of work and freedom.",
          "Coast FIRE: retirement contributions may pause while existing assets compound. Best when you have time and sufficient invested assets but still need income for current life.",
        ],
      },
      {
        type: "h2",
        content: "The decision rule",
      },
      {
        type: "p",
        content:
          "Take the break when four statements are true: the experience is meaningfully more valuable now than later; you can fund it without stealing from emergency or re-entry reserves; the estimated FIRE delay is acceptable under conservative assumptions; and a slow return to work would be inconvenient, not catastrophic.",
      },
      {
        type: "p",
        content:
          "Do not take it because social media turned someone else’s sabbatical into a highlight reel. Do not reject it because a compound-interest chart treated every unearned dollar as a tragedy. The point of financial independence is to gain control over when your time is most valuable — and then use that control deliberately.",
      },
      {
        type: "h2",
        content: "Research and limitations",
      },
      {
        type: "p",
        content:
          "Trend context: Fidelity Investments, 2026 State of Retirement Planning Study (March 19, 2026), and Journal of Accountancy, “Beyond FIRE: Planning for mini-retirements” (April 27, 2026). Formula context: RetireFire Methodology. Educational illustration only — not financial, investment, tax, legal, or insurance advice. Verify costs and coverage for your own situation.",
      },
    ],
  },
  {
    slug: "first-100-days-after-fire",
    title: "The first 100 days after FIRE: a plan for time, brain, and identity",
    description:
      "Your portfolio can fund retirement without designing it. Use this 100-day plan to replace the structure, challenge, connection, and purpose work provided.",
    date: "2026-07-28",
    dateModified: "2026-07-29",
    readingMinutes: 12,
    tags: ["barista-fire", "semi-retirement", "basics"],
    sources: [
      {
        label: "NBER Working Paper 35117 — Does Employment Slow Cognitive Decline?",
        href: "https://www.nber.org/papers/w35117",
      },
      {
        label: "Fidelity Investments — 2026 State of Retirement Planning Study",
        href: "https://newsroom.fidelity.com/pressreleases/fidelity-investments--study--72--of-americans-say-they-will-retire-on-their-own-terms-as-they-embrac/s/609fbcb7-3ea5-4773-a300-0659da881d2a",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "You calculated your number. You stress-tested the portfolio. You gave notice. Then Monday arrived: no meetings, no commute, no one waiting for a decision. Just a clean calendar and the unsettling realization that freedom is not a schedule.",
      },
      {
        type: "p",
        content:
          "This is the part most FIRE calculators cannot model. A portfolio can replace a paycheck. It does not automatically replace the challenge, social contact, movement, status, and rhythm that came bundled with work.",
      },
      {
        type: "p",
        content:
          "That gap matters. A 2026 NBER working paper found that negative labor-market shocks were associated with declines in cognitive scores, with the findings concentrated among men ages 51–64. The study supports the possibility that working longer may delay age-related cognitive decline — but it does not prove that voluntary retirement causes dementia or that a job is the only way to stay sharp.",
      },
      {
        type: "p",
        content:
          "The useful takeaway is simpler: do not retire only from work. Build something to retire into. Here is a 100-day plan.",
      },
      {
        type: "h2",
        content: "Inventory what your job was secretly doing for you",
      },
      {
        type: "p",
        content:
          "Even a job you dislike may supply five kinds of structure. Score each from 0 to 5 based on how much your work currently provides. Any score of 4 or 5 needs a deliberate replacement. “I’ll stay busy” is not a replacement.",
      },
      {
        type: "ul",
        content: [
          "Time: a reason to wake up and a shape for the week.",
          "Challenge: problems with feedback and consequences.",
          "People: repeated contact, weak ties, and shared context.",
          "Movement: walking, commuting, standing, or leaving the house.",
          "Identity: a short answer to “What do you do?”",
        ],
      },
      {
        type: "h2",
        content: "Days 1–14: decompress without permanent decisions",
      },
      {
        type: "p",
        content:
          "The first two weeks are not the time to launch a nonprofit, renovate a house, buy an RV, and accept four volunteer roles. Treat them like the first days after a long flight: your judgment is present, but your internal clock is off.",
      },
      {
        type: "ul",
        content: [
          "Sleep until you notice a stable natural pattern.",
          "Walk outside every day.",
          "Keep major spending inside your existing plan.",
          "Write down what you feel tempted to add or escape.",
        ],
      },
      {
        type: "p",
        content:
          "Avoid the productivity costume: rebuilding a corporate calendar at home because an open day feels irresponsible. Every hobby does not need to become a project. You left work; you do not need to become middle management for your sourdough starter.",
      },
      {
        type: "p",
        content:
          "Also avoid permanent vacation. Vacation feels good partly because it interrupts normal life. When indulgence becomes normal life, it can lose contrast. Rest fully, but do not confuse recovery with the final design.",
      },
      {
        type: "h2",
        content: "Days 15–30: build a minimum viable week",
      },
      {
        type: "p",
        content:
          "Do not plan your ideal year yet. Design one week you would be willing to repeat, using five anchors.",
      },
      {
        type: "ul",
        content: [
          "Body anchor: a fixed activity at least three times a week — strength training, swimming, hiking, a sports league, long walks, or physical volunteering.",
          "Brain anchor: a challenge with progression and feedback — a language, graded course, instrument, software project, furniture build, garden, or tutoring.",
          "People anchor: recurring contact, not vague social intention. “Thursday lunch and Saturday cycling” can survive a lazy week.",
          "Service anchor: help a person or institution that would notice if you did not show up. Chosen obligation often gives freedom its shape.",
          "Nothing anchor: protect unassigned time to nap, wander, cook, stare out a window, or do nothing worth reporting.",
        ],
      },
      {
        type: "h2",
        content: "Days 31–60: run three experiments",
      },
      {
        type: "p",
        content:
          "You are not choosing an identity for the next 40 years. You are collecting evidence. Run one experiment in each category.",
      },
      {
        type: "ul",
        content: [
          "Mastery: commit 20 hours to learning or building one thing. Ask whether difficulty pulled you in and whether you would do another 20 hours without an audience.",
          "Contribution: serve somewhere four times, not once. The first visit measures novelty; the fourth begins to measure fit.",
          "Earned work: try a small, reversible form of paid work — one consulting project, a seasonal role, ten hours a week, or a paid workshop.",
        ],
      },
      {
        type: "p",
        content:
          "Paid work is not FIRE failure. In Fidelity’s 2026 study, common retirement alternatives included gig work or side hustles, a small business, part-time consulting, and changing industries. Work can become more useful after financial independence because money is no longer the only reason to choose it. The test is whether the work gives more than it takes.",
      },
      {
        type: "h2",
        content: "Days 61–90: stress-test the lifestyle",
      },
      {
        type: "p",
        content:
          "Your financial plan has downside scenarios. Your life plan needs them too.",
      },
      {
        type: "ul",
        content: [
          "Bad weather: what happens when travel, golf, cycling, or gardening disappears for ten days?",
          "Low motivation: which activities still happen because another person expects you?",
          "Partner mismatch: discuss alone time, chores, travel, spending, and interruption before resentment writes the policy.",
          "Market decline: if the portfolio drops 25%, define in advance what actually changes.",
        ],
      },
      {
        type: "p",
        content:
          "A market rule might say: core routines do not change; discretionary travel pauses; portfolio review remains quarterly; paid work becomes an option only if financial guardrails are crossed. This keeps market volatility from becoming identity volatility.",
      },
      {
        type: "h2",
        content: "Days 91–100: write your retirement operating system",
      },
      {
        type: "p",
        content:
          "At day 100, keep what worked and remove what performed well only in theory. Write one page and review it after three months, not every morning.",
      },
      {
        type: "ul",
        content: [
          "My week has these anchors: ________.",
          "People who will notice my absence: ________.",
          "The skill I am developing / the way I contribute: ________.",
          "The amount of paid work I welcome / refuse: ________.",
          "My quarterly adventure / protected empty time: ________.",
          "Warning signs that I am drifting: ________.",
          "People allowed to tell me the truth: ________.",
        ],
      },
      {
        type: "h2",
        content: "Use a behavior scorecard",
      },
      {
        type: "p",
        content:
          "Track behaviors, not happiness. Happiness is weather; behaviors are climate controls. Once a week, mark each item yes or no. If you score 2 out of 7 for several weeks, do not declare retirement a mistake. Change the system.",
      },
      {
        type: "ul",
        content: [
          "I moved hard enough to raise my heart rate three times.",
          "I had two meaningful conversations.",
          "I worked on a difficult skill.",
          "I helped someone outside my household.",
          "I spent time outside.",
          "I had one block of unscheduled time.",
          "I did not check my portfolio outside my rule.",
        ],
      },
      {
        type: "h2",
        content: "Should you keep working for your brain?",
      },
      {
        type: "p",
        content:
          "Maybe — but “keep working” is too blunt to be useful. The NBER paper studied employment changes associated with local labor-demand shocks. Its findings were concentrated in a specific demographic group, and it is a working paper rather than a final verdict on how every person should retire.",
      },
      {
        type: "p",
        content:
          "Employment bundles several potentially protective ingredients: mental demands, social interaction, routine, and purpose. Those ingredients can also exist in teaching, caregiving, volunteering, art, community leadership, study, and part-time work.",
      },
      {
        type: "p",
        content:
          "Ask a more precise question: which useful demands disappear when I leave, and where will I choose to find them next? If the honest answer is “nowhere,” a phased exit may fit better than a cliff. Use the Barista FIRE calculator to see how modest earned income changes the portfolio required, then judge the job design too: hours, autonomy, people, challenge, and whether you can leave.",
      },
      {
        type: "h2",
        content: "What success looks like",
      },
      {
        type: "ul",
        content: [
          "Successful FIRE does not require constant travel.",
          "It does not require a monetized passion or heroic second act.",
          "It does not require a packed calendar.",
          "It does not require never earning another dollar.",
        ],
      },
      {
        type: "p",
        content:
          "It requires a life you can inhabit after the novelty wears off. You may discover that you mostly want to cook, walk, help family, see friends, and enjoy missing out. That can be enough. The goal is not to make retirement impressive. The goal is to make it durable.",
      },
      {
        type: "p",
        content:
          "Your FIRE number answers, “Can I afford to stop?” Your first 100 days answer the question that comes next: what is worth continuing?",
      },
      {
        type: "h2",
        content: "Research and limitations",
      },
      {
        type: "p",
        content:
          "Research context: Kouchekinia, Neumark, and Bruckner, “Does Employment Slow Cognitive Decline? Evidence from Labor Market Shocks,” NBER Working Paper 35117 (2026), and Fidelity Investments, 2026 State of Retirement Planning Study. Educational information only — not medical, financial, investment, tax, or legal advice.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
