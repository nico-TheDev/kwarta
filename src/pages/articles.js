import {useEffect, useState} from 'react';
import Head from 'next/head'
import { Box, Container, Grid, Pagination, Stack} from '@mui/material'
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import articles from '../data/articles'
import { ArticlesHead } from '../components/articles/articles-head'
import { ArticlesCard } from '../components/articles/articles-card'
import { DashboardLayout } from '../components/dashboard-layout'

const Page = () => {
    const [filterValue, setFilterValue] = useState([]);
    const [articleList, setArticleList] = useState(articles);

    const generalArticles = articles.filter(articles => articles.articleTags.includes('General'));
    const savingsArticles = articles.filter(articles => articles.articleTags.includes('Savings'));
    const stocksArticles = articles.filter(articles => articles.articleTags.includes('Stocks'));
    const investmentsArticles = articles.filter(articles => articles.articleTags.includes('Investments'));
    const bondsArticles = articles.filter(articles => articles.articleTags.includes('Bonds'));

    useEffect(() => {
        if (filterValue.includes('')) setArticleList(articles);
        else if (filterValue.includes('General')) setArticleList(generalArticles);
        else if (filterValue.includes('Savings')) setArticleList(savingsArticles);
        else if (filterValue.includes('Stocks')) setArticleList(stocksArticles);
        else if (filterValue.includes('Investments')) setArticleList(investmentsArticles);
        else if (filterValue.includes('Bonds')) setArticleList(bondsArticles);
    }, [articleList]);

    const handleGeneralClick = () => {
        if (!filterValue.includes('General')){
            setFilterValue(filterValue => [...filterValue, 'General']);
        }
    };
    const handleSavingsClick = () => {
        if (!filterValue.includes('Savings')){
            setFilterValue(filterValue => [...filterValue, 'Savings']);
        }
    };
    const handleStocksClick = () => {
        if (!filterValue.includes('Stocks')){
            setFilterValue(filterValue => [...filterValue, 'Stocks']);
        }
    };
    const handleInvestmentsClick = () => {
        if (!filterValue.includes('Investments')){
            setFilterValue(filterValue => [...filterValue, 'Investments']);
        }
    };
    const handleBondsClick = () => {
        if (!filterValue.includes('Bonds')){
            setFilterValue(filterValue => [...filterValue, 'Bonds']);
        }
    };

    const handleGeneralRemove = () => {
        if (filterValue.includes('General')){
            setFilterValue(filterValue.filter(item => item !== 'General'));
        }
    };
    const handleSavingsRemove = () => {
        if (filterValue.includes('Savings')){
            setFilterValue(filterValue.filter(item => item !== 'Savings'));
        }
    };
    const handleStocksRemove = () => {
        if (filterValue.includes('Stocks')){
            setFilterValue(filterValue.filter(item => item !== 'Stocks'));
        }
    };
    const handleInvestmentsRemove = () => {
        if (filterValue.includes('Investments')){
            setFilterValue(filterValue.filter(item => item !== 'Investments'));
        }
    };
    const handleBondsRemove = () => {
        if (filterValue.includes('Bonds')){
            setFilterValue(filterValue.filter(item => item !== 'Bonds'));
        }
    };

    return(
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
                    <ArticlesHead />
                    <Box sx={{ pt: 3 }}>
                        <Stack direction="row" spacing={1}>
                            <Chip label="General" onClick={handleGeneralClick} onDelete={handleGeneralRemove}/>
                            <Chip label="Savings" onClick={handleSavingsClick} onDelete={handleSavingsRemove}/>
                            <Chip label="Stocks" onClick={handleStocksClick} onDelete={handleStocksRemove}/>
                            <Chip label="Investments" onClick={handleInvestmentsClick} onDelete={handleInvestmentsRemove}/>
                            <Chip label="Bonds" onClick={handleBondsClick} onDelete={handleBondsRemove}/>
                        </Stack>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {articles.map((articles) => (
                                <Grid item key={articles.id} lg={4} md={6} xs={12}>
                                    <ArticlesCard articles={articles} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
