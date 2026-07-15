export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  /** Simple paragraphs + optional headings for MVP (no MDX dependency) */
  body: Array<{ type: "p" | "h2" | "ul"; content: string | string[] }>;
};

export const BLOG_POSTS: BlogPost[] = [
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
          "Try the free FIRE Number calculator on RetireFire, then stress-test withdrawal rates on the Methodology page.",
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
          "Use the Coast FIRE calculator to compare shortfall vs surplus under conservative returns. When in doubt, lower r and extend your horizon.",
      },
    ],
  },
  {
    slug: "barista-fire-and-semi-retirement",
    title: "Barista FIRE and semi-retirement",
    description:
      "How part-time income changes the portfolio you need — and what the model leaves out.",
    date: "2026-07-10",
    readingMinutes: 5,
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
        ],
      },
      {
        type: "h2",
        content: "Model limitations",
      },
      {
        type: "p",
        content:
          "Simple calculators do not capture job reliability, benefit cliffs, self-employment taxes, or how spending changes when you have more free time. Treat Barista FIRE numbers as a planning conversation starter, not a paycheck replacement plan.",
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
