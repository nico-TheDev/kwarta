import Head from 'next/head';
import { Box, Container, Grid, CircularProgress, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from 'components/layout/nav';

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
        }
    };

    console.log('HELLO');

    return (
        <>
            <Head>
                <title>Welcome to CASH !</title>
                <link rel='manifest' href='/manifest.json' />
                <link rel='icon' href='/favicon.ico' type='image/png' />
            </Head>
            <Box component='main'>
                <Nav />
                <Container
                    maxWidth={false}
                    sx={{
                        display: 'grid',
                        gap: 2,
                        height: '88vh',
                        placeItems: 'center',
                        justifyContent: 'left'
                    }}
                >
                    <Box sx={{ display: 'grid', gap: 3, justifyItems: 'start' }}>
                        <Typography variant='h1' sx={{ width: '70%' }}>
                            {' '}
                            Start your financial literacy journey
                        </Typography>
                        <Typography variant='h6' fontWeight={300}>
                            Start your journey with financial awareness and improvement
                        </Typography>

                        <Button variant='contained' sx={{ fontSize: 20 }}>
                            {' '}
                            Get Started
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Page;
