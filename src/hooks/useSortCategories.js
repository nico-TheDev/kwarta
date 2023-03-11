import { useState, useEffect } from 'react';
import { useCategoryStore } from 'stores/useCategoryStore';

export default function useSortCategories(setSelectedCategory = () => {}) {
    const [categoryData, setCategoryData] = useState([]);
    const [isExpense, setIsExpense] = useState(true);

    const categories = useCategoryStore((state) => state.categories);
    const getIncomeList = useCategoryStore((state) => state.incomeList);
    const getExpenseList = useCategoryStore((state) => state.expenseList);

    const handleExpense = () => {
        setIsExpense(!isExpense);
    };

    useEffect(() => {
        if (isExpense) {
            setCategoryData(getExpenseList());
        } else {
            setCategoryData(getIncomeList());
        }
        setSelectedCategory('');
    }, [isExpense, categories]);

    return [isExpense, setIsExpense, handleExpense, categoryData];
}
