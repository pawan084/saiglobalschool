"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastKind = "success" | "error" | "info";
type ToastMsg = { id: number; kind: ToastKind; text: string };

type Ctx = {
  show: (text: string, kind?: ToastKind) => void;
};

const ToastCtx = createContext<Ctx | null>(null);

let _id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);

  const show = useCallback((text: string, kind: ToastKind = "success") => {
    const id = ++_id;
    setItems((arr) => [...arr, { id, kind, text }]);
    setTimeout(() => {
      setItems((arr) => arr.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <Toaster items={items} />
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

function Toaster({ items }: { items: ToastMsg[] }) {
  return (
    <div className="fixed top-4 right-4 z-[80] space-y-2 pointer-events-none">
      {items.map((t) => (
        <ToastBubble key={t.id} item={t} />
      ))}
    </div>
  );
}

function ToastBubble({ item }: { item: ToastMsg }) {
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const styles: Record<ToastKind, string> = {
    success: "bg-[var(--brand-primary)] text-white",
    error: "bg-red-600 text-white",
    info: "bg-[var(--brand-navy)] text-white",
  };
  const glyph: Record<ToastKind, string> = {
    success: "✓",
    error: "!",
    info: "i",
  };

  return (
    <div
      className={`pointer-events-auto ${styles[item.kind]} shadow-xl rounded-md pl-3 pr-4 py-2.5 flex items-center gap-3 min-w-[260px] max-w-[360px] transition-all duration-300 ${
        enter ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <span className="h-6 w-6 rounded-full bg-white/15 grid place-items-center text-sm font-bold shrink-0">
        {glyph[item.kind]}
      </span>
      <span className="text-[14px] font-medium leading-snug">{item.text}</span>
    </div>
  );
}
