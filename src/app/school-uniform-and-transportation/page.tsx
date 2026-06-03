import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["school-uniform-and-transportation"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/school-uniform-and-transportation" },
};

export default function Page() {
  return <SimpleContentPage slug="school-uniform-and-transportation" data={data} />;
}
