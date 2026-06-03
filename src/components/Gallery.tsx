"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import { useFocusTrap } from "@/lib/useFocusTrap";

export type GalleryItem = { src: string; alt: string; caption?: string };

type Props = {
  items: GalleryItem[];
  cols?: 2 | 3 | 4;
};

export default function Gallery({ items, cols = 3 }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(openIdx !== null);
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 md:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-4",
  }[cols];

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, close, prev, next]);

  return (
    <>
      <div className={`grid grid-cols-1 ${colsClass} gap-3 lg:gap-4`}>
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 border border-[var(--brand-rule)] transition-shadow hover:shadow-lg"
            style={{ boxShadow: "var(--shadow-xs)" }}
            aria-label={`View ${it.alt}`}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
            />
            {/* Gradient scrim */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(11,29,51,0.85) 0%, rgba(11,29,51,0.18) 55%, transparent 100%)",
              }}
            />
            {/* Zoom badge top-right */}
            <span className="absolute top-2.5 right-2.5 h-7 w-7 grid place-items-center rounded-full bg-white/95 text-[var(--brand-navy)] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
              <Icon name="plus" size={14} />
            </span>
            {/* Caption + arrow */}
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 flex items-end justify-between gap-2 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[12.5px] font-semibold leading-snug">
                {it.caption || it.alt}
              </span>
              <span className="grid place-items-center h-6 w-6 rounded-full bg-[var(--brand-accent)] shrink-0">
                <Icon name="arrow-up-right" size={10} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          ref={trapRef}
          className="fixed inset-0 z-[100] bg-[rgba(11,29,51,0.94)] backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 px-5 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3 text-[12px]">
              <span className="px-2 py-1 rounded-full bg-white/10 border border-white/15 font-bold uppercase tracking-[0.12em]">
                Gallery
              </span>
              <span className="tabular-nums text-white/80">
                {openIdx + 1} <span className="text-white/40">/</span> {items.length}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition"
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 lg:left-7 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition"
            aria-label="Previous"
          >
            <Icon name="arrow-left" size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 lg:right-7 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition"
            aria-label="Next"
          >
            <Icon name="arrow-right" size={16} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[88vw] max-h-[78vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[openIdx].src}
              alt={items[openIdx].alt}
              fill
              sizes="88vw"
              className="object-contain"
            />
          </div>

          {/* Caption card */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-[88vw]">
            <div className="px-4 py-2.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white text-[13px] font-medium text-center">
              {items[openIdx].caption || items[openIdx].alt}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
