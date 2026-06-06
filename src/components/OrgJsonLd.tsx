import JsonLd from "./JsonLd";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";

export default function OrgJsonLd() {
  const school = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${SITE_URL}/#school`,
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    slogan: site.tagline,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    // NOTE: streetAddress/postalCode/geo are intentionally omitted — a real
    // street address isn't in the project yet. A placeholder string is invalid
    // structured data (worse than omitting), so add the real values here when
    // the school provides them (and consider a `geo` lat/long for Map results).
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    sameAs: [site.social.facebook, site.social.youtube].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    publisher: { "@id": `${SITE_URL}/#school` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={school} />
      <JsonLd data={website} />
    </>
  );
}
