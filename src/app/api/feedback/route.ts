import { NextResponse } from "next/server";

type FeedbackBody = {
  message?: string;
  email?: string;
  website?: string;
};

const MAX_MESSAGE = 4000;
const MAX_EMAIL = 254;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function feedbackTo(): string {
  return (process.env.FEEDBACK_TO_EMAIL ?? "").trim();
}

function web3Key(): string {
  return (
    (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim() ||
    (process.env.WEB3FORMS_ACCESS_KEY ?? "").trim()
  );
}

/** Public config so the browser can submit if server providers fail. */
export async function GET() {
  const to = feedbackTo();
  const key = web3Key();

  if (key) {
    return NextResponse.json({
      configured: true,
      provider: "web3forms" as const,
      accessKey: key,
    });
  }

  if (to && isValidEmail(to)) {
    return NextResponse.json({
      configured: true,
      provider: "formsubmit" as const,
      to,
    });
  }

  return NextResponse.json({
    configured: false,
    provider: null,
    error: "Set FEEDBACK_TO_EMAIL in Vercel to a real inbox, then redeploy.",
  });
}

async function sendResend(opts: {
  message: string;
  email: string;
  to: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }

  const from =
    process.env.FEEDBACK_FROM_EMAIL?.trim() ||
    "RetireFire <onboarding@resend.dev>";

  const text = [
    "New feedback from retirefire.net",
    "",
    `Email: ${opts.email || "(not provided)"}`,
    `Time: ${new Date().toISOString()}`,
    "",
    "Message:",
    opts.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      ...(opts.email ? { reply_to: opts.email } : {}),
      subject: opts.email
        ? `RetireFire feedback from ${opts.email}`
        : "RetireFire feedback",
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error", res.status, detail);
    let msg = "Resend rejected the send";
    try {
      const parsed = JSON.parse(detail) as { message?: string };
      if (parsed.message) msg = parsed.message;
    } catch {
      /* ignore */
    }
    return { ok: false, error: msg };
  }
  return { ok: true };
}

/** Always-on fallback: free push topic (no email). Optional FEEDBACK_NTFY_TOPIC. */
async function sendNtfy(opts: {
  message: string;
  email: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const topic = (process.env.FEEDBACK_NTFY_TOPIC ?? "").trim();
  if (!topic) return { ok: false, error: "ntfy not configured" };

  const body = [
    opts.email ? `From: ${opts.email}` : "From: (anonymous)",
    "",
    opts.message,
  ].join("\n");

  const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers: {
      Title: "RetireFire feedback",
      Priority: "default",
      Tags: "speech_balloon",
    },
    body,
  });

  if (!res.ok) {
    console.error("ntfy error", res.status, await res.text().catch(() => ""));
    return { ok: false, error: "ntfy failed" };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  let body: FeedbackBody;
  try {
    body = (await request.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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

  const to = feedbackTo();

  // Always mirror to ntfy when configured (instant, reliable)
  void sendNtfy({ message, email });

  // 1) Resend when key + recipient exist
  if ((process.env.RESEND_API_KEY ?? "").trim() && to && isValidEmail(to)) {
    const result = await sendResend({ message, email, to });
    if (result.ok) {
      return NextResponse.json({ ok: true, via: "resend" });
    }
    // Prefer browser FormSubmit for email over accepting ntfy-only
    return NextResponse.json(
      {
        error: result.error,
        fallback: "client",
      },
      { status: 502 },
    );
  }

  // 2) Tell client to use browser FormSubmit / Web3Forms for email
  if ((to && isValidEmail(to)) || web3Key()) {
    return NextResponse.json(
      {
        error: "Server email unavailable",
        fallback: "client",
      },
      { status: 502 },
    );
  }

  // 3) ntfy-only success if nothing else is configured
  const ntfy = await sendNtfy({ message, email });
  if (ntfy.ok) {
    return NextResponse.json({ ok: true, via: "ntfy" });
  }

  return NextResponse.json(
    {
      error:
        "Feedback is not configured. Set FEEDBACK_TO_EMAIL in Vercel, then redeploy.",
    },
    { status: 503 },
  );
}
