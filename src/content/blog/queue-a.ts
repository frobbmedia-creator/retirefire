import type { BlogPost } from "./posts";

/**
 * Blog queue batch A (2026-10-11). Wired into the blog index/sitemap via the
 * aggregator — do NOT edit posts.ts directly (file too large to deploy).
 */
export const QUEUE_A_POSTS: BlogPost[] = [
  {
    slug: "barista-fire-vs-coast-fire",
    title: "Barista FIRE vs Coast FIRE: differences, math, and which fits you",
    description:
      "The definitive Barista vs Coast comparison: both formulas side by side, a worked $60k example, return and income sensitivity, a 5-question decision framework, and when each wins.",
    date: "2026-10-11",
    readingMinutes: 12,
    tags: ["barista-fire", "coast-fire", "comparison"],
    sources: [{ label: "RetireFire methodology", href: "/methodology" }],
    body: [
      {
        type: "p",
        content:
          "Coast FIRE and Barista FIRE get mashed together in headlines because both let you stop saving aggressively. But they answer different questions, produce wildly different numbers, and fail in different ways. Pick the wrong frame and you will either save far more than you need — or step back from work years before the math supports it. This is the full comparison: the formulas, the worked numbers, the sensitivities, and a decision framework that picks the right one for your life.",
      },
      {
        type: "h2",
        content: "The two formulas, side by side",
      },
      {
        type: "ul",
        content: [
          "Full FIRE number = annual spending ÷ withdrawal rate. At $60,000 spending and 4%, that is $1,500,000. This is the baseline everything else discounts or splits.",
          "Coast FIRE number = full FIRE number ÷ (1 + r)^n, where n is years until traditional retirement age and r is the assumed real return. It asks: how much must be invested today so compounding alone finishes the job by 65?",
          "Barista FIRE number = max(0, spending − durable work income) ÷ withdrawal rate. It asks: how much portfolio do I need if work covers part of spending indefinitely?",
        ],
      },
      {
        type: "h2",
        content: "Worked example: $60,000 of annual spending",
      },
      {
        type: "p",
        content:
          "Same household, same spending, three different answers. Assumptions: 4% withdrawal rate, 5% real returns, traditional retirement at 65. All illustrative.",
      },
      {
        type: "ul",
        content: [
          "Full FIRE at any age: $60,000 ÷ 0.04 = $1,500,000.",
          "Coast FIRE at 35 (30 years of compounding): $1,500,000 ÷ (1.05)^30 ≈ $347,000. Stop contributing; keep working to pay the bills.",
          "Barista FIRE with $20,000 of annual work income: ($60,000 − $20,000) ÷ 0.04 = $1,000,000. Work covers $20k; the portfolio covers the $40k gap.",
          "Barista FIRE with $30,000 of annual work income: ($60,000 − $30,000) ÷ 0.04 = $750,000.",
        ],
      },
      {
        type: "h2",
        content: "A second scenario: starting at 45",
      },
      {
        type: "p",
        content:
          "Move the same household to 45. The Barista numbers do not change — work income and spending are identical, so the gap math is identical. The Coast number nearly doubles:",
      },
      {
        type: "ul",
        content: [
          "Coast FIRE at 45 (20 years of compounding): $1,500,000 ÷ (1.05)^20 ≈ $565,000.",
          "At 5% real, losing 10 years of compounding costs about $218,000 of extra capital. At 3% real the penalty is worse: $1,500,000 ÷ (1.03)^20 ≈ $830,000.",
          "Barista is age-blind; Coast is age-obsessed. That asymmetry is the whole game.",
        ],
      },
      {
        type: "p",
        content:
          "This is why Coast rewards the young disproportionately — and why Barista is the better frame for late starters. At 45 with $200,000 saved, Coast says you are roughly $365,000 short at 5% real, and only more saving or more time closes it. Barista with $25,000 of durable work income says you need ($60,000 − $25,000) ÷ 0.04 = $875,000 — still short, but the gap closes with a few more working years rather than two more decades of compounding.",
      },
      {
        type: "h2",
        content: "Why the Coast number looks impossibly small",
      },
      {
        type: "p",
        content:
          "The $347,000 Coast figure triggers disbelief because it looks like a retirement number and it is not one. It is a discounted future number. Nobody lives on $347,000 at 35 — the portfolio stays untouched while earnings pay for life. Coast does not fund early-retirement spending; it funds a bet that compounding finishes the nest egg by 65. Barista's $1,000,000 looks bigger because it is doing harder work: covering a real spending gap, in cash, starting now. Compare them and you are comparing a promise against a paycheck.",
      },
      {
        type: "h2",
        content: "What moves each number",
      },
      {
        type: "p",
        content:
          "Coast is hypersensitive to return assumptions because the exponent does the heavy lifting. Barista is hypersensitive to work income because every durable dollar of earnings divides by the withdrawal rate.",
      },
      {
        type: "ul",
        content: [
          "Coast at 30 years on a $1.5M target: 3% real → ~$618,000 · 4% → ~$462,000 · 5% → ~$347,000 · 6% → ~$261,000 · 7% → ~$197,000. One point of assumed return swings the number by six figures.",
          "Barista at $60k spending, 4%: $10k work income → $1.25M · $20k → $1.0M · $30k → $750k · $40k → $500k. Each $10,000 of durable annual income erases $250,000 of required portfolio.",
          "Full FIRE barely moves: it is $1.5M regardless, because the withdrawal rate is the only lever.",
        ],
      },
      {
        type: "h2",
        content: "The mistakes people make",
      },
      {
        type: "ul",
        content: [
          "Treating the Coast number as spendable. The classic error: hitting $347,000 at 35 and feeling rich. That money is spoken for — it belongs to your 65-year-old self. Spend a dollar of it and the compounding contract breaks.",
          "Assuming Barista income lasts forever. Price the plan twice: once with the income, once without. If the no-income version demands full FIRE and you do not have it, your Barista plan has a single point of failure.",
          "Ignoring the healthcare line. Coast usually keeps employer coverage because you are still working full-time. Barista often loses it. A $12,000 annual premium swing changes the Barista gap by $300,000 of required portfolio at 4%.",
          "Using the same return assumption for both. Coast lives and dies on multi-decade real returns; Barista barely cares about returns, because the portfolio only funds a gap. Stress them differently.",
          "Forgetting taxes. A $1,000,000 Barista portfolio inside a traditional 401(k) is not $1,000,000 of spending power. Run the gap math in after-tax dollars or the answer flatters you.",
        ],
      },
      {
        type: "h2",
        content: "Taxes change the ranking",
      },
      {
        type: "p",
        content:
          "The formulas above live in a tax-free fantasy. Reality reshuffles the ranking:",
      },
      {
        type: "ul",
        content: [
          "Coast rewards Roth and taxable accounts disproportionately. Money compounding untouched for 30 years wants the lowest lifetime tax drag — Roth dollars growing tax-free for three decades beat pre-tax dollars taxed as ordinary income on every withdrawn dollar.",
          "Barista rewards income timing. Part-time earnings in low-income years are taxed lightly, and they open room for Roth conversions at low brackets — a double win the Coast-only plan cannot use as aggressively, because full-time earnings fill the brackets.",
          "A $1,000,000 Barista number split across account types is not one number. Run the gap in after-tax dollars: $40,000 of needed spending can require roughly $47,000 of pre-tax withdrawals, which at 4% means a ~$1,175,000 pre-tax portfolio, not $1,000,000.",
        ],
      },
      {
        type: "p",
        content:
          "None of this changes which strategy fits your life — it changes the price tag. A Coast plan funded with Roth dollars can be 15–20% smaller in nominal terms than the same plan in pre-tax dollars, because every withdrawn dollar arrives whole. Do the final pass in after-tax dollars. The strategy that looked cheaper pre-tax does not always win post-tax.",
      },
      {
        type: "h2",
        content: "The 5-question decision framework",
      },
      {
        type: "ul",
        content: [
          "Do you want to keep working full-time? Yes → Coast. You are really asking permission to stop saving, not to stop working.",
          "Do you want part-time work to start soon? Yes → Barista. The math must fund a spending gap starting now.",
          "Is your work income durable for a decade or more? If it could vanish, Barista math collapses — size the portfolio for the gap disappearing.",
          "Can you leave the portfolio untouched until 65? If you will raid it, you are doing Barista with extra steps, not Coast.",
          "Which risk scares you more: 30 years of market uncertainty, or your income disappearing? Coast concentrates market risk; Barista concentrates income risk.",
        ],
      },
      {
        type: "h2",
        content: "When Coast wins",
      },
      {
        type: "ul",
        content: [
          "You like your career but hate the savings treadmill. Coast buys back 20–40% of your income immediately.",
          "You are young. Every extra decade of compounding roughly halves the required number at 5% real.",
          "Your spending is stable and your job is secure. Coast's failure modes are lifestyle creep and return shortfall, not income loss.",
          "You want optionality, not an exit date. Coast is a floor, not a finish line.",
        ],
      },
      {
        type: "h2",
        content: "When Barista wins",
      },
      {
        type: "ul",
        content: [
          "You want a different daily life now, not at 65. Barista funds semi-retirement this year.",
          "You have access to enjoyable part-time work — consulting, trades, seasonal work. The math only holds if the income is durable.",
          "Healthcare is solvable. This is Barista's tripwire: part-time work often means no employer insurance, so price the gap before you leap.",
          "You can tolerate the portfolio doing real work. Barista withdraws from day one, so sequence risk applies immediately.",
        ],
      },
      {
        type: "h2",
        content: "The hybrid most people actually want",
      },
      {
        type: "p",
        content:
          "Coast and Barista are not enemies; they stack. Hit your Coast number, then let part-time income fund lifestyle upgrades instead of touching the portfolio. The work income becomes margin rather than load-bearing math: if it disappears, the Coast plan still holds. Run both calculators — the Coast number tells you when saving can stop, the Barista number tells you what work buys you.",
      },
      {
        type: "p",
        content:
          "The cleanest way to run both: split the portfolio mentally. One sleeve is the Coast fund — invested, untouched, compounding toward 65. Everything else, plus work income, handles life now. If work income is strong, the second sleeve can stay small; if the income vanishes, the Coast sleeve still delivers the 65-year-old plan. Two jobs, two piles of money, no confusion about which dollar does what.",
      },
      {
        type: "h2",
        content: "Shared risks (do not skip)",
      },
      {
        type: "ul",
        content: [
          "Work income is the load-bearing wall in Barista and the silent assumption in Coast. Job loss breaks both, differently.",
          "Lifestyle creep erases Coast surplus and widens the Barista gap at the same time.",
          "Taxes and healthcare can dwarf the spreadsheet differences between the two strategies.",
          "Both assume decades of stability. Stress-test the Coast number against low-return decades and the Barista number against income loss.",
        ],
      },
      {
        type: "h2",
        content: "Run your numbers",
      },
      {
        type: "p",
        content:
          "Compute your Coast number with the Coast FIRE calculator, your gap number with the Barista FIRE calculator, and your baseline with the FIRE number calculator. Read the methodology to see every assumption, then stress-test both plans against bad decades before you change anything about your work life.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Can I do Coast FIRE and Barista FIRE at the same time? Yes — that is the hybrid above. Coast the portfolio, let work income fund lifestyle. The combination is more robust than either alone.",
          "Which needs less money? Coast, usually by a wide margin — but it is not funding your life, only your 65-year-old self. Compare the job each number does, not the digits.",
          "What if I stop working entirely after going Barista? Then you need full FIRE math. Either the portfolio has grown into the full number, or you are spending principal and should recheck the plan.",
          "Is Coast FIRE just procrastinating on retirement saving? No — it is front-loading it. The saving happened early and aggressively; the coasting is the reward, not the avoidance.",
          "What real return should I assume for Coast? Plan at 3–4% real and treat 5% as the optimistic case. The sensitivity table above shows why: the exponent punishes optimism.",
          "Does Barista FIRE work without employer healthcare? It can, but healthcare is the first line item to price — marketplace premiums, subsidies by income, and the COBRA bridge. Never back into it.",
        ],
      },
      {
        type: "p",
        content:
          "Educational only — not financial advice. Illustrations use stated assumptions; markets will not cooperate on schedule.",
      },
    ],
  },
  {
    slug: "fire-calculator-with-social-security",
    title: "How to factor Social Security into your FIRE timeline",
    description:
      "Social Security bends the FIRE math but doesn't break it: the bridge problem, a worked present-value example, why delaying to 70 pays, and simple tax rules.",
    date: "2026-10-11",
    readingMinutes: 10,
    tags: ["fire-number", "2026", "basics"],
    sources: [{ label: "RetireFire methodology", href: "/methodology" }],
    body: [
      {
        type: "p",
        content:
          "Most FIRE calculators pretend Social Security does not exist. That is conservative, but it is wrong in a specific and expensive way: it can tell a 50-year-old they need $1,188,000 when the honest number is closer to $1,020,000. Social Security is a future income stream, and future income shrinks the portfolio you need — just less than most people think.",
      },
      {
        type: "h2",
        content: "The bridge problem",
      },
      {
        type: "p",
        content:
          "Social Security creates two phases, not one. Phase one is the bridge: from the day you stop working until benefits start, the portfolio funds 100% of spending alone. Phase two begins when the checks arrive and the portfolio only covers the gap. The bridge is the expensive part, because every year of early retirement is a year of full spending with zero Social Security offset. Anyone who simply subtracts their annual benefit from spending and divides by 4% is doing the math wrong — that shortcut understates the bridge and overstates the savings.",
      },
      {
        type: "h2",
        content: "Worked example: retire at 50, $60k spending, $24k Social Security at 67",
      },
      {
        type: "p",
        content:
          "Assumptions: 4% real discount rate, $60,000/year spending from age 50 to 90, $24,000/year in Social Security from 67 to 87. All illustrative.",
      },
      {
        type: "ul",
        content: [
          "Lifetime spending, present value at 50: $60,000 × 19.79 ≈ $1,188,000. (That 19.79 is the 40-year annuity factor at 4%.)",
          "Social Security, present value at 67: $24,000 × 13.59 ≈ $326,000 for 20 years of benefits.",
          "Discounted back to age 50 — 17 years at 4% roughly halves it: ≈ $167,000.",
          "Net portfolio needed at 50: $1,188,000 − $167,000 ≈ $1,020,000.",
          "Ignoring Social Security entirely says $1,188,000. The honest answer is about 14% lower — meaningful, but not life-changing.",
        ],
      },
      {
        type: "h2",
        content: "The $900,000 mistake",
      },
      {
        type: "p",
        content:
          "The most common wrong answer goes like this: ($60,000 − $24,000) ÷ 0.04 = $900,000. Retire at 50 with $900k and let Social Security handle the rest. It is off by enough to wreck a plan:",
      },
      {
        type: "ul",
        content: [
          "At 50, that $900,000 must fund $60,000 a year for 17 years with no help — $1,020,000 of gross spending before a dollar of Social Security arrives.",
          "At 4% withdrawals, $900,000 supports $36,000 a year. You would run $24,000 short every single bridge year, digging a hole the later benefits cannot fill.",
          "The naive method treats Social Security as if it starts today. It starts in 17 years. Time-discount everything.",
        ],
      },
      {
        type: "p",
        content:
          "The honest range for this household: about $1,020,000 (counting Social Security properly) to $1,188,000 (ignoring it). Anyone quoting $900,000 has deleted the bridge.",
      },
      {
        type: "h2",
        content: "Why it matters less than you think",
      },
      {
        type: "p",
        content:
          "Two forces shrink Social Security's value for early retirees. First, discounting: money that arrives 17 years from now is worth roughly half of money today at a 4% real rate, so distant benefits punch below their weight. Second, timing: benefits only cover the later years, which are already the cheapest years to fund because fewer of them remain. The first decade of early retirement — the bridge — gets no help at all. Social Security trims the edges of a FIRE plan; it does not reshape it.",
      },
      {
        type: "h2",
        content: "Estimate your benefit in two minutes",
      },
      {
        type: "ul",
        content: [
          "The 40% rule: for average earners, Social Security replaces roughly 40% of pre-retirement earnings — the SSA's own long-standing figure. Earn around $80,000 and expect something near $32,000 a year at full retirement age, in today's dollars.",
          "Your official estimate: the SSA.gov retirement estimator uses your actual earnings record. Use it — it beats every rule of thumb.",
          "The 35-year trap: benefits are computed from your 35 highest-earning years. Retire at 45 with 23 working years and 12 zeros drag the average down. Every zero year is a quiet benefit cut.",
          "Spousal benefits: a lower-earning spouse may claim up to 50% of the higher earner's benefit — relevant for single-income FIRE households.",
        ],
      },
      {
        type: "h2",
        content: "Delaying to 70 is usually the highest-return move",
      },
      {
        type: "p",
        content:
          "Every year you delay past full retirement age (66–67, depending on birth year) adds 8% to your monthly benefit, up to age 70. No market investment offers a guaranteed, inflation-adjusted 8% annual return.",
      },
      {
        type: "ul",
        content: [
          "Claim at 62 with a full retirement age of 67: 70% of your full benefit. Claim at 70: 124%. That is 77% more per month for waiting eight years.",
          "Breakeven is typically around age 78–80: live past it and delaying wins in total dollars. With a comfortable portfolio funding the bridge, most FIRE households can afford to wait.",
          "Think of delaying as buying inflation-adjusted longevity insurance at a price no insurer will match.",
          "Exception: poor health or a shorter life expectancy flips the math toward claiming earlier. This is the one place pessimism pays.",
        ],
      },
      {
        type: "p",
        content:
          "Put dollars on it. Suppose your full benefit is $2,000 a month. Claim at 62: $1,400 a month. Claim at 70: $2,480 a month — $1,080 more, every month, inflation-adjusted, for life. Over 20 years (70 to 90) that is roughly $259,000 of additional nominal income for eight years of patience. The bridge costs waiting; the payoff lasts decades.",
      },
      {
        type: "h2",
        content: "Taxes on benefits, simply",
      },
      {
        type: "ul",
        content: [
          "Up to 85% of benefits can be taxable, depending on “provisional income” — roughly, adjusted gross income plus half your benefits plus tax-exempt interest.",
          "The thresholds ($25,000 single / $32,000 joint) were set in 1993 and never inflation-adjusted, so more retirees owe tax on benefits every year.",
          "Roth withdrawals do not count toward provisional income — another quiet argument for Roth balances in early retirement.",
          "State treatment varies: some states exempt Social Security entirely. Know yours before you model.",
        ],
      },
      {
        type: "h2",
        content: "How to model it in your FIRE number",
      },
      {
        type: "ul",
        content: [
          "Step 1: estimate the benefit at your planned claiming age (SSA estimator, then haircut it 10–20% if you distrust future law — label the haircut as your assumption).",
          "Step 2: split the timeline — bridge years at full spending, post-claiming years at spending minus benefits.",
          "Step 3: present-value both phases at a conservative real rate, or use the bridge-plus-gap shortcut: bridge cost ≈ years × spending, then gap ÷ withdrawal rate for the rest.",
          "Step 4: stress-test. Run it with benefits cut 25% and with claiming at 62. If the plan survives both, the Social Security assumption is not load-bearing.",
        ],
      },
      {
        type: "h2",
        content: "What early retirees get wrong",
      },
      {
        type: "ul",
        content: [
          "Counting the full benefit from day one. Discount it. A dollar of Social Security at 67 is worth about fifty cents at 50.",
          "Forgetting the earnings record. Ten zero-income years in your 35-year average quietly shrink the benefit — check the SSA estimator with the zeros included.",
          "Letting the tail wag the dog. Social Security is roughly 14% of the age-50 number in our example. Do not delay retirement five years to optimize a 14% input — get the other 86% right first.",
          "Ignoring the spouse. In single-income FIRE households, spousal benefits worth up to 50% of the higher benefit can be the largest unmodeled asset in the plan.",
        ],
      },
      {
        type: "h2",
        content: "The Roth conversion window",
      },
      {
        type: "p",
        content:
          "The bridge years hand you a gift: low taxable income. No wages, no Social Security yet — often the lowest-tax years of your life. That is prime Roth conversion territory.",
      },
      {
        type: "ul",
        content: [
          "Convert pre-tax dollars to Roth each bridge year up to the top of a low bracket. Pay tax now at a low rate to avoid higher rates later, when required minimum distributions and Social Security stack on top of each other.",
          "But conversions raise provisional income in the conversion year — time large conversions before Social Security starts, not after, or you will make more of your benefits taxable.",
          "The synergy with delaying: every year you push Social Security toward 70 is another year of low-income conversion room. The two strategies multiply.",
        ],
      },
      {
        type: "p",
        content:
          "Model it as a package: bridge spending plus Roth conversions plus delayed Social Security. Separately each is a tweak; together they can move lifetime tax by six figures for larger portfolios.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Should I count Social Security at all in my FIRE number? Yes, but discounted and late. Ignoring it entirely is needlessly conservative; counting it at face value is reckless. The present-value method above is the honest middle.",
          "Will Social Security still exist when I retire? Probably in some form — but model a 20–25% benefit reduction as your stress case, roughly the scale of the currently projected long-run shortfall. If the plan works anyway, stop worrying.",
          "Does part-time Barista FIRE work raise my benefit? It can, if the earnings replace zero years in your 35-year record. Low-earning years barely move the average, though — do not work extra years just for this.",
          "Claim at 62 or 70 if I retire at 50? Usually 70, if the portfolio comfortably funds the 20-year bridge. The 8%-per-year delayed credits are the best guaranteed return available.",
          "How does Social Security interact with Roth conversions? The years between retirement and 70 are prime Roth conversion years — low income, no benefits yet. But conversions raise provisional income later, so model the tax interaction.",
        ],
      },
      {
        type: "p",
        content:
          "Educational only — not financial advice. Benefit rules change; verify current law at SSA.gov before deciding.",
      },
    ],
  },
];
