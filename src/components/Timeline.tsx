export type TimelineItem = {
  tag: string;
  title: string;
  body: string;
  icon?: string;
};

type Props = {
  items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
  return (
    <ol className="relative pl-1">
      {/* Vertical connecting line */}
      <div
        className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-gradient-to-b from-[var(--brand-primary)] via-[var(--brand-primary)]/30 to-[var(--brand-rule)]"
        aria-hidden
      />
      {items.map((it, i) => (
        <li
          key={i}
          className="relative pl-14 pb-7 last:pb-0 group"
        >
          {/* Marker */}
          <span
            className="absolute left-0 top-0 h-10 w-10 rounded-full bg-white border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] grid place-items-center font-extrabold text-[15px] shadow-sm transition group-hover:bg-[var(--brand-primary)] group-hover:text-white"
            aria-hidden
          >
            {it.icon ?? i + 1}
          </span>
          {/* Card */}
          <div className="p-4 rounded-md border border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)] hover:shadow-sm transition">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-accent)]">
                {it.tag}
              </span>
              <span className="h-px flex-1 bg-[var(--brand-rule)]" />
            </div>
            <h3 className="font-bold text-[var(--brand-navy)] text-[16px] leading-tight">{it.title}</h3>
            <p className="mt-1.5 text-[14px] text-slate-600 leading-relaxed">{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
