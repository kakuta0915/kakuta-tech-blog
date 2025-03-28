import path from 'path'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
      },
      { protocol: 'https', hostname: 'images.microcms-assets.io' },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
}

export default nextConfig
