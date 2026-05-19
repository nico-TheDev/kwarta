import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { getLanguage } from 'utils/getLanguage';

import { useTransactionStore } from 'stores/useTransactionStore';
import { formatPrice } from 'utils/format-price';
import { useLanguageStore } from 'stores/useLanguageStore';
import { green } from '@mui/material/colors';

export const Income = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);
    const [total, setTotal] = useState(0);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    useEffect(() => {
        const totalExpenses = transactions.reduce((acc, current) => {
            if (current.type === 'income') {
                acc += current.amount;
            }
            return acc;
        }, 0);

        setTotal(totalExpenses);
    }, [transactions]);

    return (
        <Card sx={{ height: '100%' }} {...props}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage(currentLanguage).income}
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            {formatPrice(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title={getLanguage(currentLanguage).tooltipTotalIncome}>
                            <Avatar
                                sx={{
                                    backgroundColor: green[400],
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <GetAppIcon />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
