'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { registerChartJs } from '../utils/register-chart-js';
import ThemeRegistry from './theme-registry';

registerChartJs();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeRegistry>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Toaster
                    position="bottom-left"
                    toastOptions={{
                        style: {
                            boxShadow: '9px 9px 40px -3px rgba(0,0,0,0.81)',
                        },
                    }}
                />
                {children}
            </LocalizationProvider>
        </ThemeRegistry>
    );
}
