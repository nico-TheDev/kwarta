import { useEffect } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useTransactionStore } from 'stores/useTransactionStore';

export default function useGetUserTransactions(userID: string | undefined) {
    const setTransactions = useTransactionStore((state) => state.setTransactions);

    useEffect(() => {
        if (!userID || !db) return;

        const transactionColRef = collection(db, 'transactions');
        const transactionQuery = query(transactionColRef, where('user_id', '==', userID), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(
            transactionQuery,
            (snapshotData) => {
                const dataList: any[] = [];
                const isEmpty = snapshotData.docs.length === 0;
                snapshotData.forEach((docSnap) => dataList.push({ ...docSnap.data(), id: docSnap.id }));
                setTransactions(dataList, isEmpty);
            },
            (error) => {
                console.error('[useGetUserTransactions] listener error:', error);
            }
        );

        return unsubscribe;
    }, [userID, setTransactions]);
}
