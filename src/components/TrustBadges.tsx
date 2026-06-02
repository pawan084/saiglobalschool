type Props = {
  variant?: "footer" | "inline";
};

const badges = [
  { label: "CPE Singapore", sub: "Registered PEI", id: "Reg. No. 202505842W" },
  { label: "Period of Registration", sub: "2026 – 2028", id: "Valid" },
  { label: "Curriculum", sub: "NCERT-aligned", id: "Grades 1–8" },
  { label: "Teacher–Student", sub: "1 : 20 average", id: "Small-group" },
];

export default function TrustBadges({ variant = "footer" }: Props) {
  if (variant === "footer") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((b) => (
          <div
            key={b.label}
            className="rounded border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <div className="text-[10px] uppercase tracking-wide text-slate-400">{b.label}</div>
            <div className="text-[13px] font-bold text-white leading-tight mt-0.5">{b.sub}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{b.id}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((b) => (
        <div
          key={b.label}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-rule)] bg-white px-3 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
          <span className="text-[12px] font-bold text-[var(--brand-navy)]">{b.sub}</span>
          <span className="text-[11px] text-slate-500">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
