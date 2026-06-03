import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["courses-offered"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/courses-offered" },
};

export default function Page() {
  return <SimpleContentPage slug="courses-offered" data={data} />;
}
