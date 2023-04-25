import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import { getLanguage } from 'utils/getLanguage';
import { useAccountStore } from 'stores/useAccountStore';
import { formatPrice } from 'utils/format-price';

export const Balance = (props) => {
    const accounts = useAccountStore((state) => state.accounts);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalBalance = accounts.reduce((acc, current) => {
            acc += current.account_amount;
            return acc;
        }, 0);

        setTotal(totalBalance);
    }, [accounts]);

    return (
        <Card sx={{ height: '100%' }} {...props}>
            <CardContent>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage().balance}
                        </Typography>
                        <Typography color='textPrimary' variant='h4' sx={{ whiteSpace: 'nowrap' }}>
                            {formatPrice(total)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <MoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                {/* <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowUpwardIcon color='success' />
                    <Typography
                        color='success'
                        sx={{
                            mr: 1
                        }}
                        variant='body2'
                    >
                        12%
                    </Typography>
                    <Typography color='textSecondary' variant='caption'>
                        {getLanguage().sinceLastMonth}
                    </Typography>
                </Box> */}
            </CardContent>
        </Card>
    );
};
