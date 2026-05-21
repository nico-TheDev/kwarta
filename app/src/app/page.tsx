'use client';

import { Box, Container, Grid, Typography, Button, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Nav from 'components/layout/nav';
import MonitorIcon from '@mui/icons-material/Monitor';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import SmileIcon from '@mui/icons-material/InsertEmoticon';
import { blue, deepOrange, deepPurple, grey, pink } from '@mui/material/colors';

const styles = {
    main: {
        background: 'linear-gradient(to right, #93F9B9, #1D976C)',
        fontSize: { xs: 14, md: 'initial' },
    },
    bg: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 0,
        width: '50%',
        height: '100%',
        display: { xs: 'none', md: 'initial' },
    },
    header: {
        display: 'grid',
        gap: 2,
        height: { xs: '60vh', md: '88vh' },
        placeItems: 'center',
        justifyContent: 'left',
    },
    section: { py: { xs: 4, md: 8 } },
    featureCard: { p: 2, elevation: 10, textAlign: 'center', py: 10, mx: 'auto', height: '100%' },
    cardIcon: (color: string) => ({
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
        mx: 'auto',
    }),
    footer: { position: 'relative', background: '#1D976C', color: 'white', mt: 10 },
};

export default function LandingPage() {
    return (
        <Box component="main" sx={styles.main}>
            <Nav />
            <Container maxWidth="lg" sx={styles.header}>
                <Box sx={{ display: 'grid', gap: 3, justifyItems: 'start' }}>
                    <Typography variant="h1" sx={{ width: { xs: '100%', md: '70%' }, fontSize: { xs: 40, md: 50 } }}>
                        Start your financial literacy journey
                    </Typography>
                    <Typography variant="h6" fontWeight={300}>
                        Take your first step in learning with our help
                    </Typography>
                    <Button variant="contained" sx={{ fontSize: 20, px: 4, mt: 4 }} component="a" href="#learn">
                        LEARN MORE
                    </Button>
                </Box>
                <Box sx={{ ...styles.bg, position: 'relative' }}>
                    <Image
                        src="/static/images/landing-bg.jpg"
                        alt="Landing background"
                        fill
                        style={{
                            clipPath: 'circle(58% at 80% 40%)',
                            filter: 'brightness(0.7)',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            </Container>

            <Container maxWidth="lg" component="section" sx={styles.section} id="learn">
                <Typography variant="h2" mb={4}>What is CASH?</Typography>
                <Typography variant="body1" sx={{ width: { md: '50%' } }}>
                    CASH (Classify and Analyze Spending Habits) is a web application developed to help people improve
                    their financial literacy through hands-on experience. It aims to develop financial awareness and
                    literacy by exposing its users to different fields of finance like cashflow monitoring, stocks,
                    investments and literary articles.
                </Typography>
            </Container>

            <Container maxWidth="lg" component="section" sx={styles.section}>
                <Typography variant="h2" mb={6}>What We Offer</Typography>
                <Grid container spacing={4}>
                    {[
                        { icon: <MonitorIcon fontSize="inherit" color="inherit" />, color: deepPurple[500], title: 'Cashflow Monitoring', desc: 'Start monitoring the flow of your finances and be aware of your spending habits' },
                        { icon: <BarChartIcon fontSize="inherit" color="inherit" />, color: blue[500], title: 'Visual Analytics', desc: 'Intelligent data presentations that simplify complexity effortlessly' },
                        { icon: <FeedIcon fontSize="inherit" color="inherit" />, color: pink[500], title: 'Finance Articles', desc: 'Read about different articles related to financial literacy and other fields of money' },
                        { icon: <SmileIcon fontSize="inherit" color="inherit" />, color: deepOrange[500], title: 'Decision Support System', desc: "Gives you insight about topics you're not familiar about." },
                    ].map(({ icon, color, title, desc }) => (
                        <Grid item xs={12} md={3} key={title}>
                            <Paper sx={styles.featureCard}>
                                <Box sx={styles.cardIcon(color)}>{icon}</Box>
                                <Typography variant="h5" mb={2}>{title}</Typography>
                                <Typography variant="body2" color={grey[600]}>{desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" component="section" sx={{ ...styles.section, textAlign: { md: 'initial', xs: 'center' } }}>
                <Typography variant="h2" mb={2}>Get Started</Typography>
                <Typography variant="h4" mb={4} fontWeight={300} color={grey[800]}>
                    Start your journey by creating an account!
                </Typography>
                <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    sx={{ fontSize: { xs: 15, md: 30 }, px: { md: 6, xs: 2 }, textTransform: 'uppercase' }}
                >
                    Sign Up
                </Button>
            </Container>

            <Container maxWidth={false} component="footer" sx={{ ...styles.section, ...styles.footer }}>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>CASH: Financial Monitoring Application</Typography>
                    <Typography variant="body2" color="white" align="center">
                        {'Copyright © '} CASH {new Date().getFullYear()}
                    </Typography>
                </Container>
            </Container>
        </Box>
    );
}
