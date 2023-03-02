import { useRef, useState } from 'react'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import AddCardIcon from '@mui/icons-material/AddCard'
import TransferIcon from '@mui/icons-material/Autorenew'
import { getLanguage } from 'utils/getLanguage'
import AccountFormModal from '../form/account-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

export const AccountHead = (props) => {
    const theme = useTheme()
    const [openAccountModal, setOpenAccountModal] = useState(false)

    const handleOpenModal = () => setOpenAccountModal(true)
    return (
        <>
            <AccountFormModal open={openAccountModal} setOpen={setOpenAccountModal} />
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
                        {getLanguage().accounts}
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button
                            onClick={handleOpenModal}
                            variant='contained'
                            color='primary'
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_ACCOUNT} color='#FFFFFF' fontSize='small' />}
                            sx={{ mr: 1 }}
                        >
                            {getLanguage().addAccount}
                        </Button>
                        <Button variant='outlined' startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_TRANSFER} color='#FFFFFF' fontSize='small' />} sx={{ mr: 1 }}>
                            {getLanguage().createTransfer}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Card elevation={5}>
                        <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant='h3'>{getLanguage().totalBalance}</Typography>
                                <Typography variant='h3' color='primary.dark'>
                                    ₱ 50,000.00
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
