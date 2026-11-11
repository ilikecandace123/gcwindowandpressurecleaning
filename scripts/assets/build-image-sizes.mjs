// Writes src/data/imageSizes.json: the pixel size of every photo in
// public/images. FullPhoto uses it to give each photo a frame of its own
// shape, so nothing is cropped and the page does not jump while it loads.
// Runs before every build (npm "prebuild"), so photos added later are picked up.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DIR = path.join(ROOT, "public/images");
const OUT = path.join(ROOT, "src/data/imageSizes.json");

function jpegSize(b) {
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    if (marker === 0xff) { i++; continue; }
    // SOF0-SOF15, except DHT (c4), JPG (c8) and DAC (cc), carry the size.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

function pngSize(b) {
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

function webpSize(b) {
  const kind = b.toString("ascii", 12, 16);
  if (kind === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (kind === "VP8L") {
    const n = b.readUInt32LE(21);
    return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1];
  }
  if (kind === "VP8X") return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
  return null;
}

export function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0xff && b[1] === 0xd8) return jpegSize(b);
  if (b.toString("ascii", 1, 4) === "PNG") return pngSize(b);
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return webpSize(b);
  return null;
}

export function readImageSizes() {
  const sizes = {};
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(jpe?g|png|webp)$/i.test(e.name)) {
        const size = imageSize(full);
        if (size) sizes["/" + path.relative(path.join(ROOT, "public"), full).split(path.sep).join("/")] = size;
      }
    }
  };
  walk(DIR);
  return sizes;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sizes = readImageSizes();
  fs.writeFileSync(OUT, JSON.stringify(sizes, null, 1).replace(/\[\n\s+(\d+),\n\s+(\d+)\n\s+\]/g, "[$1, $2]") + "\n");
  console.log(`imageSizes.json: ${Object.keys(sizes).length} photos`);
}
