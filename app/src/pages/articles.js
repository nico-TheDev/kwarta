import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination, Stack, Typography, Checkbox, Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import articles from '../data/articles';
import { getLanguage } from 'utils/getLanguage';
import { ArticlesCard } from '../components/articles/articles-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useLanguageStore } from 'stores/useLanguageStore';
import DashboardTour from 'components/tours/DashboardTour';
import { useAuthStore } from 'stores/useAuthStore';

const filters = ['General', 'Savings', 'Stocks', 'Investments', 'Bonds'];

const Page = () => {
    const [filterValue, setFilterValue] = useState([]);
    const [articleList, setArticleList] = useState(articles);
    const getTourProgress = useAuthStore((state) => state.getTourProgress);
    const manageTourProgress = useAuthStore((state) => state.manageTourProgress);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        const currentTour = getTourProgress('articles');
        setShowTour(currentTour.isDone);
    }, []);

    const tourSteps = [
        {
            target: '.articles_step_one',
            title: 'Articles',
            content:
                'This tab displays all the articles about financial literacy, savings, general finance, stocks,investments and bonds.',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.articles_step_two',
            title: 'Article Sorter',
            content: 'select each button to sort the article list by their genre',
            placement: 'bottom'
        }
    ];

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
            {!showTour && (
                <DashboardTour
                    setShowTour={setShowTour}
                    tourSteps={tourSteps}
                    finishTour={() => manageTourProgress('articles')}
                />
            )}
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
                        <Tooltip title={getLanguage(currentLanguage).tooltipArticles}>
                            <Typography sx={{ m: 1 }} variant='h4' className='articles_step_one'>
                                {getLanguage(currentLanguage).articles}
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{ pt: 2 }} className='articles_step_two'>
                        <Stack direction='row' spacing={1}>
                            {filters.map((item) => (
                                <Chip
                                    label={item}
                                    onClick={() => handleClick(item)}
                                    variant={filterValue.includes(item) ? 'filled' : 'outlined'}
                                    color='primary'
                                    sx={{ fontSize: { xs: 10, lg: 'initial' } }}
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
