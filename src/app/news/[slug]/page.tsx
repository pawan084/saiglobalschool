import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import { news } from "@/data/news";
import { SITE_URL } from "@/lib/site-url";

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title.replace(/&rsquo;/g, "'"),
    description: post.excerpt.replace(/&rsquo;/g, "'"),
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: post.title.replace(/&rsquo;/g, "'"),
      description: post.excerpt.replace(/&rsquo;/g, "'"),
      type: "article",
      publishedTime: post.date,
    },
  };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = news.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <InnerPageShell
      slug="resources"
      hero={{
        eyebrow: post.category,
        title: post.title.replace(/&rsquo;/g, "'"),
        lead: post.excerpt.replace(/&rsquo;/g, "'"),
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "News", href: "/news" },
          { label: post.title.replace(/&rsquo;/g, "'"), href: `/news/${slug}` },
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
          { label: post.title.replace(/&rsquo;/g, "'"), href: `/news/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title.replace(/&rsquo;/g, "'"),
          description: post.excerpt.replace(/&rsquo;/g, "'"),
          datePublished: post.date,
          author: { "@type": "Organization", name: "Sri Sathya Sai Global School" },
          publisher: {
            "@type": "Organization",
            name: "Sri Sathya Sai Global School",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
          },
          mainEntityOfPage: `${SITE_URL}/news/${slug}`,
        }}
      />

      <ContentSection flush>
        <div className="max-w-3xl">
          <div className="text-[12px] text-slate-500 inline-flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={11} />
              {fmt(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" size={11} />
              {post.readMin} min read
            </span>
          </div>
          <div className="prose-legal text-[15.5px] text-slate-700 leading-relaxed">
            <p>
              This page is a placeholder for the full article. When your editorial workflow is in
              place — whether through a CMS, MDX files, or a connected Notion database — wire the
              full content here.
            </p>
            <p>
              For now, here&rsquo;s the summary as it appears on the listing:
            </p>
            <blockquote className="border-l-4 border-[var(--brand-accent)] pl-4 italic text-[var(--brand-navy)]">
              {post.excerpt.replace(/&rsquo;/g, "'")}
            </blockquote>
            <p>
              Need the full update by email or want to talk it through?{" "}
              <Link href="/contact-us" className="text-[var(--brand-primary)] font-bold">
                Reach out to our team
              </Link>
              .
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <div className="news-eyebrow mb-2">Related stories</div>
            <h2 className="font-display text-[22px] font-bold text-[var(--brand-navy)] tracking-tight mb-4">
              More from {post.category}
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="card-fancy block p-4 rounded-2xl bg-white border border-[var(--brand-rule)]"
                  style={{ boxShadow: "var(--shadow-xs)" }}
                >
                  <div className="news-eyebrow">{r.category}</div>
                  <div className="font-display font-bold text-[15px] text-[var(--brand-navy)] mt-1 leading-snug">
                    {r.title.replace(/&rsquo;/g, "'")}
                  </div>
                  <div className="mt-2 text-[11.5px] text-slate-500">{fmt(r.date)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </ContentSection>
    </InnerPageShell>
  );
}
