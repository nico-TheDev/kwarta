import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import TransactionIcon from '@mui/icons-material/PriceChange'
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SavingsIcon from '@mui/icons-material/Savings'
import LibraryIcon from '@mui/icons-material/LocalLibrary'
import TrophyIcon from '@mui/icons-material/EmojiEvents'
import UserIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import TimelineIcon from '@mui/icons-material/Timeline'
import { Logo } from './logo'
import { NavItem } from './nav-item'
import { CircularProgressWithLabel } from './circular-progress-with-label'
import { getLanguage } from 'utils/getLanguage'

export const DashboardSidebar = (props) => {
    const { open, onClose } = props
    const router = useRouter()
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    })

    const items = [
        {
            href: '/',
            icon: <BarChartIcon fontSize='small' />,
            title: getLanguage().dashboard
        },
        {
            href: '/accounts',
            icon: <WalletIcon fontSize='small' />,
            title: getLanguage().accounts
        },
        {
            href: '/transactions',
            icon: <TransactionIcon fontSize='small' />,
            title: getLanguage().transactions
        },
        {
            href: '/cashflow',
            icon: <TimelineIcon fontSize='small' />,
            title: getLanguage().cashflow
        },
        {
            href: '/savings',
            icon: <SavingsIcon fontSize='small' />,
            title: getLanguage().savings
        },
        {
            href: '/articles',
            icon: <LibraryIcon fontSize='small' />,
            title: getLanguage().articles
        },
        {
            href: '/achievements',
            icon: <TrophyIcon fontSize='small' />,
            title: getLanguage().achievements
        },
        {
            href: '/profile',
            icon: <UserIcon fontSize='small' />,
            title: getLanguage().profile
        },
        {
            href: '/settings',
            icon: <SettingsIcon fontSize='small' />,
            title: 'Settings'
        }
    ]

    useEffect(
        () => {
            if (!router.isReady) {
                return
            }

            if (open) {
                onClose?.()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    )

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '120vh',
                    pt: 2,
                    pb: 5
                }}
            >
                <div>
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Box>
                            <CircularProgressWithLabel value={97} />
                            <Typography variant='body1' textAlign='center'>
                                {getLanguage().doingGreat}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-around',
                                px: 2,
                                py: '11px',
                                borderRadius: 1,
                                gap: '20px'
                            }}
                        >
                            <NextLink href='/' passHref>
                                <a>
                                    <Logo
                                        sx={{
                                            height: 42,
                                            width: 42
                                        }}
                                    />
                                </a>
                            </NextLink>
                            <div>
                                <Typography color='inherit' variant='subtitle1'>
                                    CASH
                                </Typography>
                                <Typography color='neutral.400' variant='body2'>
                                    Monitoring Dashboard
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
                    ))}
                </Box>
            </Box>
        </>
    )

    if (lgUp) {
        return (
            <Drawer
                anchor='left'
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant='permanent'
            >
                {content}
            </Drawer>
        )
    }

    return (
        <Drawer
            anchor='left'
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant='temporary'
        >
            {content}
        </Drawer>
    )
}

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
}
