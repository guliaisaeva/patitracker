/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: { remotePatterns: [
    {
      protocol: 'http',
      hostname: '185.46.55.50',
    },
  ],
}
};

export default nextConfig;
