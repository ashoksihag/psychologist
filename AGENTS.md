<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Browser verification

Always verify in **Microsoft Edge** via Playwright's `msedge` channel. Never use
the default browser or a Playwright-managed Chromium build. The `tabbit-cli`
tool cannot target Edge — its registry only accepts Tabbit-branded products.

    npm run verify              # section + full-page screenshots, console errors
    npm run verify -- --desktop --mobile
    npm run verify:form         # end-to-end multi-step form run

Output lands in `.screenshots/` (git-ignored) with a `report.json`.
Scripts live in `scripts/verify.mjs` and `scripts/verify-form.mjs`; both launch
`chromium.launch({ channel: "msedge" })`. Pass a URL as the first argument
(defaults to `http://localhost:3000`).

