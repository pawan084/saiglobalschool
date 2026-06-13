import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";
import TrustBadges from "@/components/TrustBadges";
import FormCard from "@/components/FormCard";
import Icon from "@/components/Icon";
import LiveOnlineIndicator from "@/components/LiveOnlineIndicator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { site } from "@/data/site";
import { ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: "Contact Us",
  description: "Reach Sri Sathya Sai Global School — call, WhatsApp, email or visit our campus.",
  alternates: { canonical: "/contact-us" },
};

type Channel = { iconName: "phone" | "chat" | "mail"; label: string; value: string; href: string; external?: boolean };

const channels: Channel[] = [
  { iconName: "phone", label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` },
  { iconName: "chat", label: "WhatsApp", value: "Chat instantly", href: ctaWhatsApp.href, external: true },
  { iconName: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
];

const reasons = [
  { iconName: "graduation", title: "Admissions & enrolment",      body: "Mid-year admissions, entry requirements, the assessment process, or moving from another curriculum." },
  { iconName: "credit-card", title: "Fees & policies",            body: "Fee structure, payment schedules, refund terms aligned with CPE Singapore, and what's included." },
  { iconName: "map-pin",     title: "Tour or open house visit",   body: "Book a 45-minute campus visit, attend the next open house, or arrange a personalised walk-through." },
  { iconName: "book-open",   title: "Curriculum & learning",      body: "Questions about NCERT alignment, the five learning labs, assessment style, or character development." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="contact-us"
      showRelated={false}
      hero={{
        eyebrow: "Contact",
        title: "Talk to the team that talks to your child every day",
        lead: "Admissions, curriculum, fees or a campus visit — reach the SSSGS team in whichever way suits you. We reply within one business day, every time.",
        breadcrumb: [{ label: "Contact", href: "/contact-us" }],
      }}
      ctaTitle="Prefer a quick chat?"
      ctaSubtitle="WhatsApp us — replies typically within an hour during office hours."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact-us" },
        ]}
      />

      {/* FOLD 2 — NEED */}
      <ContentSection flush eyebrow="What brings you here" title="The four reasons families usually get in touch">
        <FeatureGrid items={reasons} cols={2} />
      </ContentSection>

      {/* FOLD 3 — SOLUTION: contact channels */}
      <ContentSection flush eyebrow="The fastest ways to reach us" title="Pick the channel that suits you">
        <div className="mb-5">
          <LiveOnlineIndicator />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="card card-hover p-5 group"
            >
              <div className="h-10 w-10 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] grid place-items-center mb-3">
                <Icon name={c.iconName} size={18} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)]">{c.label}</div>
              <div className="mt-1 text-[15px] font-bold text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)]">{c.value}</div>
            </a>
          ))}
        </div>
      </ContentSection>

      {/* FOLD 4 — PROOF: trust signals */}
      <ContentSection flush eyebrow="A registered, accountable institution" title="Why your message lands in the right hands">
        <p className="text-[15px] text-slate-700 mb-5 leading-relaxed">
          SSSGS operates as a CPE Singapore-registered Private Education Institution. Our admissions and operations team is accountable and named, and responds within one business day.
        </p>
        <TrustBadges variant="inline" />
      </ContentSection>

      {/* FOLD 5 — ACTION: form */}
      <ContentSection flush eyebrow="Send us a message" title="Tell us about your family, your child, and what you're looking for">
        <FormCard
          title="Your enquiry"
          subtitle="We respond within one business day."
          source="contact"
          fields={[
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone / WhatsApp", required: true },
            { name: "preferred_contact", label: "Preferred contact method", type: "select",
              options: ["WhatsApp", "Phone call", "Email"] },
            { name: "topic", label: "What's it about?", type: "select",
              options: ["Admissions", "Tour / Visit", "Fees", "Curriculum", "Transport", "School calendar", "Other"] },
            { name: "child_name", label: "Child's name" },
            { name: "grade", label: "Child's grade", type: "select",
              options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Not applicable"] },
            { name: "best_time", label: "Best time to contact", type: "select",
              options: ["Morning", "Afternoon", "Evening", "Any time"] },
            { name: "message", label: "Your message", type: "textarea", required: true },
          ]}
          submitLabel="Send message"
          sideContent={
            <>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-1">Campus</div>
                <Link href="/campus-address" className="block text-slate-800 hover:text-[var(--brand-primary)] font-medium text-sm">
                  Full campus address →
                </Link>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-1">Office hours</div>
                <p className="text-slate-700 text-sm">Mon–Fri: 9:00–17:00<br />Sat: 9:00–13:00</p>
              </div>
            </>
          }
        />
      </ContentSection>
    </InnerPageShell>
  );
}
