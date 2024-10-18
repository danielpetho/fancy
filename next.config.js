const MillionLint = require('@million/lint');
const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',

        pathname: '/**',
      },
    ],
  },
}
 
module.exports = MillionLint.next({
  enabled: false,
  rsc: true
})(withMDX(nextConfig))