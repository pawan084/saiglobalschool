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

// 2026-06-12: faculty bios refreshed from the supplied faculty bio document.
// Soumalini Chattopadhyay and Mary Dimple are included without portraits until
// the school supplies their image files.
export const FACULTY: FacultyMember[] = [
  {
    slug: "mausumi-mukherjee",
    name: "Mausumi Mukherjee",
    role: "Principal",
    image: "/img/faculty/mausumi-mukherjee.jpg",
    short: "Three decades of teaching maths and leading schools across Singapore and India.",
    qualifications: [
      "M.Sc.",
      "B.Ed.",
      "30+ years of teaching and school leadership experience",
    ],
    bio: [
      "Mausumi leads the school's academic vision, curriculum rigour, teaching quality, assessment standards, and student outcomes, drawing on global best practices such as Cambridge-style depth, IB-style inquiry, competency-based education, and NEP 2020-aligned learning to ensure every child progresses with clarity, care, and confidence.",
    ],
    teaches: ["Leads academics — Grades 1-8", "Mathematics — Grades 6-8"],
    quote: "We don't just teach subjects — we teach children. Each one comes with a different story; the work is to meet them where they are.",
  },
  {
    slug: "pousali-bhattacharya",
    name: "Pousali Bhattacharya",
    role: "Head of School",
    image: "/img/faculty/pousali-bhattacharya.jpg",
    short: "Three decades of teaching, school coordination, student support, and daily school operations across Singapore and India.",
    qualifications: [
      "B.Sc.",
      "Cambridge International Certificate in Teaching & Learning",
      "Diploma in Teaching English to Speakers of Other Languages, London Teacher Training College",
      "30+ years of teaching, coordination, and school operations experience",
    ],
    bio: [
      "Pousali leads the school operation: daily functioning, student welfare, safety, discipline, infrastructure readiness, parent coordination, and operational compliance, drawing on her experience across Cambridge, ICSE, Montessori, assessment monitoring, and school coordination to ensure a smooth, safe, and caring learning environment for every child.",
    ],
    teaches: ["Leads smooth daily operations, safety and discipline", "Science — Primary and Secondary Grades"],
    quote: "Every child learns best in a school that feels safe, structured, and caring. Our role is to create that environment every single day.",
  },
  {
    slug: "amrita-ghosal",
    name: "Amrita Ghosal",
    role: "International Curriculum and Pedagogy Director",
    image: "/img/faculty/amrita-ghosal.jpg",
    short: "18 years of teaching higher grade science, coordinating board exams, and strengthening international curriculum practices across Singapore and India.",
    qualifications: [
      "M.Sc.",
      "B.Ed.",
      "18+ years of teaching and academic coordination experience",
    ],
    bio: [
      "Amrita guides the school's international curriculum, pedagogy, science teaching and learning, assessment processes, and teacher development, drawing on IGCSE, ICSE and CLSP experience, EduTrust audit participation, exam coordination, and data-led student support to ensure every child learns with clarity, confidence, and curiosity.",
    ],
    teaches: ["International Curriculum & Pedagogy — Grades 1-8"],
    quote: "Good teaching is not only about completing the syllabus — it is about helping every child understand, question, and grow with confidence.",
  },
  {
    slug: "moumita-mazumdar",
    name: "Moumita Mazumdar",
    role: "Admissions & School Operations Lead",
    role: "Admissions & School Operations Lead",
    image: "/img/faculty/moumita-mazumdar.jpg",
    short: "15+ years of teaching, parent coordination, early years education, and school operations across Singapore and India.",
    qualifications: [
      "M.Com.",
      "15+ years of teaching, admissions support, and school coordination experience",
    ],
    bio: [
      "Moumita supports the school's admissions, parent communication, and daily coordination, drawing on her experience across Singapore and India in early years, primary teaching, curriculum planning, student engagement, and school events to ensure every family receives a smooth, caring, and well-guided school experience.",
    ],
    teaches: ["Admissions, parent coordination, and school transport support"],
    quote: "Every family's journey into a school should feel clear, warm, and reassuring. Our role is to guide them with care from the very first conversation.",
  },
  {
    slug: "soumalini-chattopadhyay",
    name: "Soumalini Chattopadhyay",
    role: "Curriculum Planner — Social Science & Value Education",
    image: "/img/faculty/soumalini-chattopadhyay.jpg",
    short: "20+ years of teaching, social science, curriculum planning, and value education across Singapore, India and Australia.",
    qualifications: [
      "M.Sc.",
      "20+ years of teaching and curriculum planning experience",
    ],
    bio: [
      "Soumalini supports the school's Social Science curriculum planning, lesson design, classroom learning, assessment readiness, and student progress, drawing on her experience in Geography, Social Science, Montessori methods, curriculum development, bridge-course teaching, and differentiated classroom practices to make learning structured, engaging, and meaningful for every child.",
    ],
    teaches: ["Social Science Curriculum Planning — Grades 3-8", "Value Education Planning — Grades 6-8"],
    quote: "Social Science helps children understand people, places, and the world around them. Our role is to make that learning thoughtful, connected, and alive.",
  },
  {
    slug: "neena-gupta",
    name: "Neena Gupta",
    role: "Second Language HOD & Lab Coordinator",
    role: "Second Language HOD & Lab Coordinator",
    image: "/img/faculty/neena-gupta.jpg",
    short: "Two decades of teaching Hindi, language learning, value education, and student enrichment across Singapore and India.",
    qualifications: [
      "B.Ed.",
      "Cambridge International Certificate in Teaching & Learning",
      "20+ years of teaching and language coordination experience",
    ],
    bio: [
      "Neena leads the school's second language teaching and learning, lab coordination, and procurement. Drawing on her experience in Hindi instruction, bilingual teaching, curriculum implementation, examination support, classroom management, and cultural activities, she helps children learn with confidence, discipline, and joyful participation.",
    ],
    teaches: ["Second Language and Lab Coordination — Grades 1-8"],
    quote: "Language learning is not only about words — it is about confidence, culture, expression, and helping children connect with the world around them.",
  },
  {
    slug: "uma-balachandar",
    name: "Uma Balachandar",
    role: "English & Social Studies Teacher",
    image: "/img/faculty/uma-balachandar.jpg",
    short: "Experienced in English teaching, social science, and holistic child development across Singapore and India.",
    qualifications: [
      "Master's in Political Science",
      "Diploma in Learning Disorders Management & Child Psychology",
      "Experienced in primary teaching, differentiated instruction, and student support",
    ],
    bio: [
      "Uma supports the school's English and Social Science teaching and learning, classroom engagement, and values-based education, drawing on her experience in primary and secondary teaching, lesson planning, project-based learning, assessments, and child psychology to help every child learn with confidence, curiosity, and care.",
    ],
    teaches: ["English & Social Science — Primary and Secondary Grades"],
    quote: "Children learn best when the classroom feels safe, engaging, and meaningful. Our role is to guide them with patience, values, and encouragement every day.",
  },
  {
    slug: "thangammal-marappan",
    name: "Thangammal Marappan",
    role: "Language Teacher",
    image: "/img/faculty/thangammal-marappan.jpg",
    short: "Experienced in Tamil language teaching, classroom instruction, student engagement, and technology-supported learning in Singapore.",
    qualifications: [
      "Master of Computer Science",
      "MOE IRS Registered",
      "Experienced in language teaching, classroom management, and student support",
    ],
    bio: [
      "Thangammal supports the school's Tamil language teaching and learning, classroom engagement, and student progress tracking, drawing on her experience in Tamil teaching, interactive classroom methods, assessments, coding exposure, and student-centred instruction to help children learn with confidence, curiosity, and discipline.",
    ],
    teaches: ["Tamil Language — Grades 1-8", "ICT — Grades 3-5"],
    quote: "Language learning becomes meaningful when children feel encouraged to speak, think, and express themselves with confidence every day.",
  },
  {
    slug: "prasanthi-siram",
    name: "Prasanthi Siram",
    role: "Primary Teacher",
    image: "/img/faculty/prasanthi-siram.jpg",
    short: "15+ years of values education, student care, spoken English mentoring, and chess training in international school across Singapore.",
    qualifications: [
      "B.A. English Literature",
      "FIDE National Instructor (Fédération Internationale des Échecs)",
      "15+ years of student support, CCA, and values-based education experience",
    ],
    bio: [
      "Prasanthi supports the school's primary teaching and learning, classroom care, student welfare, homework guidance, spoken English development, and enrichment activities, drawing on her experience in student care, Education in Human Values, chess coaching, parent communication, and multilingual student support to help children grow with confidence, discipline, and character.",
    ],
    teaches: ["Primary Section", "Values Education — Grades 1-5"],
    quote: "A child's growth is not only academic — it is built through discipline, confidence, values, and patient guidance every day.",
  },
  {
    slug: "sharmila-banu",
    name: "Sharmila Banu",
    role: "Primary Teacher",
    image: "/img/faculty/sharmila-banu.jpg",
    short: "9+ years of primary teaching, inclusive education, early literacy, and inquiry-based learning across IB-PYP, Cambridge and MOE settings.",
    qualifications: [
      "B.A.",
      "PGCE (Primary with International Qualified Teacher Status)",
      "Diploma in Special Needs Education",
      "9+ years of teaching, inclusion, and student support experience",
    ],
    bio: [
      "Sharmila supports the school's primary teaching and learning, classroom engagement, literacy development, differentiated instruction, student wellbeing, and parent communication, drawing on her experience in IB-PYP, Cambridge Primary, SEN, EAL, phonics, CPA mathematics, inquiry-based learning, and assessment for learning to help every child grow with confidence and care.",
    ],
    teaches: ["Primary Section — Grades 1-5"],
    quote: "Every child can learn when the classroom is structured, inclusive, and encouraging. Our role is to support each learner with patience, clarity, and care.",
  },
  {
    slug: "akanksha-agarwal",
    name: "Akanksha Agarwal",
    role: "Mathematics & Science Teacher",
    image: "/img/faculty/akanksha-agarwal.jpg",
    short: "15+ years of teaching Mathematics, Science, Hindi language, and student support across Singapore and India.",
    qualifications: [
      "M.Sc.",
      "B.Ed.",
      "15+ years of teaching, assessment, and curriculum support experience",
    ],
    bio: [
      "Akanksha supports the school's Mathematics and Science teaching and learning, classroom engagement, assessment preparation, and curriculum support, drawing on her experience in MOE syllabus, Cambridge curriculum, activity-based learning, examination coordination, and structured lesson planning to help children build strong concepts with confidence and curiosity.",
    ],
    teaches: ["Mathematics & Science — Primary and Secondary Grades"],
    quote: "Learning becomes meaningful when children understand the concept, not just the answer. Our role is to make every lesson clear, practical, and confidence-building.",
  },
  {
    slug: "debsoma-pramanik",
    name: "Debsoma Pramanik",
    role: "Social Science & English Teacher",
    image: "/img/faculty/debsoma-pramanik.jpg",
    short: "Extensive experience in English, Social Science, humanities teaching and learning, and student-centred teaching across Singapore and India.",
    qualifications: [
      "M.A.",
      "B.Ed.",
      "Experienced in teaching, assessment, humanities coordination, and student engagement",
    ],
    bio: [
      "Debsoma supports the school's higher English and Social Science teaching and learning, classroom engagement, critical thinking, assessment design, and student communication skills, drawing on her experience in CBSE, international school environments, humanities coordination, MUN activities, debate, educational technology, and differentiated instruction to help children learn with confidence, expression, and analytical thinking.",
    ],
    teaches: ["English & Social Science — Secondary Grades"],
    quote: "Learning becomes powerful when students are encouraged to think, speak, question, and express themselves with confidence.",
  },
  {
    slug: "ganesh-srinivasan",
    name: "Ganesh Srinivasan",
    role: "Information and Communication Technology",
    image: "/img/faculty/ganesh-srinivasan.jpg",
    short: "5+ years of technology, research, engineering, clean energy, materials science, and digital tools experience across Singapore.",
    qualifications: [
      "M.Eng.",
      "Experienced in technology, programming, data analysis, research, and applied innovation",
    ],
    bio: [
      "Ganesh supports the school's ICT learning, digital literacy, technology integration, problem-solving, and hands-on STEM exposure, drawing on his experience in Python, MATLAB, AutoCAD, research, prototyping, data analysis, and clean technology projects to help children build confidence with technology and future-ready thinking.",
    ],
    teaches: ["Information & Communication Technology — Grades 6-8"],
    quote: "Technology becomes meaningful when children use it to think, create, solve problems, and understand the world around them.",
  },
  {
    slug: "mary-dimple",
    name: "Mary Dimple",
    role: "English & French Teacher",
    short: "10+ years of teaching, French language instruction, early years education, and student engagement across Singapore.",
    qualifications: [
      "Diploma in Applied Psychology",
      "French Language Proficiency",
      "10+ years of teaching and classroom support experience",
    ],
    bio: [
      "Mary supports the school's English, French language teaching and learning, classroom engagement, communication skills, cultural understanding, and student confidence, drawing on her experience in French education, lesson planning, exam preparation, storytelling, role play, mindfulness activities, and personalised learning to make language learning enjoyable, accessible, and meaningful for every child.",
    ],
    teaches: ["English Language — Grades 1-5", "French Language — Grades 1-8"],
    quote: "Language learning becomes joyful when children feel confident to speak, express, and explore a new culture with curiosity.",
  },
];
