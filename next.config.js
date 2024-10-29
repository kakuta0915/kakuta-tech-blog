// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
      'images.microcms-assets.io',
    ],
  },

  env: {
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN || '',
    API_KEY: process.env.API_KEY || '',
    QIITA_API_TOKEN: process.env.QIITA_API_TOKEN || '',
  },

  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
