import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Sri Sathya Sai Global School collects, uses, and protects personal data — drafted in alignment with Singapore PDPA.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="How we collect, use, and protect personal data of prospective families, parents, students and visitors to our website."
      updated="2 June 2026"
      breadcrumb={[{ label: "Privacy Policy", href: "/privacy" }]}
      sections={[
        {
          id: "introduction",
          heading: "Introduction",
          body: (
            <>
              <p>
                This Privacy Policy explains how Sri Sathya Sai Global School (the &ldquo;School&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, discloses and safeguards
                personal data. It applies to information collected through our website,
                admission forms, on-campus interactions, and digital communication channels.
              </p>
              <p>
                We comply with the Personal Data Protection Act 2012 of Singapore
                (&ldquo;PDPA&rdquo;) and aim to be transparent about every data practice.
              </p>
              <p className="text-[13px] text-slate-500 italic">
                This is a template draft. Please review with your appointed Data Protection
                Officer before publication.
              </p>
            </>
          ),
        },
        {
          id: "what-we-collect",
          heading: "Information we collect",
          body: (
            <>
              <p>We may collect the following categories of personal data:</p>
              <ul>
                <li><strong>Identification:</strong> name, date of birth, NRIC/passport details (admission only).</li>
                <li><strong>Contact:</strong> email address, phone number, residential address.</li>
                <li><strong>Family:</strong> parent/guardian particulars, sibling information.</li>
                <li><strong>Academic:</strong> previous school records, report cards, references.</li>
                <li><strong>Health:</strong> medical conditions or allergies relevant to schooling.</li>
                <li><strong>Financial:</strong> billing details, transaction records (no card data stored on our servers).</li>
                <li><strong>Digital:</strong> IP address, browser type, pages visited, referral source.</li>
              </ul>
            </>
          ),
        },
        {
          id: "purposes",
          heading: "How we use personal data",
          body: (
            <>
              <p>Personal data is used strictly to:</p>
              <ul>
                <li>Process inquiries, admission applications and enrolment.</li>
                <li>Communicate about school operations, events and academic updates.</li>
                <li>Provide educational, pastoral and administrative services.</li>
                <li>Improve our website experience and respond to feedback.</li>
                <li>Comply with legal, regulatory or audit obligations.</li>
              </ul>
              <p>
                We do not sell personal data. We do not use it for unrelated marketing
                without consent.
              </p>
            </>
          ),
        },
        {
          id: "lawful-basis",
          heading: "Lawful basis and consent",
          body: (
            <>
              <p>
                Where we rely on consent (e.g. marketing emails or non-essential cookies),
                you may withdraw it at any time by contacting us. Where data is required to
                deliver services (e.g. processing your admission application), withdrawing
                consent may mean we cannot continue with that service.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          heading: "Sharing with third parties",
          body: (
            <>
              <p>
                We share data only with vetted service providers under contract — for hosting,
                email, payment, learning management and analytics. They are required to:
              </p>
              <ul>
                <li>Use data only for our instructed purpose.</li>
                <li>Maintain reasonable security safeguards.</li>
                <li>Return or destroy data when services end.</li>
              </ul>
              <p>
                We may also disclose data to regulators or law enforcement if required by Singapore law.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          heading: "Retention",
          body: (
            <>
              <p>
                Personal data is retained only as long as needed for the purpose collected,
                or as required by regulators. Inquiry data not converted to enrolment is
                typically retained for 24 months for follow-up, then deleted. Enrolment and
                academic records follow CPE-mandated retention periods.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          heading: "Your rights",
          body: (
            <>
              <p>Under PDPA, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Withdraw consent for non-essential uses.</li>
                <li>Lodge a complaint with the Personal Data Protection Commission.</li>
              </ul>
              <p>
                Requests may be sent to{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days.
              </p>
            </>
          ),
        },
        {
          id: "children",
          heading: "Children",
          body: (
            <>
              <p>
                We collect children&rsquo;s data only with the consent of a parent or guardian
                and only for legitimate educational purposes. We do not direct online marketing
                to minors.
              </p>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <>
              <p>
                We apply reasonable administrative, physical and technical safeguards including
                role-based access, transport encryption (HTTPS), secure storage and periodic
                review. No system is perfectly secure; we will notify affected parties of any
                qualifying breach in line with PDPA timelines.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies",
          body: (
            <>
              <p>
                See our <a href="/cookie-policy">Cookie Policy</a> for how cookies and similar
                technologies are used on this website, including how to manage your preferences.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <>
              <p>
                Questions, requests, or concerns about this policy should be addressed to:
              </p>
              <p>
                <strong>{site.name}</strong>
                <br />
                Email: <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                Phone: <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
