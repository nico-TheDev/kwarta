# Next.js 14 → 16 migration checklist

Track progress for the Kwarta web app (`app/`).

## Environment

| Check | Status | Notes |
|-------|--------|-------|
| Node.js ≥ 20.9 | OK | Required for Next.js 16 |
| `npm ci` / `npm install` in `app/` | OK | Uses `legacy-peer-deps` via `.npmrc` |
| `npm test` | OK | 25 tests |
| `npm run build` | OK | Next.js 16.2.6, Turbopack |

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Baseline + docs | Done — `0442cf8` |
| 1 | Pre-upgrade cleanup | Done — `a013a42` |
| 2 | Next 15 + React 19 | Done (combined with 3) |
| 3 | Next 16 | Done |
| 4 | Companion library upgrades | Done (combined with 2–3) |
| 5 | Pages → App Router | Done |
| 6 | Scraping via `/api/*` only | Done |
| 7 | Final hardening | Done |

## Stack after migration

| Package | Version |
|---------|---------|
| next | ^16 |
| react / react-dom | ^19 |
| firebase | ^11 |
| puppeteer | ^24 |
| @mui/material | ^5.16 |

## App routes (App Router)

All former Pages Router paths now live under `app/src/app/`:

- Public: `/`, `/login`, `/register`, `/survey`
- Dashboard: `/dashboard`, `/accounts`, `/transactions`, `/stocks`, etc.
- API: `/api/inflation`, `/api/stocks`, `/api/news`, `/api/investment`

Redirects: `/sign-in` → `/login`, `/editSurvey` → `/edit-survey`.

## Notes

- `typescript.ignoreBuildErrors: true` in `next.config.js` until strict TS cleanup.
- `scraping-service/` is deprecated; scraping runs in Next Route Handlers.
- Removed Pages Router (`src/pages/`).
