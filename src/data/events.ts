export type EventItem = {
  slug: string;
  title: string;
  startsAt: string; // ISO
  endsAt: string; // ISO
  location: string;
  type: "Open House" | "Parent–Teacher" | "Performance" | "Workshop" | "Holiday";
  excerpt: string;
};

export const events: EventItem[] = [
  {
    slug: "open-house-june-2026",
    title: "Open House",
    startsAt: "2026-06-21T10:00:00+08:00",
    endsAt: "2026-06-21T13:00:00+08:00",
    location: "SSSGS Campus, Singapore",
    type: "Open House",
    excerpt: "Tour the labs, meet the team, sit in on a class. Coffee on us.",
  },
  {
    slug: "parent-teacher-term2",
    title: "Term 3 Parent–Teacher Meeting",
    startsAt: "2026-07-12T09:00:00+08:00",
    endsAt: "2026-07-12T16:00:00+08:00",
    location: "SSSGS Campus, Singapore",
    type: "Parent–Teacher",
    excerpt: "Reserve your slot — 20-minute windows per family.",
  },
  {
    slug: "annual-day-2026",
    title: "Annual Day 2026",
    startsAt: "2026-09-19T17:30:00+08:00",
    endsAt: "2026-09-19T21:30:00+08:00",
    location: "Auditorium",
    type: "Performance",
    excerpt: "Whole-school showcase across music, dance, drama, art and academics.",
  },
  {
    slug: "science-workshop-oct",
    title: "Hands-on Science Workshop (G4–G6)",
    startsAt: "2026-10-04T09:30:00+08:00",
    endsAt: "2026-10-04T12:30:00+08:00",
    location: "Science Lab",
    type: "Workshop",
    excerpt: "Build, measure, present. Limited to 24 students.",
  },
  {
    slug: "deepavali-break",
    title: "Deepavali Break",
    startsAt: "2026-11-09T00:00:00+08:00",
    endsAt: "2026-11-10T23:59:59+08:00",
    location: "School closed",
    type: "Holiday",
    excerpt: "School reopens 11 November.",
  },
];
