import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

import premadeCategories from 'data/categories';

import { useCategoryStore } from 'stores/useCategoryStore';
import { useAuthStore } from 'stores/useAuthStore';

export default function useGetUserCategories(userID) {
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        const categoryColRef = collection(db, 'categories');
        const categoryQuery = query(categoryColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            const prepCategories = premadeCategories.map((category) => ({
                ...category,
                user_id: userID
            }));
            const userList = [];

            snapshotData.forEach((doc) => {
                if (prepCategories.some((item) => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc.data(),
                    type: doc.data().category_type,
                    id: doc.id
                });
            });
            setCategories([...prepCategories, ...userList]);
        });

        return unsubscribe;
    }, []);
}
