import { Suspense } from "react";
import FeeCalculator from "./FeeCalculator";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata = {
  title: "Fee calculator",
  description:
    "Estimate your annual outlay at SSSGS by grade and optional add-ons. Indicative only — please confirm with admissions.",
};

export default function Page() {
  return (
    <InnerPageShell
      slug="fee-structure"
      hero={{
        eyebrow: "Fees",
        title: "Estimate your annual outlay",
        lead: "Pick a grade, toggle optional add-ons, and switch currency. Numbers update live. Share or save the result.",
        breadcrumb: [
          { label: "Admissions", href: "/admissions" },
          { label: "Fee structure", href: "/fee-structure" },
          { label: "Calculator", href: "/fee-structure/calculator" },
        ],
      }}
      ctaTitle="Want a tailored quote?"
      ctaSubtitle="Send your estimate to admissions and we'll respond with a confirmed breakdown."
    >
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Fee structure", href: "/fee-structure" },
          { label: "Calculator", href: "/fee-structure/calculator" },
        ]}
      />
      <ContentSection flush>
        <Suspense fallback={<div className="h-96" />}>
          <FeeCalculator />
        </Suspense>
      </ContentSection>
    </InnerPageShell>
  );
}
