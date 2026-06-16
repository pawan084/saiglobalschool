import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FormCard from "@/components/FormCard";
import { site } from "@/data/site";
import { ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: "Inquire / Book a Tour",
  description: "Book a campus tour or send an admission inquiry to Sri Sathya Sai Global School Singapore.",
  alternates: { canonical: "/inquire-book-a-tour" },
};

const whatHappens = [
  { tag: "Step 1", title: "We reply within 1 business day", body: "An admissions officer reads your inquiry and emails or WhatsApps you back personally — not a templated reply." },
  { tag: "Step 2", title: "Short call or campus tour", body: "We schedule a 20-minute call or in-person visit at a time that works for you. Bring your child along if you can." },
  { tag: "Step 3", title: "Next steps, clearly mapped", body: "After the conversation we share the exact admissions pathway for your child — timeline, documents and assessment." },
];

const guarantees = [
  { glyph: "⏱", label: "Reply within 1 business day" },
  { glyph: "🔒", label: "Your data stays private" },
  { glyph: "💬", label: "Real person, not a bot" },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="inquire-book-a-tour"
      showRelated={false}
      hero={{
        eyebrow: "Admissions",
        title: "Inquire or book a campus tour",
        lead: "Tell us about your child — an admissions officer will reach out within one business day.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Inquire", href: "/inquire-book-a-tour" },
        ],
      }}
    >
      <ContentSection flush>
        <div className="flex flex-wrap gap-3 mb-6">
          {guarantees.map((g) => (
            <span
              key={g.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-cream)] border border-[var(--brand-accent)]/30 text-[12px] font-bold text-[var(--brand-navy)]"
            >
              <span className="text-[var(--brand-accent)]">{g.glyph}</span>
              {g.label}
            </span>
          ))}
        </div>

        <FormCard
          title="Admission inquiry"
          subtitle="All fields marked * are required."
          source="inquire"
          fields={[
            { name: "name", label: "Parent name", required: true },
            { name: "email", label: "Email (optional)", type: "email" },
            { name: "phone", label: "Phone / WhatsApp", required: true },
            { name: "grade", label: "Child's current grade", type: "select",
              options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"] },
            { name: "message", label: "What would you like to know?", type: "textarea", required: true },
          ]}
          submitLabel="Submit inquiry"
          sideContent={
            <>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-3">
                  What happens next
                </div>
                <ol className="space-y-3.5">
                  {whatHappens.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 h-7 w-7 rounded-full bg-[var(--brand-primary)] text-white text-[12px] font-bold grid place-items-center">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-bold text-[var(--brand-navy)] text-[14px]">{s.title}</div>
                        <p className="text-[12.5px] text-slate-600 leading-snug mt-0.5">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-5 border-t border-[var(--brand-rule)] space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--brand-accent)]">
                  Or reach us directly
                </div>
                <Channel label="Call" value={site.phone} href={`tel:${site.phone.replace(/\s+/g, "")}`} />
                <Channel label="WhatsApp" value="Chat instantly" href={ctaWhatsApp.href} external />
                <Channel label="Email" value={site.email} href={`mailto:${site.email}`} />
              </div>

              <div className="rounded bg-[var(--brand-cream)] p-4 border-l-4 border-[var(--brand-accent)]">
                <div className="text-[var(--brand-accent)] text-2xl leading-none mb-1">&ldquo;</div>
                <p className="text-[13px] italic text-slate-700 leading-snug">
                  Within weeks of joining, our daughter was settled and asking to come to school. Teachers genuinely know each child by name.
                </p>
                <p className="mt-2 text-[11px] font-bold text-slate-500">— Parent, Grade 4</p>
              </div>

              <Link
                href="/campus-address"
                className="block text-center px-4 py-2.5 rounded-full bg-white border border-slate-300 hover:border-[var(--brand-primary)] text-[var(--brand-navy)] text-[13px] font-bold transition"
              >
                See campus address →
              </Link>
            </>
          }
        />
      </ContentSection>
    </InnerPageShell>
  );
}

function Channel({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between gap-3 p-2.5 rounded hover:bg-[var(--brand-cream)] transition group"
    >
      <div>
        <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">{label}</div>
        <div className="text-[14px] font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)]">{value}</div>
      </div>
      <span className="text-[var(--brand-accent)] font-bold">→</span>
    </a>
  );
}
