# Arya 21-Day Series — Deployment Plan

**Shipped:** 2026-08-20 (Oracle full plan execution)

## Assets

- Google Drive: `Retirefire / retirefire-21day-arya/` (all 21 mp4s + copy.json + SERIES_MANIFEST.json + square/ + transcripts/)
- On-site hub: `/series/arya-21-day` (live after this deploy)
- Social captions: ready in Drive `copy.json` (FB + X for every day)

## Priority clips for ads / homepage embeds (next)

1. D01 Hero
2. D15 Monte Carlo
3. D16 Sequence Risk
4. D04 4% Rule
5. D08 Coast FIRE
6. D21 Full Stack Recap

Host clips on a CDN or public Drive links before embedding `<video>` on homepage to keep Core Web Vitals clean.

## Social cadence

- Use existing scheduler scripts in the Drive folder when accounts are owned.
- Lead with D01, D04, D08, D15, D16 on X + FB RetireFire page.
- Always CTA to matching calculator URL from the series page.

## SEO

- Series page in sitemap at priority 0.88
- Footer Learn link
- Each day links to money URLs (checkup, coast, barista, sequence guide, methodology)
- Request indexing on `/series/arya-21-day` after deploy

## Owner actions still open

- [ ] GSC: request indexing on `/series/arya-21-day` + remaining money URLs
- [ ] Publish square cuts to Reels/Shorts when ready
- [ ] Optional: upload top 6 clips to Vercel Blob / R2 and wire `<video>` on homepage + series page
