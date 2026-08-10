export const STRIPE_PLANS = {
  monthly: {
    name: "RetireFire Pro Monthly",
    price: 9,
    priceEnv: "STRIPE_PRICE_ID_MONTHLY",
    mode: "subscription",
  },
  annual: {
    name: "RetireFire Pro Annual",
    price: 79,
    priceEnv: "STRIPE_PRICE_ID_ANNUAL",
    mode: "subscription",
  },
  report: {
    name: "RetireFire Pro Report",
    price: 19,
    priceEnv: "STRIPE_PRICE_ID_REPORT",
    mode: "payment",
  },
} as const;

export type StripePlanId = keyof typeof STRIPE_PLANS;

export function isStripePlanId(value: unknown): value is StripePlanId {
  return typeof value === "string" && value in STRIPE_PLANS;
}

export function getStripePriceId(planId: StripePlanId): string {
  const plan = STRIPE_PLANS[planId];
  const priceId = process.env[plan.priceEnv]?.trim();

  if (!priceId) {
    throw new Error(`${plan.priceEnv} is not configured`);
  }

  return priceId;
}
