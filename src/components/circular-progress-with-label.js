import * as React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function CircularProgressWithLabel(props) {
    return (
        <Box mb={2} sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress variant='determinate' {...props} color='success' size={100} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant='caption' component='div' color='white' sx={{ fontSize: 30 }}>
                    {`${Math.round(props.value)}`}
                </Typography>
            </Box>
        </Box>
    )
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired
}
