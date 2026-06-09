export type SearchEntry = {
  title: string;
  href: string;
  section: string;
  tags: string;
};

export const searchIndex: SearchEntry[] = [
  // Top-level
  { title: "Home", href: "/", section: "Main", tags: "home overview" },
  { title: "Inquire / Book a Tour", href: "/inquire-book-a-tour", section: "Admissions", tags: "tour visit book inquiry contact form" },
  { title: "Apply now", href: "/apply", section: "Admissions", tags: "application form admission" },
  { title: "Open House", href: "/open-house", section: "Admissions", tags: "open house event visit" },
  { title: "Admissions", href: "/admissions", section: "Admissions", tags: "admit join enrol enrolment" },
  { title: "Admission Process", href: "/admission-process", section: "Admissions", tags: "process steps how to apply" },
  { title: "Entry Requirements", href: "/entry-requirements", section: "Admissions", tags: "criteria eligibility" },
  { title: "Registration", href: "/registration", section: "Admissions", tags: "register enrol" },
  { title: "Fee Structure", href: "/fee-structure", section: "Admissions", tags: "fees tuition cost price grade" },
  { title: "Fee Calculator", href: "/fee-structure/calculator", section: "Admissions", tags: "estimate calculate fees price total" },
  { title: "Refund Policy", href: "/refund-policy", section: "Admissions", tags: "refund cancellation" },

  { title: "About Us", href: "/about-us", section: "About", tags: "school sssgs intro" },
  { title: "Vision & Mission", href: "/vision-mission", section: "About", tags: "vision mission values" },
  { title: "Management & Governance", href: "/management-governance", section: "About", tags: "leadership board principal" },
  { title: "Human Excellence", href: "/human-excellence", section: "About", tags: "values five human excellence" },
  { title: "Character Development", href: "/character-development", section: "About", tags: "character moral values" },
  { title: "Faculty", href: "/faculty", section: "About", tags: "teachers staff educators" },
  { title: "Parent Community", href: "/parent-community", section: "About", tags: "parents community ptm" },

  { title: "Academics", href: "/academics", section: "Academics", tags: "academic learning study subjects" },
  { title: "Curriculum", href: "/curriculum", section: "Academics", tags: "curriculum cbse ncert subjects" },
  { title: "Curriculum comparison", href: "/curriculum/comparison", section: "Academics", tags: "compare ncert cbse icse ib international school" },
  { title: "Courses Offered", href: "/courses-offered", section: "Academics", tags: "courses subjects grades" },
  { title: "Academic Pathway", href: "/academic-pathway", section: "Academics", tags: "pathway primary middle school progression" },
  { title: "Assessment Structure", href: "/assessment-structure", section: "Academics", tags: "assessment exam evaluation grading" },
  { title: "Learning Labs", href: "/learning-labs", section: "Academics", tags: "labs lab learning experiential" },
  { title: "ICT Lab", href: "/ict-lab", section: "Academics", tags: "computer coding ict information communication technology lab" },
  { title: "Tamil Lab", href: "/language-lab", section: "Academics", tags: "tamil second language reading writing listening speaking lab" },
  { title: "English Lab", href: "/english-lab", section: "Academics", tags: "english cambridge cefr reading writing listening speaking lab" },
  { title: "Maths Lab", href: "/maths-lab", section: "Academics", tags: "math mathematics lab" },
  { title: "Science Lab", href: "/science-lab", section: "Academics", tags: "science physics chemistry biology lab" },
  { title: "Co-Curricular Activities", href: "/cca", section: "Academics", tags: "cca sports music dance arts" },
  { title: "Enrichment Activities", href: "/enrichment-activities", section: "Academics", tags: "enrichment after school" },
  { title: "Technology & LMS", href: "/technology-lms", section: "Academics", tags: "lms technology learning management system" },
  { title: "Student Support", href: "/student-support", section: "Academics", tags: "counsellor support special needs" },
  { title: "Values Integration", href: "/values-integration-academics", section: "Academics", tags: "values integration academics" },

  { title: "Campus", href: "/campus", section: "Campus", tags: "campus facilities building" },
  { title: "Facilities", href: "/facilities", section: "Campus", tags: "facilities classrooms" },
  { title: "SSSGS Spaces", href: "/sssgs-spaces", section: "Campus", tags: "spaces rooms" },
  { title: "A Day at SSSGS", href: "/a-day-at-sssgs", section: "Campus", tags: "schedule routine timetable day in the life" },
  { title: "Campus Address", href: "/campus-address", section: "Campus", tags: "address map directions location" },
  { title: "Uniform & Transport", href: "/school-uniform-and-transportation", section: "Campus", tags: "uniform bus transport" },
  { title: "Non-Academic Activities", href: "/non-academic", section: "Campus", tags: "non academic activities" },

  { title: "Calendar", href: "/calendar", section: "Resources", tags: "calendar schedule term dates" },
  { title: "News", href: "/news", section: "Resources", tags: "news updates blog stories" },
  { title: "Events", href: "/events", section: "Resources", tags: "events open house ptm sports day" },
  { title: "Parent-Student Handbook", href: "/parent-student-handbook", section: "Resources", tags: "handbook rules policies" },
  { title: "FAQs", href: "/faqs", section: "Resources", tags: "faq questions answers help" },
  { title: "Phonics Classes", href: "/phonics-classes", section: "Resources", tags: "phonics reading early years" },
  { title: "Abacus & Vedic Maths", href: "/abacus-vedic-maths", section: "Resources", tags: "abacus vedic maths" },
  { title: "Olympiad", href: "/olympiad", section: "Resources", tags: "olympiad competition" },
  { title: "Grade-fit quiz", href: "/grade-fit", section: "Resources", tags: "grade fit quiz which grade" },

  { title: "Contact Us", href: "/contact-us", section: "Main", tags: "contact email phone address" },
  { title: "Press kit", href: "/press", section: "Main", tags: "press media journalist logo brand" },
  { title: "Accreditation", href: "/accreditation", section: "Main", tags: "accreditation cpe edutrust certification" },

  { title: "Privacy Policy", href: "/privacy", section: "Legal", tags: "privacy data pdpa" },
  { title: "Terms of Use", href: "/terms", section: "Legal", tags: "terms conditions legal" },
  { title: "Cookie Policy", href: "/cookie-policy", section: "Legal", tags: "cookies tracking" },
];
