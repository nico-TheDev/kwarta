import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { TransferHead } from '../../components/transfers/transfer-head'
import { TransferCard } from '../../components/transfers/transfer-card'
import { DashboardLayout } from '../../components/dashboard-layout';

import { useTransferStore } from 'stores/useTransferStore';
import useGetUserTransfers from 'hooks/useGetUserTransfers';
import { useAuthStore } from 'stores/useAuthStore';

const Page = () => {
    const userId = useAuthStore((state) => state.authState?.user?.uid)
    useGetUserTransfers(userId)
    const transfers = useTransferStore((state) => state.transfers);

    // const transfers = [
    //     {
    //         id: 1,
    //         sender: 'BDO',
    //         receiver: 'GCASH',
    //         amount: 100
    //     },
    //     {
    //         id: 2,
    //         sender: 'BDO',
    //         receiver: 'GCASH',
    //         amount: 100
    //     },
    //     {
    //         id: 3,
    //         sender: 'BDO',
    //         receiver: 'GCASH',
    //         amount: 100
    //     },
    // ]

    return (
        <>
            <Head>
                <title>Transfers | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <TransferHead />
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {transfers.map((transfer) => (
                                <Grid item key={transfer.id} lg={4} md={6} xs={12}>
                                    <TransferCard transfer={transfer} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
