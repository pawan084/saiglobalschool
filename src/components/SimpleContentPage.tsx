import InnerPageShell from "./InnerPageShell";
import ContentSection from "./ContentSection";
import FeatureGrid, { type Feature } from "./FeatureGrid";
import Image from "next/image";
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

const pageImages: Record<string, { src: string; alt: string; position?: "center" | "top" | "bottom" }> = {
  "academic-pathway": {
    src: "/img/featuredBlock/academic-pathway.jpg",
    alt: "Students progressing through the SSSGS academic pathway",
  },
  "assessment-structure": {
    src: "/img/featuredBlock/academic-assessment-structure.jpg",
    alt: "Assessment and classroom feedback at SSSGS",
  },
  "courses-offered": {
    src: "/img/featuredBlock/courses-offered.jpg",
    alt: "Courses and curriculum at SSSGS",
  },
  "parent-community": {
    src: "/img/navbar/about/about-us/parent-support.jpg",
    alt: "Parent community and support at SSSGS",
    position: "top",
  },
  "student-support": {
    src: "/img/featuredBlock/student-support.jpg",
    alt: "Student support at SSSGS",
    position: "top",
  },
  "technology-lms": {
    src: "/img/featuredBlock/technology-lms.jpg",
    alt: "Technology and LMS support at SSSGS",
  },
  "enrichment-activities": {
    src: "/img/featuredBlock/enrichment-activities.jpg",
    alt: "Enrichment activities at SSSGS",
  },
  "phonics-classes": {
    src: "/img/home/resources-for-parents/phonics-classes.jpg",
    alt: "Phonics classes at SSSGS",
  },
  "abacus-vedic-maths": {
    src: "/img/home/resources-for-parents/abacus-vedic-maths.jpg",
    alt: "Abacus and Vedic Maths at SSSGS",
  },
  olympiad: {
    src: "/img/featuredBlock/enrichment-activities.jpg",
    alt: "Olympiad coaching at SSSGS",
  },
  "non-academic": {
    src: "/img/featuredBlock/co-curricular-activities.jpg",
    alt: "Non-academic activities at SSSGS",
  },
  "school-uniform-and-transportation": {
    src: "/img/featuredBlock/practical-stuff-handled.jpg",
    alt: "School uniform and transportation at SSSGS",
  },
};

const objectPosition = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export default function SimpleContentPage({
  slug,
  data,
  showRelated,
}: {
  slug: string;
  data: SimplePage;
  showRelated?: boolean;
}) {
  const image = pageImages[slug];
  const introCopy = data.intro && data.intro.length > 0 ? data.intro : [data.lead];

  return (
    <InnerPageShell
      slug={slug}
      hero={{
        eyebrow: data.eyebrow,
        title: data.title,
        lead: data.lead,
        breadcrumb: data.breadcrumb,
      }}
      showRelated={showRelated}
    >
      {(introCopy.length > 0 || image) && (
        <ContentSection flush>
          <div className={`grid gap-6 ${image ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center" : ""}`}>
            <div className="space-y-4 text-slate-700 leading-relaxed text-[15.5px]">
              {introCopy.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {image && (
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`object-cover ${objectPosition[image.position ?? "center"]}`}
                />
              </div>
            )}
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
