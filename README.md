# Kwarta

Kwarta is a personal finance web app for tracking accounts, transactions, cash flow, savings, bonds, investments, and stocks. The UI is built with **Next.js 16** and **Material UI**; data and authentication use **Firebase** (Auth, Firestore, Storage). Market and news widgets are scraped via **Puppeteer** in Next.js Route Handlers (`/api/*`).

The product title shown in the app shell is **CASH: Financial Monitoring System**.

## Repository layout

| Directory | Purpose |
|-----------|---------|
| [`app/`](app/) | Next.js 16 App Router front end and `/api` scraping routes |
| [`docs/migration.md`](docs/migration.md) | Migration checklist and phase status |
| [`scraping-service/`](scraping-service/) | **Deprecated** — legacy Express scraper; use in-app `/api/*` instead |

## Prerequisites

- **Node.js 20.9+** (required for Next.js 16)
- A **Firebase** project with Authentication, Firestore, and Storage enabled
- **Chromium** for Puppeteer (installed automatically with `npm install` in `app/`)

## Web app (`app/`)

### Environment variables

Create `app/.env.local` with Firebase web app config:

- `NEXT_PUBLIC_API_KEY`
- `NEXT_PUBLIC_AUTH_DOMAIN`
- `NEXT_PUBLIC_PROJECT_ID`
- `NEXT_PUBLIC_STORAGE_BUCKET`
- `NEXT_PUBLIC_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_APP_ID`

Values come from Firebase console → Project settings → Your apps → Web app config.

**Optional — Zalter Identity**

- `NEXT_PUBLIC_ENABLE_ZALTER_AUTH` — set to `true` only if you use Zalter
- `NEXT_PUBLIC_ZALTER_PROJECT_ID` — Zalter project id when enabled

### Install and run

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production: `npm run build` && `npm start`.

### Scripts

- `npm run lint` — ESLint
- `npm test` — Jest unit tests

### Scraping API (in-app)

The app exposes server-side routes (no separate service required):

- `GET /api/inflation`
- `GET /api/investment`
- `GET /api/stocks`
- `GET /api/news`

## Typical local setup

1. In `app/.env.local`, set all Firebase `NEXT_PUBLIC_*` variables.
2. `cd app && npm run dev`.

## License

The `app/package.json` template is MIT-licensed (Material Kit React / Devias). See individual `package.json` files and third-party notices for full attribution.
