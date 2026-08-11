import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * Only import this in API routes / server components.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, {
    apiVersion: "2025-08-27.basil",
    typescript: true,
  });
}
