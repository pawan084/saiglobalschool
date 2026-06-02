type Props = {
  query?: string;
  zoom?: number;
  /** What address to display under the map */
  label: string;
  /** Link out to full directions */
  directionsHref?: string;
};

/**
 * Styled wrapper around Google Maps embed. Avoids the plain default iframe look —
 * adds branded chrome with address + directions CTA.
 */
export default function MapEmbed({
  query = "Singapore",
  zoom = 13,
  label,
  directionsHref,
}: Props) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  const directions = directionsHref ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className="rounded-md overflow-hidden border border-[var(--brand-rule)] bg-white">
      <div className="aspect-[16/9] relative">
        <iframe
          title="School location"
          src={src}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[var(--brand-rule)] bg-white">
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-accent)]">
            Campus
          </div>
          <div className="text-[14px] font-semibold text-[var(--brand-navy)] truncate">
            {label}
          </div>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white text-[12px] font-bold transition"
        >
          Directions →
        </a>
      </div>
    </div>
  );
}
