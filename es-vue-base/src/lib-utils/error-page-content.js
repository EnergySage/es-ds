export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
) => ({
    errorLinks: [
        {
            icon: 'IconContactUs',
            link: 'mailto:hello@energysage.com',
            label: 'Contact us',
        },
        {
            icon: 'IconCommunitySolar',
            link: `${ES_DOMAIN}/solar/`,
            label: 'Learn about solar',
        },
        {
            icon: 'IconInfoBlogPost',
            link: `${ES_DOMAIN}/blog/`,
            label: 'EnergySage blog',
        },
        {
            icon: 'IconMarketplace',
            link: `${ES_DOMAIN}/shop/home-solar/`,
            label: 'EnergySage marketplace',
        },
    ],
});
