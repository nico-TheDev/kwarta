import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthStore } from 'stores/useAuthStore';

export const AuthGuard = (props) => {
    const { children } = props;
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore((state) => state.authState);

    const ignore = useRef(false);
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        if (!user) {
            // console.log('Not authenticated, redirecting', { isAuthenticated });
            router
                .replace({
                    pathname: '/'
                })
                .catch(console.error);
        } else {
            // console.log('CHECKED !')
            setChecked(true);
        }
    }, [router.isReady]);

    if (!checked) {
        return null;
    }


    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};
