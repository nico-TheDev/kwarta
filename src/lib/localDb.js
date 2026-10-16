import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';

// BROWSER DATA LAYER: ONE JSON ARRAY PER COLLECTION IN LOCALSTORAGE (SPEC 0001)
const KEY_PREFIX = 'kwarta:v1:';
const TEST_KEY = `${KEY_PREFIX}__test__`;
const COLLECTIONS = ['users', 'accounts', 'categories', 'transactions', 'transfers'];
const QUOTA_MESSAGE = 'Storage is full. Your change was not saved.';

// IN MEMORY CACHE, THE SOURCE OF TRUTH AFTER THE FIRST READ OF EACH KEY
const cache = {};
const subscribers = {};
// undefined = NOT CHECKED YET, null = MEMORY ONLY FOR THIS SESSION
let storage;
// BATCHES RUN ONE AT A TIME SO TWO ACTIONS NEVER STAGE FROM THE SAME SNAPSHOT
let queue = Promise.resolve();

const isServer = () => typeof window === 'undefined';

const clone = (value) => JSON.parse(JSON.stringify(value));

const keyFor = (col) => `${KEY_PREFIX}${col}`;

const assertCollection = (col) => {
    if (!COLLECTIONS.includes(col)) {
        throw new Error(`Unknown collection: ${col}`);
    }
};

const warnStorageUnavailable = () => {
    const { currentLanguage } = useLanguageStore.getState();
    toast(getLanguage(currentLanguage || 'en').storageUnavailable, {
        id: 'storage-warning',
        icon: '⚠️',
        duration: 6000
    });
};

const getStorage = () => {
    if (isServer()) return null;
    if (storage === undefined) {
        try {
            window.localStorage.setItem(TEST_KEY, '1');
            window.localStorage.removeItem(TEST_KEY);
            storage = window.localStorage;
        } catch (err) {
            console.warn('localDb: localStorage is unavailable, keeping data in memory only.', err);
            storage = null;
            warnStorageUnavailable();
        }
    }
    return storage;
};

const load = (col) => {
    assertCollection(col);
    if (isServer()) return [];
    if (!cache[col]) {
        let docs = [];
        const store = getStorage();
        if (store) {
            const raw = store.getItem(keyFor(col));
            if (raw !== null) {
                try {
                    const parsed = JSON.parse(raw);
                    if (!Array.isArray(parsed)) throw new Error('Stored value is not an array');
                    docs = parsed;
                } catch (err) {
                    // LEAVE THE BAD VALUE ALONE UNTIL THE NEXT WRITE REPLACES IT
                    console.warn(`localDb: invalid JSON in ${keyFor(col)}, loading it as empty.`, err);
                }
            }
        }
        cache[col] = docs;
    }
    return cache[col];
};

const matches = (doc, where = {}) => Object.keys(where).every((field) => doc[field] === where[field]);

const compare = (a, b) => {
    if (a === b) return 0;
    if (a === undefined || a === null) return -1;
    if (b === undefined || b === null) return 1;
    return a < b ? -1 : 1;
};

const runQuery = (col, { where, orderBy } = {}) => {
    const docs = load(col).filter((doc) => matches(doc, where));
    if (orderBy) {
        const [field, direction = 'asc'] = orderBy;
        const sign = direction === 'desc' ? -1 : 1;
        docs.sort((a, b) => sign * compare(a[field], b[field]));
    }
    return clone(docs);
};

const notify = (col) => {
    (subscribers[col] || new Set()).forEach((entry) => {
        try {
            entry.listener(runQuery(col, entry.options));
        } catch (err) {
            console.error(`localDb: a ${col} subscriber failed.`, err);
        }
    });
};

// WRITE EVERY TOUCHED KEY, OR PUT BACK THE ONES ALREADY WRITTEN AND THROW
const commit = (staged) => {
    const cols = Object.keys(staged);
    if (isServer() || cols.length === 0) return;

    const store = getStorage();
    if (store) {
        const previous = {};
        try {
            cols.forEach((col) => {
                previous[col] = store.getItem(keyFor(col));
                store.setItem(keyFor(col), JSON.stringify(staged[col]));
            });
        } catch (err) {
            console.error('localDb: commit failed, rolling back.', err);
            Object.keys(previous).forEach((col) => {
                try {
                    // REMOVE FIRST TO FREE SPACE, THEN PUT THE OLD VALUE BACK
                    store.removeItem(keyFor(col));
                    if (previous[col] !== null) {
                        store.setItem(keyFor(col), previous[col]);
                    }
                } catch (restoreErr) {
                    console.error(`localDb: could not restore ${keyFor(col)}.`, restoreErr);
                }
            });
            throw new Error(QUOTA_MESSAGE);
        }
    }

    // THE CACHE ONLY CHANGES AFTER STORAGE ACCEPTED EVERY KEY
    cols.forEach((col) => {
        cache[col] = staged[col];
    });
    cols.forEach(notify);
};

const runBatch = async (callback) => {
    const staged = {};
    const stage = (col) => {
        assertCollection(col);
        if (!staged[col]) staged[col] = clone(load(col));
        return staged[col];
    };
    const indexOf = (docs, id) => docs.findIndex((doc) => doc.id === id);

    // READS INSIDE A BATCH SEE THE WRITES STAGED EARLIER IN THE SAME BATCH
    const tx = {
        get: (col, id) => {
            const doc = (staged[col] || load(col)).find((item) => item.id === id);
            return doc ? clone(doc) : null;
        },
        add: (col, data) => {
            const doc = { ...clone(data), id: uuidv4(), timestamp: new Date().toISOString() };
            stage(col).push(doc);
            return clone(doc);
        },
        set: (col, id, data) => {
            const docs = stage(col);
            const doc = { ...clone(data), id };
            const index = indexOf(docs, id);
            if (index === -1) {
                docs.push(doc);
            } else {
                docs[index] = doc;
            }
            return clone(doc);
        },
        update: (col, id, patch) => {
            const docs = stage(col);
            const index = indexOf(docs, id);
            if (index === -1) {
                throw new Error('Document not found');
            }
            docs[index] = { ...docs[index], ...clone(patch), id };
            return clone(docs[index]);
        },
        remove: (col, id) => {
            const docs = stage(col);
            const index = indexOf(docs, id);
            if (index !== -1) docs.splice(index, 1);
        }
    };

    const result = await callback(tx);
    commit(staged);
    return result;
};

const batch = (callback) => {
    const run = queue.then(() => runBatch(callback));
    queue = run.catch(() => {});
    return run;
};

const localDb = {
    get: async (col, id) => {
        const doc = load(col).find((item) => item.id === id);
        return doc ? clone(doc) : null;
    },
    query: async (col, options) => runQuery(col, options),
    add: (col, data) => batch((tx) => tx.add(col, data)),
    set: (col, id, data) => batch((tx) => tx.set(col, id, data)),
    update: (col, id, patch) => batch((tx) => tx.update(col, id, patch)),
    remove: (col, id) => batch((tx) => tx.remove(col, id)),
    batch,
    subscribe: (col, options, listener) => {
        assertCollection(col);
        const entry = { options, listener };
        if (!subscribers[col]) subscribers[col] = new Set();
        subscribers[col].add(entry);
        listener(runQuery(col, options));
        return () => subscribers[col].delete(entry);
    },
    // ENTRY POINT FOR SEEDING AND RESET (FEATURE 26)
    replaceAll: (col, docs) =>
        batch(() => {
            assertCollection(col);
            commit({ [col]: clone(docs) });
        })
};

export default localDb;
