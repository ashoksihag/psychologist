import { chromium } from "playwright";

const URL = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

const step = () => page.locator('[role="progressbar"]').getAttribute("aria-valuenow");

async function expectChecked(p, value) {
  const checked = await p.locator(`input[value="${value}"]`).isChecked();
  console.log(`  radio "${value}" checked: ${checked}`);
}

await page.goto(URL, { waitUntil: "networkidle" });

// --- Guard: Continue with empty fields must block and show errors
await page.getByRole("button", { name: /Continue/ }).click();
await page.waitForTimeout(400);
const blockedAt = await step();
const alertCount = await page.locator('[role="alert"]').count();
console.log(`empty submit -> step still ${blockedAt}, ${alertCount} error message(s)`);

// --- Step 1
await page.getByLabel(/Full name/).fill("Asha Rao");
await page.getByLabel(/Phone/).fill("9876543210");
await page.getByLabel(/Email/).fill("asha@example.com");
await page.getByRole("button", { name: /Continue/ }).click();
await page.waitForTimeout(400);
console.log(`after step 1 -> step ${await step()}`);

// --- Step 2 (Base UI selects)
await page.locator("#seekingSupportFor").click();
await page.waitForTimeout(250);
await page.getByRole("option", { name: "Myself (adult)" }).click();
await page.locator("#primaryConcern").click();
await page.waitForTimeout(250);
await page.getByRole("option", { name: /Anxiety, panic or worry/ }).click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: /Continue/ }).click();
await page.waitForTimeout(400);
console.log(`after step 2 -> step ${await step()}`);

// --- Step 3
// The radio itself is `sr-only` (1px, clipped) with a decorative span on top,
// so a real user clicks the wrapping <label>. Target that rather than the input.
await page.locator('label:has(input[value="online"])').click();
await expectChecked(page, "online");
await page.getByLabel(/Anything else/).fill("Mornings preferred.");
await page.waitForTimeout(150);
await page.getByRole("button", { name: /Send my request/ }).click();

// --- Outcome. Production confirms the send; a static preview confirms that it
// deliberately did NOT. Both are correct, so assert whichever the build implies.
const heading = page.locator("#consultation h3").first();
await heading.waitFor({ timeout: 15000 });
await page.waitForTimeout(400);
console.log(`after submit -> step ${await step()}`);

const outcome = (await heading.innerText()).trim();
const isPreview = /this is a preview/i.test(outcome);
console.log(`mode: ${isPreview ? "static preview (no send)" : "production (webhook)"}`);
console.log(`outcome heading: ${JSON.stringify(outcome)}`);

// The confirmation panel must summarise exactly what was entered, either way.
const summary = (await page.locator("#consultation dl").innerText()).replace(/\s+/g, " ");
console.log(`summary: ${summary}`);
if (!/Myself \(adult\)/.test(summary) || !/Anxiety/.test(summary)) {
  throw new Error(`summary did not echo the answers: ${summary}`);
}
if (!isPreview) {
  if (!/Thank you, Asha/.test(outcome)) {
    throw new Error(`expected the sent confirmation, got: ${outcome}`);
  }
} else {
  const panel = await page.locator("#consultation").innerText();
  if (!/has not been sent or stored anywhere/.test(panel)) {
    throw new Error("preview mode did not disclose that nothing was sent");
  }
}

await page.screenshot({ path: ".screenshots/desktop-consultation-outcome.png" });

console.log(`console errors during flow: ${errors.length}`);
for (const e of errors) console.log(`  [error] ${e.slice(0, 160)}`);

await browser.close();
