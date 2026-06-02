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
  alternates: { canonical: "/news" },
};

const PAGE_SIZE = 6;

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildHref(cat: string | null, page: number) {
  const sp = new URLSearchParams();
  if (cat) sp.set("cat", cat);
  if (page > 1) sp.set("p", String(page));
  const qs = sp.toString();
  return qs ? `/news?${qs}` : "/news";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; p?: string }>;
}) {
  const params = await searchParams;
  const activeCat = (NEWS_CATEGORIES as readonly string[]).includes(params.cat ?? "")
    ? (params.cat as (typeof NEWS_CATEGORIES)[number])
    : null;
  const page = Math.max(1, Number(params.p) || 1);

  const sorted = [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const filtered = activeCat ? sorted.filter((p) => p.category === activeCat) : sorted;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  const showFeatured = safePage === 1 && !activeCat;
  const featured = showFeatured ? slice[0] : undefined;
  const grid = showFeatured ? slice.slice(1) : slice;

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

      <ContentSection flush>
        {/* Category chips (URL-driven) */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <Link
            href={buildHref(null, 1)}
            className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold transition ${
              !activeCat
                ? "bg-[var(--brand-navy)] text-white"
                : "bg-white border border-[var(--brand-rule)] text-slate-600 hover:border-[var(--brand-primary)]"
            }`}
          >
            All
          </Link>
          {NEWS_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={buildHref(c, 1)}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold transition ${
                activeCat === c
                  ? "bg-[var(--brand-navy)] text-white"
                  : "bg-white border border-[var(--brand-rule)] text-slate-600 hover:border-[var(--brand-primary)]"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-[var(--brand-rule)] bg-white p-8 text-center text-slate-500">
            No stories in this category yet.
          </div>
        )}

        {/* Featured (only page 1, no filter) */}
        {featured && (
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
              {featured.title.replace(/&rsquo;/g, "'")}
            </h2>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed max-w-3xl">
              {featured.excerpt.replace(/&rsquo;/g, "'")}
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
        )}

        {/* Grid */}
        {grid.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grid.map((p) => (
              <Link
                key={p.slug}
                href={`/news/${p.slug}`}
                className="card-fancy block p-5 rounded-2xl bg-white border border-[var(--brand-rule)] group"
                style={{ boxShadow: "var(--shadow-xs)" }}
              >
                <div className="news-eyebrow">{p.category}</div>
                <h3 className="font-display text-[18px] font-bold text-[var(--brand-navy)] mt-1 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                  {p.title.replace(/&rsquo;/g, "'")}
                </h3>
                <p className="mt-2 text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                  {p.excerpt.replace(/&rsquo;/g, "'")}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="News pages"
            className="mt-8 flex flex-wrap items-center justify-between gap-3"
          >
            <div className="text-[12px] text-slate-500">
              Page <span className="font-bold text-[var(--brand-navy)]">{safePage}</span> of {totalPages} · {filtered.length} stor{filtered.length === 1 ? "y" : "ies"}
            </div>
            <div className="flex items-center gap-1.5">
              {safePage > 1 ? (
                <Link
                  href={buildHref(activeCat, safePage - 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[12px] font-bold text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
                >
                  <Icon name="arrow-left" size={11} />
                  Newer
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-300">
                  <Icon name="arrow-left" size={11} />
                  Newer
                </span>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const sel = n === safePage;
                return (
                  <Link
                    key={n}
                    href={buildHref(activeCat, n)}
                    aria-current={sel ? "page" : undefined}
                    className={`min-w-[36px] text-center px-3 py-1.5 rounded-full text-[12px] font-bold transition ${
                      sel
                        ? "bg-[var(--brand-navy)] text-white"
                        : "bg-white border border-[var(--brand-rule)] text-slate-600 hover:border-[var(--brand-primary)]"
                    }`}
                  >
                    {n}
                  </Link>
                );
              })}
              {safePage < totalPages ? (
                <Link
                  href={buildHref(activeCat, safePage + 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--brand-rule)] text-[12px] font-bold text-[var(--brand-navy)] hover:border-[var(--brand-primary)] transition"
                >
                  Older
                  <Icon name="arrow-right" size={11} />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[12px] font-bold text-slate-300">
                  Older
                  <Icon name="arrow-right" size={11} />
                </span>
              )}
            </div>
          </nav>
        )}
      </ContentSection>
    </InnerPageShell>
  );
}
