import { NextResponse } from "next/server";

type FeedbackBody = {
  message?: string;
  email?: string;
  /** Honeypot — must stay empty */
  website?: string;
};

const MAX_MESSAGE = 4000;
const MAX_EMAIL = 254;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: FeedbackBody;
  try {
    body = (await request.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill hidden fields
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const message = (body.message ?? "").trim();
  const email = (body.email ?? "").trim();

  if (message.length < 3) {
    return NextResponse.json(
      { error: "Please write a short message." },
      { status: 400 },
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (email && (email.length > MAX_EMAIL || !isValidEmail(email))) {
    return NextResponse.json({ error: "That email looks invalid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  const from =
    process.env.FEEDBACK_FROM_EMAIL ?? "RetireFire <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Feedback API missing RESEND_API_KEY or FEEDBACK_TO_EMAIL env vars",
    );
    return NextResponse.json(
      { error: "Feedback is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const text = [
    "New feedback from retirefire.net",
    "",
    `Email: ${email || "(not provided)"}`,
    `Time: ${new Date().toISOString()}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(email ? { reply_to: email } : {}),
      subject: email
        ? `RetireFire feedback from ${email}`
        : "RetireFire feedback",
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    return NextResponse.json(
      { error: "Could not send feedback. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
