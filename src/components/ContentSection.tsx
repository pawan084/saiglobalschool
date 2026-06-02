type Props = {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  tone?: "white" | "cream" | "muted" | "navy";
  id?: string;
  narrow?: boolean;
  /** When inside InnerPageShell the section is already in a constrained column — skip outer paddings. */
  flush?: boolean;
};

const tones = {
  white: "bg-white",
  cream: "bg-[var(--brand-cream)]",
  muted: "bg-slate-50",
  navy: "bg-[var(--brand-navy)] text-white",
} as const;

export default function ContentSection({
  title,
  eyebrow,
  children,
  tone = "white",
  id,
  narrow,
  flush,
}: Props) {
  // Flush = inside the InnerPageShell column (no horizontal shell); standalone = normal section
  const pad = flush ? "py-5 first:pt-0 last:pb-0" : "py-10 lg:py-14";
  // Apply background tone via a wrapper rather than the section so flush sections inside the shell
  // can paint cream/muted backgrounds across the column width.
  const wrapClasses = `${pad} ${tones[tone]} ${flush && tone !== "white" ? "px-4 -mx-4 rounded" : ""}`;
  return (
    <section id={id} className={wrapClasses}>
      <div className={`${flush ? "" : "section-shell"} ${narrow ? "max-w-3xl" : ""}`}>
        {eyebrow && (
          <div className="news-eyebrow mb-1.5">{eyebrow}</div>
        )}
        {title && (
          <h2 className={`text-[20px] lg:text-[24px] font-extrabold mb-4 news-headline ${
            tone === "navy" ? "text-white" : ""
          }`}>{title}</h2>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
}
