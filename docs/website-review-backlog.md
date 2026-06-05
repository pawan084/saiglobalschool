# Website Review — Engineering Backlog

_Generated 2026-06-05 from a multi-agent review (50 agents: 8 finders + adversarial verification) plus a live build/route/API pass. 36 findings confirmed of 42 candidates._

**Severity:** 1 high · 14 medium · 17 low · 4 nit  
**Area:** 8 Bug · 4 Security · 9 A11y · 5 SEO · 6 Quality · 4 Perf

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## P0 — Live / CI status (do first)

- [ ] **Unit suite is red on Node 25 (30 failures).** Node 25 ships an experimental Web Storage global that shadows jsdom`s `localStorage` with non-functional stubs. Not a product bug. Fix: run vitest under Node ≤24, add `--no-experimental-webstorage` to NODE_OPTIONS in the `test` script, or force `globalThis.localStorage = window.localStorage` in `tests/setup.ts`. _(Build & lint are green.)_
- [ ] **Most content pages render dynamic (ƒ), not static.** Confirm this is intentional; if not, a mostly-brochure site should be statically prerendered for CDN cacheability.

---

## HIGH

- [ ] **[Bug] RecentlyViewed renders from localStorage during initial render → hydration mismatch**  
  `src/components/RecentlyViewed.tsx:21`  
  `const [items] = useState<SearchEntry[]>(() => readItems());` reads localStorage in the lazy initializer, and the component returns `null` when empty. On the server, `safeGetJson` returns `[]` (window undefined) so the whole `<section>` is omitted from SSR HTML. On the client, the lazy initializer r  
  _Fix:_ Start with empty state and populate after mount: `const [items, setItems] = useState<SearchEntry[]>([]); useEffect(() => setItems(readItems()), []);` (the same mounted-guard pattern used by CookieConsent/ExitIntentCapture). This guarantees 

## MEDIUM

- [ ] **[A11y] FAQ accordion button is not associated with its answer panel (no aria-controls / region)**  
  `src/components/FaqAccordion.tsx:26`  
  The toggle <button> has only aria-expanded={isOpen} (line 29). There is no aria-controls pointing at the answer, and the answer container (lines 54-64) has no id and no role="region". Screen reader users hear 'expanded/collapsed' but have no programmatic link to the revealed content. Worse, the answ  
  _Fix:_ Give each answer container an id and aria-labelledby/role="region" (e.g. role="region" aria-labelledby={btnId}); set aria-controls={panelId} on the button. When collapsed, also apply visibility:hidden or the `hidden` attribute (or unmount) 

- [ ] **[A11y] ChatBot streamed assistant replies are not announced (no live region)**  
  `src/components/ChatBot.tsx:317`  
  The message list <ul> (line 317) and AssistantBubble (lines 460-474) have no aria-live / role="log". Assistant text is streamed token-by-token into messages state, but nothing marks the conversation area as a live region, so screen reader users get no announcement of the assistant's response. The on  
  _Fix:_ Wrap the message list (or at least the assistant turns) in a container with role="log" aria-live="polite" aria-relevant="additions text". Consider announcing the final completed assistant message rather than every streamed chunk to avoid ve

- [ ] **[A11y] ChatBot panel is a focus-unmanaged popup dialog (no role, no focus trap, no Escape, no focus restore)**  
  `src/components/ChatBot.tsx:250`  
  The chat panel div (line 251) has no role="dialog"/aria-modal, is not wrapped in useFocusTrap (unlike SearchDialog, Gallery, OpenHouseModal which all use useFocusTrap), and the open-effects (lines 78-83) only focus the input via setTimeout. There is no Escape-to-close handler and focus is never retu  
  _Fix:_ Add role="dialog" aria-modal="true" aria-label on the panel, wrap it with useFocusTrap(open) (which already restores focus to the previously-focused launcher), and add an Escape keydown handler to close it — matching the other dialogs in th

- [ ] **[A11y] AccessibilityMenu disclosure dialog lacks focus management**  
  `src/components/AccessibilityMenu.tsx:86`  
  The panel is rendered with role="dialog" aria-label (line 87-89) and aria-haspopup="dialog" on the trigger (line 76), but there is no focus trap and no programmatic focus into the panel on open, nor focus return to the trigger on close. role="dialog" without managed focus is a mismatch — a keyboard   
  _Fix:_ Either move initial focus into the panel on open and trap focus (use useFocusTrap, returning focus to the trigger on close), or drop role="dialog"/aria-haspopup="dialog" and treat it as a simple disclosure (aria-haspopup="true" + aria-contr

- [ ] **[A11y] Apply wizard sidebar step buttons rely solely on color/opacity to convey disabled/active state and step changes are not announced**  
  `src/app/apply/ApplyWizard.tsx:337`  
  Step transitions (next/back, lines 145-159) change which <Step> block renders (lines 337,352,367,396,416) but there is no aria-live region announcing 'Step 2 of 5: Child'. The mobile progress text (lines 309-313) is plain text, not a live region. The sidebar list is an <ol> of buttons; current step   
  _Fix:_ Add aria-current="step" to the active sidebar button, and wrap the step heading/mobile-progress in an aria-live="polite" region (or move focus to the new step's heading) so the step change is announced. The Step <h2> always reads 'Step' as 

- [ ] **[A11y] GradeFitQuiz progress and step changes have no live region; quiz is a series of unannounced view swaps**  
  `src/app/grade-fit/GradeFitQuiz.tsx:84`  
  answer() (lines 84-90) advances to the next question after a 200ms timeout, swapping the rendered question (line 158, q = QUESTIONS[step]) and the 'Question N of M' text (line 165) with no aria-live announcement and no focus move to the new question heading. On completion the result screen (lines 92  
  _Fix:_ After advancing, move focus to the new question's <h2> (give it tabIndex={-1}) or wrap the question/progress in aria-live="polite". Announce the result screen similarly (focus the 'Grade N' heading).

- [ ] **[Bug] TourSlotPicker computes day key with toISOString() (UTC) but displays/filters with local date → off-by-one day in bookings**  
  `src/components/TourSlotPicker.tsx:43`  
  In `nextDays`, `iso: d.toISOString().slice(0,10)` uses the UTC calendar date, while `dayNum: d.getDate()`, `weekday: d.toLocaleDateString(...)`, and the open/closed weekday logic `wd === d.getDay()` use the *local* date. For a user west of UTC in the afternoon/evening, these disagree. Verified: at F  
  _Fix:_ Build the date key from local fields, e.g. `const iso = \`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}\`;` so the stored/submitted key matches the displayed local day.

