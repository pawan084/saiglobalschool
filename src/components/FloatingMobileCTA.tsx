"use client";

import Link from "next/link";
import { ctaInquire, ctaWhatsApp } from "@/data/nav";

/** Fixed-bottom CTA — only visible on smaller screens to keep mobile users one tap from action. */
export default function FloatingMobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--brand-rule)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-3 py-2 flex gap-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
      <Link
        href={ctaInquire.href}
        className="flex-1 text-center px-4 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-sm font-bold hover:bg-[var(--brand-accent-dark)] transition"
      >
        {ctaInquire.label}
      </Link>
      <a
        href={ctaWhatsApp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="px-4 py-2.5 rounded-full bg-[#25d366] text-white text-sm font-bold hover:bg-[#1eb955] transition"
      >
        💬
      </a>
    </div>
  );
}
