# HotelBooking AI — Marketing Website

The public marketing website for **HotelBooking AI Platform** — the AI operating system
for hotels. This repository contains **only** the marketing site. It includes **no** private
SaaS platform code: no dashboard, no authentication, no tenant logic, no login, and no
backend/database configuration.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**, with a
same-origin lead API implemented as a **Cloudflare Pages Function**.

## Local setup

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

> The lead form posts to `/api/leads`. Under `npm run dev`/`preview` (Vite only) that route
> has no handler, so submissions show an honest error. To run the full Worker + assets model
> locally, use `npm run cf:dev` (`wrangler dev`) after `npm run build`.

## Deployment — Cloudflare Workers + Static Assets

Deployed as a single Cloudflare **Worker with Static Assets** (`wrangler deploy`), configured
in `wrangler.jsonc`:

- `worker/index.ts` serves `POST /api/leads`.
- Everything else is served from `./dist` as static assets, with native SPA fallback
  (`not_found_handling: "single-page-application"`) so direct navigation and refresh on any
  client route render via React Router. **No `_redirects` file is used** (it caused an
  infinite-loop error under Workers Static Assets).

| Cloudflare setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Output directory | `dist` |

Validate the config locally with `npm run cf:check` (`wrangler deploy --dry-run`).

### Environment variables

**Public (build-time, in `.env.production`):**

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `/api` |

**Server-side secrets (Cloudflare Pages → Settings → Environment variables — never `VITE_*`):**

| Secret | Purpose |
|---|---|
| `RESEND_API_KEY` | Email provider API key (lead delivery) |
| `LEADS_TO_EMAIL` | Destination mailbox (e.g. `sales@…`) |
| `LEADS_FROM_EMAIL` | Verified sender address |

If the email secrets are unset, leads are validated and logged (function logs) and the
response reports `delivered: false` — nothing is silently lost and nothing falsely claims
delivery. **Set these before real launch so leads are delivered.**

## Before launch (manual)

- Replace the placeholder domain/emails in `src/marketing/config/site.ts`, `public/robots.txt`,
  and `public/sitemap.xml`.
- Add real assets (logo, OG image at `/og-image.png`, product screenshots with fictional data).
- Legal review of the `/legal/*` placeholder pages.

## What this repo does NOT contain

The private HotelBooking SaaS platform (dashboard, auth, multi-tenant data, reservations,
CRM, OTA, AI receptionist, the .NET backend and database) lives in a separate, private
project and is **not** part of this repository.
