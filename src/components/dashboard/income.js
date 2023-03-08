import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { getLanguage } from 'utils/getLanguage';

import { useTransactionStore } from 'stores/useTransactionStore';
import { formatPrice } from 'utils/format-price';

export const Income = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);
    const [total, setTotal] = useState(0);

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
        <Card {...props}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage().income}
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            {formatPrice(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <PeopleIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pt: 2
                    }}
                >
                    <ArrowUpwardIcon color='success' />
                    <Typography
                        variant='body2'
                        sx={{
                            mr: 1
                        }}
                    >
                        16%
                    </Typography>
                    <Typography color='textSecondary' variant='caption'>
                        {getLanguage().sinceLastMonth}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
