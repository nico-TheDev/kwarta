import React from 'react';
import { useState, forwardRef } from 'react'
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material'
import Button from '@mui/material/Button'

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

import { SketchPicker } from 'react-color';

const ColorPicker = ({ handleColorClick, setShowColorWheel}) => {
    return(
        <>
            <Box>
                <Button onClick={() => setShowColorWheel(false)}>
                    <Icon 
                        name={ICON_NAMES.SYSTEM_ICONS.ADD}
                        color='primary'
                        sx={{ fontSize: '25px' }}
                    />
                </Button>
                <SketchPicker
                    onChangeComplete={color => handleColorClick(color.hex)}
                />
            </Box>
    
        </>
    ); 
};

export default ColorPicker;