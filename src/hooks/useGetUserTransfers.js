import { useEffect } from 'react';
import localDb from 'lib/localDb';

import { useTransferStore } from 'stores/useTransferStore'

export default function useGetUserTransfers(userID){
    const transfers = useTransferStore((state) => state.transfers)
    const setTransfers = useTransferStore((state) => state.setTransfers);

    useEffect(() => {
        if (!userID) {
            return;
        }

        const unsubscribe = localDb.subscribe('transfers', { where: { user_id: userID } }, (userTransfers) => {
            setTransfers(userTransfers);
        });
        return unsubscribe;
    }, []);
}
