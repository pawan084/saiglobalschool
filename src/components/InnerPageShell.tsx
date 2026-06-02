import PageHero from "./PageHero";
import CTAStrip from "./CTAStrip";
import RevealOnScroll from "./RevealOnScroll";
import RelatedFeatureBlock from "./RelatedFeatureBlock";

type Props = {
  slug: string;
  hero: {
    eyebrow: string;
    title: string;
    lead?: string;
    breadcrumb?: { label: string; href: string }[];
    tone?: "teal" | "navy" | "cream";
  };
  children: React.ReactNode;
  ctaTitle?: string;
  ctaSubtitle?: string;
  /** Background tone for the related-block (default "mist") */
  relatedTone?: "white" | "mist" | "cream";
};

/**
 * Inner-page layout:
 *   - PageHero across the top
 *   - Full-width content column (`children`)
 *   - RelatedFeatureBlock matching the home pattern (1 big + 3 satellites)
 *   - CTA strip at the bottom
 */
export default function InnerPageShell({
  slug,
  hero,
  children,
  ctaTitle,
  ctaSubtitle,
  relatedTone = "mist",
}: Props) {
  return (
    <>
      <PageHero {...hero} />

      <div className="section-shell py-10 lg:py-12">
        <RevealOnScroll>{children}</RevealOnScroll>
      </div>

      <RelatedFeatureBlock slug={slug} tone={relatedTone} />

      <CTAStrip title={ctaTitle} subtitle={ctaSubtitle} />
    </>
  );
}
