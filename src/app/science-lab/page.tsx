import LabPage from "@/components/LabPage";

export const metadata = {
  title: "Science Lab",
  description: "Hands-on experiments and structured enquiry in the SSSGS Science Lab.",
  alternates: { canonical: "/science-lab" },
};

export default function Page() {
  return (
    <LabPage slug="science-lab"
      subject="Science"
      href="/science-lab"
      hero={{
        title: "Science Lab — where curiosity meets evidence",
        lead: "Hands-on experiments and structured enquiry, followed by report writing in the practical lab notebook — children learn to think like scientists.",
        image: "/img/home/learning-labs/science-lab.jpg",
      }}
      quote={{ text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" }}
      pillars={[
        { iconName: "flask", title: "Think like scientists", body: "Students learn to build hypotheses, design experiments, gather evidence, and revise thinking." },
        { iconName: "eye", title: "Curiosity & observation", body: "Children are encouraged to ask 'why', observe carefully, compare results, and notice patterns." },
        { iconName: "flask", title: "Application-based", body: "Concepts learnt in class are applied in lab to deepen understanding." },
        { iconName: "document", title: "Report writing", body: "Every practical is followed by a structured write-up in the lab notebook — aim, method, observation and conclusion." },
      ]}
      whatYouSee={[
        "Students designing a fair test for plant growth",
        "Small teams measuring, recording, and graphing results",
        "Children explaining what they observed back to peers",
        "Practical lab notebooks with structured aim-method-observation-conclusion entries",
        "Connections drawn between lab work and real-world phenomena",
      ]}
      relatedLabs={[
        { label: "Maths Lab", href: "/maths-lab" },
        { label: "Tamil Lab", href: "/language-lab" },
        { label: "English Lab", href: "/english-lab" },
        { label: "ICT Lab", href: "/ict-lab" },
        { label: "All Learning Labs", href: "/learning-labs" },
      ]}
    />
  );
}
