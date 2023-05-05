import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import useGetUserTransactions from 'hooks/useGetUserTransactions';
import { useEffect } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { DashboardLayout } from 'components/dashboard-layout';
import { ExpensesChart } from 'components/dashboard/expenses-chart';
import { Cashflow } from 'components/dashboard/cashflow';
import { IncomeChart } from 'components/dashboard/income-chart';
import { useTransactionStore } from 'stores/useTransactionStore';

const Page = () => {
    const transactions = useTransactionStore((state) => state.transactions);
    const styles = {
        container: {
            width: {
                xs: '100%'
            },
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            textAlign: {
                xs: 'center'
            },
            p: 2
        }
    };
    return (
        <>
            <Head>
                <title>Cashflow</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    {transactions.length !== 0 ? (
                        <>
                            <Typography variant='h3'>Cashflow</Typography>
                            <Box sx={{ display: { md: 'flex', xs: 'block' } }}>
                                <ExpensesChart />
                                <IncomeChart />
                            </Box>
                            <Cashflow />
                        </>
                    ) : (
                        <Box sx={{ ...styles.container, alignContent: 'center', mt: 10 }}>
                            <Box sx={{ fontSize: 80 }}>
                                <CreateIcon color='primary' fontSize='inherit' />
                            </Box>
                            <Typography variant='h5' mb={2}>
                                Create your Transactions
                            </Typography>
                            <Typography variant='body1' color='gray'>
                                Click the Add Transactions button to start monitoring your cashflow
                            </Typography>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
