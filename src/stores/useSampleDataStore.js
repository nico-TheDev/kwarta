import { create } from 'zustand';
import toast from 'react-hot-toast';

import localDb from 'lib/localDb';
import { buildSampleData } from 'data/sample-data';
import { useAuthStore } from 'stores/useAuthStore';

// EVERY COLLECTION THAT HOLDS A USER'S RECORDS; THE USERS DOC (PROFILE, SURVEY, TOURS) IS NEVER TOUCHED
const USER_COLLECTIONS = ['accounts', 'categories', 'transactions', 'transfers'];

// SWAP ALL OF A USER'S RECORDS FOR `data` IN ONE BATCH, SO A FAILURE LEAVES EVERYTHING AS IT WAS
const replaceUserData = (uid, data = {}) =>
    localDb.batch((tx) => {
        USER_COLLECTIONS.forEach((col) => {
            tx.query(col, { where: { user_id: uid } }).forEach((doc) => tx.remove(col, doc.id));
            (data[col] || []).forEach((doc) => tx.set(col, doc.id, doc));
        });
        tx.update('users', uid, { sample_data_prompted: true });
    });

const sampleDataStore = (set, get) => ({
    // null, 'welcome' (FIRST SIGN IN OFFER), 'load' OR 'clear' (CONFIRMATIONS FROM THE ACCOUNT MENU)
    dialogMode: null,
    openDialog: (mode) => set({ dialogMode: mode }),
    closeDialog: () => set({ dialogMode: null }),
    // OFFER SAMPLE DATA ONCE, ONLY TO A USER WHO HAS NO ACCOUNTS YET
    offerSampleData: async (user) => {
        if (!user?.uid || !user.hasAnswered || user.sampleDataPrompted || get().dialogMode) return;

        const accounts = await localDb.query('accounts', { where: { user_id: user.uid } });
        if (accounts.length === 0) {
            set({ dialogMode: 'welcome' });
        }
    },
    loadSampleData: async (uid) => {
        const loader = toast.loading('Loading sample data');
        try {
            await replaceUserData(uid, buildSampleData(uid));
            useAuthStore.getState().setSampleDataPrompted();

            toast.success('Sample data loaded. Explore away!');
            return true;
        } catch (err) {
            console.log('loadSampleDataError:', err);
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(loader);
        }
    },
    clearUserData: async (uid) => {
        const loader = toast.loading('Clearing data');
        try {
            await replaceUserData(uid);
            useAuthStore.getState().setSampleDataPrompted();

            toast.success('All data cleared.');
            return true;
        } catch (err) {
            console.log('clearUserDataError:', err);
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(loader);
        }
    },
    // "START EMPTY" ON THE WELCOME OFFER: REMEMBER THE ANSWER SO IT IS NOT ASKED AGAIN
    skipSampleData: async (uid) => {
        try {
            await localDb.update('users', uid, { sample_data_prompted: true });
            useAuthStore.getState().setSampleDataPrompted();
        } catch (err) {
            console.log('skipSampleDataError:', err);
            toast.error(err.message);
        }
    }
});

export const useSampleDataStore = create(sampleDataStore);
