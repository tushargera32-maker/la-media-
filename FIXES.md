# Fix log — LA Media draft

All changes made by static inspection. **Nothing was executed**: the environment
used for these fixes had no network access, so `npm install`, `next build` and
`next dev` could never run. A syntax-only TypeScript parse of every `.ts`/`.tsx`
file passes with 0 errors, but full type checking requires `node_modules`.

Run `npm run typecheck` before trusting anything below.

---

## 1. Fabricated content (highest priority)

The draft presented invented facts as truth throughout. All removed, not
adjusted — every removal is documented in-place with a comment.

| Location | Removed |
|---|---|
| Homepage hero | 500+ Professionals · 50+ Brand Partners · 10+ Major Events · 3 Cities |
| Upcoming event | "Design Dialect 2025, June 10–12, 2025" · 1000+ Attendees · 50+ Speakers · 30+ Workshops |
| Featured work | 500+ Attendees · 40+ Speakers · 50+ Brand Partners · 98% Satisfaction |
| Partners | 150+ Global Partners · 25+ Countries · 98% Satisfaction · **$2.5B+ Combined Revenue** |
| Team | Sarah Mitchell, Marcus Chen, Elena Rodriguez — invented people with Unsplash portraits |
| Blog | 4 invented articles |
| Gallery | Unsplash stock captioned as LA Media's own event photography |
| Admin dashboard | 24 events · 156 posts · 342 contacts · 48 partners · 6 invented activity entries |
| `UpcomingEvent` defaults | Event location defaulted to **"San Francisco, CA"** |

Also removed: the "Design Dialect 2025" video embed pointed at YouTube ID
`dQw4w9WgXcQ` — a rickroll — one click from playing on a client homepage.

Public copy now lives in **`content/site.ts`**. Empty values do not render.
The admin dashboard now queries Prisma for real counts.

## 2. Build-breaking bugs

- **Tailwind v4 installed, v3 CSS in use.** `globals.css` used `@tailwind base/…`
  and a `tailwind.config.ts` that v4 ignores. Every custom class
  (`bg-surface`, `text-muted`, `py-section`, `max-w-content`) generated nothing.
  Migrated to `@import "tailwindcss"` + `@theme`; deleted the dead config.
- **Async `params`.** All 7 `/api/*/[id]/route.ts` used the Next 14 sync form.
  Migrated to `Promise<{id:string}>` + `await`. Gallery edit page moved to `useParams`.
- **Missing `images.remotePatterns`** — remote `next/image` threw at runtime.
- **Wrong prop names on the homepage**: `UpcomingEvent` takes `eventTitle`/
  `eventDate`/`eventLocation`/`registrationLink`, not `title`/`date`/`location`/
  `registerUrl`. `ImageGallery` takes `columns.default`, not `columns.base`.
  `BlogSection` needs `imageAlt` and a string `readTime`.
- **Dynamic Tailwind classes** — `columns-${n}`/`gap-${n}` are never generated
  by the scanner, so the gallery had no columns or gaps. Static maps now.
- **`/videos/hero-video.mp4` does not exist.** `videoSrc` is now optional.
- **Dead admin routes** — `events/create`, `team`, `settings`, `users` were empty
  directories or missing pages linked from the dashboard and sidebar. Repointed
  to real routes; empty dirs deleted.

## 3. Security

- **No auth existed.** `next-auth` was a dependency but `app/api/auth/[...nextauth]/route.ts`
  was absent, so `useSession` hit a 404 and *every* admin page and API mutation
  was publicly reachable — anyone could POST, DELETE or upload files.
  Added the route, `lib/auth.ts` (bcrypt credentials), `/admin/login`, and
  `middleware.ts` gating `/admin` and all non-GET `/api`. Public form POSTs
  (contacts, collaborations, newsletter) remain open by design.
- **Path traversal in upload.** `file.name` reached `join()` after only
  whitespace stripping, so `../../.env` escaped the upload dir. Now sanitised.
- **`NEXTAUTH_SECRET` was committed** in `.env`. Rotated. Treat the old one as
  compromised if this zip was shared.
- **`.next/` (197 MB) and `prisma/dev.db` were committed.** Removed, gitignored.
  Project is now ~1.4 MB.

## 4. Still outstanding

- Design is still the generic blue scaffold — neither agreed direction applied.
- `content/site.ts` is mostly empty by design. Fill in only confirmed facts.
- 8 status markdown files (`FINAL_SUMMARY.md`, `PROJECT_COMPLETE.md`, …) left
  untouched; several describe features as complete that were not.
- `.example.tsx` files moved to `docs/` and excluded from the build.

---

# Homepage rebuild (per LA_Media_Homepage_Revision_SKILL.md)

