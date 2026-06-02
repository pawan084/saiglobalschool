type Props = {
  size?: number;
  /** Show only the lotus + values mark (no text) */
  variant?: "mark" | "stacked";
  className?: string;
};

/**
 * Sri Sathya Sai Global School brand mark.
 * Reference: golden lotus pillar at the centre, five values circles around it
 *   (PEACE top, RIGHT CONDUCT upper-left, LOVE upper-right, TRUTH lower-left,
 *    NON-VIOLENCE lower-right). Navy for the squared-on values, pink for the
 *    flanking values.
 */
export default function BrandLogo({ size = 56, variant = "mark", className = "" }: Props) {
  const w = size;
  const h = variant === "stacked" ? Math.round(size * 1.25) : Math.round(size * 0.86);
  return (
    <svg
      viewBox="0 0 240 240"
      width={w}
      height={h}
      role="img"
      aria-label="Sri Sathya Sai Global School"
      className={className}
    >
      <defs>
        <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0c460" />
          <stop offset="55%" stopColor="#cf9522" />
          <stop offset="100%" stopColor="#8d5e0c" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#ffe28a" />
          <stop offset="100%" stopColor="#cf9522" />
        </radialGradient>
      </defs>

      {/* Five value circles — petal arrangement */}
      <ValueCircle cx={120} cy={48}  r={36} fill="#0b1d33" label="PEACE" />
      <ValueCircle cx={56}  cy={86}  r={36} fill="#ec4f7c" label1="RIGHT" label2="CONDUCT" />
      <ValueCircle cx={184} cy={86}  r={36} fill="#ec4f7c" label="LOVE" />
      <ValueCircle cx={56}  cy={160} r={36} fill="#0b1d33" label="TRUTH" />
      <ValueCircle cx={184} cy={160} r={36} fill="#0b1d33" label1="NON" label2="VIOLENCE" />

      {/* Lotus pillar in the centre */}
      {/* Pillar base */}
      <rect x="92" y="200" width="56" height="16" rx="2" fill="url(#goldFill)" />
      <rect x="98" y="190" width="44" height="12" rx="2" fill="url(#goldFill)" />
      {/* Pillar shaft */}
      <rect x="106" y="120" width="28" height="72" fill="url(#goldFill)" />
      {/* Pillar capital — fluted */}
      <rect x="100" y="116" width="40" height="8" rx="2" fill="url(#goldFill)" />
      <rect x="103" y="108" width="34" height="10" rx="2" fill="url(#goldFill)" />
      {/* Lotus base bowl */}
      <ellipse cx="120" cy="102" rx="24" ry="8" fill="url(#goldGlow)" />
      {/* Lotus petals — back row */}
      <path d="M120 100 C 96 72, 92 60, 100 40 C 110 56, 116 76, 120 96 Z" fill="url(#goldGlow)" opacity="0.85" />
      <path d="M120 100 C 144 72, 148 60, 140 40 C 130 56, 124 76, 120 96 Z" fill="url(#goldGlow)" opacity="0.85" />
      {/* Lotus petals — middle row */}
      <path d="M120 100 C 100 80, 92 64, 104 46 C 114 66, 120 82, 120 96 Z" fill="url(#goldFill)" />
      <path d="M120 100 C 140 80, 148 64, 136 46 C 126 66, 120 82, 120 96 Z" fill="url(#goldFill)" />
      {/* Centre petal */}
      <path d="M120 100 L 114 56 Q 120 38 126 56 Z" fill="#ffe39a" />
      {/* Lotus tip */}
      <path d="M120 36 Q 124 46 120 56 Q 116 46 120 36 Z" fill="#f0c460" />
    </svg>
  );
}

function ValueCircle({
  cx,
  cy,
  r,
  fill,
  label,
  label1,
  label2,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  label?: string;
  label1?: string;
  label2?: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {/* subtle highlight */}
      <ellipse cx={cx - r * 0.25} cy={cy - r * 0.4} rx={r * 0.55} ry={r * 0.22} fill="rgba(255,255,255,0.12)" />
      {label && (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize={r * 0.34}
          fontWeight={800}
          fill="#fff"
          letterSpacing="0.04em"
        >
          {label}
        </text>
      )}
      {label1 && (
        <>
          <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize={r * 0.30} fontWeight={800} fill="#fff" letterSpacing="0.04em">
            {label1}
          </text>
          <text x={cx} y={cy + r * 0.28} textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize={r * 0.30} fontWeight={800} fill="#fff" letterSpacing="0.04em">
            {label2}
          </text>
        </>
      )}
    </g>
  );
}
