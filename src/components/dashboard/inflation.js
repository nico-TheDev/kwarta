import { Avatar, Box, Card, CardContent, Grid, Link, Typography, Tooltip } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';
import { orange } from '@mui/material/colors';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Inflation = (props) => {
    const [inflationData, setInflationData] = useState('');
    const [percentage, setPercentage] = useState('');
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    useEffect(() => {
        async function getInflationData() {
            const date = new Date();
            const currentMonth = monthNames[date.getMonth() - 1];
            const prevMonth = monthNames[date.getMonth() - 2];

            if (localStorage.getItem('inflation')) {
                setInflationData(JSON.parse(localStorage.getItem('inflation')));
                setPercentage(JSON.parse(localStorage.getItem('percentage')));
            } else {
                try {
                    const res = await fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/inflation');
                    const data = await res.json();

                    const rate = data.data;

                    const prevRate = rate.find((item) => item.month === prevMonth);
                    const currentRate = rate.find((item) => item.month === currentMonth);
                    const diff = currentRate.rate.replace('%', '') - prevRate.rate.replace('%', '');
                    const roundedDiff = Math.round((diff + Number.EPSILON) * 100) / 100;
                    // 3 - 2 =  1
                    const hasIncreased = diff < 0;

                    const currentPercentage = {
                        difference: Math.abs(roundedDiff),
                        hasIncreased
                    };
                    localStorage.setItem('inflation', JSON.stringify(currentRate));
                    localStorage.setItem('percentage', JSON.stringify(currentPercentage));

                    console.log({ currentRate, currentPercentage });

                    setInflationData(currentRate);
                    setPercentage(currentPercentage);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getInflationData();
    }, [localStorage.getItem('inflation')]);

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
                <Link href='https://tradingeconomics.com/philippines/inflation-cpi' target='_blank'>
                    <Typography color='textSecondary' variant='caption'>
                        Source: Trading Economics
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};
