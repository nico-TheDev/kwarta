import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { AuthContext } from '../contexts/auth-context';
import { auth, ENABLE_AUTH } from '../lib/auth';
import { useAuthStore } from 'stores/useAuthStore';
import { useTransactionStore } from 'stores/useTransactionStore';
import { useAccountStore } from 'stores/useAccountStore';
import { useCategoryStore } from 'stores/useCategoryStore';
import { useLanguageStore } from 'stores/useLanguageStore';
import { useSampleDataStore } from 'stores/useSampleDataStore';
import { getLanguage } from 'utils/getLanguage';

export const AccountPopover = (props) => {
    const { anchorEl, onClose, open, name, ...other } = props;
    const authContext = useContext(AuthContext);
    const logout = useAuthStore((state) => state.logout);
    const setIsTutorialOpen = useLanguageStore((state) => state.setIsTutorialOpen);
    const resetTransactions = useTransactionStore((state) => state.resetTransactions);
    const resetAccounts = useAccountStore((state) => state.resetAccounts);
    const resetCategories = useCategoryStore((state) => state.resetCategories);
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const openSampleDataDialog = useSampleDataStore((state) => state.openDialog);

    const handleSampleData = (mode) => {
        onClose?.();
        openSampleDataDialog(mode);
    };

    const handleSignOut = async () => {
        onClose?.();
        console.log('LOGOUT');
        logout();
        resetTransactions();
        resetAccounts();
        resetCategories();
        Router.push('login');
        // Check if authentication with Zalter is enabled
        // If not enabled, then redirect is not required
        if (!ENABLE_AUTH) {
            return;
        }

        // Check if auth has been skipped
        // From sign-in page we may have set "skip-auth" to "true"
        // If this has been skipped, then redirect to "sign-in" directly
        const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

        if (authSkipped) {
            // Cleanup the skip auth state
            globalThis.sessionStorage.removeItem('skip-auth');

            // Redirect to sign-in page
            Router.push('/sign-in').catch(console.error);
            return;
        }

        try {
            // This can be call inside AuthProvider component, but we do it here for simplicity
            await auth.signOut();

            // Update Auth Context state
            authContext.signOut();

            // Redirect to sign-in page
            Router.push('/sign-in').catch(console.error);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenTutorial = () => {
        setIsTutorialOpen(true);
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: { width: '300px' }
            }}
            {...other}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant='overline'>Account</Typography>
                <Typography color='text.secondary' variant='body2'>
                    {name}
                </Typography>
            </Box>
            <MenuList
                disablePadding
                sx={{
                    '& > *': {
                        '&:first-of-type': {
                            borderTopColor: 'divider',
                            borderTopStyle: 'solid',
                            borderTopWidth: '1px'
                        },
                        padding: '12px 16px'
                    }
                }}
            >
                <MenuItem onClick={handleOpenTutorial}>Show Tutorial</MenuItem>
                <MenuItem onClick={() => handleSampleData('load')}>
                    {getLanguage(currentLanguage || 'en').loadSampleData}
                </MenuItem>
                <MenuItem onClick={() => handleSampleData('clear')} sx={{ color: 'error.main' }}>
                    {getLanguage(currentLanguage || 'en').clearAllData}
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
};
