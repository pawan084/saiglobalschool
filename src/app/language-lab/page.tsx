import LabPage from "@/components/LabPage";

export const metadata = {
  title: "Tamil Lab",
  description: "Tamil read, write, listen and speak — four-skill Tamil instruction at SSSGS.",
  alternates: { canonical: "/language-lab" },
};

export default function Page() {
  return (
    <LabPage slug="language-lab"
      subject="Tamil"
      href="/language-lab"
      hero={{
        title: "Tamil Lab — read, write, listen, speak",
        lead: "Four-skill Tamil instruction — reading, writing, listening and speaking. Phonics, vocabulary, comprehension, public speaking and creative writing for SSSGS's second language.",
        image: "/img/photos-2026-06/tamil-lab.jpg",
      }}
      quote={{ text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" }}
      pillars={[
        { iconName: "book-open", title: "Read with fluency", body: "Phonics foundations, decoding strategies and structured reading aloud." },
        { iconName: "document", title: "Write with clarity", body: "Sentence construction, paragraphing, and longer-form writing across genres." },
        { iconName: "eye", title: "Listen for meaning", body: "Comprehension of spoken language across registers, accents and contexts." },
        { iconName: "chat", title: "Speak with poise", body: "Daily speaking practice in small groups, structured debates and presentations." },
      ]}
      whatYouSee={[
        "Phonics drills with rhythm and movement",
        "Children reading aloud in small groups and giving each other feedback",
        "Vocabulary games and word-building activities",
        "Listening comprehension exercises with discussion",
        "Short writing pieces shared and discussed",
      ]}
      relatedLabs={[
        { label: "English Lab", href: "/english-lab" },
        { label: "Science Lab", href: "/science-lab" },
        { label: "Maths Lab", href: "/maths-lab" },
        { label: "ICT Lab", href: "/ict-lab" },
        { label: "All Learning Labs", href: "/learning-labs" },
      ]}
    />
  );
}
