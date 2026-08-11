/**
 * Stripe configuration for RetireFire Pro.
 *
 * Required environment variables (Vercel + local .env.local):
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 * - STRIPE_PRICE_ID_MONTHLY
 * - STRIPE_PRICE_ID_ANNUAL
 * - STRIPE_PRICE_ID_REPORT (optional one-time PDF unlock)
 */

export const STRIPE_PLANS = {
  monthly: {
    id: "monthly" as const,
    name: "RetireFire Pro \u2014 Monthly",
    priceDisplay: "$9/mo",
    mode: "subscription" as const,
    envPriceId: "STRIPE_PRICE_ID_MONTHLY",
  },
  annual: {
    id: "annual" as const,
    name: "RetireFire Pro \u2014 Annual",
    priceDisplay: "$79/yr",
    mode: "subscription" as const,
    envPriceId: "STRIPE_PRICE_ID_ANNUAL",
    recommended: true,
  },
  report: {
    id: "report" as const,
    name: "RetireFire Deep Report (one-time)",
    priceDisplay: "$19",
    mode: "payment" as const,
    envPriceId: "STRIPE_PRICE_ID_REPORT",
  },
} as const;

export type PlanId = keyof typeof STRIPE_PLANS;

export function getPriceId(plan: PlanId): string | undefined {
  const key = STRIPE_PLANS[plan].envPriceId;
  return process.env[key];
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
