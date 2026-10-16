import { useEffect } from 'react';
import localDb from 'lib/localDb';

import { useAuthStore } from 'stores/useAuthStore';

export default function useGetUserTransfersSurvey(userID){
    const setUserSurvey = useAuthStore((state) => state.setUserSurvey);
    useEffect(() => {
        if (!userID) {
            return;
        }

        const unsubscribe = localDb.subscribe('users', { where: { uid: userID } }, (userSurvey) => {
            // console.log(userSurvey);
            setUserSurvey(userSurvey);
        });
        return unsubscribe;
    }, []);
}
