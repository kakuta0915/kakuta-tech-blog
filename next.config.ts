import path from 'path'

const nextConfig = {
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
  webpack: (config: { resolve: { alias: { [x: string]: string } } }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
}

export default nextConfig
