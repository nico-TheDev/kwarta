'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, ListItem } from '@mui/material';

interface NavItemProps {
    href: string;
    icon?: React.ReactNode;
    title: string;
    [key: string]: unknown;
}

export const NavItem = ({ href, icon, title, ...others }: NavItemProps) => {
    const pathname = usePathname();
    const active = href ? pathname === href : false;

    return (
        <ListItem disableGutters sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }} {...others}>
            <Button
                component={NextLink}
                href={href}
                startIcon={icon}
                disableRipple
                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'primary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': { color: active ? 'primary.main' : 'neutral.400' },
                    '&:hover': { backgroundColor: 'rgba(255,255,255, 0.08)' },
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{title}</Box>
            </Button>
        </ListItem>
    );
};
