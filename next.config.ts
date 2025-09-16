
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Alternative: if you prefer the older domains format
    // domains: ['ecommerce.routemisr.com'],
  },
}

module.exports = nextConfig