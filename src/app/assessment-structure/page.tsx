import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["assessment-structure"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/assessment-structure" },
};

export default function Page() {
  return <SimpleContentPage slug="assessment-structure" data={data} />;
}
