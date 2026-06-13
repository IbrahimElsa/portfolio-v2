import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await (await browser.newContext({
  viewport: { width: 1440, height: 900 },
})).newPage();

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

// boot sequence
await page.screenshot({ path: `${OUT}/0-boot.png` });
// let the boot finish
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/1-hero.png` });

const shots = [
  ["#skills", "2-skills"],
  ["#projects", "3-projects"],
  ["#lab", "4-lab"],
  ["#contact", "5-contact"],
];
for (const [sel, name] of shots) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

// hover states: a patch panel port and a drive bay
await page.locator("#projects a").first().scrollIntoViewIfNeeded();
await page.locator("#projects a").nth(1).hover();
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/6-bay-hover.png` });

// mobile pass
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3200);
await page.screenshot({ path: `${OUT}/7-mobile-hero.png` });
await page.locator("#lab").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/8-mobile-lab.png` });

console.log("console errors:", errors.length ? errors : "none");
await browser.close();
