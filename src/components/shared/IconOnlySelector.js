import React from 'react';
import { Box, Grid, Container } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Icon } from 'components/shared/Icon';

const IconOnlySelector = ({ iconData, selectedIcon, onIconClick }) => {
    return(
        <>
            <Box>
                <Typography variant='h6' component='h2'>
                    Icons:
                </Typography>
                <Box>
                    <Grid container spacing={1}>
                        {iconData.map((iconData) => (
                            <Grid lg={4} md={6} xs={12}>
                                <Box item key={iconData} 
                                sx={{fontSize: '50px', justifyContent: 'center', marginLeft: 2}}>
                                    <Button variant='outlined' onClick={() => onIconClick(iconData)}
                                    sx={{justifyContent: 'center'}}>
                                    <Icon
                                    name={iconData}
                                    color='primary' 
                                    sx={{ fontSize: '40px', }}
                                    />
                                    {selectedIcon === iconData && <Icon
                                    name={iconData}
                                    sx={{ fontSize: '10px', backgroundColor: '#04a5a3'}}
                                    />}
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default IconOnlySelector;