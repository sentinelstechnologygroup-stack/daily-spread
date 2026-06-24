import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, "public", "images");
const OUTPUT_DIR = path.join(ROOT, "src", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "gallery.js");
const ALLOWED_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const SKIP_FOLDERS = new Set(["logos", "logo", "icons", "favicons", "favicon", "backgrounds"]);

function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function altFromFilename(fileName, category) {
  const baseName = path.basename(fileName, path.extname(fileName));
  return `Daily Spread ${category} - ${toTitleCase(baseName)}`;
}

function categoryFromFolder(folderName) {
  return toTitleCase(folderName);
}

if (!fs.existsSync(IMAGE_ROOT)) {
  console.error(`Missing image folder: ${IMAGE_ROOT}`);
  process.exit(1);
}

const categories = fs
  .readdirSync(IMAGE_ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !SKIP_FOLDERS.has(name.toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

const images = [];

for (const folder of categories) {
  const category = categoryFromFolder(folder);
  const folderPath = path.join(IMAGE_ROOT, folder);

  const files = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  for (const file of files) {
    images.push({
      src: `/images/${folder}/${file}`,
      category,
      alt: altFromFilename(file, category),
    });
  }
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const output = `// AUTO-GENERATED FILE. DO NOT EDIT BY HAND.\n// To update this file, add images to public/images/<category>/ and run: npm run gallery\n\nconst galleryImages = ${JSON.stringify(images, null, 2)};\n\nexport default galleryImages;\n`;

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Gallery generated: ${images.length} images across ${categories.length} categories.`);
console.log(`Output: ${path.relative(ROOT, OUTPUT_FILE)}`);
