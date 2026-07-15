import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function absoluteUrl(path = "/"): string {
  const base = `https://${SITE.domain}`;
  if (!path || path === "/") return base;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Merge page metadata with self-canonical and openGraph.url (no query params). */
export function pageMeta(path: string, meta: Metadata = {}): Metadata {
  const url = absoluteUrl(path);
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: url,
    },
    openGraph: {
      ...meta.openGraph,
      url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: absoluteUrl("/"),
    },
  };
}

export function webApplicationJsonLd(opts?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts?.name ?? SITE.name,
    url: opts?.url ?? absoluteUrl("/"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: opts?.description ?? SITE.description,
    isAccessibleForFree: true,
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function softwareApplicationJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: absoluteUrl(opts.path),
    description: opts.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: absoluteUrl("/"),
    },
  };
}

export function blogPostingJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  date: string;
  readingMinutes?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(opts.path),
    },
    url: absoluteUrl(opts.path),
    isAccessibleForFree: true,
    ...(opts.readingMinutes
      ? { timeRequired: `PT${opts.readingMinutes}M` }
      : {}),
  };
}

export function faqPageJsonLd(
  items: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
