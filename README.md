# Kwarta

Kwarta is a personal finance web app for tracking accounts, transactions, cash flow, savings, bonds, investments, and stocks. The UI is built with **Next.js** and **Material UI**; data and authentication use **Firebase** (Auth, Firestore, Storage). A small **Express** service scrapes public market and news data with **Puppeteer** for dashboard widgets (inflation, stocks, news).

The product title shown in the app shell is **CASH: Financial Monitoring System**.

## Repository layout

| Directory | Purpose |
|-----------|---------|
| [`app/`](app/) | Next.js 12 front end and API routes |
| [`scraping-service/`](scraping-service/) | Express API that exposes `/inflation`, `/stocks`, `/news`, and `/investment` |

## Prerequisites

- **Node.js** (LTS recommended; compatible with Next.js 12 and React 18)
- A **Firebase** project with Authentication, Firestore, and Storage enabled (for the web app)
- For scraping features called from the browser, the scraping service must be reachable from the client (see environment variables below). **Puppeteer** needs a working Chrome/Chromium install (the `app` package runs a `postinstall` script for Puppeteer).

## Web app (`app/`)

### Environment variables

Create `app/.env.local` (Next.js loads this automatically) with:

**Firebase (required for auth and data)**

- `NEXT_PUBLIC_API_KEY`
- `NEXT_PUBLIC_AUTH_DOMAIN`
- `NEXT_PUBLIC_PROJECT_ID`
- `NEXT_PUBLIC_STORAGE_BUCKET`
- `NEXT_PUBLIC_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_APP_ID`

Values come from the Firebase console → Project settings → Your apps → Web app config.

**Scraping API base URL (required for inflation / stocks / news panels that call the Express service from the browser)**

- `NEXT_PUBLIC_ENDPOINT` — e.g. `http://localhost:5000` in development (no trailing slash)

**Optional — Zalter Identity**

- `NEXT_PUBLIC_ENABLE_ZALTER_AUTH` — set to `true` only if you use Zalter
- `NEXT_PUBLIC_ZALTER_PROJECT_ID` — Zalter project id when enabled

### Install and run

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build` and `npm start` for a production build.

### Other scripts

- `npm run lint` — ESLint (Next.js config)
- `npm run export` — static export (if configured for your deployment)

## Scraping service (`scraping-service/`)

Express server (default port **5000**) that returns scraped JSON for:

- `GET /` — health-style message
- `GET /inflation`
- `GET /investment`
- `GET /stocks`
- `GET /news`

CORS is enabled for browser access from the Next.js origin.

### Environment

Copy `scraping-service/.env.sample` to `.env` if you add variables; the sample only sets `NODE_ENV`. Override the port with `PORT` if needed.

### Install and run

```bash
cd scraping-service
npm install
npm run dev
```

For production: `npm start`.

### Docker

A [`Dockerfile`](scraping-service/Dockerfile) is provided using the official Puppeteer base image for environments where installing Chrome is awkward.

## Typical local setup

1. Start the scraping API: `cd scraping-service && npm run dev` (listening on port 5000).
2. In `app/.env.local`, set `NEXT_PUBLIC_ENDPOINT=http://localhost:5000` and all Firebase `NEXT_PUBLIC_*` variables.
3. Start the app: `cd app && npm run dev`.

## License

The `app/package.json` template is MIT-licensed (Material Kit React / Devias). See individual `package.json` files and third-party notices for full attribution.
