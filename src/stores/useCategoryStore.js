import { create } from 'zustand';
import toast from 'react-hot-toast';

import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

import { db, storage } from '../../firebase.config';

const categoryStore = (set, get) => ({
    categories: [],
    resetCategories: () => set({ categories: [] }),
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
    updateCategory: async (documentId, updatedCategory) => {
        const editLoader = toast.loading('Updating Category');
        try {
            const docRef = doc(db, 'categories', documentId);
            const currentCategoryResponse = await getDoc(docRef);
            const currentCategory = currentCategoryResponse.data();
            // SAME ACCOUNTS
            console.log(currentCategory);
            // CREATE A REFERENCE TO THE DOCUMENT AND THE FILE
            await updateDoc(docRef, {
                ...updatedCategory
            });

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
        // CREATE A REFERENCE FOR THE DOCUMENT AND THE FILE
        const docRef = doc(db, 'categories', documentId);
        try {
            // DELETE THE DOCUMENT AND OBJECT
            await deleteDoc(docRef);
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
    }
});

export const useCategoryStore = create(categoryStore);
