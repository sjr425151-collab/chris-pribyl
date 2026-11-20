/**
 * Browser QA for the production build.
 *
 *   npm run build && npx next start -p 3100 &
 *   BASE_URL=http://localhost:3100 node scripts/qa.mjs [--shots]
 *
 * Checks every route at phone and desktop widths for: console errors,
 * horizontal overflow, broken internal links, missing alt text, heading
 * order, and axe-core WCAG 2.2 AA violations. Writes screenshots to
 * qa-output/ with --shots.
 */
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// Playwright is resolved from the environment (not a project dependency).
const { chromium } = require("playwright");
const BASE = process.env.BASE_URL || "http://localhost:3100";
const SHOTS = process.argv.includes("--shots");
const START = process.env.START_PATH || "/";
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");

const viewports = {
  phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};

const browser = await chromium.launch();
const issues = [];
const seen = new Set([START]);
const queue = [START];
const linkStatus = new Map();

async function checkLink(href) {
  if (linkStatus.has(href)) return linkStatus.get(href);
  const res = await fetch(BASE + href, { redirect: "manual" });
  linkStatus.set(href, res.status);
  return res.status;
}

if (SHOTS) await mkdir("qa-output", { recursive: true });

while (queue.length) {
  const path = queue.shift();
  for (const [vpName, vp] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, ...vp });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    // Scroll through to trigger reveals and lazy images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const result = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
      const h1 = document.querySelectorAll("h1").length;
      const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1]));
      const skips = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1).length;
      const links = [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0]).filter(Boolean);
      const emptyLinks = [...document.querySelectorAll("a,button")].filter((el) => !(el.textContent?.trim() || el.getAttribute("aria-label"))).length;
      return { overflow, imgsNoAlt, h1, skips, links: [...new Set(links)], emptyLinks, title: document.title };
    });

    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () =>
      // eslint-disable-next-line no-undef
      (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } })).violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        n: v.nodes.length,
        target: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
      })),
    );

    const tag = `${vpName} ${path}`;
    if (errors.length) issues.push(`${tag}: console errors: ${errors.slice(0, 3).join(" | ")}`);
    if (result.overflow > 1) issues.push(`${tag}: horizontal overflow ${result.overflow}px`);
    if (result.imgsNoAlt) issues.push(`${tag}: ${result.imgsNoAlt} images without alt`);
    if (result.h1 !== 1) issues.push(`${tag}: ${result.h1} h1 elements`);
    if (result.skips) issues.push(`${tag}: ${result.skips} heading level skips`);
    if (result.emptyLinks) issues.push(`${tag}: ${result.emptyLinks} links/buttons without accessible name`);
    for (const v of axe) issues.push(`${tag}: axe ${v.id} (${v.impact}) x${v.n} ${v.target.join(", ")}`);

    if (vpName === "desktop") {
      for (const href of result.links) {
        const status = await checkLink(href);
        if (status >= 400) issues.push(`${path}: broken link ${href} (${status})`);
        if (!seen.has(href) && status === 200 && href.startsWith(START)) {
          seen.add(href);
          queue.push(href);
        }
      }
    }
    if (SHOTS) {
      const rel = path.slice(START.length).replace(/\/$/, "");
      const name = (rel ? rel.replace(/\//g, "_") : "home") + `-${vpName}`;
      await page.screenshot({ path: `qa-output/${name}.png`, fullPage: true });
    }
    console.log(`checked ${tag} — "${result.title}"`);
    await ctx.close();
  }
}

await browser.close();
console.log(`\n${seen.size} routes checked, ${issues.length} issue(s)`);
for (const i of issues) console.log(" - " + i);
process.exit(issues.length ? 1 : 0);
