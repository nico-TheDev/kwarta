import Head from 'next/head'
import { Box, Container, Grid, Pagination, Typography, Tooltip } from '@mui/material'
import { DashboardLayout } from '../components/dashboard-layout'
import { BondsCard } from 'components/bonds/bonds-card'
import { useAuthStore } from 'stores/useAuthStore';
import { useEffect, useState } from 'react';
import DashboardTour from 'components/tours/DashboardTour';

import { getLanguage } from 'utils/getLanguage';
import { useLanguageStore } from 'stores/useLanguageStore';

const Page = () => {
    const getTourProgress = useAuthStore((state) => state.getTourProgress);
    const manageTourProgress = useAuthStore((state) => state.manageTourProgress);
    const [showTour, setShowTour] = useState(false);

    const currentLanguage = useLanguageStore((state) => state.currentLanguage);

    const tourSteps = [
        {
            target: '.bonds_step_one',
            title: 'Bonds',
            content:
                'Retail Bond is a form of debt security in which the issuer, depending on the terms of the bond, is obliged to pay the holder of the bond interest or coupon at pre-determined intervals and returns the principal on the maturity date.',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.bonds_step_two',
            title: 'Choose Account',
            content:
                'Select the account you want to choose as basis for a retail bond suggestion. Try selecting an account',
            placement: 'bottom'
        },
        {
            target: '.bonds_step_three',
            title: 'Retail Bond Calculator',
            content: 'Use the calculator to see the possible money growth in a retail treasury bond.',
            placement: 'bottom'
        }
    ];

    useEffect(() => {
        const currentTour = getTourProgress('bonds');
        setShowTour(currentTour.isDone);
    }, []);

    return (
        <>
            {!showTour && (
                <DashboardTour
                    setShowTour={setShowTour}
                    tourSteps={tourSteps}
                    finishTour={() => manageTourProgress('bonds')}
                />
            )}
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
                        <Tooltip title={getLanguage(currentLanguage).tooltipBonds}>
                            <Typography sx={{ m: 1 }} variant='h4' className='bonds_step_one'>
                                Bonds
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <BondsCard />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
