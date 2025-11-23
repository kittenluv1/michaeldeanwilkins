import type { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    // Allow images served from Sanity CDN. Keep both `domains` and
    // `remotePatterns` to cover different Next versions and formats.
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
}
 
export default config