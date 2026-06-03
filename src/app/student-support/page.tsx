import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["student-support"];

export const metadata = {
  title: data.title,
  description: data.lead,
  alternates: { canonical: "/student-support" },
};

export default function Page() {
  return <SimpleContentPage slug="student-support" data={data} />;
}
