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

## Domain cutover (`blackfenlittlelearners.co.uk`)

Domain registered at Gandi. Plan: move DNS to Cloudflare, attach as
custom domain on Pages, then verify on Resend so form emails can come
from a real sender.

- [ ] **Add site to Cloudflare** (Cloudflare dashboard → Add a site → `blackfenlittlelearners.co.uk` → Free plan). Cloudflare gives two nameservers
- [ ] **Switch nameservers at Gandi** to the Cloudflare-supplied pair (Gandi → Domain → Nameservers → External). Propagation usually < 1 hour
- [ ] **Attach custom domain to Pages** — Pages → `blackfen-little-learners` → Custom domains → add `blackfenlittlelearners.co.uk` AND `www.blackfenlittlelearners.co.uk` (Cloudflare auto-creates the DNS records and SSL cert)
- [ ] **Verify domain on Resend** — Resend → Domains → Add domain → add the SPF/DKIM/return-path records to Cloudflare DNS
- [ ] **Switch contact recipient** — once Resend domain is verified, edit `wrangler.toml`:
  - `CONTACT_TO_EMAIL` → Amy's preferred address
  - `CONTACT_FROM_EMAIL` → `enquiries@blackfenlittlelearners.co.uk`
- [ ] **Email forwarding (optional)** — `hello@blackfenlittlelearners.co.uk` forwarding to Amy's inbox via Cloudflare Email Routing (free)
- [ ] **Update Footer email** — `Footer.astro` currently shows `mail@dnyo.co.uk`; swap to a `@blackfenlittlelearners.co.uk` address once Email Routing is set up

## Content polish

- [ ] **Privacy notice review** — current copy is placeholder. Walk through ICO's small-business guidance, fill in real details (controller name, retention periods, sub-processors used: Cloudflare + Resend). Update `last updated` date.
- [ ] **Terms / safeguarding policy page (optional)** — many childminders link to a brief policy doc; consider a `/policies/` page with PDFs once Amy's are written
- [ ] **About page tone pass** — re-read once Amy's seen it, adjust voice
- [ ] **Setting feature copy** — current 4 cards are educated guesses; tweak based on what's actually true

## Tech debt / improvements

- [ ] **Remove Resend error logging from prod (or scope it)** — `console.log(...)` in `functions/api/contact.ts` runs on every failure; fine while bedding in but clean up before high traffic
- [ ] **Form rate limiting** — currently anyone can hammer `/api/contact`. Add a simple Cloudflare rate-limit rule (free, 1 req/min per IP) when traffic warrants
- [ ] **Open Graph / Twitter card metadata** — for nice social previews when the URL is shared. Add to `Layout.astro`
- [ ] **Sitemap + robots.txt** — Astro has `@astrojs/sitemap` integration; one-liner to add
- [ ] **Cloudflare Web Analytics** — free, privacy-friendly; just needs a snippet in `Layout.astro` once the site is public
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
