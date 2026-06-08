export type SubjectId =
  | "english"
  | "second-language"
  | "third-language"
  | "mathematics"
  | "science"
  | "social-studies"
  | "ict"
  | "values"
  | "arts";

export type Band = {
  band: "Grades 1–2" | "Grades 3–5" | "Grades 6–8";
  label: "Foundations" | "Build" | "Depth";
  outcomes: string[];
};

export type Subject = {
  id: SubjectId;
  name: string;
  icon: "book-open" | "calculator" | "flask" | "globe" | "monitor" | "heart" | "palette";
  blurb: string;
  intro: string;
  bands: Band[];
  notes: string[];
};

export const SUBJECTS: Subject[] = [
  {
    id: "english",
    name: "English",
    icon: "book-open",
    blurb: "Reading, writing, listening and speaking — four-skill English from foundations to depth.",
    intro:
      "English is the medium of instruction at SSSGS. Across the grades, students move from phonics-based reading to literary analysis and persuasive writing, with structured oral and presentation work along the way.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Phonics-based decoding of unfamiliar words",
          "Sight-word fluency to 200+ words",
          "Sentence-level writing with capitalisation and punctuation",
          "Listening for meaning in short passages",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Multi-paragraph writing in narrative and descriptive forms",
          "Reading novels and articles with comprehension questions",
          "Grammar — tenses, parts of speech, sentence patterns",
          "Vocabulary growth via context and root-word study",
          "Oral presentations of 2–3 minutes",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Persuasive and analytical essays with thesis and evidence",
          "Literary analysis — character, theme, narrative structure",
          "Public speaking and structured debate",
          "Editing and peer review against a rubric",
          "Research writing with citation",
        ],
      },
    ],
    notes: [
      "Supported by the English Lab with NCERT plus CEFR-aligned instruction across all grades.",
      "Phonics enrichment available for Grades 1–5 as an after-school option.",
    ],
  },
  {
    id: "second-language",
    name: "Second Language",
    icon: "book-open",
    blurb: "Four-skill instruction in a second language across all grade bands.",
    intro:
      "Students take a second language alongside English from Grade 1, with reading, writing, listening and speaking developed in parallel as the years progress.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Letter-sound recognition and simple vocabulary",
          "Greetings, names and everyday phrases",
          "Songs, rhymes and movement-based learning",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Reading short passages with comprehension",
          "Sentence-level writing on familiar topics",
          "Listening to short stories and audio prompts",
          "Conversational speaking in pairs and small groups",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Reading longer texts across genres",
          "Structured paragraph and essay writing",
          "Listening to news and discussion segments",
          "Presentations and structured oral exchanges",
        ],
      },
    ],
    notes: [
      "Supported by the Language Lab for the four-skill component.",
    ],
  },
  {
    id: "third-language",
    name: "Third Language",
    icon: "book-open",
    blurb: "Optional third language — exposure-led in early years, building toward functional fluency.",
    intro:
      "An additional language option offered alongside English and the second language — exposure-led through songs and stories in early grades, building toward reading, writing, listening and speaking by Grade 8.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Introduced as exposure through songs and stories (where offered).",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Letter-sound recognition and core vocabulary",
          "Simple sentence reading and writing",
          "Conversational greetings and everyday exchanges",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Short-form reading and writing across familiar topics",
          "Listening comprehension of everyday audio",
          "Speaking with confidence on familiar themes",
        ],
      },
    ],
    notes: [
      "Choice of third language depends on offerings each academic year.",
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "calculator",
    blurb: "Number sense, problem solving, and conceptual depth.",
    intro:
      "We teach mathematics for understanding — concrete to pictorial to abstract — with consistent emphasis on problem solving and explaining reasoning.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Counting, place value, number bonds to 100",
          "Addition and subtraction with regrouping",
          "Time, money, length, mass — basic measurement",
          "Shapes, patterns and simple data tables",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Multiplication and division to ÷10",
          "Fractions, decimals and percentages — converting between",
          "Geometry — angles, perimeter, area, volume basics",
          "Bar graphs, line graphs, simple probability",
          "Multi-step word problems with structured working",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Algebra — equations, inequalities, simple polynomials",
          "Ratio and proportion in real contexts",
          "Mensuration, coordinate geometry, basic trigonometry",
          "Statistics — mean, median, mode, standard graphs",
          "Heuristic problem solving and proof writing",
        ],
      },
    ],
    notes: [
      "Maths Lab gives weekly hands-on application of new concepts.",
      "Abacus and Vedic Maths available as enrichment for Grades 1–5.",
      "Olympiad coaching tracks ready students for external competitions.",
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: "flask",
    blurb: "Hands-on inquiry across physics, chemistry and biology.",
    intro:
      "Science at SSSGS is inquiry-led — students observe, hypothesise, measure and conclude. From Grade 3 onwards, lab periods are scheduled to anchor every unit in physical experience.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Living vs non-living, basic body parts and senses",
          "Weather, seasons, simple sky-watching",
          "Materials around us — sort and describe",
          "Care of plants, animals and the environment",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Plant and animal life cycles, simple food chains",
          "States of matter, simple chemical changes",
          "Forces, motion, simple machines",
          "Solar system overview",
          "Designing fair-test experiments",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Cell structure, human body systems",
          "Atoms, molecules, periodic table introduction",
          "Newton's laws, electricity and magnetism basics",
          "Earth systems and ecosystems",
          "Laboratory technique, hazard awareness, scientific writing",
        ],
      },
    ],
    notes: [
      "Science Lab is timetabled for every grade from Grade 3.",
      "Annual Science Fair showcases projects from Grade 6 upward.",
    ],
  },
  {
    id: "social-studies",
    name: "Social Studies",
    icon: "globe",
    blurb: "History, geography, civics — building world-aware learners.",
    intro:
      "Social Studies builds a child's sense of place, time and citizenship — through stories, maps, primary sources and structured discussion.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Family, school and neighbourhood",
          "Singapore — basic geography, festivals and people",
          "Simple historical timelines (own life, family)",
          "Map skills — directions and symbols",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Singapore history overview",
          "World regions, climate zones, population basics",
          "Ancient civilisations introduction",
          "Civic responsibilities and public services",
          "Reading and interpreting timelines and primary sources",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Modern world history — major movements and turning points",
          "Economic concepts — supply, demand, basic finance",
          "Government structures and the United Nations",
          "Geography — physical processes, sustainability",
          "Research projects with primary and secondary sources",
        ],
      },
    ],
    notes: [
      "Integrates with the Values programme around fairness, peace and responsibility.",
    ],
  },
  {
    id: "ict",
    name: "Information and Communication Technology",
    icon: "monitor",
    blurb: "Digital literacy, safety and computational thinking.",
    intro:
      "From typing fluency in Grade 1 to text-based coding by Grade 7, ICT at SSSGS produces confident, responsible digital citizens.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Typing posture, basic file management",
          "Productivity tools — simple documents and slides",
          "Internet safety — what to share, what not to",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Touch typing fluency",
          "Block-based coding — Scratch, simple games",
          "Spreadsheets — formulas, charts",
          "Online safety — passwords, privacy, digital footprint",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Text-based coding — Python introduction",
          "HTML/CSS basics for web pages",
          "Digital ethics, AI literacy, plagiarism awareness",
          "Multimedia projects — video, audio, image editing",
        ],
      },
    ],
    notes: [
      "ICT Lab is timetabled across all grades.",
      "Devices are managed and content-filtered for safety.",
    ],
  },
  {
    id: "values",
    name: "Values Education",
    icon: "heart",
    blurb: "Sathya · Dharma · Shanti · Prema · Ahimsa, woven into daily life.",
    intro:
      "Values education is not a separate subject — it’s a way every subject is taught. The five values frame classroom culture, peer interaction and reflection.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Honesty, kindness, sharing — daily classroom routines",
          "Stories from cultures around the world",
          "Simple gratitude and reflection practices",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Personal responsibility, friendship, conflict resolution",
          "Community service projects",
          "Mindfulness and quiet-time practices",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Ethics, fairness, peer mediation",
          "Service learning — leading and reflecting on impact",
          "Sustainability and global citizenship",
        ],
      },
    ],
    notes: [
      "Values are embedded across English, Social Studies and morning circle.",
      "Open House visitors typically join a quiet-time session.",
    ],
  },
  {
    id: "arts",
    name: "Arts & Music",
    icon: "palette",
    blurb: "Drawing, painting, music, drama — every child finds an outlet.",
    intro:
      "Arts and music are timetabled weekly across all grades. We focus on expression and craft, with regular small-scale exhibitions and performances.",
    bands: [
      {
        band: "Grades 1–2",
        label: "Foundations",
        outcomes: [
          "Colour, line, shape — drawing and painting basics",
          "Singing, rhythm, basic percussion",
          "Movement and simple drama games",
        ],
      },
      {
        band: "Grades 3–5",
        label: "Build",
        outcomes: [
          "Composition, perspective, mixed media",
          "Recorder or keyboard — reading basic notation",
          "Group drama with simple scripts",
        ],
      },
      {
        band: "Grades 6–8",
        label: "Depth",
        outcomes: [
          "Studio-style projects with critique",
          "Choir, ensemble or instrument specialisation",
          "Stagecraft, lighting, set design for Annual Day",
        ],
      },
    ],
    notes: [
      "Annual Day at SSSGS showcases work across art, music and drama.",
    ],
  },
];
