import { useEffect } from 'react';
import localDb from 'lib/localDb';

import { useTransactionStore } from 'stores/useTransactionStore';

export default function useGetUserTransactions(userID) {
    const setTransactions = useTransactionStore((state) => state.setTransactions);

    useEffect(() => {
        if (!userID) return;
        const transactionQuery = { where: { user_id: userID }, orderBy: ['timestamp', 'desc'] };
        const unsubscribe = localDb.subscribe('transactions', transactionQuery, (dataList) => {
            const isEmpty = dataList.length === 0;

            // console.log(dataList);
            setTransactions(dataList, isEmpty);
        });

        return unsubscribe;
    }, []);
}
