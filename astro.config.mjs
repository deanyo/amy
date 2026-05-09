import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blackfenlittlelearners.co.uk',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/thanks/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
