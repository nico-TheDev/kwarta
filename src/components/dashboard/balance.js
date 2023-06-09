import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import BalanceIcon from '@mui/icons-material/Balance';
import { getLanguage } from 'utils/getLanguage';
import { useAccountStore } from 'stores/useAccountStore';
import { formatPrice } from 'utils/format-price';
import { useLanguageStore } from 'stores/useLanguageStore';
import { blue } from '@mui/material/colors';
import { useTransactionStore } from 'stores/useTransactionStore';

export const Balance = (props) => {
    const accounts = useAccountStore((state) => state.accounts);
    const transactions = useTransactionStore((state) => state.transactions);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalBalance = accounts.reduce((acc, current) => {
            acc += current.account_amount;
            return acc;
        }, 0);

        const savingsAndInvestmentsTotal = transactions
            .filter((transaction) => transaction.type === 'savings' || transaction.type === 'investments')
            .reduce((acc, current) => {
                acc += current.amount;
                return acc;
            }, 0);

        console.log({ savingsAndInvestmentsTotal });

        setTotal(totalBalance + savingsAndInvestmentsTotal);
    }, [accounts, transactions]);

    return (
        <Card sx={{ height: '100%' }} {...props}>
            <CardContent>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage(currentLanguage).balance}
                        </Typography>
                        <Typography color='textPrimary' variant='h4' sx={{ whiteSpace: 'nowrap' }}>
                            {formatPrice(total, true)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title={getLanguage(currentLanguage).tooltipTotalBalance}>
                            <Avatar
                                sx={{
                                    backgroundColor: blue[500],
                                    height: 56,
                                    width: 56
                                }}
                            >
                                <BalanceIcon />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
