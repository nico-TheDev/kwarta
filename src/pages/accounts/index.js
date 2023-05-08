import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

// import { accounts } from '../__mocks__/accounts'

import { AccountHead } from '../../components/accounts/account-head';
import { AccountCard } from '../../components/accounts/account-card';
import { DashboardLayout } from '../../components/dashboard-layout';

import { useAccountStore } from 'stores/useAccountStore';
import DashboardTour from 'components/tours/DashboardTour';
import { useState, useEffect } from 'react';

const Page = () => {
    const accounts = useAccountStore((state) => state.accounts);
    const styles = {
        container: {
            width: {
                xs: '100%'
            },
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            textAlign: {
                xs: 'center'
            },
            p: 2
        }
    };
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        setShowTour(true);
    }, []);

    const tourSteps = [
        {
            target: '.accounts_step_one',
            title: 'Accounts',
            content: 'This tab shows all the financial accounts ',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.accounts_step_two',
            title: 'Add Account ',
            content: 'use this button to create new financial account.',
            placement: 'bottom'
        },
        {
            target: '.accounts_step_three',
            title: 'Transfer history',
            content: 'Used for checking the history of transfers between financial accounts.',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.accounts_step_four',
            title: 'Total Balance',
            content: 'The sum of all financial accounts you created.',
            placement: 'bottom'
        },
        {
            target: '.accounts_step_five',
            title: 'List of Accounts',
            content: 'Displays all the financial accounts you created and their current balance.',
            placement: 'bottom'
        }
    ];

    return (
        <>
            <Head>
                <title>Accounts | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    {showTour && <DashboardTour setShowTour={setShowTour} tourSteps={tourSteps} />}
                    <AccountHead />
                    {accounts.length === 0 ? (
                        <Box sx={{ ...styles.container, alignContent: 'center', mt: 10 }}>
                            <Box sx={{ fontSize: 80 }}>
                                <CreateIcon color='primary' fontSize='inherit' />
                            </Box>
                            <Typography variant='h5' mb={2}>
                                Create your first financial account
                            </Typography>
                            <Typography variant='body1' color='gray'>
                                Click the Add Account button to add your first financial account
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ pt: 3 }}>
                            <Grid container spacing={3} className='accounts_step_five'>
                                {accounts.map((account) => (
                                    <Grid item key={account.id} lg={4} md={6} xs={12}>
                                        <AccountCard account={account} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
