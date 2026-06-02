import Image from "next/image";

export type Person = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

export default function PersonGrid({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {people.map((p) => (
        <article key={p.name} className="text-center">
          <div className="relative aspect-[4/5] mx-auto w-full max-w-[200px] overflow-hidden rounded-md bg-[var(--brand-cream)] mb-3">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-[var(--brand-primary)] font-bold text-2xl">
                {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
            )}
          </div>
          <h3 className="font-bold text-[var(--brand-navy)] text-[15px] leading-tight">{p.name}</h3>
          <div className="text-xs text-[var(--brand-accent)] font-semibold uppercase tracking-wide mt-1">
            {p.role}
          </div>
          {p.bio && <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.bio}</p>}
        </article>
      ))}
    </div>
  );
}
