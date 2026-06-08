import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Admissions at Sri Sathya Sai Global School";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return buildOgImage({
    eyebrow: "Admissions",
    title: "Join primary & middle school",
    subtitle: "NCERT-aligned curriculum · Values-rooted · Mid-year admissions welcome",
    accent: "navy",
  });
}
