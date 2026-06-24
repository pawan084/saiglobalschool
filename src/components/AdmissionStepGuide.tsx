"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

export type Step = {
  id: string;
  tag: string;
  title: string;
  duration: string;
  body: string;
  iconName: IconName;
  whatYouDo: string[];
  documents?: string[];
  whatWeDo: string[];
  cta?: { label: string; href: string };
};

export const ADMISSION_STEPS: Step[] = [
  {
    id: "inquire",
    tag: "Step 1 · Apply",
    title: "Send an inquiry",
    duration: "5 minutes",
    iconName: "document",
    body: "Tell us about your child. We respond within one business day with a personalised follow-up — not a templated reply.",
    whatYouDo: [
      "Fill the inquiry form online or visit the campus",
      "Share basic details about your child's age, grade and previous school",
      "Tell us your preferred way to be contacted",
    ],
    whatWeDo: [
      "An admissions officer reviews the inquiry personally",
      "We email or WhatsApp you back within one business day",
      "We share what's next based on your child's profile",
    ],
    cta: { label: "Start an inquiry", href: "/inquire-book-a-tour" },
  },
  {
    id: "tour",
    tag: "Step 2 · Visit",
    title: "Tour the campus",
    duration: "60–90 minutes",
    iconName: "school",
    body: "Walk through the labs, sit in on a class, meet teachers and current parents. The visit is tailored to your child's grade.",
    whatYouDo: [
      "Pick a slot that suits you — weekday or Saturday morning",
      "Bring your child along if you can",
      "Bring any questions about transition, support, or routine",
    ],
    whatWeDo: [
      "Tailor the tour to your child's grade and interests",
      "Introduce you to the homeroom teacher",
      "Walk you through curriculum, assessment and CCAs",
    ],
    cta: { label: "Book a tour slot", href: "/open-house" },
  },
  {
    id: "assessment",
    tag: "Step 3 · Assess",
    title: "Admission Test",
    duration: "60 minutes",
    iconName: "list-check",
    body: "A grade-appropriate assessment in English & Mathematics — the aim is to understand each child’s learning profile, not to filter them out.",
    whatYouDo: [
      "Schedule the assessment at a time that works",
      "Your child completes it on campus (or remotely where needed)",
      "No prep required — it's a snapshot, not an exam",
    ],
    whatWeDo: [
      "Mark the assessment with the academic team",
      "Map strengths and areas needing settling support",
      "Share results clearly with you",
    ],
  },
  {
    id: "confirmation",
    tag: "Step 4 · Confirm",
    title: "Admission confirmation",
    duration: "1–3 business days",
    iconName: "shield",
    body: "You receive confirmation of admission with grade placement, available section and start date.",
    whatYouDo: [
      "Review the offer details with your family",
      "Ask any final clarification questions",
      "Indicate intent to proceed",
    ],
    whatWeDo: [
      "Issue a written offer with grade, section and start date",
      "Share the fee schedule and payment options",
      "Reserve a seat while you complete documents",
    ],
  },
  {
    id: "documents",
    tag: "Step 5 · Documents",
    title: "Submit documents",
    duration: "Variable — typically a few days",
    iconName: "document",
    body: "Submit the documents needed for enrolment. The office guides you through the checklist with reminders.",
    whatYouDo: [
      "Gather the documents below and submit by email or in person",
      "Originals required for sighting at first day of school",
    ],
    documents: [
      "Student: Latest passport",
      "Student: Passport-size latest photograph",
      "Student: Birth certificate",
      "Student: NRIC/FIN for Dependent Pass, Long Term Visit Pass holder or re-entry permit if PR",
      "Student: Academic records and proof of promotion from previous school (Grade 2 onwards)",
      "Student: Transfer Certificate from previous school (Grade 2 onwards)",
      "Parent: Latest passport",
      "Parent: Passport-size latest photograph",
      "Parent: NRIC/FIN for Dependent Pass holder, Long Term Visit Pass holder or re-entry permit if PR",
    ],
    whatWeDo: [
      "Verify documents and request any missing items",
      "Keep records secure and confidential",
      "Confirm seat once documents are complete",
    ],
  },
  {
    id: "payment",
    tag: "Step 6 · Payment",
    title: "Pay & sign",
    duration: "Same day",
    iconName: "credit-card",
    body: "Pay the registration and applicable term fees per the published fee structure. Receipts issued within 10 working days; bank transfer, PayNow and online payment supported. Withdrawal requires 60 days written notice.",
    whatYouDo: [
      "Choose a payment method — bank transfer, PayNow, online card",
      "Sign the parent–school agreement",
      "Receive welcome pack with uniform and book lists",
    ],
    whatWeDo: [
      "Issue an official receipt within 10 working days",
      "Trigger your child's enrolment in our LMS",
      "Set up the homeroom teacher's introduction",
    ],
  },
];

