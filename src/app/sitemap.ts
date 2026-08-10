import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPosts } from "@/content/blog/posts";
import { DECISION_PAGES } from "@/content/decision-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const launched = new Date("2026-07-01");
  const resourcesUpdated = new Date("2026-07-15");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: resourcesUpdated, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/calculators`,
      lastModified: resourcesUpdated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/retirement-checkup`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.98,
    },
    {
      url: `${base}/calculators/fire-number`,
      lastModified: resourcesUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/calculators/years-to-fire`,
      lastModified: resourcesUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/calculators/coast-fire`,
      lastModified: resourcesUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/calculators/barista-fire`,
      lastModified: resourcesUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/calculators/two-phase-coast`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/calculators/couples-fire`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...[
      "retirement-age",
      "portfolio-readiness",
      "withdrawal-guardrails",
      "roth-conversion",
      "healthcare-budget",
    ].map((slug) => ({
      url: `${base}/calculators/${slug}`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/pro`,
      lastModified: new Date("2026-08-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/methodology`,
      lastModified: launched,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/approach`,
      lastModified: resourcesUpdated,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/resources`,
      lastModified: resourcesUpdated,
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${base}/guides`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/research`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${base}/resources/coast-fire-checklist`,
      lastModified: resourcesUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/resources/sequence-risk-guide`,
      lastModified: resourcesUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/disclaimer`,
      lastModified: launched,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const decisionPages = DECISION_PAGES.map((page) => ({
    url: `${base}/${page.slug}`,
    lastModified: new Date(page.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  return [...staticRoutes, ...decisionPages, ...posts];
}