- [ ] **[Bug] GradeFitQuiz advances steps inside a setTimeout that captures stale `step`**  
  `src/app/grade-fit/GradeFitQuiz.tsx:86`  
  `answer` does `setTimeout(() => { if (step + 1 >= QUESTIONS.length) setDone(true); else setStep((s) => s + 1); }, 200);`. The `step` read inside the timeout is captured from the render that registered the click. If the user clicks a choice on two questions within the 200ms window (or double-fires),   
  _Fix:_ Drive the transition from the functional updater instead of the captured `step`, e.g. `setStep((s) => { if (s + 1 >= QUESTIONS.length) { setDone(true); return s; } return s + 1; });`, and store the timer id in a ref to clear it on unmount /

- [ ] **[Bug] Several InnerPageShell pages pass section slugs missing from slugSection, silently dropping the 'More from...' related block**  
  `src/data/relatedBySection.ts:71`  
  slugSection only contains leaf-page keys; it has no entries for "about-us", "admissions", or "resources". Yet these are passed as the slug prop to InnerPageShell on real pages: src/app/apply/page.tsx:17 (slug="admissions"), src/app/accreditation/page.tsx & src/app/press/page.tsx (slug="about-us"), s  
  _Fix:_ Either map these section-index slugs to their SectionKey in slugSection ("admissions":"admissions", "resources":"resources", "about-us":"about"), or have these pages pass a leaf slug that already exists. Add a build-time assertion that ever

- [ ] **[Bug] "More from Resources" related block silently missing on all Events & News pages (slug=section-name not in slugSection map)**  
  `src/app/events/page.tsx:70`  
  events/page.tsx, events/[slug]/page.tsx, news/page.tsx and news/[slug]/page.tsx all render <InnerPageShell slug="resources">. InnerPageShell forwards that slug to RelatedFeatureBlock, which calls getSidebarItems(slug)/getSectionMeta(slug). Those resolve via `slugSection[slug]` in src/data/relatedByS  
  _Fix:_ Pass an actual page-slug that exists in slugSection (e.g. slug="calendar" or "faqs" for the resources section), OR make getSidebarItems/getSectionMeta fall back to treating the argument as a SectionKey when it isn't found as a page slug (e.

