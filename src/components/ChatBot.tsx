"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What grades does SSSGS offer?",
  "How do I apply for admission?",
  "What's the curriculum?",
  "Tell me about the learning labs",
  "How do I book a tour?",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the SSSGS Assistant. Ask me about admissions, curriculum, fees, or anything about the school. How can I help?",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  async function send(text: string) {
    const userMsg: Msg = { role: "user", content: text.trim() };
    if (!userMsg.content) return;

    const nextHistory = [...messages, userMsg];
    setMessages([...nextHistory, { role: "assistant", content: "" }]);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setMessages((prev) => prev.slice(0, -1)); // drop empty assistant turn
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full grid place-items-center transition-transform hover:-translate-y-0.5 ${
          open
            ? "bg-[var(--brand-navy)] text-white"
            : "bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-dark)] text-white"
        }`}
        style={{
          boxShadow: open
            ? "0 10px 24px -6px rgba(11,29,51,0.45)"
            : "0 12px 28px -8px rgba(13,138,135,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        <Icon name={open ? "close" : "chat"} size={22} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[380px] h-[min(560px,calc(100vh-8rem))] bg-white rounded-xl shadow-2xl border border-[var(--brand-rule)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-dark)] text-white px-4 py-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/15 grid place-items-center text-lg">🤖</div>
            <div className="flex-1 leading-tight">
              <div className="font-bold text-sm">SSSGS Assistant</div>
              <div className="text-xs text-white/80">Admissions & info — always on</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-white/90 hover:text-white text-xl leading-none px-1"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`${
                    m.role === "user"
                      ? "bg-[var(--brand-primary)] text-white"
                      : "bg-white border border-[var(--brand-rule)] text-slate-800"
                  } max-w-[85%] rounded-lg px-3 py-2 text-[14px] leading-snug whitespace-pre-wrap`}
                >
                  <FormattedAssistantContent
                    content={m.content || (sending && i === messages.length - 1 ? "…" : "")}
                  />
                </div>
              </div>
            ))}

            {!sending && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-cream)] text-slate-700 px-3 py-1.5 rounded-full transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!sending) send(input);
            }}
            className="border-t border-[var(--brand-rule)] p-3 bg-white flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about admissions, fees, curriculum…"
              disabled={sending}
              className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="px-4 py-2 rounded-full bg-[var(--brand-accent)] text-white font-bold text-sm disabled:bg-slate-300 hover:bg-[var(--brand-accent-dark)] transition"
            >
              {sending ? "…" : "Send"}
            </button>
          </form>
          <div className="text-[10px] text-slate-400 px-3 pb-2 bg-white">
            Powered by OpenAI · Answers may be inaccurate — confirm critical details with our{" "}
            <Link href="/contact-us" className="underline">admissions team</Link>.
          </div>
        </div>
      )}
    </>
  );
}

/** Render the assistant text and turn [label](/url) markdown links into clickable inline Links. */
function FormattedAssistantContent({ content }: { content: string }) {
  if (!content) return null;
  const linkRe = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;
  const parts: Array<React.ReactNode> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = linkRe.exec(content)) !== null) {
    const [whole, label, href] = match;
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={`l-${i++}`}
        href={href}
        className="text-[var(--brand-primary)] underline hover:text-[var(--brand-primary-dark)]"
      >
        {label}
      </Link>
    );
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return <>{parts}</>;
}
