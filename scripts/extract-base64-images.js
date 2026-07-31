/**
 * Extrae imágenes base64 embebidas en index.html a assets/legacy/
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const legacyDir = path.join(root, 'assets', 'legacy');
let html = fs.readFileSync(htmlPath, 'utf8');

fs.mkdirSync(legacyDir, { recursive: true });

function saveDataUrl(dataUrl, basename) {
  const m = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/s);
  if (!m) return null;
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
  const file = `${basename}.${ext}`;
  const buf = Buffer.from(m[2], 'base64');
  fs.writeFileSync(path.join(legacyDir, file), buf);
  return { file, rel: `assets/legacy/${file}`, kb: (buf.length / 1024).toFixed(1) };
}

// 1. PILARICA_IMAGES block
const mapping = {};
const imgBlock = html.match(/const PILARICA_IMAGES = \{[\s\S]*?\};/);
if (imgBlock) {
  const re = /(img\d+):\s*"(data:image[^"]+)"/g;
  let match;
  while ((match = re.exec(imgBlock[0])) !== null) {
    const saved = saveDataUrl(match[2], `legacy-${match[1]}`);
    if (saved) {
      mapping[match[1]] = saved.rel;
      console.log(`PILARICA_IMAGES ${match[1]} -> ${saved.rel} (${saved.kb} KB)`);
    }
  }
}

const jsOut = `/** Legacy product fallbacks — extraído de index.html */\nconst PILARICA_IMAGES = ${JSON.stringify(mapping, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'js', 'pilarica-images.js'), jsOut);

// Remove PILARICA_IMAGES from index.html
html = html.replace(/const PILARICA_IMAGES = \{[\s\S]*?\};\n\n/, '');

// 2. Team mosaic inline images (about page)
let teamIdx = 0;
html = html.replace(/src="(data:image\/[^"]+)"/g, (full, dataUrl) => {
  if (!dataUrl.startsWith('data:image')) return full;
  teamIdx += 1;
  const saved = saveDataUrl(dataUrl, `legacy-team-${teamIdx}`);
  if (!saved) return full;
  console.log(`Inline team img ${teamIdx} -> ${saved.rel} (${saved.kb} KB)`);
  return `src="${saved.rel}"`;
});

fs.writeFileSync(htmlPath, html);
console.log('Done. index.html updated, pilarica-images.js created.');
