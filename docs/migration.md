# Next.js 14 → 16 migration checklist

Track progress for the Kwarta web app (`app/`). Each phase is committed separately after review.

## Environment

| Check | Status | Notes |
|-------|--------|-------|
| Node.js ≥ 20.9 (Next 16 target) | OK | Baseline run: v23.6.0 (recommend LTS 20.x or 22.x for production) |
| `npm ci` in `app/` | OK | Phase 0 |
| `npm test` in `app/` | OK | 5 suites, 25 tests passed (Phase 0) |
| `npm run build` in `app/` | **FAIL** | Compiles; fails at ESLint step (see below) |

## Phase status

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Baseline + docs | In review |
| 1 | Pre-upgrade cleanup (deps, js/ts dedupe) | Pending |
| 2 | Next 15 + React 19 | Pending |
| 3 | Next 16 | Pending |
| 4 | Companion libraries (Firebase, Puppeteer, etc.) | Pending |
| 5 | Pages → App Router (4 batches) | Pending |
| 6 | Puppeteer deploy / API consistency | Pending |
| 7 | Final hardening | Pending |

## Baseline build failure (Phase 0)

`next build` on **Next.js 14.2.35** compiles successfully then fails during **lint**. Representative ESLint **errors** (warnings excluded):

- `react/jsx-key` — missing keys in iterators (`balance`, `CategoryCardList`, `articles-card`, etc.)
- `@next/next/no-img-element` — raw `<img>` in several components and pages
- `react/no-unescaped-entities` — apostrophes in JSX text
- `useUploadImage.js` — parsing error (invalid syntax)

Many issues exist in **both** `.js` and `.tsx` duplicates; Phase 1 dedupe should fix each once in the canonical `.tsx` file.

**Mitigation options (later phases):** fix errors incrementally in Phase 1, or temporarily set `eslint.ignoreDuringBuilds: true` in `next.config.js` only if we need a green build before lint cleanup (not done in Phase 0).

## Routing inventory

### App Router (`app/src/app/`)

- `/` — landing
- `/login`, `/register`, `/survey` — auth
- `/dashboard` — dashboard
- `/api/inflation`, `/api/stocks`, `/api/news`, `/api/investment` — Puppeteer scrapers

### Pages Router (`app/src/pages/`) — to migrate in Phase 5

- Accounts, transactions, transfers, categories, cashflow
- Stocks, investments, bonds, savings, offers
- Settings, profile, users, articles, achievements
- Sign-in, editSurvey, 404

## Library versions (baseline)

| Package | Version |
|---------|---------|
| next | ^14.2.0 (resolved 14.2.35) |
| react / react-dom | 18.2.0 |
| firebase | ^9.14.0 |
| puppeteer | ^19.9.1 |
| @mui/material | ^5.10.5 |

## Code debt notes

- ~94 basename pairs with both `.js` and `.ts`/`.tsx` under `app/src/`
- `next-pwa` in package.json but not configured in `next.config.js`
- `next export` script is deprecated for App Router deployments

## Env vars (unchanged)

See [README.md](../README.md) — Firebase `NEXT_PUBLIC_*`, optional `NEXT_PUBLIC_ENDPOINT` for scraping-service.