export default function AdmissionStepGuide() {
  const [active, setActive] = useState(ADMISSION_STEPS[0].id);

  // ScrollSpy: highlight the step closest to the top of the viewport
  useEffect(() => {
    function onScroll() {
      let best = ADMISSION_STEPS[0].id;
      let bestTop = Infinity;
      for (const s of ADMISSION_STEPS) {
        const el = document.getElementById(`step-${s.id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 140 && top > -el.offsetHeight + 140 && Math.abs(top - 140) < Math.abs(bestTop)) {
          best = s.id;
          bestTop = Math.abs(top - 140);
        }
      }
      setActive(best);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12">
      {/* TOC */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[var(--brand-accent)] mb-2">
            Process
          </div>
          <ol className="space-y-1.5">
            {ADMISSION_STEPS.map((s, i) => {
              const sel = s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#step-${s.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                      sel
                        ? "bg-[var(--brand-navy)] text-white"
                        : "text-slate-600 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-navy)]"
                    }`}
                  >
                    <span
                      className={`grid place-items-center h-6 w-6 rounded-full text-[11px] font-bold ${
                        sel
                          ? "bg-white text-[var(--brand-navy)]"
                          : "bg-[var(--brand-primary-tint)] text-[var(--brand-primary-dark)]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-bold">{s.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 pt-4 border-t border-[var(--brand-rule)] text-[11.5px] text-slate-500">
            Most families complete the journey in <strong className="text-[var(--brand-navy)]">2–3 weeks</strong>.
          </div>
        </div>
      </aside>

      {/* Steps */}
      <div className="space-y-8">
        {ADMISSION_STEPS.map((s, i) => (
          <section
            key={s.id}
            id={`step-${s.id}`}
            className="scroll-mt-24 rounded-3xl bg-white border border-[var(--brand-rule)] p-6 lg:p-8"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <header className="flex items-start gap-4">
              <span
                className="grid place-items-center h-12 w-12 rounded-xl text-white shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
                }}
                aria-hidden
              >
                <Icon name={s.iconName} size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="news-eyebrow">{s.tag}</div>
                <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
                  {s.title}
                </h3>
                <div className="mt-1 inline-flex items-center gap-1.5 text-[11.5px] text-slate-500">
                  <Icon name="clock" size={11} />
                  {s.duration}
                </div>
              </div>
              <span className="font-mono text-[36px] font-bold text-[var(--brand-primary-tint)] leading-none hidden sm:block">
                0{i + 1}
              </span>
            </header>

            <p className="mt-4 text-[14.5px] text-slate-700 leading-relaxed">
              {s.body.replace(/&rsquo;/g, "'")}
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[var(--brand-cream)]/60 border border-[var(--brand-rule)] p-4">
                <div className="news-eyebrow">You do</div>
                <ul className="mt-1.5 space-y-1.5 text-[13px] text-slate-700">
                  {s.whatYouDo.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Icon name="check" size={11} className="mt-1 text-[var(--brand-primary)] shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white border border-[var(--brand-rule)] p-4">
                <div className="news-eyebrow">We do</div>
                <ul className="mt-1.5 space-y-1.5 text-[13px] text-slate-700">
                  {s.whatWeDo.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <Icon name="sparkle" size={11} className="mt-1 text-[var(--brand-accent)] shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {s.documents && s.documents.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl border border-[var(--brand-rule)] bg-white">
                <div className="news-eyebrow">Documents to prepare</div>
                <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-slate-700">
                  {s.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Icon name="document" size={11} className="mt-1 text-[var(--brand-primary)] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {s.cta && (
              <div className="mt-5">
                <Link href={s.cta.href} className="btn-primary !py-2 !px-4 text-[13px]">
                  {s.cta.label}
                  <Icon name="arrow-right" size={13} />
                </Link>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
