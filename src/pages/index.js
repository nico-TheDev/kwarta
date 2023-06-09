import Head from 'next/head';
import { Box, Container, Grid, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Typography variant='h2'> LANDING PAGE</Typography>
                    <Link href='/login'>Login</Link>
                    <Link href='/register'>Register</Link>
                </Container>
            </Box>
        </>
    );
};

export default Page;
