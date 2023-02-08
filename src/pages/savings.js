import Head from 'next/head'
import { Box, Container, Grid, Pagination } from '@mui/material'
import { savings } from '../__mocks__/accounts'
import { AccountHead } from '../components/accounts/account-head'
import { AccountCard } from '../components/accounts/account-card'
import { DashboardLayout } from '../components/dashboard-layout'
import { SavingsHead } from 'components/savings/savings-head'
import { SavingsCard } from 'components/savings/savings-card'

const Page = () => (
    <>
        <Head>
            <title>Savings | CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <SavingsHead />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {savings.map((saving) => (
                            <Grid item key={saving.id} lg={4} md={6} xs={12}>
                                <SavingsCard saving={saving} />
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
)

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
