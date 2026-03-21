import Grid from '@mui/material/Grid';
import React from 'react';
import { TransferCard } from '../../components/transfers/transfer-card';

export default function TransferCardList({ transferList }) {
    return (
        <Grid container spacing={2} mb={2}>
            {transferList.map((transfer) => (
                <Grid item lg={4} md={6} xs={12}>
                    <TransferCard transfer={transfer} key={transfer.id} />
                </Grid>
            ))}
        </Grid>
    );
}
