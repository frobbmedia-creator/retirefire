# RetireFire

Evidence-based FIRE (Financial Independence, Retire Early) calculators — clean, transparent, and free.

**Site:** [retirefire.net](https://retirefire.net)

## Features

### Calculators
- **FIRE Number** — Lean / Regular / Fat presets + adjustable withdrawal rate
- **Years to FIRE** — Portfolio path with SVG growth chart
- **Coast FIRE** — Nest egg that can grow alone to full FIRE by a chosen age
- **Barista FIRE** — Semi-retirement: work income shrinks the target
- **Savings-rate table** — Years to FI across savings rates

### Product polish
- **Shared assumptions** across every tool (one source of truth)
- **Shareable URL state** — copy link with your scenario encoded
- **Real / nominal return toggle** with inflation conversion
- **Mobile-first** money inputs (numeric keyboard, larger tap targets)
- **Methodology** + strong **disclaimer** + **FAQ** (JSON-LD)
- **Blog** skeleton with 3 educational posts
- **Dedicated landing pages** under `/calculators/*`
- **OG / Twitter image** via `opengraph-image.tsx`
- **Vercel Analytics** (privacy-friendly, no cookies)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- `@vercel/analytics`
- Lightweight shadcn-style UI (no heavy chart library)

## Local development

```bash
cd retirefire
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
npm run lint
npm run test:calc   # pure math sanity checks
```

## Project structure

```
src/
  app/                   # Routes, OG image, sitemap, robots
  components/
    calculators/         # FIRE tools + hub
    planner/             # Shared state, assumptions bar, URL sync
    home/                # Hero, FAQ, trust
    layout/              # Navbar, footer
    ui/                  # Input, chart, money-input, …
  content/blog/          # Blog posts (typed content)
  lib/
    calculations.ts      # Pure financial math
    planner-state.ts     # URL serialization
    constants.ts
```

## Core formulas

| Tool | Formula |
|------|---------|
| FIRE number | `spending ÷ withdrawal_rate` |
| Years to FIRE | Solve `T = P(1+r)^n + C((1+r)^n−1)/r` for `n` |
| Coast number | `FIRE ÷ (1+r)^years` |
| Barista number | `max(0, expenses − work income) ÷ withdrawal_rate` |
| Nominal → real | `(1+nom)/(1+inf) − 1` |

Defaults: **4%** withdrawal, **5%** real return. Details: `/methodology`.

## Deploy

See **[DEPLOY.md](./DEPLOY.md)** for GitHub → Vercel → `retirefire.net` DNS, analytics, and Lighthouse checklist.

```bash
# After GitHub remote exists:
git push origin main
# Then import repo in Vercel and attach domain
```

## Principles

1. Accuracy and clarity over gimmicks  
2. Transparent assumptions  
3. Mobile-first, dark, professional UI  
4. Educational, non-salesy  

## License

Private / TBD — add a license before open-sourcing.
