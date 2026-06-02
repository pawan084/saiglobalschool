import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms governing your use of the Sri Sathya Sai Global School website and online services.",
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lead="Terms governing your use of this website and its online services. By using this site you agree to these terms."
      updated="2 June 2026"
      breadcrumb={[{ label: "Terms of Use", href: "/terms" }]}
      sections={[
        {
          id: "acceptance",
          heading: "Acceptance",
          body: (
            <p>
              By accessing or using <a href={site.url}>this website</a>, you agree to these
              Terms of Use. If you do not agree, please discontinue use.
            </p>
          ),
        },
        {
          id: "content",
          heading: "Content & intellectual property",
          body: (
            <>
              <p>
                All content on this website — including text, images, logos, and the school
                emblem — is owned by Sri Sathya Sai Global School or used under licence. You
                may view and print pages for personal, non-commercial use.
              </p>
              <p>
                Republishing, reselling, or modifying content without our written permission
                is not allowed.
              </p>
            </>
          ),
        },
        {
          id: "accuracy",
          heading: "Accuracy",
          body: (
            <p>
              We try to keep information accurate but make no warranty about completeness,
              suitability, or currency. Fees, dates, and policies are subject to change —
              the most current version is what applies at the time of enrolment.
            </p>
          ),
        },
        {
          id: "submissions",
          heading: "Forms & submissions",
          body: (
            <p>
              Inquiry, application, and contact forms must be filled with truthful, accurate
              information. Misrepresentation may lead to rejection of an application or
              cancellation of enrolment.
            </p>
          ),
        },
        {
          id: "third-party",
          heading: "Third-party services",
          body: (
            <p>
              Our website may link to third-party sites or embed services (e.g. WhatsApp,
              YouTube, Google Maps). We are not responsible for their content or practices —
              please review their policies separately.
            </p>
          ),
        },
        {
          id: "ai",
          heading: "AI chatbot",
          body: (
            <p>
              Our website may offer an AI assistant. Responses are generated and may contain
              inaccuracies. Always confirm specific facts (fees, dates, eligibility) with our
              admissions team before acting on them.
            </p>
          ),
        },
        {
          id: "prohibited",
          heading: "Prohibited use",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>Use the site for any unlawful purpose.</li>
                <li>Attempt to gain unauthorised access to systems or data.</li>
                <li>Interfere with site security, performance, or other users.</li>
                <li>Scrape content for commercial use without permission.</li>
              </ul>
            </>
          ),
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          body: (
            <p>
              To the extent allowed by law, we are not liable for indirect or consequential
              loss arising from use of this website. Nothing in these terms limits liability
              for matters that cannot be excluded under Singapore law.
            </p>
          ),
        },
        {
          id: "governing-law",
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of Singapore. Any disputes are subject
              to the exclusive jurisdiction of the Singapore courts.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to these terms",
          body: (
            <p>
              We may update these terms from time to time. The &ldquo;last updated&rdquo;
              date at the top reflects the latest revision. Continued use after a change
              indicates acceptance.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
