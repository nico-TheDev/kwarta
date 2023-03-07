import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { categories } from '../__mocks__/accounts';
import { CategoriesHead } from '../components/categories/categories-head';
import { CategoriesCard } from '../components/categories/categories-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

const Page = () => (
    <>
        <Head>
            <title>Categories | CASH</title>
        </Head>
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <CategoriesHead />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {categories.map((categories) => (
                            <Grid item key={categories.id} lg={4} md={6} xs={12}>
                                <CategoriesCard categories={categories} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
