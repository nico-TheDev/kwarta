import { Box, Checkbox, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'

export const ArticlesHead = (props) => {
    const theme = useTheme()

    return (
        <Box {...props}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                }}
            >
                <Typography sx={{ m: 1 }} variant='h4'>
                    {getLanguage().articles}
                </Typography>
            </Box>
        </Box>
    )
}
