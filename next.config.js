/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withImages = require('next-images');

const nextConfig = withImages(
  withPWA({
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    },
    env: {
      IMG_BB_KEY: process.env.IMG_BB_KEY,
      API_URL: process.env.API_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
      disableStaticImages: true,
    },
  }),
);

module.exports = nextConfig;
