import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Icon } from 'components/shared/Icon';

const IconOnlySelector = ({ iconData, selectedIcon, onIconClick }) => {
    console.log(selectedIcon)
    return (
        <Box>
            <Typography variant='h6' component='h2' mb={2}>
                Icons:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    width: '100%',
                    justifyContent: 'space-between',
                    height: iconData.length > 8 ? 140 : 'auto',
                    overflowY: iconData.length > 8 ? 'scroll' : 'initial'
                }}
            >
                {iconData.map((iconData) => (
                    <Box onClick={() => onIconClick(iconData)} key={iconData}>
                        <Button
                            variant={selectedIcon === iconData ? 'contained' : 'outlined'}
                            sx={{ justifyContent: 'center', color: 'white' }}
                        >
                            <Icon
                                name={iconData}
                                color={selectedIcon === iconData ? 'inherit' : 'primary'}
                                sx={{ fontSize: '40px' }}
                            />
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default IconOnlySelector;
