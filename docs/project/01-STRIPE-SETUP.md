# Stripe Setup

1. In Stripe, create recurring monthly ($9) and annual ($79) prices plus a one-time report price ($19).
2. Copy `.env.example` to `.env.local` and add the secret key and three `price_...` IDs. RetireFire redirects to server-created Checkout Sessions, so it does not need a browser-exposed publishable key.
3. Create a webhook endpoint for `https://retirefire.net/api/stripe/webhook` subscribing to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Put the endpoint signing secret in `STRIPE_WEBHOOK_SECRET`.
5. For local testing, forward events with `stripe listen --forward-to localhost:3000/api/stripe/webhook` and use the printed signing secret.

## Accounts and durable access

Set `DATABASE_URL` (or `POSTGRES_URL`) to a production PostgreSQL database, then apply `db/schema.sql` before enabling checkout. Checkout requires an authenticated RetireFire account and records the user ID in Stripe metadata. Webhooks persist entitlements and deduplicate event IDs. The Account page can recover prior purchases by matching the signed-in email against completed Stripe Checkout sessions.

Use Stripe test-mode values before production. The Checkout route reads prices from Stripe IDs rather than trusting browser-provided amounts. The webhook verifies the raw request body and `stripe-signature` before processing events.

The handlers persist normalized lifecycle state. The success page independently retrieves the Checkout Session from Stripe before showing a confirmed purchase. Stripe remains the billing source of truth.
