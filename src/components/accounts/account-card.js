import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Clock as ClockIcon } from '../../icons/clock'
import Button from '@mui/material/Button'
import { theme } from 'theme'
import { formatPrice } from 'utils/format-price'

import AccountEditFormModal from 'components/form/account-edit-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

export const AccountCard = ({ account, ...rest }) => {
    const [openAccountEditModal, setOpenAccountEditModal] = useState(false)
    const handleOpenAccountEditModal = () => setOpenAccountEditModal(true)

    return(
        <>
            <AccountEditFormModal open={openAccountEditModal} setOpen={setOpenAccountEditModal}/>
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
                        <Icon name={account.account_icon} sx={{ fontSize: '100px', color:account.account_color }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
                        <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                            {account.account_name}
                        </Typography>
                        <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                            {formatPrice(account.account_amount)}
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
                            <Button onClick={handleOpenAccountEditModal}>
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.EDIT} color='action' sx={{ fontSize: '20px' }} />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    )
}

AccountCard.propTypes = {
    product: PropTypes.object.isRequired
}
