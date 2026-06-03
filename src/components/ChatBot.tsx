"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import { safeGetJson, safeSetJson, safeRemove } from "@/lib/storage";

type Msg = { role: "user" | "assistant"; content: string };

type IconName = React.ComponentProps<typeof Icon>["name"];

const SUGGESTIONS: Array<{ label: string; icon: IconName }> = [
  { label: "What grades does SSSGS offer?", icon: "graduation" },
  { label: "How do I apply for admission?", icon: "document" },
  { label: "What's the curriculum?", icon: "book-open" },
  { label: "Tell me about the learning labs", icon: "flask" },
  { label: "How do I book a tour?", icon: "calendar" },
  { label: "What are the fees?", icon: "credit-card" },
];

const STORAGE_KEY = "sssgs:chat-history";
const LEAD_AFTER = 4; // user turns

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() =>
    safeGetJson<Msg[]>(STORAGE_KEY, []).slice(-20)
  );
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "unsupported">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  // Persist on change (skip the streaming "assistant: ''" placeholder)
  useEffect(() => {
    if (!messages.length) {
      safeRemove(STORAGE_KEY);
      return;
    }
    const last = messages[messages.length - 1];
    if (last.role === "assistant" && !last.content) return;
    safeSetJson(STORAGE_KEY, messages.slice(-20));
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  function toggleVoice() {
    type SR = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult: ((e: { results: { isFinal: boolean; 0: { transcript: string } }[] }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    };
    type SRConstructor = new () => SR;
    const win = window as unknown as {
      SpeechRecognition?: SRConstructor;
      webkitSpeechRecognition?: SRConstructor;
    };
    const Ctor = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!Ctor) {
      setVoiceState("unsupported");
      return;
    }
    if (voiceState === "listening") {
      (recognitionRef.current as SR | null)?.stop();
      return;
    }
    const rec: SR = new Ctor();
    rec.lang = "en-SG";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      const result = e.results[e.results.length - 1];
      const text = result[0].transcript;
      setInput(text);
      if (result.isFinal) rec.stop();
    };
    rec.onerror = () => setVoiceState("idle");
    rec.onend = () => setVoiceState("idle");
    recognitionRef.current = rec;
    rec.start();
    setVoiceState("listening");
  }

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
        body: JSON.stringify({ messages: nextHistory, honey: "" }),
      });

      if (res.status === 429) {
        throw new Error("Too many requests — please wait a moment and try again.");
      }

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
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
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  }

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* Floating launcher */}
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
        {open ? (
          <Icon name="close" size={22} />
        ) : (
          <>
            <Icon name="chat" size={22} />
            {/* Live dot */}
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand-accent)] border border-white" />
            </span>
          </>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[400px] h-[min(620px,calc(100vh-9rem))] bg-white rounded-2xl border border-[var(--brand-rule)] flex flex-col overflow-hidden"
          style={{ boxShadow: "0 30px 60px -20px rgba(15,23,42,0.32), 0 12px 24px -12px rgba(15,23,42,0.18)" }}
        >
          {/* Header with brand */}
          <div
            className="relative overflow-hidden text-white px-4 pt-3.5 pb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
            }}
          >
            <span
              aria-hidden
              className="absolute -top-16 -right-10 w-44 h-44 rounded-full opacity-25"
              style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.5), transparent)" }}
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/95 grid place-items-center shadow-sm p-1 shrink-0">
                <BrandLogo size={32} />
              </div>
              <div className="flex-1 leading-tight">
                <div className="font-display font-bold text-[15px] tracking-tight">SSSGS Assistant</div>
                <div className="text-[11px] text-white/85 inline-flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#5be4a8] opacity-70 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5be4a8]" />
                  </span>
                  Online · replies in seconds
                </div>
              </div>
              <button
                onClick={() => {
                  setMessages([]);
                  setError(null);
                }}
                aria-label="Start new conversation"
                title="New conversation"
                className="h-8 w-8 grid place-items-center rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
              >
                <Icon name="rotate" size={15} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="h-8 w-8 grid place-items-center rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-white via-[#f8fafc] to-white"
          >
            {showWelcome ? (
              <Welcome onPick={(s) => send(s)} />
            ) : (
              <ul className="space-y-3.5">
                {messages.map((m, i) => (
                  <li key={i}>
                    {m.role === "assistant" ? (
                      <AssistantBubble
                        text={m.content}
                        streaming={sending && i === messages.length - 1 && !m.content}
                      />
                    ) : (
                      <UserBubble text={m.content} />
                    )}
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <div className="mt-3 text-[12.5px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2">
                <Icon name="shield" size={13} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Lead capture after enough conversation */}
            {messages.filter((m) => m.role === "user").length >= LEAD_AFTER && (
              <LeadCapture />
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!sending) send(input);
            }}
            className="border-t border-[var(--brand-rule)] p-3 bg-white"
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  voiceState === "listening"
                    ? "Listening…"
                    : "Ask about admissions, fees, curriculum…"
                }
                disabled={sending}
                className="w-full rounded-full border border-[var(--brand-rule-strong)] pl-4 pr-20 py-2.5 text-[13.5px] text-[var(--brand-navy)] placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/15 outline-none disabled:bg-slate-50 disabled:cursor-not-allowed transition"
              />
              {/* Microphone */}
              <button
                type="button"
                onClick={toggleVoice}
                aria-label={voiceState === "listening" ? "Stop voice input" : "Voice input"}
                title={voiceState === "unsupported" ? "Voice input not supported in this browser" : "Voice input"}
                disabled={voiceState === "unsupported" || sending}
                className={`absolute top-1/2 right-11 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full transition ${
                  voiceState === "listening"
                    ? "bg-[var(--brand-accent)] text-white animate-pulse"
                    : "text-slate-500 hover:text-[var(--brand-primary)]"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                <Icon name="microphone" size={14} />
              </button>
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 h-8 w-8 grid place-items-center rounded-full text-white transition-transform disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:-translate-y-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-dark) 100%)",
                  boxShadow: "0 6px 14px -4px rgba(234,88,12,0.45)",
                }}
              >
                <Icon name="arrow-up-right" size={14} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10.5px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="lock" size={10} />
                Encrypted in transit
              </span>
              <span>
                Powered by OpenAI ·{" "}
                <Link href="/contact-us" className="underline hover:text-[var(--brand-primary)]">
                  Talk to a person
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function Welcome({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-[20px] font-bold text-[var(--brand-navy)] leading-tight">
        Hi! 👋
        <span className="block italic font-medium text-[var(--brand-accent)]">
          How can I help today?
        </span>
      </h3>
      <p className="mt-2.5 text-[13px] text-slate-600 leading-relaxed">
        Ask me about admissions, curriculum, fees or anything about Sri Sathya Sai Global School.
        For complex questions our admissions team is one tap away.
      </p>

      <div className="mt-5">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--brand-accent)] mb-2">
          Try asking
        </div>
        <div className="grid gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => onPick(s.label)}
              className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary-tint)] transition text-left"
            >
              <span className="grid place-items-center h-8 w-8 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] shrink-0 group-hover:bg-white">
                <Icon name={s.icon} size={15} />
              </span>
              <span className="text-[13px] text-slate-700 group-hover:text-[var(--brand-navy)] font-medium flex-1">
                {s.label}
              </span>
              <Icon
                name="arrow-right"
                size={14}
                className="text-slate-300 group-hover:text-[var(--brand-accent)] transition-colors shrink-0"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantBubble({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="h-7 w-7 rounded-lg bg-white border border-[var(--brand-rule)] grid place-items-center shrink-0 p-0.5 shadow-sm">
        <BrandLogo size={22} />
      </div>
      <div
        className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white border border-[var(--brand-rule)] px-3.5 py-2.5 text-[13.5px] leading-snug text-slate-800"
        style={{ boxShadow: "var(--shadow-xs)" }}
      >
        {streaming ? <TypingDots /> : <FormattedAssistantContent content={text} />}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[82%] rounded-2xl rounded-tr-sm text-white px-3.5 py-2.5 text-[13.5px] leading-snug whitespace-pre-wrap"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
          boxShadow: "0 6px 14px -6px rgba(13,138,135,0.45)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span
      className="inline-flex items-center gap-1 py-1"
      aria-label="Assistant is typing"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "120ms" }} />
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "240ms" }} />
    </span>
  );
}

/** Render assistant text — turn [label](/url) markdown into clickable Links. */
function FormattedAssistantContent({ content }: { content: string }) {
  if (!content) return null;
  const linkRe = /\[([^\]]+)\]\((\/[^\s)]+)\)/g;
  const parts: Array<React.ReactNode> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = linkRe.exec(content)) !== null) {
    const [whole, label, href] = match;
    if (match.index > lastIndex) parts.push(content.slice(lastIndex, match.index));
    parts.push(
      <Link
        key={`l-${i++}`}
        href={href}
        className="text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 hover:decoration-[var(--brand-primary)]"
      >
        {label}
      </Link>
    );
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return <span className="whitespace-pre-wrap">{parts}</span>;
}

function LeadCapture() {
  return (
    <div className="mt-4 rounded-xl border border-[var(--brand-accent)]/25 bg-[var(--brand-cream)]/70 p-3">
      <div className="flex items-start gap-2.5">
        <span
          className="grid place-items-center h-8 w-8 rounded-lg text-white shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-accent-dark) 100%)",
          }}
          aria-hidden
        >
          <Icon name="user-check" size={14} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-bold text-[var(--brand-navy)]">
            Want a human to follow up?
          </div>
          <div className="text-[11.5px] text-slate-600">
            Our admissions team picks up where the chat leaves off.
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Link
              href="/apply"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--brand-navy)] text-white hover:bg-[#1e293b] transition"
            >
              Start application <Icon name="arrow-right" size={10} />
            </Link>
            <Link
              href="/inquire-book-a-tour"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border border-[var(--brand-rule)] bg-white text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
            >
              Book a tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
