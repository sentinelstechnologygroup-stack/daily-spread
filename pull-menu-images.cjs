const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const MENU_URL = "https://menu-13717.orderexperience.net/53d035ebf61e46461f212cab/menu/555c911da7f9094517fd08a1";
const OUT_DIR = "C:\\Users\\Patrick\\Projects\\Websites\\Daily-Spread\\dailyspread\\public\\images\\meals";

fs.mkdirSync(OUT_DIR, { recursive: true });

function download(url, filepath) {
  const client = url.startsWith("https") ? https : http;
  return new Promise((resolve, reject) => {
    client.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(new URL(res.headers.location, url).href, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

function safeName(url, index) {
  const u = new URL(url);
  let name = path.basename(u.pathname) || `meal-${index}.jpg`;
  name = name.replace(/[^\w.-]/g, "-");
  if (!/\.(png|jpg|jpeg|webp|gif)$/i.test(name)) name += ".jpg";
  return name;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const imageUrls = new Set();

  page.on("response", async response => {
    const url = response.url();
    const type = response.headers()["content-type"] || "";
    if (type.startsWith("image/") || /\.(png|jpg|jpeg|webp|gif)(\?|$)/i.test(url)) {
      imageUrls.add(url);
    }
  });

  await page.goto(MENU_URL, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(5000);

  const domImages = await page.evaluate(() => {
    const urls = [];
    document.querySelectorAll("img").forEach(img => {
      if (img.currentSrc) urls.push(img.currentSrc);
      if (img.src) urls.push(img.src);
    });
    document.querySelectorAll("[style]").forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      const match = bg && bg.match(/url\(["']?(.*?)["']?\)/);
      if (match) urls.push(match[1]);
    });
    return urls;
  });

  domImages.forEach(url => imageUrls.add(new URL(url, location.href).href));

  let index = 1;
  for (const url of imageUrls) {
    try {
      const filename = safeName(url, index);
      const filepath = path.join(OUT_DIR, filename);
      console.log(`Downloading ${url}`);
      await download(url, filepath);
      index++;
    } catch (err) {
      console.warn(`Skipped ${url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`Done. Downloaded ${index - 1} image(s) to ${OUT_DIR}`);
})();
