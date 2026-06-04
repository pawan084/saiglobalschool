import Link from "next/link";
import type { Metadata } from "next";
import { searchEntries } from "@/lib/search";
import { searchIndex } from "@/data/search-index";
import PageHero from "@/components/PageHero";
import ContentSection from "@/components/ContentSection";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Search",
  description: "Find pages, programs, fees and policies across the SSSGS site.",
  // Search-result pages are utility, not content — keep them out of the index
  // (Sitelinks Search Box still works without indexing the destination).
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

const POPULAR = [
  "/apply",
  "/inquire-book-a-tour",
  "/fee-structure",
  "/admission-process",
  "/curriculum",
  "/faculty",
  "/calendar",
  "/contact-us",
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const rawQ = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const q = (rawQ ?? "").trim().slice(0, 100);
  const results = q
    ? searchEntries(q, 30)
    : (POPULAR.map((href) => searchIndex.find((s) => s.href === href)).filter(Boolean) as typeof searchIndex);

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search SSSGS"}
        lead={
          q
            ? `${results.length} ${results.length === 1 ? "match" : "matches"} across the site.`
            : "Find pages, programs, fees and policies. Try “fees”, “grade 3” or “open house”."
        }
        breadcrumb={[{ label: "Search", href: "/search" }]}
      />

      <ContentSection flush>
        <form
          action="/search"
          method="get"
          role="search"
          aria-label="Site search"
          className="flex gap-2 max-w-xl"
        >
          <label htmlFor="q" className="sr-only">
            Search query
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search SSSGS — fees, curriculum, admissions…"
            autoFocus
            className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-[var(--brand-rule-strong)] bg-white text-[14px] text-[var(--brand-navy)] placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/15 outline-none transition"
          />
          <button
            type="submit"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-dark)] text-white text-[13px] font-bold transition"
          >
            Search
            <Icon name="arrow-right" size={13} />
          </button>
        </form>

        {q && results.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[var(--brand-rule)] bg-white p-6 text-center">
            <div className="font-display text-[18px] font-bold text-[var(--brand-navy)]">
              Nothing matched “{q}”.
            </div>
            <p className="mt-1 text-[13.5px] text-slate-600">
              Try a shorter or different word, or browse popular destinations below.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {POPULAR.map((href) => {
                const e = searchIndex.find((s) => s.href === href);
                if (!e) return null;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 rounded-full text-[12px] bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] text-[var(--brand-navy)] font-bold transition"
                  >
                    {e.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <ul className="mt-6 grid gap-2 max-w-3xl">
            {!q && (
              <li className="text-[10.5px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)]">
                Popular destinations
              </li>
            )}
            {results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] hover:shadow-sm transition"
                >
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] shrink-0">
                    <Icon name="arrow-right" size={13} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-[14.5px] text-[var(--brand-navy)] group-hover:text-[var(--brand-primary)] transition-colors">
                      {r.title}
                    </span>
                    <span className="block text-[12px] text-slate-500 truncate">
                      {r.section} · {r.href}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ContentSection>
    </>
  );
}