- [ ] **[Quality] Events page hero shows literal "&rsquo;" entity text to users**  
  `src/app/events/page.tsx:74`  
  hero.lead is the JS string "What&rsquo;s next at SSSGS. RSVP for what interests you and add it straight to your calendar." This is a JavaScript string prop value, not JSX text, so JSX entity decoding does NOT apply. InnerPageShell (src/components/InnerPageShell.tsx:39) forwards it to PageHero, which  
  _Fix:_ Replace `&rsquo;` with a real apostrophe: lead: "What's next at SSSGS. RSVP ..." (use U+2019 ' or a plain ').

- [ ] **[Security] Rate-limit IP key is spoofable via x-forwarded-for when no trusted edge header is present**  
  `src/lib/rate-limit.ts:74-108`  
  clientKey() iterates TRUSTED_IP_HEADERS and falls back to `x-forwarded-for` (last entry). The comment claims edge headers are 'stripped by the edge', but that only holds on Vercel/Cloudflare/Fly. There is no vercel.json and the deploy target is unconfirmed. On any platform that does NOT set one of x  
  _Fix:_ Do not fall back to a client-controllable header. Bind the trusted-IP source to the known deployment: read only the platform's verified header (e.g. x-vercel-forwarded-for on Vercel) and treat absence as 'anon' or reject, rather than trusti

- [ ] **[Security] chat, inquire and newsletter endpoints lack the same-origin/CSRF check that apply enforces**  
  `src/app/api/chat/route.ts:13`  
  src/app/api/apply/route.ts:18-28,42-44 defines isAllowedOrigin() and rejects cross-origin browser POSTs with 403. The other three browser-invoked POST endpoints do not. chat/route.ts (POST), inquire/route.ts:34 (POST) and newsletter/route.ts:13 (POST) perform no Origin/Referer validation — they rely  
  _Fix:_ Apply the same isAllowedOrigin() same-origin gate to chat, inquire and newsletter (factor it into src/lib so it is shared), so cross-origin browser POSTs are rejected consistently. Especially important for /api/chat which spends real money 

