import FeatureBlock from "./FeatureBlock";
import { getSidebarItems, getSectionMeta } from "@/data/relatedBySection";

type Props = {
  slug: string;
  /** Background variant — alternate with the page's last section for rhythm */
  tone?: "white" | "mist" | "cream";
};

const FALLBACK_IMAGE = "/img/home/hero/school-campus.jpg";

export default function RelatedFeatureBlock({ slug, tone = "mist" }: Props) {
  const items = getSidebarItems(slug);
  const meta = getSectionMeta(slug);
  if (!meta || items.length < 4) return null;

  const featured = items[0];
  const satellites = items.slice(1, 7);

  return (
    <FeatureBlock
      tone={tone}
      title={meta.title}
      intro={meta.intro}
      featured={{
        title: featured.title,
        body: featured.lead ?? "Read more about this aspect of life and learning at SSSGS.",
        image: featured.image ?? FALLBACK_IMAGE,
        href: featured.href,
      }}
      items={satellites.map((s) => ({
        title: s.title,
        // Only show a body when the item has a real lead — otherwise every
        // satellite card would repeat the same filler sentence.
        body: s.lead,
        image: s.image ?? FALLBACK_IMAGE,
        href: s.href,
      }))}
    />
  );
}
