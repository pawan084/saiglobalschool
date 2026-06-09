import Image from "next/image";
import Link from "next/link";
import FeatureBlock from "@/components/FeatureBlock";
import FeatureGrid from "@/components/FeatureGrid";
import ContentSection from "@/components/ContentSection";
import TrustBadges from "@/components/TrustBadges";
import CTAStrip from "@/components/CTAStrip";
import Icon from "@/components/Icon";

export const metadata = {
  title: "About Us",
  description: "Vision, mission, faculty, governance and the values that shape Sri Sathya Sai Global School.",
  alternates: { canonical: "/about-us" },
};

const parentNeeds = [
  { iconName: "shield",     title: "A safe, values-led environment",   body: "Parents look for a school that takes character as seriously as academics — and shows it in everyday routines, not just on a website." },
  { iconName: "graduation", title: "Experienced, present teachers",    body: "Teachers who know every child by name, see them as individuals, and stay long enough to make that knowledge count." },
  { iconName: "users",      title: "A real community for the family",  body: "Other parents who share the same expectations — and a school that brings them together intentionally, not by accident." },
  { iconName: "heart",      title: "A school you can trust long-term", body: "Transparent governance, accountable management, and policies that put the child and the family first." },
];

const atAGlance = [
  { iconName: "graduation", title: "Primary & middle school", body: "A focused primary and middle-school pathway for internationally mobile families." },
  { iconName: "book-open", title: "NCERT-aligned", body: "A familiar academic backbone with continuity for Indian and global curriculum transitions." },
  { iconName: "users", title: "1 : 20 maximum", body: "Small-group learning so teachers can notice progress, confidence and support needs." },
  { iconName: "shield", title: "CPE Singapore", body: "Registered Private Education Institution with clear governance and parent-facing policies." },
];

export default function Page() {
  return (
    <>
      {/* FOLD 1 — PROMISE */}
      <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
        <Image
          src="/img/navbar/campus/school-campus.jpg"
          alt="Sri Sathya Sai Global School campus"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/85 to-[var(--brand-navy)]/35" />
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="section-shell relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.75fr)] items-center py-14 lg:py-20">
          <div>
            <nav className="mb-4 flex gap-2 text-[12px] text-white/75" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="opacity-60">›</span>
              <Link href="/about-us" className="hover:underline">About</Link>
            </nav>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
              About SSSGS
            </div>
            <h1 className="font-display max-w-3xl text-[32px] sm:text-[40px] lg:text-[52px] font-bold leading-[1.04] tracking-tight">
              A school built around what your child becomes, not just what they learn
            </h1>
            <p className="mt-5 max-w-2xl text-[15.5px] lg:text-[17px] leading-relaxed text-white/85">
              A values-rooted international school for primary and middle school in Singapore — experienced educators, holistic learning and character development woven into every day.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/vision-mission" className="btn-primary">
                Vision & Mission
                <Icon name="arrow-right" size={15} />
              </Link>
              <Link href="/faculty" className="btn-ghost-white">
                Meet Faculty
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/15 bg-white/10 shadow-2xl">
              <Image
                src="/img/photos-2026-06/about-head-heart-hand.jpg"
                alt="Students learning at Sri Sathya Sai Global School"
                fill
                priority
                sizes="38vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ContentSection eyebrow="At a glance" title="The essentials parents ask for first" tone="white">
        <FeatureGrid items={atAGlance} cols={4} />
      </ContentSection>

      {/* FOLD 2 — NEED */}
      <ContentSection eyebrow="Why parents are looking" title="What families really want in a school" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          When parents walk through a school for the first time, they&rsquo;re scanning for four things. We&rsquo;ve built SSSGS around all four — here&rsquo;s how.
        </p>
        <FeatureGrid items={parentNeeds} cols={4} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION */}
      <FeatureBlock
        tone="mist"
        title="What SSSGS stands for."
        intro="Education that harmonises Head, Heart and Hand — uniting knowledge, compassion and purposeful action. The people and principles behind it:"
        featured={{
          title: "Head, Heart and Hand — the SSSGS way.",
          body:
            "We pursue Head, Heart and Hand — knowledge with compassion and purposeful action — so children grow into confident, contributing adults. Our values: Sathya, Dharma, Shanti, Prema, Ahimsa.",
          image: "/img/photos-2026-06/about-head-heart-hand.jpg",
          href: "/vision-mission",
        }}
        items={[
          {
            title: "Management & Governance",
            body: "Transparent, parent-aligned governance — clear roles, regular communication, and an accountable structure.",
            image: "/img/home/about-sssgs/management-governance.jpg",
            imagePosition: "top",
            href: "/management-governance",
          },
          {
            title: "Faculty",
            body: "Experienced educators with subject expertise and a values-led teaching practice — they know every child by name.",
            image: "/img/photos-2026-06/faculty-group.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "Parent Community",
            body: "An active parent community that supports the school, supports each other, and supports children growing up.",
            image: "/img/photos-2026-06/about-parent-community.jpg",
            imagePosition: "top",
            href: "/parent-community",
          },
        ]}
      />

      {/* FOLD 4 — PROOF */}
      <FeatureBlock
        tone="cream"
        title="Character at the centre — visible in everyday life."
        intro="Character isn't a class. It shows up in routines, conversations, the way conflict is handled, and the moments children pause to reflect."
        featured={{
          title: "Character, threaded through every day.",
          body:
            "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. We take that seriously — character development sits alongside academic learning in every grade, every day.",
          image: "/img/home/about-sssgs/character-development.jpg",
          href: "/character-development",
        }}
        items={[
          {
            title: "Human Excellence",
            body: "Competence, character and contribution on equal footing — the SSSGS pedagogy puts all three at the heart of teaching.",
            image: "/img/home/about-sssgs/human-excellence.jpg",
            href: "/human-excellence",
          },
          {
            title: "Values Integration & Academics",
            body: "Values aren't an extra subject — they're integrated into the way every subject is taught, from language to math.",
            image: "/img/home/about-sssgs/values-integration.jpg",
            href: "/values-integration-academics",
          },
          {
            title: "A day at SSSGS",
            body: "Eight blocks — morning circle to closing reflection — showing how character and academics live together.",
            image: "/img/photos-2026-06/about-a-day.jpg",
            href: "/a-day-at-sssgs",
          },
        ]}
      />

      {/* FOLD 5 — TRUST */}
      <ContentSection eyebrow="The credentials behind the philosophy" title="Registered, accredited, and accountable" tone="white">
        <p className="text-[15px] text-slate-700 max-w-3xl mb-6 leading-relaxed">
          A values-led school still has to meet rigorous external standards. SSSGS is a CPE-Singapore-registered Private Education Institution, NCERT-aligned, and accredited to deliver primary and middle school education with a 1:20 teacher–student ratio.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 6 — ACTION */}
      <CTAStrip
        title="Book a campus tour and meet the team"
        subtitle="A 45-minute visit lets you see the values, classrooms and educators in action."
      />
    </>
  );
}
