import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db} from '../../firebase.config';

import { useAccountStore } from 'stores/useAccountStore';
import { useAuthStore } from 'stores/useAuthStore';

const useAccountsListener = () => {
    const userID = useAuthStore((state) => state.authState.user.uid);
    const accountColRef = collection(db, "accounts");
    const accounts = useAccountStore((state) => (state.accounts));
    const setAccounts = useAccountStore((state) => (state.setAccounts));
    const accountQuery = query(accountColRef, where("user_id", "==", userID));

    const data = [...accounts];

    useEffect(() => {
        const unsubscribe = onSnapshot(accountQuery, (snapshotData) => {
            const userAccounts = [];
            snapshotData.forEach(doc => {
                userAccounts.push({
                    account_color: doc.data().account_color,
                    account_icon: doc.data().account_icon,
                    account_name: doc.data().account_name,
                    account_amount: doc.data().account_amount,
                    user_id: userID || "1",
                    id: doc.id
                });
            });
            setAccounts(userAccounts);
        });
        return unsubscribe;
    }, []);
};

export default useAccountsListener;