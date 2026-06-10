import type { SimplePage } from "@/components/SimpleContentPage";

const academicsCrumb = { label: "Academics", href: "/academics" };
const aboutCrumb = { label: "About", href: "/about-us" };
const campusCrumb = { label: "Campus", href: "/campus" };
const resourcesCrumb = { label: "Resources", href: "/resources" };

export const simplePages: Record<string, SimplePage> = {
  "academic-pathway": {
    eyebrow: "Academics",
    title: "Academic Pathway",
    lead: "A structured academic pathway that takes children from foundational learning in the primary years through to confident, exam-ready learners by the end of middle school.",
    breadcrumb: [academicsCrumb, { label: "Academic Pathway", href: "/academic-pathway" }],
    intro: [
      "The SSSGS academic pathway is built around clear, age-appropriate progression. Each grade builds on the last with structured content, formative assessment and reinforcement through lab and applied work.",
      "Children moving between schools or curricula receive personalised onboarding so academic continuity is preserved.",
    ],
    features: {
      sectionTitle: "Pathway by grade band",
      items: [
        { icon: "1", title: "Grades 1–2 — Foundations", body: "English, mathematics, environmental studies, second language, ICT and arts — subject-led teaching with foundational reading, numeracy and classroom routines." },
        { icon: "2", title: "Grades 3–5 — Build", body: "Concept building across English, Second & Third Language, Maths, Science, Social Studies and ICT." },
        { icon: "3", title: "Grades 6–8 — Depth", body: "Application, projects, lab work and synthesis across subjects." },
      ],
      cols: 3,
    },
    followUp: {
      sectionTitle: "How progression is supported",
      body: [
        "Regular formative checkpoints, teacher feedback and parent updates keep students and families informed.",
        "Specialised support — including settling-in help and enrichment — is woven into the pathway, not bolted on.",
      ],
      links: [
        { label: "Curriculum", href: "/curriculum" },
        { label: "Assessment", href: "/assessment-structure" },
        { label: "Student Support", href: "/student-support" },
      ],
    },
  },

  "assessment-structure": {
    eyebrow: "Academics",
    title: "Assessment Structure",
    lead: "Assessment at SSSGS is for learning, not just of learning. A blend of formative and summative checks keeps progress visible to students, teachers and parents.",
    breadcrumb: [academicsCrumb, { label: "Assessment Structure", href: "/assessment-structure" }],
    intro: [
      "We use multiple types of assessment because no single test captures a child's learning. The goal is always to understand what the child knows, what they need next, and how we can support them.",
    ],
    features: {
      sectionTitle: "Types of assessment",
      items: [
        { iconName: "check", title: "Daily formative checks", body: "Quick in-class checks help teachers adjust instruction in the moment." },
        { iconName: "document", title: "Weekly reviews", body: "Short reviews consolidate learning and identify misconceptions." },
        { iconName: "target", title: "Term assessments", body: "Structured assessments at term boundaries give a holistic picture of progress." },
        { iconName: "chat", title: "Oral & project work", body: "Speaking, presentations and projects assess skills written tests miss." },
      ],
      cols: 2,
      tone: "cream",
    },
    followUp: {
      sectionTitle: "Reporting & feedback",
      body: [
        "Parents receive structured reports each term, plus informal updates as needed. Parent-teacher meetings give space to discuss progress and next steps.",
      ],
      links: [{ label: "Academic Pathway", href: "/academic-pathway" }, { label: "Curriculum", href: "/curriculum" }],
    },
  },

  "courses-offered": {
    eyebrow: "Academics",
    title: "Courses Offered",
    lead: "Subjects across primary and middle school — academic core plus arts, physical education, value education and ICT.",
    breadcrumb: [academicsCrumb, { label: "Courses Offered", href: "/courses-offered" }],
    intro: [
      "The academic core runs through every grade, widening from foundational literacy and numeracy in the early years to specialised subject teaching by middle school.",
      "Alongside the core, every child takes the arts, physical education, ICT and value education each week — so the timetable develops the whole child, not a narrow set of subjects.",
    ],
    features: {
      sectionTitle: "Subjects across grades",
      items: [
        { iconName: "book-open", title: "English", body: "Medium of instruction. Four-skill English — reading, writing, listening and speaking — supported by the English Lab with CEFR alignment." },
        { iconName: "book-open", title: "Second Language", body: "Reading, writing, listening and speaking across Grades 3–8." },
        { iconName: "book-open", title: "Third Language", body: "Optional third language for higher grade bands; choice depends on yearly offerings." },
        { iconName: "calculator", title: "Mathematics", body: "Foundations through pre-algebra and geometry across the grade range." },
        { iconName: "flask", title: "Science / EVS", body: "Environmental Studies in primary; Science branches in middle school." },
        { iconName: "globe", title: "Social Studies", body: "History, geography and civics with critical-thinking emphasis." },
        { iconName: "monitor", title: "Information and Communication Technology", body: "Digital literacy from Grade 1, including online safety and computational thinking." },
        { iconName: "palette", title: "Art & Music", body: "Visual arts, music and performing arts in every grade." },
        { iconName: "play", title: "Physical Education", body: "Movement, sport and yoga integrated weekly." },
        { iconName: "sparkle", title: "Value Education", body: "Daily moments and dedicated sessions for character work." },
        { iconName: "compass", title: "Skill Development", body: "Hands-on skill-building modules complement the academic core." },
      ],
      cols: 3,
    },
  },

  "character-development": {
    eyebrow: "About SSSGS",
    title: "Character Development at SSSGS",
    lead: "Character is not a class — it's the way the whole school runs. Daily routines, conversations, conflict, and reflection all shape who a child becomes.",
    breadcrumb: [aboutCrumb, { label: "Character Development", href: "/character-development" }],
    intro: [
      "Bhagawan Sri Sathya Sai Baba taught that the end of education is character. SSSGS takes that seriously — character development sits alongside academic learning in every grade, every day.",
    ],
    features: {
      sectionTitle: "The daily mechanisms",
      items: [
        { iconName: "sparkle", title: "Morning circle", body: "Each day starts with a thought, an intention and a brief reflection." },
        { iconName: "chat", title: "Reflective conversations", body: "Teachers help children make sense of what happened — celebrations and conflicts both." },
        { iconName: "handshake", title: "Restorative practice", body: "Discipline focuses on repair and learning rather than punishment." },
        { iconName: "palette", title: "Stories & role models", body: "Stories from across traditions ground values in narrative." },
      ],
      cols: 2,
      tone: "cream",
    },
    followUp: {
      links: [
        { label: "Vision & Mission", href: "/vision-mission" },
        { label: "Human Excellence", href: "/human-excellence" },
        { label: "Values & Academics", href: "/values-integration-academics" },
      ],
      body: ["Character work is most powerful when it shapes the whole school day, not just an isolated lesson. See how values integrate with academics for the bigger picture."],
    },
  },

  "human-excellence": {
    eyebrow: "About SSSGS",
    title: "Human Excellence",
    lead: "Pursuing excellence in being human — competence, character, and contribution. The SSSGS pedagogy puts these on equal footing.",
    breadcrumb: [aboutCrumb, { label: "Human Excellence", href: "/human-excellence" }],
    intro: [
      "Human excellence is more than academic achievement. It's the daily practice of being a thoughtful, capable, contributing person — the kind of person any community is glad to count.",
    ],
    features: {
      sectionTitle: "The three commitments",
      items: [
        { iconName: "lightbulb", title: "Competence", body: "Mastery of the academic core, applied across real situations." },
        { iconName: "heart", title: "Character", body: "Honesty, courage, empathy, restraint, and gratitude as habits." },
        { iconName: "leaf", title: "Contribution", body: "A disposition to serve — at home, in school, in the community." },
      ],
      cols: 3,
    },
  },

  "values-integration-academics": {
    eyebrow: "About SSSGS",
    title: "Values Integration with Academics",
    lead: "Values aren't an extra subject. They're integrated into the way every subject is taught — English, Language, Maths, Science, Social Studies, ICT, PE and the Arts.",
    breadcrumb: [aboutCrumb, { label: "Values & Academics", href: "/values-integration-academics" }],
    features: {
      sectionTitle: "How integration works",
      items: [
        { iconName: "book-open", title: "In English", body: "Story selection, discussion questions and writing prompts surface values naturally." },
        { iconName: "book-open", title: "In Language", body: "Second and third language work draws on cultural stories that anchor values." },
        { iconName: "calculator", title: "In Maths", body: "Honest effort, peer support and reasoning aloud are built into the practice." },
        { iconName: "flask", title: "In Science", body: "Ethics, environment and responsibility framed alongside content." },
        { iconName: "globe", title: "In Social Studies", body: "Empathy for context, fairness, and multiple perspectives." },
        { iconName: "monitor", title: "In ICT", body: "Digital citizenship, online ethics and respectful conduct in shared spaces." },
        { iconName: "play", title: "In PE", body: "Teamwork, fair play, persistence and respect through group activities." },
        { iconName: "palette", title: "In the arts", body: "Self-expression, listening to peers and care for shared materials." },
      ],
      cols: 4,
      tone: "cream",
    },
  },

  "management-governance": {
    eyebrow: "About SSSGS",
    title: "Management & Governance",
    lead: "Transparent, parent-aligned governance — clear roles, regular communication, and an accountable structure.",
    breadcrumb: [aboutCrumb, { label: "Management & Governance", href: "/management-governance" }],
    intro: [
      "SSSGS operates with a clear governance structure: a board responsible for direction and oversight, a leadership team running the school day-to-day, and parent communication channels for input and questions.",
    ],
    features: {
      sectionTitle: "How it's structured",
      items: [
        { iconName: "school", title: "Board", body: "Sets long-term direction, monitors institutional health and ensures accountability." },
        { iconName: "users", title: "School leadership", body: "Principal and senior team run the academic and operational day-to-day." },
        { iconName: "users", title: "Parent voice", body: "Channels for parent input — formal meetings and informal check-ins." },
      ],
      cols: 3,
    },
  },

  "parent-community": {
    eyebrow: "About SSSGS",
    title: "Parent Community",
    lead: "An active parent community that supports the school, supports each other, and supports children growing up.",
    breadcrumb: [aboutCrumb, { label: "Parent Community", href: "/parent-community" }],
    features: {
      sectionTitle: "How parents engage",
      items: [
        { iconName: "calendar", title: "Regular meetings", body: "Term-wise PTM (parent-teacher meetings) plus topic-specific sessions." },
        { iconName: "chat", title: "Communication", body: "Email, app and WhatsApp groups keep families informed and connected." },
        { icon: "🎉", title: "Events & celebrations", body: "Annual day, sports day, cultural events — parents are a core part of school life." },
      ],
      cols: 3,
      tone: "cream",
    },
  },

  "student-support": {
    eyebrow: "Academics",
    title: "Student Support",
    lead: "Every child needs different support at different times. SSSGS provides academic, social and emotional support woven into the school day.",
    breadcrumb: [academicsCrumb, { label: "Student Support", href: "/student-support" }],
    intro: [
      "Support at SSSGS is proactive rather than reactive — homeroom teachers know each child well enough to notice when something changes and step in early.",
      "Academic, pastoral and wellbeing support work together, so a child who needs help in one area is supported across the others too.",
    ],
    features: {
      sectionTitle: "Layers of support",
      items: [
        { iconName: "document", title: "Academic", body: "Targeted help for children working on specific skills or catching up after transitions." },
        { iconName: "handshake", title: "Pastoral", body: "Homeroom teachers and counsellors as the first line of support for every child." },
        { icon: "🧘", title: "Wellbeing", body: "Mindfulness practices, conversations about difficulty, and quiet time when needed." },
      ],
      cols: 3,
    },
  },

  "technology-lms": {
    eyebrow: "Academics",
    title: "Technology & LMS",
    lead: "Technology that helps parents and students stay informed — homework, results, schedules and communication in one place.",
    breadcrumb: [academicsCrumb, { label: "Technology & LMS", href: "/technology-lms" }],
    features: {
      sectionTitle: "What the LMS supports",
      items: [
        { iconName: "calendar", title: "Schedule & attendance", body: "Daily timetable and attendance visible to parents in real time." },
        { iconName: "book-open", title: "Homework & resources", body: "Assignments posted, materials shared, deadlines tracked." },
        { iconName: "trending-up", title: "Assessment results", body: "Progress reports and formative results available throughout the term." },
        { iconName: "chat", title: "Parent–teacher channel", body: "A direct line to homeroom teachers and subject leads." },
      ],
      cols: 2,
    },
  },

  "enrichment-activities": {
    eyebrow: "Academics",
    title: "Enrichment Activities",
    lead: "Programmes that go beyond the core curriculum — Phonics classes, Abacus and Vedic Maths, Olympiad coaching, and more.",
    breadcrumb: [academicsCrumb, { label: "Enrichment", href: "/enrichment-activities" }],
    intro: [
      "Enrichment programmes run alongside the regular timetable, giving children a structured way to go deeper in areas that interest them or need extra attention.",
      "Most run in small groups after school hours, each with its own teaching team, so they complement classroom learning rather than competing with it.",
    ],
    features: {
      sectionTitle: "Programmes available",
      items: [
        { iconName: "book-open", title: "Phonics Classes", body: "Structured early-literacy programme for foundational reading." },
        { iconName: "calculator", title: "Abacus & Vedic Maths", body: "Mental-maths acceleration through Abacus and Vedic techniques." },
        { iconName: "trophy", title: "Olympiad Coaching", body: "Subject-specific Olympiad preparation for Grades 3–8." },
        { iconName: "palette", title: "Creative & performing arts", body: "Extended arts programmes across visual, music and dance." },
      ],
      cols: 2,
      tone: "cream",
    },
    followUp: {
      links: [
        { label: "Phonics Classes", href: "/phonics-classes" },
        { label: "Abacus & Vedic Maths", href: "/abacus-vedic-maths" },
        { label: "Olympiad", href: "/olympiad" },
      ],
      body: ["Each enrichment programme runs alongside the core curriculum, with its own teaching team and outcomes."],
    },
  },

  "phonics-classes": {
    eyebrow: "Enrichment",
    title: "Phonics Classes",
    lead: "Structured early-literacy programme — children build the foundation for fluent, confident reading.",
    breadcrumb: [resourcesCrumb, { label: "Phonics", href: "/phonics-classes" }],
    features: {
      sectionTitle: "Phonics at SSSGS",
      items: [
        { iconName: "book-open", title: "Phoneme awareness", body: "Hearing and discriminating the sounds that make up words." },
        { iconName: "book-open", title: "Decoding", body: "Mapping sounds to letters, blending and segmenting to read and spell." },
        { iconName: "chat", title: "Fluency", body: "Reading aloud with expression and at appropriate pace." },
      ],
      cols: 3,
    },
  },

  "abacus-vedic-maths": {
    eyebrow: "Enrichment",
    title: "Abacus & Vedic Maths",
    lead: "Mental-maths acceleration through Abacus practice and Vedic techniques — children develop speed, accuracy and confidence with numbers.",
    breadcrumb: [resourcesCrumb, { label: "Abacus & Vedic Maths", href: "/abacus-vedic-maths" }],
    intro: [
      "Children begin on the physical abacus and gradually move to visualising the beads, so they can calculate large sums mentally. Alongside this, Vedic techniques give them quick, pattern-based shortcuts for multiplication, division and more.",
      "Sessions run in small groups after school, graded by ability rather than age, so each child is challenged at the right level and builds genuine number fluency over time.",
    ],
    features: {
      sectionTitle: "Why it works",
      items: [
        { icon: "⚡", title: "Mental computation", body: "Structured practice builds neural pathways for fast arithmetic." },
        { iconName: "target", title: "Confidence with numbers", body: "Children stop fearing maths when they feel competent." },
        { iconName: "lightbulb", title: "Cross-subject benefit", body: "Number sense supports problem-solving in science and beyond." },
      ],
      cols: 3,
    },
  },

  "olympiad": {
    eyebrow: "Enrichment",
    title: "Olympiad Coaching",
    lead: "Subject-specific Olympiad preparation for Grades 3–8 — Maths, Science and English. Held after school hours, not during regular class time.",
    breadcrumb: [resourcesCrumb, { label: "Olympiad", href: "/olympiad" }],
    features: {
      sectionTitle: "How coaching works",
      items: [
        { iconName: "calculator", title: "Maths Olympiad", body: "Problem-solving techniques beyond the regular curriculum." },
        { iconName: "flask", title: "Science Olympiad", body: "Conceptual depth and tricky application questions." },
        { iconName: "book-open", title: "English Olympiad", body: "Vocabulary, comprehension and grammar at depth." },
      ],
      cols: 3,
    },
  },

  "non-academic": {
    eyebrow: "Campus Life",
    title: "Non-Academic Activities",
    lead: "Beyond the classroom — sport, arts, community service and the spaces where children grow as people.",
    breadcrumb: [campusCrumb, { label: "Non-Academic", href: "/non-academic" }],
    intro: [
      "Some of the most important learning happens outside the academic timetable — on the field, on stage, and in service to others.",
      "These activities give every child a place to discover strengths, build friendships and practise the values the school teaches.",
    ],
    features: {
      sectionTitle: "Areas of activity",
      items: [
        { iconName: "palette", title: "Arts & culture", body: "Visual arts, music, dance, drama and creative writing." },
        { iconName: "play", title: "Sport & movement", body: "Team sports, yoga, athletics and free play." },
        { iconName: "handshake", title: "Community service", body: "Age-appropriate service projects and reflective conversations about them." },
      ],
      cols: 3,
    },
  },

  "school-uniform-and-transportation": {
    eyebrow: "Campus",
    title: "Uniform & Transportation",
    lead: "Practical details — uniform requirements, where to obtain them, and the school transport routes available.",
    breadcrumb: [campusCrumb, { label: "Uniform & Transport", href: "/school-uniform-and-transportation" }],
    intro: [
      "This page covers the everyday practicalities families ask about most — what children wear, where to buy it, and how they get to and from school.",
      "Uniform and transport are arranged separately from tuition, and the school office can help you sort out both before term begins.",
    ],
    features: {
      sectionTitle: "What to expect",
      items: [
        { icon: "👕", title: "Uniform", body: "Standard school uniform required for all students. Details and supplier info shared at registration." },
        { icon: "🎽", title: "PE uniform", body: "Separate PE kit for sports days; same supplier and ordering process." },
        { iconName: "map-pin", title: "Transport routes", body: "School transport serves many parts of Singapore; office can advise availability for your area." },
        { iconName: "credit-card", title: "Fees & logistics", body: "Uniform and transport are billed separately from tuition — see the fee structure for details." },
      ],
      cols: 2,
    },
  },
};
