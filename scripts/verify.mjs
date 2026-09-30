/**
 * Edge-only visual + console verification.
 *
 * Always drives Microsoft Edge via Playwright's `msedge` channel, never the
 * default browser and never a Playwright-managed Chromium download. Requires a
 * local Microsoft Edge install; it is not downloaded automatically.
 *
 *   node scripts/verify.mjs http://localhost:3000
 *   node scripts/verify.mjs http://localhost:3000 --desktop --mobile
 */
import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.argv[2] ?? "http://localhost:3000";
const OUT_DIR = path.resolve(".screenshots");

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, name: "desktop" },
  mobile: { ...devices["Pixel 7"], name: "mobile" },
};

const requested = process.argv
  .slice(3)
  .map((arg) => arg.replace(/^--/, ""))
  .filter(Boolean);
const unknown = requested.filter((n) => !VIEWPORTS[n]);
if (unknown.length > 0) {
  console.error(
    `Unknown viewport(s): ${unknown.join(", ")}. Use: ${Object.keys(VIEWPORTS).join(", ")}`,
  );
  process.exit(2);
}
const targets = requested.length > 0 ? requested.map((n) => VIEWPORTS[n]) : [VIEWPORTS.desktop];

const SECTIONS = [
  "top",
  "pathways",
  "about",
  "services",
  "workplaces",
  "testimonials",
  "consultation",
  "faqs",
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
const report = { baseUrl: BASE_URL, browser: "msedge", viewports: [], failures: [] };

for (const target of targets) {
  const context = await browser.newContext(target);
  const page = await context.newPage();

  const console_ = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      console_.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on("pageerror", (err) => console_.push({ type: "pageerror", text: String(err) }));

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Section captures
  for (const id of SECTIONS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await el.screenshot({ path: path.join(OUT_DIR, `${target.name}-${id}.png`) });
  }

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT_DIR, `${target.name}-full.png`), fullPage: true });

  report.viewports.push({
    name: target.name,
    viewport: target.viewport ?? null,
    screenshots: SECTIONS.length + 1,
    consoleMessages: console_,
  });

  if (console_.length > 0) report.failures.push(`${target.name}: ${console_.length} console message(s)`);

  await context.close();
}

await browser.close();

await writeFile(
  path.join(OUT_DIR, "report.json"),
  JSON.stringify(report, null, 2),
);

console.log(`Edge verification complete -> ${OUT_DIR}`);
for (const v of report.viewports) {
  console.log(
    `  ${v.name}: ${v.screenshots} screenshots, ${v.consoleMessages.length} console error/warning(s)`,
  );
  for (const m of v.consoleMessages) console.log(`    [${m.type}] ${m.text.slice(0, 200)}`);
}
if (report.failures.length > 0) {
  console.log("\nConsole issues found - see report.json");
  process.exitCode = 1;
}
