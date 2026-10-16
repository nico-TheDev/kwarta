import { useEffect } from 'react';
import localDb from 'lib/localDb';

import premadeCategories from 'data/categories';

import { useCategoryStore } from 'stores/useCategoryStore';

export default function useGetUserCategories(userID) {
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        if (!userID) return;

        const unsubscribe = localDb.subscribe('categories', { where: { user_id: userID } }, (docs) => {
            const prepCategories = premadeCategories.map((category) => ({
                ...category,
                user_id: userID
            }));
            const userList = [];

            docs.forEach((doc) => {
                if (prepCategories.some((item) => item.id === doc.id)) {
                    const objIndex = prepCategories.findIndex((item) => item.id === doc.id);
                    prepCategories.splice(objIndex, 1);
                }
                userList.push({
                    ...doc,
                    type: doc.category_type,
                    id: doc.id
                });
            });
            setCategories([...prepCategories, ...userList]);
        });

        return unsubscribe;
    }, [userID]);
}
