import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["technology-lms"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/technology-lms" },
};

export default function Page() {
  return <SimpleContentPage slug="technology-lms" data={data} />;
}
