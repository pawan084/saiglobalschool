import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["non-academic"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/non-academic" },
};

export default function Page() {
  return <SimpleContentPage slug="non-academic" data={data} />;
}
