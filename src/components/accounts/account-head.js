import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'

export const AccountHead = (props) => {
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
                    Accounts
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<AddCardIcon fontSize='small' />}
                        sx={{ mr: 1 }}
                    >
                        Add Account
                    </Button>
                    <Button variant='outlined' startIcon={<TransferIcon fontSize='small' />} sx={{ mr: 1 }}>
                        Create Transfer
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card elevation={5}>
                    <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='h3'>Total Balance</Typography>
                            <Typography variant='h3' color='primary.dark'>
                                ₱ 50,000.00
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}
