import UnsubscribeForm from "@/components/UnsubscribeForm";

export const metadata = {
  title: "Unsubscribe — Sri Sathya Sai Global School",
  description: "Unsubscribe from SSSGS school updates and newsletters.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-24 bg-[var(--brand-cream)]">
      <UnsubscribeForm />
    </main>
  );
}
