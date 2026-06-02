import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Sri Sathya Sai Global School — Singapore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

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
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(13,138,135,0.30), transparent)",
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
            background:
              "radial-gradient(closest-side, rgba(234,88,12,0.22), transparent)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            fontWeight: 700,
            color: "#ea580c",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ea580c",
            }}
          />
          Singapore · International School
        </div>

        {/* Main row: title + logo */}
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
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                color: "#0b1d33",
                lineHeight: 1.05,
                letterSpacing: -1.5,
              }}
            >
              Sri Sathya Sai
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                color: "#0b1d33",
                lineHeight: 1.05,
                letterSpacing: -1.5,
              }}
            >
              Global School
            </div>
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
              “The End of Education is Character.”
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={240}
            height={240}
            alt=""
            style={{ borderRadius: 24 }}
          />
        </div>

        {/* Footer */}
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
                background: "#0d8a87",
              }}
            />
            Grades 1–8 · Holistic, Values-based
          </div>
          <div style={{ color: "#475569", fontWeight: 500 }}>
            srisathyasaiglobalschool-sg.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
