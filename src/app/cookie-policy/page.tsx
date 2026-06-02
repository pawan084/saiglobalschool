import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Cookie Policy",
  description:
    "How Sri Sathya Sai Global School uses cookies and similar technologies on this website.",
};

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      lead="What cookies we use, why we use them, and how you can change your preferences."
      updated="2 June 2026"
      breadcrumb={[{ label: "Cookie Policy", href: "/cookie-policy" }]}
      sections={[
        {
          id: "what",
          heading: "What are cookies?",
          body: (
            <p>
              Cookies are small text files placed on your device by the websites you visit.
              They are widely used to make websites work, or work more efficiently, and to
              provide information to site owners.
            </p>
          ),
        },
        {
          id: "categories",
          heading: "Categories we use",
          body: (
            <>
              <ul>
                <li><strong>Strictly necessary:</strong> Required for the site to function — load
                  pages, remember your accessibility preferences, secure your session. These cannot
                  be disabled.</li>
                <li><strong>Performance & analytics:</strong> Help us understand how visitors use
                  the site (which pages, how long, which referrals). Aggregated and anonymised.
                  Disabled by default until you accept.</li>
                <li><strong>Functional:</strong> Remember choices you make — language preferences,
                  whether the cookie banner has been dismissed, whether you have completed an
                  open-house RSVP.</li>
              </ul>
              <p>We do not currently use targeting or advertising cookies.</p>
            </>
          ),
        },
        {
          id: "local-storage",
          heading: "Local storage we use",
          body: (
            <>
              <p>In addition to cookies we use the browser&rsquo;s local storage to remember:</p>
              <ul>
                <li>Your accessibility preferences (text size, contrast).</li>
                <li>Your cookie consent decision.</li>
                <li>In-progress applications (so you can resume later on the same device).</li>
                <li>Chatbot conversation history (private to your browser; not sent to our servers beyond active messages).</li>
              </ul>
              <p>You can clear this data anytime via your browser settings.</p>
            </>
          ),
        },
        {
          id: "managing",
          heading: "Managing your preferences",
          body: (
            <>
              <p>
                You can accept or reject non-essential cookies from the consent banner shown on
                your first visit. To change your mind, clear our site data via your browser and
                the banner will reappear on the next visit.
              </p>
              <p>
                Most browsers also let you block or delete cookies entirely — see the help docs
                for{" "}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>,{" "}
                <a href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Firefox</a>, and{" "}
                <a href="https://support.microsoft.com/topic/d7d719c4-7ddc-2474-fc16-0a1aac72b5e2" target="_blank" rel="noopener noreferrer">Edge</a>.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: (
            <p>
              We will update this policy when our cookie use changes. The &ldquo;last updated&rdquo;
              date at the top reflects the most recent revision.
            </p>
          ),
        },
      ]}
    />
  );
}
