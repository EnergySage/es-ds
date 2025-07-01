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
                    url: `${ES_DOMAIN}/shop/home-solar/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Community solar',
                    url: `${ES_DOMAIN}/shop/community-solar/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Heating & cooling',
                    url: `${ES_DOMAIN}/shop/heat-pumps/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Backup power',
                    url: `${ES_DOMAIN}/energy-storage/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'EV charging',
                    url: `${ES_DOMAIN}/ev-charging/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'For your business',
                    url: `${ES_DOMAIN}/businesses/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Other energy options',
                    url: `${ES_DOMAIN}/other-clean-options/`,
                    isPrivacyButton: false,
                },
            ],
        },
        {
            title: 'Resources',
            links: [
                {
                    text: 'Solar calculator',
                    url: `${ES_DOMAIN}/solar/calculator/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Solar rebates',
                    url: `${ES_DOMAIN}/market/equipment-rebates/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'News',
                    url: `${ES_DOMAIN}/news/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Blog',
                    url: `${ES_DOMAIN}/blog/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Home solar guide',
                    url: `${ES_DOMAIN}/shop/home-solar/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Market intel',
                    url: `${ES_DOMAIN}/data/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Newsletter',
                    url: 'https://www.energysage.com/landing/newsletter-signup/?utm_campaign=12560937-Newsletter+landing+page&utm_source=footer&utm_medium=website',
                    target: '_blank',
                    isPrivacyButton: false,
                },
            ],
        },
        {
            title: 'About us',
            links: [
                {
                    text: 'Mission & values',
                    url: `${ES_DOMAIN}/about-us/company/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'How it works',
                    url: `${ES_DOMAIN}/shop/home-solar/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Careers',
                    url: `${ES_DOMAIN}/about-us/careers/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Contact us',
                    url: `${ES_DOMAIN}/contact/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Editorial guidelines',
                    url: `${ES_DOMAIN}/editorial-guidelines/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Testimonials',
                    url: 'https://www.energysage.com/testimonials/',
                    target: '_blank',
                    isPrivacyButton: false,
                },
            ],
        },
        {
            title: 'Work with us',
            links: [
                {
                    text: 'Solar & HVAC installers',
                    url: `${ES_DOMAIN}/installers/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Corporate partnerships',
                    url: `${ES_DOMAIN}/partners/corporations/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Community programs',
                    url: `${ES_DOMAIN}/partners/non-profits/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Utility programs',
                    url: `${ES_DOMAIN}/partners/utilities/`,
                    isPrivacyButton: false,
                },
                {
                    text: 'Others',
                    url: `${ES_DOMAIN}/partners/`,
                    isPrivacyButton: false,
                },
            ],
        },
    ],
    social: [
        {
            icon: 'icon-facebook',
            text: 'Facebook',
            url: 'https://www.facebook.com/EnergySage',
            isPrivacyButton: false,
        },
        {
            icon: 'icon-linkedin',
            text: 'LinkedIn',
            url: 'https://www.linkedin.com/company/energysage/',
            isPrivacyButton: false,
        },
        {
            icon: 'icon-instagram',
            text: 'Instagram',
            url: 'https://www.instagram.com/energysage_official/',
            isPrivacyButton: false,
        },
        {
            icon: 'icon-youtube',
            text: 'YouTube',
            url: 'https://www.youtube.com/c/EnergySage',
            isPrivacyButton: false,
        },
        {
            icon: 'icon-threads',
            text: 'Threads',
            url: 'https://www.threads.net/@energysage_official',
            isPrivacyButton: false,
        },
        {
            icon: 'icon-bluesky',
            text: 'Bluesky',
            url: 'https://bsky.app/profile/energysage.com',
            isPrivacyButton: false,
        },
    ],
    legalLinks: [
        {
            text: 'Terms of use',
            url: `${ES_DOMAIN}/terms-of-use/`,
            isPrivacyButton: false,
        },
        {
            text: 'Privacy policy',
            url: `${ES_DOMAIN}/privacy-policy/`,
            isPrivacyButton: false,
        },
        {
            text: 'Messaging terms and conditions',
            url: `${ES_DOMAIN}/mobile-terms-of-use/`,
            isPrivacyButton: false,
        },
        {
            text: 'Non-discrimination policy',
            url: `${ES_DOMAIN}/nondiscrimination/`,
            isPrivacyButton: false,
        },
        {
            text: 'Your privacy choices',
            url: '',
            isPrivacyButton: true,
        },
    ],
    copyrightText: '© Copyright 2009-{currentYear} EnergySage, Inc. All rights reserved.',
    trademarkText: 'ENERGYSAGE is a registered trademark and the EnergySage logo is a trademark of EnergySage, Inc. Other trademarks are the property of either EnergySage, Inc. or our licensors and are used with permission.',
    departmentOfEnergy: {
        learnMore: {
            text: 'Learn more about our success working with the U.S. Department of Energy.',
            url: 'https://www.energy.gov/eere/solar/articles/eere-success-story-doe-funding-helps-build-one-stop-shop-rooftop-pv-systems',
            isPrivacyButton: false,
        },
        logoUrl: 'https://a-us.storyblok.com/f/1006159/179x45/6ea4b7dea5/doe-logo-179-943fe6467b04.png/m/180x0',
    },
});
