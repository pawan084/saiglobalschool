import Link from "next/link";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Icon from "@/components/Icon";
import { news, NEWS_CATEGORIES } from "@/data/news";

export const metadata = {
  title: "News & stories",
  description:
    "Updates from SSSGS — admissions news, curriculum thinking, campus life and student achievements.",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Page() {
  const sorted = [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <InnerPageShell
      slug="resources"
      hero={{
        eyebrow: "Resources",
        title: "News & stories",
        lead: "What's happening on campus, in the classrooms, and across the SSSGS community.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "News", href: "/news" },
        ],
      }}
      ctaTitle="Want updates by email?"
      ctaSubtitle="Subscribe in the footer for our monthly digest."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "News", href: "/news" },
        ]}
      />

      {/* Categories */}
      <ContentSection flush>
        <div className="flex flex-wrap gap-1.5 mb-6">
          <span className="px-3 py-1.5 rounded-full bg-[var(--brand-navy)] text-white text-[11.5px] font-bold">
            All
          </span>
          {NEWS_CATEGORIES.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[11.5px] font-bold text-slate-600"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Featured */}
        <div
          className="rounded-3xl bg-white border border-[var(--brand-rule)] p-6 lg:p-8 mb-8 relative overflow-hidden"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
          />
          <div className="news-eyebrow">{featured.category} · Featured</div>
          <h2 className="font-display text-[28px] lg:text-[36px] font-bold text-[var(--brand-navy)] tracking-tight leading-tight mt-1">
            {featured.title}
          </h2>
          <p className="mt-3 text-[15px] text-slate-600 leading-relaxed max-w-3xl">
            {featured.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-[12px] text-slate-500 inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="calendar" size={11} />
                {fmt(featured.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" size={11} />
                {featured.readMin} min read
              </span>
            </div>
            <Link
              href={`/news/${featured.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--brand-primary)] hover:underline"
            >
              Read the story
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/news/${p.slug}`}
              className="card-fancy block p-5 rounded-2xl bg-white border border-[var(--brand-rule)] group"
              style={{ boxShadow: "var(--shadow-xs)" }}
            >
              <div className="news-eyebrow">{p.category}</div>
              <h3 className="font-display text-[18px] font-bold text-[var(--brand-navy)] mt-1 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-3 text-[11.5px] text-slate-500 inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="calendar" size={10} />
                  {fmt(p.date)}
                </span>
                <span>· {p.readMin} min</span>
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
