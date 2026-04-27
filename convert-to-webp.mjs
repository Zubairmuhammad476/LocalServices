// convert-to-webp.mjs
// Converts all PNG/JPG images in the public folder to WebP using sharp
// Run: node convert-to-webp.mjs

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = './public';
const QUALITY = 82; // good balance of quality vs file size

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function convertToWebP(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  // Skip if already converted
  if (existsSync(outputPath)) {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    if (outputStat.mtimeMs > inputStat.mtimeMs) {
      console.log(`  SKIP (already up-to-date): ${outputPath}`);
      return null;
    }
  }

  const inputStat = await stat(inputPath);
  await sharp(inputPath)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outputPath);
  
  const outputStat = await stat(outputPath);
  const saving = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
  const inputKB = (inputStat.size / 1024).toFixed(0);
  const outputKB = (outputStat.size / 1024).toFixed(0);

  console.log(`  ✅ ${basename(inputPath)} → ${basename(outputPath)} | ${inputKB}KB → ${outputKB}KB (${saving}% saved)`);
  return { input: inputStat.size, output: outputStat.size };
}

async function main() {
  console.log('🔄 Converting all images to WebP...\n');
  
  const images = await findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} image(s) to process:\n`);
  
  let totalInput = 0;
  let totalOutput = 0;
  let converted = 0;

  for (const imgPath of images) {
    const result = await convertToWebP(imgPath);
    if (result) {
      totalInput += result.input;
      totalOutput += result.output;
      converted++;
    }
  }

  if (converted > 0) {
    const totalSaving = ((1 - totalOutput / totalInput) * 100).toFixed(1);
    console.log(`\n🎉 Done! Converted ${converted} image(s)`);
    console.log(`📦 Total savings: ${(totalInput/1024).toFixed(0)}KB → ${(totalOutput/1024).toFixed(0)}KB (${totalSaving}% reduction)`);
  } else {
    console.log('\n✅ All images already up-to-date');
  }
}

main().catch(console.error);
