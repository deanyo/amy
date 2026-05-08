# Blackfen Little Learners — site

Static marketing site for **Blackfen Little Learners**, Amy King's teacher-led
home childminding business in Blackfen (Bexley/Sidcup), southeast London.
Owned by her brother (the user); Amy is non-technical.

Status: pre-registration with Ofsted, aiming to open September.

## Stack

- **Astro 5** (static output) + **Tailwind CSS v4** via `@tailwindcss/vite`
- **Cloudflare Pages** for hosting (config present, repo not yet connected to dashboard)
- **Cloudflare Pages Functions** for the contact form (`functions/api/contact.ts`) — calls **Resend** for email
- **Playwright** smoke tests (Chromium only — desktop + Pixel 7 mobile)
- **Chrome DevTools MCP** for live browser verification during dev (user scope)

## Commands

```sh
npm install            # one-time / after dep changes
npm run dev            # http://localhost:4321
npm run build          # static output → dist/
npm run preview        # serve dist/ via astro preview
npm run pages:dev      # wrangler pages dev — runs build + serves dist/ with Functions
npm test               # Playwright smoke (auto-starts dev server)
```

## Design system

Tokens defined in `src/styles/global.css` as Tailwind v4 `@theme` variables.

- **Palette:** lilac primary (`--color-lilac-700` `#7d5cab`) on warm cream (`--color-cream-50` `#fdf8ec`); pastel accents `--color-rose-*`, `--color-sage-*`, `--color-sky-*`, `--color-sun-*`, `--color-peach-*`. Use named tokens, not raw Tailwind defaults.
- **Fonts:** **Fredoka** (headings, rounded/friendly) + **Inter** (body), loaded via Google Fonts in `Layout.astro`.
- **Components:** `.btn-primary`, `.btn-secondary`, `.card`, `.card-tinted`, `.eyebrow`, `.pill` (+ variants `pill-rose`, `pill-sage`, `pill-sky`, `pill-sun`, `pill-peach`), `.polaroid` (with `.polaroid-img` child), `.blob` (decorative), `.container-prose`, `.container-wide`. Prefer these over re-rolling.
- **Decorative motifs we use:** soft blurred pastel `.blob` shapes for section backgrounds (sparingly, 1–2 per section max), and `.polaroid` frames with subtle rotation for images.
- **Decorative motifs we deliberately don't use:** scrapbook overlays, washi tape, doodles, paper planes, AI cartoon illustrations. The brief asked for them; we kept the brand premium instead.

## Layout

- `src/layouts/Layout.astro` is the only layout — every page wraps in it.
- `Header.astro` — separate desktop nav (md+) and mobile horizontal-scroll nav using shorter `link.short` labels. "Register interest" CTA on desktop only.
- `Footer.astro` — three columns: brand blurb, contact (phone + email + FB/IG pills), opening info. Privacy link in subfooter.

## Pages

- `/` (`index.astro`) — hero with pill badges + polaroid, about snippet, 6 practical info cards, setting preview, CTA
- `/about/` — bio, qualification pills, parent note card
- `/setting/` — outbuilding hero, 4 feature cards, 6-tile polaroid gallery. **Replaces the old `/services/` page** (rates and sessions removed; not how she's pricing)
- `/qualifications/` — 7 credential cards, Ofsted-in-progress callout
- `/contact/` — phone-first contact details + enquiry form posting to `/api/contact` (handled by Pages Function)
- `/privacy/` — placeholder UK GDPR notice
- `/thanks/` — post-submit thank-you page

## Contact form

- Form posts to `/api/contact` (Pages Function in `functions/api/contact.ts`)
- Function validates required fields, checks honeypot, calls Resend, redirects to `/thanks/`
- **Required env var:** `RESEND_API_KEY` (set in Cloudflare Pages dashboard → Settings → Environment variables)
- **Recipient:** `mail@dnyo.co.uk` (placeholder — change to Amy's address before launch)

## Conventions

- All visible content is **placeholder** until Amy provides real copy/photos/Ofsted URN. Marked clearly in pages.
- Mobile-first: every change should look right at 375px before desktop.
- Hero/major-section h1/h2 use `text-balance` for cleaner wrapping.
- Astro's dev toolbar injects extra `<header>`/`<footer>` elements — Playwright locators must use `body > header`, not bare `header`.

## Brand facts (from her social posts)

- **Name:** Blackfen Little Learners
- **Phone:** 07933 177 062
- **Facebook:** `@Blackfen Little Learners`
- **Instagram:** `@blackfenlittlelearners`
- **Hours:** Mon–Fri, 8:00am–5:30pm, term time only
- **Funding:** government funding accepted
- **Meals:** healthy meals & snacks provided
- **Setting:** purpose-built outbuilding in family garden
- **Lead:** qualified primary school teacher with extensive Early Years experience
- **Status:** pre-registration with Ofsted, aiming to open September

## Deferred work

1. **Real photography** — outbuilding (exterior + interior), playroom details, portrait of Amy, gallery shots. Replace placeholders in `index.astro`, `setting.astro`, `about.astro`. Amy is at work; pending image files.
2. **Cloudflare Pages dashboard wiring** — interactive: connect `deanyo/amy` repo, set build cmd `npm run build`, output `dist`, attach .co.uk domain, set `RESEND_API_KEY` env var.
3. **Resend signup** — free tier; create API key; set as Pages env var.
4. **Ofsted URN, real qualifications dates** — once registration is confirmed.
5. **Privacy notice review** — placeholder copy needs a proper UK GDPR pass before launch.
6. **Domain decision** — Amy hasn't picked one; Gandi.net was the suggested registrar.

## Out of scope (for now)

- CMS / content editing UI — Amy edits via brother for now.
- Blog / news section.
- Booking / availability system.
- Analytics — Cloudflare Web Analytics is the obvious choice when it goes live.
