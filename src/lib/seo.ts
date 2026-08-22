import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function absoluteUrl(path = "/"): string {
  const base = `https://${SITE.domain}`;
  if (!path || path === "/") return base;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/**
 * Merge page metadata with self-canonical, openGraph.url, and Twitter cards.
 * Ensures twitter:title / twitter:description match the page (not root layout defaults)
 * and that og/twitter images default to /og.png so link preview cards never render blank.
 */
export function pageMeta(path: string, meta: Metadata = {}): Metadata {
  const url = absoluteUrl(path);

  const ogTitle =
    typeof meta.openGraph?.title === "string"
      ? meta.openGraph.title
      : typeof meta.title === "string"
        ? `${meta.title} · ${SITE.name}`
        : undefined;

  const ogDescription =
    typeof meta.openGraph?.description === "string"
      ? meta.openGraph.description
      : typeof meta.description === "string"
        ? meta.description
        : undefined;

  const existingTwitter =
    typeof meta.twitter === "object" && meta.twitter !== null
      ? meta.twitter
      : {};

  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical: url,
    },
    openGraph: {
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${SITE.name} — free FIRE calculators`,
        },
      ],
      ...meta.openGraph,
      url,
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
      ...existingTwitter,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
    },
  };
}
