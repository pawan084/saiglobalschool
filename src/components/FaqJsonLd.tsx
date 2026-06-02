import JsonLd from "./JsonLd";

type Qa = { q: string; a: string };

export default function FaqJsonLd({ items }: { items: Qa[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.a,
      },
    })),
  };
  return <JsonLd data={data} />;
}
