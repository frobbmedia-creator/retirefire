import { calculateFireNumber } from "@/lib/calculations";

export type DecisionTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type DecisionPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  datePublished: string;
  dateModified: string;
  intro: string[];
  takeaway: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    table?: DecisionTable;
  }>;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
  calculatorHref: string;
  calculatorLabel: string;
  embeddedIncomeCalculator?: boolean;
  download?: { href: string; label: string };
};

export const published = "2026-08-12";
export const expanded = "2026-08-20";
export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const swrTable = (annualSpending: number): DecisionTable => ({
  caption: `${money.format(annualSpending)} annual spending at common planning withdrawal rates`,
  headers: ["Planning withdrawal rate", "Portfolio multiple", "Portfolio target"],
  rows: [0.03, 0.035, 0.04].map((rate) => {
    const result = calculateFireNumber({
      annualExpenses: annualSpending,
      withdrawalRate: rate,
    });
    return [
      `${(rate * 100).toFixed(rate === 0.035 ? 1 : 0)}%`,
      `${result.multiplier.toFixed(1)}×`,
      money.format(result.fireNumber),
    ];
  }),
});
