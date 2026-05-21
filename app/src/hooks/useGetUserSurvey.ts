import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useAuthStore } from 'stores/useAuthStore';

export default function useGetUserSurvey(userID: string | undefined) {
    const setUserSurvey = useAuthStore((state) => state.setUserSurvey);

    useEffect(() => {
        if (!userID || !db) return;

        const userRef = doc(db, 'users', userID);

        const unsubscribe = onSnapshot(
            userRef,
            (snapshot) => {
                if (!snapshot.exists()) return;
                const data = snapshot.data();
                setUserSurvey({
                    priorities: data.priorities ?? null,
                    financeRule: data.financeRule ?? null,
                    salary: data.salary ?? null,
                });
            },
            (error) => {
                console.error('[useGetUserSurvey] listener error:', error);
            }
        );

        return unsubscribe;
    }, [userID, setUserSurvey]);
}
