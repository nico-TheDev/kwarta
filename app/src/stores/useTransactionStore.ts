import { create } from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase.config';
import { blue, deepPurple, green, red, yellow } from '@mui/material/colors';
import { ICON_NAMES } from 'constants/constant';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export interface TransactionCategory {
    id: string;
    category_name: string;
    category_type: string;
    category_icon: string;
    category_color: string;
    expense_type?: string;
}

export interface Transaction {
    id: string;
    amount: number;
    type: 'expense' | 'income' | 'savings' | 'investments';
    category: TransactionCategory;
    targetAccount: { id: string; account_name: string };
    description?: string;
    photoRef: string;
    photoUrl: string;
    timestamp: Date | string;
    user_id: string;
}

export interface AggregatedData {
    user_id: string;
    amount: number;
    type: string;
    category_name: string;
    transaction_icon: string;
    color: string;
    transaction_color: string;
}

interface TransactionStore {
    transactions: Transaction[];
    isEmpty: boolean;
    getTransaction: () => void;
    resetTransactions: () => void;
    createTransaction: (newTransaction: Omit<Transaction, 'id' | 'timestamp' | 'photoRef' | 'photoUrl'>, currentFile?: File) => Promise<void>;
    updateTransaction: (documentId: string, updatedTransaction: Partial<Transaction>, newFile?: { source: string; file: File } | null) => Promise<boolean>;
    deleteTransaction: (documentId: string, fileReference: string) => Promise<boolean | undefined>;
    setTransactions: (transactionList: Transaction[], isEmpty?: boolean) => void;
    getExpenseList: (user_id: string) => AggregatedData[];
    getIncomeList: (user_id: string) => AggregatedData[];
    getSavingsList: (user_id: string) => AggregatedData[];
    getInvestmentsList: (user_id: string) => AggregatedData[];
    getExpenseTypeList: (user_id: string) => { name: string; amount: number; type: string; color: string; icon: string }[];
}

const aggregateByCategory = (list: Transaction[], type: string, user_id: string): AggregatedData[] => {
    const categoryNames = list.reduce((acc: string[], t) => {
        if (!acc.includes(t.category.category_name)) acc.push(t.category.category_name);
        return acc;
    }, []);

    const dataList = categoryNames.map((category) => {
        const target = list.find((t) => t.category.category_name === category)!;
        return {
            user_id,
            amount: 0,
            type,
            category_name: category,
            transaction_icon: target.category.category_icon,
            color: target.category.category_color,
            transaction_color: target.category.category_color,
        };
    });

    list.forEach((item) => {
        const target = dataList.find((d) => d.category_name === item.category.category_name);
        if (target) target.amount += item.amount;
    });

    return dataList;
};

