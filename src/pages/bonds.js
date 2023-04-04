import Head from 'next/head'
import { Box, Container, Grid, Pagination, Typography } from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout'
import { BondsCard } from 'components/bonds/bonds-card'

const Page = () => (
    <>
        <Head>
            <title>Bonds | CASH</title>
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
                <Box sx={{ pt: 3 }}>
                    <BondsCard />
                </Box>
            </Container>
        </Box>
    </>
)

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
