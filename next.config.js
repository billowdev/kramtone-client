const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", 'fastly.picsum.photos', 'picsum.photos'],

  },
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx', 'html'],
  webpack: (config, options) => {
    config.resolve.alias['pages'] = path.join(__dirname, 'src/pages')
    return config
  }
}

module.exports = nextConfig