const transactionStore = (set: any, get: any): TransactionStore => ({
    transactions: [],
    isEmpty: false,
    getTransaction: () => {},
    resetTransactions: () => set({ transactions: [] }),
    createTransaction: async (newTransaction, currentFile) => {
        const loader = toast.loading('Creating Transaction');
        try {
            if (!newTransaction.amount || !newTransaction.targetAccount || !newTransaction.category) {
                throw new Error('Check the input fields');
            }

            const accountRef = doc(db, 'accounts', newTransaction.targetAccount.id);
            const currentAccount = await getDoc(accountRef);

            let fileUrl: string | undefined, fileRefName: string | undefined;
            if (currentFile) {
                fileRefName = `transactions/${uuidv4()}-${currentFile.name}`;
                const imageRef = ref(storage, fileRefName);
                const fileUpload = await uploadBytes(imageRef, currentFile);
                fileUrl = await getDownloadURL(fileUpload.ref);
            }

            if (['expense', 'savings', 'investments'].includes(newTransaction.type)) {
                if (currentAccount.data()!.account_amount > newTransaction.amount) {
                    await updateDoc(accountRef, { account_amount: currentAccount.data()!.account_amount - newTransaction.amount });
                } else {
                    throw new Error("You don't have enough money!");
                }
            } else {
                await updateDoc(accountRef, { account_amount: currentAccount.data()!.account_amount + newTransaction.amount });
            }

            await addDoc(collection(db, 'transactions'), {
                ...newTransaction,
                photoRef: fileRefName || '',
                photoUrl: fileUrl || '',
                timestamp: serverTimestamp(),
            });

            toast.dismiss(loader);
            toast.success('Transaction successfully created!');
        } catch (err: any) {
            toast.error(err.message);
            toast.dismiss(loader);
        }
    },
    updateTransaction: async (documentId, updatedTransaction, newFile) => {
        const editLoader = toast.loading('Updating Transaction');
        try {
            const docRef = doc(db, 'transactions', documentId);
            const currentTransactionResponse = await getDoc(docRef);
            const currentTransaction = currentTransactionResponse.data()!;

            if (currentTransaction.targetAccount.id === updatedTransaction.targetAccount?.id) {
                const accountRef = doc(db, 'accounts', updatedTransaction.targetAccount!.id);
                const currentAccountResponse = await getDoc(accountRef);
                const currentAccount = currentAccountResponse.data()!;
                let originalAmount = ['expense', 'savings', 'investments'].includes(currentTransaction.type)
                    ? currentAccount.account_amount + currentTransaction.amount
                    : currentAccount.account_amount - currentTransaction.amount;
                const updatedAmount = ['expense', 'savings', 'investments'].includes(updatedTransaction.type!)
                    ? originalAmount - updatedTransaction.amount!
                    : originalAmount + updatedTransaction.amount!;
                await updateDoc(accountRef, { account_amount: updatedAmount });
            }

            const fileRef = ref(storage, currentTransaction.photoRef);
            let fileUrl: string | undefined, fileRefName: string | undefined;
            if (currentTransaction.photoUrl !== newFile?.source) {
                if (currentTransaction.photoUrl !== '') await deleteObject(fileRef);
                if (newFile) {
                    fileRefName = `transactions/${uuidv4()}-${newFile.file.name}`;
                    const imageRef = ref(storage, fileRefName);
                    const fileUpload = await uploadBytes(imageRef, newFile.file);
                    fileUrl = await getDownloadURL(fileUpload.ref);
                }
            }

            await updateDoc(docRef, {
                ...updatedTransaction,
                photoRef: fileRefName || currentTransaction.photoRef,
                photoUrl: fileUrl || currentTransaction.photoUrl,
            });

            toast.success('Updated Successfully.');
            return true;
        } catch (err: any) {
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteTransaction: async (documentId, fileReference) => {
        const deleteLoader = toast.loading('Deleting Transaction');
        const docRef = doc(db, 'transactions', documentId);
        const fileRef = ref(storage, fileReference);
        try {
            const currentTransactionResponse = await getDoc(docRef);
            const currentTransaction = currentTransactionResponse.data()!;
            const accountRef = doc(db, 'accounts', currentTransaction.targetAccount.id);
            const currentAccountResponse = await getDoc(accountRef);
            const currentAccount = currentAccountResponse.data();

            if (currentAccount) {
                if (['expense', 'savings', 'investments'].includes(currentTransaction.type)) {
                    await updateDoc(accountRef, { account_amount: currentAccount.account_amount + currentTransaction.amount });
                } else {
                    await updateDoc(accountRef, { account_amount: currentAccount.account_amount - currentTransaction.amount });
                }
            }

            await deleteDoc(docRef);
            if (fileReference) await deleteObject(fileRef);
            toast.success('Deleted Successfully!');
            return true;
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    setTransactions: (transactionList, isEmpty = false) => set({ transactions: transactionList, isEmpty }),
    getExpenseList: (user_id) => aggregateByCategory(get().transactions.filter((t: Transaction) => t.type === 'expense'), 'expense', user_id),
    getIncomeList: (user_id) => aggregateByCategory(get().transactions.filter((t: Transaction) => t.type === 'income'), 'income', user_id),
    getSavingsList: (user_id) => aggregateByCategory(get().transactions.filter((t: Transaction) => t.type === 'savings'), 'savings', user_id),
    getInvestmentsList: (user_id) => aggregateByCategory(get().transactions.filter((t: Transaction) => t.type === 'investments'), 'investments', user_id),
    getExpenseTypeList: (user_id) => {
        const expenseList = get().transactions.filter((t: Transaction) => t.type === 'expense');
        const totalSavings = get().transactions.filter((t: Transaction) => t.type === 'savings').reduce((acc: number, cur: Transaction) => acc + cur.amount, 0);

        const expenseTypeDataList = [
            { name: 'Needs', amount: 0, type: 'needs', color: green[500], icon: ICON_NAMES.SYSTEM_ICONS.WANTS },
            { name: 'Wants', amount: 0, type: 'wants', color: red[500], icon: ICON_NAMES.SYSTEM_ICONS.NEEDS },
            { name: 'Savings', amount: totalSavings, type: 'savings', color: deepPurple[500], icon: ICON_NAMES.CATEGORY_ICONS.SAVINGS },
        ];

        expenseList.forEach((item: Transaction) => {
            const target = expenseTypeDataList.find((d) => item.category.expense_type === d.type);
            if (target) target.amount += item.amount;
        });

        return expenseTypeDataList;
    },
});

export const useTransactionStore = create(transactionStore);
