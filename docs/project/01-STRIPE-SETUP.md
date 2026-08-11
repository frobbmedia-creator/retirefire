# Stripe Setup

1. In Stripe, create recurring monthly ($9) and annual ($79) prices plus a one-time report price ($19).
2. Copy `.env.example` to `.env.local` and add the secret key and three `price_...` IDs. RetireFire redirects to server-created Checkout Sessions, so it does not need a browser-exposed publishable key.
3. Create a webhook endpoint for `https://retirefire.net/api/stripe/webhook` subscribing to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Put the endpoint signing secret in `STRIPE_WEBHOOK_SECRET`.
5. For local testing, forward events with `stripe listen --forward-to localhost:3000/api/stripe/webhook` and use the printed signing secret.

Use Stripe test-mode values before production. The Checkout route reads prices from Stripe IDs rather than trusting browser-provided amounts. The webhook verifies the raw request body and `stripe-signature` before processing events.

The current handlers log normalized lifecycle details. Connect them to the account/entitlement store when authentication is introduced. Production fulfillment should record processed Stripe event IDs so retries are idempotent.
