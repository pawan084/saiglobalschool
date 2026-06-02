import type { NewsCardProps } from "@/components/NewsCard";

type CardSpec = Omit<NewsCardProps, "variant">;

export type SectionSpec = {
  title: string;
  href?: string;
  accent?: "teal" | "orange" | "navy";
  main: CardSpec;
  satellites: CardSpec[];
  extras?: CardSpec[];
};

/* =========================================================
 *  HOME PAGE — composed of multiple sections
 * ========================================================= */
export const homeHero: CardSpec = {
  title: "Education Blossoms into Character",
  href: "/about-us",
  eyebrow: "Sri Sathya Sai Global School · Singapore",
  lead:
    "A values-rooted, academically structured international school for Grades 1–8 — NCERT-aligned curriculum, small-group learning, and experienced educators who know every child by name.",
  image: "/img/school_edited.jpg",
};

export const homeHeroSatellites: CardSpec[] = [
  {
    title: "Admissions open for Academic Year 2026",
    href: "/admission-process",
    eyebrow: "Admissions",
    lead: "Mid-year admissions welcome. Continue your child’s academic journey without disruption.",
    image: "/img/school_edited.jpg",
  },
  {
    title: "Book a campus tour this week",
    href: "/inquire-book-a-tour",
    eyebrow: "Visit",
    image: "/img/ss1_edited.jpg",
  },
  {
    title: "Meet our educators at Open House",
    href: "/open-house",
    eyebrow: "Event",
    image: "/img/lsp07578_jpg.jpg", imagePosition: "top" as const,
  },
  {
    title: "Curriculum & academic pathway, Grade 1 to 8",
    href: "/curriculum",
    eyebrow: "Academics",
    image: "/img/grade1-8_edited.jpg",
  },
];

