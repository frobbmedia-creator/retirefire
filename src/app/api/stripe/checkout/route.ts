import { NextResponse } from "next/server";
import { getStripePriceId, isStripePlanId, STRIPE_PLANS } from "@/lib/stripe/config";
import { getStripe } from "@/lib/stripe/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: unknown };

    if (!isStripePlanId(body.plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const planId = body.plan;
    const plan = STRIPE_PLANS[planId];
    const origin = new URL(request.url).origin;
    const session = await getStripe().checkout.sessions.create({
      mode: plan.mode,
      line_items: [{ price: getStripePriceId(planId), quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_creation: plan.mode === "payment" ? "always" : undefined,
      metadata: { plan: planId },
      subscription_data:
        plan.mode === "subscription" ? { metadata: { plan: planId } } : undefined,
      success_url: `${origin}/pro?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pro?checkout=cancelled`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout Session", error);
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable." },
      { status: 500 },
    );
  }
}
