import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

import { formatPrice } from 'utils/format-price'

export default function DealsCard({iconName, savings}){
    return(
        <Box sx={{ pt: 3 }}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    position: 'relative'
                    }}
                    // {...rest}
                    elevation={10}
            >
                <CardContent>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Icon
                                name={iconName}
                                color='primary'
                                sx={{ fontSize: '100px'}}
                            />
                        </Box>
                        <Box>
                            <Typography align='center' color='textPrimary' gutterBottom variant='h5'>
                                {savings.productName}
                            </Typography>
                            <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                {formatPrice(savings.total, true)}
                            </Typography>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 1 }}>
                                <Typography align='center' color='textPrimary' gutterBottom variant='h6'>
                                    {savings.percent}%
                                </Typography>
                                <Icon
                                    name={ICON_NAMES.SYSTEM_ICONS.UP}
                                    color='primary'
                                    sx={{ fontSize: '25px', color: '#2ECC71' }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}