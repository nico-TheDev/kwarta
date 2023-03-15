import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';

import useGetUserTransactions from 'hooks/useGetUserTransactions';
import { useEffect } from 'react';
import { useAuthStore } from 'stores/useAuthStore';
import { DashboardLayout } from 'components/dashboard-layout';
import { ExpensesChart } from 'components/dashboard/expenses-chart';
import { Cashflow } from 'components/dashboard/cashflow';
import { IncomeChart } from 'components/dashboard/income-chart';

const Page = () => {
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
                    <Typography variant='h3'>Cashflow</Typography>
                    <Box sx={{ display: { md: 'flex', xs: 'block' } }}>
                        <ExpensesChart />
                        <IncomeChart />
                    </Box>
                    <Cashflow />
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
