// 既定のOGP画像（src/assets/og-default.png）を作り直すスクリプト：node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><radialGradient id="g" cx="78%" cy="28%" r="45%"><stop offset="0" stop-color="#4a3a22"/><stop offset="1" stop-color="#0e1320" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="#0e1320"/><rect width="1200" height="630" fill="url(#g)"/>
<path fill="#e6a85c" transform="translate(905 120) scale(5.2)" d="M19 5a11 11 0 1 0 8.4 18.1A9.3 9.3 0 0 1 19 5Z"/>
<text x="90" y="330" font-family="Georgia, serif" font-size="84" font-weight="700" fill="#f6f1e7">Kanazawa After Dark</text>
<text x="92" y="405" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#a9afbd">English-friendly bars &amp; izakaya, from a local</text>
<rect x="92" y="450" width="90" height="5" fill="#e6a85c"/></svg>`;
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('src/assets/og-default.png');
console.log('src/assets/og-default.png');
