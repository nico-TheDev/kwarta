import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Clock as ClockIcon } from '../../icons/clock'
import { Download as DownloadIcon } from '../../icons/download'
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import BankIcon from '@mui/icons-material/AccountBalance'
import PaidIcon from '@mui/icons-material/Paid'
import { theme } from 'theme'
import { formatPrice } from 'utils/format-price'
<<<<<<< HEAD
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'
=======
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53

export const CategoriesCard = ({ account, ...rest }) => (
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
<<<<<<< HEAD
                <Icon name={ICON_NAMES.CATEGORY_ICONS.FOOD} color='primary' sx={{ fontSize: '50px' }} />
=======
                <BankIcon color='primary' sx={{ fontSize: '50px' }} />
>>>>>>> 05a55481dfece81d4d6b6c9208c304b53abf4d53
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                    {account.title}
                </Typography>
                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                    {formatPrice(account.balance)}
                </Typography>
            </Box>
            <Typography align='center' color='textPrimary' variant='body1'>
                {account.description}
            </Typography>
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
                    <DownloadIcon color='action' />
                </Grid>
            </Grid>
        </Box>
    </Card>
)

CategoriesCard.propTypes = {
    product: PropTypes.object.isRequired
}
