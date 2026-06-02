import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["academic-pathway"];

export const metadata = {
  title: data.title,
  description: data.lead,
};

export default function Page() {
  return <SimpleContentPage slug="academic-pathway" data={data} />;
}
