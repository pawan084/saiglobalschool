import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["abacus-vedic-maths"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/abacus-vedic-maths" },
};

export default function Page() {
  return <SimpleContentPage slug="abacus-vedic-maths" data={data} />;
}
