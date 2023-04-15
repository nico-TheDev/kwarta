import Head from 'next/head';
import { Box, Container, Grid, CircularProgress, Typography } from '@mui/material';
import { Balance } from '../components/dashboard/balance';
import { TransactionHistory } from '../components/dashboard/transaction-history';
import { Cashflow } from '../components/dashboard/cashflow';
import { Savings } from '../components/dashboard/inflation';
import { Income } from '../components/dashboard/income';
import { Expenses } from '../components/dashboard/expenses';
import { ExpensesChart } from '../components/dashboard/expenses-chart';
import { DashboardLayout } from '../components/dashboard-layout';
import useGetUserTransactions from 'hooks/useGetUserTransactions';
import { useEffect } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useAccountStore } from 'stores/useAccountStore';
import { getLanguage } from 'utils/getLanguage';

const Page = () => {
    const user = useAuthStore((state) => state.authState?.user);
    const userID = user?.uid || '';

    const transactions = useTransactionStore((state) => state.transactions);
    const isEmpty = useTransactionStore((state) => state.isEmpty);
    // GET USER TRANSACTIONS
    useGetUserTransactions(userID);

    const styles = {
        container: { width: '100%', height: '100%', display: 'grid', placeItems: 'center' }
    };

    if (transactions.length === 0 && !isEmpty) {
        return (
            <Box sx={styles.container}>
                <CircularProgress size={200} />
            </Box>
        );
    }

    if (isEmpty) {
        return (
            <Box sx={{ ...styles.container }}>
                <Typography variant='h4'>Create your first transaction</Typography>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>CASH: Financial Monitoring Application</title>
                <link rel='manifest' href='/manifest.json' />
                <link rel='icon' href='/favicon.ico' type='image/png' />
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item lg={3} sm={6} xl={3} xs={12}>
                            {/* BALANCE PANEL */}
                            <Balance />
                        </Grid>
                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            {/* EXPENSE PANEL */}
                            <Expenses sx={{ height: '100%' }} />
                        </Grid>
                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            {/* INCOME PANEL */}
                            <Income />
                        </Grid>
                        <Grid item xl={3} lg={3} sm={6} xs={12}>
                            <Savings />
                        </Grid>
                        <Grid item lg={8} md={12} xl={9} xs={12}>
                            {/* BAR CHART PANEl */}
                            <Cashflow />
                        </Grid>
                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            {/* EXPENSES GRAPH */}
                            <ExpensesChart sx={{ height: '100%' }} />
                        </Grid>
                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            {/* TRANSACTION HISTORY */}
                            <TransactionHistory sx={{ height: '100%' }} />
                        </Grid>
                        {/* <Grid item lg={8} md={12} xl={9} xs={12}>
                            <InflationPanel sx={{ height: '100%' }} />
                        </Grid> */}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
