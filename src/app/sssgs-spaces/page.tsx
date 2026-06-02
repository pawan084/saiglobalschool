import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import Link from "next/link";

export const metadata = {
  title: "SSSGS Spaces",
  description: "Classrooms, labs, library and learning spaces at Sri Sathya Sai Global School.",
};

const gallery: GalleryItem[] = [
  { src: "/img/school_edited.jpg", alt: "Campus building", caption: "The SSSGS campus" },
  { src: "/img/lsp07568_jpg.jpg", alt: "Classroom", caption: "Bright, well-organised classrooms" },
  { src: "/img/labs-science.png", alt: "Science Lab", caption: "Hands-on science learning" },
  { src: "/img/lab-english_jpg.jpg", alt: "Language Lab", caption: "Language Lab in session" },
  { src: "/img/grade1-8_edited.jpg", alt: "Students at work", caption: "Students at work" },
  { src: "/img/ss1_edited.jpg", alt: "In session", caption: "A class in session" },
];

const spaces = [
  { iconName: "book-open", title: "Classrooms", body: "Bright, well-organised classrooms with movable furniture for whole-group, small-group and pair work." },
  { iconName: "flask", title: "Learning Labs", body: "Four dedicated labs — Language, Science, Maths and ICT — built for hands-on application." },
  { iconName: "book-open", title: "Library & Reading", body: "Curated collection across grade levels, with quiet corners for sustained reading." },
  { iconName: "palette", title: "Creative & Performing Arts", body: "Spaces for music, drama, dance and visual art — children explore expression every week." },
  { iconName: "play", title: "Activity Zones", body: "Indoor and outdoor activity zones for physical education, free play and break-time movement." },
  { iconName: "handshake", title: "Reflection & Community", body: "Shared spaces for morning circles, assemblies and quiet reflection moments." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="sssgs-spaces"
      hero={{
        eyebrow: "Campus",
        title: "SSSGS Spaces — classrooms, labs, library and more",
        lead: "Every space at SSSGS is built around how children actually learn — focus, movement, conversation and reflection.",
        breadcrumb: [
          { label: "Campus", href: "/campus" },
          { label: "SSSGS Spaces", href: "/sssgs-spaces" },
        ],
      }}
      ctaTitle="See the spaces yourself"
      ctaSubtitle="A campus tour shows you every learning space at SSSGS."
    >
      <ContentSection flush eyebrow="Gallery" title="A look inside SSSGS">
        <Gallery items={gallery} cols={3} />
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="The spaces" title="What you'll find around campus">
        <FeatureGrid items={spaces} cols={3} />
      </ContentSection>

      <ContentSection flush eyebrow="Design intent" title="Why these spaces, this way?">
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { label: "Focus", body: "Acoustically calm classrooms with clear sightlines so children stay engaged without strain." },
            { label: "Movement", body: "Furniture moves easily — small groups, pair work, solo reading and presentation all happen in one room." },
            { label: "Reflection", body: "Dedicated quiet corners and circle spaces — the school day always returns to thought." },
          ].map((d) => (
            <div key={d.label} className="p-4 border border-[var(--brand-rule)] rounded-md bg-white">
              <div className="text-[var(--brand-accent)] text-[11px] font-bold uppercase tracking-[0.08em]">
                {d.label}
              </div>
              <p className="mt-1 text-[14px] text-slate-700 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/facilities" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-[var(--brand-primary)] text-[var(--brand-navy)] text-[13px] font-bold transition">
            All facilities →
          </Link>
          <Link href="/a-day-at-sssgs" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-[var(--brand-primary)] text-[var(--brand-navy)] text-[13px] font-bold transition">
            A day at SSSGS →
          </Link>
          <Link href="/campus-address" className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-[var(--brand-primary)] text-[var(--brand-navy)] text-[13px] font-bold transition">
            Campus address →
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
