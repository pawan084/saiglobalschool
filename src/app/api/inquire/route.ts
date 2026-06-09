import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/origin";
import { maskEmail } from "@/lib/log";

/**
 * Inquire / RSVP / tour-booking receiver.
 *
 * Logs sanitized record + returns a tracking reference. When you have an ESP
 * or CRM key, fan out to those services here — the client contract is stable
 * (just call this endpoint with whatever fields make sense for the source).
 */

const MAX_FIELD_LEN = 200;
const MAX_TOPIC_LEN = 1000;
const MAX_GUESTS = 8;

function reference() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INQ-${ts}-${rnd}`;
}

function cap(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

function boundedInt(v: unknown, max: number): number | undefined {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.min(Math.floor(n), max);
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

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
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot tripped — silent success
  if (typeof body.honey === "string" && body.honey) {
    return NextResponse.json({ ok: true, reference: reference() });
  }

  const data = {
    name: cap(body.name, MAX_FIELD_LEN).trim(),
    email: cap(body.email, MAX_FIELD_LEN).trim().toLowerCase(),
    phone: cap(body.phone, MAX_FIELD_LEN),
    grade: cap(body.grade, MAX_FIELD_LEN),
    topic: cap(body.topic, MAX_TOPIC_LEN),
    eventTitle: cap(body.eventTitle, MAX_FIELD_LEN),
    slot: cap(body.slot, MAX_FIELD_LEN),
    source: cap(body.source, MAX_FIELD_LEN) || "inquire",
    guests: boundedInt(body.guests, MAX_GUESTS),
  };

  if (!data.name) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const ref = reference();
  console.log("[inquire] received", {
    ref,
    source: data.source,
    emailMasked: maskEmail(data.email),
    grade: data.grade || undefined,
    eventTitle: data.eventTitle || undefined,
    topicLen: data.topic.length || undefined,
    guests: data.guests,
  });

  return NextResponse.json({ ok: true, reference: ref });
}
