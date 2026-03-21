import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Stack,
    Chip,
    SvgIcon,
    Typography,
    Link,
    CardMedia
} from '@mui/material';
import { getLanguage } from 'utils/getLanguage';
import Image from 'next/image';

export const ArticlesCard = ({ articles, ...rest }) => {
    return (
        <Link href={articles.articleLink} underline='none' target='_blank'>
            <Card sx={{ height: '100%' }} {...rest}>
                <CardContent>
                    <CardMedia
                        sx={{ height: 140, mb: 2 }}
                        image={articles.articleImage}
                        title={articles.articleTitle}
                    />
                    <Box>
                        <Typography color='textPrimary' variant='h6' mb={4}>
                            {articles.articleTitle}
                        </Typography>
                        <Stack direction='row' spacing={1} mb={2}>
                            {articles.articleTags.map((item) => (
                                <Chip label={item} variant='outlined' color='secondary' />
                            ))}
                        </Stack>
                        <Typography color='textSecondary' variant='subtitle1'>
                            {articles.articleAuthor}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};
