import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site-url";

type Crumb = { label: string; href: string };

export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href.startsWith("http") ? c.href : `${SITE_URL}${c.href}`,
    })),
  };
  return <JsonLd data={data} />;
}
