import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
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
