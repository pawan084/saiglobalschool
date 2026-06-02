import Link from "next/link";
import { announcements } from "@/data/announcements";
import Icon from "./Icon";

export default function NewsStrip() {
  return (
    <div className="bg-[var(--brand-navy)] text-white/90 text-[12px] overflow-hidden">
      <div className="section-shell flex items-center gap-4 py-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[var(--brand-accent)] text-white text-[10px] font-bold uppercase tracking-[0.1em] shrink-0">
          <Icon name="sparkle" size={10} />
          News
        </span>
        <div className="overflow-hidden flex-1 relative">
          <div className="flex gap-12 whitespace-nowrap animate-[scroll_60s_linear_infinite] motion-reduce:animate-none">
            {[...announcements, ...announcements].map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--brand-accent)]" />
                <span className="tracking-wide">{a.text}</span>
              </Link>
            ))}
          </div>
          {/* Edge fades so text doesn't visually slam the chip / right edge */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--brand-navy)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--brand-navy)] to-transparent" />
        </div>
      </div>
    </div>
  );
}
