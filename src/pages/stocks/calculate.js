import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { DashboardLayout } from '../../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';

const paperStyle = { p: 2, display: 'grid', gap: 2, height: '100%', alignContent: 'start' };

const Page = () => {
    const router = useRouter();
    const [result, setResult] = useState({
        amountBought: '',
        amountSold: '',
        grossGains: '',
        netGains: '',
        stockComms: '',
        clearFee: '',
        transFee: '',
        totalTradeCost: ''
    });
    const [input, setInput] = useState({
        sharesBought: '',
        buyPrice: '',
        sharesSold: '',
        sellPrice: ''
    });

    useEffect(() => {}, [input.sharesBought, input.buyPrice, input.sharesSold, input.sellPrice]);

    const current = router.query;
    console.log(router.query);

    return (
        <>
            <Head>
                <title>Capital Gains & Transaction Costs Calculator</title>
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
                        {current.company} Stocks
                    </Typography>
                    <Typography variant='h6' mb={1}>
                        Capital Gains & Transaction Costs{' '}
                    </Typography>
                    <Typography variant='body2' mb={4}>
                        Capital gain or appreciation is an increase in the market price of your stock. It is the
                        difference between the amount you paid when buying shares and the current market price of the
                        stock. However, if the company doesn’t perform as expected, the stock’s price may go down below
                        your buying price.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Transaction Amount - Buying</Typography>
                                <TextField
                                    id='outlined-basic'
                                    label='No. of shares bought'
                                    variant='outlined'
                                    onChange={(e) => setInput({ ...input, sharesBought: e.target.value })}
                                    value={input.sharesBought}
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Buying Price'
                                    variant='outlined'
                                    onChange={(e) => setInput({ ...input, buyPrice: e.target.value })}
                                    value={input.buyPrice}
                                />

                                <Typography fontSize={14} variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Amount: {formatPrice(10320, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Transaction Amount - Selling</Typography>
                                <TextField
                                    id='outlined-basic'
                                    label='No. of shares sold'
                                    variant='outlined'
                                    onChange={(e) => setInput({ ...input, sharesSold: e.target.value })}
                                    value={input.sharesSold}
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Selling Price'
                                    variant='outlined'
                                    onChange={(e) => setInput({ ...input, sellPrice: e.target.value })}
                                    value={input.sellPrice}
                                />

                                <Typography fontSize={14} variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Amount: {formatPrice(10320, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Gross Capital Gains</Typography>
                                <TextField id='outlined-basic' label='Selling Price' variant='outlined' disabled />
                                <TextField id='outlined-basic' label='Buying Price' variant='outlined' disabled />

                                <Typography fontSize={14} variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Capital Gains: {formatPrice(10320, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Net Capital Gains</Typography>
                                <TextField id='outlined-basic' label='Selling Price' variant='outlined' disabled />
                                <TextField id='outlined-basic' label='Buying Price' variant='outlined' disabled />
                                <TextField id='outlined-basic' label='Trading Cost ' variant='outlined' disabled />

                                <Typography fontSize={14} variant='body1' sx={{ fontWeight: 'bold' }}>
                                    Net Capital Gains: {formatPrice(10320, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
