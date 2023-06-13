import Head from 'next/head';
import { Box, Container, Grid, CircularProgress, Typography, Button, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from 'components/layout/nav';
import MonitorIcon from '@mui/icons-material/Monitor';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import SmileIcon from '@mui/icons-material/InsertEmoticon';
import CreateIcon from '@mui/icons-material/Create';
import { blue, deepOrange, deepPurple, grey, pink, yellow } from '@mui/material/colors';

const Page = () => {
    const styles = {
        container: {
            width: {
                xs: '100%'
            },
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            textAlign: {
                xs: 'center'
            },
            p: 2
        },
        main: {
            background: '#1D976C' /* fallback for old browsers */,
            background: ' -webkit-linear-gradient(to right, #93F9B9, #1D976C)' /* Chrome 10-25, Safari 5.1-6 */,
            background:
                'linear-gradient(to right, #93F9B9, #1D976C)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,

            fontSize: {
                xs: 14,
                md: 'initial'
            }
        },
        bg: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 0,
            width: '50%',
            height: '100%',
            display: {
                xs: 'none',
                md: 'initial'
            }
        },
        header: {
            display: 'grid',
            gap: 2,
            height: { xs: '60vh', md: '88vh' },
            placeItems: 'center',
            justifyContent: 'left'
        },
        headerTitle: {
            width: { xs: '100%', md: '70%' },
            fontSize: { xs: 40, md: 50 }
        },
        section: {
            py: { xs: 4, md: 8 }
        },
        featureCard: {
            p: 2,
            elevation: 10,
            textAlign: 'center',
            py: 10,
            mx: 'auto',
            height: '100%'
        },
        cardIcon: (color) => ({
            fontSize: 50,
            color,
            border: '5px solid red',
            borderColor: color,
            width: 100,
            height: 100,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            mb: 4,
            mx: 'auto'
        }),
        footer: {
            position: 'relative',
            background: '#1D976C',
            color: 'white',
            mt: 10
        },
        wave: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 'auto',
            display: 'block'
        }
    };

    return (
        <>
            <Head>
                <title>CASH: Financial Monitoring Application</title>
                <link rel='manifest' href='/manifest.json' />
                <link rel='icon' href='/favicon.ico' type='image/png' />
            </Head>
            <Box component='main' sx={styles.main}>
                <Nav />
                <Container maxWidth='lg' sx={styles.header}>
                    <Box sx={{ display: 'grid', gap: 3, justifyItems: 'start' }}>
                        <Typography variant='h1' sx={styles.headerTitle}>
                            {' '}
                            Start your financial literacy journey
                        </Typography>
                        <Typography variant='h6' fontWeight={300}>
                            Take your first step in learning with our help
                        </Typography>

                        <Button variant='contained' sx={{ fontSize: 20, px: 4, mt: 4 }} component='a' href='#learn'>
                            LEARN MORE
                        </Button>
                    </Box>

                    <Box sx={styles.bg}>
                        <img
                            src='/static/images/landing-bg.jpg'
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                clipPath: 'circle(58% at 80% 40%)',
                                filter: 'brightness(0.7)',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                </Container>
                <Container maxWidth='lg' component='section' sx={{ ...styles.section }} id='learn'>
                    <Typography variant='h2' mb={4}>
                        What is CASH ?
                    </Typography>
                    <Typography variant='body1' sx={{ width: { md: '50%' } }}>
                        CASH (Classify and Analyze Spending Habits) is a web application developed to help people
                        improve their financial literacy through hands-on experience. It aims to develop financial
                        awareness and literacy by exposing its users to different field of finance like cashflow
                        monitoring, stocks, investments and literary articles.
                    </Typography>
                </Container>
                <Container maxWidth='lg' component='section' sx={{ ...styles.section }}>
                    <Typography variant='h2' mb={6}>
                        What We Offer
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Paper sx={styles.featureCard}>
                                <Box sx={styles.cardIcon(deepPurple[500])}>
                                    <MonitorIcon fontSize='inherit' color='inherit' />
                                </Box>

                                <Typography variant='h5' mb={2}>
                                    Cashflow Monitoring
                                </Typography>

                                <Typography variant='body2' color={grey[600]}>
                                    Start monitoring the flow of your finances and be aware of your spending habits
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Paper sx={styles.featureCard}>
                                <Box sx={styles.cardIcon(blue[500])}>
                                    <BarChartIcon fontSize='inherit' color='inherit' />
                                </Box>

                                <Typography variant='h5' mb={2}>
                                    Visual Analytics
                                </Typography>

                                <Typography variant='body2' color={grey[600]}>
                                    Intelligent data presentations that simplify complexity effortlessly
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={styles.featureCard}>
                                <Box sx={styles.cardIcon(pink[500])}>
                                    <FeedIcon fontSize='inherit' color='inherit' />
                                </Box>

                                <Typography variant='h5' mb={2}>
                                    Finance Articles
                                </Typography>

                                <Typography variant='body2' color={grey[600]}>
                                    Read about different articles related to financial literacy and other fields of
                                    money
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={styles.featureCard}>
                                <Box sx={styles.cardIcon(deepOrange[500])}>
                                    <SmileIcon fontSize='inherit' color='inherit' />
                                </Box>

                                <Typography variant='h5' mb={2}>
                                    Decision Support System
                                </Typography>

                                <Typography variant='body2' color={grey[600]}>
                                    Gives you insight about topics you're not familiar about.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container
                    maxWidth='lg'
                    component='section'
                    sx={{ ...styles.section, textAlign: { md: 'initial', xs: 'center' } }}
                >
                    <Typography variant='h2' mb={2}>
                        Get Started
                    </Typography>

                    <Typography variant='h4' mb={4} fontWeight={300} color={grey[800]}>
                        Start your journey by creating an account !
                    </Typography>

                    <Link href='/register'>
                        <Button
                            variant='contained'
                            sx={{ fontSize: { xs: 15, md: 30 }, px: { md: 6, xs: 2 }, textTransform: 'uppercase' }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </Container>
                <Container maxWidth={false} component='footer' sx={{ ...styles.section, ...styles.footer }}>
                    <Container maxWidth='lg'>
                        <Typography variant='h6' align='center' gutterBottom>
                            CASH : Financial Monitoring Application
                        </Typography>
                        <Typography variant='body2' color='white' align='center'>
                            {'Copyright © '}
                            CASH {new Date().getFullYear()}
                        </Typography>
                    </Container>
                </Container>
            </Box>
        </>
    );
};

export default Page;
