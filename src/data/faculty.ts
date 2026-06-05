export type FacultyMember = {
  slug: string;
  name: string;
  role: string;
  image?: string;
  short: string;     // one-line teaser
  qualifications: string[];
  bio: string[];     // paragraphs
  teaches?: string[];
  quote?: string;
};

export const FACULTY: FacultyMember[] = [
  {
    slug: "principal",
    name: "Mausumi Mukherjee",
    role: "Principal & Mathematics",
    image: "/img/lsp07578_jpg.jpg",
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
    slug: "hod-science",
    name: "Pousali Bhattacharya",
    role: "HOD & Science",
    image: "/img/lsp07600_jpg.jpg",
    short: "Hands-on science teacher who believes lab work is where the learning sticks.",
    qualifications: [
      "M.Sc. Biotechnology",
      "B.Ed.",
      "15+ years teaching science at international schools",
    ],
    bio: [
      "Pousali heads the Science department and runs the school's lab programmes. Her classes are inquiry-led — students observe, hypothesise, measure and conclude, with structured reflection at the end of every unit.",
      "She also coordinates the annual Science Fair and the inter-school olympiad coaching track.",
    ],
    teaches: ["Science — Grades 4–8", "Olympiad coaching"],
    quote: "Lab work and field trips aren't decoration. They're where the learning sticks.",
  },
  {
    slug: "admissions-art",
    name: "Moumita Mazumdar",
    role: "Admissions Lead & Art",
    image: "/img/lsp07438_jpg.jpg",
    short: "Front door of the school — and the studio teacher who runs Annual Day art.",
    qualifications: [
      "M.A. Fine Arts",
      "B.Ed.",
      "10+ years in admissions and arts education",
    ],
    bio: [
      "Moumita runs the admissions process end-to-end — she's the person most families speak with first. She's also a practising artist who teaches the senior Art programme and curates the school's Annual Day exhibitions.",
      "Families regularly tell us the admissions experience felt 'unrushed, honest, and personal' — that's deliberate, and Moumita is why.",
    ],
    teaches: ["Art — Grades 5–8"],
  },
  // NOTE: The three entries below use real staff portraits (lsp07288/07305/07302) but
  // placeholder "Subject Lead" names. The original site's faculty page named six teachers —
  // Mausumi Mukherjee, Pousali Bhattacharya, Moumita Mazumdar (the first three above, correctly
  // mapped) plus Uma Balachandar (English & Social Studies) and two Primary teachers
  // (Prasanthi Siram, Sharmila Banu). The exact photo↔name pairing for these three was not
  // captioned in the archive — confirm names/roles with the school before publishing.
  {
    slug: "lead-language",
    name: "Subject Lead",
    role: "Language",
    image: "/img/lsp07288_jpg.jpg",
    short: "Reading, writing and oral fluency taught as a craft.",
    qualifications: ["M.A. English Literature", "B.Ed.", "Cambridge CELTA"],
    bio: [
      "Our Language Lead oversees the English programme across Grades 1–8 — from phonics-based reading in early years to literary analysis and structured debate at the secondary stage.",
      "She also runs the after-school phonics and reading-club enrichment for younger grades.",
    ],
    teaches: ["English — Grades 4–8", "Phonics enrichment"],
  },
  {
    slug: "lead-social",
    name: "Subject Lead",
    role: "Social Studies",
    image: "/img/lsp07305_jpg.jpg",
    short: "Maps, primary sources, and structured discussion across history and civics.",
    qualifications: ["M.A. History", "B.Ed."],
    bio: [
      "Our Social Studies Lead builds units around primary sources and structured discussion — students learn to ask better questions before reaching for answers.",
      "She also coordinates community-service projects with our values team.",
    ],
    teaches: ["Social Studies — Grades 5–8"],
  },
  {
    slug: "lead-ict",
    name: "Subject Lead",
    role: "ICT",
    image: "/img/lsp07302_jpg.jpg",
    short: "Digital literacy, computational thinking, and online safety from Grade 1.",
    qualifications: ["B.E. Computer Science", "Google Educator certification"],
    bio: [
      "Our ICT Lead designs the digital-literacy curriculum end-to-end, from typing posture in Grade 1 to Python and HTML/CSS at Grade 7–8. She maintains the device fleet and the classroom safety filters.",
      "She also runs an after-school coding club for students who want to go further.",
    ],
    teaches: ["ICT — All grades", "Coding club"],
  },
];
