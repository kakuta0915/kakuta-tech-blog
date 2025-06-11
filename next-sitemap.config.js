// サイトの情報を追加（サイトのURL）
//  @type {import('next-sitemap').IConfig}

const config = {
  siteUrl: 'https://kakuta-programming-blog',
  outDir: './out',
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://kakuta-programming-blog/sitemap.xml'],
  },
}

module.exports = config
