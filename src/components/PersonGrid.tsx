import Image from "next/image";

export type Person = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

export default function PersonGrid({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
      {people.map((p) => (
        <PersonCard key={p.name + p.role} person={p} />
      ))}
    </div>
  );
}

function PersonCard({ person: p }: { person: Person }) {
  return (
    <article
      className="card-fancy group relative rounded-2xl bg-white border border-[var(--brand-rule)] overflow-hidden flex flex-col"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Photo */}
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
        {/* Gradient scrim — bottom half tints navy for label legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background:
              "linear-gradient(to top, rgba(11,29,51,0.78) 0%, rgba(11,29,51,0.3) 55%, transparent 100%)",
          }}
        />
        {/* Name + role overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 lg:p-3.5 text-white">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--brand-accent)] opacity-95">
            {p.role}
          </div>
          <h3 className="font-display font-bold text-[15px] lg:text-[16px] leading-tight mt-0.5 tracking-tight">
            {p.name}
          </h3>
        </div>
      </div>

      {/* Optional bio (rarely supplied right now — appears below the photo) */}
      {p.bio && (
        <p className="px-4 py-3 text-[12.5px] text-slate-600 leading-relaxed">
          {p.bio}
        </p>
      )}
    </article>
  );
}
