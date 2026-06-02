import { NextResponse } from "next/server";

/**
 * Newsletter subscribe — currently logs to console.
 * Wire to your ESP (Resend/Mailchimp/Beehiiv) when you have API keys; the client
 * contract is unchanged.
 */
export async function POST(req: Request) {
  let body: { email?: string; honey?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (body.honey) {
    // Honeypot tripped — silently succeed so bots can't tell
    return NextResponse.json({ ok: true });
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // Stub: server-side log. Replace with ESP call when keys available.
  console.log("[newsletter] subscribe:", email);

  return NextResponse.json({ ok: true });
}
