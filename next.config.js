/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'www.weatherbit.io'
      },{
        protocol: 'https',
        hostname: 'nextui.org'
      },
    ]
  },
  removeConsole: process.env.NODE_ENV === "production"
};

module.exports = nextConfig;
