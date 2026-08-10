import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";

export const runtime = "nodejs";

function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Entitlement persistence can be added here when RetireFire adds user accounts.
  console.info("Stripe checkout completed", {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
    plan: session.metadata?.plan,
  });
}

function handleSubscriptionChanged(subscription: Stripe.Subscription) {
  // Keep this hook as the single place to synchronize subscription access.
  console.info("Stripe subscription changed", {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    plan: subscription.metadata.plan,
  });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Invalid Stripe webhook signature", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      handleCheckoutCompleted(event.data.object);
      break;
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      handleSubscriptionChanged(event.data.object);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
