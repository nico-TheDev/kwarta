import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import AuthProvider from './auth-provider';
import '../theme/global.css';

export const metadata: Metadata = {
    title: 'Kwarta: Financial Monitoring System',
    description: 'Personal finance monitoring and tracking',
    keywords: 'finance, budget, savings, stocks, investments',
    icons: {
        icon: '/static/icons/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: '#111827',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"
                />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body>
                <Providers>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Providers>
            </body>
        </html>
    );
}
