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
            <title>Bonds| CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}
                >
                <Typography sx={{ m: 1 }} variant='h4'>
                    Bonds
                </Typography>
                </Box>
                {/* <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {savings.map((saving) => (
                            <Grid item key={saving.id} lg={4} md={6} xs={12}>
                                <SavingsCard saving={saving} />
                            </Grid>
                        ))}
                    </Grid>
                </Box> */}
            </Container>
        </Box>
    </>
)

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
