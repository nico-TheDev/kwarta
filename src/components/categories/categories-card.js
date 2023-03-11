import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BankIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
import { theme } from 'theme';
import { formatPrice } from 'utils/format-price';
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

export const CategoriesCard = ({ categories, ...rest }) => (
    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
        }}
        {...rest}
        elevation={10}
    >
        <CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2
                }}
            >
                <Icon
                    name={categories.category_icon}
                    color='primary'
                    sx={{ fontSize: '100px', color: categories.category_color }}
                />
            </Box>
            <Box sx={{ width: '100%', mb: 1 }}>
                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                    {categories.category_name}
                </Typography>
            </Box>
        </CardContent>

        <Box sx={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}>
            <Icon name={ICON_NAMES.SYSTEM_ICONS.EDIT} color='action' sx={{ fontSize: '25px' }} />
        </Box>
    </Card>
);

CategoriesCard.propTypes = {
    product: PropTypes.object.isRequired
};
