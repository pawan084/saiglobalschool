import LabPage from "@/components/LabPage";

export const metadata = {
  title: "ICT Lab",
  description: "Digital literacy from Grade 1 — typing, coding, online safety, and creative tools.",
};

export default function Page() {
  return (
    <LabPage slug="ict-lab"
      subject="ICT"
      href="/ict-lab"
      hero={{
        title: "ICT Lab — digital literacy from Grade 1",
        lead: "Typing fluency, online safety, productivity tools and an introduction to computational thinking — children become confident, responsible digital citizens.",
        image: "/img/school-ai-04.png",
      }}
      quote={{ text: "Everyone should learn to program a computer, because it teaches you how to think.", author: "Steve Jobs" }}
      pillars={[
        { iconName: "monitor", title: "Practical fluency", body: "Typing, file management, productivity tools — the digital skills children actually use." },
        { iconName: "lock", title: "Safety & ethics", body: "Online safety, digital footprint, plagiarism, and responsible behaviour as a foundation." },
        { iconName: "lightbulb", title: "Computational thinking", body: "Block-based then text-based coding builds problem-decomposition and pattern-recognition." },
      ]}
      whatYouSee={[
        "Students typing structured paragraphs with proper formatting",
        "Beginners building simple games in block-based coding",
        "Children discussing what to share online and what not to",
        "Older students using tools to research and present a topic",
      ]}
      relatedLabs={[
        { label: "Language Lab", href: "/language-lab" },
        { label: "Science Lab", href: "/science-lab" },
        { label: "Maths Lab", href: "/maths-lab" },
        { label: "All Learning Labs", href: "/learning-labs" },
      ]}
    />
  );
}
