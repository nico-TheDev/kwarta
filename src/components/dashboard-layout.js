import { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, Link, CardMedia, Card, CardContent, Stack, Chip } from '@mui/material';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';

import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useAccountStore } from 'stores/useAccountStore';
import { useTransactionStore } from 'stores/useTransactionStore';
const Tour = dynamic(() => import('../components/tour'), { ssr: false });
import articles from 'data/articles';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const DashboardLayout = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(true);
    const [showTour, setShowTour] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const accounts = useAccountStore((state) => state.accounts);
    const transactions = useTransactionStore((state) => state.transactions);
    const [showSuggestion, setShowSuggestion] = useState(true);
    const [article, setArticle] = useState(articles[0]);
    let popupToast;

    useEffect(() => {
        console.log({ showTour, transactions: transactions.length });
        if (transactions.length === 0 || accounts.length === 0) {
            setShowTour(true);
        } else {
            setShowTour(false);
        }
    }, [transactions.length, accounts.length]);

    useEffect(() => {
        if (localStorage.getItem('showPopup')) {
            setShowSuggestion(JSON.parse(localStorage.getItem('showPopup')));
        } else {
            localStorage.setItem('showPopup', true);
        }
    }, []);

    const handleClick = (id) => {
        toast.remove(id);
        localStorage.setItem('showPopup', false);
        setShowSuggestion(false);
    };

    useEffect(() => {
        const popupInterval = setInterval(() => {
            // get random article
            const randomIndex = Math.floor(Math.random() * articles.length);
            const randomObject = articles[randomIndex];
            setArticle(randomObject);

            if (showSuggestion) {
                toast.custom(
                    (t) => (
                        <Paper sx={{ p: 2, gap: 2, alignItems: 'center', zIndex: 999999 }}>
                            <Box sx={{ mb: 1, width: 300 }}>
                                <Typography
                                    variant='subtitle1'
                                    color='textSecondary'
                                    sx={{ mb: 2, display: 'inline-block' }}
                                >
                                    So you may want to read about:
                                </Typography>
                                <Link href={article.articleLink} underline='none' target='_blank'>
                                    <Box>
                                        <Typography color='textPrimary' variant='body1' mb={2}>
                                            {article.articleTitle}
                                        </Typography>

                                        <Typography color='textSecondary' variant='subtitle1'>
                                            {article.articleAuthor}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                            <Button sx={{ mt: 1 }} variant='outlined' onClick={() => handleClick(t.id)} fullWidth>
                                Turn off reminders
                            </Button>
                        </Paper>
                    ),
                    {
                        duration: 7000, // Automatically close after 5 seconds
                        position: 'top-right',
                        id: 'popup'
                    }
                );
            }
        }, 1000 * 5 * 60); // 5 minutes in milliseconds

        return () => clearInterval(popupInterval);
    }, [showSuggestion, toast, article]);

    return (
        <AuthGuard>
            {showTour && <Tour open={open} handleClose={handleClose} setShowTour={setShowTour} />}
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </AuthGuard>
    );
};
