/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compress: true,
    output: 'standalone',
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL || 'https://api.888.chula.engineering/api/v1',
    }
};

export default nextConfig;
