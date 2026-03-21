import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { green, lightGreen, red } from '@mui/material/colors';
import { DashboardLayout } from '../../components/dashboard-layout';
import { formatPrice } from 'utils/format-price';
import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';
import LotTable, { minimumLotTable } from './LotTable';
import toast from 'react-hot-toast';

const paperStyle = { p: 2, display: 'grid', gap: 2, height: '100%', alignItems: 'start' };
const resultStyle = { fontWeight: 'bold', alignSelf: 'end', mb: 2 };
const Page = () => {
    const router = useRouter();
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

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
        // CHECK THE SHARES BOUGHT BASED ON THE TABLE
        const targetLot = minimumLotTable.find((currentLot) => {
            if (currentLot.marketPriceMin <= input.buyPrice && currentLot.marketPriceMax >= input.buyPrice) {
                return currentLot;
            }
        });
        console.log({ targetLot });
        setInput({ ...input, sharesBought: targetLot.lotSize, sharesSold: targetLot.lotSize });
    }, []);

    useEffect(() => {
        // CHECK THE SHARES BOUGHT BASED ON THE TABLE
        const targetLot = minimumLotTable.find((currentLot) => {
            if (currentLot.marketPriceMin <= input.buyPrice && currentLot.marketPriceMax >= input.buyPrice) {
                return currentLot;
            }
        });

        if (input.sharesBought < targetLot.lotSize || input.sharesSold < targetLot.lotSize) {
            toast.error('You are not allowed to continue that computation', { id: 'stocks' });
        } else {
            toast.success('You are allowed to continue that transaction', { id: 'stocks' });

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
                netGains: tradeCostSell - tradeCostBuy,
                stockCommsBuy: formatPrice(stockCommsBuy, true),
                clearFeeBuy: formatPrice(clearFeeBuy, true),
                transFeeBuy: formatPrice(transFeeBuy, true),
                tradeCostBuy: formatPrice(tradeCostBuy, true),
                stockCommsSell: formatPrice(stockCommsSell, true),
                clearFeeSell: formatPrice(clearFeeSell, true),
                transFeeSell: formatPrice(transFeeSell, true),
                stockTax: formatPrice(stockTax, true),
                tradeCostSell: formatPrice(tradeCostSell, true),
                finalTradeCost
            });
        }
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
                    <Typography variant='body1' mb={2}>
                        {getLanguage(currentLanguage).capitalGains}
                    </Typography>
                    <Typography variant='body1' mb={2}>
                        {getLanguage(currentLanguage).capitalGainsSub}
                    </Typography>

                    <Typography variant='body1' color='primary' mb={4}>
                        To invest in stocks, you need a minimum number of shares to buy depending on their market price.
                    </Typography>

                    <LotTable />
                    <Box mb={8} />
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

                                <Typography variant='caption' color='textSecondary'>
                                    Stockbroker's Commission = {result.stockCommsBuy} <br />
                                    Clearing Fee = {result.clearFeeBuy} <br />
                                    PSE Transaction Fee = {result.transFeeBuy} <br />
                                    Total Trading Costs = {result.tradeCostBuy} <br />
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

                                <Typography variant='caption' color='textSecondary'>
                                    Stockbroker's Commission = {result.stockCommsSell} <br />
                                    Clearing Fee = {result.clearFeeSell} <br />
                                    PSE Transaction Fee = {result.transFeeSell} <br />
                                    Stock Transaction Tax = {result.stockTax} <br />
                                    Total Trading Costs = {result.tradeCostSell} <br />
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

                                <Typography variant='caption' color='textSecondary'>
                                    Capital Gains = {result.amountSold} - {result.amountBought}
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
                                    value={formatPrice(result.finalTradeCost, true)}
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

                                <Typography variant='caption' color='textSecondary'>
                                    Net Capital Gains = {formatPrice(result.grossGains, true)} -{' '}
                                    {formatPrice(result.finalTradeCost, true)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box sx={{ pt: 6 }}>
                        <Typography variant='h6' mb={2} color='primary' textAlign='center'>
                            {' '}
                            DISCLAIMER
                        </Typography>
                        <Typography sx={{ m: 1, textAlign: 'center' }} color='primary' variant='body1'>
                            These are just indicative numbers. Performance of the stock is not assured and this is
                            subject to fluctuating market conditions.
                            <br />
                            This calculator is designed to be an informational and educational tool only, and when used
                            alone, does not constitute financial advice. The CASH Team is not responsible for the
                            consequences of any decisions or actions taken in reliance upon or as a result of the
                            information provided by these tools. The CASH Team is not responsible for any human or
                            mechanical errors or omissions that may occur too. Do consult a financial services
                            professional before making any investments.
                        </Typography>
                        <Typography sx={{ m: 1, textAlign: 'center' }} color='primary' variant='body1'>
                            Source:{' '}
                            <Link href='https://www.pseacademy.com.ph/investment-calculator/' target='_blank'>
                                PSE Academy Investment Calculator
                            </Link>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
