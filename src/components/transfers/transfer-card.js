import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import Button from '@mui/material/Button';
import { theme } from 'theme';
import { formatPrice } from 'utils/format-price';
import Link from 'next/link';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

export const TransferCard = ({ transfer, ...rest }) => {
    console.log(transfer);
    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
                {...rest}
            >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
                    <Box sx={{ width: '100%', mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '15%', mb: 4 }}>
                            <Icon name={ICON_NAMES.SYSTEM_ICONS.SEND_MONEY} color='primary' fontSize='small' />
                            <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                {transfer.targetSenderAccount.account_name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '15%', mb: 4 }}>
                            <Icon name={ICON_NAMES.SYSTEM_ICONS.RECEIVE_MONEY} color='primary' fontSize='small' />
                            <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                {transfer.targetReceiverAccount.account_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                        <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                            {transfer.amount}
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
                        {/* <Link
                            href={{
                                pathname: '/transfers/[trasnferId]',
                                query: { transferId: transfer.id }
                                }}
                            key={transfer.id}
                        >
                            <Button>
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.EDIT} color='action' sx={{ fontSize: '20px' }} />
                            </Button>
                        </Link> */}
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
};

TransferCard.propTypes = {
    product: PropTypes.object.isRequired
};
