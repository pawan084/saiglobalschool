# Project-wide Image Content Audit

_Generated 2026-06-05. Every one of the 118 image files under `public/img/` was opened and visually inspected, and compared against the subject its filename/folder implies._

**49 OK · 35 content-mismatch · 34 low-quality asset** (69 of 118 flagged).

## Root cause

The funnel refactor gave every card a descriptively-named image slot (118 of them), but the project only contains a **small pool of ~20 distinct real photographs**. Those few photos — six staff portraits and a handful of classroom shots (language-arts, solar-system science, Pascal physics, a maths-algebra board, a debate, an adaptive-learning laptop) — were **reused under many different slot-names**, and the gaps were filled with **flat clip-art icons**, **document/table screenshots**, and **AI-composed banners with baked-in text**. So a filename like `open-house.jpg` or `fee-structure.jpg` often holds a staff portrait or an unrelated classroom photo.

This is **not** a renaming problem like the faculty folder (where the photo was correct for its slot). Most of these need a **real photograph that the project does not have** — renaming or repointing within the tiny pool only moves the same few images around.

## A — Content mismatches (image shows a different subject than the slot)

| Path | Actually shows |
|---|---|
| `/img/home/about-sssgs/faqs.jpg` | Studio-style portrait of a woman in a black blazer over a white patterned blouse, standing in front of a blue notice boa |
| `/img/home/academics/student-support.jpg` | A teacher pointing at a screen reading 'Reading and Language Arts' in front of five seated students, with a 'Parts of Sp |
| `/img/home/admissions/admissions-faqs.jpg` | A formal studio-style portrait of a woman in a black blazer and white blouse standing in front of a blue notice board |
| `/img/home/admissions/contact-admissions.jpg` | A formal studio-style portrait of a woman in a dark pinstripe blazer over a maroon top, standing against a blue wall |
| `/img/home/admissions/entry-requirements.jpg` | A teacher pointing at a laptop showing a progress dashboard while a uniformed boy works on it, with an 'Adaptive Learnin |
| `/img/home/admissions/open-house.jpg` | A formal studio-style portrait of a woman in glasses wearing a cream blazer over a green blouse, standing against a blue |
| `/img/home/admissions/refund-policy.jpg` | A classroom: a teacher pointing at a screen reading 'Reading and Language Arts' with students in blue uniforms seated fa |
| `/img/home/campus-life/uniform-transport.jpg` | Three young children lying/sitting on a tiled floor smiling, behind three hand-painted canvas tote bags reading names (A |
| `/img/home/hero/open-house-educators.jpg` | A studio-style full-length portrait of a single woman in a cream blazer and green blouse with pearls and glasses, standi |
| `/img/home/resources-for-parents/contact-us.jpg` | A full-length studio portrait of a woman in a dark pinstriped blazer over a maroon polo, standing against a blue wall. A |
| `/img/home/resources-for-parents/faqs.jpg` | A full-length studio portrait of a woman with long dark hair in a black blazer over a patterned white blouse, hands clas |
| `/img/home/resources-for-parents/olympiad.jpg` | A classroom debate competition: a girl speaking, a teacher in white blazer, whiteboard reads 'DEBATE COMPETITION — Socia |
| `/img/home/resources-for-parents/phonics-classes.jpg` | A teacher pointing at a smartboard showing 'The dog ran quickly.' diagrammed into noun/verb/adverb, with students seated |
| `/img/home/resources-for-parents/refund-policy.jpg` | A 'Reading and Language Arts' classroom: teacher in white cardigan pointing at smartboard, a 'Parts of Speech' chart, st |
| `/img/home/right-fit/families-in-transition.jpg` | A studio-style standing portrait of a single woman in a cream blazer and green blouse with glasses and a pearl necklace, |
| `/img/home/right-fit/relocating-families.jpg` | A classroom: a teacher at a 'Solar System' board on the left while uniformed students in blue watch a large wall screen  |
| `/img/home/right-fit/settling-in-support.jpg` | A studio-style standing portrait of a single woman in a black blazer and patterned white blouse, posed against a blue no |
| `/img/home/why-sssgs/school-ai-learning-environment.avif` | A maths classroom: a smiling girl in blue uniform writing algebra equations (2x+5=15, etc.) on a whiteboard, geometry/fr |
| `/img/navbar/about/about-us/faculty.jpg` | A single full-length studio portrait of one woman in a blue dress and cream blazer standing against a blue wall. A solo  |
| `/img/navbar/about/about-us/management-governance.jpg` | A single full-length studio portrait of an older woman with glasses, pearl necklace, green blouse and cream blazer stand |
| `/img/navbar/about/about-us/parent-support.jpg` | A single full-length studio portrait of a woman in a black suit and patterned blouse standing against a blue noticeboard |
| `/img/navbar/about/about-us/school-values.jpg` | A single full-length studio portrait of a woman in a blue striped kurta and cream blazer standing against a blue noticeb |
| `/img/navbar/academics/assessment-structure.jpg` | A photo of a science classroom: teacher writing on a 'Solar System' board, with a large solar-system illustration on a s |
| `/img/navbar/admissions/assessment.jpg` | A real photograph of a primary classroom: a teacher writing on a 'Solar System' board while uniformed students at desks  |
| `/img/navbar/admissions/entry-requirements.jpg` | A real photograph of a classroom: a teacher pointing at a screen reading 'Reading and Language Arts' with a 'Parts of Sp |
| `/img/navbar/admissions/fee-structure.jpg` | A real photograph of a classroom: a teacher presenting a projected 'Air Pressure & Pascal's Law' physics slide to unifor |
| `/img/navbar/admissions/open-house.jpg` | A real portrait photograph of a woman in a cream blazer over a green blouse with a pearl necklace, standing in front of  |
| `/img/navbar/admissions/registration.jpg` | A studio portrait of a woman in a blue dress and cream blazer standing against a blue wall with a whiteboard behind her. |
| `/img/navbar/admissions/student-readiness.jpg` | A studio portrait of an older woman in a striped blue kurta and cream blazer standing against a blue panel/whiteboard. A |
| `/img/navbar/campus/campus-life.jpg` | The exact same studio portrait as registration.jpg: a woman in a blue dress and cream blazer against a blue wall with wh |
| `/img/navbar/home/open-house-educators.jpg` | A single full-length studio-style portrait of one woman in a cream blazer and green blouse standing against a blue/white |
| `/img/navbar/resources/enrichment-activities.jpg` | The exact same classroom photo as curriculum-pathway: teacher in cream blazer at a 'Today's Learning Objectives' project |
| `/img/navbar/resources/faqs.jpg` | A studio-style portrait of a woman with long dark hair in a black business suit and patterned white blouse, standing in  |
| `/img/navbar/resources/olympiad.jpg` | A classroom with students in blue uniforms seated at desks labelled TEAM A and TEAM B, a girl speaking, and a teacher in |
| `/img/navbar/resources/open-house.jpg` | A studio-style portrait of an older woman wearing glasses, a pearl necklace, a teal blouse and cream blazer, standing ag |

## B — Low-quality assets (not a real photo of the subject)

| Path | What it is |
|---|---|
| `/img/home/about-sssgs/parent-student-handbook.jpg` | Pre-composed banner with baked-in 'WELCOME TO SSSGS' text and an awkward bottom crop/white padding; looks AI-g |
| `/img/home/academics/learning-labs.jpg` | Flat vector clip-art icon of a microscope, not a real photo of a learning lab. |
| `/img/home/academics/technology-lms.jpg` | Pre-composed marketing banner with baked-in headline/bullet text and a faded reused classroom photo; not a cle |
| `/img/home/admissions/book-campus-tour.jpg` | Flat clip-art icon, not a real photograph of a campus tour. |
| `/img/home/campus-life/a-day-at-sssgs.jpg` | A document/table screenshot with baked-in text (a school-breaks calendar table), not a photograph of campus li |
| `/img/home/campus-life/sssgs-spaces.jpg` | Flat clip-art math/geometry icon, not a real photo of school spaces. |
| `/img/home/hero/campus-tour.jpg` | Flat clip-art people/network icon, not a campus-tour photograph. |
| `/img/home/hero/homepage-hero-banner.avif` | Pre-composed banner with baked-in headline text and overlaid icon labels rather than a clean photograph. Accep |
| `/img/home/learning-labs/enrichment-activities.jpg` | AI-generated/composited image with garbled, misspelled baked-in UI text ('Adapsive', 'Photosynnois Quiz', 'Pho |
| `/img/home/learning-labs/ict-lab.jpg` | Flat clip-art icon (speech/language symbol), not a photograph of a computer/ICT lab. Also thematically wrong:  |
| `/img/home/learning-labs/language-lab.jpg` | Flat clip-art icon rather than a real photo of a language lab. Note this is the identical icon also used at ic |
| `/img/home/learning-labs/maths-lab.jpg` | Flat clip-art icon of maths instruments, not a photograph of a maths lab. Thematically on-topic but not a real |
| `/img/home/learning-labs/science-lab.jpg` | Flat clip-art icon of a microscope, not a photograph of a science lab. Thematically on-topic but not a real ph |
| `/img/home/resources-for-parents/abacus-vedic-maths.jpg` | Flat vector clip-art ICON (geometry instruments), not a real photograph of an abacus/Vedic maths class. Also n |
| `/img/home/resources-for-parents/school-calendar.jpg` | A document/table SCREENSHOT of a holiday list with baked-in text, not a real photograph or designed calendar g |
| `/img/home/why-sssgs/application-based-learning.jpg` | Flat clip-art people/network ICON, not a photograph of applied learning. |
| `/img/home/why-sssgs/personalized-learning-support.jpg` | Flat clip-art speech/language ICON, not a photograph of personalized learning support. |
| `/img/navbar/academics/language-lab.jpg` | Flat vector clip-art icon (speech/language symbol), not a real photo of a language lab. |
| `/img/navbar/academics/learning-labs/language-lab.jpg` | Flat vector clip-art icon, not a real photo of a language lab; also a duplicate of /img/navbar/academics/langu |
| `/img/navbar/academics/learning-labs/maths-lab.jpg` | Flat vector clip-art icon of maths instruments, not a real photo of a maths lab. |
| `/img/navbar/academics/learning-labs/science-lab.jpg` | This is a flat vector clip-art icon (microscope glyph on a circular badge), not a real photograph of a science |
| `/img/navbar/academics/science-lab.jpg` | Flat vector clip-art icon (microscope glyph on a circular badge), not a real photograph; appears to be a dupli |
| `/img/navbar/campus/a-day-at-sssgs.jpg` | This is a document/table screenshot (a 'School Breaks' schedule table with baked-in text), not a real photo of |
| `/img/navbar/campus/classroom-spaces.jpg` | This is a flat clip-art icon (network-of-people glyph), not a photograph of classroom spaces. |
| `/img/navbar/campus/school-calendar.jpg` | This is a document/table screenshot with baked-in text, not a photograph. It is a literal holiday-table graphi |
| `/img/navbar/campus/sssgs-spaces/class-in-session.jpg` | Flat clip-art network/people icon, not a real photograph of a class in session. |
| `/img/navbar/campus/sssgs-spaces/language-lab.jpg` | Flat clip-art speech/language icon with baked-in 'Aa' text, not a real photograph of a language lab. |
| `/img/navbar/campus/sssgs-spaces/science-lab.jpg` | Flat clip-art microscope icon, not a real photograph of a science lab. |
| `/img/navbar/home/campus-tour.jpg` | This is a flat vector clip-art icon (a people/connection glyph), not a real photograph of a campus tour. |
| `/img/navbar/home/homepage-hero-banner.avif` | Pre-composed marketing banner with baked-in headline text and feature badges rather than a clean photograph. A |
| `/img/navbar/resources/abacus-vedic-maths.jpg` | Flat clip-art icon of geometry/maths tools, not a real photograph; also no abacus is shown. |
| `/img/navbar/resources/parent-student-handbook.jpg` | The content fits a handbook theme, but the image is a pre-composed banner with baked-in 'WELCOME TO SSSGS' tex |
| `/img/navbar/resources/parent-student-handbook/handbook-cover.jpg` | Same pre-composed banner with baked-in 'WELCOME TO SSSGS' text and a blank white strip across the bottom. Used |
| `/img/navbar/resources/school-calendar.jpg` | This is a screenshot of a holidays data table, not a photograph. It is a document/table image with truncated r |

## Categories within the flags

- **Staff portraits on non-portrait cards** (faqs, open-house, contact, families-in-transition, registration, campus-life…): often *acceptable* (a friendly face), and correct for people-cards like management-governance/faculty/parent-support. Low priority.
- **Document/table SCREENSHOTS used as photos**: `a-day-at-sssgs.jpg` (School Breaks table), `school-calendar.jpg` (Holidays table). Look broken as card imagery.
- **AI banners with baked-in / garbled text**: `enrichment-activities.jpg` ("Adapsive Learning" misspelt), `technology-lms.jpg`, `parent-student-handbook.jpg`/`handbook-cover.jpg`, the reused hero banner.
- **Flat clip-art ICONS for the labs** (microscope / speech-Aa / protractor / people-network): thematic but cheap. The *original* Wix site also used these icons, so likely intentional.
- **Subject mismatches**: `olympiad.jpg` shows a debate; `phonics-classes.jpg` shows a grammar lesson; `relocating-families.jpg` shows a science class.

## What can actually fix this

1. **Real photography** for the genuinely-missing subjects (open house, campus tour, fees/finance, refunds, uniform & transport, phonics, olympiad, contact desk). Code cannot manufacture these.
2. **Repoint within the existing pool** — replace the worst offenders (screenshots, garbled banners, clear subject errors) with the cleanest real classroom photos already present. Improves those cards but reuses the same photos more.
3. **Leave the lab icons** as intentional design.
