import Head from 'next/head'
import { Box, Container, Grid, Pagination } from '@mui/material'
import articles from '../data/articles'
import { ArticlesHead } from '../components/articles/articles-head'
import { ArticlesCard } from '../components/articles/articles-card'
import { DashboardLayout } from '../components/dashboard-layout'

const Page = () => (
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
