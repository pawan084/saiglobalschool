import Link from "next/link";
import Image from "next/image";
import FeatureBlock from "@/components/FeatureBlock";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import Icon from "@/components/Icon";
import { homeHero } from "@/data/sections";
import { ctaInquire, ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: { absolute: "Sri Sathya Sai Global School | Singapore" },
  description:
    "An NCERT-aligned, values-rooted international school in Singapore for Grades 1–8. Small-group learning, experienced educators, mid-year admissions welcome.",
  alternates: { canonical: "/" },
};

const stats = [
  { value: 8, label: "Grades — 1 to 8" },
  { value: 4, label: "Specialist Labs" },
  { value: 0, display: "1 : 20", label: "Teacher–Student" },
  { value: 2026, label: "PEI Reg. period" },
];

const testimonials = [
  { quote: "The PTM was conducted exceptionally well. We appreciated the 60-day plan, individual goals, focus on values beyond academics, and regular daily updates. Our child happily shares her learning experiences at home.", author: "Parent", grade: "Grade 3" },
  { quote: "My child is well settled and loves coming to SSSGS school. The classroom is supportive, and we can see growing confidence, public speaking skills, and free expression.", author: "Parent", grade: "Grade 1" },
  { quote: "We are very happy with the attention given to every child. Teachers encourage good work, use hands-on and real-life examples, and Mathematics step-by-step is paying off.", author: "Parent", grade: "Grade 5" },
  { quote: "Within weeks of joining, our daughter was settled and asking to come to school. Teachers genuinely know each child by name.", author: "Parent", grade: "Grade 4" },
];

