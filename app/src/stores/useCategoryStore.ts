import { create } from 'zustand';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import toast from 'react-hot-toast';

export interface Category {
    id: string;
    category_name: string;
    category_type: 'income' | 'expense' | 'savings' | 'investments';
    category_icon: string;
    category_color: string;
    expense_type?: string;
    user_id: string;
    timestamp?: Date | string;
}

interface CategoryStore {
    categories: Category[];
    resetCategories: () => void;
    setCategories: (data: Category[]) => void;
    createCategory: (newCategory: Omit<Category, 'id'>) => Promise<void>;
    updateCategory: (documentId: string, updatedCategory: Partial<Category>) => Promise<boolean>;
    deleteCategory: (documentId: string) => Promise<boolean | undefined>;
    incomeList: () => Category[];
    expenseList: () => Category[];
    savingsList: () => Category[];
    investmentList: () => Category[];
}

const categoryStore = (set: any, get: any): CategoryStore => ({
    categories: [],
    resetCategories: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),
    createCategory: async (newCategory) => {
        try {
            await addDoc(collection(db, 'categories'), { ...newCategory, timestamp: serverTimestamp() });
        } catch (err: any) {
            console.log('addCategoryError:', err);
        }
    },
    updateCategory: async (documentId, updatedCategory) => {
        const editLoader = toast.loading('Updating Category');
        try {
            const docRef = doc(db, 'categories', documentId);
            await updateDoc(docRef, { ...updatedCategory });
            toast.success('Updated Successfully.');
            return true;
        } catch (err: any) {
            toast.error(err.message);
            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteCategory: async (documentId) => {
        const deleteLoader = toast.loading('Deleting Category');
        const docRef = doc(db, 'categories', documentId);
        try {
            await deleteDoc(docRef);
            toast.success('Deleted Successfully!');
            return true;
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    incomeList: () => get().categories.filter((c: Category) => c.category_type === 'income'),
    expenseList: () => get().categories.filter((c: Category) => c.category_type === 'expense'),
    savingsList: () => get().categories.filter((c: Category) => c.category_type === 'savings'),
    investmentList: () => get().categories.filter((c: Category) => c.category_type === 'investments'),
});

export const useCategoryStore = create(categoryStore);