export const homeSections: SectionSpec[] = [
  {
    title: "About SSSGS",
    href: "/about-us",
    accent: "teal",
    main: {
      title: "Vision, Mission and the SSSGS way",
      href: "/vision-mission",
      eyebrow: "Vision & Mission",
      lead:
        "We pursue Head, Heart and Hand — knowledge with compassion and purposeful action — so children grow into confident, contributing adults.",
      image: "/img/p1-vision.png",
    },
    satellites: [
      {
        title: "Management & governance, transparent and parent-aligned",
        href: "/management-governance",
        eyebrow: "Leadership",
        image: "/img/1599a2_8cdce8bb36eb4e6d9a4ff7648d331146_mv2.png",
      },
      {
        title: "Faculty: experienced, values-led educators",
        href: "/faculty",
        eyebrow: "Faculty",
        image: "/img/lsp07578_jpg.jpg", imagePosition: "top" as const,
      },
      {
        title: "Human excellence at the heart of every classroom",
        href: "/human-excellence",
        eyebrow: "Pedagogy",
        image: "/img/lab-english_jpg.jpg",
      },
      {
        title: "Character development, threaded through daily life",
        href: "/character-development",
        eyebrow: "Character",
        image: "/img/original-1.png",
      },
    ],
    extras: [
      { title: "Values integration & academics", href: "/values-integration-academics", eyebrow: "Pillar", image: "/img/1599a2_8d456f6d52e7480891c2e98f0468474f_mv2.png" },
      { title: "Parent community at SSSGS", href: "/parent-community", eyebrow: "Community", image: "/img/1599a2_ceba713090de446aa704425813893fe9_mv2.png" },
      { title: "Read the parent–student handbook", href: "/parent-student-handbook", eyebrow: "Handbook", image: "/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg" },
      { title: "FAQs from prospective families", href: "/faqs", eyebrow: "FAQ", image: "/img/sssgs_new-logo-3--226a26.jpg" },
    ],
  },

  {
    title: "Academics",
    href: "/academics",
    accent: "orange",
    main: {
      title: "Curriculum: NCERT-aligned, integrated, hands-on",
      href: "/curriculum",
      eyebrow: "Curriculum",
      lead:
        "Concept-led teaching, foundational skills, and age-appropriate progression across Grades 1–8 — designed for continuity through CBSE, ICSE, Cambridge, IB or local-curriculum transfers.",
      image: "/img/1599a2_ed47f03379f64d9ab01a96e82b343cd6_mv2.png",
    },
    satellites: [
      {
        title: "Courses offered across primary and middle school",
        href: "/courses-offered",
        eyebrow: "Courses",
        image: "/img/grade1-8_edited.jpg",
      },
      {
        title: "Academic pathway, Grade 1 to Grade 8",
        href: "/academic-pathway",
        eyebrow: "Pathway",
        image: "/img/548-1.png",
      },
      {
        title: "Assessment structure: formative and summative",
        href: "/assessment-structure",
        eyebrow: "Assessment",
        image: "/img/7621-1.png",
      },
      {
        title: "Learning labs — language, science, maths, ICT",
        href: "/learning-labs",
        eyebrow: "Labs",
        image: "/img/lab-english_jpg.jpg",
      },
    ],
    extras: [
      { title: "Technology & LMS for parents and students", href: "/technology-lms", eyebrow: "Tech", image: "/img/sssgs_new-logo-3--226a26.jpg" },
      { title: "Student support & enrichment", href: "/student-support", eyebrow: "Support", image: "/img/1599a2_ed47f03379f64d9ab01a96e82b343cd6_mv2.png" },
      { title: "Co-curricular activities (CCA)", href: "/cca", eyebrow: "CCA", image: "/img/1599a2_5a4405ad06c548069c50fa4e1e4647ca_mv2.png" },
      { title: "Phonics, Abacus, Vedic Maths & Olympiad", href: "/enrichment-activities", eyebrow: "Enrichment", image: "/img/1599a2_7a27f86e83ca49f9a97a56eafa80b134_mv2.png" },
    ],
  },

  {
    title: "Learning Labs",
    href: "/learning-labs",
    accent: "teal",
    main: {
      title: "Science Lab — where curiosity meets evidence",
      href: "/science-lab",
      eyebrow: "Science",
      lead: "Hands-on experiments, structured enquiry, and a culture of asking questions — children learn to think like scientists.",
      image: "/img/1599a2_ececcb34ed9c44db92913aa8c13503ef_mv2.jpg",
    },
    satellites: [
      {
        title: "Language Lab: read, speak, write, with confidence",
        href: "/language-lab",
        eyebrow: "Language",
        image: "/img/1599a2_38d21a50594d437cb89204e57148a189_mv2.png",
      },
      {
        title: "Maths Lab: visualise, model, prove",
        href: "/maths-lab",
        eyebrow: "Maths",
        image: "/img/1599a2_d5965d0120da4471b9832d5478969cec_mv2.png",
      },
      {
        title: "ICT Lab: digital literacy from Grade 1",
        href: "/ict-lab",
        eyebrow: "ICT",
        image: "/img/1599a2_11ae48a37e3d4942b243075e5e2bc127_mv2.png",
      },
      {
        title: "Enrichment activities across subjects",
        href: "/enrichment-activities",
        eyebrow: "Enrichment",
        image: "/img/ss1_edited.jpg",
      },
    ],
  },

  {
    title: "Campus Life",
    href: "/campus",
    accent: "navy",
    main: {
      title: "A day at SSSGS — from morning circle to closing reflection",
      href: "/a-day-at-sssgs",
      eyebrow: "School Day",
      lead: "Structured rhythms, classroom learning, lab work, CCAs, mealtime conversations, and reflection — every day rounds the whole child.",
      image: "/img/p1-vision.png",
    },
    satellites: [
      {
        title: "Facilities: built for safe, focused learning",
        href: "/facilities",
        eyebrow: "Facilities",
        image: "/img/school_edited.jpg",
      },
      {
        title: "SSSGS spaces — classrooms, labs, library",
        href: "/sssgs-spaces",
        eyebrow: "Spaces",
        image: "/img/1599a2_ceba713090de446aa704425813893fe9_mv2.png",
      },
      {
        title: "Co-curricular activities & clubs",
        href: "/cca",
        eyebrow: "CCA",
        image: "/img/grade1-8_edited.jpg",
      },
      {
        title: "Uniform, transportation & daily logistics",
        href: "/school-uniform-and-transportation",
        eyebrow: "Daily Life",
        image: "/img/1599a2_ececcb34ed9c44db92913aa8c13503ef_mv2.jpg",
      },
    ],
  },

  {
    title: "Admissions",
    href: "/admissions",
    accent: "orange",
    main: {
      title: "Admission process: clear, supportive, parent-friendly",
      href: "/admission-process",
      eyebrow: "Admission",
      lead: "Inquire → meet the team → assessment → registration. Mid-year admissions welcome; we accompany families through every step.",
      image: "/img/grade1-8_edited.jpg",
    },
    satellites: [
      {
        title: "Entry requirements by grade",
        href: "/entry-requirements",
        eyebrow: "Requirements",
        image: "/img/grade1-8_edited.jpg",
      },
      {
        title: "Registration & documents",
        href: "/registration",
        eyebrow: "Register",
        image: "/img/school_edited.jpg",
      },
      {
        title: "Fee structure for Grades 1–8",
        href: "/fee-structure",
        eyebrow: "Fees",
        image: "/img/lab-english_jpg.jpg",
      },
      {
        title: "Open House — meet faculty in person",
        href: "/open-house",
        eyebrow: "Event",
        image: "/img/548-1.png",
      },
    ],
    extras: [
      { title: "Refund policy & terms", href: "/refund-policy", eyebrow: "Policy", image: "/img/sssgs_new-logo-3--226a26.jpg" },
      { title: "Inquire / book a campus tour", href: "/inquire-book-a-tour", eyebrow: "Visit", image: "/img/7621-1.png" },
      { title: "FAQs from prospective parents", href: "/faqs", eyebrow: "FAQ", image: "/img/sssgs_new-logo-3-.jpg" },
      { title: "Contact admissions", href: "/contact-us", eyebrow: "Contact", image: "/img/1599a2_8e68bf804ebd4e5ba224bafdc32cd7de_mv2.png" },
    ],
  },

  {
    title: "Resources for Parents",
    href: "/resources",
    accent: "navy",
    main: {
      title: "Parent–Student Handbook — everything you need in one place",
      href: "/parent-student-handbook",
      eyebrow: "Handbook",
      lead: "Policies, expectations, support channels, and the rhythms of SSSGS life — written for parents and shared openly.",
      image: "/img/1599a2_39e7dbd515d14373b77f9a6d0140fa2e_mv2.jpg",
    },
    satellites: [
      {
        title: "School calendar 2026 & holiday list",
        href: "/calendar",
        eyebrow: "Calendar",
        image: "/img/white.jpg",
      },
      {
        title: "FAQs from prospective parents",
        href: "/faqs",
        eyebrow: "FAQ",
        image: "/img/sssgs_new-logo-3--226a26.jpg",
      },
      {
        title: "Olympiad coaching for Grades 3–8",
        href: "/olympiad",
        eyebrow: "Olympiad",
        image: "/img/1599a2_5673a8acdee043768e0d99294cebca80_mv2.png",
      },
      {
        title: "Phonics classes — early literacy",
        href: "/phonics-classes",
        eyebrow: "Phonics",
        image: "/img/1599a2_7a27f86e83ca49f9a97a56eafa80b134_mv2.png",
      },
    ],
    extras: [
      { title: "Abacus & Vedic Maths classes", href: "/abacus-vedic-maths", eyebrow: "Maths", image: "/img/1599a2_6a14b3f0a5544c0bad5ed491c8684598_mv2.png" },
      { title: "Refund policy details", href: "/refund-policy", eyebrow: "Policy", image: "/img/sssgs_new-logo-3-.jpg" },
      { title: "Contact us anytime", href: "/contact-us", eyebrow: "Contact", image: "/img/1599a2_8e68bf804ebd4e5ba224bafdc32cd7de_mv2.png" },
      { title: "WhatsApp the admissions desk", href: "https://wa.me/6580830971", eyebrow: "Chat", image: "/img/1599a2_5a4405ad06c548069c50fa4e1e4647ca_mv2.png" },
    ],
  },
];
