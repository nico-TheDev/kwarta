import { useState, useEffect } from 'react';
import { useCategoryStore } from 'stores/useCategoryStore';
import { Category } from 'stores/useCategoryStore';

type TransactionType = 'expense' | 'income' | 'savings' | 'investments';

export default function useSortCategories(setSelectedCategory: (val: string) => void = () => {}) {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [transactionType, setTransactionType] = useState<TransactionType>('expense');

    const categories = useCategoryStore((state) => state.categories);
    const getIncomeList = useCategoryStore((state) => state.incomeList);
    const getExpenseList = useCategoryStore((state) => state.expenseList);
    const getSavingsList = useCategoryStore((state) => state.savingsList);
    const getInvestmentList = useCategoryStore((state) => state.investmentList);

    const handleTransactionType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionType(e.target.value as TransactionType);
    };

    useEffect(() => {
        if (transactionType === 'expense') setCategoryData(getExpenseList());
        else if (transactionType === 'income') setCategoryData(getIncomeList());
        else if (transactionType === 'savings') setCategoryData(getSavingsList());
        else if (transactionType === 'investments') setCategoryData(getInvestmentList());
        setSelectedCategory('');
    }, [transactionType, categories]);

    return [transactionType, setTransactionType, handleTransactionType, categoryData] as const;
}
