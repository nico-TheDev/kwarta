# 0001. Replace Firestore with a local browser data layer

**Date**: 2026-10-17
**Status**: In Progress

## Summary

Kwarta's data moves from Firebase into the visitor's own browser, so the demo runs with no Firebase project, no keys and no server. A small new module, `localDb`, saves each collection in localStorage (the browser's built in key and value storage) and offers the same moves the stores use today: add, read, update, delete, and "tell me when this changes". The stores and listener hooks swap their Firebase calls for `localDb` one line at a time. Pages, components and the balance math stay exactly as they are. Sign in becomes a fixed demo user, and photo uploads are skipped until feature 31 decides how photos work.

## Requirements

**User stories**:
- As a demo visitor, I want the app to work without any account or server so that I can try every feature right away.
- As a demo visitor, I want my changes to still be there after a reload so that the demo feels like a real app.
- As the developer, I want the storage swap to touch only stores and hooks so that the existing balance behavior can't be changed by accident.

**Acceptance criteria**:
- **AC-1**: With every `NEXT_PUBLIC_*` Firebase variable unset, `npm run dev` starts and every page under `src/pages` (other than the `api/` routes) loads without a Firebase error. No file in `src/stores` or `src/hooks` imports `firebase/*` or `firebase.config`.
- **AC-2**: Creating, editing and deleting an account, a category, a transaction and a transfer shows up on the matching list, detail page and dashboard without a reload, and is still there after a full page reload.
- **AC-3**: The login, register and Google sign in buttons all sign in the demo user (`DEMO_USER.uid`). On the first sign in, a users doc is created with `hasAnswered: false`, and `_app.js` sends you to `/survey`. After the survey it sends you to `/dashboard`. Survey answers, profile name and email edits, and finished tours survive a reload.
- **AC-4**: For every transaction type (income, expense, savings, investments) and for transfers, create, update and delete leave each `account_amount` exactly where today's Firestore code would leave it, including the two known quirks (the "moved account" update branch and the `>` balance check), which stay unchanged.
- **AC-5**: Each store action commits all its writes together. If a write fails (for example the storage quota is hit), no balance and no record changes, and the store shows its normal `toast.error`.
- **AC-6**: Attaching a photo to a transaction, a transfer or the profile never blocks saving. The record saves with `photoRef: ''` and `photoUrl: ''` (the profile keeps its current `profile_img`), and no error appears.
- **AC-7**: Logging out removes only the `auth` session key. Signing back in shows every record that existed before the logout.
- **AC-8**: If localStorage can't be used, the app still works for the session and shows one warning toast saying changes won't be saved. If one collection's key holds invalid JSON, that collection loads as empty, a console warning is logged, and the other collections load normally.
- **AC-9**: The account card's "Last Used" still shows a relative time, and the transactions list keeps its newest first order.
- **AC-10**: No file under `src/pages` or `src/components` changes to make this work. Changes stay within `src/lib`, `src/stores`, `src/hooks`, `src/constants` and `src/data`.

## Decision

**Chosen option**: Option 1: a small `localDb` module with a Firestore like API

Add `src/lib/localDb.js`, which keeps one JSON array per collection in localStorage under `kwarta:v1:<collection>`. Rewire the 6 stores and 5 listener hooks to call it in place of Firestore and Firebase Auth, keeping today's doc shapes, store action signatures and the data flow where listeners push into stores.

## Rationale

Reasoning and the options weighed: see [rationale.md](rationale.md).

## Feature design

**Data model sketch** (unchanged doc shapes; only storage and three fields change):

| Collection | localStorage key | Primary key | Fields |
|---|---|---|---|
| `users` | `kwarta:v1:users` | `id` = `uid` = `DEMO_USER.uid` | `uid`, `first_name`, `last_name`, `email`, `profile_img`, `profile_img_ref`, `hasAnswered`, `priorities`, `salary`, `financeRule`, `tourProgress[]` |
| `accounts` | `kwarta:v1:accounts` | `id` (uuid v4) | `user_id`, `account_name`, `account_amount`, `account_type`, `account_color`, `account_icon`, `account_description`, `timestamp` |
| `categories` | `kwarta:v1:categories` | `id` (uuid v4, or a premade id when a premade category is edited) | `user_id`, `category_name`, `category_type`, `category_color`, `category_icon`, `timestamp` |
| `transactions` | `kwarta:v1:transactions` | `id` (uuid v4) | `user_id`, `type`, `amount`, `date`, `category`, `targetAccount{…}`, `photoRef`, `photoUrl`, `timestamp`, plus any other form field the store passes today |
| `transfers` | `kwarta:v1:transfers` | `id` (uuid v4) | `user_id`, `amount`, `date`, `targetSenderAccount{…}`, `targetReceiverAccount{…}`, `photoRef`, `photoUrl`, `timestamp`, plus any other form field the store passes today |

- Relations are unchanged: 1 user to N of every other collection via `user_id`; a transaction embeds a copy of its account in `targetAccount`; a transfer embeds both accounts.
- What changes: `id` is now a field on the stored doc (Firestore kept it outside), `timestamp` is an ISO 8601 string in place of a Firestore Timestamp, and new ids come from `uuid` v4.
- Each key holds a JSON array of docs. There is no live data to migrate: demo data starts empty here, and feature 26 seeds it.

**localDb API surface** (`src/lib/localDb.js`, default export `localDb`). Every method returns a Promise so store code keeps its `await` and toast flow. `col` is one of the five collection names.

| Method | Key inputs | Returns | Errors |
|---|---|---|---|
| `get(col, id)` | id | doc copy, or `null` | none |
| `query(col, { where, orderBy })` | `where`: object of field equals value (e.g. `{ user_id }`); `orderBy`: `[field, 'asc' \| 'desc']` | array of doc copies | none |
| `add(col, data)` | doc fields | the new doc with `id` and `timestamp` added | quota error |
| `set(col, id, data)` | id, full doc | the doc | quota error |
| `update(col, id, patch)` | id, partial fields | the merged doc | `Error('Document not found')` if missing; quota error |
| `remove(col, id)` | id | nothing | none if already missing |
| `batch(async (tx) => …)` | `tx` has `get`, `add`, `set`, `update`, `remove`, working on a staged copy | the callback's return value | anything the callback throws; quota error. Nothing is written in either case |
| `subscribe(col, { where, orderBy }, listener)` | same filter as `query` | an unsubscribe function | none |
| `replaceAll(col, docs)` | full array | nothing | quota error. Hook for feature 26's seed and reset |

Behavior rules:
- `add`, `set`, `update` and `remove` outside a batch are each a one step batch.
- `subscribe` calls `listener(docs)` once right away with the current filtered and sorted list, then again after every committed write that touched `col` (one call per batch, not per operation). This is the same contract as `onSnapshot`. Listeners always get copies, so mutating them never changes stored data.
- Single tab only: there is no `storage` event listener. Each collection is read from localStorage once, on first access, into an in memory cache, which is the source of truth from then on.
- On the server (Next.js SSR, where `window` is undefined) every read returns empty and nothing is written. All callers already run in `useEffect` or event handlers.

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| any `add` | `id` | `uuidv4()` from the existing `uuid` dependency |
| any `add` | `timestamp` | `new Date().toISOString()` at write time |
| accounts subscriber | `timestamp` as a Date for `moment()` | `new Date(doc.timestamp)` in `useAccountsListener`, matching today's `.toDate()` |
| transactions subscriber | newest first order | `orderBy: ['timestamp', 'desc']`, the same as today's Firestore query |
| every query | current user filter | `where: { user_id: userID }` (`uid` for users), with `userID` passed in by the hooks as today |
| demo sign in | `uid`, `first_name`, `last_name`, `email` | new `DEMO_USER` constant in `src/constants/constant.js`: `{ uid: 'demo-user', first_name: 'Demo', last_name: 'User', email: 'demo@kwarta.local' }`. Feature 26 may change the names |
| demo sign in, first time | `hasAnswered`, `tourProgress`, `profile_img`, `profile_img_ref` | `false`, the existing `tourProgress` default in `useAuthStore`, `''`, `''` |
| `authState.user` after sign in | `name`, `firstName`, `lastName`, `email`, `photo`, `uid`, `hasAnswered` | read from the users doc (`first_name + ' ' + last_name`, `profile_img`, …) in place of `auth.currentUser` |
| `updateUser` | new name and email | form input, saved to the users doc (the email change no longer goes through Firebase Auth) |
| balance before a write | current `account_amount` | `tx.get('accounts', id)` inside the action's batch, in place of `getDoc` |
| transaction, transfer and profile photo | `photoRef`, `photoUrl` | always `''` until feature 31; the profile keeps its existing `profile_img` |
| storage warning toast | its text | new `en` and `ph` strings in `src/data/language-content.js`, read with `getLanguage(useLanguageStore.getState().currentLanguage)` |

**Key invariants**:
- One store action means one `localDb.batch`: its balance updates and its record write commit together or not at all.
- The balance arithmetic, the type branches and the enough money check are copied exactly, quirks included. Only the read and write calls change.
- Stored docs keep today's field names and nesting, so no reader changes.
- No password is ever stored. `addUser` and `verifyUser` ignore the password field.
- No file outside `src/lib`, `src/stores`, `src/hooks`, `src/constants` and `src/data` changes.

**Failure handling**:
- **Storage unavailable** (`localStorage` access throws, or a test write fails at startup): switch to memory only for the session, and show the warning toast once (`id: 'storage-warning'` so it never stacks).
- **Invalid JSON in a key**: treat that collection as `[]`, log `console.warn` with the key, and leave the bad value alone until the next write replaces it.
- **Quota exceeded on commit**: put back any key already written in this commit, roll back the cache, and throw `Error('Storage is full. Your change was not saved.')`. The store's existing catch shows the toast.
- **Persisted session for another user** (an `auth` key left over from the Firebase app with `uid !== DEMO_USER.uid`): treat it as logged out when the store loads (`onRehydrateStorage`).
- **Missing doc on update** (for example the existing `updatedTransaction.target_account` quirk): `update` throws "Document not found" and the batch writes nothing. Today this fails with a TypeError and a toast, so the visible behavior is the same.

**Security model**: one local demo user and no server. Data sits in plain localStorage on the visitor's device and is readable by any script on the same origin, which is acceptable because it holds only demo data and no credentials. `user_id` filtering stays, to keep the doc shape and leave room for more than one profile; it is not a security boundary.

**Configuration required**: none. This removes the need for the six Firebase `NEXT_PUBLIC_*` variables. `NEXT_PUBLIC_ENDPOINT` (the scraper routes) stays until feature 32.

**Critical test scenarios** (manual, through `/check verify`; there is no test runner):
- Happy path: with no `.env.local`, sign in, finish the survey, add an account, an income, an expense and a transfer, reload, and see everything with the right balances. Verifies **AC-1**, **AC-2**, **AC-3**.
- Balance parity: on the Firebase build, record a fixed script of create, update (same account and moved account) and delete for all four types plus a transfer, and note the balances. Replay the same script locally and compare. Verifies **AC-4**.
- Failure: in devtools, fill localStorage close to the quota, then add an expense. The toast error shows, and the balance and transaction list are unchanged after a reload. Verifies **AC-5**.
- Corrupt key: set `kwarta:v1:accounts` to `{oops` and reload. Accounts show as empty, a console warning appears, and transactions still load. Verifies **AC-8**.
- Private window or storage blocked: the app works, and the warning toast shows once. Verifies **AC-8**.
- Logout and sign in again: data is still there. Verifies **AC-7**.
- Run `git diff --stat` against the starting commit: no changes under `src/pages` or `src/components`. Verifies **AC-10**.

## Build plan

Tracer Bullet: the first two tasks carry one thin thread (the accounts list) through module, store, hook and page before the rest gets wider. The app keeps working after every task. Firebase still runs (with keys) for any store not migrated yet, and the last task removes it.

1. Add `src/lib/localDb.js`: the cache, the `kwarta:v1:` keys, `get`, `query`, `add`, `set`, `update`, `remove`, `batch` with commit and rollback, `subscribe`, `replaceAll`, the SSR guard, and handling for unavailable storage, invalid JSON and quota errors. Satisfies **AC-2**, **AC-5**, **AC-8**.
2. Thin thread: move `useAccountStore` and `useAccountsListener` to `localDb` (revive `timestamp` to a Date). Check the accounts list, detail page and dashboard update live and survive a reload. Satisfies **AC-2**, **AC-9**.
3. Add `DEMO_USER` to `src/constants/constant.js`. In `useAuthStore`, make `verifyUser`, `addUser` and `loginWithGoogle` sign in the demo user (creating the users doc if missing), move `manageSurvey`, `updateSurvey`, `getUser`, `updateUser`, `manageTourProgress` and `updateUserPhoto` to the `users` collection, skip photo files, make `logout` remove only `auth`, and drop a persisted session for another uid. Move `useGetUserSurvey` to `subscribe`. Satisfies **AC-3**, **AC-6**, **AC-7**.
4. Move `useCategoryStore` and `useGetUserCategories` to `localDb`, keeping the premade category merge. Satisfies **AC-2**.
5. Move `useTransactionStore` and `useGetUserTransactions`: each create, update and delete runs in one `batch`, the math is copied exactly, photos are skipped, and the subscriber is sorted by `timestamp` desc. Satisfies **AC-2**, **AC-4**, **AC-5**, **AC-6**, **AC-9**.
6. Move `useTransferStore` and `useGetUserTransfers` the same way. Satisfies **AC-2**, **AC-4**, **AC-5**, **AC-6**.
7. Add the storage warning strings (`en`, `ph`) to `src/data/language-content.js` and connect them to the warning toast. Satisfies **AC-8**.
8. Remove the remaining `firebase/*` and `firebase.config` imports from `src/stores` and `src/hooks`. Start with no `.env.local`, click through every page, and run the critical test scenarios. Satisfies **AC-1**, **AC-10**.

## Migration plan

**Strategy**: replace directly, one store at a time (tasks 2 to 6). There is no live user data to carry over, because the demo starts empty and feature 26 seeds it.
**Rollback**: each task is its own commit, so reverting it puts that store back on Firestore.
**Risks**: while some stores are still on Firebase, data is split (for example accounts are local while transactions still update balances in Firestore). Treat the stretch from task 2 to task 6 as a development state only, and don't ship partway.

## Consequences

**Positive**:
- The demo needs no keys, no Firebase project and no network for its data, so a static host is enough (this is input for feature 34).
- A transaction's balance change and its record can no longer drift apart, which closes the stores AGENTS.md gotcha.
- Seeding and reset (feature 26) get one entry point, `replaceAll`.

**Negative / tradeoffs**:
- Single tab only: two open tabs each keep their own cache, and the last tab to write overwrites the other's changes, which can silently undo balance updates. This was accepted to keep the module small.
- Data is tied to one browser on one device. Clearing site data loses it, and there is no backup or sync.
- localStorage is synchronous and capped near 5 MB. That is fine for JSON records but rules out storing photos here, so feature 31 must pick another place.
- The two known balance quirks survive on purpose, so demo users can still hit them until feature 29 fixes them.
- The demo user ignores credentials, so the login and register forms only look like they work until feature 27 replaces them.

**Neutral**:
- `firebase.config.js` and the `firebase` package stay in the repo, unused by stores and hooks, until feature 33 deletes them.
- `id` now lives inside each stored doc, which code reading raw storage (like a feature 26 seed file) must include.

## Follow-up

- [ ] Feature 29 (local transactions): fix the "moved account" branch in `updateTransaction` (it only treats `expense` as a subtraction and reads `updatedTransaction.target_account`) and the `>` enough money check.
- [ ] Feature 26 (sample data): build seed and reset on `localDb.replaceAll`, and choose the final demo user name and email.
- [ ] Feature 27 (demo sign in): replace the login, register and Google UI with the "Try the demo" entry. The store side is done here.
- [ ] Feature 31 (receipt photos): decide where photos live. localStorage is the wrong place for images.
- [ ] Feature 33: delete `firebase.config.js`, the `firebase` dependency and the unused `contexts/auth-context.js` and `src/lib/auth.js`.
- [ ] `/sync` should update `src/stores/AGENTS.md` once this ships: writes go through `localDb.batch`, and the partial write gotcha is resolved.
