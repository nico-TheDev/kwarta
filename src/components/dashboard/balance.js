import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import MoneyIcon from '@mui/icons-material/AttachMoney'
import { getLanguage } from 'utils/getLanguage'

export const Balance = (props) => {
    return (
        <Card sx={{ height: '100%' }} {...props}>
            <CardContent>
                <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage().balance}
                        </Typography>
                        <Typography color='textPrimary' variant='h4' sx={{ whiteSpace: 'nowrap' }}>
                            ₱25k
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <MoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowUpwardIcon color='success' />
                    <Typography
                        color='success'
                        sx={{
                            mr: 1
                        }}
                        variant='body2'
                    >
                        12%
                    </Typography>
                    <Typography color='textSecondary' variant='caption'>
                        {getLanguage().sinceLastMonth}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
