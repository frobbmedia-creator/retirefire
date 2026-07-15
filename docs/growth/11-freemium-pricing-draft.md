# Freemium Feature Matrix & Pricing Page Draft

**Status:** Design draft only — **requires user approval** before implementation (Phase 4).  
**Integrity rule:** Core calculators + basic stress test remain free forever.

---

## Feature matrix

| Capability | Free | Pro |
|------------|------|-----|
| FIRE Number, Years, Coast, Barista | ✓ | ✓ |
| Shared assumptions + share URL | ✓ | ✓ |
| CSV export | ✓ | ✓ |
| Methodology / Approach / Blog | ✓ | ✓ |
| Basic stress test (e.g. 1,000 paths, fixed σ) | ✓ | ✓ |
| Advanced MC (5k–10k paths, seed control) | — | ✓ |
| Regime / crash toggles | — | ✓ |
| Saved scenarios + history | — | ✓ |
| Detailed PDF report | Watermarked optional | Clean branded |
| Custom assumption profiles | Limited | Full |
| Tax / SS modules (when built) | — | ✓ |
| Priority feature input | — | ✓ |

---

## Pricing tests (propose A/B)

| Plan | Price | Positioning |
|------|-------|-------------|
| **A — Monthly** | $7–9/mo | Low friction trial mindset |
| **B — Annual** | $69–99/yr | Best value (~2 months free) |
| **C — Report unlock** | $9–19 one-time | PDF / deep report without subscription |

**Recommendation to test first:** Annual $79 + monthly $9, with clear free tier table. One-time report as secondary CTA.

---

## Pricing page copy (draft)

### Headline
**Tools that stay honest — upgrade only when you need depth**

### Subhead
Core FIRE calculators and a useful stress test stay free. Pro adds advanced paths, saved scenarios, and detailed reports — still educational, still transparent.

### Free forever
- All primary calculators  
- Share links & CSV  
- Basic sequence stress test  
- Full methodology  

### Pro
- Higher path counts & regimes  
- Saved scenarios  
- Detailed PDF reports  
- Roadmap modules (tax/SS) as they ship  

### Trust line
Not financial advice. No guaranteed outcomes. Cancel anytime (if subscription).

### CTA
Start free → Open calculators  
Optional: Start Pro trial (when live)

---

## Stripe / feature flags (technical guidance)

1. **Auth:** Clerk/Auth.js or magic-link — minimal surface.  
2. **Stripe Checkout** for subscriptions + Customer Portal for cancel.  
3. **Feature flags:** `user.plan === 'pro'` server-checked for saved scenarios; client flag only for UI labels.  
4. **Never** trust client-only gates for paid data.  
5. Env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY`, `NEXT_PUBLIC_STRIPE_PRICE_YEARLY`.  
6. Webhook: `checkout.session.completed`, `customer.subscription.updated|deleted`.  

---

## Approval checklist (user)

- [ ] Free forever list confirmed  
- [ ] Price points chosen  
- [ ] Monthly vs annual vs one-time mix  
- [ ] Stripe account ready  
- [ ] Legal review of pricing claims (optional but wise)  
