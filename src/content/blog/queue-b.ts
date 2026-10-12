import type { BlogPost } from "./posts";

/**
 * Blog queue B: HUBI SEO package rewrites/additions.
 * Wired in via the blog index aggregator (see src/content/blog/index.ts pattern).
 * Post 1 reuses an existing slug so it overrides the live version.
 */
export const QUEUE_B_POSTS: BlogPost[] = [
  {
    slug: "when-can-you-stop-saving-for-retirement",
    title: "When can you stop saving for retirement?",
    description:
      "The coast point: how to know your portfolio can finish the job without another contribution — the discount formula in plain English, three tests to run first, and what “stop saving” actually means.",
    date: "2026-10-11",
    readingMinutes: 10,
    tags: ["coast-fire", "basics", "fire-number"],
    sources: [
      {
        label: "RetireFire methodology",
        href: "/methodology",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "“When can I stop saving for retirement?” is the wrong question, and it is also the most important question in personal finance. It is the wrong question because you never fully stop — you stop prioritizing retirement contributions over everything else. It is the most important question because the answer is a number, and once you know it, every career decision gets easier.",
      },
      {
        type: "p",
        content:
          "The clean way to think about it is the coast point: the moment your existing portfolio has enough forward momentum to reach your full retirement target by a traditional retirement age through compounding alone — no future contributions required. After that, work only has to cover your bills. Saving for retirement becomes optional, not mandatory.",
      },
      {
        type: "h2",
        content: "The formula, in plain English",
      },
      {
        type: "p",
        content:
          "Take the portfolio you will need at retirement. Shrink it by the growth you expect between now and then. What is left is the amount you need today. If you already have that much invested, you can stop feeding the accounts.",
      },
      {
        type: "p",
        content:
          "In symbols: coast number = full FIRE number ÷ (1 + r)^n, where r is your assumed real annual return and n is the years until your target retirement age. Real means after inflation — a 7% market return with 2% inflation is roughly a 5% real return.",
      },
      {
        type: "h2",
        content: "A worked example",
      },
      {
        type: "p",
        content:
          "Say you spend $80,000 a year and plan on a 4% withdrawal rate. Your full FIRE number is $80,000 ÷ 0.04 = $2,000,000. You are 38 and targeting 65, so n = 27 years. At a 5% real return, your coast number is $2,000,000 ÷ (1.05)^27 ≈ $536,000. Hold $536,000 invested and the model says compounding finishes the job. Hold $400,000 and you are not there yet — keep saving, spend less, or accept a later target age.",
      },
      {
        type: "h2",
        content: "Test 1: audit your expenses like a skeptic",
      },
      {
        type: "p",
        content:
          "Spending is the load-bearing input in every retirement calculation. A coast number built on a guessed budget is a guess wearing a spreadsheet costume. Pull twelve months of actual outflows — every account, every card — and build the number from reality, not from what you think you spend.",
      },
      {
        type: "p",
        content:
          "Then add the costs people forget: health insurance if you downshift to work without benefits, home maintenance averaged per year, car replacement reserves, and family support that tends to grow, not shrink. If your spending drifts up 10% after you “stop saving,” your coast number was wrong the day you computed it.",
      },
      {
        type: "h2",
        content: "Test 2: be humble about returns",
      },
      {
        type: "p",
        content:
          "The formula assumes one smooth return every year. Markets do not do smooth. Small changes in the assumed return move the answer enormously — which is exactly why you should run the math at several returns, not one. Using the $2,000,000 target and 27-year horizon above:",
      },
      {
        type: "ul",
        content: [
          "3% real → coast ≈ $900,000",
          "4% real → coast ≈ $694,000",
          "5% real → coast ≈ $536,000",
          "6% real → coast ≈ $415,000",
        ],
      },
      {
        type: "p",
        content:
          "The same life, the same spending — and the answer ranges from $415,000 to $900,000 depending on one assumption. That spread is the reason to demand a margin of safety: only call it done when the numbers work at a return below your central estimate. Run the free stress test on the Coast FIRE calculator page to see path ranges instead of a single green light.",
      },
      {
        type: "p",
        content:
          "There is a second humility problem hiding inside the first: even if the average return lands exactly on your assumption, the order of returns matters. A flat decade early in the coast period leaves less capital to compound later — same average, worse outcome. Constant-return math cannot see this. The stress test exists to show you the range of paths, not the single rosy one, so your margin of safety covers sequence risk too.",
      },
      {
        type: "h2",
        content: "Test 3: prove your income covers the bills",
      },
      {
        type: "p",
        content:
          "Coasting does not mean retiring. It means your portfolio is on autopilot while your paycheck covers 100% of current living expenses — housing, food, insurance, taxes, everything — without touching invested capital. If your planned lower-stress income falls short, you will raid the portfolio, and the compounding math breaks.",
      },
      {
        type: "p",
        content:
          "Before you cut contributions, verify three things: your post-downshift income reliably exceeds your audited spending, you hold six to twelve months of expenses in cash outside the portfolio, and healthcare is priced in rather than assumed away. The emergency fund is not part of the coast pile — it is what protects the coast pile.",
      },
      {
        type: "h2",
        content: "What “stop saving” doesn't mean",
      },
      {
        type: "p",
        content:
          "It does not mean zero savings forever. The employer 401(k) match is still close to free money in most cases — turning it down to “coast” is usually bad arithmetic. HSA contributions remain triple-advantaged. A small default investment habit fights lifestyle creep even when the spreadsheet says you are done.",
      },
      {
        type: "p",
        content:
          "Better phrasing: stop maximizing retirement savings at the expense of everything else. Redirect the surplus deliberately — debt, taxable flexibility, experiences while you are young enough to enjoy them — instead of letting it evaporate into a bigger lifestyle.",
      },
      {
        type: "p",
        content:
          "The match deserves its own line of math, because “I'm done saving” makes it tempting to skip. A 50% match on 6% of a $150,000 salary is $4,500 a year of free money. Left invested at 5% real for 20 years, that single habit is worth about $149,000 — real dollars, for filling out a form once. Coasting means your contributions are optional. The match means some of them are still obviously worth making.",
      },
      {
        type: "h2",
        content: "Why people regret stopping too early",
      },
      {
        type: "ul",
        content: [
          "Optimistic return assumptions that reverse under stress — the 6% column feels true until a lost decade arrives.",
          "Lifestyle creep after adopting the “I'm coasting” identity; spending rises to meet the freed cash flow.",
          "Healthcare costs and family changes that were never in the spreadsheet.",
          "Confusing coasting with early retirement and withdrawing from the portfolio years too soon.",
          "Never re-running the numbers after a job change, a move, kids, or a market regime shift.",
        ],
      },
      {
        type: "h2",
        content: "Three levers that move the number",
      },
      {
        type: "p",
        content:
          "If the coast number feels out of reach, you have exactly three levers — and the math tells you which pulls hardest. Using the $2,000,000 target, age 38, 27-year example ($536,000 coast at 5% real):",
      },
      {
        type: "ul",
        content: [
          "Spend less: cut spending from $80,000 to $70,000 and the FIRE target drops to $1,750,000 — coast falls to about $469,000. Every dollar of spending you kill removes $25 of required portfolio at a 4% withdrawal rate.",
          "Extend the horizon: push the target age from 65 to 70 (n = 32 years) and five extra compounding years cut the coast number to about $420,000. Time is the strongest lever and the only free one.",
          "Save more now: every additional $10,000 invested today is worth about $37,300 at 5% real over 27 years. Front-loaded dollars do the most work.",
        ],
      },
      {
        type: "h2",
        content: "Rehearse for a year before you commit",
      },
      {
        type: "p",
        content:
          "Do not cut contributions the month you first hit the number. Instead, live the downshift for twelve months while still saving at the old rate: work the planned schedule, spend the planned budget, bank the difference. If the income wobbles or the budget leaks, you learned it cheaply — while the compounding engine was still being fed.",
      },
      {
        type: "p",
        content:
          "Use a trigger with margin built in: stop only when the coast number works a full percentage point below your central return estimate. If you believe 5% real is realistic, your trigger is the 4% column — $694,000 in the example above, not $536,000. Optimism is free in a spreadsheet and expensive in real life.",
      },
      {
        type: "h2",
        content: "Recalculate when life moves",
      },
      {
        type: "p",
        content:
          "The coast point is a snapshot, not a tattoo. Re-run the numbers whenever the inputs change materially:",
      },
      {
        type: "ul",
        content: [
          "Job or income change — especially the downshift itself, once real pay stubs exist.",
          "Housing moves, kids, divorce, or health events that reset spending.",
          "A market drawdown over 20% — check whether the coast math survives at lower balances.",
          "Spending drift above 10% from the audited baseline.",
          "Every twelve months regardless, because quiet drift is the most common failure mode.",
        ],
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Q: Should I still take the employer match after coasting? A: Usually yes — a 50–100% immediate return on matched dollars is hard to beat, and it does not meaningfully change your lifestyle. This is not personalized advice.",
          "Q: Is there one universal age to stop saving? A: No. There is only your spending, your portfolio, your assumptions, and your margin of safety.",
          "Q: Can I coast at 40 with money needed at 65? A: Yes — that is the standard coast framing. Just remember a 25-year horizon amplifies both compounding and forecasting error.",
          "Q: What if I hit my number during a market peak? A: Re-run it after a 20–30% drawdown mentally. If the answer only works at all-time highs, it is not an answer.",
          "Q: How often should I recheck? A: Yearly, and after any big life change — job, housing, kids, divorce, health events. The coast point moves as life moves.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice. Run your own numbers on the Coast FIRE calculator, stress-test the assumptions, and read the Methodology page for the formulas behind every figure here.",
      },
    ],
  },
  {
    slug: "fire-calculator-with-pension",
    title: "How to integrate a pension into your early retirement model",
    description:
      "A pension is a bond-like income floor that changes every FIRE calculation: how to value it, handle the bridge years before it starts, weigh lump sum vs annuity, and adjust for inflation.",
    date: "2026-10-11",
    readingMinutes: 10,
    tags: ["fire-number", "basics"],
    sources: [
      {
        label: "RetireFire methodology",
        href: "/methodology",
      },
    ],
    body: [
      {
        type: "p",
        content:
          "Pensions are rare now, which makes them dangerous in spreadsheets: most FIRE calculators ignore them, and the ones that do not often model them wrong. If you have a pension — or a spouse does — it is the most valuable single line in your retirement math. Treat it as a bond-like income floor and every number downstream gets smaller and more honest.",
      },
      {
        type: "h2",
        content: "Think of a pension as a bond that pays you",
      },
      {
        type: "p",
        content:
          "A portfolio has to survive market crashes, sequence risk, and your own spending discipline. A pension just shows up every month. That reliability means each pension dollar replaces more than a dollar of portfolio — it replaces the most fragile dollars, the ones that would otherwise have to survive the worst market years.",
      },
      {
        type: "p",
        content:
          "The practical effect: subtract the pension from your spending first, then compute the portfolio you need for the remainder. A $60,000 lifestyle with a $20,000 annual pension is a $40,000 portfolio problem, not a $60,000 one. At a 4% withdrawal rate, that is the difference between a $1,500,000 target and a $1,000,000 target.",
      },
      {
        type: "h2",
        content: "Two ways to put it in the math",
      },
      {
        type: "p",
        content:
          "The income-subtraction method is the one to use for planning: annual spending minus annual pension equals the gap your portfolio must cover; divide the gap by your withdrawal rate. It is simple, it matches how the money actually arrives, and it keeps the bridge years visible.",
      },
      {
        type: "p",
        content:
          "The present-value method discounts the whole pension stream back to today — useful when you want a net-worth-style comparison, e.g. “my pension is worth roughly $X as a portfolio equivalent.” Example, illustrative: a $20,000 annual pension from age 60 to 90, discounted at 4% real, is worth about $346,000 at age 60. Discount that back 20 years to age 40 and it is worth roughly $158,000 in today's terms. Same pension, two lenses — subtraction for the plan, present value for perspective.",
      },
      {
        type: "h2",
        content: "The bridge years are the real problem",
      },
      {
        type: "p",
        content:
          "Pensions usually start at a fixed age — 60, 62, 65 — but early retirement means stopping work before that. The years between your last paycheck and your first pension check are the bridge, and the bridge runs on portfolio alone.",
      },
      {
        type: "p",
        content:
          "Take the $60,000 spender with the $20,000 pension starting at 60 who wants out at 50. From 50 to 60, the portfolio must fund the full $60,000 a year — ten years, $600,000 of cumulative spending before the pension ever helps, ignoring growth. From 60 on, the burden drops to $40,000 a year. Model the two phases separately. The single most common pension modeling error is smearing the pension across years it does not cover.",
      },
      {
        type: "ul",
        content: [
          "Phase 1 (bridge): full spending from portfolio, zero pension income.",
          "Phase 2 (pension online): spending minus pension = portfolio gap.",
          "Keep a cash buffer for the bridge — sequence risk is concentrated there.",
          "If the pension has an early-reduced option, price the haircut before assuming it fixes the bridge.",
        ],
      },
      {
        type: "h2",
        content: "Lump sum vs annuity: the actual tradeoff",
      },
      {
        type: "p",
        content:
          "Many pensions offer a choice: a lump sum today or monthly checks for life. The arithmetic starting point is the breakeven. A $250,000 lump sum versus $20,000 a year means 12.5 years of checks to match the lump sum in raw cash — live past 72½ (starting at 60) and the annuity has paid more dollars, ignoring investment returns on the lump sum.",
      },
      {
        type: "p",
        content:
          "But raw cash is not the decision. The annuity is longevity insurance: it cannot be outlived, outspent, or panicked-sold in a crash. The lump sum is control and flexibility: investable, inheritable, available for big one-time needs. Family longevity, your health, whether a spouse needs survivor benefits, and how much of your plan already depends on markets should all weigh more than the breakeven year.",
      },
      {
        type: "h2",
        content: "COLA vs non-COLA: inflation quietly eats the fixed check",
      },
      {
        type: "p",
        content:
          "A pension with a cost-of-living adjustment keeps its purchasing power. A fixed nominal pension melts. At 3% annual inflation, a $20,000 non-COLA check is worth about $9,600 in today's purchasing power after 25 years — less than half. Over a 30-year retirement, inflation is not a footnote; it is the dominant force acting on a fixed pension.",
      },
      {
        type: "p",
        content:
          "If your pension has no COLA, model it with a haircut: either reduce the annual amount in later years or treat the pension as covering a shrinking share of spending, with the portfolio picking up the difference. Many “COLA” pensions are capped at 2–3% a year — better than nothing, but still a slow leak when inflation runs hotter. Illustrative: a 2% capped COLA against 3% inflation erodes about 1% of purchasing power a year, which compounds to roughly a 22% loss over 25 years. Check the actual formula in your plan documents, not the brochure summary.",
      },
      {
        type: "h2",
        content: "Pensions lower your coast number too",
      },
      {
        type: "p",
        content:
          "The pension does not just shrink the full-retirement target — it shrinks the coast number. Run the coast formula on the post-pension gap instead of full spending. A 40-year-old with the $60,000 lifestyle and $20,000 pension at 60 faces a $40,000 gap from 60 on — a $1,000,000 target at 4%. With 20 years to 60 at 5% real, the coast number is $1,000,000 ÷ (1.05)^20 ≈ $377,000. Without the pension it would be $565,000. Same age, same lifestyle, $188,000 less required today — that is what an income floor buys you.",
      },
      {
        type: "h2",
        content: "Electing survivor benefits",
      },
      {
        type: "p",
        content:
          "If the pension covers a household, you will usually choose between a single-life payout (bigger check, stops when you die) and a joint-and-survivor option (smaller check, continues for your spouse). The survivor election typically trims the check by something like 10–20% — meaningful money every year for decades. There is no formula that settles it: weigh the spouse's independent income, the size of the portfolio gap without the pension, and family longevity. A pension that dies with the first spouse is a floor with an expiration date the plan never advertised.",
      },
      {
        type: "h2",
        content: "Don't double-count, don't ignore taxes",
      },
      {
        type: "ul",
        content: [
          "Count the pension once: either as subtracted income or as present value, never both in the same calculation.",
          "Pension income is generally taxable as ordinary income — your $20,000 check is not $20,000 of spending power.",
          "Pension income can push you into higher Medicare premium brackets (IRMAA) and affect Roth conversion headroom in your 60s.",
          "If both spouses have pensions with survivor options, model the survivor benefit, not the full joint amount, for the second-to-die horizon.",
          "Vesting matters: an unvested or partially vested benefit is a hope, not a floor.",
        ],
      },
      {
        type: "h2",
        content: "Stacking a pension with Social Security",
      },
      {
        type: "p",
        content:
          "Many households end up with two floors: a pension and, later, Social Security. Model them as sequential phases, each shrinking the portfolio gap. Take the $60,000 spender retiring at 50 with a $20,000 pension starting at 60 and $24,000 of Social Security starting at 67: ages 50–60 need the full $60,000 from the portfolio, ages 60–67 need $40,000, and from 67 on the gap is just $16,000 — about $400,000 at a 4% withdrawal rate for the tail. The tail is cheap; the bridge is expensive. That sequencing is the whole game.",
      },
      {
        type: "h2",
        content: "What the lump sum earns if you invest it",
      },
      {
        type: "p",
        content:
          "The raw 12.5-year breakeven ignores what the lump sum could earn. Illustrative: invest the $250,000 at 4% real and it funds $20,000 annual withdrawals for about 17.7 years — comfortably past the raw breakeven. That cuts toward the lump sum, but only if you actually earn the return, never raid the principal for other goals, and are comfortable holding the longevity risk yourself. The annuity's edge was never the breakeven year; it is the guarantee that the checks continue at 85 and 95 no matter what markets did.",
      },
      {
        type: "p",
        content:
          "Size the bridge the same honest way. Ten years at $60,000 is $600,000 of cumulative spending, but you do not need $600,000 on day one — later years' spending is still compounding in the meantime. At 4% real, the present value of that ten-year bridge is about $487,000. Discounting the bridge keeps you from over-saving for it, just as discounting the pension keeps you from over-counting it.",
      },
      {
        type: "h2",
        content: "FAQ",
      },
      {
        type: "ul",
        content: [
          "Q: Should I include a pension I won't get for 20 years? A: Yes, discounted appropriately — but keep it out of the bridge-phase math entirely.",
          "Q: Is a pension worth more than its lump sum offer? A: Sometimes. Compare the implied payout rate against annuity market rates and your own longevity expectations; there is no universal answer.",
          "Q: What if my employer is shaky? A: Private pensions carry sponsor risk backstopped partly by the PBGC up to limits; public pensions carry political risk. Discount for uncertainty you cannot diversify away.",
          "Q: Does a pension change my safe withdrawal rate? A: It changes the amount the rate applies to, which usually matters more. A smaller gap means the same rate is safer in practice.",
          "Q: Can I coast earlier because of a pension? A: Often yes — run the Coast FIRE calculator on the post-pension gap rather than full spending, and watch the coast number drop.",
        ],
      },
      {
        type: "p",
        content:
          "Educational illustration only — not financial, tax, or investment advice. Pension formulas vary widely; verify yours against the actual plan documents. Model the income-subtraction version of your numbers in the FIRE number calculator and read the Methodology page for the formulas used here.",
      },
    ],
  },
];
