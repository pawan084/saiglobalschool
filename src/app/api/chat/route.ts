import OpenAI from "openai";
import { schoolContext } from "@/lib/schoolContext";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { isAllowedOrigin } from "@/lib/origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 10;
const MAX_USER_LEN = 1500;

export async function POST(req: Request) {
  // Same-origin gate — this route spends real money on the OpenAI API, so
  // reject cross-origin browser POSTs (CSRF / third-party automation).
  if (!isAllowedOrigin(req)) {
    return new Response(
      JSON.stringify({ error: "Forbidden" }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server missing OPENAI_API_KEY env var" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  // Per-IP throttle: 12 requests per minute, 2-minute cooldown
  const key = clientKey(req);
  const rl = rateLimit(`chat:${key}`, { limit: 12, windowMs: 60_000, banMs: 120_000 });
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)),
        },
      }
    );
  }

  let messages: Message[] = [];
  let honey = "";
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    honey = typeof body?.honey === "string" ? body.honey : "";
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  // Honeypot tripped — return a generic stream so bots see "ok"
  if (honey) {
    return new Response("Thanks!", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const trimmed = messages
    .slice(-MAX_TURNS)
    .filter(
      (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    )
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_USER_LEN) }));

  if (!trimmed.length || trimmed[trimmed.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "Empty message" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Lazy init so the constructor only ever runs after the env-var guard above
  // — keeps test imports clean and avoids carrying a bad key through cold starts.
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // Pass the request's AbortSignal so a client disconnect (panel close,
    // unmount, navigation away) actually stops the upstream OpenAI call
    // instead of letting it run to completion on our dime.
    const stream = await client.chat.completions.create(
      {
        model: "gpt-4o-mini",
        stream: true,
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          { role: "system", content: schoolContext },
          ...trimmed,
        ],
      },
      { signal: req.signal }
    );

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (req.signal.aborted) break;
            const delta = chunk.choices?.[0]?.delta?.content ?? "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (e) {
          // Client disconnect surfaces here as an AbortError — that's
          // expected, swallow it cleanly. Everything else gets logged
          // server-side; we never leak SDK error text to the browser.
          const isAbort = e instanceof Error && e.name === "AbortError";
          if (!isAbort) {
            console.error("[chat] stream error:", e);
            try {
              controller.error(e);
            } catch {
              // controller may already be closed
            }
          } else {
            try {
              controller.close();
            } catch {
              // already closed
            }
          }
        }
      },
      cancel() {
        // Browser cancelled the response stream — abort the OpenAI iterator
        // by signalling on the underlying request's controller. The for-await
        // above will reject with AbortError and unwind.
        stream.controller?.abort?.();
      },
    });

    return new Response(readable, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        "x-ratelimit-remaining": String(rl.remaining),
      },
    });
  } catch (err) {
    // Don't echo upstream error messages — they can reveal API key prefixes,
    // org IDs, model availability, etc. Log server-side, return generic.
    console.error("[chat] upstream error:", err);
    return new Response(
      JSON.stringify({ error: "The assistant is temporarily unavailable. Please try again shortly." }),
      {
        status: 503,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
