import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import type Stripe from "stripe";

/**
 * POST /api/stripe/webhook
 * Handles checkout.session.completed, customer.subscription.updated/deleted.
 * Stripe remains the billing source of truth. Access is revalidated against
 * Checkout Sessions and subscription status on protected requests.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 503 },
    );
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email =
          session.customer_details?.email ||
          session.customer_email ||
          undefined;
        const plan = session.metadata?.plan;
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        console.info("[stripe/webhook] checkout.session.completed", {
          sessionId: session.id,
          email,
          plan,
          customerId,
          mode: session.mode,
        });
        break;
      }

      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.info(`[stripe/webhook] ${event.type}`, {
          sessionId: session.id,
          plan: session.metadata?.plan,
          paymentStatus: session.payment_status,
        });
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

        console.info(`[stripe/webhook] ${event.type}`, {
          subscriptionId: sub.id,
          customerId,
          status: sub.status,
          plan: sub.metadata?.plan,
        });
        break;
      }

      case "invoice.paid":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.info(`[stripe/webhook] ${event.type}`, {
          invoiceId: invoice.id,
          customerId:
            typeof invoice.customer === "string"
              ? invoice.customer
              : invoice.customer?.id,
          status: invoice.status,
        });
        break;
      }

      default:
        console.info(`[stripe/webhook] unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] handler error", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
