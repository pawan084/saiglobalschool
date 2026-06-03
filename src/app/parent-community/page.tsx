import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["parent-community"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/parent-community" },
};

export default function Page() {
  return <SimpleContentPage slug="parent-community" data={data} />;
}
