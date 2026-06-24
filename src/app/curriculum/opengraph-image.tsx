import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Curriculum at Sri Sathya Sai Global School";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return buildOgImage({
    eyebrow: "Academics · Curriculum",
    title: "NCERT-aligned, values-integrated",
    subtitle: "Structured progression across primary and secondary school with lab and applied work.",
    accent: "primary",
  });
}
