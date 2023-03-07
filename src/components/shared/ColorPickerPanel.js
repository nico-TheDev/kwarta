import React from 'react';
import { Box, Grid, Container } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

const ColorPickerPanel = ({ colorList = [], selectedColor, onColorPress, onAddPress }) => {
    return (
        <>
            <Box>
                <Typography variant='h6' component='h2'>
                    Colors:
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Button onClick={onAddPress}>
                    <Icon 
                        name={ICON_NAMES.SYSTEM_ICONS.ADD}
                        color={selectedColor || 'primary'}
                        sx={{ fontSize: '25px' }}
                    />
                </Button>
                <Box>
                    <Grid container spacing={1}>
                        {colorList.map((colorList) => (
                            <Grid lg={4} md={6} xs={12}>
                                <Box item key={colorList.colorID} 
                                sx={{ backgroundColor: colorList.color, fontSize: '50px', justifyContent: 'center'}}>
                                    <Button color='inherit' onClick={() => onColorPress(colorList.color)}
                                    sx={{justifyContent: 'center'}}>
                                    {selectedColor === colorList.color && <Icon
                                    name={ICON_NAMES.SYSTEM_ICONS.HISTORY}
                                    color='error' 
                                    sx={{ fontSize: '40px'}}
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

export default ColorPickerPanel;