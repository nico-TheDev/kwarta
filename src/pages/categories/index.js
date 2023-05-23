import { useState, forwardRef, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Switch, Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CategoriesHead } from '../../components/categories/categories-head';
import { CategoriesCard } from '../../components/categories/categories-card';
import { DashboardLayout } from '../../components/dashboard-layout';
import { getLanguage } from 'utils/getLanguage'

import useSortCategories from 'hooks/useSortCategories';
import { useLanguageStore } from 'stores/useLanguageStore';
import DashboardTour from 'components/tours/DashboardTour';
import { useAuthStore } from 'stores/useAuthStore';
import CategoryCardList from 'components/shared/CategoryCardList';

const Page = () => {
    const [isExpense, setIsExpense, handleExpense, categoryData] = useSortCategories();
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const [currentCategoriesList, setCurrentCategoriesList] = useState([]);
    const [showTour, setShowTour] = useState(false);
    const getTourProgress = useAuthStore((state) => state.getTourProgress);
    const manageTourProgress = useAuthStore((state) => state.manageTourProgress);

    useEffect(() => {
        const currentTour = getTourProgress('articles');
        setShowTour(currentTour.isDone);
    }, []);

    useEffect(() => {
        const expenseList = categoryData.filter((item) => item.category_type === 'expense');
        console.log({ expenseList });
        if (isExpense) {
            const updatedArr = [
                { name: 'Needs', data: [], type: 'needs' },
                { name: 'Wants', data: [], type: 'wants' },
                { name: 'Savings', data: [], type: 'savings' }
            ];
            expenseList.forEach((category) => {
                const targetArr = updatedArr.find((item) => item.type === category.expense_type);
                targetArr?.data.push(category);
            });

            setCurrentCategoriesList(updatedArr);
        }
    }, [isExpense, categoryData]);

    const tourSteps = [
        {
            target: '.categories_step_one',
            title: 'Categories',
            content:
                'This tab displays all categories for your transactions. Each transaction can be categorized to a  category. Categories can be created, updated and deleted.',
            disableBeacon: true,
            placement: 'bottom'
        },
        {
            target: '.categories_step_two',
            title: 'Add Category Button',
            content: 'Used to create new category if existing categories do not fit your needs',
            placement: 'bottom'
        },
        {
            target: '.categories_step_three',
            title: 'Sort By Type',
            content:
                'used to sort categories into expense or income. Categories can be classified as an expense or an income.',
            placement: 'bottom'
        }
    ];

    return (
        <>
            {!showTour && (
                <DashboardTour
                    setShowTour={setShowTour}
                    tourSteps={tourSteps}
                    finishTour={() => manageTourProgress('categories')}
                />
            )}
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
                        <Typography variant='body1'>{getLanguage(currentLanguage).income}</Typography>
                        <Switch
                            checked={isExpense}
                            onChange={handleExpense}
                            inputProps={{ 'aria-label': 'controlled' }}
                            className='categories_step_three'
                        />
                        <Typography variant='body1'>{getLanguage(currentLanguage).expense}</Typography>
                    </Box>
                    <Box sx={{ pt: 3 }}>
                        {isExpense ? (
                            currentCategoriesList.map((item) => (
                                <>
                                    <Typography variant='h6' mb={2}>
                                        {item.name}
                                    </Typography>
                                    <CategoryCardList categoryList={item.data} />
                                </>
                            ))
                        ) : (
                            <Grid container spacing={3}>
                                {categoryData.map((category) => (
                                    <Grid item key={category.id} lg={3} md={6} sm={6} xs={12}>
                                        <CategoriesCard categories={category} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
