import Grid from '@mui/material/Grid';
import { CategoriesCard } from 'components/categories/categories-card';
import React from 'react';

export default function CategoryCardList({ categoryList }) {
    return (
        <Grid container spacing={2} mb={4}>
            {categoryList.map((category) => (
                <Grid item lg={3} md={6} xs={12}>
                    <CategoriesCard categories={category} key={category.id} />
                </Grid>
            ))}
        </Grid>
    );
}
