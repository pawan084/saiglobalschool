import type { NewsCardProps } from "@/components/NewsCard";
import { homeSections } from "./sections";

type CardSpec = Omit<NewsCardProps, "variant">;

export type SectionKey = "about" | "academics" | "labs" | "campus" | "admissions" | "resources";

export const sectionMeta: Record<
  SectionKey,
  { label: string; href: string; cta: string; ctaHref: string; title: string; intro: string }
> = {
  about: {
    label: "About SSSGS",
    href: "/about-us",
    cta: "Book a Campus Tour",
    ctaHref: "/inquire-book-a-tour",
    title: "More on the SSSGS way.",
    intro:
      "From governance and faculty to vision, character and community — the people and principles that shape the school.",
  },
  academics: {
    label: "Academics",
    href: "/academics",
    cta: "Explore Curriculum",
    ctaHref: "/curriculum",
    title: "More from Academics.",
    intro:
      "Curriculum, pathway, assessment and the labs and supports that make it all work in the classroom.",
  },
  labs: {
    label: "Learning Labs",
    href: "/learning-labs",
    cta: "See the Labs",
    ctaHref: "/inquire-book-a-tour",
    title: "Other Learning Labs.",
    intro:
      "Science, maths, language, English and ICT — each lab gives children a regular, structured chance to apply what they learn.",
  },
  campus: {
    label: "Campus Life",
    href: "/campus",
    cta: "Visit the Campus",
    ctaHref: "/inquire-book-a-tour",
    title: "More of Campus Life.",
    intro:
      "Daily rhythms, facilities, activities and the practical details of life at SSSGS.",
  },
  admissions: {
    label: "Admissions",
    href: "/admissions",
    cta: "Inquire Now",
    ctaHref: "/inquire-book-a-tour",
    title: "More from Admissions.",
    intro:
      "Entry, fees, dates and policies — everything you need to walk the admissions journey with us.",
  },
  resources: {
    label: "Resources",
    href: "/resources",
    cta: "Contact Us",
    ctaHref: "/contact-us",
    title: "More Resources for Parents.",
    intro:
      "Handbook, calendar, FAQs and the enrichment programs that run alongside the core curriculum.",
  },
};

/**
 * Map each page slug to its section. Used for picking the right "more from..." list.
 */
export const slugSection: Record<string, SectionKey> = {
  // About
  "vision-mission": "about",
  "management-governance": "about",
  "human-excellence": "about",
  "character-development": "about",
  "values-integration-academics": "about",
  "faculty": "about",
  "parent-community": "about",
  "accreditation": "about",

  // Academics
  "curriculum": "academics",
  "courses-offered": "academics",
  "academic-pathway": "academics",
  "assessment-structure": "academics",
  "cca": "academics",
  "enrichment-activities": "academics",
  "technology-lms": "academics",
  "student-support": "academics",

  // Labs
  "learning-labs": "labs",
  "language-lab": "labs",
  "english-lab": "labs",
  "science-lab": "labs",
  "maths-lab": "labs",
  "ict-lab": "labs",

  // Campus
  "facilities": "campus",
  "sssgs-spaces": "campus",
  "a-day-at-sssgs": "campus",
  "campus-address": "campus",
  "school-uniform-and-transportation": "campus",
  "non-academic": "campus",

  // Admissions
  "admission-process": "admissions",
  "entry-requirements": "admissions",
  "registration": "admissions",
  "fee-structure": "admissions",
  "refund-policy": "admissions",
  "open-house": "admissions",
  "inquire-book-a-tour": "admissions",
  "contact-us": "admissions",

  // Resources
  "calendar": "resources",
  "parent-student-handbook": "resources",
  "faqs": "resources",
  "phonics-classes": "resources",
  "abacus-vedic-maths": "resources",
  "olympiad": "resources",
};

/** Build the related-cards list for a section by pulling from the main sections data. */
function relatedFor(sectionKey: SectionKey): CardSpec[] {
  const map: Record<SectionKey, string> = {
    about: "About SSSGS",
    academics: "Academics",
    labs: "Learning Labs",
    campus: "Campus Life",
    admissions: "Admissions",
    resources: "Resources for Parents",
  };
  const section = homeSections.find((s) => s.title === map[sectionKey]);
  if (!section) return [];
  return [section.main, ...section.satellites, ...(section.extras ?? [])];
}

export function getSidebarItems(slug: string): CardSpec[] {
  const key = slugSection[slug];
  if (!key) return [];
  // Exclude the current page from its own sidebar
  return relatedFor(key).filter((c) => !c.href.endsWith(`/${slug}`));
}

export function getRelatedBlock(slug: string): {
  title: string;
  sectionHref: string;
  main: CardSpec;
  satellites: CardSpec[];
} | null {
  const key = slugSection[slug];
  if (!key) return null;
  const items = relatedFor(key).filter((c) => !c.href.endsWith(`/${slug}`));
  if (items.length < 4) return null;
  return {
    title: `More from ${sectionMeta[key].label}`,
    sectionHref: sectionMeta[key].href,
    main: items[0],
    satellites: items.slice(1, 5),
  };
}

export function getSectionMeta(slug: string) {
  const key = slugSection[slug];
  if (!key) return null;
  return sectionMeta[key];
}
