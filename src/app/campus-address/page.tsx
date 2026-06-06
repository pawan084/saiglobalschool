import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import MapEmbed from "@/components/MapEmbed";
import { site } from "@/data/site";
import { ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: "Campus Address",
  description: "How to find Sri Sathya Sai Global School in Singapore — directions, transport and contact details.",
  alternates: { canonical: "/campus-address" },
};

export default function Page() {
  return (
    <InnerPageShell
      slug="campus-address"
      showRelated={false}
      hero={{
        eyebrow: "Campus",
        title: "Find the SSSGS campus",
        lead: "Visit us in Singapore. Directions, transport tips and contact details below — or speak with the office to arrange a tour.",
        breadcrumb: [
          { label: "Campus", href: "/campus" },
          { label: "Campus Address", href: "/campus-address" },
        ],
      }}
      ctaTitle="Want a campus tour?"
      ctaSubtitle="Book a guided visit and see the school during the day."
    >
      <ContentSection flush>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapEmbed
              query={`${site.name} Singapore`}
              label={`${site.name}, Singapore`}
            />
          </div>
          <aside className="space-y-4">
            <Info label="Address" value={`${site.name}\nSingapore`} />
            <Info label="Phone" value={site.phone} href={`tel:${site.phone.replace(/\s+/g, "")}`} />
            <Info label="Email" value={site.email} href={`mailto:${site.email}`} />
            <Info label="WhatsApp" value="Chat with us" href={ctaWhatsApp.href} external />
            <Info label="Office hours" value={"Mon–Fri: 9:00–17:00\nSat: 9:00–13:00"} />
          </aside>
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Getting here" title="Transport tips">
        <div className="grid md:grid-cols-3 gap-4">
          <Tip icon="🚇" title="By MRT" body="Nearest station details available on request — the office can advise the best route from your area." />
          <Tip icon="🚌" title="By school transport" body="School transport routes serve many parts of Singapore. Speak with the office for availability." />
          <Tip icon="🚗" title="By car" body="Visitor parking is available; we recommend confirming with the office ahead of arrival." />
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}

function Info({ label, value, href, external }: { label: string; value: string; href?: string; external?: boolean }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wide text-[var(--brand-accent)] mb-1">{label}</div>
      {href ? (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block whitespace-pre-line font-semibold text-[var(--brand-navy)] hover:text-[var(--brand-primary)] text-sm">
          {value}
        </a>
      ) : (
        <div className="whitespace-pre-line font-semibold text-[var(--brand-navy)] text-sm">{value}</div>
      )}
    </div>
  );
}

function Tip({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="p-4 bg-white border border-[var(--brand-rule)] rounded-md">
      <div className="text-xl mb-1.5">{icon}</div>
      <h3 className="font-bold text-[var(--brand-navy)]">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
