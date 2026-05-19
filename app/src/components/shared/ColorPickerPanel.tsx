import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant';
import { red } from '@mui/material/colors';
import { color } from '@mui/system';

const styles = {
    colorPanel: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    }
};

const ColorPickerPanel = ({ colorList = [], selectedColor, onColorPress, setShowColorWheel }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <Typography variant='h6' component='h2'>
                Colors:
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    padding: 0,
                    flex: 1,
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                <Box
                    onClick={() => setShowColorWheel(true)}
                    sx={{
                        ...styles.colorPanel,
                        backgroundColor: selectedColor || 'white',
                        border: '1px solid black',
                        color: 'white'
                    }}
                >
                    <Icon name={ICON_NAMES.SYSTEM_ICONS.ADD} color={selectedColor || 'primary'} />
                </Box>
                {colorList.map((colorList) => (
                    <Box
                        key={colorList.colorID}
                        sx={{ ...styles.colorPanel, backgroundColor: colorList.color }}
                        onClick={() => onColorPress(colorList.color)}
                    >
                        {selectedColor === colorList.color && (
                            <Box sx={{ color: 'white' }}>
                                <Icon name={ICON_NAMES.SYSTEM_ICONS.CHECK} color='inherit' size='large' />
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ColorPickerPanel;
