import NewsSection from "./NewsSection";
import PageHero from "./PageHero";
import CTAStrip from "./CTAStrip";
import type { SectionSpec } from "@/data/sections";

type Props = {
  title: string;
  eyebrow?: string;
  lead?: string;
  primary: SectionSpec;
  related?: SectionSpec[];
  breadcrumb?: { label: string; href: string }[];
};

export default function SectionPage({
  title,
  eyebrow,
  lead,
  primary,
  related = [],
  breadcrumb,
}: Props) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow ?? primary.title}
        title={title}
        lead={lead}
        breadcrumb={breadcrumb}
      />
      <div className="section-shell py-4">
        <NewsSection {...primary} priorityHero />
        {related.map((s, i) => (
          <NewsSection key={i} {...s} />
        ))}
      </div>
      <CTAStrip />
    </>
  );
}
