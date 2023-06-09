import { useState, useEffect } from 'react';
import { useCategoryStore } from 'stores/useCategoryStore';

export default function useSortCategories(setSelectedCategory = () => {}) {
    const [categoryData, setCategoryData] = useState([]);
    const [transactionType, setTransactionType] = useState('');

    const categories = useCategoryStore((state) => state.categories);
    const getIncomeList = useCategoryStore((state) => state.incomeList);
    const getExpenseList = useCategoryStore((state) => state.expenseList);
    const getSavingsList = useCategoryStore((state) => state.savingsList);
    const getInvestmentList = useCategoryStore((state) => state.investmentList);

    const handleTransactionType = (e) => {
        setTransactionType(e.target.value);
    };

    useEffect(() => {
        if (transactionType === 'expense') {
            setCategoryData(getExpenseList());
        } else if (transactionType === 'income') {
            setCategoryData(getIncomeList());
        } else if (transactionType === 'savings') {
            setCategoryData(getSavingsList());
        } else if (transactionType === 'investments') {
            setCategoryData(getInvestmentList());
        }
        setSelectedCategory('');
    }, [transactionType, categories]);

    return [transactionType, setTransactionType, handleTransactionType, categoryData];
}
