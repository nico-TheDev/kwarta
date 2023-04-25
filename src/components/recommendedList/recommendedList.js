import { Grid, Box, Typography, Paper } from '@mui/material';
import React from 'react';
import Link from 'next/link';

export default function RecommendedList({ dataList }) {
    const dataList = ['1', '2', '3', '4'];

    return (
        <Box mt={6}>
            <Typography variant='h5' mb={4}>
                Recommended
            </Typography>
            <Grid container spacing={2}>
                {dataList.map((item) => (
                    <Grid item xs={12} md={3}>
                        <Link href='#'>
                            <Paper elevation={4}>
                                <Box sx={{ width: '100%' }}>
                                    <img
                                        src='/static/images/articles/general.jpg'
                                        alt=''
                                        style={{ display: 'block', width: '100%', height: '120px', objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Typography variant='h6' mb={2}>
                                        Article Title
                                    </Typography>
                                    <Typography variant='body2'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nihil tempore vitae
                                        quod cumque sed illum veniam ducimus reiciendis sequi.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