- [ ] **[SEO] Organization/School structured data ships a placeholder street address and no geo coordinates**  
  `src/components/OrgJsonLd.tsx:19-24`  
  The PostalAddress is literally: streetAddress: "Visit the campus address page", addressLocality: "Singapore", addressCountry: "SG" — with no postalCode, no real streetAddress, and no `geo` (latitude/longitude). For a brick-and-mortar school this is the single most important entity for local SEO and   
  _Fix:_ Populate a real PostalAddress (streetAddress, addressLocality, postalCode, addressRegion, addressCountry) and add a `geo` { latitude, longitude } plus optionally `hasMap` and `openingHoursSpecification` (the campus-address page already list

## LOW

- [ ] **[A11y] FeeCalculator total/estimate updates live but the summary is not a live region**  
  `src/app/fee-structure/calculator/FeeCalculator.tsx:212`  
  Toggling grade/add-ons/currency (aria-pressed buttons, lines 99-111, 135-174, 194-206) recomputes the estimate shown in the summary aside (lines 212-268). The headline figure (line 230-233) and breakdown update silently; there is no aria-live on the summary, so a screen reader user toggling an add-o  
  _Fix:_ Add aria-live="polite" to the estimate summary container (or at least the headline total) so changes from add-on/grade/currency toggles are announced.

- [ ] **[A11y] TourSlotPicker time-slot grid: validation error 'Please pick a time' only surfaces via toast, not associated with the control**  
  `src/components/TourSlotPicker.tsx:83`  
  submit() shows show('Please pick a time.','error') as a toast (line 84) when no hour is selected, but the submit button is also disabled when !hour (line 305), making the form unsubmittable by keyboard/AT users with no inline explanation tied to the slot grid. The slot grid (lines 218-241) has no gr  
  _Fix:_ Wrap the date and time button grids in role="radiogroup" with an accessible name, and surface the 'pick a time' requirement inline near the grid (aria-describedby on the group) rather than relying only on a transient toast.

- [ ] **[A11y] Header mobile drawer toggle does not manage focus into the opened drawer**  
  `src/components/Header.tsx:100`  
  The mobile menu button toggles `mobile` (line 102) with correct aria-expanded/aria-controls (lines 104-105). The drawer (lines 124-182) renders below but focus is not moved into it on open, and there is no Escape-to-close. Keyboard users must Tab through the entire brand band again to reach drawer i  
  _Fix:_ On opening the mobile drawer, optionally move focus to the first item or the drawer container, and add an Escape handler that closes the drawer and returns focus to the toggle button — to match the keyboard affordances of the desktop nav.

- [ ] **[Bug] useFocusTrap schedules initial focus via rAF without cancelling it on cleanup**  
  `src/lib/useFocusTrap.ts:54`  
  `requestAnimationFrame(() => focusables[0]?.focus());` is fired when the trap activates but the returned cleanup only removes the keydown listener and restores `lastActiveRef`. If `active` flips to false (dialog closes) within the same frame the trap opened, the rAF callback still runs after cleanup  
  _Fix:_ Capture the rAF id and cancel it in cleanup: `const raf = requestAnimationFrame(...); return () => { cancelAnimationFrame(raf); ... };`

- [ ] **[Bug] SearchDialog arrow-key navigation updates `cursor` from raw value, not clamped `safeCursor`**  
  `src/components/SearchDialog.tsx:97`  
  `handleKey` does `setCursor((c) => Math.min(results.length - 1, c + 1))` / `Math.max(0, c - 1)` using the raw stored `cursor`. After the query narrows results, `cursor` may be larger than `results.length-1` (it is only visually clamped via `safeCursor`). The first ArrowUp then operates on the stale   
  _Fix:_ Base the arrow updates on the clamped value, e.g. `setCursor((c) => Math.min(results.length - 1, Math.min(c, results.length - 1) + 1))`, or reset `cursor` to 0 whenever `q` changes.

- [ ] **[Bug] Calendar dayOfYear mixes UTC-parsed and locally-constructed dates**  
  `src/app/calendar/page.tsx:49`  
  dayOfYear(iso) does `const d = new Date(iso)` (date-only ISO like "2026-01-06" parses as UTC midnight) then `const start = new Date(d.getFullYear(), 0, 0)` (constructed in the server's LOCAL timezone). The subtraction `(+d - +start)` therefore mixes a UTC instant with a local-time instant. On a non-  
  _Fix:_ Compute consistently in UTC: e.g. `const d = new Date(iso); const start = Date.UTC(d.getUTCFullYear(), 0, 0); return Math.floor((d.getTime() - start) / 86400000);` so the ribbon is environment-independent.

- [ ] **[Perf] 328KB logo.png used as favicon/apple-touch icon on every page**  
  `src/app/layout.tsx:83`  
  metadata.icons sets icon: [{ url: "/logo.png", sizes: "any" }] and apple: [{ url: "/logo.png", sizes: "180x180" }]. public/logo.png is 328,325 bytes. The browser fetches this favicon/apple-touch icon on every page load and it is NOT run through next/image optimization (metadata icons are served as r  
  _Fix:_ Point the favicon/apple-touch metadata at the small pre-sized icons (e.g. icon-192.png for apple, a 32/48px favicon or logo-256.png with explicit sizes) instead of the 328KB logo.png. Reserve the large logo.png only for OG/JSON-LD where a h

- [ ] **[Perf] Service worker precaches the 328KB logo.png into the install shell**  
  `public/sw.js:11`  
  SHELL_ASSETS = ["/", OFFLINE_URL, "/logo.png", "/manifest.webmanifest"] and install does cache.addAll(SHELL_ASSETS). This forces a 328KB unoptimized PNG (public/logo.png = 328,325 bytes) to download during SW install on first visit, competing for bandwidth with first paint, even though the rendered   
  _Fix:_ Precache a lightweight icon (icon-192.png at 38KB, or logo-256.png at 63KB) in the shell instead of the 328KB logo.png, or drop the logo from the install-time precache entirely and let it be cached lazily by the cacheFirst static handler.

- [ ] **[Perf] RecentTracker client component ships search-index data on every route's initial bundle**  
  `src/app/layout.tsx:127`  
  <RecentTracker /> is rendered in the root layout OUTSIDE the <DeferredClient> idle-gate (DeferredClient closes at line 126; RecentTracker is at line 127). RecentTracker.tsx is a 'use client' component that statically imports the full searchIndex from src/data/search-index.ts (72 entries) purely to d  
  _Fix:_ Move <RecentTracker /> inside <DeferredClient> so its chunk (and the searchIndex it pulls in) is not fetched until idle/interaction, and/or replace the searchIndex membership check with a cheaper guard (it only needs to know a path is a rea

- [ ] **[Perf] Optimized images (/_next/image) bypass the service worker cache entirely**  
  `public/sw.js:72`  
  The static cache-first branch matches url.pathname.startsWith("/_next/static/") or a file-extension regex on the pathname. next/image serves optimized images from /_next/image?url=...&w=...&q=... — the pathname is /_next/image (no static prefix, no image extension), and it carries a query string, so  
  _Fix:_ Add /_next/image to the cache-first static branch (e.g. also match url.pathname === "/_next/image"), so optimized image variants are cached like other immutable static assets.

- [ ] **[Quality] Curriculum index advertises a Cambridge comparison column that the comparison page does not have**  
  `src/app/curriculum/page.tsx:48`  
  The supportingPrograms card links to /curriculum/comparison with body "How NCERT alignment maps onto CBSE, ICSE, Cambridge and IB for transitioning families." and the hero lead (line 58) also promises continuity "across CBSE, ICSE, Cambridge, IB". But src/app/curriculum/comparison/page.tsx only defi  
  _Fix:_ Add a `cambridge` column to the comparison Row/ROWS and the table/MobileCard, or change the curriculum-index copy and homepage copy to stop promising a Cambridge comparison.

- [ ] **[Quality] fee-structure static table labels CCA as a core fee while the calculator treats it as an optional add-on**  
  `src/app/fee-structure/page.tsx:18`  
  The official fee table lists "CCA Fee" S$250/S$300 as a regular row in the Tuition & Resource category for both Primary and Secondary (page.tsx:18 and :28). But the calculator's data source classifies CCA as group:"addon" (src/lib/fees.ts:19 `cca-primary ... group: "addon"`, :33 `cca-secondary ... g  
  _Fix:_ Decide whether CCA is mandatory or optional and make both surfaces agree — either move CCA to group:"core" in fees.ts or mark it as optional/'As per activity' more clearly in the static table.

- [ ] **[Quality] Dead .replace(/&rsquo;/g, "'") no-ops across News pages and RSS feed (data never contains the entity)**  
  `src/app/news/[slug]/page.tsx:24`  
  news/page.tsx, news/[slug]/page.tsx, and feed.xml/route.ts call `.replace(/&rsquo;/g, "'")` on every title/excerpt (e.g. news/[slug]/page.tsx:24,25,28,29,58,59,63,75,82,83; news/page.tsx:126,129,165,168; feed.xml/route.ts:18,19). But src/data/news.ts contains zero "&rsquo;" strings — it uses real U+  
  _Fix:_ Remove the dead `.replace(/&rsquo;/g, "'")` calls (data already holds the correct Unicode apostrophe), or, if entity input is genuinely expected from a future CMS, centralize decoding in one helper instead of scattering it.

- [ ] **[Security] No request body size limit on JSON POST endpoints**  
  `src/app/api/chat/route.ts:40`  
  All POST routes call `await req.json()` (chat:40, apply:66, inquire:50, newsletter:32) before any size validation. There is no bodySizeLimit / sizeLimit configured (grep found none in src/ or next.config.ts). Field-level caps (cap()/slice) only run AFTER the entire body is parsed into memory, so a m  
  _Fix:_ Enforce a hard Content-Length / streamed-body cap before parsing (reject early with 413 when Content-Length exceeds a few KB), or configure the route segment body size limit. This complements the existing per-field slice() caps which only b

- [ ] **[SEO] OG image generators declare fontFamily "Inter" but never load the font into ImageResponse**  
  `src/lib/og.tsx:50`  
  Both src/lib/og.tsx (fontFamily: "Inter, system-ui, sans-serif") and src/app/opengraph-image.tsx (line 25, same declaration) render via next/og ImageResponse, but neither passes a `fonts: [...]` option (grep for `fonts:`/`loadGoogleFont` returns nothing). next/og does not bundle Inter, so it silentl  
  _Fix:_ Load the Inter (and/or Fraunces display) TTF via readFile/fetch and pass it through the `fonts` array on the ImageResponse options, or drop the misleading `fontFamily: "Inter"` declaration so the intent matches reality.

- [ ] **[SEO] News Article JSON-LD omits image and dateModified, weakening Article rich-result eligibility**  
  `src/app/news/[slug]/page.tsx:78-92`  
  The Article node sets headline, description, datePublished, author, publisher.logo and mainEntityOfPage, but has no `image` and no `dateModified`. Google's Article structured-data guidance lists `image` as a recommended property for rich results and `dateModified` as recommended for freshness; their  
  _Fix:_ Add `image: \`${SITE_URL}/opengraph-image\`` (or a per-post image) and `dateModified` to the Article JSON-LD, and consider `articleSection`/`author` as a Person once real content lands.

- [ ] **[SEO] RSS feed at /feed.xml is not discoverable (no <link rel="alternate" type="application/rss+xml">)**  
  `src/app/layout.tsx:58`  
  src/app/feed.xml/route.ts serves a valid RSS feed, but the root layout metadata only sets `alternates: { canonical: "/" }` (layout.tsx:58) and no page declares `alternates.types['application/rss+xml']`. Grep for rss/feed/alternate in layout.tsx returns only the canonical line. Browsers and feed read  
  _Fix:_ Add to the layout (or news page) metadata: `alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } }` so the feed link appears in <head>.

## NIT

- [ ] **[Quality] Registration page metadata calls SSSGS a 'PEI accredited' institution, but PEI is a registration status not an accreditation**  
  `src/app/registration/page.tsx:8`  
  metadata.description: "...PEI accredited Private Education Institution in Singapore." PEI stands for Private Education Institution (the body's own page body at line 15 correctly says "Registered PEI"). 'PEI accredited' is redundant/incorrect phrasing — institutions are registered as a PEI under CPE;  
  _Fix:_ Reword the meta description to 'a registered Private Education Institution (PEI) in Singapore' to match the on-page copy and avoid an inaccurate accreditation claim.

- [ ] **[Quality] SharePage email share omits the page title from the mail body**  
  `src/components/SharePage.tsx:79`  
  href={`mailto:?subject=${t}&body=${u}`} puts the encoded title (t) only in the subject; the body contains just the encoded URL (u). The WhatsApp variant correctly includes both (`text=${t}%20${u}` at line 67). This component is used on LegalPage and the Parent-Student Handbook page reviewed here.  
  _Fix:_ Include the title in the body for parity, e.g. body=${t}%0A%0A${u}, so emailed shares carry context, not a bare URL.

- [ ] **[Security] Chat endpoint trusts client-supplied 'assistant' turns, enabling conversation-history prompt injection**  
  `src/app/api/chat/route.ts:57-91`  
  The request body's full `messages` array (including role:'assistant' entries) is accepted from the client and forwarded verbatim to OpenAI after the system prompt (lines 85-88). A caller can fabricate prior assistant turns (e.g. an assistant message that 'agrees' to ignore the school-only restrictio  
  _Fix:_ Treat assistant turns as untrusted: either keep authoritative conversation state server-side keyed to a session, or strip/ignore client-supplied assistant content and only forward user turns plus the system prompt. At minimum, reinforce the

- [ ] **[SEO] Holiday-type events emit OfflineEventAttendanceMode + organizer + RSVP-style Event schema**  
  `src/app/events/[slug]/page.tsx:106-132`  
  Every event slug (including type "Holiday", e.g. a term break) is rendered with the same Event JSON-LD: eventAttendanceMode OfflineEventAttendanceMode, a Place location, and an organizer. A school holiday is not an attendable, organized Event; marking it as schema.org/Event with an offline attendanc  
  _Fix:_ Skip Event JSON-LD for type === "Holiday" (or model holidays differently), and reserve the Event node for genuinely attendable events (Open House, PTM, Performance, Workshop).

---

_See `image-audit.md` for the image-relevance findings (tracked separately)._
