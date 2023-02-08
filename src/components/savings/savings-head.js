import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useTheme } from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'

export const SavingsHead = (props) => {
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
                    Savings
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<AddCardIcon fontSize='small' />}
                        sx={{ mr: 1 }}
                    >
                        Add Savings Goal
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card elevation={5}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='h3' mb={2}>
                                Total Savings
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='h3' color='primary'>
                                    ₱ 20,000.00 /
                                </Typography>
                                <Typography variant='h3' color='darkgray'>
                                    ₱ 100,000.00
                                </Typography>
                            </Box>
                            <Box sx={{ width: '80%', mx: 'auto' }} my={2}>
                                <LinearProgress variant='determinate' value={20} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}
