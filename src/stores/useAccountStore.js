import { create } from 'zustand';
import toast from 'react-hot-toast';

import localDb from 'lib/localDb';

const accountStore = (set, get) => ({
    accounts: [],
    resetAccounts: () => set({ accounts: [] }),
    setAccounts: (data) => set({ accounts: data }),
    createAccount: async (newAccount) => {
        try {
            // console.log(newAccount);
            // console.log(get().accounts.map((account) => account.account_name.toLowerCase()));
            if (
                !get()
                    .accounts.map((account) => account.account_name.toLowerCase())
                    .includes(newAccount.account_name)
            ) {
                await localDb.add('accounts', newAccount);
                toast.success('Account successfully created!');
                // console.log('NEW DOCUMENT CREATED');
            } else {
                throw new Error('Account name is already taken. Think of another account name');
            }
        } catch (err) {
            // console.log('addAccountError:', err);
            toast.error(err.message);
        }
    },
    updateAccount: async (documentId, updatedAccount) => {
        const editLoader = toast.loading('Updating Account');
        try {
            await localDb.update('accounts', documentId, updatedAccount);

            toast.success('Updated Successfully.');

            return true;
        } catch (err) {
            console.log('updateAccountError:', err);
            toast.error(err.message);

            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteAccount: async (documentId) => {
        console.log('Delete', documentId);
        const deleteLoader = toast.loading('Deleting Account');
        try {
            // DELETE THE DOCUMENT
            await localDb.remove('accounts', documentId);
            // ALERT A MESSAGE

            toast.success('Deleted Successfully!');

            return true;
        } catch (err) {
            console.log('deleteAccountError:', err);
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    }
});

export const useAccountStore = create(accountStore);
