import { create } from 'zustand';
import toast from 'react-hot-toast';

import localDb from 'lib/localDb';

const categoryStore = (set, get) => ({
    categories: [],
    resetCategories: () => set({ categories: [] }),
    setCategories: (data) => set({ categories: data }),
    createCategory: async (newCategory) => {
        try {
            console.log(newCategory);

            await localDb.add('categories', newCategory);

            console.log('NEW DOCUMENT CREATED');
        } catch (err) {
            console.log('addCategoryError:', err);
        }
    },
    updateCategory: async (documentId, updatedCategory) => {
        const editLoader = toast.loading('Updating Category');
        try {
            await localDb.update('categories', documentId, updatedCategory);

            toast.success('Updated Successfully.');

            return true;
        } catch (err) {
            console.log('updateCategoryError:', err);
            toast.error(err.message);

            return false;
        } finally {
            toast.dismiss(editLoader);
        }
    },
    deleteCategory: async (documentId) => {
        console.log('Delete', documentId);
        const deleteLoader = toast.loading('Deleting Account');
        try {
            // DELETE THE DOCUMENT
            await localDb.remove('categories', documentId);
            // ALERT A MESSAGE

            toast.success('Deleted Successfully!');

            return true;
        } catch (err) {
            console.log('deleteCategoryError:', err);
            toast.error(err.message);
        } finally {
            toast.dismiss(deleteLoader);
        }
    },
    incomeList: () => {
        return get().categories.filter((category) => category.category_type === 'income');
    },
    expenseList: () => {
        return get().categories.filter((category) => category.category_type === 'expense');
    },
    savingsList: () => {
        return get().categories.filter((category) => category.category_type === 'savings');
    },
    investmentList: () => {
        return get().categories.filter((category) => category.category_type === 'investments');
    }
});

export const useCategoryStore = create(categoryStore);
