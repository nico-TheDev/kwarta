import { useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useAuthStore } from 'stores/useAuthStore';

export default function useGetUserSurvey(userID: string | undefined) {
    const setUserSurvey = useAuthStore((state) => state.setUserSurvey);

    useEffect(() => {
        if (!userID) return;

        const userColRef = collection(db, 'users');
        const userQuery = query(userColRef, where('uid', '==', userID));

        const unsubscribe = onSnapshot(userQuery, (snapshotData) => {
            const userSurvey: any[] = [];
            snapshotData.forEach((doc) => userSurvey.push({ ...doc.data(), id: doc.id }));
            setUserSurvey(userSurvey[0] ?? null);
        });

        return unsubscribe;
    }, [userID]);
}
