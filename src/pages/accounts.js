import Head from 'next/head'
import { Box, Container, Grid, Pagination } from '@mui/material'
// import { accounts } from '../__mocks__/accounts'
import { AccountHead } from '../components/accounts/account-head'
import { AccountCard } from '../components/accounts/account-card'
import { DashboardLayout } from '../components/dashboard-layout'

import { useAuthStore } from 'stores/useAuthStore';
import { useAccountStore } from 'stores/useAccountStore';
import useAccountsListener from 'stores/useAccountsListener';

const Page = () => {
    const user = useAuthStore(state => state.authState.user);
    const accounts = useAccountStore(state => state.accounts);
    const [totalBalance] = useAccountsListener(user.uid);

    return(
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
                    <AccountHead totalBalance={totalBalance}/>
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {accounts.map((account) => (
                                <Grid item key={account.id} lg={4} md={6} xs={12}>
                                    <AccountCard account={account} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 3
                        }}
                    >
                        <Pagination color='primary' count={3} size='small' />
                    </Box> */}
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
