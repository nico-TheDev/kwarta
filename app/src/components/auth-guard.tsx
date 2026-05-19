'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from 'stores/useAuthStore';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useAuthStore((state) => state.authState);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!user) {
            router.replace('/');
        } else {
            setChecked(true);
        }
    }, [user, router]);

    if (!checked) return null;

    return <>{children}</>;
};
