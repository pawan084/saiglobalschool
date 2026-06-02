export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: "Admissions" | "Curriculum" | "Campus Life" | "Achievements" | "Community";
  readMin: number;
};

export const news: NewsPost[] = [
  {
    slug: "open-house-june-2026",
    title: "Open House announced for 21 June 2026",
    excerpt:
      "Tour the labs, meet the team, sit in on a class. Open registrations across all eight grades.",
    date: "2026-05-28",
    category: "Admissions",
    readMin: 3,
  },
  {
    slug: "values-integration-update",
    title: "How we&rsquo;re integrating values into every subject",
    excerpt:
      "A short tour through the framework that links Sathya, Dharma, Shanti, Prema and Ahimsa to the daily classroom.",
    date: "2026-05-15",
    category: "Curriculum",
    readMin: 5,
  },
  {
    slug: "science-fair-recap",
    title: "Science Fair 2026 — student projects recap",
    excerpt: "From a low-cost air-quality sensor to an automated plant watering system — Grade 6–8 showcase.",
    date: "2026-04-30",
    category: "Achievements",
    readMin: 4,
  },
  {
    slug: "parent-pulse-march",
    title: "Parent Pulse: feedback from the March survey",
    excerpt: "85% satisfaction across academics; we&rsquo;re acting on feedback around CCA timing and the transport pickup window.",
    date: "2026-04-10",
    category: "Community",
    readMin: 4,
  },
  {
    slug: "a-day-in-grade-3",
    title: "A day in Grade 3 — what it actually looks like",
    excerpt: "From morning circle to lab-period reflections, narrated by Ms. Roy.",
    date: "2026-03-22",
    category: "Campus Life",
    readMin: 6,
  },
  {
    slug: "abacus-launch",
    title: "Abacus & Vedic Maths join the enrichment programme",
    excerpt: "Beginning April 2026 — two new optional tracks for Grades 1–5.",
    date: "2026-03-08",
    category: "Curriculum",
    readMin: 2,
  },
];

export const NEWS_CATEGORIES: NewsPost["category"][] = [
  "Admissions",
  "Curriculum",
  "Campus Life",
  "Achievements",
  "Community",
];
