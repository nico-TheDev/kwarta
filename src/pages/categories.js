import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { accounts } from '../__mocks__/accounts';
import { CategoriesHead } from '../components/categories/categories-head';
import { CategoriesCard } from '../components/categories/categories-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

const Page = () => (
    <>
        <Head>
            <title>Categories | CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <CategoriesHead />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {accounts.map((account) => (
                            <Grid item key={account.id} lg={4} md={6} xs={12}>
                                <CategoriesCard account={account} />
<<<<<<< HEAD
=======
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.ACCOUNTS} color='primary' fontSize='large' />
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
