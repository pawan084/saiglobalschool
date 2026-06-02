import Image from "next/image";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";

export const metadata = {
  title: "Parent-Student Handbook",
  description: "Official handbook covering policies, expectations, support channels and SSSGS daily rhythms.",
};

const topics = [
  { title: "School Day & Routines", body: "Daily rhythms, attendance, late-arrival and absence procedures, dress and conduct." },
  { title: "Academic Policies", body: "Assessment philosophy, reporting, homework expectations, support for diverse learners." },
  { title: "Behaviour & Values", body: "Code of conduct, restorative practices, anti-bullying stance, values education." },
  { title: "Communication", body: "How school communicates with parents, parent-teacher meetings, escalation paths." },
  { title: "Health & Safety", body: "Medical procedures, allergies, emergency protocols, child protection." },
  { title: "Fees, Refunds & Withdrawal", body: "Fee schedule, payment methods, refund policy and the withdrawal process." },
];

const supplemental = [
  { name: "Curriculum Continuity Anxiety", href: "/_files/ugd/Curriculum Continuity Anxiety - SSSGS.pdf" },
  { name: "Poor Settling-in Support", href: "/_files/ugd/Poor Settling-in Support - SSSGS.pdf" },
  { name: "Transitioning Between Schools", href: "/_files/ugd/Transitioning Between Schools - SSSGS.pdf" },
  { name: "Families in Transition", href: "/_files/ugd/Families in Transition - SSSGS.pdf" },
  { name: "Activity-Based Learning", href: "/_files/ugd/Activity-Based Learning.pdf" },
  { name: "Inquiry-Based Learning", href: "/_files/ugd/Inquiry-Based Learning.pdf" },
  { name: "Structured Subject Learning", href: "/_files/ugd/Structured Subject Learning.pdf" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="parent-student-handbook"
      hero={{
        eyebrow: "Resources",
        title: "Parent–Student Handbook",
        lead: "Everything you need in one place — policies, expectations, support channels, and the rhythms of SSSGS life.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Handbook", href: "/parent-student-handbook" },
        ],
      }}
    >
      <ContentSection flush>
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-extrabold news-headline mb-3">What&rsquo;s inside</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map((t) => (
                <article key={t.title} className="p-4 border border-[var(--brand-rule)] rounded-md bg-white">
                  <h3 className="font-bold text-[var(--brand-navy)]">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-2 space-y-3">
            <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-slate-100 border border-[var(--brand-rule)]">
              <Image
                src="/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg"
                alt="Parent-Student Handbook cover"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
            <Link
              href="/_files/ugd/Parent-Student Handbook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-[13px] font-bold hover:bg-[var(--brand-accent-dark)] transition"
            >
              Download Handbook PDF
            </Link>
          </aside>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Supplemental" title="Topic-specific guides">
        <ul className="grid sm:grid-cols-2 gap-2">
          {supplemental.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-md bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] transition text-sm"
              >
                <span className="h-9 w-9 rounded bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold grid place-items-center text-xs shrink-0">PDF</span>
                <span className="font-medium text-slate-800">{s.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </ContentSection>
    </InnerPageShell>
  );
}
