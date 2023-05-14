import { useEffect, useState } from 'react';
import { Avatar, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { getLanguage } from '../../utils/getLanguage';
import { useTransactionStore } from 'stores/useTransactionStore';
import { formatPrice } from 'utils/format-price';
import { useLanguageStore } from 'stores/useLanguageStore';

export const Expenses = (props) => {
    const transactions = useTransactionStore((state) => state.transactions);
    const [total, setTotal] = useState(0);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

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
                            {getLanguage(currentLanguage).expenses}
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            {formatPrice(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title={getLanguage(currentLanguage).tooltipTotalExpense}>
                            <Avatar
                                sx={{
                                    backgroundColor: 'primary.main',
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <UploadIcon />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
