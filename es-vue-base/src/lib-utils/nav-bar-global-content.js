import { NAV_BAR_ICONS } from './nav-bar-constants';

export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
    // exposed separately from ES_DOMAIN in case we want to use prod for images in local/dev
    ES_IMAGE_DOMAIN = process.env.ES_IMAGE_DOMAIN || 'https://www.energysage.com',
    NEWS_DOMAIN = process.env.NEWS_DOMAIN || 'https://news.energysage.com',
    COMMUNITY_SOLAR_DOMAIN = process.env.COMMUNITY_SOLAR_DOMAIN || 'https://communitysolar.energysage.com',
    HEAT_PUMPS_DOMAIN = process.env.HEAT_PUMPS_DOMAIN || 'https://heatpumps.energysage.com',
) => ({
    home: {
        name: 'EnergySage',
        link: ES_DOMAIN,
    },
    mainMenuText: 'Main menu',
    mobileCloseButtonAltText: 'Close',
    mobileNavButtonAltText: 'Open navigation menu',
    seeAllText: 'See all',
    topLevelMenus: [
        {
            name: 'Tips & guides',
            subHeading: 'Learn from experts',
            icon: NAV_BAR_ICONS.LIGHT_BULB,
            topics: [
                {
                    name: 'Solar',
                    subtopics: [
                        {
                            name: 'Home solar guide',
                            link: `${ES_DOMAIN}/solar/`,
                        },
                        {
                            name: 'Community solar guide',
                            link: `${ES_DOMAIN}/solar/solar-101/what-is-community-solar/`,
                        },
                        {
                            name: 'Best solar panels',
                            link: `${NEWS_DOMAIN}/best-solar-panels-complete-ranking/`,
                            newTab: true,
                        },
                        {
                            name: 'How much do solar panels cost?',
                            link: `${ES_DOMAIN}/local-data/solar-panel-cost/`,
                        },
                    ],
                },
                {
                    name: 'Backup power',
                    subtopics: [
                        {
                            name: 'Backup power guide',
                            link: `${ES_DOMAIN}/energy-storage/`,
                        },
                        {
                            name: 'Best home batteries',
                            link: `${NEWS_DOMAIN}/best-solar-batteries/`,
                            newTab: true,
                        },
                        {
                            name: 'Home batteries vs. generators',
                            link: `${NEWS_DOMAIN}/battery-backup-power-vs-generators-which-is-right-for-you/`,
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Heating & cooling',
                    subtopics: [
                        {
                            name: 'Heat pump guide',
                            link: `${ES_DOMAIN}/clean-heating-cooling/air-source-heat-pumps/`,
                        },
                        {
                            name: 'How much do heat pumps cost?',
                            link: `${
                                ES_DOMAIN
                            }/clean-heating-cooling/air-source-heat-pumps/costs-and-benefits-air-source-heat-pumps/`,
                        },
                        {
                            name: 'How do heat pumps work?',
                            link: `${NEWS_DOMAIN}/how-do-heat-pumps-work/`,
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Electric vehicles',
                    subtopics: [
                        {
                            name: 'EV charging guide',
                            link: `${ES_DOMAIN}/ev-charging/`,
                        },
                        {
                            name: 'Electric vehicles guide',
                            link: `${ES_DOMAIN}/electric-vehicles/`,
                        },
                        {
                            name: 'Best EV chargers',
                            link: `${ES_DOMAIN}/energy-products/ev-charging-stations/`,
                        },
                        {
                            name: 'How much does it cost to charge an EV?',
                            link: `${NEWS_DOMAIN}/electric-vehicle-charging-cost-vs-gas/`,
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Smart home',
                    subtopics: [
                        {
                            name: 'Home electricity guide',
                            link: `${ES_DOMAIN}/electricity/`,
                        },
                        {
                            name: 'Home energy management guide',
                            link: `${ES_DOMAIN}/energy-management/`,
                        },
                        {
                            name: 'Energy efficiency',
                            link: `${ES_DOMAIN}/energy-efficiency/`,
                        },
                        {
                            name: 'Best smart home gadgets',
                            link: `${ES_DOMAIN}/energy-products/`,
                        },
                    ],
                },
                {
                    name: 'For your business',
                    subtopics: [
                        {
                            name: 'Solar for businesses',
                            link: `${NEWS_DOMAIN}/commercial-solar-benefits-for-business/`,
                            newTab: true,
                        },
                        {
                            name: 'Solar for nonprofit organizations',
                            link: `${NEWS_DOMAIN}/solar-nonprofit-benefits-financing/`,
                            newTab: true,
                        },
                        {
                            name: 'Backup power for businesses',
                            link: `${NEWS_DOMAIN}/energy-storage-for-businesses/`,
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Clean energy financing',
                    subtopics: [
                        {
                            name: 'How to pay for solar',
                            link: `${ES_DOMAIN}/solar/how-to-go-solar/how-to-pay-for-solar/`,
                        },
                        {
                            name: 'How to choose a solar loan',
                            link: `${NEWS_DOMAIN}/solar-loans-overview/`,
                            newTab: true,
                        },
                        {
                            name: 'What to know about solar leases',
                            link: `${NEWS_DOMAIN}/solar-leases/`,
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'News',
                    subtopics: [
                        {
                            name: 'How long can you run your house on a Tesla Powerwall?',
                            link: `${NEWS_DOMAIN}/tesla-powerwall-how-much-home-can-you-run-on-it-for-how-long/`,
                            newTab: true,
                        },
                        {
                            name: 'How have solar panel cost and efficiency changed over time?',
                            link: `${NEWS_DOMAIN}/solar-panel-efficiency-cost-over-time/`,
                            newTab: true,
                        },
                    ],
                    link: NEWS_DOMAIN,
                    newTab: true,
                },
            ],
            featuredArticle: {
                linkName: "Editors' pick",
                linkUrl: `${NEWS_DOMAIN}/are-solar-panels-worth-it/`,
                lede: 'Are solar panels worth it?',
                newTab: true,
                image500: `${ES_IMAGE_DOMAIN}/static/img/navbar/articles/are-solar-panels-worth-it-500w.png`,
                imageAlt: 'home with solar panels',
            },
        },
        {
            name: 'Solar calculator',
            subHeading: 'Check your savings',
            icon: NAV_BAR_ICONS.CALCULATOR,
            link: `${ES_DOMAIN}/solar/calculator/`,
            topics: [],
        },
        {
            name: 'About us',
            subHeading: 'Why EnergySage',
            icon: NAV_BAR_ICONS.ES_LEAF,
            topics: [
                {
                    name: 'Our company',
                    subtopics: [
                        {
                            name: 'Mission & values',
                            link: `${ES_DOMAIN}/about-us/company/`,
                        },
                        {
                            name: 'How it works',
                            link: `${ES_DOMAIN}/shop/home-solar/`,
                        },
                        {
                            name: 'Our team',
                            link: `${ES_DOMAIN}/about-us/team/`,
                        },
                        {
                            name: 'Partner with us',
                            link: `${ES_DOMAIN}/partners/`,
                        },
                        {
                            name: 'Careers',
                            link: `${ES_DOMAIN}/about-us/careers/`,
                        },
                    ],
                },
                {
                    name: 'Our work',
                    subtopics: [
                        {
                            name: 'Market intel',
                            link: `${ES_DOMAIN}/data/`,
                        },
                        {
                            name: 'Editorial guidelines',
                            link: `${ES_DOMAIN}/editorial-guidelines/`,
                        },
                        {
                            name: 'Press',
                            link: `${ES_DOMAIN}/press/`,
                        },
                    ],
                },
            ],
            featuredArticle: {
                linkName: 'New research',
                linkUrl: `${ES_DOMAIN}/press/energysage-marketplace-intel-report-16`,
                lede: 'EnergySage Intel\'s latest Solar & Storage Marketplace Report',
                image500: `${ES_IMAGE_DOMAIN}/static/img/navbar/articles/latest-market-intel-500w.png`,
                imageAlt: 'market intel report charts',
            },
        },
    ],
    products: [
        {
            name: 'Home solar',
            link: `${ES_DOMAIN}/shop/home-solar/`,
            topics: [
                {
                    name: 'Rooftop solar',
                    subHeading: 'Install solar on your property',
                    link: `${ES_DOMAIN}/shop/home-solar/`,
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            name: 'Home solar guide',
                            link: `${ES_DOMAIN}/solar/`,
                        },
                        {
                            name: 'Solar calculator',
                            link: `${ES_DOMAIN}/solar/calculator/`,
                        },
                        {
                            name: 'Search local installers',
                            // eslint-disable-next-line max-len
                            link: `${ES_DOMAIN}/supplier/search?selected_facets=services:installers&selected_facets=technology_types:Solar%20PV`,
                        },
                        {
                            name: 'Financing',
                            link: `${ES_DOMAIN}/solar/financing/loan-providers/`,
                        },
                        {
                            name: 'Equipment rebates',
                            link: `${ES_DOMAIN}/promotions/`,
                        },
                        {
                            name: 'Compare solar panels',
                            link: `${ES_DOMAIN}/solar-panels/`,
                        },
                        {
                            name: 'Compare inverters',
                            link: `${ES_DOMAIN}/solar-inverters/`,
                        },
                        {
                            name: 'Solar incentives',
                            link: `${ES_DOMAIN}/local-data/solar-rebates-incentives/`,
                        },
                        {
                            name: 'Backup power guide',
                            link: `${ES_DOMAIN}/energy-storage/`,
                        },
                        {
                            name: 'Get personalized quotes',
                            link: `${ES_DOMAIN}/market/start/`,
                            emphasize: true,
                        },
                    ],
                },
                {
                    name: 'Community solar',
                    subHeading: 'Go solar with no equipment',
                    link: `${ES_DOMAIN}/shop/community-solar/`,
                    newTab: true,
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            name: 'Community solar guide',
                            link: `${ES_DOMAIN}/solar/solar-101/what-is-community-solar/`,
                        },
                        {
                            name: 'Search solar farms',
                            link: `${COMMUNITY_SOLAR_DOMAIN}/projects`,
                            newTab: true,
                            emphasize: true,
                        },
                    ],
                },
            ],
            featuredArticle: {
                eyebrow: "Editors' pick",
                link: `${ES_DOMAIN}/local-data/solar-panel-cost/`,
                name: 'How much do solar panels cost?',
                image500: `${ES_IMAGE_DOMAIN}/static/img/navbar/articles/solar-panel-cost-500w.png`,
                imageAlt: 'home with solar panels and money',
            },
        },
        {
            name: 'Community solar',
            link: `${ES_DOMAIN}/shop/community-solar/`,
            newTab: true,
            items: [
                {
                    name: 'Community solar guide',
                    link: `${ES_DOMAIN}/solar/solar-101/what-is-community-solar/`,
                },
                {
                    name: 'Search solar farms ',
                    link: `${COMMUNITY_SOLAR_DOMAIN}/projects`,
                    newTab: true,
                    emphasize: true,
                },
            ],
        },
        {
            name: 'Heating & cooling',
            link: `${ES_DOMAIN}/shop/heat-pumps/`,
            newTab: true,
            items: [
                {
                    name: 'Heat pump guide',
                    link: `${ES_DOMAIN}/clean-heating-cooling/air-source-heat-pumps/`,
                },
                {
                    name: 'Heat pump incentives',
                    link: `${ES_DOMAIN}/clean-heating-cooling/air-source-heat-pumps/heat-pump-incentives/`,
                },
                {
                    name: 'Get personalized quotes',
                    link: `${HEAT_PUMPS_DOMAIN}/dashboard`,
                    newTab: true,
                    emphasize: true,
                },
            ],
        },
        {
            name: 'Backup power',
            link: `${ES_DOMAIN}/energy-storage/`,
            items: [
                {
                    name: 'Backup power guide',
                    link: `${ES_DOMAIN}/energy-storage/`,
                },
                {
                    name: 'Home battery incentives',
                    link: `${ES_DOMAIN}/energy-storage/benefits-of-storage/energy-storage-incentives/`,
                },
                {
                    name: 'Compare home batteries',
                    link: `${ES_DOMAIN}/solar-batteries/`,
                },
                {
                    name: 'Get quotes for solar + batteries',
                    link: `${ES_DOMAIN}/market/start/`,
                    emphasize: true,
                },
            ],
        },
        {
            name: 'EV charging',
            link: `${ES_DOMAIN}/ev-charging/`,
            items: [
                {
                    name: 'EV charging guide',
                    link: `${ES_DOMAIN}/ev-charging/`,
                },
                {
                    name: 'Compare EV chargers',
                    link: `${ES_DOMAIN}/energy-products/ev-charging-stations/`,
                },
                {
                    name: 'Electric vehicle guide',
                    link: `${ES_DOMAIN}/electric-vehicles/`,
                },
            ],
        },
        {
            name: 'For your business',
            link: `${ES_DOMAIN}/businesses/`,
            items: [
                {
                    name: 'Solar for businesses',
                    link: `${NEWS_DOMAIN}/commercial-solar-benefits-for-business/`,
                    newTab: true,
                },
                {
                    name: 'Solar for nonprofit organizations',
                    link: `${NEWS_DOMAIN}/solar-nonprofit-benefits-financing/`,
                    newTab: true,
                },
                {
                    name: 'Energy storage for businesses',
                    link: `${NEWS_DOMAIN}/energy-storage-for-businesses/`,
                    newTab: true,
                },
            ],
        },
    ],
});
