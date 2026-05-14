# Deploying to Vercel

This project is a **TanStack Start SSR app** (not a static SPA). Routing,
deep links, and `/api/*` endpoints are all handled by a Node serverless
function on Vercel — there is no `index.html` fallback and you must not add
SPA-style "rewrite all routes to index.html" rules.

## How the build is wired

| File | Purpose |
| --- | --- |
| `vite.config.ts` | Disables the Cloudflare Workers plugin so the build emits a portable Node SSR bundle. |
| `dist/client/` | Static client assets (JS/CSS/images). Served directly by Vercel's CDN. |
| `dist/server/server.js` | SSR handler with a web-standard `fetch` export. |
| `api/index.mjs` | Vercel serverless function that adapts Node `req`/`res` ↔ web `Request`/`Response` and calls the SSR handler. |
| `vercel.json` | Tells Vercel the build command, the static output directory, and rewrites all unmatched routes to the SSR function. |

Static asset requests (anything that exists under `dist/client/`) are served
from the edge. Everything else — every page route, every `/api/*` server
route, every deep link — is rewritten to `/api/index` and rendered by the
SSR function. Refreshing `/about`, `/volunteer`, `/projects/foo`, etc. always
works, with zero 404s.

## One-time setup

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel (https://vercel.com/new).
3. Framework preset: **Other**. Vercel reads `vercel.json` and you do not
   need to override Build Command, Install Command, or Output Directory.
4. Add any required environment variables in Vercel → Settings → Environment
   Variables (`VITE_*` for the client; secrets for server functions).
5. Click **Deploy**.

## Local production test

```bash
bun install
bun run build
bunx vercel dev   # requires the Vercel CLI (one-time: bun add -g vercel)
```

Do **not** use `vite preview` to validate Vercel deployments — it serves
only the static client and cannot run the SSR function.

## Why no SPA rewrites?

A common Vercel guide says to "rewrite `/(.*)` to `/index.html`". That is
for pure client-rendered Vite + React Router apps. This project ships SSR
HTML on every request and does not produce an `index.html` at the root, so
that rewrite would 404 every page. The rewrite in `vercel.json` correctly
points at the SSR function instead.
