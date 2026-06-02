import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ReadingProgress from "@/components/ReadingProgress";
import SharePage from "@/components/SharePage";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Parent–Student Handbook",
  description:
    "Web summary of the SSSGS Parent–Student Handbook — policies, expectations, support channels and daily rhythms.",
  alternates: { canonical: "/parent-student-handbook" },
};

type Section = {
  id: string;
  heading: string;
  intro: string;
  points?: string[];
};

const SECTIONS: Section[] = [
  {
    id: "school-day",
    heading: "School day & routines",
    intro:
      "Daily rhythms are predictable and structured. Morning circle, four academic blocks, lab periods on rotation, lunch and CCAs in the afternoon. Punctuality matters — a settled start sets the tone.",
    points: [
      "Doors open: 7:45 AM",
      "Morning circle: 8:00 AM",
      "End of day: 3:00 PM (Primary), 3:30 PM (Secondary)",
      "Late arrival or absence — notify the office by 8:30 AM",
      "Dress: school uniform on all academic days; PE uniform on PE days",
    ],
  },
  {
    id: "academic-policies",
    heading: "Academic policies",
    intro:
      "Assessment is continuous and formative, with term-end summative checkpoints. Homework is purposeful — short reinforcement at primary, longer pieces at secondary. Diverse learners are supported through differentiated instruction and the Student Support team.",
    points: [
      "Assessment cadence — formative weekly, term summatives at end of each term",
      "Homework guidance — 30 mins (Grades 1–3), 45–60 mins (4–5), 60–90 mins (6–8)",
      "Reporting — written reports twice a year, parent–teacher meetings each term",
      "Academic integrity — original work expected; plagiarism is addressed honestly",
    ],
  },
  {
    id: "behaviour-values",
    heading: "Behaviour & values",
    intro:
      "We follow restorative practices: when something goes wrong, the focus is on repair, learning and responsibility. The five values guide expectations: Sathya (Truth), Dharma (Right Conduct), Shanti (Peace), Prema (Love), Ahimsa (Non-Violence).",
    points: [
      "Code of conduct rooted in the five values",
      "Zero tolerance for bullying — incidents addressed within 24 hours",
      "Restorative conversations between students, families and teachers",
      "Recognition for character moments alongside academic ones",
    ],
  },
  {
    id: "communication",
    heading: "Communication",
    intro:
      "We aim to over-communicate. You will hear from us through the LMS, email, WhatsApp where appropriate, and the parent portal. Always feel free to start a conversation with the homeroom teacher first.",
    points: [
      "Primary channel — LMS messages and weekly newsletter",
      "Homeroom teacher — your first stop for academic or pastoral questions",
      "Escalation — coordinator → Head of Section → Principal",
      "Parent–teacher meetings — once per term, 20-minute slots booked online",
    ],
  },
  {
    id: "health-safety",
    heading: "Health & safety",
    intro:
      "Health, safety and child protection are non-negotiable. We maintain trained first aiders, fire-drill protocols, anaphylaxis plans for known allergies, and clear safeguarding procedures aligned to MOE/CPE standards.",
    points: [
      "Vaccination records collected at enrolment",
      "Allergy and medical conditions on file with action plans",
      "Fire drills quarterly; lockdown procedure documented",
      "Photography consent collected per family, revocable anytime",
    ],
  },
  {
    id: "fees",
    heading: "Fees, refunds & withdrawal",
    intro:
      "Fees follow the published structure, billed per term. Refunds follow our written policy (linked below). Withdrawals require written notice — the office walks you through the steps.",
    points: [
      "Payment options — bank transfer, PayNow, online card",
      "Receipts issued same day",
      "Refund eligibility per the published Refund Policy",
      "Withdrawal — 30 days' written notice; pro-rata where applicable",
    ],
  },
];

