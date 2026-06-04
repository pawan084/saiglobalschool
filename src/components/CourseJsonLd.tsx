import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site-url";

type Props = {
  name: string;
  description: string;
  path: string;
  provider?: string;
  grades?: string;
};

export default function CourseJsonLd({
  name,
  description,
  path,
  provider = "Sri Sathya Sai Global School",
  grades,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "EducationalOrganization",
      name: provider,
      sameAs: SITE_URL,
    },
    ...(grades
      ? {
          educationalLevel: grades,
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
          },
        }
      : {}),
    inLanguage: "en",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      category: "Tuition",
      url: `${SITE_URL}/fee-structure`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "in-person",
      // Required by Google's Course rich-result spec (May 2024).
      // ~5 hours of structured class time per subject per week across grade bands.
      courseWorkload: "PT5H",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P1W",
      },
    },
  };
  return <JsonLd data={data} />;
}
