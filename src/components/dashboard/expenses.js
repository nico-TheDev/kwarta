import { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getLanguage } from '../../utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { formatPrice } from 'utils/format-price';

export const Expenses = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalExpenses = transactions.reduce((acc, current) => {
            if (current.type === 'expense') {
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
                            {getLanguage().expenses}
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            {formatPrice(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <AttachMoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
