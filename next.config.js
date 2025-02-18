// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.myanimelist.net',
      'raw.githubusercontent.com'
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
