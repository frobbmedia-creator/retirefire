import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { shouldShowQuickYears } from "../components/home/HomeQuickCalculator";
import { DECISION_PAGES } from "./decision-pages";

assert.ok(DECISION_PAGES.length >= 15, "expected at least 15 decision pages");

const slugs = new Set<string>();
const titles = new Set<string>();
const descriptions = new Set<string>();

for (const page of DECISION_PAGES) {
  assert.match(page.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${page.slug}: invalid slug`);
  assert.ok(!slugs.has(page.slug), `${page.slug}: duplicate slug`);
  assert.ok(!titles.has(page.title), `${page.slug}: duplicate title`);
  assert.ok(
    !descriptions.has(page.description),
    `${page.slug}: duplicate description`,
  );
  assert.ok(page.description.length >= 100, `${page.slug}: description too short`);
  assert.ok(page.intro.length >= 2, `${page.slug}: missing distinct introduction`);
  assert.ok(page.sections.length >= 3, `${page.slug}: needs at least three sections`);
  assert.ok(page.faq.length >= 3, `${page.slug}: needs at least three visible FAQs`);
  assert.ok(page.related.length >= 3, `${page.slug}: insufficient internal links`);

  for (const section of page.sections) {
    assert.ok(
      Boolean(section.paragraphs?.length || section.bullets?.length || section.table),
      `${page.slug}/${section.heading}: empty section`,
    );
  }

  if (page.download) {
    assert.ok(
      existsSync(join(process.cwd(), "public", page.download.href)),
      `${page.slug}: missing download ${page.download.href}`,
    );
  }

  slugs.add(page.slug);
  titles.add(page.title);
  descriptions.add(page.description);
}

console.log(`All ${DECISION_PAGES.length} decision-page checks passed.`);

const PROHIBITED_CLAIMS = [
  "safe retirement",
  "irs-approved calculator",
  "probability of future success",
] as const;

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectSourceFiles(full, acc);
      continue;
    }
    if (/\.(?:tsx?|jsx?)$/.test(entry)) acc.push(full);
  }
  return acc;
}

function hasUnnegatedGuaranteed(text: string): boolean {
  const pattern = /guaranteed/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    const before = text.slice(Math.max(0, match.index - 24), match.index);
    if (!/(?:^|[^A-Za-z])(?:not|never|no|without)\s+$/i.test(before)) {
      return true;
    }
  }
  return false;
}

const workspaceRoot = process.cwd();
const calculatorCopyFiles = [
  ...collectSourceFiles(join(workspaceRoot, "src/app/calculators")),
  ...collectSourceFiles(join(workspaceRoot, "src/components/calculators")),
  join(workspaceRoot, "src/content/calculator-seo.ts"),
  join(workspaceRoot, "src/components/home/HomeQuickCalculator.tsx"),
];

for (const file of calculatorCopyFiles) {
  assert.ok(existsSync(file), `missing calculator copy file ${file}`);
  const text = readFileSync(file, "utf8");
  const lower = text.toLowerCase();
  const label = relative(workspaceRoot, file);
  for (const phrase of PROHIBITED_CLAIMS) {
    assert.ok(
      !lower.includes(phrase),
      `${label}: calculator copy must not claim “${phrase}”`,
    );
  }
  assert.ok(
    !hasUnnegatedGuaranteed(text),
    `${label}: calculator copy must not use an unnegated “guaranteed” claim`,
  );
}

const layoutPath = join(
  workspaceRoot,
  "src/components/calculators/CalculatorPageLayout.tsx",
);
const layoutSource = readFileSync(layoutPath, "utf8");
const seoMarker = layoutSource.lastIndexOf("<CalculatorSeoSection");
assert.ok(seoMarker >= 0, "CalculatorPageLayout must still render CalculatorSeoSection");
const resultsRegion = layoutSource.slice(0, seoMarker);
assert.match(
  resultsRegion,
  /\/methodology/,
  "Assumptions and methodology links must appear adjacent to consequential calculator results, not only after the SEO article.",
);
assert.match(
  resultsRegion,
  /FailureModes/,
  "Evidence-linked FailureModes must sit adjacent to calculator results.",
);

const failureModesPath = join(
  workspaceRoot,
  "src/components/calculators/FailureModes.tsx",
);
assert.ok(
  existsSync(failureModesPath),
  "FailureModes.tsx is required for calculator-page risk education.",
);
const failureModes = readFileSync(failureModesPath, "utf8");
for (const mode of [
  "healthcare",
  "housing",
  "sequence",
  "tax",
  "longevity",
  "lifestyle",
] as const) {
  assert.match(
    failureModes,
    new RegExp(mode, "i"),
    `FailureModes must include the ${mode} risk mode`,
  );
}
assert.match(
  failureModes,
  /\/resources\/sequence-risk-guide/,
  "Sequence failure mode must link the existing sequence-risk guide",
);
assert.match(
  failureModes,
  /\/methodology/,
  "FailureModes must keep an adjacent methodology link",
);

const homeQuick = readFileSync(
  join(workspaceRoot, "src/components/home/HomeQuickCalculator.tsx"),
  "utf8",
);
assert.match(
  homeQuick,
  /\/methodology/,
  "Homepage quick-calculator results need an adjacent methodology link.",
);
assert.match(
  homeQuick,
  /MoneyInput/,
  "Homepage quick calculator must reuse MoneyInput.",
);

assert.equal(
  typeof shouldShowQuickYears,
  "function",
  "shouldShowQuickYears helper is required so years stay gated on real planner inputs",
);
assert.equal(
  shouldShowQuickYears({
    currentPortfolio: undefined,
    annualContribution: undefined,
    annualReturn: undefined,
    targetAmount: 1_500_000,
  }),
  false,
  "years must stay hidden when only spending/withdrawal produce a FIRE target",
);
assert.equal(
  shouldShowQuickYears({
    currentPortfolio: 0,
    annualContribution: 0,
    annualReturn: 0.05,
    targetAmount: 1_500_000,
  }),
  false,
  "years must stay hidden when portfolio and contribution are both zero",
);
assert.equal(
  shouldShowQuickYears({
    currentPortfolio: 200_000,
    annualContribution: 0,
    annualReturn: 0.05,
    targetAmount: 1_500_000,
  }),
  true,
);
assert.equal(
  shouldShowQuickYears({
    currentPortfolio: 0,
    annualContribution: 30_000,
    annualReturn: 0.05,
    targetAmount: 1_500_000,
  }),
  true,
);
assert.equal(
  shouldShowQuickYears({
    currentPortfolio: 200_000,
    annualContribution: 30_000,
    annualReturn: Number.NaN,
    targetAmount: 1_500_000,
  }),
  false,
);

console.log("Calculator-page content invariants passed.");
