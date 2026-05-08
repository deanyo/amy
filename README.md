# Amy King — Childminding

Static site for Amy King's childminding business in Bexleyheath, UK.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), deployed via Cloudflare Pages.

## Local development

```sh
npm install
npm run dev
```

Site runs at http://localhost:4321

## Deploy

Connect this repo to Cloudflare Pages. Build settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20+

## Structure

```
src/
  layouts/Layout.astro     - Base HTML, fonts, header/footer
  components/              - Header, Footer, reusable bits
  pages/                   - One file per route
  styles/global.css        - Tailwind + custom tokens
```
