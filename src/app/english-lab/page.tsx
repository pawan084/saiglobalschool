import LabPage from "@/components/LabPage";

export const metadata = {
  title: "English Lab",
  description: "NCERT plus CEFR-aligned English at SSSGS — reading, writing, listening and speaking, with Cambridge-level instruction.",
  alternates: { canonical: "/english-lab" },
};

export default function Page() {
  return (
    <LabPage slug="english-lab"
      subject="English"
      href="/english-lab"
      hero={{
        title: "English Lab — Cambridge-level reading, writing, listening and speaking",
        lead: "Four-skill English built on NCERT and enhanced by the Common European Framework of Reference for Languages (CEFR) for all grades — an international standard that measures English proficiency across six levels, from absolute beginner (A1) to fluent native (C2).",
        image: "/img/home/learning-labs/language-lab.jpg",
      }}
      quote={{ text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" }}
      pillars={[
        { iconName: "book-open", title: "Reading", body: "Phonics foundations, decoding strategies and structured reading across genres." },
        { iconName: "document", title: "Writing", body: "Sentence-level work through to multi-paragraph essays with clarity and structure." },
        { iconName: "eye", title: "Listening", body: "Comprehension of spoken English across accents, contexts and registers." },
        { iconName: "chat", title: "Speaking", body: "Daily speaking practice, structured debates and presentations." },
      ]}
      whatYouSee={[
        "Cambridge-aligned reading and comprehension drills",
        "Listening exercises spanning CEFR A1 to C2 contexts",
        "Children presenting and giving structured peer feedback",
        "Writing portfolios reviewed against CEFR descriptors",
      ]}
      relatedLabs={[
        { label: "Language Lab", href: "/language-lab" },
        { label: "Science Lab", href: "/science-lab" },
        { label: "Maths Lab", href: "/maths-lab" },
        { label: "ICT Lab", href: "/ict-lab" },
        { label: "All Learning Labs", href: "/learning-labs" },
      ]}
    />
  );
}
