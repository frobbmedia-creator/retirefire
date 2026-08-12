# Customer Support Email Design

## Goal

Make `support@retirefire.net` easy to find wherever a customer is likely to need help, without adding a support form, ticket database, or new personal-data collection.

## Customer experience

- The global footer includes a visible **Support** email link.
- The Account page includes the support email near purchase recovery and billing controls.
- The purchase-confirmation page tells customers where to ask for purchase help.
- The Refund and Cancellation Policy directs requests to the support email instead of the feedback widget.
- Every link opens the customer’s email application using `mailto:support@retirefire.net`.

## Implementation

Define the address once as `SITE.supportEmail` in the existing site constants. Render that value in the footer and the three relevant pages. Do not add a contact form, automated responder, API route, database table, or third-party support service.

## Error handling and privacy

Email delivery is handled by Porkbun forwarding. The website stores no message contents. If a visitor has no configured email application, the visible address remains copyable.

## Verification

- Add a source-level test that checks all required customer locations use the canonical support address.
- Run that test before and after implementation to demonstrate the intended failure and success.
- Run lint, TypeScript, existing calculation tests, and the production build.
- After deployment, verify the public pages render successfully and the links contain the correct address.

## Out of scope

- AI assistance
- Ticketing or help-desk software
- Password-reset and email-verification flows
- Changing Stripe settings
- Configuring outbound mail delivery
