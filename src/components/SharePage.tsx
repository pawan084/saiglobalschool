"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useToast } from "./Toast";

/**
 * Inline share row — copy / WhatsApp / email / native share.
 * No third-party scripts.
 */
type Props = {
  title: string;
  /** Falls back to the current URL when omitted. */
  url?: string;
};

export default function SharePage({ title, url }: Props) {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  function effectiveUrl() {
    if (url) return url;
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  async function copy() {
    const u = effectiveUrl();
    try {
      await navigator.clipboard.writeText(u);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      show("Link copied to clipboard", "success");
    } catch {
      show("Couldn't copy. Try selecting the URL instead.", "error");
    }
  }

  async function native() {
    const u = effectiveUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url: u });
      } catch {
        /* user cancelled */
      }
    } else {
      copy();
    }
  }

  const u = encodeURIComponent(effectiveUrl());
  const t = encodeURIComponent(title);

  return (
    <div className="mt-10 pt-6 border-t border-[var(--brand-rule)]">
      <div className="news-eyebrow mb-2">Share this</div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[12px] font-bold text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
        >
          <Icon name={copied ? "check" : "document"} size={12} />
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={`https://wa.me/?text=${t}%20${u}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold text-white transition"
          style={{
            background: "linear-gradient(135deg, #25d366 0%, #128c5b 100%)",
          }}
        >
          <Icon name="whatsapp" size={12} />
          WhatsApp
        </a>
        <a
          href={`mailto:?subject=${t}&body=${u}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[12px] font-bold text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
        >
          <Icon name="mail" size={12} />
          Email
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[12px] font-bold text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
        >
          <Icon name="facebook" size={12} />
          Facebook
        </a>
        <button
          onClick={native}
          className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--brand-navy)] text-white text-[12px] font-bold transition"
        >
          <Icon name="arrow-up-right" size={12} />
          Share…
        </button>
      </div>
    </div>
  );
}
