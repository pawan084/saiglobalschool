import InnerPageShell from "./InnerPageShell";
import ContentSection from "./ContentSection";
import FeatureGrid, { type Feature } from "./FeatureGrid";
import Link from "next/link";

export type SimplePage = {
  slug?: string;       // optional override (otherwise auto-from-page)
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumb: { label: string; href: string }[];
  intro?: string[];
  features?: { sectionTitle?: string; items: Feature[]; cols?: 2 | 3 | 4; tone?: "white" | "cream" | "muted" };
  followUp?: {
    sectionTitle?: string;
    body: string[];
    links?: { label: string; href: string }[];
  };
};

export default function SimpleContentPage({ slug, data }: { slug: string; data: SimplePage }) {
  return (
    <InnerPageShell
      slug={slug}
      hero={{
        eyebrow: data.eyebrow,
        title: data.title,
        lead: data.lead,
        breadcrumb: data.breadcrumb,
      }}
    >
      {data.intro && data.intro.length > 0 && (
        <ContentSection flush>
          <div className="space-y-4 text-slate-700 leading-relaxed text-[15.5px]">
            {data.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ContentSection>
      )}

      {data.features && (
        <ContentSection flush tone="cream" eyebrow="Highlights" title={data.features.sectionTitle}>
          <FeatureGrid items={data.features.items} cols={data.features.cols ?? 2} />
        </ContentSection>
      )}

      {data.followUp && (
        <ContentSection flush title={data.followUp.sectionTitle} eyebrow="In practice">
          <div className="space-y-3 text-slate-700 leading-relaxed text-[15px]">
            {data.followUp.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {data.followUp.links && data.followUp.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {data.followUp.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 rounded-full bg-white border border-slate-300 text-slate-800 text-[13px] font-bold hover:border-[var(--brand-primary)] transition"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
          )}
        </ContentSection>
      )}
    </InnerPageShell>
  );
}
