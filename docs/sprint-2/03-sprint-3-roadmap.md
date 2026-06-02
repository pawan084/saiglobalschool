# Sprint 3 Roadmap — What&rsquo;s next for SSSGS Website

**Prepared for:** Sri Sathya Sai Global School
**Prepared by:** _[Your Name / Company]_
**Date:** ____________________
**Status:** Discussion document — not a commitment

---

## Why this document

Sprint 2 (Cloudflare Analytics + Admin Panel + Asset Cleanup) closes out the
"functional MVP" phase of the SSSGS website. Once it&rsquo;s live, several
themes emerge as natural next investments — each compounds on what&rsquo;s
already built.

This roadmap groups them by **business outcome** rather than by feature, so
the school can pick what matters most for the upcoming term.

---

## Theme A — Admissions conversion (highest revenue impact)

**Why it matters:** Every percentage point of inquiry → enrolment conversion
is directly tied to fee revenue. Three improvements typically move this needle.

| Initiative | Days | Outcome |
|---|---|---|
| **Application status portal** for parents | 5–7 | Parents log in with a magic link to track their child&rsquo;s application status — replaces "what&rsquo;s next?" emails to admissions. |
| **Document upload in the application flow** | 3 | Parents upload birth cert / report cards directly; admins see them in the inbox. Removes 2–3 back-and-forth emails per application. |
| **Tour-slot integration with Google Calendar** | 2–3 | Slots block out the admissions team&rsquo;s real calendar; visit confirmations sent automatically. |
| **WhatsApp Business API integration** | 4–5 | Send admission updates / tour reminders via WhatsApp instead of email; ~3× open rate. |

**Suggested combined Sprint 3.A:** _Document upload + Google Calendar slots_
≈ 5–6 days, fixed-bid quote: ₹ _____.

---

## Theme B — Content velocity (turn the site into a marketing engine)

**Why it matters:** Search engines reward fresh content. A blog and event
schedule that update weekly attracts long-tail organic traffic and improves
the school&rsquo;s discoverability when parents Google "international school
Singapore CBSE" or similar queries.

| Initiative | Days | Outcome |
|---|---|---|
| **Faculty bios editor in the admin panel** | 2 | Teachers' bios become editable without touching code. |
| **Photo gallery with categories** | 3 | Curated galleries (campus, events, students at work) that the admin can drag-drop into. |
| **Curriculum content editor** | 3 | Subject pages become CMS-editable for academic team to refine. |
| **Email newsletter sender** (Resend / Mailchimp integration) | 3 | Monthly digest of news, sent to the newsletter subscribers. |

**Suggested combined Sprint 3.B:** _Photo gallery + Newsletter sender_
≈ 5–6 days, fixed-bid quote: ₹ _____.

---

## Theme C — Parent engagement (retention & word-of-mouth)

**Why it matters:** Engaged current parents drive 60–70% of new enrolments
through referrals. Even a light parent-facing layer significantly increases
retention conversations.

| Initiative | Days | Outcome |
|---|---|---|
| **Parent portal — phase 1** (login + child progress, calendar, fee invoices) | 10–14 | Adds material differentiation vs other schools that only have a website. |
| **PTM (Parent-Teacher Meeting) booking** | 3 | Self-service 20-min slot booking each term. |
| **Push notifications** for event reminders | 3 | Reliable, opt-in channel to parents (and prospective families) for upcoming open houses, holidays, etc. |
| **Referral programme** with tracked links | 2 | "Refer a family" link with tracking; admin sees who referred whom. |

**Suggested combined Sprint 3.C (phased):** _PTM booking + Push notifications_
as a 1-week starter ≈ 6 days, fixed-bid quote: ₹ _____. Full parent portal
treated as Sprint 4.

---

## Theme D — Performance, SEO, accessibility (compound improvements)

**Why it matters:** Already covered the foundations in Sprint 1. This theme
keeps the site competitive over the next 12 months.

| Initiative | Days | Outcome |
|---|---|---|
| **Multi-language site** (English + 中文 + தமிழ் + हिन्दी) | 7–10 | Major demographic in Singapore — every term sees families more comfortable in another language. |
| **PWA push notifications + offline page enhancements** | 2 | Adds "Add to Home Screen" with branded prompt. |
| **Real video content** on home + open-house pages | 3 + (video production cost separately) | Materially increases time-on-page and conversion. |
| **A/B testing framework** (Vercel Edge or PostHog) | 2 | Test hero copy, CTA placement, fee-page layout for conversion lift. |

**Suggested combined Sprint 3.D:** _A/B testing setup + PWA prompt polish_
≈ 4 days, fixed-bid quote: ₹ _____.

---

## Theme E — Operations & automation

**Why it matters:** Reduce the admin and admissions team&rsquo;s manual load.

| Initiative | Days | Outcome |
|---|---|---|
| **CRM integration** (e.g. Notion, Airtable, HubSpot) | 3 | Inquiry submissions auto-populate into the admissions CRM. |
| **Email automation** for inquiry follow-up | 3 | Day-1, day-3, day-7 templated follow-ups for inquiries that haven&rsquo;t been responded to manually. |
| **Slack / WhatsApp alerts** for new inquiries | 1 | Admissions team is notified instantly when a high-priority inquiry comes in. |
| **Monthly performance report** auto-generated | 2 | Cloudflare + admin-panel data summarised into a one-pager PDF emailed to leadership monthly. |

**Suggested combined Sprint 3.E:** _Slack alerts + Email automation_
≈ 4 days, fixed-bid quote: ₹ _____.

---

## Quick recommendation matrix

If the school can pick **one theme** for Sprint 3 based on goal:

| Their goal this term | Pick this theme |
|---|---|
| Convert more inquiries to enrolments | **Theme A** (Admissions conversion) |
| Improve SEO and discoverability | **Theme B** (Content velocity) |
| Improve current-parent satisfaction | **Theme C** (Parent engagement) |
| Long-term competitive moat | **Theme D** (Performance, SEO, a11y) |
| Reduce internal admissions workload | **Theme E** (Operations & automation) |

---

## Recommended Sprint 3 (default suggestion)

If unsure, the highest-leverage combination for the next 7-day sprint is a
mix from **A + E**:

| Item | Days |
|---|---|
| Document upload in application flow (A) | 3 |
| Slack alert on new inquiries (E) | 1 |
| Email automation for inquiry follow-up (E) | 3 |

This sprint **directly impacts admissions revenue** (lower drop-off, faster
response time) and is well-scoped for one senior + one junior week.

**Estimated Sprint 3 cost (default):** ₹ _____ all-inclusive.

---

## Ground rules for Sprint 3

To keep momentum:

- One theme per sprint (don't fragment)
- Sprint quoted as fixed-bid for predictable budgeting
- Each sprint includes 30 minutes of post-handover walkthrough
- Sprint kickoff requires content / assets in hand from school side
- 30-day warranty on each delivered sprint

---

## How to lock in Sprint 3

1. School team selects a theme and gives go-ahead in writing
2. Service provider returns a detailed SoW within 2 business days
3. 50% advance + signature → kickoff
4. 7 days later → handover

---

_This document is a recommendation, not a commitment. Actual scope, cost and
timeline for Sprint 3 will be confirmed in a separate SoW upon agreement._
