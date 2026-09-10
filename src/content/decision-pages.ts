import { septBoostPages } from "@/content/decision-boost-2026-09";
import { retireAtPage, portfolioPage } from "@/content/decision-factories";
import { evergreenPages } from "@/content/decision-evergreen";
import { researchPages } from "@/content/decision-research";
import type { DecisionPage } from "@/content/decision-shared";

export type { DecisionPage, DecisionTable } from "@/content/decision-shared";

export const DECISION_PAGES: DecisionPage[] = [
  retireAtPage(40),
  retireAtPage(45),
  retireAtPage(50),
  retireAtPage(55),
  retireAtPage(60),
  ...septBoostPages,
  portfolioPage(500_000),
  portfolioPage(750_000),
  portfolioPage(1_000_000),
  portfolioPage(1_500_000),
  portfolioPage(2_000_000),
  portfolioPage(3_000_000),
  ...evergreenPages,
  ...researchPages,
];

export function getDecisionPage(slug: string): DecisionPage | undefined {
  return DECISION_PAGES.find((page) => page.slug === slug);
}
