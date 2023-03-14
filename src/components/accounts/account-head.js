import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { getLanguage } from 'utils/getLanguage'
import { formatPrice } from 'utils/format-price'

import AccountCreateFormModal from 'components/form/account-create-form-modal'
import { Icon } from 'components/shared/Icon';
import { ICON_NAMES } from 'constants/constant'

import { useAccountStore } from 'stores/useAccountStore';

export const AccountHead = (props) => {
    const theme = useTheme()

    const accounts = useAccountStore(state => state.accounts);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalAccounts = accounts.reduce((acc, currentAccount) => {
            acc += parseFloat(currentAccount.account_amount);
                return acc;
        }, 0);

        setTotal(totalAccounts);
    }, [accounts]);

    const [openAccountCreateModal, setOpenAccountCreateModal] = useState(false);
    const handleOpenAccountCreateModal = () => setOpenAccountCreateModal(true);
    return (
        <>
            <AccountCreateFormModal open={openAccountCreateModal} setOpen={setOpenAccountCreateModal} />
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
                            onClick={handleOpenAccountCreateModal}
                            variant='contained'
                            color='primary'
                            startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.ADD_ACCOUNT} color='#FFFFFF' fontSize='small' />}
                            sx={{ mr: 1 }}
                        >
                            {getLanguage().addAccount}
                        </Button>
                        <Link href='/transfers' passHref>
                            <Button variant='outlined' startIcon={<Icon name={ICON_NAMES.SYSTEM_ICONS.HISTORY} color='#FFFFFF' fontSize='small' />} sx={{ mr: 1 }}>
                                Transfer History
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Card elevation={5}>
                        <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant='h3'>{getLanguage().totalBalance}</Typography>
                                <Typography variant='h3' color='primary.dark'>
                                {formatPrice(total)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
