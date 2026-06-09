import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { SUBJECTS } from "@/data/subjects";

type Cfg = {
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

const ROUTES: Cfg[] = [
  // Top priority
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/inquire-book-a-tour", changeFrequency: "weekly", priority: 0.95 },
  { path: "/apply", changeFrequency: "weekly", priority: 0.95 },
  { path: "/admissions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/admission-process", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fee-structure", changeFrequency: "monthly", priority: 0.9 },
  { path: "/fee-structure/calculator", changeFrequency: "monthly", priority: 0.85 },
  { path: "/open-house", changeFrequency: "weekly", priority: 0.85 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.85 },

  // Sections
  { path: "/academics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/campus", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.7 },

  // About
  { path: "/vision-mission", changeFrequency: "yearly", priority: 0.7 },
  { path: "/management-governance", changeFrequency: "yearly", priority: 0.6 },
  { path: "/human-excellence", changeFrequency: "yearly", priority: 0.6 },
  { path: "/character-development", changeFrequency: "yearly", priority: 0.6 },
  { path: "/faculty", changeFrequency: "monthly", priority: 0.7 },
  { path: "/parent-community", changeFrequency: "monthly", priority: 0.6 },

  // Academics
  { path: "/curriculum", changeFrequency: "monthly", priority: 0.85 },
  { path: "/curriculum/comparison", changeFrequency: "monthly", priority: 0.75 },
  { path: "/courses-offered", changeFrequency: "monthly", priority: 0.7 },
  { path: "/academic-pathway", changeFrequency: "monthly", priority: 0.7 },
  { path: "/assessment-structure", changeFrequency: "yearly", priority: 0.6 },
  { path: "/learning-labs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/english-lab", changeFrequency: "yearly", priority: 0.5 },
  { path: "/ict-lab", changeFrequency: "yearly", priority: 0.5 },
  { path: "/language-lab", changeFrequency: "yearly", priority: 0.5 },
  { path: "/maths-lab", changeFrequency: "yearly", priority: 0.5 },
  { path: "/science-lab", changeFrequency: "yearly", priority: 0.5 },
  { path: "/cca", changeFrequency: "monthly", priority: 0.65 },
  { path: "/enrichment-activities", changeFrequency: "monthly", priority: 0.6 },
  { path: "/technology-lms", changeFrequency: "monthly", priority: 0.55 },
  { path: "/student-support", changeFrequency: "yearly", priority: 0.55 },
  { path: "/values-integration-academics", changeFrequency: "yearly", priority: 0.55 },

  // Campus
  { path: "/facilities", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sssgs-spaces", changeFrequency: "monthly", priority: 0.65 },
  { path: "/a-day-at-sssgs", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus-address", changeFrequency: "yearly", priority: 0.65 },
  { path: "/school-uniform-and-transportation", changeFrequency: "yearly", priority: 0.5 },
  { path: "/non-academic", changeFrequency: "yearly", priority: 0.5 },

  // Admissions
  { path: "/entry-requirements", changeFrequency: "yearly", priority: 0.8 },
  { path: "/registration", changeFrequency: "yearly", priority: 0.75 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.5 },

  // Resources
  { path: "/calendar", changeFrequency: "weekly", priority: 0.75 },
  { path: "/news", changeFrequency: "weekly", priority: 0.75 },
  { path: "/events", changeFrequency: "weekly", priority: 0.75 },
  { path: "/parent-student-handbook", changeFrequency: "yearly", priority: 0.55 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/phonics-classes", changeFrequency: "yearly", priority: 0.5 },
  { path: "/abacus-vedic-maths", changeFrequency: "yearly", priority: 0.5 },
  { path: "/olympiad", changeFrequency: "yearly", priority: 0.5 },

  // Self-service
  { path: "/grade-fit", changeFrequency: "yearly", priority: 0.7 },
  { path: "/press", changeFrequency: "monthly", priority: 0.4 },
  { path: "/accreditation", changeFrequency: "yearly", priority: 0.55 },

  // Legal
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const newsEntries = news.map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const eventEntries = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: new Date(e.startsAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const subjectEntries = SUBJECTS.map((s) => ({
    url: `${SITE_URL}/curriculum/${s.id}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...newsEntries, ...eventEntries, ...subjectEntries];
}
