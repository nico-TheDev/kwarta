import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';

import { AccountSurveyDetails } from '../components/account/account-survey-details';
import { DashboardLayout } from '../components/dashboard-layout';

// REUSES THE PROFILE PAGE'S SURVEY CARD, SO BOTH PLACES READ AND SAVE THE SAME ANSWERS
const Page = () => (
    <>
        <Head>
            <title>Edit Survey | CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth='md'>
                <Typography variant='h3' sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                    Edit Survey
                </Typography>
                <AccountSurveyDetails />
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
