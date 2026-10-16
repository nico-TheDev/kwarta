import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';

import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/router';
import useAccountsListener from 'stores/useAccountsListener';
import useGetUserCategories from 'hooks/useGetUserCategories';
import '../theme/global.css';
import '../theme/global.css';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const AUTH_PAGES = ['/login', '/sign-in', '/register'];

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

    // THE ONLY POST LOGIN REDIRECT: UNANSWERED USERS GO TO THE SURVEY, SIGNED IN USERS LEAVE THE AUTH PAGES
    useEffect(() => {
        if (!router.isReady || !user) return;

        if (!user.hasAnswered) {
            if (router.pathname !== '/survey') {
                router.replace('/survey');
            }
        } else if (AUTH_PAGES.includes(router.pathname)) {
            router.replace('/dashboard');
        }
    }, [user?.uid, user?.hasAnswered, router.isReady, router.pathname]);
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
                />
                <meta name='description' content='Description' />
                <meta name='keywords' content='Keywords' />
                <title>CASH: Financial Monitoring System</title>
                <link rel='icon' href='/static/icons/favicon.ico' />
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Toaster
                    position='bottom-left'
                    toastOptions={{
                        style: {
                            boxShadow: '9px 9px 40px -3px rgba(0,0,0,0.81)'
                        }
                    }}
                />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;
