// サイトの情報を追加（サイトのURL）
//  @type {import('next-sitemap').IConfig}

const config = {
  siteUrl: 'https://kakuta-programming-blog',
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://kakuta-programming-blog/server-sitemap.xml'],
  },
}

module.exports = config
