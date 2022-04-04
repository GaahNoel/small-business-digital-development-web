/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withImages = require('next-images');

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

module.exports = withImages({
  env: {
    IMG_BB_KEY: process.env.IMG_BB_KEY,
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
});

module.exports = nextConfig;
