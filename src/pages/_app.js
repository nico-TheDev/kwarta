import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
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
import { useAccountStore } from 'stores/useAccountStore';
import { useTransactionStore } from 'stores/useTransactionStore';
const Tour = dynamic(() => import('../components/tour'), { ssr: false });

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const { isLoading } = useAuthStore((state) => state.authState);
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user, isAuthenticated } = useAuthStore((state) => state.authState);
    const accounts = useAccountStore((state) => state.accounts);
    const transactions = useTransactionStore((state) => state.transactions);
    // ACCOUNTS LISTENER
    useAccountsListener(user?.uid);
    // CATEGORIES LISTENER
    useGetUserCategories(user?.uid);

    // HANDLE USER AUTH IF THERE IS AN EXISTING USER , REDIRECT TO DASHBOARD
    useEffect(() => {
        console.log(router.pathname);
        // console.log(router.query);
        // console.log(user);
        if (user) {
            if (user?.hasAnswered) {
                if (router.pathname === '/editSurvey') {
                    router.push('/editSurvey');
                } else if (
                    (router.pathname !== '/' && ['/login', '/sign-in', '/register'].includes(router.pathname)) ||
                    user.hasAnswered
                ) {
                    router.push('/');
                }
            } else if (!user?.hasAnswered) {
                router.push('/survey');
            }
        }
    }, [user, isAuthenticated]);

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
                <meta name='viewport' content='initial-scale=1, width=device-width' />

                <link rel='manifest' href='/manifest.json' />
                <link rel='icon' href='/favicon.ico' type='image/png' />
                <meta name='theme-color' content='#317EFB' />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {transactions.length === 0 && accounts.length === 0 ? (
                    <Tour open={open} handleClose={handleClose} />
                ) : null}
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
                    {isLoading ? <Fragment /> : getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;
