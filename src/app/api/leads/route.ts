import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db";
import { isValidLeadEmail, parseLeadSource } from "@/lib/leads";

type LeadBody = {
  email?: string;
  source?: string;
  website?: string;
};

const recent = new Map<string, number>();
const WINDOW_MS = 60_000;

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const last = recent.get(key);
  recent.set(key, now);
  if (recent.size > 500) {
    for (const [k, t] of recent) {
      if (now - t > WINDOW_MS) recent.delete(k);
    }
  }
  return last != null && now - last < WINDOW_MS;
}

async function notify(email: string, source: string) {
  const topic = (process.env.FEEDBACK_NTFY_TOPIC ?? "").trim();
  if (topic) {
    await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: { Title: "RetireFire email capture", Tags: "email" },
      body: `${email}\nsource: ${source}`,
    }).catch(() => undefined);
  }

  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  const to = (process.env.FEEDBACK_TO_EMAIL ?? "").trim();
  if (!apiKey || !to) return;

  const from =
    process.env.FEEDBACK_FROM_EMAIL?.trim() ||
    "RetireFire <onboarding@resend.dev>";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New RetireFire list signup (${source})`,
      text: `Email: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
    }),
  }).catch(() => undefined);
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = parseLeadSource(body.source);
  if (!isValidLeadEmail(email) || !source) {
    return NextResponse.json(
      { error: "Enter a valid email." },
      { status: 400 },
    );
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ ok: true });
  }

  if (isDatabaseConfigured()) {
    try {
      await db()`
        INSERT INTO email_leads (id, email, source)
        VALUES (${randomUUID()}, ${email}, ${source})
        ON CONFLICT (email) DO UPDATE
        SET source = EXCLUDED.source,
            updated_at = now()
      `;
    } catch (error) {
      console.error("email_leads insert failed", error);
      return NextResponse.json(
        { error: "Could not save that email. Try again." },
        { status: 500 },
      );
    }
  }

  await notify(email, source);
  return NextResponse.json({ ok: true });
}
