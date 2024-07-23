/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.mjs';


const nextConfig = {
  reactStrictMode: true,

  images: { remotePatterns: [
    {
      protocol: 'http',
      hostname: '185.46.55.50',
    },
  ],
},

i18n,
};

export default nextConfig;
