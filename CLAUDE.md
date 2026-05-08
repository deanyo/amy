# Blackfen Little Learners — site

Static marketing site for **Blackfen Little Learners**, Amy King's teacher-led
home childminding business in Blackfen (Bexley/Sidcup), southeast London.
Owned by her brother (the user); Amy is non-technical.

Status: pre-registration with Ofsted, aiming to open September.

## Live deployment

- **Production:** https://blackfen-little-learners.pages.dev
- **GitHub:** https://github.com/deanyo/amy (public)
- **Auto-deploy:** every push to `main` triggers a Cloudflare Pages build (~30–60s warm cache)
- **Cloudflare project:** `blackfen-little-learners` (Git-connected)
- **Cloudflare account:** `deanryanit@outlook.com`

For ongoing TODOs and planned work see `TODO.md` — this file is for context
that helps a fresh session orient quickly.

## Stack

- **Astro 5** (static output) + **Tailwind CSS v4** via `@tailwindcss/vite`
- **Cloudflare Pages** for hosting (Git-connected to `deanyo/amy` `main`)
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
npm run pages:deploy   # manual direct upload (rarely needed; auto-deploy is preferred)
npm test               # Playwright smoke (auto-starts dev server)
```

## Design system

Tokens defined in `src/styles/global.css` as Tailwind v4 `@theme` variables.

- **Palette:** lilac primary (`--color-lilac-700` `#7d5cab`) on warm cream (`--color-cream-50` `#fdf8ec`); pastel accents `--color-rose-*`, `--color-sage-*`, `--color-sky-*`, `--color-sun-*`, `--color-peach-*`. Use named tokens, not raw Tailwind defaults.
- **Fonts:** **Fredoka** (headings, rounded/friendly) + **Inter** (body), loaded via Google Fonts in `Layout.astro`.
- **Components:** `.btn-primary`, `.btn-secondary`, `.card`, `.card-tinted`, `.eyebrow`, `.pill` (+ variants `pill-rose`, `pill-sage`, `pill-sky`, `pill-sun`, `pill-peach`), `.polaroid` (with `.polaroid-img` child), `.blob` (decorative), `.container-prose`, `.container-wide`. Prefer these over re-rolling.
- **Decorative motifs we use:** soft blurred pastel `.blob` shapes for section backgrounds (sparingly, 1–2 per section max), and `.polaroid` frames with subtle rotation for images.
- **Decorative motifs we deliberately don't use:** scrapbook overlays, washi tape, doodles, paper planes, AI cartoon illustrations. The original brief asked for them; we kept the brand premium instead.

## Layout

- `src/layouts/Layout.astro` is the only layout — every page wraps in it.
- `Header.astro` — separate desktop nav (md+) and mobile horizontal-scroll nav using shorter `link.short` labels. "Register interest" CTA on desktop only.
- `Footer.astro` — three columns: brand blurb, contact (phone + email + FB/IG pills), opening info. Privacy link in subfooter.

## Pages

- `/` (`index.astro`) — hero with pill badges + polaroid, about snippet, 6 practical info cards, setting preview, CTA
- `/about/` — bio, qualification pills, parent note card
- `/setting/` — outbuilding hero, 4 feature cards, 6-tile polaroid gallery
- `/qualifications/` — 7 credential cards, Ofsted-in-progress callout
- `/contact/` — phone-first contact details + enquiry form posting to `/api/contact` (handled by Pages Function); supports `?error=1` to show a banner
- `/thanks/` — post-submit thank-you page
- `/privacy/` — placeholder UK GDPR notice

## Contact form

- Form posts to `/api/contact` (Pages Function in `functions/api/contact.ts`)
- Function validates required fields, checks honeypot (`website` input), calls Resend, redirects to `/thanks/` on success or `/contact/?error=1` on failure
- Resend errors logged via `console.log` for diagnosis via `wrangler pages deployment tail <id>`

### Env vars / secrets

| Name | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Pages dashboard secret (encrypted) + local `.dev.vars` | Resend authentication |
| `CONTACT_TO_EMAIL` | `wrangler.toml` `[vars]` | Recipient. Currently `deanryanit@outlook.com` due to Resend sandbox |
| `CONTACT_FROM_EMAIL` | `wrangler.toml` `[vars]` | Sender. Currently `onboarding@resend.dev` (Resend's default test sender) |

**Important Resend sandbox limit:** while using `onboarding@resend.dev` as the
sender, emails can ONLY be delivered to the Resend account holder's email
(`deanryanit@outlook.com`). To deliver to any other address (e.g. Amy's),
verify a domain on Resend and update both env vars. See TODO.md.

### Local development of the function

```sh
echo 'RESEND_API_KEY="<key>"' > .dev.vars   # gitignored
npm run pages:dev                           # serves dist/ with the function bound
```

## Conventions

- All visible content is **placeholder** until Amy provides real copy/photos/Ofsted URN. Marked clearly in pages.
- Mobile-first: every change should look right at 375px before desktop.
- Hero/major-section h1/h2 use `text-balance` for cleaner wrapping.
- Astro's dev toolbar injects extra `<header>`/`<footer>` elements — Playwright locators must use `body > header`, not bare `header`.
- Don't commit `.dev.vars`. Don't commit secrets. Don't paste secrets in chat.
- npm has a known optional-deps bug with rolldown native bindings: if the build suddenly errors with `Cannot find module '@rolldown/binding-darwin-arm64'`, run `rm -rf node_modules package-lock.json && npm install`.

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

## Out of scope (for now)

- CMS / content editing UI — Amy edits via brother for now.
- Blog / news section.
- Booking / availability system.
- E-commerce — no payments through the site.
