'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/useAuthStore';
import useAccountsListener from '../stores/useAccountsListener';
import useGetUserCategories from '../hooks/useGetUserCategories';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore((state) => state.authState);

    useAccountsListener(user?.uid);
    useGetUserCategories(user?.uid);

    useEffect(() => {
        if (user) {
            if (user?.hasAnswered) {
                const path = window.location.pathname;
                if (path === '/editSurvey') return;
                if (['/login', '/sign-in', '/register'].includes(path) || user.hasAnswered) {
                    router.push('/dashboard');
                }
            } else {
                router.push('/survey');
            }
        }
    }, [user, isAuthenticated, router]);

    return <>{children}</>;
}
