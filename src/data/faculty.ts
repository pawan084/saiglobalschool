export type FacultyMember = {
  slug: string;
  name: string;
  role: string;
  image?: string;
  /** Optional one-line teaser — omit until the school supplies it. */
  short?: string;
  qualifications?: string[];
  /** Optional paragraphs — omit until the school supplies the bio. */
  bio?: string[];
  teaches?: string[];
  quote?: string;
};

// 2026-06-10: faculty list refreshed from the school's official document and
// portrait set. Long-form bios/qualifications/quotes are intentionally omitted
// for entries where the school hasn't yet supplied them — see
// project_blocked_items.md. The two leadership entries (Mausumi, Pousali)
// retain prior teacher-supplied content because role + responsibilities match.
export const FACULTY: FacultyMember[] = [
  {
    slug: "mausumi-mukherjee",
    name: "Mausumi Mukherjee",
    role: "Principal & Mathematics Teacher",
    image: "/img/faculty/mausumi-mukherjee.jpg",
    short: "Three decades of teaching maths and leading schools across India and Singapore.",
    qualifications: [
      "M.Sc. Mathematics",
      "B.Ed.",
      "30+ years of teaching and leadership experience",
    ],
    bio: [
      "Mausumi has spent three decades in classrooms and in school leadership — from CBSE in India to international programmes in Singapore. Her conviction is simple: every child can learn maths if they are met where they are.",
      "At SSSGS she leads the academic agenda — curriculum design, assessment standards, and the pastoral practices that make a small school feel like a family.",
    ],
    teaches: ["Mathematics — Grades 6–8"],
    quote: "We don't just teach subjects — we teach children. Each one comes with a different story; the work is to meet them where they are.",
  },
  {
    slug: "pousali-bhattacharya",
    name: "Pousali Bhattacharya",
    role: "HOS & Science Teacher",
    image: "/img/faculty/pousali-bhattacharya.jpg",
    short: "Hands-on science teacher who believes lab work is where the learning sticks.",
    qualifications: [
      "M.Sc. Biotechnology",
      "B.Ed.",
      "15+ years teaching science at international schools",
    ],
    bio: [
      "Pousali heads the school as Head of School and leads the Science department. Her classes are inquiry-led — students observe, hypothesise, measure and conclude, with structured reflection at the end of every unit.",
      "She also coordinates the annual Science Fair and the inter-school Olympiad coaching track.",
    ],
    teaches: ["Science — Grades 4–8", "Olympiad coaching"],
    quote: "Lab work and field trips aren't decoration. They're where the learning sticks.",
  },
  {
    slug: "amrita-ghosal",
    name: "Amrita Ghosal",
    role: "International Curriculum and Pedagogy Director",
    image: "/img/faculty/amrita-ghosal.jpg",
  },
  {
    slug: "moumita-mazumdar",
    name: "Moumita Mazumdar",
    role: "Admission & School Operation Lead",
    image: "/img/faculty/moumita-mazumdar.jpg",
  },
  {
    slug: "neena-gupta",
    name: "Neena Gupta",
    role: "2nd Language HOD & Lab Coordinator",
    image: "/img/faculty/neena-gupta.jpg",
  },
  {
    slug: "uma-balachandar",
    name: "Uma Balachandar",
    role: "English & Social Studies Teacher",
    image: "/img/faculty/uma-balachandar.jpg",
  },
  {
    slug: "thangammal-marappan",
    name: "Thangammal Marappan",
    role: "Language Teacher",
    image: "/img/faculty/thangammal-marappan.jpg",
  },
  {
    slug: "prasanthi-siram",
    name: "Prasanthi Siram",
    role: "Primary Teacher",
    image: "/img/faculty/prasanthi-siram.jpg",
  },
  {
    slug: "sharmila-banu",
    name: "Sharmila Banu",
    role: "Primary Teacher",
    image: "/img/faculty/sharmila-banu.jpg",
  },
  {
    slug: "akanksha-agarwal",
    name: "Akanksha Agarwal",
    role: "Mathematics & Science Teacher",
    image: "/img/faculty/akanksha-agarwal.jpg",
  },
  {
    slug: "debsoma-pramanik",
    name: "Debsoma Pramanik",
    role: "Social Science & English Teacher",
    image: "/img/faculty/debsoma-pramanik.jpg",
  },
  {
    slug: "ganesh-srinivasan",
    name: "Ganesh Srinivasan",
    role: "Information and Communication Technology",
    image: "/img/faculty/ganesh-srinivasan.jpg",
  },
];
