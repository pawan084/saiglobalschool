import LabPage from "@/components/LabPage";

export const metadata = {
  title: "Language Lab",
  description: "Read, speak, write with confidence — structured language learning at SSSGS.",
  alternates: { canonical: "/language-lab" },
};

export default function Page() {
  return (
    <LabPage slug="language-lab"
      subject="Language"
      href="/language-lab"
      hero={{
        title: "Language Lab — read, write, listen, speak",
        lead: "Four-skill language work across second and third languages — reading, writing, listening and speaking. Phonics, vocabulary, comprehension, public speaking and creative writing.",
        image: "/img/home/learning-labs/language-lab.jpg",
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
