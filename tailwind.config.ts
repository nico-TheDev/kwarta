import type { Config } from 'tailwindcss'
import { colors } from './constants/themes'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xxs: '320px',
            xs: '375px',
            sm: '425px',
            md: '768px',
            laptop: '1024px',
            desktop: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                tertiary: colors.tertiary,
                white: colors.white,
                black: colors.black,
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            screens: {
                xxs: '320px',
                xs: '375px',
                sm: '425px',
                md: '768px',
                laptop: '1024px',
                desktop: '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
}
export default config
