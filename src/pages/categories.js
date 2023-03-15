import { useState, forwardRef, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Switch, Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CategoriesHead } from '../components/categories/categories-head';
import { CategoriesCard } from '../components/categories/categories-card';
import { DashboardLayout } from '../components/dashboard-layout';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

import { useAuthStore } from 'stores/useAuthStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import useGetUserCategories from 'hooks/useGetUserCategories';
import useSortCategories from 'hooks/useSortCategories';

const Page = () => {
    const [isExpense, setIsExpense, handleExpense, categoryData] = useSortCategories();

    return (
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                        <Typography variant='body1'>Income</Typography>
                        <Switch
                            checked={isExpense}
                            onChange={handleExpense}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant='body1'>Expense</Typography>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            {categoryData.map((category) => (
                                <Grid item key={category.id} lg={3} md={6} xs={12}>
                                    <CategoriesCard categories={category} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;