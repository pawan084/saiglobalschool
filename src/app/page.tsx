import Link from "next/link";
import Image from "next/image";
import FeatureBlock from "@/components/FeatureBlock";
import StatsCounter from "@/components/StatsCounter";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import HomeNewsletter from "@/components/HomeNewsletter";
import Icon from "@/components/Icon";
import { homeHero } from "@/data/sections";
import { ctaInquire } from "@/data/nav";

export const metadata = {
  title: { absolute: "Home - International School | Sri Sathya Sai Global School" },
  description:
    "NCERT-aligned, value-rooted international school in Singapore (primary & secondary school) — small-group learning, experienced educators, mid-year admissions welcome.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

const stats = [
  { value: 11, label: "Subjects taught" },
  { value: 6, label: "Specialist Labs" },
  { value: 0, display: "1:20", label: "Teacher–Student" },
  { value: 0, display: "2026", label: "PEI Reg. period" },
];

const testimonials = [
  { quote: "The PTM was conducted exceptionally well. We appreciated the 60-day plan, individual goals, focus on values beyond academics, and regular daily updates. Our child happily shares her learning experiences at home.", author: "Parent", grade: "Grade 3" },
  { quote: "My child is well settled and loves coming to SSSGS school. The classroom is supportive, and we can see growing confidence, public speaking skills, and free expression.", author: "Parent", grade: "Grade 1" },
  { quote: "We are very happy with the attention given to every child. Teachers encourage good work, use hands-on and real-life examples, and Mathematics step-by-step is paying off.", author: "Parent", grade: "Grade 5" },
];

export default function Home() {
  return (
    <>
      {/* FOLD 1 — PROMISE: Hero */}
      <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
        <div className="absolute inset-0">
          <Image
            src="/img/home/hero/school-campus.jpg"
            alt="A smooth landing for families at Sri Sathya Sai Global School"
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            className="object-cover ken-burns"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/80 to-[var(--brand-navy)]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-navy)]/30 via-transparent to-[var(--brand-navy)]/65" />
          <div className="grain-overlay" />
        </div>
        <div className="section-shell relative flex min-h-[calc(100svh-150px)] items-center py-14 sm:py-20 lg:min-h-0 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="font-display font-bold leading-[0.98] tracking-tight text-[44px] sm:text-[58px] lg:text-[72px]">
              <span className="block">Education</span>
              <span className="block italic font-medium text-white/85">blossoms into</span>
              <span className="block text-[var(--brand-accent)]">Character</span>
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

      {/* FOLD 2 — NEED: Right Fit (mist) — LCP candidate when the page scrolls past the hero */}
      <FeatureBlock
        tone="mist"
        priorityFeatured
        title="Is Sri Sathya Sai Global School the Right Fit for Your Child?"
        intro="Every child joins school with a different story — a move, a transition, a search for a school that listens. These are the situations parents most often describe to us."
        featured={{
          title: "A smooth landing for families on the move.",
          body:
            "From mid-year admissions to curriculum changes, we support children moving from different schools, countries, or learning systems. At SSSGS, children can continue their Indian curriculum journey with confidence while adapting smoothly to a caring international school environment. Our teachers help each child settle in with personal attention, clear routines, and academic guidance.",
          image: "/img/featuredBlock/school-campus.jpg",
          href: "/admission-process",
        }}
        items={[
          {
            title: "Families in Transition",
            body: "Students entering from different education systems are supported through a structured curriculum and familiar academic frameworks to ease adjustment.",
            image: "/img/featuredBlock/families-in-transition.jpg",
            imagePosition: "top",
            href: "/entry-requirements",
          },
          {
            title: "Personalised Settling-in Support",
            body: "Children in transition may feel shy or behind; personalised settling-in support helps them adapt to routines, peers, teachers, and assessments.",
            image: "/img/featuredBlock/home-settling-in.jpg",
            imagePosition: "top",
            href: "/student-support",
          },
          {
            title: "Curriculum Continuity Support",
            body: "Parents want confidence that the school can handle movement between CBSE, ICSE, Cambridge, IB, or local curriculum without academic disruption.",
            image: "/img/featuredBlock/home-curriculum-continuity.jpg",
            href: "/curriculum",
          },
          {
            title: "Mid-year admissions welcome",
            body: "Join at any point in the academic year across primary and secondary school. Clear process, fast timelines, personalised onboarding.",
            image: "/img/featuredBlock/admission-process.jpg",
            imagePosition: "top",
            href: "/admission-process",
          },
          {
            title: "Grade-fit assessment",
            body: "A low-pressure check places your child where they will thrive — not just where the calendar says they should be.",
            image: "/img/featuredBlock/home-grade-fit.jpg",
            imagePosition: "top",
            href: "/grade-fit",
          },
          {
            title: "A parent community that helps",
            body: "An active parent community makes the social transition as smooth as the academic one — for the whole family.",
            image: "/img/featuredBlock/parent-community.jpg",
            href: "/parent-community",
          },
        ]}
      />

      {/* FOLD 3 — SOLUTION: How SSSGS answers (cream) */}
      <FeatureBlock
        tone="cream"
        title="How Sri Sathya Sai Global School answers these needs"
        intro="Experienced educators, small-group learning, and applied lab-based instruction across core subjects — guided by a teaching philosophy we call Sri Sathya Sai Vidya Vahini."
        featured={{
          title: "A learning environment built for confident growth.",
          body:
            "Sri Sathya Sai Global School combines experienced educators, structured classroom learning, and application-based teaching to help children build strong academic foundations. Students learn through clear guidance, regular feedback, and practical classroom experiences that make concepts easier to understand and apply.",
          image: "/img/featuredBlock/school-ai-learning-environment.avif",
          href: "/about-us",
        }}
        items={[
          {
            title: "Experienced Educators",
            body: "Our teaching team includes educators with diverse academic experience, delivering structured & consistent classroom instruction.",
            image: "/img/featuredBlock/experienced-educators.jpg",
            imagePosition: "top",
            href: "/faculty",
          },
          {
            title: "Personalised Learning Support",
            body: "Students receive guided academic support through structured feedback, progress tracking, and adaptive learning tools.",
            image: "/img/featuredBlock/personalized-learning-support.jpg",
            href: "/student-support",
          },
          {
            title: "Application-Based Learning",
            body: "Students engage in practical, experiment-based learning across applied subjects to strengthen conceptual understanding.",
            image: "/img/featuredBlock/home-application-based.jpg",
            href: "/learning-labs",
          },
          {
            title: "NCERT-aligned curriculum",
            body: "A recognised, rigorous academic backbone across primary and secondary school — built for continuity through CBSE, ICSE, Cambridge or IB.",
            image: "/img/featuredBlock/home-ncert-aligned.jpg",
            href: "/curriculum",
          },
          {
            title: "Character & values, threaded through",
            body: "Character isn't a class. It shows up in daily routines, in conversations, and in the way every subject is taught.",
            image: "/img/featuredBlock/home-character-values-1.jpg",
            href: "/character-development",
          },
          {
            title: "Assessment for learning",
            body: "Daily formative checks, weekly reviews and term assessments — designed to shape teaching, not just produce grades.",
            image: "/img/featuredBlock/assessment-structure.jpg",
            href: "/assessment-structure",
          },
        ]}
      />

      {/* FOLD 4 — PROOF: SSSVV Hands-on Learning */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6ecf9] via-[#eef0fc] to-[#f3eafa] py-20 lg:py-24">
        {/* Decorative asterisk top-left */}
        <svg
          aria-hidden
          viewBox="0 0 48 48"
          className="absolute top-10 left-6 lg:left-12 w-10 h-10 lg:w-12 lg:h-12 text-[var(--brand-navy)] opacity-70"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="24" y1="4" x2="24" y2="44" />
            <line x1="4" y1="24" x2="44" y2="24" />
            <line x1="10" y1="10" x2="38" y2="38" />
            <line x1="10" y1="38" x2="38" y2="10" />
          </g>
        </svg>

        <div className="section-shell relative">
          <h2 className="font-display text-center text-[32px] sm:text-[42px] lg:text-[56px] leading-[1.05] font-bold tracking-tight text-[var(--brand-navy)] max-w-4xl mx-auto">
            Hands-on Learning by<br className="hidden sm:block" /> Sri Sathya Sai Vidya Vahini (SSSVV)
          </h2>

          <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="relative">
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-slate-700">
                At Sri Sathya Sai Global School, learning goes beyond textbooks. Through the learning approach inspired by Sri Sathya Sai Vidya Vahini, children engage with stories, activities, values, and real-life applications that make learning meaningful.
              </p>
              <p className="mt-4 text-[15px] lg:text-[16px] leading-relaxed text-slate-700">
                Lessons are designed to help students connect ideas with everyday life, build curiosity, develop confidence, and grow with character.
              </p>
              <h3 className="mt-10 text-[24px] lg:text-[30px] font-bold text-[var(--brand-navy)] tracking-tight">
                Learning with real life examples
              </h3>
              <p className="mt-3 text-[15px] lg:text-[16px] leading-relaxed text-slate-700">
                Every lesson comes alive through real life examples that inspire values, build understanding, and stay with students beyond the classroom.
              </p>
            </div>

            <div className="relative">
              {/* Decorative squiggle */}
              <svg
                aria-hidden
                viewBox="0 0 32 80"
                className="absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 w-6 lg:w-8 h-auto text-[var(--brand-navy)] opacity-70"
                fill="none"
              >
                <path
                  d="M16 4 Q 28 18, 14 32 T 18 60 Q 20 70, 10 76"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <Image
                src="/img/home/hands-on-learning/sssvv-hands-on-learning.jpg"
                alt="SSSGS students engaged in a hands-on Sri Sathya Sai Vidya Vahini learning activity"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOLD 5 — TRUST: Stats + Testimonials */}
      <section className="py-10 lg:py-12 bg-white">
        <div className="section-shell">
          <StatsCounter items={stats} />
        </div>
      </section>
      <TestimonialsGrid
        items={testimonials}
        title="What parents tell us"
        intro="Settled days, growing confidence, learning that stays — what families share with us in their own words."
      />

      {/* NEWSLETTER SIGNUP */}
      <HomeNewsletter />

    </>
  );
}
