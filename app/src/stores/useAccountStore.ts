import { create } from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import toast from 'react-hot-toast';

export interface Account {
    id: string;
    account_name: string;
    account_amount: number;
    account_type: string;
    account_color: string;
    account_icon: string;
    account_description: string;
    user_id: string;
    timestamp: Date | string;
}

interface AccountStore {
    accounts: Account[];
    resetAccounts: () => void;
    setAccounts: (data: Account[]) => void;
    createAccount: (newAccount: Omit<Account, 'id' | 'timestamp'>) => Promise<void>;
    updateAccount: (documentId: string, updatedAccount: Partial<Account>) => Promise<boolean>;
    deleteAccount: (documentId: string) => Promise<boolean | undefined>;
}

const accountStore = (set: any, get: any): AccountStore => ({
    accounts: [],
    resetAccounts: () => set({ accounts: [] }),
    setAccounts: (data) => set({ accounts: data }),
    createAccount: async (newAccount) => {
        try {
            if (!get().accounts.map((a: Account) => a.account_name.toLowerCase()).includes(newAccount.account_name)) {
                await addDoc(collection(db, 'accounts'), { ...newAccount, timestamp: serverTimestamp() });
                toast.success('Account successfully created!');
            } else {
                throw new Error('Account name is already taken. Think of another account name');
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    },
    updateAccount: async (documentId, updatedAccount) => {
        const editLoader = toast.loading('Updating Account');
        try {
            const docRef = doc(db, 'accounts', documentId);
            await updateDoc(docRef, { ...updatedAccount });
            toast.success('Updated Successfully.');
            return true;
        } catch (err: any) {
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteAccount: async (documentId) => {
        const deleteLoader = toast.loading('Deleting Account');
        const docRef = doc(db, 'accounts', documentId);
        try {
            await deleteDoc(docRef);
            toast.success('Deleted Successfully!');
            return true;
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
});

export const useAccountStore = create(accountStore);