export default function Home() {
  return (
    <>
      {/* HERO — cinematic, editorial */}
      <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero-banner.avif"
            alt="A peaceful environment for learning and growth at SSSGS"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/80 to-[var(--brand-navy)]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)]/30 via-transparent to-[var(--brand-navy)]/65" />
          <div className="grain-overlay" />
        </div>
        <div className="section-shell relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[11px] font-bold tracking-[0.14em] uppercase mb-7">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
              </span>
              {homeHero.eyebrow}
            </div>
            <h1 className="font-display font-bold leading-[0.98] tracking-tight text-[44px] sm:text-[58px] lg:text-[72px]">
              <span className="block">Education</span>
              <span className="block italic font-medium text-white/85">blossoms into</span>
              <span className="block text-[var(--brand-accent)]">Character.</span>
            </h1>
            <p className="mt-6 text-[16px] lg:text-[17px] leading-relaxed text-white/85 max-w-xl font-light">
              {homeHero.lead}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={ctaInquire.href} className="btn-primary">
                {ctaInquire.label}
                <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/about-us" className="btn-ghost-white">
                About the School
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 lg:py-14 bg-white">
        <div className="section-shell">
          <StatsCounter items={stats} />
        </div>
      </section>

      {/* SECTION 1 — Right Fit (mist) */}
      <FeatureBlock
        tone="mist"
        title="Is Sri Sathya Sai Global School the Right Fit for Your Child?"
        intro="Every child joins school with a different story. SSSGS supports families seeking academic continuity, personal attention, and a caring transition into a structured international school environment."
        featured={{
          title: "Seamless Transition for Relocating Families.",
          body:
            "From mid-year admissions to curriculum changes, we support children moving from different schools, countries, or learning systems. At SSSGS, children can continue their Indian curriculum journey with confidence while adapting smoothly to a caring international school environment. Our teachers help each child settle in with personal attention, clear routines, and academic guidance.",
          image: "/img/grade1-8_edited.jpg",
          href: "/admission-process",
        }}
        items={[
          {
            title: "Families in Transition",
            body: "Students entering from different education systems are supported through a structured curriculum and familiar academic frameworks to ease adjustment.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/entry-requirements",
          },
          {
            title: "Personalised Settling-in Support",
            body: "Children in transition may feel shy or behind; personalised settling-in support helps them adapt to routines, peers, teachers, and assessments.",
            image: "/img/lsp07438_jpg.jpg",
            imagePosition: "top",
            href: "/student-support",
          },
          {
            title: "Curriculum Continuity Support",
            body: "Parents want confidence that the school can handle movement between CBSE, ICSE, Cambridge, IB, or local curriculum without academic disruption.",
            image: "/img/lsp07568_jpg.jpg",
            href: "/curriculum",
          },
        ]}
      />

      {/* SECTION 2 — Why SSSGS (mist deeper) */}
      <FeatureBlock
        tone="mist"
        title="Why Sri Sathya Sai Global School?"
        intro="Sri Sathya Sai Global School offers a structured academic environment supported by experienced educators, small-group learning, and applied, lab-based instruction across core subjects."
        featured={{
          title: "A Complete Learning Environment for Confident Growth",
          body:
            "Sri Sathya Sai Global School combines experienced educators, structured classroom learning, and application-based teaching to help children build strong academic foundations. Students learn through clear guidance, regular feedback, and practical classroom experiences that make concepts easier to understand and apply.",
          image: "/img/labs-science.jpg",
          href: "/about-us",
        }}
        items={[
          {
            title: "Experienced Educators",
            body: "Our teaching team includes educators with diverse academic experience, delivering structured & consistent classroom instruction.",
            image: "/img/lsp07600_jpg.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "Personalized Learning Support",
            body: "Students receive guided academic support through structured feedback, progress tracking, and adaptive learning tools.",
            image: "/img/lab-english_jpg.jpg",
            href: "/student-support",
          },
          {
            title: "Application-Based Learning",
            body: "Students engage in practical, experiment-based learning across applied subjects to strengthen conceptual understanding.",
            image: "/img/ss1_edited.jpg",
            href: "/learning-labs",
          },
        ]}
      />

      {/* SECTION 3 — Academics (cream) */}
      <FeatureBlock
        tone="cream"
        title="Academics that go beyond the textbook"
        intro="An NCERT-aligned integrated curriculum, structured progression, and four dedicated labs — language, science, math and ICT — where children apply what they learn."
        featured={{
          title: "Curriculum, Pathway, Assessment — all aligned.",
          body:
            "From phonics in Grade 1 to lab-based projects in Grade 8, our academic pathway is built around conceptual clarity, consistent feedback, and outcomes that travel with the child across schools and curricula.",
          image: "/img/grade1-8_edited.jpg",
          href: "/curriculum",
        }}
        items={[
          {
            title: "Courses Offered",
            body: "Subjects across primary and middle school: languages, math, science, social studies, ICT, arts, PE and value education.",
            image: "/img/grade1-8_edited.jpg",
            href: "/courses-offered",
          },
          {
            title: "Academic Pathway",
            body: "A clear grade-by-grade progression from foundations in Grades 1–2 to depth and synthesis in Grades 6–8.",
            image: "/img/lab-english_jpg.jpg",
            href: "/academic-pathway",
          },
          {
            title: "Assessment Structure",
            body: "Daily formative checks, weekly reviews, term assessments and oral & project work — assessment is for learning, not just of it.",
            image: "/img/ss1_edited.jpg",
            href: "/assessment-structure",
          },
        ]}
      />

      {/* SECTION 4 — Campus Life (mist) */}
      <FeatureBlock
        tone="mist"
        title="Campus Life that rounds the whole child"
        intro="Structured rhythms, lab work, CCAs, mealtime conversations, and reflection — every day at SSSGS develops more than just academics."
        featured={{
          title: "A day at SSSGS — from morning circle to closing reflection.",
          body:
            "Eight blocks that make up a school day: morning circle, two academic blocks, lab session, mealtime & reflection, co-curricular activities, and closing reflection — designed so children leave with both skills and stories.",
          image: "/img/7621-1.jpg",
          href: "/a-day-at-sssgs",
        }}
        items={[
          {
            title: "Facilities & Spaces",
            body: "Bright classrooms, four learning labs, library, performing-arts spaces and activity zones — built around how children actually learn.",
            image: "/img/school_edited.jpg",
            href: "/sssgs-spaces",
          },
          {
            title: "Co-Curricular Activities",
            body: "Music, visual arts, performing arts, sport, speech & debate, environment & service — every child finds their thing.",
            image: "/img/art-cca.jpg",
            href: "/cca",
          },
          {
            title: "Uniform & Transport",
            body: "Practical details — uniform requirements, where to obtain them, and the school transport routes available across Singapore.",
            image: "/img/ss1_edited.jpg",
            href: "/school-uniform-and-transportation",
          },
        ]}
      />

      {/* SECTION 5 — Admissions (cream) */}
      <FeatureBlock
        tone="cream"
        title="Admissions, made transparent."
        intro="A clear, supportive six-step admission journey. Mid-year admissions welcome; we walk every family through every step from inquiry to first day."
        featured={{
          title: "Admission process: clear, supportive, parent-friendly.",
          body:
            "Inquire → meet the team → assess → register. Each step has a single point of contact, transparent timelines, and clear expectations. Transitions from CBSE, ICSE, Cambridge, IB and local curricula handled without disruption.",
          image: "/img/p1-vision.jpg",
          imagePosition: "top",
          href: "/admission-process",
        }}
        items={[
          {
            title: "Entry Requirements",
            body: "Age criteria and grade-appropriate assessment for entry from Grade 1 through Grade 8.",
            image: "/img/grade1-8_edited.jpg",
            href: "/entry-requirements",
          },
          {
            title: "Fee Structure",
            body: "Transparent annual fee breakdown for Primary (Grades 1–5) and Secondary (Grades 6–8). Indicative annual totals shown.",
            image: "/img/548-1.jpg",
            href: "/fee-structure",
          },
          {
            title: "Open House & Tours",
            body: "Meet our Principal, see classrooms in session, ask the admissions team — both Open House and private tours available.",
            image: "/img/lsp07578_jpg.jpg",
            imagePosition: "top",
            href: "/open-house",
          },
        ]}
      />

      {/* TESTIMONIALS */}
      <TestimonialsGrid items={testimonials} />

      {/* RECENTLY VIEWED (only renders if user has history) */}
      <RecentlyViewed />

      {/* BIG CTA */}
      <section className="relative py-14 lg:py-20 bg-[var(--brand-navy)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-[var(--brand-accent)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[var(--brand-primary)] blur-3xl" />
        </div>
        <div className="section-shell relative grid lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <div className="news-eyebrow text-[var(--brand-accent)] mb-2">Take the next step</div>
            <h2 className="text-3xl lg:text-[40px] font-bold leading-tight tracking-tight">
              Ready to see SSSGS in person?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl text-[15px]">
              Book a campus tour, attend our next Open House, or talk to admissions about your child&rsquo;s journey.
            </p>
          </div>
          <div className="flex lg:justify-end gap-3 flex-wrap">
            <Link href={ctaInquire.href} className="btn-primary">
              {ctaInquire.label}
              <Icon name="arrow-right" size={16} />
            </Link>
            <a href={ctaWhatsApp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost-white">
              {ctaWhatsApp.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
