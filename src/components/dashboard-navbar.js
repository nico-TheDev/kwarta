import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { AccountPopover } from './account-popover';
import { useAuthStore } from 'stores/useAuthStore';
import { getLanguage } from 'utils/getLanguage';
import TransactionFormModal from './form/transaction-form-modal';
import { useRouter } from 'next/router';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
    const { onSidebarOpen, ...other } = props;
    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);
    const user = useAuthStore((state) => state.authState?.user);
    const [openTransactionModal, setOpenTransactionModal] = useState(false);

    const router = useRouter();

    const handleOpenModal = () => setOpenTransactionModal(true);

    return (
        <>
            <TransactionFormModal open={openTransactionModal} setOpen={setOpenTransactionModal} />
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280
                    },
                    width: {
                        lg: 'calc(100% - 280px)'
                    }
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none'
                            }
                        }}
                    >
                        <MenuIcon fontSize='small' />
                    </IconButton>
                    {router.pathname !== '/' && (
                        <Tooltip title='Back Icon'>
                            <IconButton sx={{ ml: 1 }} onClick={() => router.back()}>
                                <ArrowBackIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        onClick={handleOpenModal}
                        variant='contained'
                        color='primary'
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block'
                            }
                        }}
                    >
                        {getLanguage().addTransaction}
                    </Button>
                    <Tooltip title={getLanguage().addTransaction}>
                        <IconButton
                            sx={{
                                ml: 1,
                                display: {
                                    xs: 'initial',
                                    sm: 'none'
                                }
                            }}
                            onClick={handleOpenModal}
                        >
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                    <Avatar
                        onClick={() => setOpenAccountPopover(true)}
                        ref={settingsRef}
                        sx={{
                            cursor: 'pointer',
                            height: 40,
                            width: 40,
                            ml: 4
                        }}
                        src={user?.photo}
                    />
                </Toolbar>
            </DashboardNavbarRoot>
            <AccountPopover
                name={user?.name}
                anchorEl={settingsRef.current}
                open={openAccountPopover}
                onClose={() => setOpenAccountPopover(false)}
            />
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func
};
