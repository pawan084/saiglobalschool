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
 *  Card images are sourced from the original SSSGS Wix site's
 *  hero/feature image for each page (audit run 2026-06).
 * ========================================================= */
export const homeHero: CardSpec = {
  title: "Education Blossoms into Character",
  href: "/about-us",
  eyebrow: "Home - International School",
  lead:
    "A values-rooted, academically structured international school for primary and middle school — NCERT-aligned curriculum, small-group learning, and experienced educators who know every child by name.",
  image: "/img/home/hero/school-campus.jpg",
};

export const homeHeroSatellites: CardSpec[] = [
  {
    title: "Admissions open for Academic Year 2026",
    href: "/admission-process",
    eyebrow: "Admissions",
    lead: "Mid-year admissions welcome. Continue your child’s academic journey without disruption.",
    image: "/img/home/hero/admissions-open.jpg", imagePosition: "top" as const,
  },
  {
    title: "Book a campus tour this week",
    href: "/inquire-book-a-tour",
    eyebrow: "Visit",
    image: "/img/home/hero/campus-tour.jpg",
  },
  {
    title: "Meet our educators at Open House",
    href: "/open-house",
    eyebrow: "Event",
    image: "/img/home/hero/open-house-educators.jpg", imagePosition: "top" as const,
  },
  {
    title: "Curriculum & academic pathway",
    href: "/curriculum",
    eyebrow: "Academics",
    image: "/img/home/hero/curriculum-pathway.jpg",
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
      image: "/img/photos-2026-06/about-head-heart-hand.jpg",
    },
    satellites: [
      {
        title: "Management & governance, transparent and parent-aligned",
        href: "/management-governance",
        eyebrow: "Leadership",
        image: "/img/home/about-sssgs/management-governance.jpg", imagePosition: "top" as const,
      },
      {
        title: "Faculty: experienced, values-led educators",
        href: "/faculty",
        eyebrow: "Faculty",
        image: "/img/photos-2026-06/faculty-group.jpg", imagePosition: "top" as const,
      },
      {
        title: "Human excellence at the heart of every classroom",
        href: "/human-excellence",
        eyebrow: "Pedagogy",
        image: "/img/home/about-sssgs/human-excellence.jpg",
      },
      {
        title: "Character development, threaded through daily life",
        href: "/character-development",
        eyebrow: "Character",
        image: "/img/photos-2026-06/home-character-values-2.jpg",
      },
    ],
    extras: [
      { title: "Values integration & academics", href: "/values-integration-academics", eyebrow: "Pillar", image: "/img/photos-2026-06/about-values-integration.jpg" },
      { title: "Parent community at SSSGS",      href: "/parent-community",             eyebrow: "Community", image: "/img/featuredBlock/parent-community.jpg" },
      { title: "Read the parent–student handbook", href: "/parent-student-handbook",    eyebrow: "Handbook",  image: "/img/featuredBlock/parent-student-handbook.jpg" },
      { title: "FAQs from prospective families",  href: "/faqs",                         eyebrow: "FAQ",       image: "/img/home/about-sssgs/faqs.jpg", imagePosition: "top" as const },
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
        "Concept-led teaching, foundational skills, and age-appropriate progression across primary and middle school — designed for continuity through CBSE, ICSE, Cambridge, IB or local-curriculum transfers.",
      image: "/img/featuredBlock/ncert-aligned-integrated-hands-on.jpg",
    },
    satellites: [
      {
        title: "Courses offered across primary and middle school",
        href: "/courses-offered",
        eyebrow: "Courses",
        image: "/img/featuredBlock/courses-offered.jpg",
      },
      {
        title: "Academic pathway",
        href: "/academic-pathway",
        eyebrow: "Pathway",
        image: "/img/featuredBlock/academic-pathway.jpg",
      },
      {
        title: "Assessment structure: formative and summative",
        href: "/assessment-structure",
        eyebrow: "Assessment",
        image: "/img/featuredBlock/academic-assessment-structure.jpg",
      },
      {
        title: "Learning labs — science, maths, language, English, ICT",
        href: "/learning-labs",
        eyebrow: "Labs",
        image: "/img/featuredBlock/science-lab.jpg",
      },
    ],
    extras: [
      { title: "Technology & LMS for parents and students", href: "/technology-lms",            eyebrow: "Tech",       image: "/img/featuredBlock/technology-lms.jpg" },
      { title: "Student support & enrichment",              href: "/student-support",           eyebrow: "Support",    image: "/img/featuredBlock/student-support.jpg" },
      { title: "Co-curricular activities (CCA)",            href: "/cca",                       eyebrow: "CCA",        image: "/img/featuredBlock/co-curricular-activities.jpg" },
      { title: "Phonics, Abacus, Vedic Maths & Olympiad",   href: "/enrichment-activities",     eyebrow: "Enrichment", image: "/img/featuredBlock/enrichment-activities.jpg" },
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
      image: "/img/featuredBlock/science-lab.jpg",
    },
    satellites: [
      {
        title: "Maths Lab: visualise, model, prove",
        href: "/maths-lab",
        eyebrow: "Maths",
        image: "/img/featuredBlock/maths-lab.jpg",
      },
      {
        title: "Language Lab: read, write, listen, speak",
        href: "/language-lab",
        eyebrow: "Language",
        image: "/img/photos-2026-06/tamil-lab.jpg",
      },
      {
        title: "English Lab: Cambridge & CEFR-aligned",
        href: "/english-lab",
        eyebrow: "English",
        image: "/img/featuredBlock/english-lab.jpg",
      },
      {
        title: "ICT Lab: digital literacy from Grade 1",
        href: "/ict-lab",
        eyebrow: "ICT",
        image: "/img/featuredBlock/ict-lab.jpg",
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
      image: "/img/featuredBlock/school-day-blocks.jpg",
    },
    satellites: [
      {
        title: "Facilities: built for safe, focused learning",
        href: "/facilities",
        eyebrow: "Facilities",
        image: "/img/featuredBlock/facilities.jpg",
      },
      {
        title: "SSSGS spaces — classrooms, labs, library",
        href: "/sssgs-spaces",
        eyebrow: "Spaces",
        image: "/img/home/campus-life/sssgs-spaces.jpg",
      },
      {
        title: "Co-curricular activities & clubs",
        href: "/cca",
        eyebrow: "CCA",
        image: "/img/featuredBlock/co-curricular-activities.jpg",
      },
      {
        title: "Uniform, transportation & daily logistics",
        href: "/school-uniform-and-transportation",
        eyebrow: "Daily Life",
        image: "/img/featuredBlock/practical-stuff-handled.jpg",
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
      image: "/img/home/admissions/admission-process.jpg",
    },
    satellites: [
      {
        title: "Entry requirements by grade",
        href: "/entry-requirements",
        eyebrow: "Requirements",
        image: "/img/home/admissions/entry-requirements.jpg",
      },
      {
        title: "Registration & documents",
        href: "/registration",
        eyebrow: "Register",
        image: "/img/home/admissions/entry-requirements.jpg",
      },
      {
        title: "Fee structure for primary and middle school",
        href: "/fee-structure",
        eyebrow: "Fees",
        image: "/img/home/admissions/fee-structure.jpg",
      },
      {
        title: "Open House — meet faculty in person",
        href: "/open-house",
        eyebrow: "Event",
        image: "/img/featuredBlock/open-house.jpg", imagePosition: "top" as const,
      },
    ],
    extras: [
      { title: "Refund policy & terms",        href: "/refund-policy",         eyebrow: "Policy",  image: "/img/home/admissions/refund-policy.jpg" },
      { title: "Inquire / book a campus tour", href: "/inquire-book-a-tour",   eyebrow: "Visit",   image: "/img/home/admissions/book-campus-tour.jpg" },
      { title: "FAQs from prospective parents", href: "/faqs",                 eyebrow: "FAQ",     image: "/img/home/admissions/admissions-faqs.jpg", imagePosition: "top" as const },
      { title: "Contact admissions",            href: "/contact-us",            eyebrow: "Contact", image: "/img/home/admissions/contact-admissions.jpg", imagePosition: "top" as const },
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
      image: "/img/featuredBlock/parent-student-handbook.jpg",
    },
    satellites: [
      {
        title: "School calendar 2026 & holiday list",
        href: "/calendar",
        eyebrow: "Calendar",
        image: "/img/featuredBlock/school-calendar.jpg",
      },
      {
        title: "FAQs from prospective parents",
        href: "/faqs",
        eyebrow: "FAQ",
        image: "/img/home/resources-for-parents/faqs.jpg", imagePosition: "top" as const,
      },
      {
        title: "Olympiad coaching for Grades 3–8",
        href: "/olympiad",
        eyebrow: "Olympiad",
        image: "/img/featuredBlock/enrichment-activities.jpg",
      },
      {
        title: "Phonics classes — early literacy",
        href: "/phonics-classes",
        eyebrow: "Phonics",
        image: "/img/home/resources-for-parents/phonics-classes.jpg",
      },
    ],
    extras: [
      { title: "Abacus & Vedic Maths classes",    href: "/abacus-vedic-maths",  eyebrow: "Maths",   image: "/img/home/resources-for-parents/abacus-vedic-maths.jpg" },
      { title: "Refund policy details",            href: "/refund-policy",       eyebrow: "Policy",  image: "/img/home/resources-for-parents/refund-policy.jpg" },
      { title: "Contact us anytime",               href: "/contact-us",          eyebrow: "Contact", image: "/img/home/resources-for-parents/contact-us.jpg", imagePosition: "top" as const },
      { title: "WhatsApp the admissions desk",     href: "https://wa.me/6580830971", eyebrow: "Chat", image: "/img/home/resources-for-parents/parent-student-handbook.jpg" },
    ],
  },
];
