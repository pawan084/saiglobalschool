export type FeeBand = "primary" | "secondary";

export type FeeLine = {
  id: string;
  label: string;
  amountSgd: number;
  frequency: "monthly" | "annual" | "one-time";
  group: "core" | "addon";
  description?: string;
};

const PRIMARY_LINES: FeeLine[] = [
  { id: "reg-primary", label: "Registration fee", amountSgd: 500, frequency: "one-time", group: "core", description: "Charged once at enrolment." },
  { id: "tuition-primary", label: "Tuition fee", amountSgd: 650, frequency: "monthly", group: "core" },
  { id: "insurance", label: "Medical / accidental insurance", amountSgd: 30, frequency: "annual", group: "core" },
  { id: "labs-primary", label: "Laboratories & resource fees", amountSgd: 300, frequency: "annual", group: "core", description: "IT, science, maths, English labs + library." },
  { id: "books-primary", label: "Books", amountSgd: 250, frequency: "annual", group: "core" },
  { id: "id-card", label: "School ID card", amountSgd: 10, frequency: "one-time", group: "core" },
  { id: "cca-primary", label: "Co-curricular activity", amountSgd: 250, frequency: "annual", group: "addon" },
  { id: "transport", label: "School transport", amountSgd: 180, frequency: "monthly", group: "addon", description: "Optional — depends on route." },
  { id: "uniform", label: "Uniform set", amountSgd: 220, frequency: "one-time", group: "addon" },
  { id: "phonics", label: "Phonics classes", amountSgd: 60, frequency: "monthly", group: "addon" },
  { id: "abacus", label: "Abacus & Vedic maths", amountSgd: 80, frequency: "monthly", group: "addon" },
];

const SECONDARY_LINES: FeeLine[] = [
  { id: "reg-secondary", label: "Registration fee", amountSgd: 600, frequency: "one-time", group: "core" },
  { id: "tuition-secondary", label: "Tuition fee", amountSgd: 780, frequency: "monthly", group: "core" },
  { id: "insurance", label: "Medical / accidental insurance", amountSgd: 30, frequency: "annual", group: "core" },
  { id: "labs-secondary", label: "Laboratories & resource fees", amountSgd: 400, frequency: "annual", group: "core" },
  { id: "books-secondary", label: "Books", amountSgd: 350, frequency: "annual", group: "core" },
  { id: "id-card", label: "School ID card", amountSgd: 10, frequency: "one-time", group: "core" },
  { id: "cca-secondary", label: "Co-curricular activity", amountSgd: 300, frequency: "annual", group: "addon" },
  { id: "transport", label: "School transport", amountSgd: 220, frequency: "monthly", group: "addon" },
  { id: "uniform", label: "Uniform set", amountSgd: 250, frequency: "one-time", group: "addon" },
  { id: "olympiad", label: "Olympiad coaching", amountSgd: 90, frequency: "monthly", group: "addon" },
];

export function getFeeLines(band: FeeBand): FeeLine[] {
  return band === "primary" ? PRIMARY_LINES : SECONDARY_LINES;
}

export function bandForGrade(grade: number): FeeBand {
  return grade <= 5 ? "primary" : "secondary";
}

export type Currency = "SGD" | "INR" | "USD" | "AED";

export const CURRENCIES: Record<Currency, { symbol: string; toSgd: number; label: string }> = {
  // Indicative conversion rates; these are not live.
  SGD: { symbol: "S$", toSgd: 1, label: "Singapore Dollar" },
  INR: { symbol: "₹", toSgd: 0.0156, label: "Indian Rupee" },
  USD: { symbol: "US$", toSgd: 1.34, label: "US Dollar" },
  AED: { symbol: "د.إ", toSgd: 0.365, label: "UAE Dirham" },
};

export function format(amount: number, ccy: Currency) {
  const cfg = CURRENCIES[ccy];
  const converted = amount / cfg.toSgd;
  return `${cfg.symbol}${Math.round(converted).toLocaleString()}`;
}

export function annualise(line: FeeLine): number {
  if (line.frequency === "monthly") return line.amountSgd * 12;
  if (line.frequency === "annual") return line.amountSgd;
  return line.amountSgd; // one-time treated as paid in year 1
}
