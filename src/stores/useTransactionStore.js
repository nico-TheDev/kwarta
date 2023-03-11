import { create } from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../../firebase.config';

const transactionStore = (set, get) => ({
    transactions: [],
    getTransaction: () => {},
    createTransaction: async (newTransaction, currentFile) => {
        const loader = toast.loading('Creating Transaction');
        try {
            console.log('FIRST');
            // console.log('CURRENT FILE: ', currentFile);
            const accountRef = doc(db, 'accounts', newTransaction.targetAccount.id);
            const currentAccount = await getDoc(accountRef);

            // UPLOAD IMAGE
            let fileUrl, fileRefName;
            if (currentFile) {
                fileRefName = `transactions/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }

            // SUBTRACT
            if (newTransaction.type === 'expense') {
                if (currentAccount.data().account_amount > newTransaction.amount) {
                    await updateDoc(accountRef, {
                        account_amount: currentAccount.data().account_amount - newTransaction.amount
                    });
                } else {
                    throw new Error("You don't have enough money!");
                }
            } else {
                // INCOME
                await updateDoc(accountRef, {
                    account_amount: currentAccount.data().account_amount + newTransaction.amount
                });
            }

            await addDoc(collection(db, 'transactions'), {
                ...newTransaction,
                photoRef: fileRefName || '',
                photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });
            console.log('NEW DOCUMENT CREATED');
            // HANDLE TOAST
            toast.dismiss(loader);
            toast.success('Transaction successfully created!');
        } catch (err) {
            console.log('addTransactionError:', err);
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransaction: () => {},
    deleteTransaction: () => {},
    setTransactions: (transactionList) => {
        set({
            transactions: transactionList
        });
    }
});

export const useTransactionStore = create(transactionStore);
