import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["human-excellence"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/human-excellence" },
};

export default function Page() {
  return <SimpleContentPage slug="human-excellence" data={data} />;
}
