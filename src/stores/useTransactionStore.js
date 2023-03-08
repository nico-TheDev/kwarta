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
        try {
            // console.log(newTransaction);
            // console.log('CURRENT FILE: ', currentFile);
            // const accountRef = doc(db, 'accounts', newTransaction.target_account);

            // const currentAccount = await getDoc(accountRef);
            // UPLOAD IMAGE
            let fileUrl, fileRefName;
            if (currentFile) {
                fileRefName = `transactions/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);

                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
                console.log('UPLOADED');
            }

            await addDoc(collection(db, 'transactions'), {
                ...newTransaction,
                photoRef: fileRefName || '',
                photoUrl: fileUrl || '',
                timestamp: serverTimestamp()
            });

            // // console.log(currentAccount.data());
            // // SUBTRACT
            // if (newTransaction.type === 'expense') {
            //     await updateDoc(accountRef, {
            //         account_amount: currentAccount.data().account_amount - newTransaction.amount
            //     });
            // } else {
            //     // INCOME
            //     await updateDoc(accountRef, {
            //         account_amount: currentAccount.data().account_amount + newTransaction.amount
            //     });
            // }

            console.log('NEW DOCUMENT CREATED');
        } catch (err) {
            console.log('addTransactionError:', err);
            toast.error('Error: ', err.message);
        }
    },
    updateTransaction: () => {},
    deleteTransaction: () => {}
});

export const useTransactionStore = create(transactionStore);
