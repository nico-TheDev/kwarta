import Head from 'next/head'
import { Box, Container, Grid, Pagination } from '@mui/material'
import { achievements } from '../__mocks__/accounts'
import { AchievementsHead } from '../components/achievements/achievements-head'
import { AchievementsCard } from '../components/achievements/achievements-card'
import { DashboardLayout } from '../components/dashboard-layout'

const Page = () => (
    <>
        <Head>
            <title>Achievements | CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <AchievementsHead />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {achievements.map((achievements) => (
                            <Grid item key={achievements.id} lg={4} md={6} xs={12}>
                                <AchievementsCard achievements={achievements} />
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
