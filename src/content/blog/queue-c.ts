import type { BlogPost } from "./posts";

/** HUBI blog queue, batch C: retiring-early-at-45. Wired via src/content/blog/index.ts. */
export const QUEUE_C_POSTS: BlogPost[] = [
  {
    slug: "retiring-early-at-45",
    title: "Retiring Early at 45 With a 45-Year Portfolio Horizon",
    description:
      "Why 45 is the hardest early-retirement age: the three-phase model, withdrawal-rate humility for 45-year horizons, sequence risk, the 20-year healthcare bridge, and a worked $70k example.",
    date: "2026-10-11",
    readingMinutes: 12,
    tags: ["fire-number", "sequence-risk", "basics"],
    sources: [
      {
        label: "FIRE number calculator",
        href: "/calculators/fire-number",
      },
      {
        label: "Retire at 45 decision page",
        href: "/retire-at-45",
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
          "Forty-five is the hardest age to retire early. Retire at 55 and the bridges are short: a few years to penalty-free account access, a decade to Medicare. Retire at 40 and time does the heavy lifting — five decades of compounding forgive a lot of imprecision. At 45 you get the worst of both: a withdrawal horizon of roughly 45 years and benefit bridges measured in decades. Every assumption has to hold for longer, and every mistake compounds for longer.",
      },
      {
        type: "h2",
        content: "Why 45 is the worst of both worlds",
      },
      {
        type: "p",
        content:
          "Three clocks start the day you stop working at 45, and none of them is close:",
      },
      {
        type: "ul",
        content: [
          "14½ years to penalty-free retirement-account access at 59½. Your 401(k) and traditional IRA are walled off until then, with only narrow exceptions.",
          "20 years to Medicare at 65. Two decades of private health insurance, priced at whatever the market charges a 45-to-64-year-old household — and repriced every year.",
          "17 to 25 years to Social Security: 62 at the earliest, 70 for the maximum benefit. It cannot be a pillar of the plan; it is too far away.",
        ],
      },
      {
        type: "p",
        content:
          "A 55-year-old retiree faces the same three clocks, but each is roughly half as long. A 40-year-old faces longer clocks but keeps far more working years in reserve to recover from errors. At 45, the clocks are long and the recovery window is short. That combination — maximum exposure, minimum recovery time — is what makes the math demanding.",
      },
      {
        type: "h2",
        content: "The three-phase model",
      },
      {
        type: "p",
        content:
          "Stop thinking of retirement at 45 as one 45-year block. It is three distinct phases with different funding rules, and the plan has to work in each one:",
      },
      {
        type: "ul",
        content: [
          "Phase 1 — Bridge years, 45 to 59½. The portfolio funds 100% of spending and nothing else helps. Retirement accounts are locked; the legal doors are 72(t) SEPP distributions (rigid, long-commitment) and Roth contribution withdrawals (contributions only, not earnings). This phase is the binding constraint on the whole plan.",
          "Phase 2 — Gap years, 59½ to 65 (or 70). Retirement accounts unlock, so the funding problem eases. But healthcare is still private and Social Security is still ahead. Spending discipline matters most here, because lifestyle creep in your early 60s permanently raises the target.",
          "Phase 3 — Benefit years, 65 onward. Medicare replaces private insurance and Social Security begins whenever you claim it. The planning problem shifts from funding to taxes: withdrawal sequencing, Roth conversions in low-income years, and required distributions later.",
        ],
      },
      {
        type: "p",
        content:
          "The common failure is building one portfolio number — 25× spending — and ignoring the phase structure. A $1.75M portfolio that is 90% locked inside a 401(k) does not fund a 45-year-old's bridge years. Location of money matters as much as amount of money.",
      },
      {
        type: "h2",
        content: "Phase 1 is won or lost on asset location",
      },
      {
        type: "p",
        content:
          "The bridge phase needs roughly 14½ years of spending in money you can actually touch. For a $70,000 spender that is about $1,015,000 (illustrative, before inflation) that must live outside locked retirement accounts. Most aggressive savers have the opposite allocation: maxed 401(k)s, thin taxable brokerage. That saver is rich on paper and illiquid in practice — the exact wrong shape for 45.",
      },
      {
        type: "ul",
        content: [
          "Taxable brokerage is the ideal bridge fuel: no age restrictions, no penalties, favorable long-term capital gains treatment.",
          "Roth IRA contributions (not earnings) can be withdrawn anytime without tax or penalty — a secondary bridge reserve, not the primary plan.",
          "72(t) SEPP distributions unlock IRA money early but lock you into fixed withdrawals for years; breaking the schedule triggers retroactive penalties. Treat it as a last resort, not a strategy.",
          "The rule of 55 helps at 55, not at 45. Do not count on provisions that activate a decade after you need them.",
          "Build the bridge backward: decide the phase-1 spending total first, then allocate toward accessible accounts in the final working years — even if it means easing off pre-tax contributions to feed the taxable account.",
        ],
      },
      {
        type: "h2",
        content: "Withdrawal-rate humility for 45-year horizons",
      },
      {
        type: "p",
        content:
          "The 4% rule was calibrated on 30-year retirements. A 45-year-old planning to age 90 needs the money to last 45 years — half again as long. Longer horizons do not just add years; they add entire market cycles, including the bad ones. That is why longer retirements deserve lower planning withdrawal rates, not the same one carried over from a 30-year model.",
      },
      {
        type: "p",
        content:
          "Take a $70,000 annual spending target (illustrative). The portfolio math at three withdrawal rates:",
      },
      {
        type: "ul",
        content: [
          "4% → $1,750,000 ($70,000 ÷ 0.04)",
          "3.5% → $2,000,000 ($70,000 ÷ 0.035)",
          "3% → $2,333,333 ($70,000 ÷ 0.03)",
        ],
      },
      {
        type: "p",
        content:
          "The gap between 4% and 3% is about $583,000 — roughly eight years of that $70,000 spending. That is the price of humility: planning for the possibility that the next 45 years include a lost decade, higher inflation, or spending that drifts upward. You are not buying certainty — no rate guarantees anything — you are buying margin against the specific risks a 45-year horizon concentrates.",
      },
      {
        type: "h2",
        content: "Sequence risk over 45 years",
      },
      {
        type: "p",
        content:
          "Two 45-year-olds can retire with identical portfolios, earn the identical average return over 45 years, and end up hundreds of thousands of dollars apart. If a brutal bear market arrives in your late 40s — while you are withdrawing and contributing nothing — you sell shares at depressed prices to fund every year of spending, leaving less capital to recover when markets turn. The same bear market arriving in your 70s, after Medicare and Social Security have lowered the portfolio's burden, barely dents the plan. Order matters more than average.",
      },
      {
        type: "p",
        content:
          "Over 45 years you will almost certainly live through at least one severe market episode early in retirement. The defenses are unglamorous: a lower starting withdrawal rate, a written spending-guardrail rule (for example, cut spending 10% if the portfolio falls 20% below its starting value, restore it on recovery), a cash buffer covering two to three years of bridge-phase spending so you never sell into a crash, and keeping some form of earning optionality alive for the first decade.",
      },
      {
        type: "h2",
        content: "Healthcare: the 20-year bridge",
      },
      {
        type: "p",
        content:
          "Twenty years of private health insurance is the largest single line-item risk in a retire-at-45 plan. Premiums for a household aging from 45 to 64, plus deductibles and out-of-pocket maximums, can consume 15–25% of total annual spending — and the number resets every year. A 65-year-old retiree never faces this; a 45-year-old faces it for two decades.",
      },
      {
        type: "p",
        content:
          "Build it the way the bridge phase is built: get actual quotes for your household, age band, and state. Model three premium scenarios — quoted, quoted plus 20%, and full unsubsidized. Manage household income deliberately if you expect marketplace assistance, because recognized income from Roth conversions, capital gains, or part-time work can cost multiples in lost subsidies. And budget one high-utilization year per decade at the full out-of-pocket maximum; averages hide the years that break budgets.",
      },
      {
        type: "h2",
        content: "Social Security is 20+ years out — treat it as margin, not a pillar",
      },
      {
        type: "p",
        content:
          "At 45, the earliest Social Security claim (62) is 17 years away; the maximum benefit (70) is 25 years away. Benefit formulas, taxation of benefits, and even the program's structure can change across that span. Build the plan so it works with zero Social Security. If benefits arrive as projected, they fund longevity insurance — the years past 85 that are hardest to self-insure — rather than rescuing an underfunded bridge. Anything you cannot fund without it, you cannot afford.",
      },
      {
        type: "h2",
        content: "Putting it together: a worked example",
      },
      {
        type: "p",
        content:
          "A 45-year-old with $70,000 of annual spending (illustrative) wants to stop now. The portfolio targets: $1.75M at 4%, $2.0M at 3.5%, $2.33M at 3%. But the number alone is not a plan — run the phase checks:",
      },
      {
        type: "ul",
        content: [
          "Bridge funding: 14½ years × $70,000 ≈ $1,015,000 of spending before 59½ must sit in taxable brokerage, cash, or accessible Roth contributions — not locked in a 401(k).",
          "Healthcare: 20 years of private insurance. At an illustrative $18,000/year for the household, that is $360,000 of lifetime need — either inside the $70,000 spending number or added on top, but never ignored.",
          "Withdrawal rate: pick 3–3.5% for the 45-year horizon and write the guardrail rule now, before you need it.",
          "Social Security: excluded from the target. If it arrives, it covers the tail.",
          "Recheck yearly: spending, portfolio value, insurance quotes, and the phase boundaries. A 45-year plan is a living document, not a one-time calculation.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Can I retire at 45 with $1.5 million? Only if your spending fits inside it with margin. At $60,000/year spending, $1.5M is exactly 25× — the 4% starting point — with zero room for a 45-year horizon's extra risk. Most 45-year-old retirees should want the number to work at 3.5% or lower before calling it done.",
          "What about the rule of 55? It lets some workers tap a 401(k) penalty-free at 55 after separating from an employer — it does not help at 45. The age-45 toolkit is narrower: taxable accounts, Roth contributions (not earnings), and 72(t) SEPP distributions, each with strict rules.",
          "Should I count on part-time income? Only if it is durable and you would do it anyway. A plan that requires five years of consulting income to survive is not a retirement plan; it is a sabbatical with a hope attached. Model zero earned income, then treat any work as margin.",
          "How much extra does healthcare add at 45? Get quotes — but as a bracketing exercise, 20 years at an illustrative $15,000–$25,000/year is $300,000–$500,000 of lifetime spending a 65-year-old retiree never faces. In portfolio terms, every permanent $10,000 of annual healthcare spending needs roughly $250,000–$333,000 of additional portfolio at 4–3%.",
          "Is 45 too late to start? The math does not care when you start; it prices the runway ahead. What changes is the required savings rate — compressing a career of accumulation into the years left before 45 demands a high income, an extreme savings rate, or both. The Years to FIRE calculator models exactly that sprint.",
          "What is the single biggest mistake? Treating 25× spending as a finish line. At 45, the finish line is phased: accessible bridge money, healthcare priced for 20 years, a withdrawal rate chosen for 45 years, and Social Security held in reserve. Miss any phase and the total fails.",
        ],
      },
      {
        type: "h2",
        content: "The bottom line",
      },
      {
        type: "p",
        content:
          "Retiring at 45 is the hardest version of early retirement because the horizon is longest and the bridges are widest. The math still works — it just demands more: more capital per dollar of spending, more of it accessible, healthcare priced honestly for 20 years, and a withdrawal rate chosen for 45 years instead of 30. Build the three phases, fund the bridge first, and let Social Security be the bonus it should be. Run your number in the FIRE number calculator, price your healthcare before anything else, and recheck the plan every year. Educational only — not financial advice.",
      },
    ],
  },
];
