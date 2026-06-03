import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["management-governance"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/management-governance" },
};

export default function Page() {
  return <SimpleContentPage slug="management-governance" data={data} />;
}
