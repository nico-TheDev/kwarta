import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Logo } from '../../logo';
const styles = {
    navContainer: {
        display: 'flex',
        height: { xs: '10vh', md: '12vh' },
        alignItems: 'center',
        px: { xs: 1, md: 4 },
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: '2'
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        gap: { xs: 1, md: 2 },
        '& a': {
            textTransform: 'uppercase'
        }
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
    },
    btn: {
        px: { xs: 1, md: 4 }
    }
};

export default function Nav() {
    return (
        <Box component='nav' sx={styles.navContainer}>
            <Box sx={styles.logo}>
                <Logo
                    sx={{
                        height: 40,
                        width: 40
                    }}
                />
                <Typography variant='h5' ml={2}>
                    CASH
                </Typography>
            </Box>

            <Box component='ul' sx={styles.navList}>
                <Typography component='li' sx={{ color: 'white' }}>
                    <Link href='/login'>
                        <Button variant='outlined' color='inherit' sx={styles.btn}>
                            LOGIN
                        </Button>
                    </Link>
                </Typography>
                <Typography component='li'>
                    <Link href='/register'>
                        <Button variant='contained' sx={styles.btn} color='primary'>
                            REGISTER
                        </Button>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
