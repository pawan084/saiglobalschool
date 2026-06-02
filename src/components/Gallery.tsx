"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; caption?: string };

type Props = {
  items: GalleryItem[];
  cols?: 2 | 3 | 4;
};

export default function Gallery({ items, cols = 3 }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const colsClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 md:grid-cols-3", 4: "sm:grid-cols-2 md:grid-cols-4" }[cols];

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
      <div className={`grid grid-cols-1 ${colsClass} gap-2`}>
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setOpenIdx(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded bg-slate-100"
            aria-label={`View ${it.alt}`}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-2 left-2 right-2 text-white text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition translate-y-1 group-hover:translate-y-0">
              {it.caption || it.alt}
            </div>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl"
            aria-label="Close"
          >
            ×
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl"
            aria-label="Next"
          >
            ›
          </button>

          <div className="relative max-w-[90vw] max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[openIdx].src}
              alt={items[openIdx].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
            <div className="font-medium">{items[openIdx].caption || items[openIdx].alt}</div>
            <div className="text-xs text-white/60 mt-1">
              {openIdx + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
