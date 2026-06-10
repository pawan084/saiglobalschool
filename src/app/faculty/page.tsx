import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FacultyGrid from "@/components/FacultyGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Faculty",
  description: "Meet the experienced, values-led educators behind small-group teaching at Sri Sathya Sai Global School, Singapore — primary and middle school faculty.",
  alternates: { canonical: "/faculty" },
};

const pedagogy = [
  { icon: "eye", title: "Small-group learning", body: "Lower teacher–student ratios mean more attention, tighter feedback loops, and visible growth for every child." },
  { icon: "flask", title: "Application-based", body: "Concepts are taught with hands-on activities, projects and lab work. Children build, observe and present — not just listen." },
  { icon: "leaf", title: "Values-led", body: "Character, communication and conduct sit alongside academic outcomes in every lesson plan." },
  { icon: "chat", title: "Communicative", body: "Reading aloud, discussion, debate and presentation are part of every subject — not extras." },
] as const;

const facultyVoices = [
  {
    quote: "We don't just teach subjects — we teach children. Each one comes with a different story; the work is to meet them where they are.",
    author: "Principal",
  },
  {
    quote: "Lab work and field trips aren't decoration. They're where the learning sticks.",
    author: "HOS & Science Teacher",
  },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="faculty"
      hero={{
        eyebrow: "People",
        title: "Our Faculty",
        lead: "Experienced educators who know every child by name. SSSGS faculty bring deep subject expertise and a values-led teaching practice.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Faculty", href: "/faculty" },
        ],
      }}
      ctaTitle="Meet our faculty in person"
      ctaSubtitle="Open House and campus tours include time with our subject leads."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about-us" },
          { label: "Faculty", href: "/faculty" },
        ]}
      />
      <ContentSection flush eyebrow="Faculty roster" title="Meet our team">
        <p className="mb-5 text-[13.5px] text-slate-500 max-w-2xl">
          Click a portrait to read the full bio.
        </p>
        <FacultyGrid />
        <p className="mt-6 text-[13.5px] text-slate-500 leading-relaxed max-w-2xl">
          Additional subject leads cover Physical Education, Music & Performing Arts. Photos and
          full bios are added as new faculty join.
        </p>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="How we teach" title="Pedagogy that respects every learner">
        <div className="grid sm:grid-cols-2 gap-3">
          {pedagogy.map((p) => (
            <div key={p.title} className="card p-5 flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] grid place-items-center">
                <Icon name={p.icon} size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[var(--brand-navy)]">{p.title}</h3>
                <p className="mt-1 text-[13.5px] text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection flush eyebrow="In their words" title="Voices from the faculty room">
        <div className="grid lg:grid-cols-2 gap-4">
          {facultyVoices.map((v, i) => (
            <figure
              key={i}
              className="p-5 bg-white border border-[var(--brand-rule)] rounded-md border-l-4 border-l-[var(--brand-accent)]"
            >
              <div className="text-[var(--brand-accent)] text-3xl leading-none">&ldquo;</div>
              <blockquote className="mt-1 text-[15px] italic text-[var(--brand-navy)] leading-snug">
                {v.quote}
              </blockquote>
              <figcaption className="mt-3 text-[12px] font-bold text-slate-500 uppercase tracking-wide">
                — {v.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
