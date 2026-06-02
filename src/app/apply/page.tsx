import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ExitIntentCapture from "@/components/ExitIntentCapture";
import ApplyWizard from "./ApplyWizard";

export const metadata = {
  title: "Apply now",
  description:
    "Apply for admission to Sri Sathya Sai Global School. A short, multi-step form — save and resume on this device anytime.",
};

export default function Page() {
  return (
    <InnerPageShell
      slug="admissions"
      hero={{
        eyebrow: "Admissions",
        title: "Apply now",
        lead: "A short, five-step application. You can save your progress at any time and resume later on this device.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Apply", href: "/apply" },
        ],
      }}
      ctaTitle="Prefer to chat first?"
      ctaSubtitle="WhatsApp our admissions team — we'll guide you through the next step."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Apply", href: "/apply" },
        ]}
      />
      <ContentSection flush>
        <ApplyWizard />
      </ContentSection>
      <ExitIntentCapture />
    </InnerPageShell>
  );
}
