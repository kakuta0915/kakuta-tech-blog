// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
      'images.microcms-assets.io',
    ],
  },
}

module.exports = nextConfig
