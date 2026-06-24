import InnerPageShell from "@/components/InnerPageShell";
import ContentSection from "@/components/ContentSection";
import NewsCard from "@/components/NewsCard";

const labs = [
  { title: "Science Lab — curiosity meets evidence", href: "/science-lab", eyebrow: "Science", image: "/img/featuredBlock/science-lab.jpg", lead: "Hands-on experiments and structured enquiry, followed by report writing in the practical lab notebook." },
  { title: "Maths Lab — visualise, model, prove", href: "/maths-lab", eyebrow: "Maths", image: "/img/featuredBlock/maths-lab.jpg", lead: "Manipulatives, models and reasoning aloud across the Maths curriculum." },
  { title: "Language Lab — read, write, listen, speak", href: "/language-lab", eyebrow: "Language", image: "/img/photos-2026-06/tamil-lab.jpg", lead: "Four-skill language work across second and third languages — reading, writing, listening and speaking." },
  { title: "English Lab — Cambridge & CEFR-aligned", href: "/english-lab", eyebrow: "English", image: "/img/featuredBlock/english-lab.jpg", lead: "NCERT plus CEFR-aligned English — reading, writing, listening and speaking, with Cambridge-level instruction." },
  { title: "Social Science Lab — explore people, places and the world", href: "/social-science-lab", eyebrow: "Social Science", image: "/img/featuredBlock/social-science-lab.jpg", lead: "Maps, timelines, globes and inquiry activities to understand history, geography, civics and society." },
  { title: "ICT Lab — digital literacy from Grade 1", href: "/ict-lab", eyebrow: "ICT", image: "/img/featuredBlock/ict-lab.jpg", lead: "Typing, online safety, productivity tools and computational thinking." },
];

export const metadata = {
  title: "Learning Labs",
  description: "Six learning labs at SSSGS — Science, Maths, Language, English, Social Science and ICT — where children apply, build and explore.",
  alternates: { canonical: "/learning-labs" },
};

export default function Page() {
  return (
    <InnerPageShell
      slug="learning-labs"
      hero={{
        eyebrow: "Academics",
        title: "Learning Labs at SSSGS",
        lead: "Six dedicated labs where children move from passive learning to active doing — Science, Mathematics, English, Language, Social Science and ICT.",
        breadcrumb: [
          { label: "Academics", href: "/academics" },
          { label: "Learning Labs", href: "/learning-labs" },
        ],
      }}
      ctaTitle="See the labs in person"
      ctaSubtitle="Open House and campus tours include lab visits."
    >
      <ContentSection flush eyebrow="The six labs" title="Where learning gets hands-on">
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
