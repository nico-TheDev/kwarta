import {useEffect, useState} from 'react';
import Head from 'next/head'
import { Box, Container, Grid, Pagination, Stack, Typography, Checkbox } from '@mui/material';
import Chip from '@mui/material/Chip';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import articles from '../data/articles';
import { getLanguage } from 'utils/getLanguage';
import { ArticlesCard } from '../components/articles/articles-card';
import { DashboardLayout } from '../components/dashboard-layout';

const filters = ['General', 'Savings', 'Stocks', 'Investments', 'Bonds'];

const Page = () => {
    const [filterValue, setFilterValue] = useState([]);
    const [articleList, setArticleList] = useState(articles);

    const handleClick = (value) => {
        const copy = [...filterValue];
        if (!filterValue.includes(value)) {
            copy.push(value);
        } else {
            const index = copy.findIndex((item) => item === value);
            copy.splice(index, 1);
        }
        setFilterValue(copy);
    };

    useEffect(() => {
        let checkSubset = (parentArray, subsetArray) => {
            let set = new Set(parentArray);
            return subsetArray.every((x) => set.has(x));
        };

        if (filterValue.length === 0) setArticleList(articles);
        else {
            setArticleList(articles.filter((item) => checkSubset(item.articleTags, filterValue)));
        }
    }, [filterValue]);

    return (
        <>
            <Head>
                <title>Articles | CASH</title>
            </Head>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography sx={{ m: 1 }} variant='h4'>
                            {getLanguage().articles}
                        </Typography>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Stack direction='row' spacing={1}>
                            {filters.map((item) => (
                                <Chip
                                    label={item}
                                    onClick={() => handleClick(item)}
                                    variant={filterValue.includes(item) ? 'filled' : 'outlined'}
                                    color='primary'
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {articleList.length !== 0 ? (
                                articleList.map((articles) => (
                                    <Grid item key={articles.id} lg={4} md={6} xs={12}>
                                        <ArticlesCard articles={articles} />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12} sx={{ p: 3, textAlign: 'center' }}>
                                    <Box sx={{ fontSize: 100 }}>
                                        <SearchOffIcon fontSize='inherit' />
                                    </Box>
                                    <Typography variant='h5'>No Articles Found</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
