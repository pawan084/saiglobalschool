# Statement of Work — Sprint 2

**Project:** Sri Sathya Sai Global School (SSSGS) — Website
**Sprint:** Sprint 2 — Cloudflare Analytics + Admin Panel + Asset Cleanup
**SoW Reference:** SSSGS-SOW-2026-002
**Date Issued:** ____________________
**Valid Until:** ____________________

---

## 1. Parties

| | Service Provider | Client |
|---|---|---|
| **Name** | _[Your Name / Company Name]_ | Sri Sathya Sai Global School |
| **Address** | _[Your Address]_ | _[Client Address, Singapore]_ |
| **Email** | _[your-email]_ | _[client-email]_ |
| **Phone** | _[your-phone]_ | _[client-phone]_ |
| **Authorised Signatory** | _[Your Name]_ | _[Client Authorised Signatory]_ |

---

## 2. Background

The Service Provider has previously delivered Phase 1 of the SSSGS website
re-design under SoW reference SSSGS-SOW-2026-001, including the migration from
the legacy Wix site to a modern Next.js application, layout updates, and all
content pages using the Client&rsquo;s existing imagery and copy.

This Sprint 2 covers additional functionality and content fix-up requested
by the Client after Phase 1 delivery.

---

## 3. Scope of Work

The Service Provider will deliver the following:

### 3.1 Cloudflare Web Analytics Integration

- Cloudflare Web Analytics account configured for the SSSGS domain
- Tracking script integrated into the production website
- Privacy-friendly, server-side analytics (no cookies, no PII)
- Shared dashboard access for the Client (read-only)
- Verification that analytics events are firing correctly
- Brief Loom or live walkthrough of the dashboard for the Client team

### 3.2 Admin Panel (MVP)

A password-protected administrative interface at `/admin`, containing exactly
the following three modules:

**3.2.1 Authentication**
- Single admin account with email + password login
- Session managed via HTTP-only cookies
- Password reset via email link

**3.2.2 Inquiries Inbox**
- Listing of all form submissions received via the website (Inquire, Apply,
  Contact, Tour Booking, Event RSVP)
- Filter by submission source
- Search by name or email address
- Mark-as-read functionality
- CSV export of all submissions

**3.2.3 News & Events CMS**
- Create, edit, and delete News posts
- Create, edit, and delete Event entries
- Rich-text editor for post body
- Feature image upload for each entry
- Publish / draft state

### 3.3 Image & Content Cleanup

- Audit of all images currently used across the website
- Replacement of all placeholder and legacy Wix images with final assets
  provided by the Client
- Image compression to AVIF and WebP formats for performance
- Accurate, descriptive `alt` text on every image (accessibility)
- Correction of placeholder content (fee figures, term dates, policy text,
  internal links) across all pages, using the Client&rsquo;s source documents

### 3.4 Cross-Browser QA + Bug Fixes

- Manual QA of the website on Chrome, Safari, Microsoft Edge, iOS Safari, and
  Android Chrome
- Lighthouse performance and accessibility check
- Bug log shared with the Client and resolution of all P0/P1 issues

### 3.5 Deployment & Handover

- Staging deployment for Client acceptance
- Production deployment to existing hosting infrastructure
- Updated documentation including admin panel user guide
- 30-minute handover call with the Client

---

## 4. Out of Scope

To prevent ambiguity, the following are **not included** in this Sprint 2 and
will be quoted separately if required:

- Multiple admin user roles / permissions
- Faculty bios editor
- Curriculum or subject content editor
- Application status tracking visible to parents
- Photo gallery editor with crop / resize tools
- Push notifications / email marketing automation
- Reporting and analytics beyond CSV export
- Multi-language / internationalisation
- Payment gateway integration
- Parent portal or student portal
- New custom domain procurement or DNS setup
- New hosting infrastructure (existing Vercel/Cloudflare account assumed)

---

## 5. Timeline

| Day | Activity | Owner |
|---|---|---|
| Day 0 (kickoff) | Asset & content handover from Client | Client |
| Day 1 | Cloudflare setup + Admin auth scaffolding | Senior Developer |
| Day 1 | Image audit & asset replacement starts | Junior Developer |
| Day 2 | Inquiries Inbox + data persistence | Senior Developer |
| Day 2 | Content corrections across pages | Junior Developer |
| Day 3 | News/Events CMS + staging deployment | Senior Developer |
| Day 3 | Cross-browser QA + Lighthouse pass | Junior Developer |
| Day 4 | Bug fixes from QA + client buffer | Junior Developer |
| Day 7 | Final handover call + production deployment | Both |

**Total duration:** 7 working days from kickoff date.
**Estimated start date:** ____________________
**Estimated handover date:** ____________________

---

## 6. Acceptance Criteria

The Sprint 2 deliverables will be considered accepted when:

