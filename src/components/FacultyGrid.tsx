"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { FACULTY, type FacultyMember } from "@/data/faculty";
import { useFocusTrap } from "@/lib/useFocusTrap";

export default function FacultyGrid() {
  const [selected, setSelected] = useState<FacultyMember | null>(null);
  const trapRef = useFocusTrap<HTMLDivElement>(!!selected);

  // Close modal on ESC
  useEffect(() => {
    if (!selected) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
        {FACULTY.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelected(p)}
            className="card-fancy group relative rounded-2xl bg-white border border-[var(--brand-rule)] overflow-hidden flex flex-col text-left"
            style={{ boxShadow: "var(--shadow-sm)" }}
            aria-label={`View bio of ${p.name}, ${p.role}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--brand-cream)]">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary-tint) 0%, var(--brand-cream) 100%)",
                  }}
                >
                  <span className="font-display font-bold text-[42px] text-[var(--brand-primary)]/55">
                    {p.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              )}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[42%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,29,51,0.82) 0%, rgba(11,29,51,0.3) 55%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <div className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-white/85">
                  {p.role}
                </div>
                <div className="font-display text-[15px] font-bold text-white leading-snug mt-0.5">
                  {p.name}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10.5px] text-white/80 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Read bio
                  <Icon name="arrow-right" size={10} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="faculty-bio-title"
          className="fixed inset-0 z-[80] grid items-end sm:items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            ref={trapRef}
            className="relative w-full max-w-[540px] rounded-3xl bg-white border border-[var(--brand-rule)] overflow-hidden"
            style={{ boxShadow: "0 40px 80px -20px rgba(11,29,51,0.55)" }}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/90 backdrop-blur text-slate-500 hover:text-[var(--brand-navy)] hover:bg-white transition z-10"
            >
              <Icon name="close" size={13} />
            </button>

            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--brand-cream)]">
              {selected.image && (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="540px"
                  className="object-cover object-top"
                />
              )}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[60%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,29,51,0.85) 0%, rgba(11,29,51,0.2) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--brand-accent)]">
                  {selected.role}
                </div>
                <h2
                  id="faculty-bio-title"
                  className="font-display text-[24px] font-bold text-white mt-1 leading-tight"
                >
                  {selected.name}
                </h2>
              </div>
            </div>

            <div className="p-5 lg:p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-[14px] text-slate-600 italic leading-snug">
                {selected.short}
              </p>

              {selected.qualifications.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.qualifications.map((q) => (
                    <span
                      key={q}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--brand-primary-tint)] border border-[var(--brand-primary)]/20 text-[10.5px] font-bold text-[var(--brand-primary-dark)]"
                    >
                      <Icon name="ribbon" size={9} />
                      {q}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-3 text-[14px] text-slate-700 leading-relaxed">
                {selected.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {selected.teaches && selected.teaches.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-[var(--brand-cream)]/60 border border-[var(--brand-rule)]">
                  <div className="news-eyebrow">Teaches</div>
                  <ul className="mt-1 space-y-1 text-[13px] text-slate-700">
                    {selected.teaches.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Icon name="check" size={11} className="text-[var(--brand-primary)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.quote && (
                <figure className="mt-4 p-4 rounded-xl bg-white border-l-4 border-[var(--brand-accent)]">
                  <div className="text-[var(--brand-accent)] text-2xl leading-none">&ldquo;</div>
                  <blockquote className="mt-1 text-[13.5px] italic text-[var(--brand-navy)] leading-snug">
                    {selected.quote}
                  </blockquote>
                </figure>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
