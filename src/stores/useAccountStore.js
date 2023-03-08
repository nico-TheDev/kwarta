import { create } from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

import { db, storage } from '../../firebase.config';

const accountStore = (set,get) => ({
    accounts: [],
    reset: () => set({ accounts: [] }),
    setAccounts: (data) => set({ accounts: data }),
    createAccount: async (newAccount) => {
        try {
            console.log(newAccount);

            await addDoc(collection(db, 'accounts'), {
                ...newAccount,
                timestamp: serverTimestamp()
            });

            console.log('NEW DOCUMENT CREATED');
        } catch (err) {
            console.log('addAccountError:', err);
        }
    },
    updateAccount: () => {},
    deleteAccount: () => {},
});

export const useAccountStore = create(accountStore);