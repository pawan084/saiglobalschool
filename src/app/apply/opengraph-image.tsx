import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Apply to Sri Sathya Sai Global School";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return buildOgImage({
    eyebrow: "Admissions · Apply",
    title: "Apply to SSSGS",
    subtitle: "A short five-step application. Save and resume on this device anytime.",
    accent: "accent",
    footerLeft: "Mid-year admissions welcome",
  });
}
