import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["enrichment-activities"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/enrichment-activities" },
};

export default function Page() {
  return <SimpleContentPage slug="enrichment-activities" data={data} />;
}