1. Cloudflare Analytics dashboard shows traffic data for the live site
2. The Admin Panel login works and the three modules function as described
3. No image on the live site is a placeholder or legacy Wix asset
4. All P0 / P1 bugs identified during QA are resolved
5. The Client has been walked through the Admin Panel and Cloudflare dashboard
6. The Client confirms acceptance in writing (email is sufficient)

The Client will provide acceptance confirmation or specific defect list within
**3 business days** of handover. If no response is received within this window,
the deliverables are considered accepted.

---

## 7. Pricing

| Item | Days | Day Rate | Subtotal |
|---|---|---|---|
| Senior Developer | 3.0 | ₹ ________ | ₹ ________ |
| Junior Developer | 4.0 | ₹ ________ | ₹ ________ |
| Project Management | — | — | ₹ ________ |
| **Subtotal** | | | **₹ ________** |
| GST @ 18% (if applicable) | | | ₹ ________ |
| **Total** | | | **₹ ________** |

_OR — fixed-bid alternative:_

**₹ ________ all-inclusive** (covers all items in Section 3, including up to
2 hours of post-handover small tweaks within 7 days of delivery).

---

## 8. Payment Terms

- **50% advance** on signing of this SoW — invoice will be raised on signature
- **50% balance** within 7 days of acceptance / handover
- Payment by bank transfer to the account noted on the invoice
- Late-payment interest of 1.5% per month applies after 15 days past due date

---

## 9. Change Request Process

Any work request that falls outside Section 3 (Scope of Work) constitutes a
Change Request. The process:

1. Client emails the Service Provider describing the requested change
2. Service Provider responds within 1 business day with effort estimate and cost
3. Client confirms in writing whether to proceed
4. Work begins only after written confirmation

Minor tweaks (< 1 hour effort) requested during the sprint will be absorbed
without a formal change request, up to a cumulative cap of 2 hours.

---

## 10. Client Obligations

For the timeline to hold, the Client agrees to:

1. Provide all final image assets by Day 1 of the sprint
   _(approx. 30 photos covering: campus, classrooms, labs, students, faculty, events)_
2. Provide corrected text content (final fee numbers, term dates, policy text)
   in editable format (Word/Google Docs) by Day 1
3. Designate a single point-of-contact authorised to approve scope and content
4. Respond to questions within 1 business day during the sprint
5. Provide access to Cloudflare account (or authorise creation of a new one)
6. Provide acceptance confirmation within 3 business days of handover

Delay in any of the above will extend the timeline by the same duration.

---

## 11. Assumptions

This SoW assumes:

- Existing Next.js codebase is available and the Service Provider retains
  development access
- Existing hosting (Vercel or equivalent) account is operational
- Existing domain DNS is reachable by the Service Provider for verification
- Cloudflare free-tier Web Analytics is sufficient (no Cloudflare Enterprise required)
- A free-tier database (Neon, PlanetScale, or Supabase) is acceptable for
  the Admin Panel; if Client requires self-hosted DB, a +₹3,000 setup charge
  applies
- Email-sending for admin password reset uses a free-tier ESP
  (Resend, Postmark trial); if Client requires dedicated domain warmup,
  this is out of scope

---

## 12. Warranties

The Service Provider warrants that:

- The work will be performed in a professional and workmanlike manner
- The Deliverables will substantially conform to the descriptions in Section 3
- Code delivered will not knowingly introduce security vulnerabilities at
  the time of delivery

The Service Provider provides **30 days of warranty support** post-acceptance
covering defects in delivered code. Warranty does not cover:

- Issues caused by Client modifications to the code
- Third-party service outages (Cloudflare, hosting, database provider)
- New feature requests or scope additions

---

## 13. Intellectual Property

Upon receipt of full payment, all custom code written under this SoW becomes
the property of the Client. The Service Provider retains the right to use
generic patterns, knowledge, and methodology gained on this project for
unrelated future work.

Third-party libraries and dependencies retain their original licences.

---

## 14. Confidentiality

Both parties agree to keep confidential any non-public information disclosed
during the engagement, including but not limited to: Client business data,
form submissions, admin credentials, and analytics data. This obligation
survives termination of this SoW.

---

## 15. Termination

Either party may terminate this SoW with 5 business days&rsquo; written notice.
On termination:

- Client pays for work completed to date on a pro-rata basis
- Service Provider hands over all completed code and assets
- Confidentiality obligations continue

---

## 16. Governing Law

This SoW is governed by the laws of _[India / Singapore — choose applicable]_.
Disputes shall first be addressed by good-faith negotiation; if unresolved
within 30 days, they shall be subject to the exclusive jurisdiction of the
courts of _[jurisdiction]_.

---

## 17. Signatures

**For the Service Provider:**

Name: ___________________________
Title: ___________________________
Signature: ___________________________
Date: ___________________________

**For the Client (Sri Sathya Sai Global School):**

Name: ___________________________
Title: ___________________________
Signature: ___________________________
Date: ___________________________

---

*This Statement of Work constitutes the entire agreement between the parties
for Sprint 2 and supersedes any prior oral or written communications on this
specific scope.*
