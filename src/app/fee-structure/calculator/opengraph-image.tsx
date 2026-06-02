import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Estimate fees at Sri Sathya Sai Global School";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return buildOgImage({
    eyebrow: "Fees · Calculator",
    title: "Estimate your annual outlay",
    subtitle: "Pick a grade, toggle add-ons, switch currency.",
    accent: "primary",
  });
}
