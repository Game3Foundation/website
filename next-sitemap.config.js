/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://game3.foundation',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
		],
	},
	changefreq: 'daily',
	priority: 0.7,
	outDir: 'public',
	additionalPaths: async (config) => {
		const result = [
			// Grants pages
			{
				loc: '/grants',
				changefreq: 'weekly',
				priority: 0.8,
				lastmod: new Date().toISOString(),
			},
			// Initiatives pages
			{
				loc: '/initiatives',
				changefreq: 'weekly',
				priority: 0.8,
				lastmod: new Date().toISOString(),
			},
		]
		return result
	},
}
