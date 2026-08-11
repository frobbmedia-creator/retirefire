import { NextResponse } from "next/server";
import {
  getPriceId,
  isStripeConfigured,
  STRIPE_PLANS,
  type PlanId,
} from "@/lib/stripe/config";
import { getStripe } from "@/lib/stripe/client";

/**
 * POST /api/stripe/checkout
 * Body: { plan: "monthly" | "annual" | "report", successUrl?: string, cancelUrl?: string }
 */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY, publishable key, and price IDs in environment variables.",
      },
      { status: 503 },
    );
  }

  let body: { plan?: string; successUrl?: string; cancelUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const plan = body.plan as PlanId | undefined;
  if (!plan || !(plan in STRIPE_PLANS)) {
    return NextResponse.json(
      { error: "plan must be monthly, annual, or report" },
      { status: 400 },
    );
  }

  const priceId = getPriceId(plan);
  if (!priceId) {
    return NextResponse.json(
      { error: `Price ID for plan "${plan}" is not set in env` },
      { status: 503 },
    );
  }

  const planConfig = STRIPE_PLANS[plan];
  const origin = new URL(request.url).origin;
  const successUrl =
    body.successUrl ??
    `${origin}/pro?success=1&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = body.cancelUrl ?? `${origin}/pro?canceled=1`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: planConfig.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan,
        product: "retirefire_pro",
      },
      ...(planConfig.mode === "subscription"
        ? {
            subscription_data: {
              metadata: { plan, product: "retirefire_pro" },
            },
          }
        : {}),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
