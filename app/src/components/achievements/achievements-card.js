import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography, Grid, LinearProgress } from '@mui/material'
import { useTheme } from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'
import { getLanguage } from 'utils/getLanguage'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

export const AchievementsCard = ({ achievements, ...rest }) => (
    <Card sx={{ height: '100%' }} {...rest}>
        <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between', display: 'grid', columnGap: 2, rowGap: 1, gridTemplateColumns: 'repeat(2, 1fr)',}}>
                <Grid item>
                    <Typography color='textPrimary' variant='h4'>
                        {achievements.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <EmojiEventsRoundedIcon sx={{ fontSize: 100, color: 'primary.main' }}/>
                </Grid>
            </Grid>
            <Box sx={{ pt: 3 }}>
                <Typography color='textSecondary' variant='subtitle1'>
                        {achievements.description}
                    </Typography>
            </Box>
            <Box sx={{ pt: 3 }}>
                <LinearProgress value={achievements.percentage} variant='determinate' />
            </Box>
        </CardContent>
    </Card>
)
