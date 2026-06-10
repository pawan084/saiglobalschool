import LabPage from "@/components/LabPage";

export const metadata = {
  title: "Maths Lab",
  description: "Visualise, model, prove — the SSSGS Maths Lab makes abstract concepts tangible.",
  alternates: { canonical: "/maths-lab" },
};

export default function Page() {
  return (
    <LabPage slug="maths-lab"
      subject="Maths"
      href="/maths-lab"
      hero={{
        title: "Maths Lab — visualise, model, prove",
        lead: "Concrete manipulatives, visual models, and problem-led exploration make mathematics tangible — children build intuition before they automate.",
        image: "/img/photos-2026-06/maths-lab.jpg",
      }}
      quote={{ text: "Mathematics is not about numbers, equations, computations, or algorithms — it's about understanding.", author: "William Paul Thurston" }}
      pillars={[
        { iconName: "puzzle", title: "Visual & concrete", body: "Manipulatives and visual models let children see the maths before abstracting it." },
        { iconName: "lightbulb", title: "Problem-led", body: "Lessons start with a problem to solve, not a formula to memorise." },
        { iconName: "rotate", title: "Reasoning aloud", body: "Children explain their thinking — peer-to-peer discussion deepens understanding." },
      ]}
      whatYouSee={[
        "Children using blocks, fraction bars or geo-boards to model concepts",
        "Group problem-solving with shared whiteboards",
        "Students explaining how they arrived at an answer",
        "Real-world maths: budgeting, measuring, scaling, building",
      ]}
    />
  );
}
