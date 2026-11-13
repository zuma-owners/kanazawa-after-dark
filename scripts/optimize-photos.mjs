// 取材写真を圧縮・リサイズして WebP にし、記事用フォルダへ入れる。
// 使い方: node scripts/optimize-photos.mjs <記事slug> <写真ファイル...>
// 例:     node scripts/optimize-photos.mjs bar-example "../kanazawa-night-memos/写真/IMG_0012.jpg"
// 出力:   src/assets/articles/<slug>/<元の名前>.webp（長辺1600px、位置情報などのメタデータは削除）
import { mkdirSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const [slug, ...files] = process.argv.slice(2);
if (!slug || files.length === 0) {
	console.error('usage: node scripts/optimize-photos.mjs <slug> <photo...>');
	process.exit(1);
}
const outDir = join('src', 'assets', 'articles', slug);
mkdirSync(outDir, { recursive: true });
for (const f of files) {
	const name = basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
	const out = join(outDir, `${name}.webp`);
	await sharp(f).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
	console.log(`${f} (${Math.round(statSync(f).size / 1024)}KB) -> ${out} (${Math.round(statSync(out).size / 1024)}KB)`);
}
