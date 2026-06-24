import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import CourseJsonLd from "@/components/CourseJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";
import Link from "next/link";
import { SUBJECTS } from "@/data/subjects";

export const metadata = {
  title: "Curriculum",
  description: "NCERT-aligned, integrated curriculum at SSSGS Singapore — structured progression, conceptual depth, and applied learning across primary and secondary school.",
  alternates: { canonical: "/curriculum" },
};

const pillars = [
  { number: "01", title: "Curriculum Alignment", body: "Curriculum is aligned with academic frameworks to ensure progression and continuity across levels — no matter what curriculum your child came from." },
  { number: "02", title: "Learning Approach", body: "Students engage in structured lessons supported by activities that reinforce understanding and active participation." },
  { number: "03", title: "Progress Monitoring", body: "Student progress is tracked through regular formative checks and end-of-term reviews — and shared with parents transparently." },
  { number: "04", title: "Teaching Faculty", body: "Classes are conducted by qualified educators who give individualised guidance, not just whole-group instruction." },
];

const grades = [
  {
    band: "Grades 1–2",
    label: "FOUNDATIONAL STAGE",
    focus: "English, Mathematics, Environmental Studies, Second Language, ICT and Arts — subject-led teaching with foundational reading, numeracy and classroom routines.",
    accent: "bg-[var(--brand-primary)]",
  },
  {
    band: "Grades 3–5",
    label: "PREPARATORY STAGE",
    focus: "Concept building across English, Second & Third Language, Mathematics, Science, Social Science and ICT.",
    accent: "bg-[var(--brand-accent)]",
  },
  {
    band: "Grades 6–8",
    label: "MIDDLE STAGE",
    focus: "Application, projects, lab work, exam-readiness and synthesis across subjects.",
    accent: "bg-[var(--brand-navy)]",
  },
];

const supportingPrograms = [
  { title: "Learning Labs", body: "Science, Maths, Language, English and ICT — timetabled hands-on application.", href: "/learning-labs" },
  { title: "Assessment Structure", body: "Daily formative + term summative + oral & project work.", href: "/assessment-structure" },
  { title: "Academic Pathway", body: "Detailed grade-by-grade progression and outcomes.", href: "/academic-pathway" },
  { title: "Courses Offered", body: "All subjects across primary and secondary school.", href: "/courses-offered" },
  { title: "Curriculum Comparison", body: "How NCERT alignment maps onto CBSE, ICSE, Cambridge and IB for transitioning families.", href: "/curriculum/comparison" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="curriculum"
      hero={{
        eyebrow: "Curriculum",
        title: "A comprehensive, NCERT-aligned curriculum",
        lead: "Concept-led teaching, structured academic progression and age-appropriate outcomes — built for continuity across CBSE, ICSE, Cambridge, IB and local-curriculum transitions.",
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
        ],
      }}
      ctaTitle="See the curriculum in action"
      ctaSubtitle="Book a campus tour and sit in on a class."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/curriculum" },
        ]}
      />
      <CourseJsonLd
        name="NCERT-aligned Integrated Curriculum"
        description="A structured, NCERT-aligned curriculum integrating Language, Maths, Science, Social Science, ICT, the Arts and Values Education across primary and secondary school."
        path="/curriculum"
        grades="Primary and secondary school"
      />

      {/* Four pillars — big numbered cards */}
      <ContentSection flush eyebrow="Pillars" title="Four guiding principles">
        <div className="grid sm:grid-cols-2 gap-3">
          {pillars.map((p) => (
            <article
              key={p.number}
              className="relative p-5 pl-16 border border-[var(--brand-rule)] rounded-md bg-white hover:border-[var(--brand-primary)] hover:shadow-sm transition overflow-hidden"
            >
              <div className="absolute top-3 left-3 text-[44px] leading-none font-extrabold text-[var(--brand-primary)]/15">
                {p.number}
              </div>
              <h3 className="font-bold text-[var(--brand-navy)] relative">{p.title}</h3>
              <p className="mt-1.5 text-[13.5px] text-slate-600 leading-relaxed relative">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </ContentSection>

      {/* Grades progression — visual bands */}
      <ContentSection flush tone="cream" eyebrow="By grade band" title="Primary and secondary school progression">
        <p className="text-slate-600 text-[14.5px] mb-5 max-w-2xl">
          The same set of subjects deepens at each band, with developmentally appropriate
          expectations.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {grades.map((g) => (
            <div
              key={g.band}
              className="relative overflow-hidden rounded-md border border-[var(--brand-rule)] bg-white"
            >
              <div className={`${g.accent} text-white p-4`}>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] opacity-80">
                  {g.label}
                </div>
                <div className="text-[20px] font-extrabold leading-tight mt-0.5">{g.band}</div>
              </div>
              <div className="p-4 text-[13.5px] text-slate-700 leading-relaxed">
                {g.focus}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/academic-pathway"
          className="inline-flex mt-5 text-[var(--brand-primary)] font-bold hover:text-[var(--brand-primary-dark)] text-sm"
        >
          Full academic pathway →
        </Link>
      </ContentSection>

      {/* Subject explorer */}
      <ContentSection flush eyebrow="Explore by subject" title="Click a subject for the full curriculum">
        <p className="text-slate-600 text-[14.5px] mb-5 max-w-2xl">
          {SUBJECTS.length} subjects, three grade bands, three layers of depth — pick one and see
          exactly what your child will study.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SUBJECTS.map((s) => (
            <Link
              key={s.id}
              href={`/curriculum/${s.id}`}
              className="card-fancy block p-5 rounded-2xl bg-white border border-[var(--brand-rule)] group"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid place-items-center h-10 w-10 rounded-xl text-white shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
                  }}
                  aria-hidden
                >
                  <Icon name={s.icon} size={16} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[16px] font-bold text-[var(--brand-navy)] leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                    {s.name}
                  </div>
                  <p className="text-[12.5px] text-slate-600 mt-0.5 leading-snug">
                    {s.blurb}
                  </p>
                </div>
                <Icon
                  name="arrow-right"
                  size={14}
                  className="text-[var(--brand-accent)] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>

      {/* Supporting programs grid */}
      <ContentSection flush eyebrow="What sits alongside" title="Curriculum + practice + assessment">
        <div className="grid sm:grid-cols-2 gap-3">
          {supportingPrograms.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="p-4 rounded-md border border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)] hover:shadow-sm transition flex items-center gap-4 group"
            >
              <div className="flex-1">
                <h3 className="font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)]">
                  {s.title}
                </h3>
                <p className="mt-1 text-[13px] text-slate-600 leading-snug">{s.body}</p>
              </div>
              <span className="text-[var(--brand-accent)] font-bold text-xl">→</span>
            </Link>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
