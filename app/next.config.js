/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        // Hybrid JS/TS codebase: enable strict checking in Phase 7 after Pages→App migration
        ignoreBuildErrors: true,
    },
    serverExternalPackages: ['puppeteer'],
};

module.exports = nextConfig;
