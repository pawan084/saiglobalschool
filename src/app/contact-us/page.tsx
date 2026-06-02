import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FormCard from "@/components/FormCard";
import Icon from "@/components/Icon";
import LiveOnlineIndicator from "@/components/LiveOnlineIndicator";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { site } from "@/data/site";
import { ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: "Contact Us",
  description: "Reach Sri Sathya Sai Global School — call, WhatsApp, email or visit our campus.",
};

type Channel = { iconName: "phone" | "chat" | "mail"; label: string; value: string; href: string; external?: boolean };

const channels: Channel[] = [
  { iconName: "phone", label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}` },
  { iconName: "chat", label: "WhatsApp", value: "Chat instantly", href: ctaWhatsApp.href, external: true },
  { iconName: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="contact-us"
      hero={{
        eyebrow: "Contact",
        title: "Get in touch with us",
        lead: "Whether you're exploring admissions or want to learn more about the school, we'd love to hear from you.",
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
      <ContentSection flush>
        <div className="mb-5">
          <LiveOnlineIndicator />
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
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

        <FormCard
          title="Send us a message"
          subtitle="We respond within one business day."
          source="contact"
          fields={[
            { name: "name", label: "Your name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone / WhatsApp" },
            { name: "topic", label: "What's it about?", type: "select",
              options: ["Admissions", "Tour / Visit", "Fees", "Curriculum", "Other"] },
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
