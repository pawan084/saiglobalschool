import SimpleContentPage from "@/components/SimpleContentPage";
import { simplePages } from "@/data/simplePages";

const data = simplePages["olympiad"];

export const metadata = {
  title: data.title,
  description: data.lead,
};

export default function Page() {
  return <SimpleContentPage slug="olympiad" data={data} />;
}
