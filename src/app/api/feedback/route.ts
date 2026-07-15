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

function parseResendError(status: number, raw: string): string {
  try {
    const parsed = JSON.parse(raw) as {
      message?: string;
      name?: string;
      error?: string;
    };
    const msg = parsed.message || parsed.error || raw;
    if (
      /only send testing emails|verify a domain|not authorized|from address/i.test(
        msg,
      )
    ) {
      return (
        "Email provider rejected the send. With Resend’s free test sender, " +
        "FEEDBACK_TO_EMAIL must be the same email as your Resend account, " +
        "or verify retirefire.net and set FEEDBACK_FROM_EMAIL to an address on that domain."
      );
    }
    if (/api key|unauthorized|invalid.*key/i.test(msg) || status === 401) {
      return "Resend API key is invalid or revoked. Check RESEND_API_KEY in Vercel.";
    }
    return typeof msg === "string" && msg.length < 280
      ? msg
      : "Could not send feedback. Please try again.";
  } catch {
    if (status === 401 || status === 403) {
      return "Email provider rejected the request (auth or recipient). Check Resend setup.";
    }
    return "Could not send feedback. Please try again.";
  }
}

async function sendViaResend(opts: {
  apiKey: string;
  to: string;
  from: string;
  email: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
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
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
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
    return {
      ok: false,
      status: 502,
      error: parseResendError(res.status, detail),
    };
  }
  return { ok: true };
}

/** Web3Forms — no domain verify; emails whatever address you set on their dashboard. */
async function sendViaWeb3Forms(opts: {
  accessKey: string;
  email: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: opts.accessKey,
      subject: opts.email
        ? `RetireFire feedback from ${opts.email}`
        : "RetireFire feedback",
      from_name: "RetireFire",
      email: opts.email || "anonymous@retirefire.net",
      message: opts.message,
      // Reply path when visitor left an email
      ...(opts.email ? { replyto: opts.email } : {}),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || data.success === false) {
    console.error("Web3Forms error", res.status, data);
    return {
      ok: false,
      status: 502,
      error: data.message || "Could not send feedback. Please try again.",
    };
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

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  const from =
    process.env.FEEDBACK_FROM_EMAIL ?? "RetireFire <onboarding@resend.dev>";
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;

  // Prefer Web3Forms when configured (simpler; no domain verification)
  if (web3Key) {
    const result = await sendViaWeb3Forms({
      accessKey: web3Key,
      email,
      message,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (resendKey && to) {
    const result = await sendViaResend({
      apiKey: resendKey,
      to,
      from,
      email,
      message,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true });
  }

  console.error(
    "Feedback API missing WEB3FORMS_ACCESS_KEY, or RESEND_API_KEY + FEEDBACK_TO_EMAIL",
  );
  return NextResponse.json(
    {
      error:
        "Feedback is not configured yet. Add WEB3FORMS_ACCESS_KEY (easiest) or RESEND_API_KEY + FEEDBACK_TO_EMAIL in Vercel.",
    },
    { status: 503 },
  );
}
