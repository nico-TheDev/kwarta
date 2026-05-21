const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    turbopack: {
        root: path.join(__dirname),
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    serverExternalPackages: ['puppeteer'],
    async redirects() {
        return [
            { source: '/sign-in', destination: '/login', permanent: true },
            { source: '/sign-in/confirm', destination: '/login', permanent: false },
            { source: '/editSurvey', destination: '/edit-survey', permanent: true },
        ];
    },
};

module.exports = nextConfig;
