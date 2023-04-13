import Head from 'next/head';
import { useRef, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => {
    const getStocksData = async () => {
        const res = await fetch('/api/stocks');
        const data = await res.json();

        console.log(data);
    };

    useEffect(() => {
        getStocksData();
    }, []);

    return (
        <>
            <Head>
                <title>Stocks |</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth='lg'>
                    <Typography variant='h4' mb={3}>
                        Stocks
                        <Typography variant='body1' sx={{ display: 'block' }}>
                            {' '}
                            View the condition of the Stock Market
                        </Typography>
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <iframe
                                src='https://www.pesobility.com/stock?sort=prevYrCashDivPerc'
                                frameborder='1'
                                width='100%'
                                height='400'
                            ></iframe>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
