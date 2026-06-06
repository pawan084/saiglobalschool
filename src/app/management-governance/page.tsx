import Image from "next/image";
import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Management & Governance",
  description:
    "How Sri Sathya Sai Global School is managed: governance, school leadership, parent communication and accountability.",
  alternates: { canonical: "/management-governance" },
};

const governancePrinciples = [
  {
    iconName: "compass",
    title: "Clear decision-making",
    body: "Strategic decisions, academic operations and parent communication sit in defined lanes so families know how the school is run.",
  },
  {
    iconName: "user-check",
    title: "Accessible leadership",
    body: "The Principal and senior team stay close to classroom life, parent questions and day-to-day student wellbeing.",
  },
  {
    iconName: "chat",
    title: "Parent communication",
    body: "Questions are handled through clear channels: class teacher, school office, admissions and leadership when needed.",
  },
  {
    iconName: "shield",
    title: "Safeguarding and accountability",
    body: "Policies, expectations and escalation paths are documented so decisions are consistent, transparent and child-centred.",
  },
];

const communicationRhythm = [
  { label: "Class teacher", detail: "Daily learning, routines, homework and settling-in questions." },
  { label: "School office", detail: "Documents, transport, attendance, calendar and operational support." },
  { label: "Admissions team", detail: "Entry requirements, tours, assessments, registration and fees." },
  { label: "Leadership", detail: "Escalated concerns, policy questions and whole-child support planning." },
];

const proofLinks = [
  { label: "Meet Faculty", href: "/faculty" },
  { label: "Accreditation", href: "/accreditation" },
  { label: "Parent-Student Handbook", href: "/parent-student-handbook" },
  { label: "Contact the Office", href: "/contact-us" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="management-governance"
      hero={{
        eyebrow: "About SSSGS",
        title: "Management & Governance",
        lead: "Transparent, parent-aligned governance — clear roles, regular communication, and an accountable structure.",
        breadcrumb: [
          { label: "About", href: "/about-us" },
          { label: "Management & Governance", href: "/management-governance" },
        ],
      }}
      ctaTitle="Speak with the school leadership"
      ctaSubtitle="Book a visit and understand how SSSGS is run, how parents are heard, and how children are supported."
    >
      <ContentSection flush>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.8fr)] lg:items-center">
          <div className="space-y-4 text-[15.5px] leading-relaxed text-slate-700">
            <p>
              SSSGS operates with a clear governance structure: a board responsible for direction and oversight, a leadership team running the school day-to-day, and parent communication channels for input, questions and follow-up.
            </p>
            <p>
              For families, governance should feel practical: you know who to contact, how concerns move forward, and how academic, operational and wellbeing decisions are handled.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--brand-rule)] bg-slate-100">
            <Image
              src="/img/home/about-sssgs/management-governance.jpg"
              alt="School leadership and governance at SSSGS"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Governance in practice" title="How the structure supports parents">
        <FeatureGrid items={governancePrinciples} cols={4} />
      </ContentSection>

      <ContentSection flush eyebrow="Communication rhythm" title="Who parents contact, and when">
        <div className="grid gap-3 sm:grid-cols-2">
          {communicationRhythm.map((item) => (
            <article key={item.label} className="rounded-lg border border-[var(--brand-rule)] bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]">
                  <Icon name="check" size={15} />
                </span>
                <div>
                  <h3 className="font-bold leading-tight text-[var(--brand-navy)]">{item.label}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Proof points" title="Related pages parents often check">
        <div className="flex flex-wrap gap-2">
          {proofLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-rule-strong)] bg-white px-4 py-2 text-[13px] font-bold text-[var(--brand-navy)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              {link.label}
              <Icon name="arrow-right" size={13} />
            </Link>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
