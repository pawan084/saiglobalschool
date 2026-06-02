import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Inquire / RSVP / tour-booking receiver.
 *
 * Logs to server console + returns a tracking reference. When you have an ESP
 * or CRM key, fan out to those services here — the client contract is stable
 * (just call this endpoint with whatever fields make sense for the source).
 */

function reference() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INQ-${ts}-${rnd}`;
}

export async function POST(req: Request) {
  // Rate limit per IP — 8 submissions per 5 minutes
  const key = clientKey(req);
  const rl = rateLimit(`inquire:${key}`, { limit: 8, windowMs: 5 * 60_000, banMs: 10 * 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please slow down." },
      {
        status: 429,
        headers: { "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot tripped — silent success
  if (typeof body.honey === "string" && body.honey) {
    return NextResponse.json({ ok: true, reference: reference() });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  if (!name) return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const ref = reference();
  const source = String(body.source || "inquire");
  console.log("[inquire] received", {
    ref,
    source,
    email,
    name,
    phone: body.phone,
    grade: body.grade,
    topic: body.topic,
    eventTitle: body.eventTitle,
    slot: body.slot,
    guests: body.guests,
  });

  return NextResponse.json({ ok: true, reference: ref });
}
