import { useState } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useAccountStore } from 'stores/useAccountStore';
import { useTransactionStore } from 'stores/useTransactionStore';
const Tour = dynamic(() => import('../components/tour'), { ssr: false });

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const DashboardLayout = (props) => {
    const { children } = props;
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const accounts = useAccountStore((state) => state.accounts);
    const transactions = useTransactionStore((state) => state.transactions);
    return (
        <AuthGuard>
            <DashboardLayoutRoot>
                {(transactions && transactions.length === 0) || accounts.length === 0 ? (
                    <Tour open={open} handleClose={handleClose} />
                ) : null}
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </AuthGuard>
    );
};
