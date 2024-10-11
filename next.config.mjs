/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compress: true,
    output: 'standalone',
    compiler: {
        removeConsole: true,
      },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://888api.chula.engineering/api/v1' ,
    },
};

export default nextConfig;
