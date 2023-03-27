import {useEffect, useState} from 'react';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography, Link, CardMedia} from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import Image from 'next/image'

export const ArticlesCard = ({ articles, ...rest }) => {
    return(
        <Link href={articles.articleLink} underline="none" target="_blank">
            <Card sx={{ height: '100%' }} {...rest}>
                <CardContent>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={articles.articleImage}
                        title={articles.articleTitle}
                    />
                    <Box>
                        <Typography color='textPrimary' variant='h5'>
                            {articles.articleTitle}
                        </Typography>
                        <Typography color='textSecondary' variant='subtitle1'>
                            {articles.articleAuthor}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}
