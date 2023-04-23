import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

// import { accounts } from '../__mocks__/accounts'

import { AccountHead } from '../../components/accounts/account-head';
import { AccountCard } from '../../components/accounts/account-card';
import { DashboardLayout } from '../../components/dashboard-layout';

import { useAccountStore } from 'stores/useAccountStore';

const Page = () => {
    const accounts = useAccountStore((state) => state.accounts);
    const styles = {
        container: { width: '100%', height: '100%', display: 'grid', placeItems: 'center' }
    };

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
                            <Grid container spacing={3}>
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
