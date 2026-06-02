import OpenAI from "openai";
import { schoolContext } from "@/lib/schoolContext";
import { rateLimit, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Message = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 10;
const MAX_USER_LEN = 1500;

export async function POST(req: Request) {
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

  try {
    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.4,
      max_tokens: 350,
      messages: [
        { role: "system", content: schoolContext },
        ...trimmed,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content ?? "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
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
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
