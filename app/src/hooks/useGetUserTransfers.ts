import { useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useTransferStore } from 'stores/useTransferStore';

export default function useGetUserTransfers(userID: string | undefined) {
    const setTransfers = useTransferStore((state) => state.setTransfers);

    useEffect(() => {
        if (!userID) return;

        const transferColRef = collection(db, 'transfers');
        const transferQuery = query(transferColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(transferQuery, (snapshotData) => {
            const userTransfers: any[] = [];
            snapshotData.forEach((doc) => userTransfers.push({ ...doc.data(), id: doc.id }));
            setTransfers(userTransfers);
        });

        return unsubscribe;
    }, [userID]);
}
