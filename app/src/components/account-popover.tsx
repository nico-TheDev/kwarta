'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuthStore } from 'stores/useAuthStore';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import { useLanguageStore } from 'stores/useLanguageStore';

interface AccountPopoverProps {
    anchorEl: HTMLElement | null;
    onClose?: () => void;
    open: boolean;
    name?: string;
    [key: string]: unknown;
}

export const AccountPopover = ({ anchorEl, onClose, open, name, ...other }: AccountPopoverProps) => {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const setIsTutorialOpen = useLanguageStore((state) => state.setIsTutorialOpen);
    const resetTransactions = useTransactionStore((state) => state.resetTransactions);
    const resetAccounts = useAccountStore((state) => state.resetAccounts);
    const resetCategories = useCategoryStore((state) => state.resetCategories);

    const handleSignOut = () => {
        onClose?.();
        logout();
        resetTransactions();
        resetAccounts();
        resetCategories();
        router.push('/login');
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: '300px' } }}
            {...other}
        >
            <Box sx={{ py: 1.5, px: 2 }}>
                <Typography variant='overline'>Account</Typography>
                <Typography color='text.secondary' variant='body2'>{name}</Typography>
            </Box>
            <MenuList
                disablePadding
                sx={{
                    '& > *': {
                        '&:first-of-type': { borderTopColor: 'divider', borderTopStyle: 'solid', borderTopWidth: '1px' },
                        padding: '12px 16px',
                    },
                }}
            >
                <MenuItem onClick={() => setIsTutorialOpen(true)}>Show Tutorial</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
};
