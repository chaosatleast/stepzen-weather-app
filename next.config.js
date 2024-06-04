/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'www.weatherbit.io'
      },{
        protocol: 'https',
        hostname: 'nextui.org'
      }]
  },
};

module.exports = nextConfig;
