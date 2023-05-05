import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNews } from 'hooks/swr/useNews';
import React from 'react';

export default function NewsPanel() {
    const { data, isLoading: isLoadingNews } = useNews();

    if (isLoadingNews)
        return (
            <Box sx={{ display: 'grid', justifyItems: 'center', height: '40vh', alignItems: 'center' }}>
                <Typography variant='h6'>Fetching Latest News...</Typography>
                <CircularProgress size={100} />
            </Box>
        );

    return (
        <>
            <Typography variant='h6' mb={4}>
                Latest News
            </Typography>
            <Grid container spacing={2}>
                {data &&
                    data.newsList?.map((news) => (
                        <Grid item xs={12} md={6} key={news.title}>
                            <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ height: '100%' }}>
                                    <img
                                        src={news?.image || '/static/images/articles/general.jpg'}
                                        alt=''
                                        style={{ height: 100, display: 'block', width: 150 }}
                                    />
                                </Box>
                                <Box sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                                    <Button sx={{ p: 0, fontSize: 12 }} variant='text' href={news.link} target='_blank'>
                                        {news.title}
                                    </Button>

                                    {/* <Typography variant='caption' color='grey'>
                                        {news.summary}
                                    </Typography> */}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </>
    );
}
