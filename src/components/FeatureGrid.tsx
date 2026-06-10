import Image from "next/image";
import Icon from "./Icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

export type Feature = {
  title: string;
  body?: string;
  /** Icon name from the Icon component (preferred). String is accepted; renders only if it matches a known icon. */
  iconName?: IconName | string;
  /** Legacy emoji glyph — still rendered if iconName not provided */
  icon?: string;
  /** Optional image instead of icon */
  image?: string;
};

export default function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 | 4 | 5 }) {
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-3 lg:grid-cols-5",
  }[cols];
  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-3 auto-rows-fr`}>
      {items.map((f, i) => (
        <article
          key={i}
          className="card card-hover p-5 flex flex-col h-full"
        >
          {f.image ? (
            <div className="relative h-32 w-full mb-4 rounded overflow-hidden bg-[var(--brand-cream)]">
              <Image src={f.image} alt={f.title} fill sizes="33vw" className="object-cover" />
            </div>
          ) : f.iconName ? (
            <div className="h-11 w-11 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] grid place-items-center mb-3">
              <Icon name={f.iconName as IconName} size={20} />
            </div>
          ) : f.icon ? (
            <div className="h-11 w-11 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] grid place-items-center text-xl mb-3">
              {f.icon}
            </div>
          ) : null}
          <h3 className="font-bold text-[var(--brand-navy)] text-[15.5px] leading-tight">{f.title}</h3>
          {f.body && (
            <p className="mt-2 text-[13.5px] text-slate-600 leading-relaxed">{f.body}</p>
          )}
        </article>
      ))}
    </div>
  );
}
