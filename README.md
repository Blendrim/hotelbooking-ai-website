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

> The lead form posts to `/api/leads`. Under `npm run dev`/`preview` that route has no
> handler, so submissions show an honest error. To run the function locally, use
> `npx wrangler pages dev dist` after `npm run build`.

## Deployment — Cloudflare Pages

Connect this repository to Cloudflare Pages with:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Functions | auto-discovered from `functions/` |

SPA routing is handled by `public/_redirects` (`/* /index.html 200`). Pages Functions run
before the fallback, so `POST /api/leads` is served by `functions/api/leads.ts`.

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
