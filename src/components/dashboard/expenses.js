import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { getLanguage } from '../../utils/getLanguage'

export const Expenses = (props) => {
    return (
        <Card {...props}>
            <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography color='textSecondary' gutterBottom variant='overline'>
                            {getLanguage().expenses}
                        </Typography>
                        <Typography color='textPrimary' variant='h4'>
                            ₱23k
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <AttachMoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