const supplemental = [
  { name: "Curriculum Continuity Anxiety",        href: "/_files/ugd/Curriculum Continuity Anxiety - SSSGS.pdf" },
  { name: "Poor Settling-in Support",             href: "/_files/ugd/Poor Settling-in Support - SSSGS.pdf" },
  { name: "Transitioning Between Schools",        href: "/_files/ugd/Transitioning Between Schools - SSSGS.pdf" },
  { name: "Families in Transition",               href: "/_files/ugd/Families in Transition - SSSGS.pdf" },
  { name: "Activity-Based Learning",              href: "/_files/ugd/Activity-Based Learning.pdf" },
  { name: "Inquiry-Based Learning",               href: "/_files/ugd/Inquiry-Based Learning.pdf" },
  { name: "Structured Subject Learning",          href: "/_files/ugd/Structured Subject Learning.pdf" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="parent-student-handbook"
      hero={{
        eyebrow: "Resources",
        title: "Parent–Student Handbook",
        lead: "Everything you need in one place — policies, expectations, support channels and the rhythms of SSSGS life.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Handbook", href: "/parent-student-handbook" },
        ],
      }}
      ctaTitle="Need a section we haven't covered?"
      ctaSubtitle="Email admissions and we'll point you to the relevant policy."
    >
      <ReadingProgress />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Handbook", href: "/parent-student-handbook" },
        ]}
      />

      <ContentSection flush>
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          {/* TOC + cover */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-2">
                On this page
              </div>
              <ol className="space-y-1.5">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-[13px] text-slate-600 hover:text-[var(--brand-primary)] transition py-0.5"
                    >
                      <span className="font-mono text-[11px] text-slate-400 mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-6 p-3 rounded-2xl bg-white border border-[var(--brand-rule)]">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg"
                    alt="Parent–Student Handbook cover"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <Link
                  href="/_files/ugd/Parent-Student Handbook.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 btn-primary !py-2 !px-3 !text-[12.5px] w-full justify-center"
                >
                  <Icon name="document" size={12} />
                  Download PDF
                </Link>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="space-y-7">
            <p className="text-[14.5px] text-slate-600 leading-relaxed">
              This is the web summary of the official Parent–Student Handbook. Print or download the PDF
              above for the canonical version. Sections below cover what most families ask about most.
            </p>

            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7"
                style={{ boxShadow: "var(--shadow-xs)" }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[12px] text-[var(--brand-accent)] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[22px] lg:text-[24px] font-bold text-[var(--brand-navy)] tracking-tight">
                    {s.heading}
                  </h2>
                </div>
                <p className="text-[14.5px] text-slate-700 leading-relaxed">{s.intro}</p>
                {s.points && (
                  <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13.5px] text-slate-700">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Icon name="check" size={11} className="mt-1 text-[var(--brand-primary)] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="p-5 rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)] text-[13.5px] text-slate-700">
              <strong>Quick links:</strong>{" "}
              <Link href="/refund-policy" className="text-[var(--brand-primary)] font-bold hover:underline">
                Refund policy
              </Link>{" "}
              ·{" "}
              <Link href="/school-uniform-and-transportation" className="text-[var(--brand-primary)] font-bold hover:underline">
                Uniform & transport
              </Link>{" "}
              ·{" "}
              <Link href="/calendar" className="text-[var(--brand-primary)] font-bold hover:underline">
                Term calendar
              </Link>{" "}
              ·{" "}
              <Link href="/fee-structure" className="text-[var(--brand-primary)] font-bold hover:underline">
                Fee structure
              </Link>
            </div>

            <SharePage title="SSSGS Parent–Student Handbook" />
          </article>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Supplemental" title="Topic-specific guides">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {supplemental.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] transition text-[13px]"
              >
                <span className="h-9 w-9 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)] font-bold grid place-items-center text-[10.5px] shrink-0">
                  PDF
                </span>
                <span className="font-bold text-[var(--brand-navy)]">{s.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </ContentSection>
    </InnerPageShell>
  );
}