`content/site.ts` from the previous pass has been **removed** — superseded by
the rebuild below.

## Retired to `docs/legacy/`
Navigation · VideoHero · UpcomingEvent · AboutTeam · FeaturedWork · OurFirms ·
Capabilities · ImageGallery · CollaborateSection · Partners · BlogSection ·
ContactForm

Reason: all carried generic full-service-agency positioning. Specifically
removed — "Brand Strategy & Identity", "Digital Marketing", "Media Relations",
"Web & Digital Design", "Strategic Consulting", the six generic collaboration
cards (Speaker/Strategic/Media/Influencer/Brand/Knowledge), OurFirms describing
LA Media as "a premium strategic communications and public relations firm" and
Build Right as "a premier construction and infrastructure advisory firm", and a
footer of ~24 links (Careers, Press, FAQ, Newsroom, Case Studies, Cookie Policy…)
every one of which pointed at a route that does not exist.

## Built — `components/home/`
| # | Section | File |
|---|---|---|
| 01 | Navigation | `Nav.tsx` |
| 02 | Hero | `Hero.tsx` |
| 03 | Design Dialect | `Sections.tsx` |
| 04 | We Build The Room | `Sections.tsx` |
| 05 | What We Do | `Sections.tsx` |
| 06 | Our Platforms | `Sections2.tsx` |
| 07 | Expert Network | `Sections2.tsx` |
| 08 | Selected Work | `Sections2.tsx` |
| 09 | Collaborate | `Sections2.tsx` |
| 10 | Contact | `Sections2.tsx` |
| 11 | Footer | `Sections2.tsx` |

Shared primitives in `Primitives.tsx`: `Placeholder`, `Reveal`, `SectionHead`,
`Unconfirmed`.

## Decisions worth reviewing
- **"OUR PLATFORMS"**, not "Our Firms" — accurate whether Build Right is a
  separate entity or a vertical. Swap only once the structure is confirmed.
- **Design Dialect sits at position 02**, before positioning: with no existing
  brand awareness, proof has to precede claims.
- **Selected Work shows one entry as one entry** — no filler.
- **Zero metrics anywhere.** No attendance, speakers, workshops, partners,
  satisfaction, cities or years.
- **All media is a labelled local placeholder** (`[ DESIGN DIALECT — STAGE — 16:9 ]`).
  No Unsplash. Containers own the aspect ratio, so real assets drop in without
  layout changes.
- Admin/API/Prisma left intact but untouched and unextended.

## Not verified
The dev server was never run — no network in the environment used. A
syntax-only parse of every file passes with 0 errors; full type checking needs
`node_modules`. Run `npm run typecheck` before review.

---

# Multi-page build (FOAID structure, own design)

## What was adopted from FOAID
Their **information architecture only** — the section order and page set,
which is genuinely well-suited to an event platform:

| FOAID | Here |
|---|---|
| Utility strip (About / Contact / socials) | Same pattern |
| Edition + dates bar, always visible | Same slot — states "next edition to be announced" |
| Full-bleed video hero + tagline + Partner CTA | Same shape, placeholder media |
| Animated counters (Visitors/Speakers/Jury) | **Replaced** — see below |
| About strip + Read More | Same |
| Festival broken into 8 named sub-brands | Programme broken into 4 named parts |
| "Become a Sponsor" band | "Become a partner" band |
| Press & Media Center | "In Their Words" — see below |
| Footer + "Our Ecosystem" sibling brands | Same, LA Media + Build Right |
| Pages: Festival / Competitions / Winners / Highlights / Articles / About / Contact | Programme / Highlights / Network / Journal / About / Contact |

Nothing was copied from their design, copy, logo or photography.

## Two things deliberately NOT replicated
1. **The counter block.** FOAID shows Visitors / Iconic Projects / Speakers /
   Jury. We have no verified figures. That slot now carries qualitative,
   checkable facts (focus, base, flagship, partner). Numbers go in only when real.
2. **Competitions & Winners.** FOAID runs three award tracks. LA Media runs
   none. These pages do not exist rather than being scaffolded with fiction.

Also not replicated: their press wall (Forbes, CNBC, The Wire). LA Media has no
press. The "In Their Words" section uses the two real public posts about Design
Dialect instead, paraphrased, flagged as describing the *event* rather than LA
Media, and marked as needing the authors' permission.

## Routes
`/` · `/programme` · `/highlights` · `/network` · `/journal` · `/about` · `/contact`

Public pages sit in the `(site)` route group with shared header/footer.
`/admin` keeps its own layout and does not inherit the public chrome.

Every internal link resolves to a real route — verified. The old footer had
~24 links, all 404s.

## Still not verified
Dev server never run — no network in the build environment. Syntax parse of all
files passes with 0 errors. Run `npm run typecheck` first.
