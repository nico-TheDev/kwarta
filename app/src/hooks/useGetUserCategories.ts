import { useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import premadeCategories from 'data/categories';
import { useCategoryStore } from 'stores/useCategoryStore';

export default function useGetUserCategories(userID: string | undefined) {
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        if (!userID || !db) return;

        const categoryColRef = collection(db, 'categories');
        const categoryQuery = query(categoryColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(
            categoryQuery,
            (snapshotData) => {
                const prepCategories = premadeCategories.map((category: any) => ({ ...category, user_id: userID }));
                const userList: any[] = [];

                snapshotData.forEach((docSnap) => {
                    const idx = prepCategories.findIndex((item: any) => item.id === docSnap.id);
                    if (idx !== -1) prepCategories.splice(idx, 1);
                    userList.push({ ...docSnap.data(), type: docSnap.data().category_type, id: docSnap.id });
                });

                setCategories([...prepCategories, ...userList]);
            },
            (error) => {
                console.error('[useGetUserCategories] listener error:', error);
            }
        );

        return unsubscribe;
    }, [userID, setCategories]);
}
