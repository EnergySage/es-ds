/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
// keeping COMMUNITY_SOLAR_DOMAIN, HEAT_PUMPS_DOMAIN and NEWS_DOMAIN for now to keep function argument order intact
// and to minimize breaking change to consuming applications, but they are now deprecated in this function
export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
    NEWS_DOMAIN = process.env.NEWS_DOMAIN || 'https://www.energysage.com',
    COMMUNITY_SOLAR_DOMAIN = process.env.COMMUNITY_SOLAR_DOMAIN || 'https://communitysolar.energysage.com',
    HEAT_PUMPS_DOMAIN = process.env.HEAT_PUMPS_DOMAIN || 'https://heatpumps.energysage.com',
) => ({
    banner: {
        headline: 'Make an impact.',
        subHeadline: "It's never been easier.",
        body: 'We developed our one-of-a-kind marketplace with funding from the U.S. Department of Energy to make clean home energy solutions affordable and accessible to all.',
    },
    home: {
        name: 'EnergySage',
        link: `${ES_DOMAIN}/`,
    },
    columns: [
        {
            title: 'Our offerings',
            links: [
                {
                    text: 'Home solar',
                    url: '/shop/home-solar/',
                },
                {
                    text: 'Community solar',
                    url: '/shop/community-solar/',
                },
                {
                    text: 'Heating & cooling',
                    url: '/shop/heat-pumps/',
                },
                {
                    text: 'Backup power',
                    url: '/energy-storage/',
                },
                {
                    text: 'EV charging',
                    url: '/ev-charging/',
                },
                {
                    text: 'For your business',
                    url: '/businesses/',
                },
                {
                    text: 'Other energy options',
                    url: '/other-clean-options/',
                },
            ],
        },
        {
            title: 'Resources',
            links: [
                {
                    text: 'Solar calculator',
                    url: `${ES_DOMAIN}/solar/calculator/`,
                },
                {
                    text: 'Solar rebates',
                    url: `${ES_DOMAIN}/market/equipment-rebates/`,
                },
                {
                    text: 'News',
                    url: '/news/',
                },
                {
                    text: 'Blog',
                    url: '/blog/',
                },
                {
                    text: 'Home solar guide',
                    url: '/shop/home-solar/',
                },
                {
                    text: 'Market intel',
                    url: `${ES_DOMAIN}/data/`,
                },
            ],
        },
        {
            title: 'About us',
            links: [
                {
                    text: 'Mission & values',
                    url: `${ES_DOMAIN}/about-us/company/`,
                },
                {
                    text: 'How it works',
                    url: '/shop/home-solar/',
                },
                {
                    text: 'Careers',
                    url: `${ES_DOMAIN}/about-us/careers/`,
                },
                {
                    text: 'Contact us',
                    url: `${ES_DOMAIN}/contact/`,
                },
                {
                    text: 'Editorial guidelines',
                    url: '/editorial-guidelines/',
                },
            ],
        },
        {
            title: 'Work with us',
            links: [
                {
                    text: 'Solar & HVAC installers',
                    url: '/installers/',
                },
                {
                    text: 'Corporate partnerships',
                    url: '/partners/corporations/',
                },
                {
                    text: 'Community programs',
                    url: `${ES_DOMAIN}/partners/non-profits/`,
                },
                {
                    text: 'Utility programs',
                    url: `${ES_DOMAIN}/partners/utilities/`,
                },
                {
                    text: 'Others',
                    url: `${ES_DOMAIN}/partners/`,
                },
            ],
        },
    ],
    socialLinks: [
        {
            icon: 'icon-facebook',
            text: 'Facebook',
            url: 'https://www.facebook.com/EnergySage',
        },
        {
            icon: 'icon-linkedin',
            text: 'LinkedIn',
            url: 'https://www.linkedin.com/company/energysage/',
        },
        {
            icon: 'icon-instagram',
            text: 'Instagram',
            url: 'https://www.instagram.com/energysage_official/',
        },
        {
            icon: 'icon-twitter',
            text: 'X',
            url: 'https://x.com/energysage',
        },
        {
            icon: 'icon-youtube',
            text: 'YouTube',
            url: 'https://www.youtube.com/c/EnergySage',
        },
    ],
    legalLinks: [
        {
            text: 'Terms of use',
            url: `${ES_DOMAIN}/terms-of-use/`,
        },
        {
            text: 'Privacy policy',
            url: `${ES_DOMAIN}/privacy-policy/`,
        },
        {
            text: 'Mobile terms of use',
            url: `${ES_DOMAIN}/mobile-terms-of-use/`,
        },
        {
            text: 'Non-discrimination policy',
            url: `${ES_DOMAIN}/nondiscrimination/`,
        },
        {
            text: 'Your privacy choices',
        },
    ],
    copyrightText: '© Copyright 2009-{currentYear} EnergySage, Inc. All rights reserved.',
    trademarkText:
        'ENERGYSAGE is a registered trademark and the EnergySage logo is a trademark of EnergySage, Inc. Other trademarks are the property of either EnergySage, Inc. or our licensors and are used with permission.',
    departmentOfEnergy: {
        learnMore: {
            text: 'Learn more about our success working with the U.S. Department of Energy.',
            url: 'https://www.energy.gov/eere/solar/articles/eere-success-story-doe-funding-helps-build-one-stop-shop-rooftop-pv-systems',
        },
        logoUrl: 'https://a-us.storyblok.com/f/1006159/179x45/6ea4b7dea5/doe-logo-179-943fe6467b04.png/m/180x0',
    },
});
