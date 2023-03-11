import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/router';
import useAccountsListener from 'stores/useAccountsListener';
import useGetUserCategories from 'hooks/useGetUserCategories';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const { isLoading } = useAuthStore((state) => state.authState);
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    const { user, isAuthenticated } = useAuthStore((state) => state.authState);
    // ACCOUNTS LISTENER
    useAccountsListener(user?.uid);
    // CATEGORIES LISTENER
    useGetUserCategories(user?.uid);

    // HANDLE USER AUTH IF THERE IS AN EXISTING USER , REDIRECT TO DASHBOARD
    useEffect(() => {
        console.log(router.pathname);
        if (user) {
            if (router.pathname !== '/' && ['/login', '/sign-in', '/register'].includes(router.pathname)) {
                router.push('/');
            } else {
                router.push(router.pathname);
            }
        }
    }, [user, isAuthenticated]);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>CASH: Financial Monitoring System</title>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Toaster position='bottom-left' />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {isLoading ? <Fragment /> : getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;
