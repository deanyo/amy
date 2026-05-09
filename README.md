# Blackfen Little Learners

Marketing site for **Blackfen Little Learners**, Amy King's teacher-led
home childminding business in Blackfen (Bexley/Sidcup), southeast London.

- **Live:** [blackfenlittlelearners.co.uk](https://blackfenlittlelearners.co.uk)
- **Status:** pre-registration with Ofsted, aiming to open September

## Stack

- [Astro 5](https://astro.build) — static output
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting + auto-deploy from `main`
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) — `functions/api/contact.ts` handles the contact form
- [Resend](https://resend.com) — transactional email for contact-form submissions
- [Playwright](https://playwright.dev) — smoke tests (Chromium desktop + Pixel 7 mobile)

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static output → dist/
npm test             # Playwright smoke (auto-starts dev server)
```

To run the contact-form Pages Function locally:

```sh
echo 'RESEND_API_KEY="<key>"' > .dev.vars
npm run pages:dev
```

## Deployment

Every push to `main` triggers a Cloudflare Pages build (~30–60s warm cache).
Build settings live in the Cloudflare dashboard:

- Build command: `npm run build`
- Build output directory: `dist`

For ongoing context (design system, conventions, gotchas) see
[`CLAUDE.md`](./CLAUDE.md). Outstanding work lives in
[`TODO.md`](./TODO.md).

## Credits

Built by [Dean Ryan](https://www.linkedin.com/in/dean-ryan-yo/).
