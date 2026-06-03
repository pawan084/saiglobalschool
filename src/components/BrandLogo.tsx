type Props = {
  size?: number;
  className?: string;
};

/**
 * Official Sri Sathya Sai Global School brand mark:
 * golden lotus-pillar at the centre with five values circles around it
 * (PEACE top, RIGHT CONDUCT upper-left, LOVE upper-right,
 *  TRUTH lower-left, NON-VIOLENCE lower-right).
 *
 * Served at a fixed 640px PNG; small enough that we don't need the
 * Next.js image optimiser.
 */
export default function BrandLogo({ size = 56, className = "" }: Props) {
  return (
    // Plain <img> is intentional: the asset is 328 KB and we use it at many
    // different widths; routing it through next/image would 400 on widths
    // outside the default set without us adding every one to the allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Sri Sathya Sai Global School"
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    />
  );
}
