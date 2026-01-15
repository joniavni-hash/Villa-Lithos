import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public/img';
const BACKUP_DIR = './public/img-backup';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function getImageFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(item.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    const stats = await stat(inputPath);
    const sizeBefore = stats.size;

    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const statsAfter = await stat(outputPath);
    const sizeAfter = statsAfter.size;

    const savings = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    console.log(`✓ ${basename(inputPath)}: ${(sizeBefore/1024/1024).toFixed(2)}MB → ${(sizeAfter/1024).toFixed(0)}KB (${savings}% smaller)`);

    return { inputPath, outputPath, sizeBefore, sizeAfter };
  } catch (err) {
    console.error(`✗ Failed: ${inputPath}`, err.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Compressing images to WebP...\n');

  const images = await getImageFiles(PUBLIC_DIR);
  console.log(`Found ${images.length} images to compress\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    const result = await compressImage(img);
    if (result) {
      totalBefore += result.sizeBefore;
      totalAfter += result.sizeAfter;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Total: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB`);
  console.log(`💾 Saved: ${((totalBefore - totalAfter)/1024/1024).toFixed(2)}MB (${((totalBefore - totalAfter)/totalBefore*100).toFixed(1)}%)`);
  console.log('\n⚠️  Remember to update image references from .jpg/.png to .webp');
}

main().catch(console.error);
