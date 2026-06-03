import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["character-development"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/character-development" },
};

export default function Page() {
  return <SimpleContentPage slug="character-development" data={data} />;
}
