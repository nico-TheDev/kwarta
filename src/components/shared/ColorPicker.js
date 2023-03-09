import React from 'react';
import { useState, forwardRef } from 'react';
import { Box, Switch, Snackbar, Alert as MuiAlert } from '@mui/material';
import Button from '@mui/material/Button';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';

import { ChromePicker } from 'react-color';

const styles = {
    popover: {
        position: 'absolute',
        zIndex: 9999,
        left: 200
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    }
};

const ColorPicker = ({ setShowColorWheel, selectedColor, handleColorSelect }) => {
    return (
        <Box sx={styles.popover}>
            <Box sx={styles.cover} onClick={() => setShowColorWheel(false)} />
            <ChromePicker onChangeComplete={handleColorSelect} color={selectedColor} />
        </Box>
    );
};

export default ColorPicker;
