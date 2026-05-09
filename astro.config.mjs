import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://blackfenlittlelearners.co.uk',
  vite: {
    plugins: [tailwindcss()],
  },
});
