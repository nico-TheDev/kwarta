import { Box } from '@mui/system';
import React from 'react';
import DrawIcon from '@mui/icons-material/EditOff';
import { Typography } from '@mui/material';

export default function PlaceholderEmpty({ message }) {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                alignContent: 'center',
                gap: 2
            }}
        >
            <Box fontSize={60}>
                <DrawIcon fontSize='inherit' color='primary' />
            </Box>
            <Typography variant='h6' color='black'>
                {message}
            </Typography>
        </Box>
    );
}
