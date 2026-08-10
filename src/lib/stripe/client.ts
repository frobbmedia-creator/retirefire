import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  stripeClient ??= new Stripe(secretKey, {
    appInfo: { name: "RetireFire", version: "0.1.0" },
  });

  return stripeClient;
}
