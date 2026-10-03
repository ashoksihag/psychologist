/**
 * Serves the exported `out/` folder the same way GitHub Pages will, so you can
 * check a preview locally before pushing.
 *
 *   npm run build:preview
 *   npm run preview:serve           # -> http://localhost:8080/psychologist/
 *
 * Mounts `out/` under /<basePath> (default /psychologist) to prove the base
 * path is right, serves 404.html for unknown paths, and reads no env vars —
 * the export contains no server secrets.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("out");
const PORT = Number(process.env.PREVIEW_PORT ?? 8080);
const BASE = (process.env.GITHUB_BASE_PATH ?? "/psychologist").replace(/\/$/, "");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
};

/** Returns the resolved file on disk, or null if it does not exist. */
async function resolvePath(urlPath) {
  // The site only exists under the base path. Serving it at "/" too would let
  // a broken basePath pass local testing while 404ing on the real host.
  if (BASE) {
    if (urlPath !== BASE && !urlPath.startsWith(`${BASE}/`)) return null;
  }

  let rel = urlPath;
  if (BASE && rel.startsWith(BASE)) rel = rel.slice(BASE.length);
  rel = decodeURIComponent(rel).replace(/^\/+/, "");
  if (rel.includes("..")) return null;

  let target = path.join(OUT_DIR, rel);
  if (!target.startsWith(OUT_DIR)) return null;

  try {
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, "index.html");
  } catch {
    // Allow extensionless URLs to resolve to index.html, as static hosts do.
    if (!path.extname(target)) target = path.join(target, "index.html");
  }

  try {
    await stat(target);
    return target;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0];

  let file = await resolvePath(urlPath);
  let status = 200;

  if (!file) {
    file = await resolvePath("/404.html");
    status = 404;
  }

  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Not found");
  }

  // Content-Type must come from the resolved file, not the request URL:
  // "/psychologist/" has no extension but must still serve text/html.
  const ext = path.extname(file);
  res.writeHead(status, { "Content-Type": TYPES[ext] ?? "application/octet-stream" });
  res.end(await readFile(file));
}).listen(PORT, () => {
  console.log(`\nServing out/ at http://localhost:${PORT}${BASE}/`);
  console.log(`Wrong paths return the real 404.html, as Pages does.\n`);
});