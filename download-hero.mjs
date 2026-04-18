/**
 * download-hero.mjs
 * Downloads the hero background from Unsplash, resizes to 1200px,
 * converts to WebP at quality 75, and saves to /public/assets/images/homepage/hero.webp
 * Target file size: < 100KB for optimal LCP
 */
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { get } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_URL =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90';

const OUT_DIR = join(__dirname, 'public', 'assets', 'images', 'homepage');
const OUT_PATH = join(OUT_DIR, 'hero.webp');
const TMP_PATH = join(OUT_DIR, 'hero_raw.jpg');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

console.log('⬇  Downloading hero image from Unsplash...');

const download = (url, dest) =>
  new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      // Follow redirect
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });

await download(SOURCE_URL, TMP_PATH);
console.log('✅  Downloaded raw image.');

console.log('🔄  Converting to WebP (1200px wide, q75)...');
await sharp(TMP_PATH)
  .resize({ width: 1200, height: 675, fit: 'cover', position: 'centre' })
  .webp({ quality: 75, effort: 6 })
  .toFile(OUT_PATH);

// Clean up temp jpeg
import { unlinkSync, statSync } from 'fs';
unlinkSync(TMP_PATH);

const size = statSync(OUT_PATH).size;
const kb = (size / 1024).toFixed(1);
console.log(`✅  Saved hero.webp => ${OUT_PATH}`);
console.log(`📦  File size: ${kb} KB ${parseFloat(kb) < 100 ? '✅ (< 100KB target met)' : '⚠️  (> 100KB — try lower quality)'}`);
