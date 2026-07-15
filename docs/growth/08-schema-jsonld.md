# JSON-LD Schema Reference — RetireFire

Implemented in `src/lib/seo.ts` and used via `JsonLd` component.

---

## Already live

| Type | Where |
|------|--------|
| `WebSite` | Homepage |
| `WebApplication` | Homepage |
| `FAQPage` | Homepage FAQ |
| `SoftwareApplication` | Calculator pages (via page layouts) |
| `BlogPosting` | Blog posts |
| `BreadcrumbList` | Where wired |

---

## Calculator page pattern (SoftwareApplication)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Coast FIRE Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "url": "https://retirefire.net/calculators/coast-fire",
  "description": "Free Coast FIRE calculator with transparent discount formula…",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "isAccessibleForFree": true,
  "provider": {
    "@type": "Organization",
    "name": "RetireFire",
    "url": "https://retirefire.net"
  }
}
```

Optional enhancement (not required for MVP):

```json
{
  "@type": "SoftwareApplication",
  "featureList": [
    "Coast number",
    "Shareable URL state",
    "CSV export",
    "Real vs nominal returns"
  ]
}
```

---

## FAQ page pattern

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Coast FIRE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coast FIRE means…"
      }
    }
  ]
}
```

Per-calculator FAQ blocks can reuse `faqPageJsonLd()` on tool landing pages for long-tail rich results.

---

## Approach page (optional WebPage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Our Approach, Limitations & Roadmap",
  "url": "https://retirefire.net/approach",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://retirefire.net"
  }
}
```

---

## Validation

1. Deploy  
2. [Rich Results Test](https://search.google.com/test/rich-results) on `/`, `/calculators/coast-fire`, `/blog/...`  
3. Search Console → Enhancements after indexing  
