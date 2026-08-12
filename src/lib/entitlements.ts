import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { PlanId } from "@/lib/stripe/config";

export type StoredEntitlement = {
  plan: PlanId;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_checkout_session_id: string | null;
  current_period_end: Date | null;
};

const ACTIVE = ["active", "trialing", "paid", "lifetime"];

export async function activeEntitlements(userId: string) {
  return db()<StoredEntitlement[]>`
    SELECT plan, status, stripe_customer_id, stripe_subscription_id, stripe_checkout_session_id, current_period_end
    FROM entitlements WHERE user_id = ${userId} AND status IN ${db()(ACTIVE)} ORDER BY created_at DESC
  `;
}

export async function hasProAccess(userId: string) {
  return (await activeEntitlements(userId)).length > 0;
}

export async function upsertCheckoutEntitlement(input: {
  userId: string; plan: PlanId; status: string; sessionId: string;
  customerId?: string | null; subscriptionId?: string | null; currentPeriodEnd?: Date | null;
}) {
  await db()`
    INSERT INTO entitlements (id, user_id, plan, status, stripe_customer_id, stripe_subscription_id, stripe_checkout_session_id, current_period_end)
    VALUES (${randomUUID()}, ${input.userId}, ${input.plan}, ${input.status}, ${input.customerId ?? null}, ${input.subscriptionId ?? null}, ${input.sessionId}, ${input.currentPeriodEnd ?? null})
    ON CONFLICT (stripe_checkout_session_id) DO UPDATE SET
      user_id = EXCLUDED.user_id, plan = EXCLUDED.plan, status = EXCLUDED.status,
      stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, entitlements.stripe_customer_id),
      stripe_subscription_id = COALESCE(EXCLUDED.stripe_subscription_id, entitlements.stripe_subscription_id),
      current_period_end = COALESCE(EXCLUDED.current_period_end, entitlements.current_period_end), updated_at = now()
  `;
}
