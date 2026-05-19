import { useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import premadeCategories from 'data/categories';
import { useCategoryStore } from 'stores/useCategoryStore';

export default function useGetUserCategories(userID: string | undefined) {
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        if (!userID) return;

        const categoryColRef = collection(db, 'categories');
        const categoryQuery = query(categoryColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(categoryQuery, (snapshotData) => {
            const prepCategories = premadeCategories.map((category: any) => ({ ...category, user_id: userID }));
            const userList: any[] = [];

            snapshotData.forEach((doc) => {
                const idx = prepCategories.findIndex((item: any) => item.id === doc.id);
                if (idx !== -1) prepCategories.splice(idx, 1);
                userList.push({ ...doc.data(), type: doc.data().category_type, id: doc.id });
            });

            setCategories([...prepCategories, ...userList]);
        });

        return unsubscribe;
    }, [userID]);
}
