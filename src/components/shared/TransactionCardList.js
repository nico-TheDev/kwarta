import Grid from '@mui/material/Grid';
import React from 'react';
import TransactionCard from './TransactionCard';

export default function TransactionCardList({ transactionList }) {
    return (
        <Grid container spacing={2}>
            {transactionList.map((transaction) => (
                <Grid item lg={4} md={6} xs={12}>
                    <TransactionCard transaction={transaction} key={transaction.id} />
                </Grid>
            ))}
        </Grid>
    );
}
