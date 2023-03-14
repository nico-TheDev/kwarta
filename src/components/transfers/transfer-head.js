import { useRef, useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import { formatPrice } from 'utils/format-price'

import TransferFormModal from 'components/form/transfer-create-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

import { useAccountStore } from 'stores/useAccountStore';

export const TransferHead = (props) => {
    const theme = useTheme()

    const accounts = useAccountStore(state => state.accounts);
    const [total, setTotal] = useState(0);

    const [openTransferModal, setOpenTransferModal] = useState(false);
    const handleOpenTransferModal = () => setOpenTransferModal(true);
    return (
        <>
            <TransferFormModal open={openTransferModal} setOpen={setOpenTransferModal} />
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
                        Transfer
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button
                            variant='outlined'
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_TRANSFER}
                            color='#FFFFFF'
                            fontSize='small' />}
                            sx={{ mr: 1 }}
                            onClick={handleOpenTransferModal}
                        >
                            {getLanguage().createTransfer}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
