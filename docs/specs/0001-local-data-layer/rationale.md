# 0001. Local data layer: rationale

Decision record for [index.md](index.md). `/develop` doesn't need this file.

## Context

The project's current goal is a local only demo with no Firebase, no keys and no server. Today every read and write goes to Firestore: 6 Zustand stores write with `addDoc`, `updateDoc` and `deleteDoc`, and 5 listener hooks (`useAccountsListener`, `useGetUserCategories`, `useGetUserTransactions`, `useGetUserTransfers`, `useGetUserSurvey`) push `onSnapshot` results into the stores. No page or component imports Firebase directly, so the stores and hooks form a clean seam.

Forces that shaped the choice:
- **Firebase Auth blocks running without keys.** `firebase.config.js` calls `getAuth()` when it loads, and that throws without an API key. So the users doc and sign in have to leave Firebase in this same feature, or "runs with no keys" can't be met.
- **The balance math must not change by accident.** Transaction and transfer actions read an account, adjust `account_amount`, and write it back, with two known quirks. A storage swap that also changes the math would make balance bugs impossible to trace.
- **Partial writes.** Balance and record are separate Firestore writes today, so a failure in between leaves them out of sync.
- **Small data, one user, one browser.** The records are small JSON, and photos are a separate decision (feature 31).
- **`logout` calls `localStorage.clear()`**, which would wipe all local data once data lives there.
- `timestamp` is a Firestore `serverTimestamp()`. Only the account card reads it (through `.toDate()` in the listener). Lists sort by the user entered `date` string, except the transactions query, which orders by `timestamp`.

## Options considered

### Option 1: A small `localDb` module with a Firestore like API (chosen)
A new module that covers add, get, update, remove, query, batch and subscribe over localStorage. Stores and hooks swap each Firebase call for the matching `localDb` call.

**Pros**: the smallest and easiest diff to review, line by line; keeps the AGENTS.md flow where listeners push into stores; one place for keys, failure handling and seeding; `batch` fixes partial writes.
**Cons**: about 150 lines of new code to own; it copies a slice of Firestore's behavior that someone has to keep correct.

### Option 2: zustand `persist` on each store
Each store saves its own slice, and the listener hooks become empty.

**Pros**: the least new code, using a pattern the project already has (`auth`, `language`).
**Cons**: transaction and transfer actions would write straight into `useAccountStore` state, which couples the stores; no single place for seeding, reset or failure handling; the change to the hooks is a bigger behavior shift.

### Option 3: Alias `firebase/firestore` to a local shim
A webpack alias points the Firestore imports at a fake SDK, so no store changes.

**Pros**: zero edits to stores or hooks.
**Cons**: the shim has to copy SDK quirks (refs, snapshots, `.data()`, `serverTimestamp` sentinels); the indirection hides what really runs; it breaks when feature 33 removes the package.

### Option 4: Fix in place with Firestore offline persistence
Turn on `enableIndexedDbPersistence` (already commented out in `firebase.config.js`).

**Pros**: no store changes, real Firestore behavior.
**Cons**: still needs a Firebase project and keys, so it fails the core goal.

**Storage engine** (decided separately): localStorage with one JSON key per collection, over IndexedDB through `idb-keyval` or Dexie. localStorage needs no dependency and reads synchronously, so the first render already has data. IndexedDB only pays off for large blobs, and photos are out of scope here.

## Rationale

Option 4 fails the core goal, and Option 3 trades a clear diff for hidden magic that dies in feature 33. Between 1 and 2, the deciding force is the balance math: transaction and transfer actions read and write accounts in another collection, and Option 1 keeps that as a data layer call (`tx.get('accounts', …)`), the same as today. Option 2 would make stores reach into each other's state. Option 1 also gives one place to add `batch`, which turns the "partial write" gotcha into a commit that is all or nothing almost for free, since local writes can't fail halfway on the network.

Keeping today's doc shapes (embedded `targetAccount` and friends) is what lets pages stay untouched. Normalizing would be cleaner, but it would spread into every page that reads them. Changing the sign in buttons to sign in a fixed demo uid, rather than removing them, keeps the app reachable at every step, so this feature can be verified without waiting for feature 27.

Single tab only was the engineer's call, over a `storage` event listener (about 10 lines). The accepted risk is that two open tabs can overwrite each other's balances. That is acceptable for a one person demo, but it is the first thing to revisit if anyone reports balances "going back".
