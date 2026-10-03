/**
 * Builds a static preview into `out/` for GitHub Pages.
 *
 *   npm run build:preview
 *   GITHUB_BASE_PATH=/psychologist npm run build:preview   (matches CI)
 *
 * Why the api folder is moved aside instead of just configured away:
 * `output: "export"` fails the build on any Route Handler that reads a
 * Request, and Next has no flag to skip a route file. So the directory is
 * renamed for the duration of the build and always restored afterwards,
 * including when the build fails.
 */
import { spawn } from "node:child_process";
import { rename, writeFile, rm, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API_DIR = path.resolve("src/app/api");

// Must live OUTSIDE src/app. A stash folder named `api.__preview_stash__`
// would still sit under the router, and Next would try to export
// /api.__preview_stash__/lead as a route and fail again.
const STASH_ROOT = path.resolve(".preview-stash");
const API_STASH = path.join(STASH_ROOT, "api");

const OUT_DIR = path.resolve("out");

// `next dev` generates a TypeScript validator that imports the real route path.
// With the route moved, that stale file fails the build's type check, so the
// generated types are cleared first. Next regenerates them on the next
// `npm run dev` — nothing hand-written lives here.
const GENERATED_TYPES = path.resolve(".next/dev/types");

// Spawn Node with Next's CLI entry point directly. Going through `npx` would
// mean spawning a .cmd on Windows, which needs `shell: true` — and a shell
// concatenates arguments unescaped (see DEP0190). This path needs neither.
const NEXT_BIN = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

function run(args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { stdio: "inherit", env });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`next build exited with ${code}`)),
    );
  });
}

async function clearStaleTypes() {
  if (!existsSync(GENERATED_TYPES)) return;
  try {
    await rm(GENERATED_TYPES, { recursive: true, force: true });
    console.log("• Cleared stale generated types (.next/dev/types)");
  } catch (error) {
    console.warn(
      "• Could not clear .next/dev/types — a running `npm run dev` is probably\n" +
        "  holding it. Stop the dev server and run this again.",
    );
    console.warn(`  (${error.message})`);
  }
}

async function restoreApi() {
  if (existsSync(API_STASH) && !existsSync(API_DIR)) {
    await rename(API_STASH, API_DIR);
    await rm(STASH_ROOT, { recursive: true, force: true });
    console.log("• Restored src/app/api");
    return true;
  }
  return false;
}

const hasApi = existsSync(API_DIR);

const env = {
  ...process.env,
  PREVIEW: "1",
  NEXT_PUBLIC_PREVIEW: "1",
  GITHUB_BASE_PATH: process.env.GITHUB_BASE_PATH ?? "",
};

console.log(`\nBuilding static preview — base path: ${env.GITHUB_BASE_PATH || "(root)"}\n`);

let failure;
try {
  await clearStaleTypes();

  if (hasApi) {
    console.log("• Moving src/app/api aside (route handlers cannot be statically exported)");
    await mkdir(STASH_ROOT, { recursive: true });
    await rename(API_DIR, API_STASH);
  }

  try {
    await run([NEXT_BIN, "build"], env);
  } catch (error) {
    failure = error;
  } finally {
    await restoreApi();
  }

  if (!failure) {
    // GitHub Pages runs Jekyll by default, which silently drops any directory
    // starting with an underscore — including /_next. This file opts out.
    await writeFile(path.join(OUT_DIR, ".nojekyll"), "");
    console.log("• Wrote out/.nojekyll (stops Jekyll hiding /_next)");
    console.log("\nPreview ready in out/ — upload that folder to GitHub Pages.\n");
  }
} finally {
  // Belt and braces: never leave the working tree without its API route.
  await restoreApi();
}

if (failure) throw failure;