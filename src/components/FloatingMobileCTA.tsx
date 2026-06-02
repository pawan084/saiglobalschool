"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ctaInquire, ctaWhatsApp } from "@/data/nav";
import Icon from "./Icon";
import { site } from "@/data/site";

/**
 * Fixed-bottom CTA — only visible on small screens.
 * Auto-hides when the user scrolls down quickly so the floating bar doesn't
 * obscure content the visitor is actively reading; reappears on scroll up.
 */
export default function FloatingMobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Hide if scrolling down past 200px; show again on any upward movement
      if (y - lastY > 6 && y > 200) setHidden(true);
      else if (lastY - y > 4) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-transform duration-300 ${
        hidden ? "translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div
        className="mx-2 mb-2 rounded-2xl border border-[var(--brand-rule)] bg-white/95 backdrop-blur px-3 py-2.5 flex items-center gap-2"
        style={{ boxShadow: "0 12px 32px -10px rgba(11,29,51,0.30)" }}
      >
        <a
          href={`tel:${site.phone.replace(/\s+/g, "")}`}
          aria-label={`Call ${site.phone}`}
          className="grid place-items-center h-11 w-11 rounded-xl bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] shrink-0 hover:bg-[var(--brand-primary)] hover:text-white transition"
        >
          <Icon name="phone" size={16} />
        </a>
        <Link
          href={ctaInquire.href}
          className="btn-primary flex-1 justify-center !py-2.5"
        >
          {ctaInquire.label}
          <Icon name="arrow-right" size={14} />
        </Link>
        <a
          href={ctaWhatsApp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="grid place-items-center h-11 w-11 rounded-xl text-white shrink-0 hover:opacity-90 transition"
          style={{
            background: "linear-gradient(135deg, #25d366 0%, #128c5b 100%)",
            boxShadow: "0 6px 14px -4px rgba(18,140,91,0.50)",
          }}
        >
          <Icon name="whatsapp" size={16} />
        </a>
      </div>
    </div>
  );
}
