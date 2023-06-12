import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Logo } from '../../logo';
const styles = {
    navContainer: {
        display: 'flex',
        height: '12vh',
        alignItems: 'center',
        px: 4,
        justifyContent: 'space-between'
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        gap: 4,
        '& a': {
            textTransform: 'uppercase'
        }
    },
    logo: {
        display: 'flex',
        alignItems: 'center'
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
                <Typography component='li'>
                    <Link href='/login'>
                        <Button variant='outlined'>LOGIN</Button>
                    </Link>
                </Typography>
                <Typography component='li'>
                    <Link href='/register'>
                        <Button variant='contained'>REGISTER</Button>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
