import Image from "next/image";
import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import FeatureGrid from "@/components/FeatureGrid";

export const metadata = {
  title: "Facilities",
  description: "Built for safe, focused learning — overview of SSSGS facilities.",
  alternates: { canonical: "/facilities" },
};

const facilities = [
  { iconName: "lock", title: "Safety first", body: "Secure campus access, CCTV-monitored common areas, trained staff and emergency procedures in place." },
  { iconName: "school", title: "Well-equipped classrooms", body: "Smart boards, adequate lighting and ventilation, age-appropriate furniture across grade levels." },
  { iconName: "flask", title: "Specialist labs", body: "Dedicated labs for science, mathematics, language and ICT — well-stocked with materials and instruments." },
  { iconName: "leaf", title: "Nutritional support", body: "Lunch and snack facilities; nutritional standards aligned with what growing children need." },
  { iconName: "shield", title: "On-site care", body: "Trained first-aid responders and a quiet care room for children who feel unwell." },
  { iconName: "map-pin", title: "Transport options", body: "School transport routes available; uniform and transport details on the dedicated page." },
];

export default function Page() {
  return (
    <InnerPageShell
      slug="facilities"
      hero={{
        eyebrow: "Campus",
        title: "Facilities built for safe, focused learning",
        lead: "Every facility at SSSGS is designed to support the wellbeing and learning of every child — from classrooms and labs to safety and care.",
        breadcrumb: [
          { label: "Campus", href: "/campus" },
          { label: "Facilities", href: "/facilities" },
        ],
      }}
    >
      <ContentSection flush>
        <div className="relative aspect-[16/8] rounded-md overflow-hidden">
          <Image
            src="/img/navbar/campus/facilities/school-facilities.jpg"
            alt="SSSGS school building"
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="What we have" title="Facilities at SSSGS">
        <FeatureGrid items={facilities} cols={3} />
      </ContentSection>
    </InnerPageShell>
  );
}
