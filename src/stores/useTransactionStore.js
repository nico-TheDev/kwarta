import { create } from 'zustand';

const transactionStore = (set, get) => ({
    transactions: [],
    getTransaction: () => {},
    createTransaction: () => {},
    updateTransaction: () => {},
    deleteTransaction: () => {}
});

export const useTransactionStore = create(transactionStore);
