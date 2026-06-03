import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["values-integration-academics"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/values-integration-academics" },
};

export default function Page() {
  return <SimpleContentPage slug="values-integration-academics" data={data} />;
}
