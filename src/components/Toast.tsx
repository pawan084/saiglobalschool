"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Icon from "./Icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

type ToastKind = "success" | "error" | "info";
type ToastMsg = { id: number; kind: ToastKind; text: string };

type Ctx = {
  show: (text: string, kind?: ToastKind) => void;
};

const ToastCtx = createContext<Ctx | null>(null);

const DURATION_MS = 4200;

let _id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);

  const show = useCallback((text: string, kind: ToastKind = "success") => {
    const id = ++_id;
    setItems((arr) => [...arr, { id, kind, text }]);
    setTimeout(() => {
      setItems((arr) => arr.filter((t) => t.id !== id));
    }, DURATION_MS);
  }, []);

  const dismiss = useCallback((id: number) => {
    setItems((arr) => arr.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <Toaster items={items} onDismiss={dismiss} />
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    // Fallback no-op so component trees outside the provider don't crash.
    return { show: (..._args: unknown[]) => {} };
  }
  return ctx;
}

function Toaster({
  items,
  onDismiss,
}: {
  items: ToastMsg[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 z-[80] w-[calc(100vw-2rem)] sm:w-auto sm:max-w-[380px] space-y-2 pointer-events-none">
      {items.map((t) => (
        <ToastBubble key={t.id} item={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

const KIND: Record<
  ToastKind,
  { icon: IconName; chipBg: string; ringRGBA: string; accent: string }
> = {
  success: {
    icon: "check",
    chipBg: "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
    ringRGBA: "13,138,135",
    accent: "var(--brand-primary)",
  },
  error: {
    icon: "shield",
    chipBg: "linear-gradient(135deg, #d4574d 0%, #9a342d 100%)",
    ringRGBA: "212,87,77",
    accent: "#d4574d",
  },
  info: {
    icon: "sparkle",
    chipBg: "linear-gradient(135deg, var(--brand-navy) 0%, #1e293b 100%)",
    ringRGBA: "11,29,51",
    accent: "var(--brand-navy)",
  },
};

function ToastBubble({
  item,
  onDismiss,
}: {
  item: ToastMsg;
  onDismiss: () => void;
}) {
  const [enter, setEnter] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(r);
  }, []);

  function close() {
    setLeaving(true);
    setTimeout(onDismiss, 200);
  }

  const k = KIND[item.kind];

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-white border border-[var(--brand-rule)] pl-4 pr-3 py-3 flex items-start gap-3 transition-all duration-300 ${
        leaving ? "opacity-0 translate-y-1" : enter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      style={{
        boxShadow: `0 18px 36px -12px rgba(${k.ringRGBA},0.35), 0 6px 14px -6px rgba(15,23,42,0.10)`,
      }}
      role="status"
      aria-live="polite"
    >
      {/* Accent bar on the left edge */}
      <span
        aria-hidden
        className="absolute inset-y-2 left-0 w-1 rounded-full"
        style={{ background: k.accent }}
      />

      {/* Icon chip */}
      <span
        className="grid place-items-center h-9 w-9 rounded-xl text-white shrink-0"
        style={{
          background: k.chipBg,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
        aria-hidden
      >
        <Icon name={k.icon} size={16} />
      </span>

      {/* Body */}
      <p className="flex-1 text-[13.5px] leading-snug text-[var(--brand-navy)] pt-0.5">
        {item.text}
      </p>

      {/* Close */}
      <button
        onClick={close}
        aria-label="Dismiss"
        className="grid place-items-center h-7 w-7 rounded-full text-slate-400 hover:text-[var(--brand-navy)] hover:bg-[var(--brand-cream)] transition shrink-0 -mr-1"
      >
        <Icon name="close" size={13} />
      </button>

      {/* Auto-dismiss progress bar */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{
          background: k.accent,
          opacity: 0.35,
          transform: enter ? "scaleX(0)" : "scaleX(1)",
          transformOrigin: "left",
          transition: `transform ${DURATION_MS}ms linear`,
        }}
      />
    </div>
  );
}
