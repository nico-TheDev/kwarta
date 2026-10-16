# Stores

## Overview

Zustand stores hold app state and own every Firestore write. Transaction and transfer actions also adjust account balances, so this folder is where the money math lives.

## Key files

| File | Owns |
|---|---|
| `useAuthStore.js` | Firebase auth (email, Google), `users` doc, survey answers, tour progress; persisted to localStorage as `auth` |
| `useTransactionStore.js` | Create/update/delete transactions, adjust `account_amount`, chart aggregations (`getExpenseList`, `getExpenseTypeList`, ...) |
| `useTransferStore.js` | Create/update/delete transfers between two accounts |
| `useAccountStore.js` | Account CRUD and the in memory `accounts` list |
| `useAccountsListener.js` | Realtime `onSnapshot` hook for the user's accounts (called once in `_app.js`) |
| `useCategoryStore.js` | User categories |
| `useLanguageStore.js` | Current language (`en`/`ph`) and tutorial flag; persisted as `language` |

## Conventions

- Store actions wrap work in `toast.loading` and finish with `toast.success` / `toast.error`; callers do not toast again.
- Reads come from listener hooks into the store (`setTransactions`, `setAccounts`, `setTransfers`), not from store actions.
- Uploaded images go to Storage under `<collection>/<uuid>-<filename>`; the doc keeps `photoRef` and `photoUrl`, and the old object is deleted on replace or delete.

## Gotchas

- Transaction types `expense`, `savings` and `investments` subtract from the account; `income` adds. Keep all three branches (create, update, delete) in sync when you add a type.
- Balance updates are separate `getDoc` + `updateDoc` calls, not Firestore transactions or batches, so a failure midway can leave a balance and its record out of sync.
- In `updateTransaction`, the "changed account" branch only treats `expense` as a subtraction and reads `updatedTransaction.target_account` while the same account branch reads `targetAccount.id`. Check this before touching it.
- The "enough money" check uses `>`, so spending an account's exact balance is rejected.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
