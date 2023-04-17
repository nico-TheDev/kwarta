import Head from 'next/head'
import Link from 'next/link';
import { Box, Container, Grid, Pagination, Typography, Button } from '@mui/material'
import { DashboardLayout } from '../../components/dashboard-layout'
import { SavingsCard } from 'components/savings/savings-card'

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

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
                        Savings
                    </Typography>
                    <Link href='/offers' passHref>
                        <Button
                            variant='outlined'
                            startIcon={
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.SEARCH} color='#FFFFFF' fontSize='small' />
                            }
                            sx={{ mr: 1 }}
                        >
                            More Offers
                        </Button>
                    </Link>
                </Box>
                <Box sx={{ pt: 3 }}>
                    <SavingsCard />
                </Box>
            </Container>
        </Box>
    </>
)

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
