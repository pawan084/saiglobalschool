import { news } from "@/data/news";
import { SITE_URL } from "@/lib/site-url";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = news
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((p) => {
      const title = escape(p.title.replace(/&rsquo;/g, "'"));
      const desc = escape(p.excerpt.replace(/&rsquo;/g, "'"));
      const link = `${SITE_URL}/news/${p.slug}`;
      const pub = new Date(p.date).toUTCString();
      return `<item>
        <title>${title}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        <pubDate>${pub}</pubDate>
        <category>${escape(p.category)}</category>
        <description>${desc}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sri Sathya Sai Global School — News</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>News and stories from SSSGS, Singapore.</description>
    <language>en-SG</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=600",
    },
  });
}
