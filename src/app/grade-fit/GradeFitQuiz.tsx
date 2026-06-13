"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

type Choice = { label: string; gradeHint: number };
type Question = { id: string; q: string; help?: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    id: "age",
    q: "How old is your child today?",
    choices: [
      { label: "5–6 years", gradeHint: 1 },
      { label: "7–8 years", gradeHint: 3 },
      { label: "9–10 years", gradeHint: 5 },
      { label: "11–12 years", gradeHint: 7 },
      { label: "13+ years", gradeHint: 8 },
    ],
  },
  {
    id: "reading",
    q: "Reading comfort in English",
    help: "Roughly what your child reads independently.",
    choices: [
      { label: "Letters / very early phonics", gradeHint: 1 },
      { label: "Short stories with pictures", gradeHint: 2 },
      { label: "Chapter books", gradeHint: 4 },
      { label: "Novels, articles", gradeHint: 7 },
    ],
  },
  {
    id: "math",
    q: "Maths comfort level",
    choices: [
      { label: "Counting, simple addition", gradeHint: 1 },
      { label: "Multiplication, fractions intro", gradeHint: 3 },
      { label: "Decimals, percentages, geometry basics", gradeHint: 5 },
      { label: "Algebra, ratios", gradeHint: 7 },
    ],
  },
  {
    id: "previous",
    q: "Last completed grade (any system)",
    choices: [
      { label: "Kindergarten / pre-school", gradeHint: 1 },
      { label: "Grade 1 or 2", gradeHint: 3 },
      { label: "Grade 3 or 4", gradeHint: 5 },
      { label: "Grade 5 or 6", gradeHint: 7 },
      { label: "Grade 7 or 8", gradeHint: 8 },
    ],
  },
  {
    id: "intent",
    q: "When would you like to start?",
    choices: [
      { label: "ASAP / this term", gradeHint: 0 },
      { label: "Next term", gradeHint: 0 },
      { label: "Next academic year", gradeHint: 0 },
      { label: "Just exploring", gradeHint: 0 },
    ],
  },
];

function recommendedGrade(answers: Record<string, number>): { grade: number; band: "Primary" | "Secondary" } {
  const hints = Object.values(answers).filter((g) => g > 0);
  if (!hints.length) return { grade: 3, band: "Primary" };
  // Weighted: most recent answers tend to be authoritative — but we'll just average.
  const avg = hints.reduce((s, g) => s + g, 0) / hints.length;
  const grade = Math.min(8, Math.max(1, Math.round(avg)));
  const band = grade <= 5 ? "Primary" : "Secondary";
  return { grade, band };
}

export default function GradeFitQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Progress reflects the current question's position (question 1 of 5 -> 20%),
  // so the bar is never empty on the first step. Completion shows 100%.
  const progress = useMemo(() => (done ? 1 : (step + 1) / QUESTIONS.length), [step, done]);
  const result = useMemo(() => recommendedGrade(answers), [answers]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  function answer(qid: string, hint: number) {
    setAnswers((a) => ({ ...a, [qid]: hint }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      // Decide from the latest step inside the updater, not a captured value, so
      // two quick answers within the 200ms window can't both read a stale step.
      setStep((s) => {
        if (s + 1 >= QUESTIONS.length) {
          setDone(true);
          return s;
        }
        return s + 1;
      });
    }, 200);
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-3xl bg-white border border-[var(--brand-rule)] p-8 lg:p-10 text-center relative overflow-hidden"
          style={{ boxShadow: "0 24px 48px -16px rgba(11,29,51,0.30)" }}
        >
          <span
            aria-hidden
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, var(--brand-accent), transparent)" }}
          />
          <span
            className="relative inline-grid place-items-center h-14 w-14 rounded-2xl text-white mb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%)",
            }}
            aria-hidden
          >
            <Icon name="trophy" size={22} />
          </span>
          <div className="relative">
            <div className="news-eyebrow text-[var(--brand-accent)]">Likely best fit</div>
            <h2 className="font-display text-[32px] sm:text-[40px] font-bold text-[var(--brand-navy)] mt-1 leading-none">
              Grade {result.grade}
            </h2>
            <div className="mt-1 text-[13px] uppercase tracking-[0.14em] font-bold text-slate-500">
              {result.band} band
            </div>
            <p className="mt-4 text-[14px] text-slate-600 leading-relaxed">
              Based on your answers, <strong>Grade {result.grade}</strong> is typically the best
              entry point. Our admissions team will confirm based on a brief settling
              conversation and a sample of recent work.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link
                href={`/apply?g=${result.grade}`}
                className="btn-primary"
              >
                Start an application
                <Icon name="arrow-right" size={14} />
              </Link>
              <Link
                href={`/fee-structure/calculator?g=${result.grade}`}
                className="btn-secondary"
              >
                See fee estimate for Grade {result.grade}
              </Link>
              <button
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                  setDone(false);
                }}
                className="btn-secondary"
              >
                Retake quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Announce each new question to screen readers as the step advances. */}
      <p className="sr-only" aria-live="polite">
        {q.q}
      </p>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-[10.5px] uppercase tracking-[0.14em] font-bold text-slate-500">
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full transition-[width] duration-300"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
            }}
          />
        </div>
      </div>

      <div
        className="rounded-3xl bg-white border border-[var(--brand-rule)] p-6 lg:p-8"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <h2 className="font-display text-[22px] lg:text-[26px] font-bold text-[var(--brand-navy)] tracking-tight">
          {q.q}
        </h2>
        {q.help && <p className="mt-1 text-[13px] text-slate-500">{q.help}</p>}

        <div className="mt-5 grid sm:grid-cols-2 gap-2">
          {q.choices.map((c) => (
            <button
              key={c.label}
              onClick={() => answer(q.id, c.gradeHint)}
              className="text-left p-4 rounded-xl border border-[var(--brand-rule)] bg-white hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary-tint)] transition"
            >
              <span className="font-bold text-[14px] text-[var(--brand-navy)]">{c.label}</span>
            </button>
          ))}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="mt-5 text-[12px] text-slate-500 hover:text-[var(--brand-accent)] inline-flex items-center gap-1.5"
          >
            <Icon name="arrow-left" size={11} />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
