import { useEffect } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useAccountStore, Account } from './useAccountStore';

const useAccountsListener = (userID: string | undefined) => {
    const setAccounts = useAccountStore((state) => state.setAccounts);

    useEffect(() => {
        if (!userID) return;

        const accountColRef = collection(db, 'accounts');
        const accountQuery = query(accountColRef, where('user_id', '==', userID));

        const unsubscribe = onSnapshot(accountQuery, (snapshotData) => {
            const userAccounts: Account[] = [];
            snapshotData.forEach((doc) => {
                const data = doc.data();
                userAccounts.push({
                    account_color: data.account_color,
                    account_icon: data.account_icon,
                    account_name: data.account_name,
                    account_amount: data.account_amount,
                    account_description: data.account_description,
                    account_type: data.account_type,
                    user_id: userID,
                    id: doc.id,
                    timestamp: data.timestamp?.toDate() || '',
                });
            });
            setAccounts(userAccounts);
        });

        return unsubscribe;
    }, [userID]);
};

export default useAccountsListener;
