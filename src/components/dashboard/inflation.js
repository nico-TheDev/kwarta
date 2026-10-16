import { Avatar, Box, Card, CardContent, Grid, Link, Typography, Tooltip } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';
import { marketSnapshot } from 'data/market-snapshot';

import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';
import { orange } from '@mui/material/colors';

// SAVED SNAPSHOT IN PLACE OF THE SCRAPER ROUTE (FEATURE 32)
const { current: currentRate, previous: previousRate } = marketSnapshot.inflation;
const rateDifference = parseFloat(currentRate.rate) - parseFloat(previousRate.rate);

export const Inflation = (props) => {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const inflationData = currentRate;
    // hasIncreased IS TRUE WHEN THE RATE WENT DOWN; THE ARROWS BELOW READ IT THAT WAY
    const percentage = {
        difference: Math.abs(Math.round((rateDifference + Number.EPSILON) * 100) / 100),
        hasIncreased: rateDifference < 0
    };

    return (
        <Card sx={{ height: '100%' }} {...props}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            Inflation Rate
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            {inflationData ? (
                                inflationData?.rate || inflationData?.prevRate
                            ) : (
                                <CircularProgress size={20} />
                            )}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title={getLanguage(currentLanguage).tooltipInflationRate}>
                            <Avatar
                                sx={{
                                    backgroundColor: orange[500],
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <InsertChartIcon />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pt: 2
                    }}
                >
                    {percentage?.hasIncreased ? (
                        <Tooltip title={getLanguage(currentLanguage).tooltipInflationLower}>
                            <ArrowDownwardIcon color='success' />
                        </Tooltip>
                    ) : (
                        <Tooltip title={getLanguage(currentLanguage).tooltipInflationHigher}>
                            <ArrowUpwardIcon color='error' />
                        </Tooltip>
                    )}
                    <Typography
                        variant='body2'
                        sx={{
                            mr: 1
                        }}
                    >
                        {percentage?.difference}
                    </Typography>
                    <Typography color='textSecondary' variant='caption'>
                        {getLanguage(currentLanguage).sinceLastMonth}
                    </Typography>
                </Box>{' '}
                <Typography color='textSecondary' variant='caption' component='p'>
                    {getLanguage(currentLanguage).sampleMarketData}
                </Typography>
                <Link href='https://tradingeconomics.com/philippines/inflation-cpi' target='_blank'>
                    <Typography color='textSecondary' variant='caption'>
                        Live rates: Trading Economics
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};
