import Head from 'next/head'
import Link from 'next/link';
import { Box, Container, Grid, Pagination, Typography, Button, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { SavingsCard } from 'components/savings/savings-card';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';
import { useAuthStore } from 'stores/useAuthStore';
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
            target: '.savings_step_one',
            title: 'Savings',
            content:
                'Saving is the portion of income not spent on current expenditures. In other words, it is the money set aside for future use and not spent immediately.',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.savings_step_two',
            title: 'More Offers',
            content: 'Displays the following saving accounts in different banks and their interest rate.',
            placement: 'bottom'
        },
        {
            target: '.savings_step_three',
            title: 'Choose Account',
            content: 'Select the account you want to choose as basis for savings suggestion. ',
            placement: 'bottom'
        }
    ];

    useEffect(() => {
        const currentTour = getTourProgress('savings');
        setShowTour(currentTour.isDone);
    }, []);

    return (
        <>
            {!showTour && (
                <DashboardTour
                    setShowTour={setShowTour}
                    tourSteps={tourSteps}
                    finishTour={() => manageTourProgress('savings')}
                />
            )}
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
                        <Tooltip title={getLanguage(currentLanguage).tooltipSavings}>
                            <Typography sx={{ m: 1 }} variant='h4' className='savings_step_one'>
                                Savings
                            </Typography>
                        </Tooltip>
                        <Link href='/offers' passHref>
                            <Button
                                variant='outlined'
                                startIcon={
                                    <Icon name={ICON_NAMES.SYSTEM_ICONS.SEARCH} color='#FFFFFF' fontSize='small' />
                                }
                                sx={{ mr: 1 }}
                                className='savings_step_two'
                            >
                                More Offers
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <SavingsCard />
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Typography sx={{ m: 1, textAlign: 'center' }} variant='body1'>
                            DISCLAIMER: This calculation is for illustration purposes only and should not be able to
                            taken as professional advice to invest in these saving accounts. It should not be used as
                            the sole basis to measure returns in said securities. Interest rates and amounts are subject
                            to change. For more information, you can go to the bank's website or go to the nearest
                            branch in your area.
                        </Typography>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Typography sx={{ m: 1, textAlign: 'center' }} color='textSecondary' variant='caption'>
                            Source: https://grit.ph/savings-account/
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
