# LA Media & Communications

Next.js 16 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis · PostgreSQL + Prisma

## Setup

```bash
npm install
cp .env.example .env          # set DATABASE_URL + NEXTAUTH_SECRET
npx prisma migrate dev --name init
npm run dev
```

`DATABASE_URL` must be a **PostgreSQL** connection string. The datasource was
switched from SQLite; the old SQLite migration history has been deleted because
its `migration_lock.toml` pinned the provider and would refuse to run. The first
`migrate dev` recreates the history cleanly against Postgres.

## Routes

| Route | Notes |
|---|---|
| `/` | Home |
| `/about` | Panelists — roles and bios intentionally blank |
| `/what-we-do` | Capabilities, platforms, events |
| `/insights` | Press + articles hub. Server-rendered; filter is `?view=` |
| `/partner` | Brand and architect application flows |
| `/contact` | Enquiry form |
| `/register` | Event registration. Own layout, no site chrome |
| `/admin` | Auth-gated. Includes `/admin/registrations` |

## Content

**`lib/content.ts` is the single source of truth for editorial copy** — brand,
hero, stats, firms, event details and form options all live there.

## Images

Every image is a labelled `<Media>` placeholder that owns its aspect ratio, so
dropping a real asset in never shifts the layout. Pass `src` to replace one.
**The site cannot be judged on design until real photography is in** — this is an
editorial layout and the images carry it.

## Motion

`components/motion/Motion.tsx`. Lenis drives scroll and feeds ScrollTrigger via
`lenis.on("scroll", ScrollTrigger.update)` — without that, triggers fire at the
wrong offsets.

`Magnetic` and `HorizontalTrack` are desktop-only by design: they check for a
fine pointer and a ≥1024px viewport and no-op otherwise. Magnetic buttons drift
the tap target away from a thumb, and pinned horizontal scroll fights native
touch scrolling. On mobile those rows become ordinary swipeable overflow.

Everything is skipped under `prefers-reduced-motion`.

## Known gaps

- No real photography or video.
- No published articles; the Insights articles tab shows an empty state rather
  than fabricated headlines.
- No phone number, street address or social URLs in any source material.
- `npm run build` has not been run against this state — verify before deploying.
