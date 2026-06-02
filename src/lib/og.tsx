import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Accent = "primary" | "accent" | "navy";

const ACCENT_HEX: Record<Accent, { primary: string; soft: string }> = {
  primary: { primary: "#0d8a87", soft: "rgba(13,138,135,0.30)" },
  accent: { primary: "#ea580c", soft: "rgba(234,88,12,0.30)" },
  navy: { primary: "#0b1d33", soft: "rgba(11,29,51,0.28)" },
};

type Args = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: Accent;
  footerLeft?: string;
};

export async function buildOgImage({
  eyebrow,
  title,
  subtitle,
  accent = "primary",
  footerLeft,
}: Args) {
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;
  const palette = ACCENT_HEX[accent];

  // Split long titles by space at the rough mid-point so the layout breathes.
  const lines = splitTitle(title, 24);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #fff8eb 0%, #ffffff 45%, #eef0fc 100%)",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${palette.soft}, transparent)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(234,88,12,0.22), transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            fontWeight: 700,
            color: palette.primary,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: palette.primary,
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 32,
            gap: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {lines.map((ln, i) => (
              <div
                key={i}
                style={{
                  fontSize: lines.length > 2 ? 60 : 76,
                  fontWeight: 800,
                  color: "#0b1d33",
                  lineHeight: 1.05,
                  letterSpacing: -1.5,
                }}
              >
                {ln}
              </div>
            ))}
            {subtitle && (
              <div
                style={{
                  marginTop: 28,
                  fontSize: 28,
                  color: "#475569",
                  fontStyle: "italic",
                  fontWeight: 500,
                  maxWidth: 720,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={220}
            height={220}
            alt=""
            style={{ borderRadius: 24 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(11,29,51,0.10)",
            fontSize: 22,
            color: "#0b1d33",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: palette.primary,
              }}
            />
            {footerLeft || "Sri Sathya Sai Global School · Singapore"}
          </div>
          <div style={{ color: "#475569", fontWeight: 500 }}>
            srisathyasaiglobalschool-sg.com
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}

function splitTitle(title: string, softMax = 24): string[] {
  const words = title.split(" ");
  if (title.length <= softMax) return [title];
  // Greedy 2-line split
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}
