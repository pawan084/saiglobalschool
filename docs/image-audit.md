# Image Audit — current site vs original Wix site

_Generated 2026-06-05. Compared `public/img/*` and their placements in `src/` against the
original site archived at `/Users/pawansingh/Downloads/Archive/srisathya`
(`www.srisathyasaiglobalschool-sg.com`, a Wix export). Every current image was inspected
visually; the original page→image pairing was reconstructed from the human-readable filename
that Wix preserves at the end of each media URL._

## How the two sites line up

- The current `public/img/` filenames derive directly from the original Wix display names
  (e.g. `LSP07600_JPG.jpg` → `lsp07600_jpg.jpg`, `p1-vision.png` → `p1-vision.jpg`).
- **34** images were copied into the repo; the archive holds **203** media files
  (~169 unused) — but the archived extras are only small Wix thumbnails (≈147 px, blurred
  placeholders), so they are **not** usable as high-res replacements. Fixes below therefore
  **reshuffle the full-res images already in the repo** rather than importing from the archive.

## What each current photo actually is (ground truth)

| File | Actually depicts | Good for |
|---|---|---|
| `lsp07578` | Portrait — **Mausumi Mukherjee** (Principal & Maths) | Faculty |
| `lsp07600` | Portrait — **Pousali Bhattacharya** (HOD Science) | Faculty |
| `lsp07438` | Portrait — **Moumita Mazumdar** (Admissions & Art) | Faculty |
| `lsp07288` | Portrait — woman teacher (orig: **Uma Balachandar**, English & Social Studies) | Faculty |
| `lsp07305` | Portrait — woman teacher (orig: a Primary teacher) | Faculty |
| `lsp07302` | Portrait — **woman** teacher (orig: a Primary teacher) | Faculty |
| `lsp07484` | 4 women at a table (leadership/team meeting) | Team / about |
| `lsp07568` | **Headless cropped torso** of a woman | ⚠️ unusable as-is |
| `548-1` | Classroom — "Air Pressure & Pascal`s Law" lesson | Academics / science |
| `7621-1` | Classroom — "Solar System" lesson | Academics / assessment |
| `7621-2` | Teacher + student at laptop — "Adaptive Learning" | Technology / LMS |
| `7389-1` | Classroom — "Today`s Learning Objectives" | Academics |
| `7406-1` | Classroom — "Reading and Language Arts" | English / language |
| `debate` | Classroom — "Debate Competition" | Assessment / English / CCA |
| `original-1` | Music class (kids at music stands) | CCA / music / non-academic |
| `original-2` | Kids meditating / yoga | Values / character / non-academic |
| `sssvvp3_2` | Kids with hand-painted tote bags | Art / CCA / enrichment |
| `1599a2_…_mv2` | Family with SSSGS prospectus ("Welcome to SSSGS") | Admissions / resources / handbook |
| `school_edited` | School building façade | Campus / facilities |
| `p1-vision` | 3 women under a Sathya Sai Baba portrait | Vision / values |
| `img-4c416e73` | Pre-composed banner w/ baked-in "Education blossoms into character" text | (awkward — has text) |
| `labs-science` / `lab-english` / `lab-maths1` / `ss1_edited` | **Flat clip-art icons** (microscope / speech / protractor / people) | Low-fidelity; topically OK |
| `grade1-8_edited` | **Cropped uniform trousers on a red background** | ⚠️ not a curriculum image |
| `g1_edited` | **Screenshot of a "Course Title / Subjects" text card** | ⚠️ document, not a photo |
| `primary1-5` | **Screenshot of the fee-structure table** | ⚠️ document, not a photo |

## Confirmed issues & recommended remap (using assets already in the repo)

| # | Where | Current | Problem | Recommended |
|---|---|---|---|---|
| **I1** | `src/app/ict-lab/page.tsx:17` (page hero) | `lsp07302` | A **female teacher`s portrait** used as the ICT-lab hero image | `7621-2` (student + laptop) — the only computer-themed photo in the set |
| **I2** | `src/data/sections.ts:113` (Curriculum hero) | `grade1-8_edited` | Cropped **uniform-trousers** shot, not a curriculum image | `7389-1` or `7406-1` (real classrooms) |
| **I3** | `src/data/sections.ts:120` ("Courses offered") | `g1_edited` | **Screenshot** of a subjects text-card | `7406-1` (English class) or `548-1` |
| **I4** | `src/data/sections.ts:255` ("Fee structure") | `primary1-5` | **Screenshot** of the fee table used as a thumbnail | `school_edited` (building) or a fee/document icon |
| **I5** | `src/app/about-us/page.tsx:65`, `campus`, `sssgs-spaces`, `sections.ts:97,313` | `lsp07568` | **Headless** cropped portrait | `p1-vision`, `548-1`, or `7621-1` |
| **I6** | `grade1-8_edited` everywhere else — `page.tsx:98,169,176,245`, `academics:29,36`, `admissions:36`, `sections.ts:52` | `grade1-8_edited` | Same uniform-crop reused ~8× as the main "Grades 1–8 / academics" image | Rotate the real classroom photos (`7389-1`, `7406-1`, `548-1`, `7621-1`) |
| **I7** | Decorative uses of `lsp07578/600/438` on home/about/admissions/resources/sections | staff portraits | A single adult against a blue wall illustrating "Our Curriculum" etc. reads as odd | Use classroom photos for sections; **reserve the `lsp*` portraits for `/faculty` only** |

## Faculty data mismatches (`src/data/faculty.ts`)

The first three portraits are correctly mapped (578=Mausumi, 600=Pousali, 438=Moumita). The last three were genericised and one has a gender error:

| Slug | Image | Current label | Original (faculty.html) | Issue |
|---|---|---|---|---|
| `lead-language` | `lsp07288` | "Subject Lead — Language" | **Uma Balachandar** — English & Social Studies | Real name lost |
| `lead-social` | `lsp07305` | "Subject Lead — Social Studies" | a Primary Teacher (Prasanthi Siram / Sharmila Banu) | Real name lost; role likely wrong |
| `lead-ict` | `lsp07302` | "Subject Lead — ICT", bio says **"He** maintains the device fleet… **he** runs a coding club" | a female Primary Teacher | **Gender mismatch** — photo is a woman; also not an ICT teacher |

_Fix:_ restore the real names/roles/pronouns from the original `faculty.html`, or drop the
fabricated bios and use a consistent placeholder. The original page listed up to 8 teachers
(Mausumi Mukherjee, Pousali Bhattacharya, Moumita Mazumdar, Uma Balachandar, Thangammal…,
Prasanthi Siram, Sharmila Banu) — the current site shows 6 and invented 3.

## Content gaps vs the original

- **Management & Governance** (`src/app/management-governance/page.tsx`) renders **no board
  members and no photos**. The original page showed 6 named governor portraits
  (`ashok`, `kirit`, `chandan`, `kaushik`, `vashi sir`, `upmak`) plus leadership photos. If the
  school wants the board shown, these exist in the archive (low-res) and full-res versions
  should be requested from the school.

## Lower-priority quality notes

- `labs-science`, `lab-english`, `lab-maths1`, `ss1_edited` are **clip-art icons** used as
  hero/feature images (same as the original did). Topically fine but visually cheap — consider
  real lab/classroom photography.
- `img-4c416e73` has **baked-in text** ("Education blossoms into character") — avoid as a
  generic section image where new copy sits beside it.
