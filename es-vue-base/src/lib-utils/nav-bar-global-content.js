/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { NAV_BAR_ICONS } from './nav-bar-constants';

export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
    // exposed separately from ES_DOMAIN in case we want to use prod for images in local/dev
    ES_IMAGE_DOMAIN = process.env.ES_IMAGE_DOMAIN || 'https://www.energysage.com',
    // keeping NEWS_DOMAIN to minimize breaking change, but it is deprecated
    NEWS_DOMAIN = process.env.NEWS_DOMAIN || 'https://www.energysage.com',
    COMMUNITY_SOLAR_DOMAIN = process.env.COMMUNITY_SOLAR_DOMAIN || 'https://communitysolar.energysage.com',
    HEAT_PUMPS_DOMAIN = process.env.HEAT_PUMPS_DOMAIN || 'https://heatpumps.energysage.com',
    EV_RAIVEN_DOMAIN = 'https://shop.energysage.com',
) => ({
    home: {
        name: 'EnergySage',
        link: `${ES_DOMAIN}/`,
    },
    mainMenuText: 'Main menu',
    mobileCloseButtonAltText: 'Close',
    mobileNavButtonAltText: 'Open navigation menu',
    seeAllText: 'See all',
    topLevelMenus: [
        {
            name: 'Tips & guides',
            topics: [
                {
                    name: 'Solar',
                    link: '',
                    subtopics: [
                        {
                            name: 'Home solar guide',
                            link: `${ES_DOMAIN}/solar/`,
                        },
                        {
                            name: 'Community solar guide',
                            link: `${ES_DOMAIN}/community-solar/`,
                        },
                        {
                            name: 'Best solar panels',
                            link: `${ES_DOMAIN}/solar/best-solar-panels-complete-ranking/`,
                        },
                        {
                            name: 'How much do solar panels cost?',
                            link: `${ES_DOMAIN}/local-data/solar-panel-cost/`,
                        },
                    ],
                },
                {
                    name: 'Backup power',
                    link: '',
                    subtopics: [
                        {
                            name: 'Backup power guide',
                            link: `${ES_DOMAIN}/energy-storage/`,
                        },
                        {
                            name: 'Best home batteries',
                            link: `${ES_DOMAIN}/energy-storage/best-home-batteries/`,
                        },
                        {
                            name: 'Home batteries vs. generators',
                            link: `${ES_DOMAIN}/energy-storage/battery-backup-power-vs-generators-which-is-right-for-you/`,
                        },
                    ],
                },
                {
                    name: 'Heating & cooling',
                    link: '',
                    subtopics: [
                        {
                            name: 'Heat pump guide',
                            link: `${ES_DOMAIN}/heat-pumps/`,
                        },
                        {
                            name: 'How much do heat pumps cost?',
                            link: `${ES_DOMAIN}/heat-pumps/costs-and-benefits-air-source-heat-pumps/`,
                        },
                        {
                            name: 'How do heat pumps work?',
                            link: `${ES_DOMAIN}/heat-pumps/how-do-heat-pumps-work/`,
                        },
                    ],
                },
                {
                    name: 'Electric vehicles',
                    link: '',
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
                            link: `${ES_DOMAIN}/ev-charging/ev-charging-stations/`,
                        },
                        {
                            name: 'How much does it cost to charge an EV?',
                            link: `${ES_DOMAIN}/ev-charging/electric-vehicle-charging-cost/`,
                        },
                    ],
                },
                {
                    name: 'Smart home',
                    link: '',
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
                    link: '',
                    subtopics: [
                        {
                            name: 'Solar for businesses',
                            link: `${ES_DOMAIN}/business-solutions/commercial-solar-benefits/`,
                        },
                        {
                            name: 'Solar for nonprofit organizations',
                            link: `${ES_DOMAIN}/business-solutions/solar-nonprofit-benefits-financing/`,
                        },
                        {
                            name: 'Backup power for businesses',
                            link: `${ES_DOMAIN}/business-solutions/energy-storage-for-businesses/`,
                        },
                    ],
                },
                {
                    name: 'Clean energy financing',
                    link: '',
                    subtopics: [
                        {
                            name: 'How to pay for solar',
                            link: `${ES_DOMAIN}/solar/how-to-pay-for-solar/`,
                        },
                        {
                            name: 'How to choose a solar loan',
                            link: `${ES_DOMAIN}/solar/solar-loans/`,
                        },
                        {
                            name: 'What to know about solar leases',
                            link: `${ES_DOMAIN}/solar/solar-leases/`,
                        },
                        {
                            name: 'Explore cost-saving clean energy incentives',
                            link: `${ES_DOMAIN}/shop/clean-energy-savings-and-tax-incentives/`,
                        },
                    ],
                },
                {
                    name: 'News',
                    link: `${ES_DOMAIN}/news/`,
                    subtopics: [
                        {
                            name: 'How Trump’s latest tariffs could impact solar',
                            link: '/news/how-new-trump-tariffs-could-affect-the-solar-industry/',
                        },
                        {
                            name: 'Trump initially ordered a pause on IRA funding—what does it mean for solar?',
                            link: '/blog/ira-funding-pause-2025/',
                        },
                    ],
                },
                {
                    name: 'Blog',
                    link: `${ES_DOMAIN}/blog/`,
                    subtopics: [
                        {
                            name: "Solar is a bipartisan issue—here's why",
                            link: '/blog/you-should-support-solar-no-matter-who-you-vote-for/',
                        },
                        {
                            name: 'The TCPA’s one-to-one consent rule is no more—what that means for you',
                            link: '/blog/tcpa-one-to-one-consent-rule-vacated/',
                        },
                    ],
                },
            ],
            featuredArticle: {
                eyebrow: "Editors' pick",
                imageAlt: 'Solar panels on a house',
                imageUrl: 'https://a-us.storyblok.com/f/1006159/500x375/c57c675005/are-solar-panels-worth-it-500w.png/m/500x0',
                name: 'Are solar panels worth it?',
                url: `${ES_DOMAIN}/solar/are-solar-panels-worth-it/`,
            },
        },
        {
            name: 'Solar calculator',
            link: `${ES_DOMAIN}/solar/calculator/`,
            topics: [],
        },
        {
            name: 'About us',
            topics: [
                {
                    name: 'Our company',
                    link: '',
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
                            name: 'Our Energy Advisors',
                            link: `${ES_DOMAIN}/energy-advisors/`,
                        },
                        {
                            name: 'Careers',
                            link: `${ES_DOMAIN}/about-us/careers/`,
                        },
                    ],
                },
                {
                    name: 'Our work',
                    link: '',
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
                {
                    name: 'Work with us',
                    link: '',
                    subtopics: [
                        {
                            name: 'Solar & HVAC installers',
                            link: `${ES_DOMAIN}/installers/`,
                        },
                        {
                            name: 'Corporate partnerships',
                            link: `${ES_DOMAIN}/partners/corporations/`,
                        },
                        {
                            name: 'Community programs',
                            link: `${ES_DOMAIN}/partners/non-profits/`,
                        },
                        {
                            name: 'Utility programs',
                            link: `${ES_DOMAIN}/partners/utilities/`,
                        },
                        {
                            name: 'Others',
                            link: `${ES_DOMAIN}/partners/`,
                        },
                    ],
                },
            ],
            featuredArticle: {
                eyebrow: 'New research',
                imageAlt: 'Home with solar panels',
                imageUrl: 'https://a-us.storyblok.com/f/1006159/500x375/623aec5f8f/intelnavimage.jpg/m/500x0',
                name: 'EnergySage Releases 21st Solar & Storage Marketplace Report',
                url: `${ES_DOMAIN}/press/energysage-marketplace-intel-report-21/`,
            },
        },
    ],
    products: [
        {
            name: 'Home solar',
            link: `${ES_DOMAIN}/shop/home-solar/`,
            items: [],
            topics: [
                {
                    name: 'Rooftop solar',
                    subHeading: 'Install solar on your property',
                    link: `${ES_DOMAIN}/shop/home-solar/`,
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            emphasize: false,
                            name: 'Home solar guide',
                            newTab: false,
                            link: `${ES_DOMAIN}/solar/`,
                        },
                        {
                            emphasize: false,
                            name: 'Solar calculator',
                            newTab: false,
                            link: `${ES_DOMAIN}/solar/calculator/`,
                        },
                        {
                            emphasize: false,
                            name: 'Search local installers',
                            newTab: false,
                            link: `${ES_DOMAIN}/supplier/search?selected_facets=services:installers&selected_facets=technology_types:Solar%20PV`,
                        },
                        {
                            emphasize: false,
                            name: 'Financing',
                            newTab: false,
                            link: `${ES_DOMAIN}/financing/`,
                        },
                        {
                            emphasize: false,
                            name: 'Solar loan providers',
                            newTab: false,
                            link: `${ES_DOMAIN}/solar/financing/loan-providers/`,
                        },
                        {
                            emphasize: false,
                            name: 'Equipment rebates',
                            newTab: false,
                            link: `${ES_DOMAIN}/promotions/`,
                        },
                        {
                            emphasize: false,
                            name: 'Compare solar panels',
                            newTab: false,
                            link: `${ES_DOMAIN}/solar-panels/`,
                        },
                        {
                            emphasize: false,
                            name: 'Compare inverters',
                            newTab: false,
                            link: `${ES_DOMAIN}/solar-inverters/`,
                        },
                        {
                            emphasize: false,
                            name: 'Solar incentives',
                            newTab: false,
                            link: `${ES_DOMAIN}/local-data/solar-rebates-incentives/`,
                        },
                        {
                            emphasize: false,
                            name: 'Backup power guide',
                            newTab: false,
                            link: `${ES_DOMAIN}/energy-storage/`,
                        },
                        {
                            emphasize: true,
                            name: 'Get personalized quotes',
                            newTab: false,
                            link: `${ES_DOMAIN}/market/start/`,
                        },
                    ],
                },
                {
                    name: 'Community solar',
                    subHeading: 'Go solar with no equipment',
                    link: `${ES_DOMAIN}/shop/community-solar/`,
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            emphasize: false,
                            name: 'Community solar guide',
                            newTab: false,
                            link: `${ES_DOMAIN}/community-solar/`,
                        },
                        {
                            emphasize: true,
                            name: 'Search solar farms',
                            newTab: true,
                            link: `${COMMUNITY_SOLAR_DOMAIN}/projects`,
                        },
                    ],
                },
            ],
            featuredArticle: {
                eyebrow: "Editors' pick",
                imageAlt: 'How much do solar panels cost?',
                imageUrl: 'https://a-us.storyblok.com/f/1006159/2688x1513/83fcff9d64/how-much-do-solar-panels-cost_-thumb.jpg/m/500x0',
                name: 'How much do solar panels cost?',
                url: `${ES_DOMAIN}/local-data/solar-panel-cost/`,
            },
        },
        {
            name: 'Community solar',
            link: `${ES_DOMAIN}/shop/community-solar/`,
            items: [
                {
                    emphasize: false,
                    name: 'Community solar',
                    newTab: false,
                    link: `${ES_DOMAIN}/shop/community-solar/`,
                },
                {
                    emphasize: false,
                    name: 'Community solar guide',
                    newTab: false,
                    link: `${ES_DOMAIN}/community-solar/`,
                },
                {
                    emphasize: true,
                    name: 'Search solar farms',
                    newTab: true,
                    link: `${COMMUNITY_SOLAR_DOMAIN}/projects`,
                },
            ],
            topics: [],
        },
        {
            name: 'Heating & cooling',
            link: `${ES_DOMAIN}/shop/heat-pumps/`,
            items: [
                {
                    emphasize: false,
                    name: 'Heating & cooling',
                    newTab: false,
                    link: `${ES_DOMAIN}/shop/heat-pumps/`,
                },
                {
                    emphasize: false,
                    name: 'Heat pump guide',
                    newTab: false,
                    link: `${ES_DOMAIN}/heat-pumps/`,
                },
                {
                    emphasize: false,
                    name: 'Heat pump incentives',
                    newTab: false,
                    link: `${ES_DOMAIN}/heat-pumps/heat-pump-incentives/`,
                },
                {
                    emphasize: false,
                    name: 'Financing',
                    newTab: false,
                    link: `${ES_DOMAIN}/financing/`,
                },
                {
                    emphasize: true,
                    name: 'Get personalized quotes',
                    newTab: false,
                    link: `${ES_DOMAIN}/shop/heat-pumps/`,
                },
            ],
            topics: [],
        },
        {
            name: 'Backup power',
            link: `${ES_DOMAIN}/energy-storage/`,
            items: [
                {
                    emphasize: false,
                    name: 'Backup power guide',
                    newTab: false,
                    link: `${ES_DOMAIN}/energy-storage/`,
                },
                {
                    emphasize: false,
                    name: 'Home battery incentives',
                    newTab: false,
                    link: `${ES_DOMAIN}/energy-storage/benefits-of-storage/energy-storage-incentives/`,
                },
                {
                    emphasize: false,
                    name: 'Compare home batteries',
                    newTab: false,
                    link: `${ES_DOMAIN}/solar-batteries/`,
                },
                {
                    emphasize: true,
                    name: 'Get quotes for solar + batteries',
                    newTab: false,
                    link: `${ES_DOMAIN}/market/start/`,
                },
            ],
            topics: [],
        },
        {
            name: 'EV charging',
            link: `${ES_DOMAIN}/ev-charging/`,
            items: [
                {
                    emphasize: false,
                    name: 'EV charging guide',
                    newTab: false,
                    link: `${ES_DOMAIN}/ev-charging/`,
                },
                {
                    emphasize: false,
                    name: 'Electric vehicle guide',
                    newTab: false,
                    link: `${ES_DOMAIN}/electric-vehicles/`,
                },
                {
                    emphasize: true,
                    name: 'Shop EV chargers',
                    newTab: true,
                    link: 'https://shop.energysage.com',
                },
            ],
            topics: [],
        },
        {
            name: 'For your business',
            link: `${ES_DOMAIN}/businesses/`,
            items: [
                {
                    emphasize: false,
                    name: 'For your business',
                    newTab: false,
                    link: `${ES_DOMAIN}/businesses/`,
                },
                {
                    emphasize: false,
                    name: 'Solar for businesses',
                    newTab: false,
                    link: `${ES_DOMAIN}/business-solutions/commercial-solar-benefits/`,
                },
                {
                    emphasize: false,
                    name: 'Solar for nonprofit organizations',
                    newTab: false,
                    link: `${ES_DOMAIN}/business-solutions/solar-nonprofit-benefits-financing/`,
                },
                {
                    emphasize: false,
                    name: 'Energy storage for businesses',
                    newTab: false,
                    link: `${ES_DOMAIN}/business-solutions/energy-storage-for-businesses/`,
                },
            ],
            topics: [],
        },
    ],
});
