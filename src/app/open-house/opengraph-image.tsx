import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Open House at Sri Sathya Sai Global School";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return buildOgImage({
    eyebrow: "Visit · Open House",
    title: "See SSSGS in motion.",
    subtitle: "Tour the labs, meet teachers, sit in on a class.",
    accent: "accent",
    footerLeft: "Limited slots · coffee on us",
  });
}
