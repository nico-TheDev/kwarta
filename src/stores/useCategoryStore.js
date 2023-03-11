import { create } from 'zustand';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

import { db, storage } from '../../firebase.config';

const categoryStore = (set, get) => ({
    categories: [],
    reset: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),
    createCategory: async (newCategory) => {
        try {
            console.log(newCategory);

            await addDoc(collection(db, 'categories'), {
                ...newCategory,
                timestamp: serverTimestamp()
            });

            console.log('NEW DOCUMENT CREATED');
        } catch (err) {
            console.log('addCategoryError:', err);
        }
    },
    updateCategory: () => {},
    deleteCategory: () => {},
    incomeList: () => {
        return get().categories.filter((category) => category.category_type === 'income');
    },
    expenseList: () => {
        return get().categories.filter((category) => category.category_type === 'expense');
    }
});

export const useCategoryStore = create(categoryStore);
