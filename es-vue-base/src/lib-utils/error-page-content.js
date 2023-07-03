export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
    NEWS_DOMAIN = process.env.NEWS_DOMAIN || 'https://news.energysage.com',
) => ({
    errorLinks: [
        {
            icon: 'IconContactUs',
            link: 'mailto:hello@energysage.com',
            label: 'Contact Us',
        },
        {
            icon: 'IconCommunitySolar',
            link: `${ES_DOMAIN}/solar/`,
            label: 'Learn About Solar',
        },
        {
            icon: 'IconInfoBlogPost',
            link: NEWS_DOMAIN,
            label: 'Informative Blog Post',
        },
        {
            icon: 'IconMarketplace',
            link: `${ES_DOMAIN}/market-intro/`,
            label: 'EnergySage Marketplace',
        },
    ],
});
