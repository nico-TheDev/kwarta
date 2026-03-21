import { useEffect, useState } from 'react';
import { onSnapshot, collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

import { useTransferStore } from 'stores/useTransferStore'

export default function useGetUserTransfers(userID){
    const transfers = useTransferStore((state) => state.transfers)
    const setTransfers = useTransferStore((state) => state.setTransfers);

    useEffect(() => {
        if (!userID) {
            return;
        }
        const transferColRef = collection(db, 'transfers');
        const transferQuery = query(transferColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(transferQuery , (snapshotData) => {
            const userTransfers = [];
            snapshotData.forEach((doc) => {
                userTransfers.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setTransfers(userTransfers);
        });
        return unsubscribe;
    }, []);
}