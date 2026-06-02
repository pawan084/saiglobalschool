import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import GradeFitQuiz from "./GradeFitQuiz";

export const metadata = {
  title: "Grade-fit quiz",
  description:
    "Quick 5-question quiz to suggest the most likely grade band for your child at SSSGS.",
};

export default function Page() {
  return (
    <InnerPageShell
      slug="resources"
      hero={{
        eyebrow: "Self-service",
        title: "Find the right grade",
        lead: "Five quick questions. We'll suggest the grade band that typically fits — and the next step.",
        breadcrumb: [
          { label: "Resources", href: "/resources" },
          { label: "Grade-fit quiz", href: "/grade-fit" },
        ],
      }}
      ctaTitle="Want a second opinion?"
      ctaSubtitle="Send us a quick note and we'll loop in a teacher familiar with that grade band."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Grade-fit quiz", href: "/grade-fit" },
        ]}
      />
      <ContentSection flush>
        <GradeFitQuiz />
      </ContentSection>
    </InnerPageShell>
  );
}
