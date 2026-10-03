import type { NextConfig } from "next";

/**
 * Two deployment modes from one codebase.
 *
 * Default (server)  — `npm run build` / `npm start`
 *   A real Node server runs `app/api/lead/route.ts`, which validates a lead and
 *   forwards it to your automation webhook. This is how the site goes live.
 *
 * Preview (static)  — `npm run build:preview`
 *   `output: "export"` emits plain HTML/CSS/JS into `out/`, which can be served
 *   by GitHub Pages or any static host with no Node server at all.
 *
 * The trade-off: static hosts cannot execute a route handler, so the preview
 * build drops `app/api` entirely (scripts/build-preview.mjs) and the enquiry
 * form switches to preview mode instead of posting. The form still validates
 * and still renders its success state, so a client can review the whole flow —
 * but no enquiry is actually transmitted. Webhook credentials are never
 * involved, which is exactly what you want in a link you hand out.
 */
const isPreview = process.env.PREVIEW === "1";

/** e.g. "/psychologist" for a project Pages site, "" for a user/org site. */
const basePath = isPreview ? (process.env.GITHUB_BASE_PATH ?? "").replace(/\/$/, "") : "";

const nextConfig: NextConfig = {
  ...(isPreview
    ? {
        output: "export",
        // GitHub Pages serves directory index.html; trailing slashes keep URLs
        // matching the emitted folders.
        trailingSlash: true,
        basePath,
        // No Image Optimization server exists on a static host. Harmless here
        // because the site currently renders zero <img> tags, but it stops a
        // future photo from failing the export build.
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
