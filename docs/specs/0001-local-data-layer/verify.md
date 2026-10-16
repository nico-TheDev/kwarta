# Verify: Local data layer · spec 0001 · updated 2026-10-17
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

Setup note: Next 12 crashes on Node 25 and newer (its bundled `jsonwebtoken` uses the removed `SlowBuffer`). You may want to run on Node 20, for example `PATH=/opt/homebrew/opt/node@20/bin:$PATH npm run dev`. Start from a clean origin (clear site data) with no `.env.local`.

## UI / manual
- [ ] On `/login`, type any email and password and submit → you land on `/survey`; `kwarta:v1:users` holds one doc with `id` and `uid` `demo-user`, `hasAnswered: false`, `profile_img: ''` and the 12 entry `tourProgress` → AC-3
- [ ] Log out, then use the register form, then the Google button → each signs in `demo-user`, and no second users doc appears → AC-3
- [ ] Finish the survey → you land on `/dashboard`; reload → you stay signed in, and `/editSurvey` shows your answers → AC-3
- [ ] Edit your name and email on `/profile`, reload → the new values show, and the users doc has the new `first_name`, `last_name`, `email` → AC-3
- [ ] Finish one guided tour, reload → that tour doesn't start again, and its `tourProgress` entry has `isDone: true` → AC-3
- [ ] Create, edit and delete an account → the list, detail page and dashboard update with no reload, and each change survives a reload → AC-2
- [ ] Do the same for a category, a transaction and a transfer → AC-2
- [ ] The new account card shows "Last Used: a few seconds ago" (a relative time, not "Invalid date") → AC-9
- [ ] Add three transactions → the transactions list shows the newest one first → AC-9
- [ ] Balance parity, each step on a ₱1,000 account: income 100 → 1,100; expense 100 → 900; savings 100 → 900; investments 100 → 900; expense of exactly 1,000 → rejected with "You don't have enough money!" (the `>` quirk) → AC-4
- [ ] Edit an expense 100 → 250 on the same account → the balance drops by a further 150; change its type to income → the balance goes back up by 250 + 250 → AC-4
- [ ] Edit a transaction to move it to another account → behaves like the old Firestore code (the `target_account` quirk: an error toast, and neither balance nor the record changes) → AC-4
- [ ] Delete each transaction type → its amount returns to the account → AC-4
- [ ] Transfer 200 from A to B → A −200, B +200; edit to 300 → A −300, B +300 from the start; delete → both return to where they started → AC-4
- [ ] Attach a photo to a transaction, a transfer and the profile → each saves with no error; the record has `photoRef: ''` and `photoUrl: ''`, and the profile image is unchanged → AC-6
- [ ] Log out → only the `auth` key is reset (the `kwarta:v1:*` and `language` keys stay); sign back in → every record is still there → AC-7
- [ ] In devtools, fill localStorage close to the quota, then add an expense → an error toast saying "Storage is full. Your change was not saved."; after a reload the balance and the list are unchanged → AC-5
- [ ] Set `kwarta:v1:accounts` to `{oops` and reload → accounts show as empty, a console warning names the key, and transactions still load → AC-8
- [ ] Block site storage (or use a browser that blocks localStorage) → the app works for the session, and one warning toast in the current language says changes won't be saved; switch to Filipino → the Filipino text → AC-8
- [ ] With an old Firebase session in `auth` (any `uid` other than `demo-user`), reload → you are treated as logged out → spec failure handling
- [ ] With no `.env.local`, click through every page under `src/pages` → no Firebase error in the console → AC-1

## Commands
- [ ] `grep -rln "firebase" src` → no output → AC-1
- [ ] `npm run build` (Node 20, no `.env.local`) → compiles, and every page prerenders → AC-1
- [ ] `git diff --stat <starting commit> -- src/pages src/components` → no changes → AC-10

## Acceptance-criteria coverage
- AC-1: no Firebase imports grep, build, click through every page
- AC-2: account, category, transaction and transfer create, edit and delete, plus reload
- AC-3: login, register and Google sign in, survey routing, profile edits, tours
- AC-4: balance parity for each type, same account edit, moved account quirk, transfers
- AC-5: storage quota step
- AC-6: photo attach steps
- AC-7: logout keeps data
- AC-8: corrupt key, blocked storage, the warning text in both languages
- AC-9: Last Used relative time, newest first order
- AC-10: diff stat on `src/pages` and `src/components`
