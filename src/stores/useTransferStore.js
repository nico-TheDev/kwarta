import { create } from 'zustand';

import toast from 'react-hot-toast';

import localDb from 'lib/localDb';

const transferStore = (set,get) => ({
    transfers: [],
    getTransfer: () => {},
    setTransfers: (data) => set({ transfers: data }),
    // PHOTO FILES ARE SKIPPED UNTIL FEATURE 31, SO currentFile AND newFile ARE IGNORED
    createTransfer: async (newTransfer, currentFile) => {
        const loader = toast.loading('Creating Transfer');
        try {
            // BOTH BALANCE UPDATES AND THE RECORD COMMIT TOGETHER OR NOT AT ALL
            await localDb.batch((tx) => {
                const receiverAccountId = newTransfer.targetReceiverAccount.id;
                const senderAccountId = newTransfer.targetSenderAccount.id;
                const receiverAccount = tx.get('accounts', receiverAccountId);
                const senderAccount = tx.get('accounts', senderAccountId);

                tx.update('accounts', senderAccountId, {
                    account_amount: senderAccount.account_amount - newTransfer.amount
                });
                tx.update('accounts', receiverAccountId, {
                    account_amount: receiverAccount.account_amount + newTransfer.amount
                });

                tx.add('transfers', {
                    ...newTransfer,
                    photoRef: '',
                    photoUrl: ''
                });
            });
            console.log('NEW DOCUMENT CREATED');
            // HANDLE TOAST
            toast.dismiss(loader);
            toast.success('Transfer successfully created!');
        } catch (err) {
            console.log('addTransferError:', err);
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransfer: async (documentId, updatedTransfer, newFile) => {
        const editLoader = toast.loading('Updating Transfer');
        try {
            await localDb.batch((tx) => {
                const currentTransfer = tx.get('transfers', documentId);

                // GET ACCOUNT DATA
                const prevReceiverAccountId = currentTransfer.targetReceiverAccount.id;
                const prevSenderAccountId = currentTransfer.targetSenderAccount.id;
                const prevReceiverAccount = tx.get('accounts', prevReceiverAccountId);
                const prevSenderAccount = tx.get('accounts', prevSenderAccountId);

                // RETURN THE PREVIOUS TRANSFER
                tx.update('accounts', prevSenderAccountId, {
                    account_amount: prevSenderAccount.account_amount + currentTransfer.amount
                });
                tx.update('accounts', prevReceiverAccountId, {
                    account_amount: prevReceiverAccount.account_amount - currentTransfer.amount
                });

                // ADD CURRENT TRANSFER (THESE READS SEE THE RETURNED BALANCES ABOVE)
                const receiverAccountId = updatedTransfer.targetReceiverAccount.id;
                const senderAccountId = updatedTransfer.targetSenderAccount.id;
                const receiverAccount = tx.get('accounts', receiverAccountId);
                const senderAccount = tx.get('accounts', senderAccountId);

                tx.update('accounts', senderAccountId, {
                    account_amount: senderAccount.account_amount - updatedTransfer.amount
                });
                tx.update('accounts', receiverAccountId, {
                    account_amount: receiverAccount.account_amount + updatedTransfer.amount
                });

                tx.update('transfers', documentId, {
                    ...updatedTransfer,
                    photoRef: '',
                    photoUrl: ''
                });
            });

            toast.success('Updated Successfully.');

            return true;
        } catch (err) {
            console.log('updateTransferError:', err);
            toast.error(err.message);

            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteTransfer: async (documentId, fileReference) => {
        console.log('Delete', documentId);
        const deleteLoader = toast.loading('Deleting Transfer');
        try {
            await localDb.batch((tx) => {
                // GET TRANSFER DATA
                const currentTransfer = tx.get('transfers', documentId);
                console.log(currentTransfer);

                // GET ACCOUNT DATA
                const receiverAccountId = currentTransfer.targetReceiverAccount.id;
                const senderAccountId = currentTransfer.targetSenderAccount.id;
                const receiverAccount = tx.get('accounts', receiverAccountId);
                const senderAccount = tx.get('accounts', senderAccountId);

                if (senderAccount && receiverAccount) {
                    // UPDATE ACCOUNTS
                    tx.update('accounts', senderAccountId, {
                        account_amount: senderAccount.account_amount + currentTransfer.amount
                    });
                    tx.update('accounts', receiverAccountId, {
                        account_amount: receiverAccount.account_amount - currentTransfer.amount
                    });
                }

                // DELETE THE DOCUMENT
                tx.remove('transfers', documentId);
            });
            // ALERT A MESSAGE

            toast.success('Deleted Successfully!');

            return true;
        } catch (err) {
            console.log('deleteTransferError:', err);
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    setTransactions: (transferList) => {
        set({
            transfers: transferList
        });
    },
})

export const useTransferStore = create(transferStore);
