import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Clock as ClockIcon } from '../../icons/clock'
import { Download as DownloadIcon } from '../../icons/download'
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import BankIcon from '@mui/icons-material/AccountBalance'
import PaidIcon from '@mui/icons-material/Paid'
import { theme } from 'theme'
import { formatPrice } from 'utils/format-price'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

export const CategoriesCard = ({ categories, ...rest }) => (
    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
        {...rest}
    >
        <CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Icon name={categories.category_icon} color='primary' sx={{ fontSize: '100px', color:categories.category_color }} />
            </Box>
            <Box sx={{width: '100%', mb: 1 }}>
                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                    {categories.category_name}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Grid
                    item
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <ClockIcon color='action' />
                    <Typography color='textSecondary' display='inline' sx={{ pl: 1 }} variant='body2'>
                        Last Used: 2 hrs ago
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Icon name={ICON_NAMES.SYSTEM_ICONS.EDIT} color='action' sx={{ fontSize: '25px' }} />
                </Grid>
            </Grid>
        </Box>
    </Card>
)

CategoriesCard.propTypes = {
    product: PropTypes.object.isRequired
}
