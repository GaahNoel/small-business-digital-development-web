/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      API_BASE_URL: process.env.API_BASE_URL,
      POSITION_STACK_KEY: process.env.POSITION_STACK_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    },
    images: {
      disableStaticImages: true,
    },
  }),
);

module.exports = nextConfig;
