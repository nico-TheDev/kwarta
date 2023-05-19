import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button, CssBaseline, Paper, Typography, Box, Link,
    CardMedia, Card, CardContent, Stack, Chip} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';

import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/router';
import useAccountsListener from 'stores/useAccountsListener';
import useGetUserCategories from 'hooks/useGetUserCategories';
import articles from '../data/articles';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const { isLoading } = useAuthStore((state) => state.authState);
    const router = useRouter();
    const getLayout = Component.getLayout ?? ((page) => page);

    const { user, isAuthenticated } = useAuthStore((state) => state.authState);

    const [disablePopup, setDisablePopup] = useState(false);
    const [article, setArticle] = useState('');

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

    const getRandomObject = () => {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const randomObject = articles[randomIndex];
        setArticle(randomObject);
    };

    useEffect(() => {
        const disablePopupValue = localStorage.getItem('disablePopup');
        if (disablePopupValue) {
            setDisablePopup(true);
            }
    }, []);

    const handleClick = (e) => {
        const isChecked = true
        setDisablePopup(isChecked);
        
        if (isChecked) {
            localStorage.setItem('disablePopup', true);
        } else {
            localStorage.removeItem('disablePopup');
        }
    };

    useEffect(() => {
        const popupInterval = setInterval(() => {
            getRandomObject();
            if (!disablePopup) {
                toast.custom(
                    <Paper sx={{ p: 2, gap: 2, alignItems: 'center' }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ mb: 1 }}>
                                So you may want to read about:
                            </Typography>
                            <Link href={article.articleLink} underline='none' target='_blank'>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        {/* <CardMedia
                                            sx={{ height: 140, mb: 2 }}
                                            image={article.articleImage}
                                            title={article.articleTitle}
                                        /> */}
                                        <Box>
                                            <Typography color='textPrimary' variant='h6' mb={4}>
                                                {article.articleTitle}
                                            </Typography>
                                            {/* <Stack direction='row' spacing={1} mb={2}>
                                                {article.articleTags.map((item) => (
                                                    <Chip label={item} variant='outlined' color='secondary' />
                                                ))}
                                            </Stack> */}
                                            <Typography color='textSecondary' variant='subtitle1'>
                                                {article.articleAuthor}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                        <Button sx={{ mt: 1 }} variant='outlined' onClick={handleClick}>Turn off reminders</Button>
                    </Paper>,
                    {
                        duration: 3000, // Automatically close after 5 seconds
                        position: 'top-right'
                    }
                );
            }
        },  10 * 1000); // 5 minutes in milliseconds

        return () => clearInterval(popupInterval);
    }, [toast, disablePopup, article]);

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
