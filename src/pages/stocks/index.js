import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { DashboardLayout } from '../../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';
import Link from 'next/link';
import { useStocks } from 'hooks/swr/useStocks';
import NewsPanel from 'components/news-panel';


export async function getStaticProps(context) {
    const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/stocks');
    const data = await res.json();

    return {
        props: {
            trendingStocksData: data.trendingStocks,
            marketMoversData: data.marketMovers
        } // will be passed to the page component as props
    };
}

const Page = ({ trendingStocksData, marketMoversData }) => {
    const router = useRouter();
    // const [stockData, setStockData] = useState(null);
    const [trendingStocks, setTrendingStocks] = useState(() => {
        if (localStorage.getItem('trendingData')) {
            return JSON.parse(localStorage.getItem('trendingData'));
        } else {
            return trendingStocksData;
        }
    });
    const [marketMovers, setMarketMovers] = useState(() => {
        if (localStorage.getItem('marketData')) {
            return JSON.parse(localStorage.getItem('marketData'));
        } else {
            return marketMoversData;
        }
    });

    useEffect(() => {
        if (trendingStocksData) {
            localStorage.setItem('trendingData', JSON.stringify(trendingStocksData));
            localStorage.setItem('marketData', JSON.stringify(marketMoversData));
        }
    }, []);

    // if (stockData === null)
    //     return (
    //         <Grid
    //             container
    //             sx={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center' }}
    //             justifyContent='center'
    //         >
    //             <CircularProgress size={100} />
    //         </Grid>
    //     );

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

                    <Box mb={4}>
                        <NewsPanel />
                    </Box>

                    {/* SUGGESTIONS */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>You might want to invest in</Typography>
                        </Grid>

                        {trendingStocks ? (
                            trendingStocks.map((item, i) => (
                                <Grid item xs={12} md={4} key={item.company + '-' + i}>
                                    <Link href={{ pathname: `/stocks/calculate`, query: { ...item } }}>
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
                                    </Link>
                                </Grid>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    p: 2
                                }}
                            >
                                <CircularProgress size={50} />
                            </Box>
                        )}
                    </Grid>
                    {/* MARKET MOVERS */}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Top Market Movers</Typography>
                        </Grid>

                        {marketMovers ? (
                            marketMovers.map((item, i) => (
                                <Grid item xs={12} md={4} key={item.company + '-' + i}>
                                    <Link href={{ pathname: `/stocks/calculate`, query: { ...item } }}>
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
                                    </Link>
                                </Grid>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    p: 2
                                }}
                            >
                                <CircularProgress size={50} />
                            </Box>
                        )}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;