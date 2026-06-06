# Assets & content needed from the school

_Last updated 2026-06-06._

These are the items the website review surfaced that **can't be resolved in code** —
they need real content, photos, or confirmation from the school. Everything else
from the review has been implemented. Each item lists **what's needed, why it
matters, and where it's used** so it can be dropped straight in.

Priority key: 🔴 high (affects accuracy/SEO/credibility) · 🟡 medium (quality) · ⚪ optional.

---

## 1. Photography

The site currently runs on a small pool of ~20 real photos, reused across many
cards. The lab/icon placeholders have been swapped for real classroom photos,
but several sections still reuse a generic classroom or building because no
fitting photo exists. Real photos for these would noticeably lift the site.

| 🔴/🟡 | Subject | Where it's used | Current placeholder |
|---|---|---|---|
| 🟡 | **Homepage hero** (a clean, wide, text-free photo) | `src/app/page.tsx` hero | School building façade (`home/hero/school-campus.jpg`) — works, but a purpose-shot hero would be stronger. The original banner had baked-in text and was removed. |
| 🟡 | **Open House / events** (visitors touring, an event crowd) | `/open-house`, `/events`, home admissions cards | A staff portrait / classroom |
| 🟡 | **Campus tour** | "Book a campus tour" cards | School building photo |
| 🟡 | **ICT / computer lab** (children at computers) | `/ict-lab`, learning-labs ICT card | A general classroom with a laptop |
| 🟡 | **Phonics / early reading** (young children, letter sounds) | `/phonics-classes` | A grammar/parts-of-speech classroom |
| 🟡 | **Olympiad / academic competition** (medals, quiz) | `/olympiad`, resources card | A debate-competition classroom |
| 🟡 | **Fees / finance & refunds** (office, paperwork) | fee-structure & refund cards | Building / classroom |
| 🟡 | **Parents / families** (parent community, a family) | "Parent community", "Families in transition" cards | Children-at-activity photos (improved, but real parents would fit better) |
| ⚪ | **Contact / reception desk** | contact cards | Staff portrait |

> Ideal format: landscape (3:2 or 16:9), min 1600px wide, no text baked into the
> image. Drop files into `public/img/...` and we'll wire them to the right slots.

---

## 2. Management & Governance — board members 🔴

`src/app/management-governance/page.tsx` currently describes the governance
**structure** (Board / School leadership / Parent voice) but lists **no named
board members**. The original Sri Sathya Sai Global School site showed **six named
governor portraits** (internal references: `ashok`, `kirit`, `chandan`,
`kaushik`, `vashi sir`, `upmak`). The web archive only has low-resolution
thumbnails of these, not usable for the site.

**Needed:** for each board / governance member —
- Full name and role/title
- A high-resolution portrait photo (min 600×600)
- Optional one-line bio

---

## 3. Faculty — confirm 3 names 🔴

`src/data/faculty.ts` lists six teachers. The first three are correctly named
(Mausumi Mukherjee, Pousali Bhattacharya, Moumita Mazumdar). **The last three are
placeholder "Subject Lead" entries** on real staff portraits.

The original faculty page named these teachers — likely **Uma Balachandar
(English & Social Studies)**, **Prasanthi Siram (Primary)**, **Sharmila Banu
(Primary)** — but the **photo ↔ name pairing was not captioned** in the archive,
so we won't guess and risk mislabeling someone.

**Needed:** for each of the three remaining portraits (visible at
`public/img/navbar/about/faculty/lead-language.jpg`, `lead-social.jpg`,
`lead-ict.jpg`):
- The correct name
- Role / subject
- Qualifications + a short bio

Also please **confirm the bios already written** for all six are accurate (some
read as drafted marketing copy and should be verified, e.g. the ICT lead's
qualifications/pronouns).

---

## 4. Real campus address + map location 🔴

There is **no street address in the site** — the campus-address page and the map
embed use a name-only query (`"Sri Sathya Sai Global School Singapore"`), and the
Organization structured data (`src/components/OrgJsonLd.tsx`) intentionally omits
the street address (a placeholder there was invalid for SEO).

**Needed:**
- Full postal address (street, unit, postal code)
- Latitude / longitude (or a Google Maps place link)

**Why it matters:** this is the single most important data point for **local SEO,
Google Maps, and a Google Knowledge Panel**. Once provided, it goes into
`OrgJsonLd.tsx` (`address` + a `geo` block) and the campus-address page/map.

---

## 5. Fee policy — confirm CCA classification 🟡

The static fee table (`src/app/fee-structure/page.tsx`) lists **CCA as a core
fee**, but the fee **calculator** (`src/lib/fees.ts`) treats CCA as an **optional
add-on**. These disagree.

**Needed:** confirm whether CCA is **mandatory** (move it to a core fee in the
calculator) or **optional** (mark it clearly in the static table). Also confirm
the registration page wording — it currently says "PEI accredited", but PEI is a
*registration* status, not an accreditation.

---

## 6. Optional polish ⚪

- **Per-page one-line descriptions** — the "More from…" related cards show a clean
  title + image; cards with a short description read richer. If the school wants,
  provide a one-line lead per page and we'll show it on the cards.
- **Brand font on social-share (OG) images** — the generated link-preview images
  use the system default font. If branded typography is wanted on shares, provide
  the Inter / Fraunces TTF files (or accept the clean default).
- **Real lab/activity photos** for Science/Maths/Language labs (currently reuse
  topical classroom photos) and a dedicated **library/reading-corner** photo.

---

### How to hand these over
- **Photos:** any cloud folder / zip; name them by subject if possible.
- **Text (names, bios, address, fee confirmation):** a doc or email is fine.

Once received, wiring each item in is a small change — most are a single file
edit or a photo drop into `public/img/`.
