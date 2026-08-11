import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { getStripe } from "@/lib/stripe/client";
import type { PlanId } from "@/lib/stripe/config";

export const ENTITLEMENT_COOKIE = "retirefire_entitlement";

export type EntitlementPayload = {
  plan: PlanId;
  sessionId: string;
  customerId?: string;
  subscriptionId?: string;
  exp: number;
};

function secret(): string {
  const value =
    process.env.ENTITLEMENT_SIGNING_SECRET || process.env.STRIPE_SECRET_KEY;
  if (!value) throw new Error("Entitlement signing is not configured");
  return value;
}

function signature(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function signEntitlement(payload: EntitlementPayload): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

export function verifyEntitlement(
  token: string | undefined,
): EntitlementPayload | null {
  if (!token) return null;
  const [encoded, supplied] = token.split(".");
  if (!encoded || !supplied) return null;
  const expected = signature(encoded);
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as EntitlementPayload;
    if (!payload.sessionId || !payload.plan || payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function validateEntitlement(payload: EntitlementPayload) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(payload.sessionId, {
    expand: ["subscription"],
  });
  if (
    session.metadata?.product !== "retirefire_pro" ||
    session.metadata?.plan !== payload.plan ||
    !["paid", "no_payment_required"].includes(session.payment_status)
  ) {
    return null;
  }

  if (payload.plan !== "report") {
    const subscription = session.subscription;
    const status =
      typeof subscription === "string" ? null : subscription?.status;
    if (!status || !["active", "trialing"].includes(status)) return null;
  }

  return { payload, session };
}
