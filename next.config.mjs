/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['clubpump.com.br'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
