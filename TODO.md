# TODO

Living list of work for the Blackfen Little Learners site. Strike items off
in commits as they're done; add new ones at the bottom of each section.

---

## Blocked on Amy

These need real info from Amy before they can be done.

- [ ] **Real photography** — replace polaroid placeholders site-wide
  - Hero on `/` (purpose-built outbuilding)
  - Hero on `/setting/` (outbuilding wide shot)
  - Gallery grid on `/setting/` (6 tiles)
  - Portrait on `/about/`
  - Secondary peek-polaroid on `/` hero
- [ ] **Ofsted URN** — once registration confirmed, add to `/qualifications/` Ofsted callout and footer
- [ ] **Final hours / age range / availability** — confirm with Amy that home page cards still match
- [ ] **Real bio copy** for `/about/` (current is reasonable placeholder, but Amy should sign off)
- [ ] **Decide on rates / sessions** — currently no rates anywhere; should `/setting/` or a new section show indicative prices?

## Email follow-ups

- [ ] **Google Workspace (later)** — once Amy wants to *send* from `amy@blackfenlittlelearners.co.uk` (currently she can only receive via Cloudflare Email Routing), set up a Workspace mailbox. Not needed pre-launch

## SEO follow-ups (you-side, no code)

- [ ] **Google Search Console** — verify the domain (TXT record), submit `https://blackfenlittlelearners.co.uk/sitemap-index.xml`. Indexing typically within days
- [ ] **Bing Webmaster Tools** — same idea, free, takes 2 min
- [ ] **Google Business Profile** — *the* big SEO win for local childcare ("childminder near me" → Maps). Best done once Ofsted-registered so the URN can verify her as a real provider
- [ ] **Validate share previews** — once a deploy includes the new OG tags, drop `https://blackfenlittlelearners.co.uk` into Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/), Twitter's Card Validator, and the LinkedIn Post Inspector so each platform caches the preview

## Content polish

- [ ] **Privacy notice review** — current copy is placeholder. Walk through ICO's small-business guidance, fill in real details (controller name, retention periods, sub-processors used: Cloudflare + Resend). Update `last updated` date.
- [ ] **Terms / safeguarding policy page (optional)** — many childminders link to a brief policy doc; consider a `/policies/` page with PDFs once Amy's are written
- [ ] **About page tone pass** — re-read once Amy's seen it, adjust voice
- [ ] **Setting feature copy** — current 4 cards are educated guesses; tweak based on what's actually true

## Tech debt / improvements

- [ ] **Remove Resend error logging from prod (or scope it)** — `console.log(...)` in `functions/api/contact.ts` runs on every failure; fine while bedding in but clean up before high traffic
- [ ] **Form rate limiting** — currently anyone can hammer `/api/contact`. Add a simple Cloudflare rate-limit rule (free, 1 req/min per IP) when traffic warrants
- [ ] **Cloudflare Web Analytics** — free, privacy-friendly; just needs a snippet in `Layout.astro` once the site is public
- [ ] **Proper logo / favicon design pass** — current header glyph and favicon are a hand-drawn rainbow on a cream roundel, taking cues from Amy's social posts. Worth revisiting with a designer once Amy is open (logo will also be needed for printed materials, signage, name badges, registration paperwork). The SVG lives inline in `Header.astro` and at `public/favicon.svg`
- [ ] **Lighthouse pass** — already strong (static site, no JS) but worth verifying score before launch
- [ ] **Replace placeholder favicon** — current `L` glyph in lilac square; could be a custom mark once branding is settled

## Operations

- [ ] **Decide on staging strategy** — currently every push to `main` deploys to production. Consider:
  - Option A: keep flow simple, push to `main` ships
  - Option B: develop on a `dev` branch, merge PRs to `main` for production. Cloudflare Pages auto-deploys non-production branches as preview URLs
- [ ] **GitHub repo settings** — `deanyo/amy` is public, default; consider:
  - Branch protection on `main` (no force-push, optional review)
  - More descriptive repo name + description
- [ ] **Move Resend account ownership** — currently on `deanryanit@outlook.com`. Once Amy is up and running she should own the Resend account (or be set as a billing contact at minimum)

## Done

- [x] Astro 5 + Tailwind v4 scaffold
- [x] Lilac/cream design system, Fredoka + Inter typography
- [x] All pages: home, about, setting, qualifications, contact, thanks, privacy
- [x] Mobile responsive, polaroid image frames, pastel pill components
- [x] Playwright smoke tests (18/18 passing on desktop + mobile)
- [x] Chrome DevTools MCP for live verification
- [x] `.claude/settings.json` allowlist
- [x] Pushed to https://github.com/deanyo/amy
- [x] Cloudflare Pages project connected to Git → auto-deploys on push to `main`
- [x] Contact form Pages Function → Resend → email delivery confirmed end-to-end
- [x] CLAUDE.md and TODO.md
- [x] `/news/` page with embedded Facebook post + nav entry
- [x] Custom domain `blackfenlittlelearners.co.uk` registered at Gandi, DNS moved to Cloudflare, attached to Pages with SSL, www → apex redirect
- [x] Cloudflare Email Routing — `amy@…` and catch-all forward to Amy's Gmail
- [x] Resend domain verification — contact form sends from `enquiries@blackfenlittlelearners.co.uk` to `amy@blackfenlittlelearners.co.uk`
- [x] Footer + contact info refresh: real `amy@…` address, WhatsApp CTA, branded social pill icons (WA / FB / IG)
- [x] SEO pass: per-page descriptions, canonical URLs, Open Graph + Twitter Card tags with 1200×630 OG image, ChildCare JSON-LD on home, sitemap, robots.txt, `/thanks/` excluded from indexing
