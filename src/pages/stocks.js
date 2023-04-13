import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';
import { green } from '@mui/material/colors';

const Page = () => {
    const [stockData, setStockData] = useState('');

    const getStocksData = async () => {
        try {
            const res = await fetch('/api/stocks');
            const data = await res.json();
            console.log(data);
            setStockData(data);
        } catch (err) {
            console.log(err.message);
        }
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
                        {/* <Typography variant='body1' sx={{ display: 'block' }}>
                            View the condition of the Stock Market
                        </Typography> */}
                    </Typography>

                    <Typography variant='body1' mb={2} sx={{ textIndent: 50 }}>
                        A stock, also known as equity, is a security that represents the ownership of a fraction of the
                        issuing corporation. Units of stock are called "shares" which entitles the owner to a proportion
                        of the corporation's assets and profits equal to how much stock they own.
                    </Typography>
                    <Typography variant='body1' sx={{ textIndent: 50, mb: 5 }}>
                        Stocks are bought and sold predominantly on stock exchanges and are the foundation of many
                        individual investors' portfolios. Stock trades have to conform to government regulations meant
                        to protect investors from fraudulent practices.
                    </Typography>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12}>
                            <iframe
                                src='https://www.pesobility.com/stock?sort=prevYrCashDivPerc'
                                frameborder='1'
                                width='100%'
                                height='400'
                            ></iframe>
                        </Grid>
                    </Grid>

                    {/* SUGGESTIONS */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>You might want to invest in</Typography>
                        </Grid>

                        {stockData &&
                            stockData.trendingStocks.map((item) => (
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 2, display: 'grid', gap: 2, justifyItems: 'start' }}>
                                        <Button sx={{ p: 0 }} variant='text' href={item.link} target='_blank'>
                                            {item.company}
                                        </Button>

                                        <Typography variant='h6'>{formatPrice(item.price, true)}</Typography>
                                        <Typography variant='body2' sx={{ display: 'flex', gap: 4 }}>
                                            <Typography
                                                variant='body2'
                                                color={item.priceIncrease.includes('-') ? 'error' : green[500]}
                                            >
                                                {item.priceIncrease}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color={item.pricePercentage.includes('-') ? 'error' : green[500]}
                                            >
                                                {item.pricePercentage}
                                            </Typography>
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                    {/* MARKET MOVERS */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Top Market Movers</Typography>
                        </Grid>

                        {stockData &&
                            stockData.marketMovers.map((item) => (
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 2, display: 'grid', gap: 2, justifyItems: 'start' }}>
                                        <Button sx={{ p: 0 }} variant='text' href={item.link} target='_blank'>
                                            {item.company}
                                        </Button>

                                        <Typography variant='h6'>{formatPrice(item.price, true)}</Typography>
                                        <Typography variant='body2' sx={{ display: 'flex', gap: 4 }}>
                                            <Typography
                                                variant='body2'
                                                color={item.pricePercentage.includes('-') ? 'error' : green[500]}
                                            >
                                                {item.pricePercentage}
                                            </Typography>
                                        </Typography>
                                        <Typography variant='body2'>{item.volume}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
