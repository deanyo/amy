import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Generate the Open Graph share image at public/og-image.jpg
//
// Layout (1200 x 630):
//   - Cream background (--color-cream-50: #fdf8ec)
//   - Centred brand wordmark, eyebrow, tagline, and URL in lilac/ink
//   - Soft pastel blob accents in the corners
//
// Re-run with `node scripts/build-og-image.mjs` whenever branding changes.

const WIDTH = 1200;
const HEIGHT = 630;
const CREAM = '#fdf8ec';
const LILAC_900 = '#4a3470';
const LILAC_700 = '#7d5cab';
const INK_700 = '#3d3650';

const outPath = path.resolve('public/og-image.jpg');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <style>
    .eyebrow { font-family: 'Inter', system-ui, sans-serif; font-size: 26px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; fill: ${LILAC_700}; text-anchor: middle; }
    .title { font-family: 'Fredoka', 'Trebuchet MS', sans-serif; font-size: 104px; font-weight: 600; fill: ${LILAC_900}; text-anchor: middle; }
    .tagline { font-family: 'Inter', system-ui, sans-serif; font-size: 30px; font-weight: 400; fill: ${INK_700}; text-anchor: middle; }
    .url { font-family: 'Inter', system-ui, sans-serif; font-size: 24px; font-weight: 500; fill: ${LILAC_700}; text-anchor: middle; }
  </style>

  <!-- soft pastel blob accents -->
  <circle cx="120" cy="120" r="180" fill="#ebe0f5" opacity="0.6" />
  <circle cx="1080" cy="510" r="160" fill="#fce4ec" opacity="0.55" />
  <circle cx="1050" cy="100" r="90" fill="#e6f0e4" opacity="0.55" />
  <circle cx="160" cy="540" r="110" fill="#fff1d6" opacity="0.6" />

  <text x="600" y="170" class="eyebrow">Teacher-led childminding</text>

  <text x="600" y="290" class="title">Blackfen</text>
  <text x="600" y="400" class="title">Little Learners</text>

  <text x="600" y="475" class="tagline">A warm, home-based setting in southeast London.</text>

  <text x="600" y="570" class="url">blackfenlittlelearners.co.uk</text>
</svg>`;

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 3, background: CREAM },
})
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath);

const stats = await fs.stat(outPath);
console.log(`Wrote ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
