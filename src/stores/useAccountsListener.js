import { useEffect } from 'react';
import localDb from 'lib/localDb';

import { useAccountStore } from 'stores/useAccountStore';

const useAccountsListener = (userID) => {
    const setAccounts = useAccountStore((state) => state.setAccounts);

    useEffect(() => {
        if (!userID) {
            return;
        }

        const unsubscribe = localDb.subscribe('accounts', { where: { user_id: userID } }, (docs) => {
            const userAccounts = docs.map((doc) => ({
                account_color: doc.account_color,
                account_icon: doc.account_icon,
                account_name: doc.account_name,
                account_amount: doc.account_amount,
                account_description: doc.account_description,
                account_type: doc.account_type,
                user_id: userID || '1',
                id: doc.id,
                timestamp: doc.timestamp ? new Date(doc.timestamp) : ''
            }));
            setAccounts(userAccounts);
        });
        return unsubscribe;
    }, [userID]);
};

export default useAccountsListener;
