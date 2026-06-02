import Icon from "./Icon";

type Props = {
  query?: string;
  zoom?: number;
  /** Address line shown on the overlay card */
  label: string;
  /** Optional override for the directions URL */
  directionsHref?: string;
};

/**
 * Branded wrapper around the Google Maps embed.
 * Adds a soft frame, a hairline border, and a floating address card with a
 * "Directions" CTA that sits over the bottom-left corner of the map.
 */
export default function MapEmbed({
  query = "Singapore",
  zoom = 13,
  label,
  directionsHref,
}: Props) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&z=${zoom}&output=embed`;
  const directions =
    directionsHref ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[var(--brand-rule)] bg-white" style={{ boxShadow: "var(--shadow-md)" }}>
      <div className="aspect-[16/10] relative">
        <iframe
          title="School location"
          src={src}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Bottom gradient so the address card pops over busy map content */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(11,29,51,0.32), transparent)",
          }}
        />
      </div>

      {/* Floating address card */}
      <div className="absolute left-4 right-4 bottom-4 lg:left-5 lg:right-auto lg:bottom-5 lg:max-w-[420px]">
        <div
          className="rounded-xl bg-white/95 backdrop-blur border border-[var(--brand-rule)] px-4 py-3 flex items-center gap-3"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          <span className="grid place-items-center h-10 w-10 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] shrink-0">
            <Icon name="map-pin" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--brand-accent)]">
              Campus
            </div>
            <div className="text-[13.5px] font-bold text-[var(--brand-navy)] truncate">
              {label}
            </div>
          </div>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--brand-navy)] hover:bg-[var(--brand-navy-soft)] text-white text-[12.5px] font-bold transition"
          >
            Directions
            <Icon name="arrow-up-right" size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
