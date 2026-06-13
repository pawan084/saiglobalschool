"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "react-responsive-modal";
import Icon from "./Icon";
import { FACULTY, type FacultyMember } from "@/data/faculty";

export default function FacultyGrid() {
  const [selected, setSelected] = useState<FacultyMember | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
        {FACULTY.map((p, index) => (
          <button
            key={p.slug}
            onClick={() => setSelected(p)}
            className="card-fancy group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--brand-rule)] bg-white text-left"
            style={{ boxShadow: "var(--shadow-sm)" }}
            aria-label={`View bio of ${p.name}, ${p.role}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--brand-cream)]">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized
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

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          center
          showCloseIcon={false}
          animationDuration={0}
          ariaLabelledby="faculty-bio-title"
          styles={{
            root: {
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              inset: 0,
              zIndex: 1000,
            },
            overlay: {
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              inset: 0,
              zIndex: -1,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
            },
            modalContainer: {
              alignItems: "center",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              overflowX: "hidden",
              overflowY: "auto",
              padding: "1.5rem 0.75rem",
              textAlign: "center",
            },
            modal: {
              background: "#fff",
              border: "1px solid var(--brand-rule)",
              borderRadius: "20px",
              boxShadow: "0 40px 80px -20px rgba(11,29,51,0.55)",
              display: "block",
              margin: 0,
              maxWidth: "560px",
              overflow: "hidden",
              padding: "16px",
              position: "relative",
              textAlign: "left",
              width: "min(94vw, 560px)",
            },
          }}
        >
          <>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/95 text-slate-500 shadow-sm backdrop-blur transition hover:bg-white hover:text-[var(--brand-navy)]"
            >
              <Icon name="close" size={13} />
            </button>

            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--brand-cream)]">
              {selected.image && (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  loading="eager"
                  sizes="560px"
                  unoptimized
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
                  className="font-display mt-1 text-[24px] font-bold leading-tight text-white"
                >
                  {selected.name}
                </h2>
              </div>
            </div>

            <div className="max-h-[58vh] overflow-y-auto px-2 pb-1 pt-5 sm:px-3">
              {selected.short && (
                <p className="text-[14px] leading-snug text-slate-600 italic">
                  {selected.short}
                </p>
              )}

              {selected.qualifications && selected.qualifications.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.qualifications.map((q) => (
                    <span
                      key={q}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--brand-primary)]/20 bg-[var(--brand-primary-tint)] px-2 py-1 text-[10.5px] font-bold text-[var(--brand-primary-dark)]"
                    >
                      <Icon name="ribbon" size={9} />
                      {q}
                    </span>
                  ))}
                </div>
              )}

              {selected.bio && selected.bio.length > 0 ? (
                <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-slate-700">
                  {selected.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : !selected.short && (
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">
                  Full profile coming soon. Contact admissions for details about this member of our teaching team.
                </p>
              )}

              {selected.teaches && selected.teaches.length > 0 && (
                <div className="mt-4 rounded-xl border border-[var(--brand-rule)] bg-[var(--brand-cream)]/60 p-3">
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
                <figure className="mt-4 rounded-xl border-l-4 border-[var(--brand-accent)] bg-white p-4">
                  <div className="text-2xl leading-none text-[var(--brand-accent)]">&ldquo;</div>
                  <blockquote className="mt-1 text-[13.5px] leading-snug text-[var(--brand-navy)] italic">
                    {selected.quote}
                  </blockquote>
                </figure>
              )}
            </div>
          </>
        </Modal>
      )}
    </>
  );
}
