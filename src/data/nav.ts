export type NavItem = { label: string; href: string; children?: NavItem[] };

/** Top-level nav. Section "index" pages are the React news-grid pages.
 *  Children are the original cloned detail pages, reachable at .html URLs. */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Management & Governance", href: "/management-governance" },
      { label: "Human Excellence", href: "/human-excellence" },
      { label: "Character Development", href: "/character-development" },
      { label: "Faculty", href: "/faculty" },
      { label: "Parent Community", href: "/parent-community" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/curriculum" },
      { label: "Courses Offered", href: "/courses-offered" },
      { label: "Academic Pathway", href: "/academic-pathway" },
      { label: "Assessment Structure", href: "/assessment-structure" },
      { label: "Learning Labs", href: "/learning-labs" },
      { label: "Co-Curricular Activities", href: "/cca" },
      { label: "Enrichment Activities", href: "/enrichment-activities" },
      { label: "Technology & LMS", href: "/technology-lms" },
      { label: "Student Support", href: "/student-support" },
      { label: "Values Integration", href: "/values-integration-academics" },
    ],
  },
  {
    label: "Campus",
    href: "/campus",
    children: [
      { label: "Facilities", href: "/facilities" },
      { label: "SSSGS Spaces", href: "/sssgs-spaces" },
      { label: "A Day at SSSGS", href: "/a-day-at-sssgs" },
      { label: "Campus Address", href: "/campus-address" },
      { label: "Uniform & Transport", href: "/school-uniform-and-transportation" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Process", href: "/admission-process" },
      { label: "Entry Requirements", href: "/entry-requirements" },
      { label: "Registration", href: "/registration" },
      { label: "Fee Structure", href: "/fee-structure" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Open House", href: "/open-house" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Calendar", href: "/calendar" },
      { label: "Parent-Student Handbook", href: "/parent-student-handbook" },
      { label: "FAQs", href: "/faqs" },
      { label: "Phonics Classes", href: "/phonics-classes" },
      { label: "Abacus & Vedic Maths", href: "/abacus-vedic-maths" },
      { label: "Olympiad", href: "/olympiad" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const ctaInquire = { label: "Inquire / Book a Tour", href: "/inquire-book-a-tour" };
export const ctaWhatsApp = { label: "WhatsApp Us", href: "https://wa.me/6580830971" };
