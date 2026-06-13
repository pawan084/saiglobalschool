import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import BrandLogo from "@/components/BrandLogo";
import Icon from "@/components/Icon";
import { site } from "@/data/site";

export const metadata = {
  title: "Press kit",
  description:
    "Brand assets, boilerplate and media contact for Sri Sathya Sai Global School, Singapore.",
  alternates: { canonical: "/press" },
};

const facts: { label: string; value: string }[] = [
  { label: "Founded", value: "2025" },
  { label: "Coverage", value: "Primary and middle school (expanding)" },
  { label: "Curriculum", value: "NCERT-aligned, values-integrated" },
  { label: "Class size", value: "~1:20 maximum" },
  { label: "Location", value: "Singapore" },
  { label: "Languages", value: "English (medium of instruction); second and third languages as core curriculum" },
];

export default function Page() {
  const boilerplate = `Sri Sathya Sai Global School (SSSGS) is an international school in Singapore offering an NCERT-aligned, values-integrated education for primary and middle school. The school is committed to nurturing learners of strong character through holistic academics, structured assessment and a deliberate focus on the five universal values of Sathya (Truth), Dharma (Right Conduct), Shanti (Peace), Prema (Love) and Ahimsa (Non-Violence).`;

  return (
    <InnerPageShell
      slug="about-us"
      showRelated={false}
      hero={{
        eyebrow: "Press",
        title: "Press kit",
        lead: "Boilerplate, brand assets, fast facts and a direct line to the media contact.",
        breadcrumb: [{ label: "Press", href: "/press" }],
      }}
      ctaTitle="On deadline?"
      ctaSubtitle="Email the media contact below and we'll get back the same day."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Press", href: "/press" },
        ]}
      />

      <ContentSection flush>
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Boilerplate */}
          <div
            className="rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="news-eyebrow">Boilerplate</div>
            <h2 className="font-display text-[20px] font-bold text-[var(--brand-navy)] mt-1">
              About Sri Sathya Sai Global School
            </h2>
            <p className="mt-3 text-[14px] text-slate-700 leading-relaxed">
              {boilerplate}
            </p>
          </div>

          {/* Brand assets */}
          <div
            className="rounded-2xl bg-[var(--brand-cream)] border border-[var(--brand-rule)] p-6 lg:p-7"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="news-eyebrow">Brand assets</div>
            <h2 className="font-display text-[20px] font-bold text-[var(--brand-navy)] mt-1">
              Logo & colours
            </h2>
            <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--brand-rule)]">
              <BrandLogo size={72} />
              <div>
                <div className="font-bold text-[14px] text-[var(--brand-navy)]">
                  Primary logo · golden lotus + 5 values
                </div>
                <a
                  href="/logo.png"
                  download
                  className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--brand-primary)] hover:underline"
                >
                  <Icon name="document" size={12} />
                  Download PNG (512×512)
                </a>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { name: "Primary", hex: "#0d8a87" },
                { name: "Accent", hex: "#ea580c" },
                { name: "Navy", hex: "#0b1d33" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="rounded-xl border border-[var(--brand-rule)] bg-white overflow-hidden"
                >
                  <div className="h-10" style={{ background: c.hex }} />
                  <div className="px-3 py-1.5">
                    <div className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-500">
                      {c.name}
                    </div>
                    <div className="font-mono text-[11px] text-[var(--brand-navy)]">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fast facts */}
        <div className="mt-6 rounded-2xl bg-white border border-[var(--brand-rule)] p-6 lg:p-7" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="news-eyebrow">Fast facts</div>
          <h2 className="font-display text-[20px] font-bold text-[var(--brand-navy)] mt-1">
            At a glance
          </h2>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                  {f.label}
                </dt>
                <dd className="text-[13.5px] text-[var(--brand-navy)] font-bold mt-0.5">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact */}
        <div className="mt-6 rounded-2xl bg-[var(--brand-navy)] text-white p-6 lg:p-7">
          <div className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
            Media contact
          </div>
          <div className="mt-2 grid sm:grid-cols-2 gap-3">
            <a href={`mailto:${site.email}`} className="text-white hover:underline font-bold">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-white hover:underline font-bold">
              {site.phone}
            </a>
          </div>
          <p className="mt-3 text-[13px] text-white/70">
            We typically reply within the business day. For interviews please give us 1–2 days&rsquo; notice where possible.
          </p>
          <Link
            href="/contact-us"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--brand-accent)] hover:underline"
          >
            Contact form
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
