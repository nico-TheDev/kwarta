import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography, Link, CardMedia} from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import Image from 'next/image'

import howToPic from '../../assets/img/how-to.jpg'

export const ArticlesCard = ({ articles, ...rest }) => (
    <Link href={articles.articleLink} underline="none" target="_blank">
        <Card sx={{ height: '100%' }} {...rest}>
            <CardContent>
                <Box>
                    <Image 
                        src={howToPic}
                        fill
                    />
                </Box>
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
