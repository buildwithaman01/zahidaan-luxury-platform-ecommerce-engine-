/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zahidaan.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/api.php', '/webhook.php', '/logs/', '/order-status/', '/checkout/', '/cart/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' }
    ],
  },
  exclude: ['/order-status/*', '/checkout', '/cart'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Higher priority for product and category pages
    const priority =
      path === '/' ? 1.0 :
      path.startsWith('/shop') ? 0.9 :
      path.startsWith('/product') ? 0.9 :
      path.startsWith('/blog') ? 0.7 : 0.5
    return { loc: path, changefreq: 'weekly', priority, lastmod: new Date().toISOString() }
  }
}
