import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import NewsCard from "@/components/NewsCard";

const labs = [
  { title: "Science Lab — curiosity meets evidence", href: "/science-lab", eyebrow: "Science", image: "/img/labs-science.jpg", lead: "Hands-on experiments, structured enquiry, evidence-led thinking." },
  { title: "Language Lab — read, speak, write", href: "/language-lab", eyebrow: "Language", image: "/img/lab-english_jpg.jpg", lead: "Phonics, vocabulary, fluency, public speaking and writing." },
  { title: "Maths Lab — visualise, model, prove", href: "/maths-lab", eyebrow: "Maths", image: "/img/lab-maths1_jpg.jpg", lead: "Manipulatives, models and reasoning aloud across the math curriculum." },
  { title: "ICT Lab — digital literacy from Grade 1", href: "/ict-lab", eyebrow: "ICT", image: "/img/lsp07302_jpg.jpg", lead: "Typing, online safety, productivity tools and computational thinking." },
];

export const metadata = {
  title: "Learning Labs",
  description: "Four learning labs at SSSGS — Language, Science, Maths and ICT — where children apply, build and explore.",
  alternates: { canonical: "/learning-labs" },
};

export default function Page() {
  return (
    <InnerPageShell
      slug="learning-labs"
      hero={{
        eyebrow: "Academics",
        title: "Learning Labs at SSSGS",
        lead: "Four dedicated labs where children move from passive learning to active doing — language, science, mathematics and ICT.",
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Learning Labs", href: "/learning-labs" },
        ],
      }}
      ctaTitle="See the labs in person"
      ctaSubtitle="Open House and campus tours include lab visits."
    >
      <ContentSection flush eyebrow="The four labs" title="Where learning gets hands-on">
        <div className="grid sm:grid-cols-2 gap-5">
          {labs.map((l) => (
            <NewsCard key={l.href} {...l} variant="feature" />
          ))}
        </div>
      </ContentSection>

      <ContentSection flush tone="cream" eyebrow="Why labs work" title="Application beats memorisation">
        <div className="text-slate-700 leading-relaxed space-y-3 text-[15px]">
          <p>
            Each lab gives children a regular, structured chance to apply what they&rsquo;ve learnt in the classroom — to make, build, observe, debate or model. Concepts stop being abstract and start being theirs.
          </p>
          <p>
            Lab sessions are timetabled — not optional, not occasional. They&rsquo;re where the curriculum comes alive.
          </p>
        </div>
      </ContentSection>
    </InnerPageShell>
  );
}
