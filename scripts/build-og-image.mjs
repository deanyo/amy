import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Generate the Open Graph share image at public/og-image.jpg
//
// Layout (1200 x 630):
//   - Cream background (--color-cream-50: #fdf8ec)
//   - Amy's portrait, cover-fitted into a 540 x 630 panel on the right
//   - Brand wordmark + tagline on the left, in lilac
//
// Re-run with `node scripts/build-og-image.mjs` whenever the portrait
// or branding changes.

const WIDTH = 1200;
const HEIGHT = 630;
const PORTRAIT_W = 540;
const CREAM = '#fdf8ec';
const LILAC_900 = '#4a3470';
const LILAC_700 = '#7d5cab';
const INK_700 = '#3d3650';

const portraitPath = path.resolve('src/assets/photos/amy.jpg');
const outPath = path.resolve('public/og-image.jpg');

const portrait = await sharp(portraitPath)
  .resize(PORTRAIT_W, HEIGHT, { fit: 'cover', position: 'top' })
  .toBuffer();

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <style>
    .eyebrow { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; fill: ${LILAC_700}; }
    .title { font-family: 'Fredoka', 'Trebuchet MS', sans-serif; font-size: 76px; font-weight: 600; fill: ${LILAC_900}; }
    .tagline { font-family: 'Inter', system-ui, sans-serif; font-size: 28px; font-weight: 400; fill: ${INK_700}; }
    .url { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 500; fill: ${LILAC_700}; }
  </style>

  <!-- soft pastel blob accents -->
  <circle cx="80" cy="120" r="160" fill="#ebe0f5" opacity="0.6" />
  <circle cx="180" cy="560" r="110" fill="#fce4ec" opacity="0.5" />

  <text x="80" y="200" class="eyebrow">Teacher-led childminding</text>

  <text x="80" y="290" class="title">Blackfen</text>
  <text x="80" y="370" class="title">Little Learners</text>

  <text x="80" y="445" class="tagline">A warm, home-based setting</text>
  <text x="80" y="485" class="tagline">in southeast London.</text>

  <text x="80" y="570" class="url">blackfenlittlelearners.co.uk</text>
</svg>`;

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 3, background: CREAM },
})
  .composite([
    { input: Buffer.from(svg), top: 0, left: 0 },
    { input: portrait, top: 0, left: WIDTH - PORTRAIT_W },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath);

const stats = await fs.stat(outPath);
console.log(`Wrote ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
