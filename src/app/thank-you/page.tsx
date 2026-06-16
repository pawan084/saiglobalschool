import Link from "next/link";
import Icon from "@/components/Icon";
import ThankYouTracking from "@/components/ThankYouTracking";
import { site } from "@/data/site";
import { ctaWhatsApp } from "@/data/nav";

export const metadata = {
  title: "Thank You",
  description: "Thank you for contacting Sri Sathya Sai Global School.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams?: Promise<{
    ref?: string;
    source?: string;
  }>;
};

function sourceLabel(source?: string) {
  if (source === "contact") return "message";
  if (source === "inquire") return "admission inquiry";
  if (source === "event-rsvp") return "event RSVP";
  return "submission";
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const ref = params?.ref;
  const label = sourceLabel(params?.source);

  return (
    <main className="min-h-[70vh] bg-[var(--brand-mist)]">
      <ThankYouTracking reference={ref} source={params?.source} />
      <section className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
        <div className="rounded-2xl border border-[var(--brand-rule)] bg-white p-6 text-center shadow-sm lg:p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-primary)] text-white">
            <Icon name="check" size={24} />
          </div>
          <p className="news-eyebrow mt-6">Thank you</p>
          <h1 className="news-headline mt-2 text-3xl font-extrabold tracking-tight text-[var(--brand-navy)] lg:text-4xl">
            We received your {label}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-700">
            Our admissions team will review your details and reply within one business day.
            For urgent questions, call or WhatsApp us directly.
          </p>

          {ref && (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-rule)] bg-[var(--brand-cream)] px-4 py-2 text-[13px]">
              <span className="font-bold text-slate-500">Reference</span>
              <span className="font-mono font-extrabold text-[var(--brand-navy)]">{ref}</span>
            </div>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="btn-secondary justify-center">
              Call {site.phone}
            </a>
            <a href={ctaWhatsApp.href} className="btn-secondary justify-center" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            <Link href="/" className="btn-primary justify-center">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
