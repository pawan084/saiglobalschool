import Icon from "./Icon";

type Props = {
  variant?: "footer" | "inline";
};

type IconName = React.ComponentProps<typeof Icon>["name"];

const badges: Array<{ label: string; sub: string; id: string; icon: IconName }> = [
  { label: "CPE Singapore",          sub: "Registered PEI", id: "Reg. No. 202505842W", icon: "shield" },
  { label: "Period of Registration", sub: "2026 – 2028",    id: "Valid",                icon: "calendar" },
  { label: "Curriculum",             sub: "NCERT-aligned",  id: "Primary & Middle School", icon: "graduation" },
  { label: "Teacher–Student",        sub: "1 : 20 maximum", id: "Small-group",          icon: "users" },
];

export default function TrustBadges({ variant = "footer" }: Props) {
  if (variant === "footer") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((b) => (
          <div
            key={b.label}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3 flex items-start gap-3 hover:bg-white/[0.07] transition-colors"
          >
            <span className="shrink-0 grid place-items-center h-9 w-9 rounded-md bg-gradient-to-br from-[var(--brand-accent)]/15 to-transparent border border-white/10 text-[var(--brand-accent)]">
              <Icon name={b.icon} size={16} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.1em] text-slate-400">{b.label}</div>
              <div className="text-[13.5px] font-bold text-white leading-tight mt-0.5">{b.sub}</div>
              <div className="text-[10.5px] text-slate-500 mt-0.5">{b.id}</div>
            </div>
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
          <Icon name={b.icon} size={13} className="text-[var(--brand-primary)]" />
          <span className="text-[12px] font-bold text-[var(--brand-navy)]">{b.sub}</span>
          <span className="text-[11px] text-slate-500">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
