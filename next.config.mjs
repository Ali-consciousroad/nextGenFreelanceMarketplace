import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {};

/** @type {import('next-pwa').PWAConfig} */
const pwaConfig = {
    dest: 'public'
};

export default withPWA(pwaConfig)(nextConfig);
