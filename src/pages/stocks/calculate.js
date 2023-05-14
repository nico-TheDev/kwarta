import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { green, lightGreen, red } from '@mui/material/colors';
import { DashboardLayout } from '../../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';

const paperStyle = { p: 2, display: 'grid', gap: 2, height: '100%', alignItems: 'start' };
const resultStyle = { fontWeight: 'bold', alignSelf: 'end', mb: 2 };
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
        sharesBought: 1000,
        buyPrice: parseFloat(String(router.query.price).replace(/,/g, '')),
        sharesSold: 1000,
        sellPrice: parseFloat(String(router.query.price).replace(/,/g, '')) + 2
    });

    useEffect(() => {
        let boughtAmount = input.sharesBought * input.buyPrice;
        let soldAmount = input.sharesSold * input.sellPrice;
        // BUYING TRANSACTION COST
        let stockCommsBuy = boughtAmount * (0.25 / 100) * 1.12;
        let clearFeeBuy = boughtAmount * 0.0001;
        let transFeeBuy = boughtAmount * 0.00005;
        let tradeCostBuy = boughtAmount + stockCommsBuy + clearFeeBuy + transFeeBuy;
        // SELLING TRANSACTION COST
        let stockCommsSell = soldAmount * (0.25 / 100) * 1.12;
        let clearFeeSell = soldAmount * 0.0001;
        let transFeeSell = soldAmount * 0.00005;
        let stockTax = soldAmount * 0.006;
        let tradeCostSell = soldAmount - stockCommsSell - clearFeeSell - transFeeSell - stockTax;

        let finalTradeCost = soldAmount - boughtAmount - (tradeCostSell - tradeCostBuy);

        setResult({
            amountBought: boughtAmount,
            amountSold: soldAmount,
            grossGains: soldAmount - boughtAmount,
            finalTradeCost: formatPrice(finalTradeCost, true),
            netGains: tradeCostSell - tradeCostBuy
        });
    }, [input.sharesBought, input.buyPrice, input.sharesSold, input.sellPrice]);

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
                    <Typography variant='body2' mb={2}>
                        Capital gain or appreciation is an increase in the market price of your stock. It is the
                        difference between the amount you paid when buying shares and the current market price of the
                        stock. However, if the company doesn’t perform as expected, the stock’s price may go down below
                        your buying price.
                    </Typography>
                    <Typography variant='body2' mb={4} color='gray'>
                        The number of shares are set to 1000 because it is the baseline when buying stocks in a
                        realistic setting.
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
                                    Amount: {formatPrice(result.amountBought, true)}
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
                                    Amount: {formatPrice(result.amountSold, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Gross Capital Gains</Typography>
                                <TextField
                                    id='outlined-basic'
                                    label='Buying Price'
                                    variant='outlined'
                                    inputProps={{ shrink: true }}
                                    value={result.amountBought}
                                    disabled
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Selling Price'
                                    variant='outlined'
                                    value={result.amountSold}
                                    disabled
                                />

                                <Typography
                                    fontSize={14}
                                    variant='body1'
                                    sx={resultStyle}
                                    color={result.netGains < 0 ? red[500] : 'green'}
                                >
                                    Capital Gains: {formatPrice(result.grossGains, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={paperStyle}>
                                <Typography variant='h6'>Net Capital Gains</Typography>
                                <TextField
                                    id='outlined-basic'
                                    label='Buying Price'
                                    variant='outlined'
                                    value={result.amountBought}
                                    disabled
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Selling Price'
                                    variant='outlined'
                                    value={result.amountSold}
                                    disabled
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Trading Cost'
                                    variant='outlined'
                                    value={result.finalTradeCost}
                                    disabled
                                />

                                <Typography
                                    fontSize={14}
                                    variant='body1'
                                    sx={resultStyle}
                                    color={result.netGains < 0 ? red[500] : 'green'}
                                >
                                    Net Capital Gains: {formatPrice(result.netGains, true)}
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
