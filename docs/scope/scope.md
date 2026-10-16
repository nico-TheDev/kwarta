# Scope: Kwarta (CASH)

A personal finance tracker for Filipino users. You track accounts, transactions, transfers and categories, see your cashflow, and get help with savings, stocks, bonds and investments, in English or Filipino.

**Current goal:** a local only demo mode that showcases every feature with no Firebase, no keys and no server. Data lives in the visitor's browser, starts from sample data, and market data comes from a saved snapshot.

**Build approach:** Tracer Bullet (move one feature end to end at a time, through data, store and UI, so the app keeps working between steps).
**Workflow:** Alpha (after `/develop`, run `/check verify`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· GA`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Landing page | Existing | existing |
| 2 | Email and password sign in | Existing | existing |
| 3 | Google sign in | Existing | existing |
| 4 | Onboarding survey | Existing | existing |
| 5 | Edit survey | Existing | existing |
| 6 | Profile | Existing | existing |
| 7 | Accounts | Existing | existing |
| 8 | Categories | Existing | existing |
| 9 | Transactions | Existing | existing |
| 10 | Transfers | Existing | existing |
| 11 | Dashboard | Existing | existing |
| 12 | Cashflow | Existing | existing |
| 13 | Savings suggestions and offers | Existing | existing |
| 14 | Investment calculator | Existing | existing |
| 15 | Stocks and lot calculator | Existing | existing |
| 16 | Bonds calculator | Existing | existing |
| 17 | Articles | Existing | existing |
| 18 | Guided tours | Existing | existing |
| 19 | Bilingual UI (English, Filipino) | Existing | existing |
| 20 | Market data scrapers | Existing | existing |
| 21 | Settings | Existing | in-progress |
| 22 | Achievements | Existing | in-progress |
| 23 | Installable app (PWA) | Existing | in-progress |
| 24 | Modernization stack & architecture | Foundation | dropped |
| 25 | Local data layer | Foundation | in-progress |
| 26 | Demo sample data and reset | Foundation | planned |
| 27 | Demo sign in and onboarding | Slice 1 | planned |
| 28 | Local accounts and categories | Slice 1 | planned |
| 29 | Local transactions | Slice 1 | planned |
| 30 | Local transfers | Slice 2 | planned |
| 31 | Local receipt photos | Slice 2 | planned |
| 32 | Market data snapshot | Slice 3 | planned |
| 33 | Remove Firebase and template leftovers | Slice 3 | planned |
| 34 | Static demo deploy | Slice 3 | planned |

## Existing features

What the app does today, enrolled for context before the rework. `existing` means it predates this workflow, so `/develop` and `/sync` leave these rows alone.

### 1. Landing page · existing
Public marketing page with a call to register.
code in `src/pages/index.js`, `src/components/layout/nav/`

### 2. Email and password sign in · existing
Register, log in and log out with Firebase Auth; creates the `users` doc; the session persists in localStorage (`auth`). After login, `_app.js` sends you to the survey or the dashboard.
code in `src/pages/login.js`, `src/pages/register.js`, `src/stores/useAuthStore.js`, `src/pages/_app.js`

### 3. Google sign in · existing
One click sign in with a Google popup, sharing the same user doc and post login routing.
code in `src/stores/useAuthStore.js` (`loginWithGoogle`)

### 4. Onboarding survey · existing
First run survey: pick a language, accept data privacy, answer profile questions and pick expense categories.
code in `src/pages/survey.js`, `src/components/SurveyBlock.js`, `src/hooks/useGetUserSurvey.js`

### 5. Edit survey · existing
Change your survey answers later.
code in `src/pages/editSurvey.js`, `src/components/account/account-survey-details.js`

### 6. Profile · existing
View and update your name and details, and see your survey answers.
code in `src/pages/profile.js`, `src/components/account/`

### 7. Accounts · existing
Create and manage money accounts (banks, ewallets, cash) with Philippine bank logos, a list view and a detail page. Balances update live from Firestore.
code in `src/pages/accounts/`, `src/components/accounts/`, `src/stores/useAccountStore.js`, `src/stores/useAccountsListener.js`

### 8. Categories · existing
Income and expense categories with icon and color, seeded from premade categories, with a list and a detail page.
code in `src/pages/categories/`, `src/components/categories/`, `src/stores/useCategoryStore.js`, `src/data/categories.js`

### 9. Transactions · existing
Record income, expense, savings and investment entries against an account, with an optional receipt photo. The list filters by account, category and type and groups by year, month or day. Each entry adjusts the account balance on the client.
code in `src/pages/transactions/`, `src/stores/useTransactionStore.js`, `src/hooks/useGetUserTransactions.js`, `src/hooks/useUploadImage.js`

### 10. Transfers · existing
Move money between two of your accounts, with list and detail pages and an optional photo.
code in `src/pages/transfers/`, `src/components/transfers/`, `src/stores/useTransferStore.js`

### 11. Dashboard · existing
Home after login: total balance, income, expenses, cashflow, expense chart, recent transactions, savings and investment panels, PH inflation, and market news.
code in `src/pages/dashboard.js`, `src/components/dashboard/`, `src/components/news-panel.js`

### 12. Cashflow · existing
Income vs expense charts and an expense by type breakdown.
code in `src/pages/cashflow/`, `src/components/ExpenseTypeChart.js`

### 13. Savings suggestions and offers · existing
Pick an account and see which bank savings products (BDO, Metrobank, BPI, Landbank, Security Bank) its balance qualifies for; an offers page compares the rate tables. Rates are hardcoded.
code in `src/pages/savings/`, `src/pages/offers.js`, `src/components/savings/`, `src/data/savings.js`

### 14. Investment calculator · existing
Project how a deposit grows over time from a chosen account, with a year by year table and a details page.
code in `src/pages/investments/`, `src/components/investment-table.js`, `src/utils/create-table.js`

### 15. Stocks and lot calculator · existing
Trending stocks and market movers plus market news, and a calculator that checks PSE board lot sizes for a budget.
code in `src/pages/stocks/`, `src/hooks/swr/useStocks.js`

### 16. Bonds calculator · existing
Pick an account and estimate retail treasury bond returns.
code in `src/pages/bonds.js`, `src/components/bonds/`

### 17. Articles · existing
15 static financial literacy articles you can filter by topic (General, Savings, Stocks, Investments, Bonds).
code in `src/pages/articles.js`, `src/data/articles.js`

### 18. Guided tours · existing
Step by step walkthroughs per page; progress is saved per user so each tour shows once.
code in `src/components/tours/`, `src/stores/useAuthStore.js` (`getTourProgress`, `manageTourProgress`)

### 19. Bilingual UI (English, Filipino) · existing
All UI strings in `en` and `ph`, chosen during the survey.
code in `src/data/language-content.js`, `src/stores/useLanguageStore.js`, `src/utils/getLanguage.js`

### 20. Market data scrapers · existing
Server routes that scrape stocks, news and PH inflation with headless Chromium. The `investment` route (Sun Life calculator) has a hook but no page calls it.
code in `src/pages/api/`, `src/hooks/swr/`

### 21. Settings · in-progress
Notification and change password forms from the template; nothing is saved yet.
code in `src/pages/settings.js`, `src/components/settings/`
- [ ] Finish it: `/develop settings`

### 22. Achievements · in-progress
Achievement cards render from mock data; no real tracking. Not linked in the sidebar.
code in `src/pages/achievements.js`, `src/components/achievements/`, `src/__mocks__/accounts.js`
- [ ] Finish it: `/develop achievements`

### 23. Installable app (PWA) · in-progress
`next-pwa` is installed and `_document.js` links `/manifest.json`, but the plugin is not set up in `next.config.js` and the manifest file is missing.
code in `next.config.js`, `src/pages/_document.js`, `public/`
- [ ] Finish it: `/develop installable app`

**Template leftovers, not features:** `src/pages/users.js` (mock customer list), `src/pages/sign-in/` and `src/contexts/auth-context.js` + `src/lib/auth.js` (unused Zalter auth), and the Zalter branch in `src/components/account-popover.js`. Feature 33 removes them.

## Dropped

### 24. Modernization stack & architecture · dropped
Was: decide the target stack for a full rework. Set aside in favor of the local only demo mode (features 25 to 34).

## Foundations

### 25. Local data layer · in-progress
Replace every Firestore read, write and live listener in the 6 stores and 5 `useGetUser*` hooks with browser storage, so pages keep working unchanged. The client side balance math stays as it is.
**Done when:** the app runs with no Firebase keys, data survives a page reload, and no page or component file needed changes to read data.
spec [0001](../specs/0001-local-data-layer/index.md) · code in `src/lib/localDb.js`, `src/stores/`, `src/hooks/`
- [x] Design it (spec): `/architect local data layer`
- [x] Build it: `/develop local data layer`
  - [x] `localDb` module with batch, subscribe and failure handling (AC-2, AC-5, AC-8)
  - [x] Thin thread: accounts store and listener on `localDb` (AC-2, AC-9)
  - [x] Demo user sign in, users doc, survey, tours, logout keeps data (AC-3, AC-6, AC-7)
  - [x] Categories, transactions and transfers on `localDb` with one batch per action (AC-2, AC-4, AC-5, AC-6, AC-9)
  - [x] Warning strings, last Firebase imports removed, run with no keys (AC-1, AC-8, AC-10)
- [ ] Verify it: `/check verify local data layer`

### 26. Demo sample data and reset
Load a realistic sample user on first visit: a few PH bank and ewallet accounts, categories, and a few months of income, expenses and transfers, so every chart and suggestion has something to show.
**Done when:** a fresh browser opens to a filled dashboard, cashflow and savings page, and a reset action brings the sample data back.
- [ ] Build it: `/develop demo sample data and reset`

## Slice 1: Core loop on local data

### 27. Demo sign in and onboarding
A "Try the demo" entry logs in the sample user with no password. The survey, edit survey, profile, language choice and tour progress save locally. Register, login and Google sign in give way to the demo entry.
**Done when:** from the landing page you reach the dashboard in one click, and survey answers and finished tours persist across reloads.
- [ ] Build it: `/develop demo sign in and onboarding`

### 28. Local accounts and categories
Account and category create, edit, delete and detail pages work on local data.
**Done when:** you can add, edit and delete an account and a category, and the change shows on the list, detail page and dashboard without a reload.
- [ ] Build it: `/develop local accounts and categories`

### 29. Local transactions
Transaction create, edit and delete on local data, keeping balance updates for all four types. Dashboard and cashflow follow automatically since they read the store.
**Done when:** adding, editing (including moving to another account) and deleting each transaction type leaves every account balance correct, and the dashboard and cashflow reflect it.
- [ ] Build it: `/develop local transactions`

## Slice 2: The rest of the money flows

### 30. Local transfers
Transfers between two accounts on local data, with both balances updating.
**Done when:** creating, editing and deleting a transfer leaves both account balances correct.
- [ ] Build it: `/develop local transfers`

### 31. Local receipt photos · needs a decision
Decide how optional photos on transactions and transfers work without cloud storage (kept in the browser, size capped, or turned off in the demo).
**Done when:** attaching, replacing and removing a photo either works and survives a reload, or the option is clearly hidden, and browser storage limits never break saving a record.
- [ ] Design it (spec): `/architect local receipt photos`

## Slice 3: Showcase ready

### 32. Market data snapshot
Swap the scraper routes for one saved snapshot of stocks, market movers, news and PH inflation shipped with the app.
**Done when:** the dashboard inflation and news widgets and the stocks page render fully with no server and no network calls to outside sites.
- [ ] Build it: `/develop market data snapshot`

### 33. Remove Firebase and template leftovers
Remove Firebase, the scraper routes, the headless browser packages and the unused template pages and auth code once nothing depends on them.
**Done when:** no source file imports Firebase or the scraper packages, the leftover pages are gone, and a clean install builds.
- [ ] Build it: `/develop remove firebase and template leftovers`

### 34. Static demo deploy · needs a decision
Decide where and how the demo is hosted (static export vs a Node host), then publish it.
**Done when:** a public URL serves the demo with no environment variables set, and a first time visitor lands on sample data.
- [ ] Design it (spec): `/architect static demo deploy`

## Legend

**The decision box.** Every feature carries exactly one, the sub task whose label ends with `(spec)`. Skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop`. The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (predates the workflow) and `dropped` (taken out of scope, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag inherits it.
- **Workflow tier tag** beside a heading (e.g. `· GA`) sets that one feature's rigor above or below the project default; no tag inherits it.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing; **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
