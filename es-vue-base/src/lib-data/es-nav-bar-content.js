import { NAV_BAR_ICONS } from '../lib-utils/es-nav-bar-constants';

export default {
    home: {
        name: 'EnergySage',
        link: 'https://www.energysage.com/',
    },
    accountMenu: {
        loggedIn: {
            items: [
                {
                    name: 'My Account',
                    link: 'https://www.energysage.com/profile/',
                },
                {
                    name: 'Share Your Experience',
                    link: 'https://www.energysage.com/share-your-experience/',
                },
                {
                    name: 'Settings',
                    link: 'https://www.energysage.com/account-settings/router/',
                },
                {
                    name: 'Refer a Friend',
                    link: 'https://www.energysage.com/refer-a-friend/',
                },
                {
                    name: 'Sign Out',
                    link: 'https://www.energysage.com/logout/',
                },
            ],
        },
        loggedOut: {
            signIn: {
                name: 'Sign in',
                link: 'https://www.energysage.com/login/',
            },
            createAccount: {
                name: 'Create an account',
                link: 'https://www.energysage.com/register/',
            },
        },
    },
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
                            link: 'https://www.energysage.com/solar/',
                        },
                        {
                            name: 'Community solar guide',
                            link: 'https://www.energysage.com/solar/solar-101/what-is-community-solar/',
                        },
                        {
                            name: 'Best solar panels',
                            link: 'https://news.energysage.com/best-solar-panels-complete-ranking/',
                            newTab: true,
                        },
                        {
                            name: 'How much do solar panels cost?',
                            link: 'https://www.energysage.com/local-data/solar-panel-cost/',
                        },
                    ],
                },
                {
                    name: 'Backup power',
                    subtopics: [
                        {
                            name: 'Backup power guide',
                            link: 'https://www.energysage.com/energy-storage/',
                        },
                        {
                            name: 'Best home batteries',
                            link: 'https://news.energysage.com/best-solar-batteries/',
                            newTab: true,
                        },
                        {
                            name: 'Home batteries vs. generators',
                            link: 'https://news.energysage.com/battery-backup-power-vs-generators-which-is-right-for-you/',
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Heating & cooling',
                    subtopics: [
                        {
                            name: 'Heat pump guide',
                            link: 'https://www.energysage.com/clean-heating-cooling/air-source-heat-pumps/',
                        },
                        {
                            name: 'How much do heat pumps cost?',
                            link: 'https://www.energysage.com/clean-heating-cooling/air-source-heat-pumps/costs-and-benefits-air-source-heat-pumps/',
                        },
                        {
                            name: 'How do heat pumps work?',
                            link: 'https://news.energysage.com/how-do-heat-pumps-work/',
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Electric vehicles',
                    subtopics: [
                        {
                            name: 'EV charging guide',
                            link: 'https://www.energysage.com/ev-charging/',
                        },
                        {
                            name: 'Electric vehicles guide',
                            link: 'https://www.energysage.com/electric-vehicles/',
                        },
                        {
                            name: 'Best EV chargers',
                            link: 'https://www.energysage.com/energy-products/ev-charging-stations/',
                        },
                        {
                            name: 'How much does it cost to charge an EV?',
                            link: 'https://news.energysage.com/electric-vehicle-charging-cost-vs-gas/',
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Smart home',
                    subtopics: [
                        {
                            name: 'Home electricity guide',
                            link: 'http://www.energysage.com/electricity/',
                        },
                        {
                            name: 'Home energy management guide',
                            link: 'http://www.energysage.com/energy-management/',
                        },
                        {
                            name: 'Energy efficiency',
                            link: 'http://www.energysage.com/energy-efficiency/',
                        },
                        {
                            name: 'Best smart home gadgets',
                            link: 'http://www.energysage.com/energy-products/',
                        },
                    ],
                },
                {
                    name: 'For your business',
                    subtopics: [
                        {
                            name: 'Solar for businesses',
                            link: 'https://news.energysage.com/commercial-solar-benefits-for-business/',
                            newTab: true,
                        },
                        {
                            name: 'Solar for nonprofit organizations',
                            link: 'https://news.energysage.com/solar-nonprofit-benefits-financing/',
                            newTab: true,
                        },
                        {
                            name: 'Backup power for businesses',
                            link: 'https://news.energysage.com/energy-storage-for-businesses/',
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'Clean energy financing',
                    subtopics: [
                        {
                            name: 'How to pay for solar',
                            link: 'https://www.energysage.com/solar/how-to-go-solar/how-to-pay-for-solar/',
                        },
                        {
                            name: 'How to choose a solar loan',
                            link: 'https://news.energysage.com/solar-loans-overview/',
                            newTab: true,
                        },
                        {
                            name: 'What to know about solar leases',
                            link: 'https://news.energysage.com/solar-leases/',
                            newTab: true,
                        },
                    ],
                },
                {
                    name: 'News',
                    subtopics: [
                        {
                            name: 'How long can you run your house on a Tesla Powerwall?',
                            link: 'https://news.energysage.com/tesla-powerwall-how-much-home-can-you-run-on-it-for-how-long/',
                            newTab: true,
                        },
                        {
                            name: 'How have solar panel cost and efficiency changed over time?',
                            link: 'https://news.energysage.com/solar-panel-efficiency-cost-over-time/',
                            newTab: true,
                        },
                    ],
                    link: 'http://news.energysage.com/',
                    newTab: true,
                },
            ],
            featuredArticle: {
                linkName: "Editors' pick",
                linkUrl: 'https://news.energysage.com/are-solar-panels-worth-it/',
                lede: 'Are solar panels worth it?',
                newTab: true,
            },
        },
        {
            name: 'Solar calculator',
            subHeading: 'Check your savings',
            icon: NAV_BAR_ICONS.CALCULATOR,
            link: 'https://www.energysage.com/solar/calculator',
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
                            link: 'https://www.energysage.com/about-us/company/',
                        },
                        {
                            name: 'How it works',
                            link: 'https://www.energysage.com/market-intro/',
                        },
                        {
                            name: 'Partner with us',
                            link: 'https://www.energysage.com/partners/',
                        },
                        {
                            name: 'Careers',
                            link: 'https://www.energysage.com/about-us/careers/',
                        },
                        {
                            name: 'Market intel',
                            link: 'https://www.energysage.com/data/',
                        },
                        {
                            name: 'Editorial guidelines',
                            link: 'https://www.energysage.com/editorial-guidelines/',
                        },
                        {
                            name: 'Press',
                            link: 'https://www.energysage.com/press/',
                        },
                    ],
                },
            ],
            featuredArticle: {
                linkName: 'New research',
                linkUrl: 'https://www.energysage.com/press/energysage-marketplace-intel-report-16',
                lede: 'EnergySage Intel\'s latest Solar & Storage Marketplace Report',
            },
        },
    ],
    products: [
        {
            name: 'Home solar',
            link: 'https://www.energysage.com/market-intro/',
            topics: [
                {
                    name: 'Rooftop solar',
                    subHeading: 'Install solar on your property',
                    link: 'https://www.energysage.com/market-intro/',
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            name: 'Home solar guide',
                            link: 'https://www.energysage.com/solar/',
                        },
                        {
                            name: 'Solar calculator',
                            link: 'https://www.energysage.com/solar/calculator/',
                        },
                        {
                            name: 'Search local installers',
                            link: 'https://www.energysage.com/installers/',
                        },
                        {
                            name: 'Financing',
                            link: 'https://www.energysage.com/solar/financing/loan-providers/',
                        },
                        {
                            name: 'Equipment rebates',
                            link: 'https://www.energysage.com/market/equipment-rebates/',
                        },
                        {
                            name: 'Compare solar panels',
                            link: 'https://www.energysage.com/solar-panels/',
                        },
                        {
                            name: 'Compare inverters',
                            link: 'https://www.energysage.com/solar-inverters/',
                        },
                        {
                            name: 'Solar incentives',
                            link: 'https://www.energysage.com/local-data/solar-rebates-incentives/',
                        },
                        {
                            name: 'Backup power guide',
                            link: 'https://www.energysage.com/energy-storage/',
                        },
                        {
                            name: 'Get personalized quotes',
                            link: 'https://www.energysage.com/market/start/',
                            emphasize: true,
                        },
                    ],
                },
                {
                    name: 'Community solar',
                    subHeading: 'Go solar with no equipment',
                    link: 'https://communitysolar.energysage.com/',
                    newTab: true,
                    showItemsOnMobile: false,
                    subtopics: [
                        {
                            name: 'Community solar guide',
                            link: 'https://www.energysage.com/solar/solar-101/what-is-community-solar/',
                        },
                        {
                            name: 'Search solar farms',
                            link: 'https://communitysolar.energysage.com/projects',
                            newTab: true,
                            emphasize: true,
                        },
                    ],
                },
            ],
            featuredArticle: {
                eyebrow: "Editors' pick",
                link: 'https://www.energysage.com/local-data/solar-panel-cost/',
                name: 'How much do solar panels cost?',
            },
        },
        {
            name: 'Community solar',
            link: 'https://communitysolar.energysage.com/',
            newTab: true,
            items: [
                {
                    name: 'Community solar guide',
                    link: 'https://www.energysage.com/solar/solar-101/what-is-community-solar/',
                },
                {
                    name: 'Search solar farms ',
                    link: 'https://communitysolar.energysage.com/projects',
                    newTab: true,
                },
            ],
        },
        {
            name: 'Heating & cooling',
            link: 'https://heatpumps.energysage.com/',
            newTab: true,
            items: [
                {
                    name: 'Heat pump guide',
                    link: 'https://www.energysage.com/clean-heating-cooling/air-source-heat-pumps/',
                },
                {
                    name: 'Heat pump incentives',
                    link: 'https://www.energysage.com/clean-heating-cooling/air-source-heat-pumps/heat-pump-incentives/',
                },
                {
                    name: 'Get personalized quotes',
                    link: 'https://heatpumps.energysage.com/welcome',
                    newTab: true,
                },
            ],
        },
        {
            name: 'Backup power',
            link: 'https://www.energysage.com/energy-storage/',
            items: [
                {
                    name: 'Backup power guide',
                    link: 'https://www.energysage.com/energy-storage/',
                },
                {
                    name: 'Home battery incentives',
                    link: 'https://www.energysage.com/energy-storage/benefits-of-storage/energy-storage-incentives/',
                },
                {
                    name: 'Compare home batteries',
                    link: 'https://www.energysage.com/solar-batteries/',
                },
                {
                    name: 'Get quotes for solar + batteries',
                    link: 'https://www.energysage.com/market/start/',
                },
            ],
        },
        {
            name: 'EV charging',
            link: 'https://www.energysage.com/ev-charging/',
            items: [
                {
                    name: 'EV charging guide',
                    link: 'https://www.energysage.com/ev-charging/',
                },
                {
                    name: 'Compare EV chargers',
                    link: 'https://www.energysage.com/energy-products/ev-charging-stations/',
                },
                {
                    name: 'Electric vehicle guide',
                    link: 'https://www.energysage.com/electric-vehicles/',
                },
            ],
        },
        {
            name: 'For your business',
            link: 'https://www.energysage.com/businesses/',
            items: [
                {
                    name: 'Solar for businesses',
                    link: 'https://news.energysage.com/commercial-solar-benefits-for-business/',
                    newTab: true,
                },
                {
                    name: 'Solar for nonprofit organizations',
                    link: 'https://news.energysage.com/solar-nonprofit-benefits-financing/',
                    newTab: true,
                },
                {
                    name: 'Energy storage for businesses',
                    link: 'https://news.energysage.com/energy-storage-for-businesses/',
                    newTab: true,
                },
            ],
        },
    ],
};
