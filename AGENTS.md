# Kwarta (CASH: Financial Monitoring Application)

Personal finance tracker for Filipino users: accounts, transactions, transfers, categories, cashflow, savings, stocks and investment helpers. Built on the Devias "Material Kit React" template.

## Stack

- **Language / Runtime**: JavaScript (no TypeScript), React 18, Node
- **Framework**: Next.js 12, Pages Router (`src/pages`), PWA via `next-pwa`
- **Key dependencies**: MUI 5 + Emotion, Firebase 9 (Auth, Firestore, Storage), Zustand 4, SWR, Chart.js, Formik + Yup, react-hot-toast, react-joyride
- **Package manager**: npm (`package-lock.json`)

## Build approach

<TBD, set by /scope>

## Commands

```bash
# Install (Node 22, pinned in package.json engines for Vercel)
npm install

# Dev server
npm run dev

# Build
npm run build

# Lint (next lint, extends next/core-web-vitals)
npm run lint

# Test
# none, there is no test runner configured
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- Prettier: 4 space indent, single quotes (JSX too), semicolons, print width 120, no trailing commas.
- Imports may be absolute from `src` (`stores/...`, `components/...`, `hooks/...`) via `jsconfig.json` `baseUrl`; Firebase is imported relatively from root `firebase.config.js`.
- Pages that need the app shell set `Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>`.
- Firestore data flows: realtime `onSnapshot` listener hooks (`hooks/useGetUser*`, `stores/useAccountsListener.js`) push into Zustand stores; writes go through store actions, which also show `react-hot-toast` loading/success/error toasts.
- Firestore fields are snake_case (`user_id`, `account_amount`, `category_name`); every user owned doc carries `user_id`.
- UI text is bilingual (`en`, `ph`): add strings to `src/data/language-content.js` and read them with `getLanguage(currentLanguage)` from `useLanguageStore`.
- Styling is MUI `sx` and the theme in `src/theme/index.js`; avoid new CSS files.
- No env vars are needed: data lives in localStorage (`lib/localDb.js`) and market data in `data/market-snapshot.js`. `firebase.config.js` reads `NEXT_PUBLIC_*` Firebase keys but nothing imports it.

## Gotchas

- Real auth is Firebase via the persisted Zustand store `stores/useAuthStore.js` (localStorage key `auth`). `contexts/auth-context.js` and `lib/auth.js` (Zalter) are template leftovers, not wired in.
- Post login routing (survey, dashboard redirects) lives in `src/pages/_app.js`, not in `AuthGuard`.
- Next 12 does not build on Node 25+ (its bundled jsonwebtoken uses the removed `SlowBuffer`); build with Node 22, which is what Vercel uses via `engines`.
- `next build` runs ESLint and fails on lint errors, so run `npm run lint` before pushing.
- `package.json` still names the package `material-kit-react`; the README calls the app CASH.

## Context files

- [src/stores/AGENTS.md](src/stores/AGENTS.md): Zustand stores and the client side balance math for transactions and transfers

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
