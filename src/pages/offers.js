import Head from 'next/head'
import Link from 'next/link';
import { Box, Container, Grid, Pagination, Typography, Button, Tooltip } from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout'
import { OffersCard } from 'components/savings/offers-card'

import { ICON_NAMES } from 'constants/constant';

import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';

const Page = () => {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    return(
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
                        <Tooltip title={getLanguage(currentLanguage).tooltipOffers}>
                            <Typography sx={{ m: 1 }} variant='h4'>
                                Offers
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <OffersCard />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
