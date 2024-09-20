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
   compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
  },

};

module.exports = nextConfig;
